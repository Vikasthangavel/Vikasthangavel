import os
import requests
import numpy as np
from dotenv import load_dotenv

load_dotenv()

from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
from google.genai import types

# ── Configure Gemini ───────────────────────────────────────────────────────────
client = genai.Client(api_key=os.environ["GOOGLE_API_KEY"])

app = Flask(__name__)
CORS(app)

# ── Portfolio content ──────────────────────────────────────────────────────────

def fetch_portfolio_content():
    """Reads local React components for the most up-to-date context, falling back to scraping if needed."""
    import glob
    
    try:
        print("📁 Reading local portfolio content from src/components...")
        current_dir = os.path.dirname(os.path.abspath(__file__))
        parent_dir = os.path.dirname(current_dir)
        
        components_path = os.path.join(parent_dir, "src", "components", "*.jsx")
        files = glob.glob(components_path)
        
        content = ""
        if files:
            for f in files:
                with open(f, "r", encoding="utf-8") as file:
                    content += f"\n--- File: {os.path.basename(f)} ---\n"
                    content += file.read() + "\n"
            print(f"✅ Successfully read {len(files)} local component files!")
        else:
            print("⚠️ No local component files found. Trying fallback scraping...")
            url = "https://r.jina.ai/https://vikast.me"
            headers = {'Accept': 'text/plain'}
            response = requests.get(url, headers=headers, timeout=20)
            response.raise_for_status()
            content = response.text
            print("✅ Successfully fetched from Jina!")
        
        # Adding some base context that might not be fully explicitly written on the UI
        base_context = (
            "Portfolio Chatbot Context – Vikas T\n"
            "Email: vikasthangavel@gmail.com\n"
            "Portfolio Website: https://vikast.me\n"
            "GitHub: https://github.com/Vikasthangavel\n"
            "LinkedIn: https://www.linkedin.com/in/vikasthangavel\n"
            "Vikas T is an entry-level Software and Product Engineer currently pursuing a Bachelor of Technology in Artificial Intelligence and Data Science at K.S.Rangasamy College of Technology.\n\n"
            "Here is the detailed content extracted directly from the portfolio source code:\n"
        )
        
        return base_context + content
    except Exception as e:
        print(f"⚠️ Failed to get portfolio content: {e}")
        print("Fallback to minimal context...")
        return "Vikas T is a Software Engineer from Erode, India. His portfolio is at https://vikast.me"

PORTFOLIO_CONTENT = fetch_portfolio_content()

# ── Build in-memory vector store on startup ────────────────────────────────────
print("🔧 Building vector store...")

def chunk_text(text, size=500, overlap=100):
    words = text.split()
    chunks, i = [], 0
    while i < len(words):
        chunks.append(" ".join(words[i:i + size]))
        i += size - overlap
    return chunks

def embed_docs(texts):
    """Embed a list of document chunks."""
    if isinstance(texts, str):
        texts = [texts]
    result = client.models.embed_content(
        model="models/gemini-embedding-001",
        contents=texts,
        config=types.EmbedContentConfig(task_type="RETRIEVAL_DOCUMENT"),
    )
    return np.array([e.values for e in result.embeddings], dtype=np.float32)

def embed_query(text):
    """Embed a single query string."""
    result = client.models.embed_content(
        model="models/gemini-embedding-001",
        contents=[text],
        config=types.EmbedContentConfig(task_type="RETRIEVAL_QUERY"),
    )
    return np.array(result.embeddings[0].values, dtype=np.float32)

chunks = chunk_text(PORTFOLIO_CONTENT)
print(f"📦 Embedding {len(chunks)} chunks...")
chunk_embeddings = embed_docs(chunks)   # shape: (n_chunks, dim)
print("✅ Vector store ready!")

def retrieve(query, k=4):
    q_emb = embed_query(query)   # shape: (dim,)
    # normalise for cosine similarity via dot product
    norms = np.linalg.norm(chunk_embeddings, axis=1, keepdims=True)
    normed = chunk_embeddings / np.where(norms == 0, 1, norms)
    q_norm = q_emb / (np.linalg.norm(q_emb) or 1)
    scores = normed @ q_norm
    top_idx = np.argsort(scores)[::-1][:k]
    return "\n\n".join(chunks[i] for i in top_idx)

