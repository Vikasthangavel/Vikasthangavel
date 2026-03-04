import os
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
PORTFOLIO_CONTENT = """
Portfolio Chatbot Context – Vikas T

Basic Information
Name: Vikas T
Location: Erode, Tamil Nadu, India
Email: vikasthangavel@gmail.com
Portfolio Website: https://vikast.me
GitHub: https://github.com/Vikasthangavel
LinkedIn: https://www.linkedin.com/in/vikasthangavel

Vikas T is an entry-level Software and Product Engineer currently pursuing a Bachelor of Technology in Artificial Intelligence and Data Science at K.S.Rangasamy College of Technology. He is passionate about building practical technology solutions that solve real-world problems.

Professional Summary
Vikas T is a developer with hands-on experience in Python, SQL, REST APIs, dashboards, and AI-assisted applications. He focuses on building user-friendly, production-ready solutions that integrate backend systems, data handling, and modern AI tools.
He has experience in developing web platforms, AI applications, and data dashboards. His work often combines software engineering with practical applications such as operations management, financial tracking, and cybersecurity tools.
He is actively seeking opportunities to grow as a Software Engineer or Product Engineer in a technology-driven organization.

Technical Skills
Programming Languages: Python, Java, SQL
Technologies and Tools: REST APIs, Power BI, Web Hosting, Networking, AI APIs, Backend Development
Other Skills: Data Analysis, Dashboard Development, System Design, Cloud Deployment

Projects

Time2Order – Preorder Management System
Time2Order is a web-based preorder management platform designed for local shops to manage orders efficiently during peak hours.
Key features: Online preorder system, Payment integration using Cashfree API, Queue management to reduce waiting time, Soundbox integration for order notifications.
Technologies used: Python, SQL, Payment API integration.

Time2Due – Operations Management Platform
Time2Due is a platform designed to help cable operators manage employees, track payments, and monitor business operations.
Key features: Employee management, Offline payment tracking, Reporting dashboards, Mobile-friendly interface.

Time2Farm – Farm Finance and Management Platform
Time2Farm helps farmers track financial data and analyze farm profitability.
Key features: Section-wise income and expense tracking, Profit monitoring, AI-based insights using Gemini API, Simple mobile interface.

IPL Analysis – Power BI Dashboard
An interactive data dashboard analyzing IPL cricket match data from 2008 to 2024.
Features: Team performance analytics, Player statistics, Match trend visualization, Data modeling using DAX in Power BI.

Dakshaa T26 Event Management System
A full-stack web application developed for managing a national-level technical symposium.
Features: Online event registration, Secure authentication, Payment gateway integration, Cloud deployment.
Technologies used: React, Express.js, REST APIs, Supabase, Cloudflare, VPS hosting.

TrueSight AI – Deepfake Detection System
TrueSight AI is an AI-powered cybersecurity tool developed to detect deepfake media.
Features: Video and audio deepfake detection, Roboflow-trained models, Flask backend, Forensic report generation.
The project was presented to the Namakkal Cyber Cell for potential implementation.

Education
Bachelor of Technology (B.Tech) in Artificial Intelligence and Data Science
K.S.Rangasamy College of Technology
Expected Graduation: 2027
CGPA: 7.8

Internship Experience
AI and Machine Learning Virtual Internship (10 weeks)
During this internship, Vikas gained practical experience in: Machine learning model development, Data preprocessing, Algorithm optimization, AI workflow implementation.

Achievements
Secured 2nd place in the Namakkal Police Cybersecurity Hackathon 2025 for developing an AI-based cybercrime detection solution.

Strengths
Problem Solving, Critical Thinking, Team Collaboration, Adaptability, Building real-world solutions.

Languages
English, Tamil
"""

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
    "You are a helpful AI assistant on Vikas T's portfolio website. "
    "Answer questions about Vikas based only on the context provided below. "
    "Be friendly, concise, and professional. If the question is not about Vikas, "
    "politely redirect the conversation back to Vikas's portfolio.\n\nContext:\n{context}"
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
            api_key=os.environ.get("OPENROUTER_API_KEY", "emihhbkbkj"),
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


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


if __name__ == "__main__":
    app.run(debug=False, port=5000)
