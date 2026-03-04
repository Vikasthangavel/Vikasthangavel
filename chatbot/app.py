import os
from dotenv import load_dotenv

load_dotenv()

from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_core.messages import HumanMessage, AIMessage
from langchain.chains import create_history_aware_retriever, create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.documents import Document
from langchain_core.caches import BaseCache

# Fix for Pydantic v2 issue with ChatGoogleGenerativeAI
ChatGoogleGenerativeAI.model_rebuild()

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

# ── Build RAG pipeline on startup ─────────────────────────────────────────────
print("🔧 Building RAG pipeline...")

# Split portfolio content into chunks
text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=100)
chunks = text_splitter.split_text(PORTFOLIO_CONTENT)
docs = [Document(page_content=chunk) for chunk in chunks]

# Create embeddings (downloads model once, cached locally)
print("📦 Loading embedding model (first run may take ~30s)...")
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

# Build in-memory vector store
vectorstore = Chroma.from_documents(docs, embeddings)
retriever = vectorstore.as_retriever(search_kwargs={"k": 4})

# LLM
llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0.3)

# ── RAG Pipeline Setup ────────────────────────────────────────────────────────

# 1. Provide Context to answer
qa_system_prompt = """You are a helpful AI assistant on Vikas T's portfolio website.
Answer questions about Vikas based only on the context provided below.
Be friendly, concise, and professional. If the question is not about Vikas, 
politely redirect the conversation back to Vikas's portfolio.

Context:
{context}"""
qa_prompt = ChatPromptTemplate.from_messages([
    ("system", qa_system_prompt),
    MessagesPlaceholder("chat_history"),
    ("human", "{input}"),
])

# 2. Rephrase question based on history
contextualize_q_system_prompt = """Given a chat history and the latest user question 
which might reference context in the chat history, formulate a standalone question 
which can be understood without the chat history. Do NOT answer the question, 
just reformulate it if needed and otherwise return it as is."""

contextualize_q_prompt = ChatPromptTemplate.from_messages([
    ("system", contextualize_q_system_prompt),
    MessagesPlaceholder("chat_history"),
    ("human", "{input}"),
])

# 3. Create chains
history_aware_retriever = create_history_aware_retriever(llm, retriever, contextualize_q_prompt)
question_answer_chain = create_stuff_documents_chain(llm, qa_prompt)
rag_chain = create_retrieval_chain(history_aware_retriever, question_answer_chain)

print("✅ RAG pipeline ready!")

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
        # Parse history
        chat_history = []
        for msg in data.get("history", []):
            if msg.get("role") == "user":
                chat_history.append(HumanMessage(content=msg.get("content", "")))
            elif msg.get("role") == "assistant":
                chat_history.append(AIMessage(content=msg.get("content", "")))

        # Invoke the chain
        response = rag_chain.invoke({"input": message, "chat_history": chat_history})
        answer = response["answer"]
        return jsonify({"answer": answer})
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": "Something went wrong. Please try again."}), 500


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


if __name__ == "__main__":
    app.run(debug=False, port=5000)