SYSTEM_PROMPT = (
    """You are the AI assistant for **Vikas T’s portfolio website**.

Your purpose is to help visitors quickly understand who Vikas is, what he builds, and why they might want to collaborate, hire, or connect with him.

Use ONLY the information provided in the **Context** section to answer questions.

Core Responsibilities:
• Help visitors explore Vikas’s **projects, skills, experience, education, and achievements**.
• Provide clear, concise, and helpful answers.
• Represent Vikas professionally and positively.
• Encourage visitors to explore more parts of the portfolio when relevant.

Conversation Style:
• Friendly, conversational, and professional.
• Keep responses concise but informative.
• Avoid overly long explanations.
• When possible, highlight key projects, technologies, or accomplishments.

Engagement Behavior:
When appropriate, guide visitors by suggesting follow-up topics such as:
• Projects Vikas has built
• Technologies he works with
• His development interests
• Experience or education
• Collaboration or contact opportunities

Example follow-ups you can suggest:
“Would you like to hear about one of Vikas’s projects?”
“Interested in the technologies Vikas specializes in?”
“Want a quick overview of Vikas’s experience?”

Strict Context Rule:
• ONLY answer using the information available in the Context.
• Do NOT invent or assume details about Vikas.

If a question cannot be answered from the context:
Politely say that the information is not available and guide the visitor back to topics related to Vikas's portfolio.

If the question is unrelated to Vikas:
Politely respond that the topic is outside your knowledge and redirect the conversation toward Vikas, his work, or his portfolio.

Goal:
Make it easy for visitors, recruiters, and collaborators to quickly understand Vikas’s capabilities and the value he brings as a developer.

Context:
{context}
"""
)

# ── Routes ─────────────────────────────────────────────────────────────────────
@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    if not data or "message" not in data:
        return jsonify({"error": "Missing 'message' field"}), 400

    message = data["message"].strip()
    if not message:
        return jsonify({"error": "Empty message"}), 400

    try:
        context = retrieve(message)
        prompt = SYSTEM_PROMPT.format(context=context) + f"\n\nQuestion: {message}"
        
        from langchain_openai import ChatOpenAI
        llm = ChatOpenAI(
            model="openai/gpt-4o-mini",
            base_url="https://openrouter.ai/api/v1",
            api_key=os.environ.get("OPENROUTER_API_KEY"),
        )
        
        for attempt in range(2):
            try:
                response = llm.invoke(prompt)
                return jsonify({"answer": response.content})
            except Exception as inner_e:
                if "429" in str(inner_e) and attempt == 0:
                    import time
                    time.sleep(20)
                else:
                    raise
    except Exception as e:
        import traceback
        traceback.print_exc()
        if "429" in str(e):
            return jsonify({"error": "I'm a bit busy right now — please try again in a moment! ⏳"}), 429
        return jsonify({"error": str(e)}), 500


@app.route("/", methods=["GET"])
def home():
    try:
        # Check Gemini API
        client.models.embed_content(
            model="models/gemini-embedding-001",
            contents=["test"],
            config=types.EmbedContentConfig(task_type="RETRIEVAL_QUERY"),
        )
        gemini_status = "Active"
    except Exception as e:
        gemini_status = f"Error: {str(e)}"

    try:
        # Check OpenRouter API
        from langchain_openai import ChatOpenAI
        llm = ChatOpenAI(
            model="openai/gpt-4o-mini",
            base_url="https://openrouter.ai/api/v1",
            api_key=os.environ.get("OPENROUTER_API_KEY"),
        )
        llm.invoke("Hi")
        openrouter_status = "Active"
    except Exception as e:
        openrouter_status = f"Error: {str(e)}"
        
    html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <title>API Status</title>
        <style>
            body {{ font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; }}
            .status-card {{ border: 1px solid #eee; padding: 15px; margin-bottom: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }}
            h2 {{ color: #333; text-align: center; }}
            h3 {{ margin-top: 0; color: #555; }}
            .active {{ color: #28a745; font-weight: bold; }}
            .error {{ color: #dc3545; font-weight: bold; }}
            .badge {{ display: inline-block; padding: 5px 10px; border-radius: 12px; font-size: 0.9em; }}
            .bg-active {{ background-color: #d4edda; }}
            .bg-error {{ background-color: #f8d7da; }}
        </style>
    </head>
    <body>
        <h2>Chatbot API Status</h2>
        <div class="status-card">
            <h3>Gemini API (Embeddings)</h3>
            <p>Status: <span class="badge {'bg-active' if gemini_status == 'Active' else 'bg-error'} {'active' if gemini_status == 'Active' else 'error'}">{gemini_status}</span></p>
        </div>
        <div class="status-card">
            <h3>OpenRouter API (Chat)</h3>
            <p>Status: <span class="badge {'bg-active' if openrouter_status == 'Active' else 'bg-error'} {'active' if openrouter_status == 'Active' else 'error'}">{openrouter_status}</span></p>
        </div>
    </body>
    </html>
    """
    return html


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


if __name__ == "__main__":
    app.run(debug=False, port=5000)
