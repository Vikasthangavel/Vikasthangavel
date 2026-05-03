import React, { useState, useRef, useEffect } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { projects } from "./Projects";
import { experiences } from "./Experience";
import { techSkills } from "./Skills";

// ─── API Keys ─────────────────────────────────────────────────────────────────
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || "";

// ─── Exact same model as app.py ───────────────────────────────────────────────
const CHAT_MODEL = "openai/gpt-4o-mini";

// ─── Exact same base context as app.py ───────────────────────────────────────
const BASE_CONTEXT =
    "Portfolio Chatbot Context – Vikas T\n" +
    "Email: vikasthangavel@gmail.com\n" +
    "Portfolio Website: https://vikast.me\n" +
    "GitHub: https://github.com/Vikasthangavel\n" +
    "LinkedIn: https://www.linkedin.com/in/vikasthangavel\n" +
    "Vikas T is an entry-level Software and Product Engineer currently pursuing a Bachelor of Technology in Artificial Intelligence and Data Science at K.S.Rangasamy College of Technology.\n\n" +
    "Here is the detailed content extracted directly from the live website:\n";

// ─── Exact same system prompt as app.py ───────────────────────────────────────
const buildSystemPrompt = (context) => `You are the AI assistant for **Vikas T's portfolio website**.

Your purpose is to help visitors quickly understand who Vikas is, what he builds, and why they might want to collaborate, hire, or connect with him.

Use ONLY the information provided in the **Context** section to answer questions.

Core Responsibilities:
• Help visitors explore Vikas's **projects, skills, experience, education, and achievements**.
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
"Would you like to hear about one of Vikas's projects?"
"Interested in the technologies Vikas specializes in?"
"Want a quick overview of Vikas's experience?"

Strict Context Rule:
• ONLY answer using the information available in the Context.
• Do NOT invent or assume details about Vikas.

If a question cannot be answered from the context:
Politely say that the information is not available and guide the visitor back to topics related to Vikas's portfolio.

If the question is unrelated to Vikas:
Politely respond that the topic is outside your knowledge and redirect the conversation toward Vikas, his work, or his portfolio.

Goal:
Make it easy for visitors, recruiters, and collaborators to quickly understand Vikas's capabilities and the value he brings as a developer.

Context:
${context}
`;

// ─── Icons ────────────────────────────────────────────────────────────────────
const BotIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83M10 10l4 4m-4 0l4-4" />
    </svg>
);

const CloseIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const SendIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
);

const TypingDots = () => (
    <div style={{ display: "flex", gap: "5px", alignItems: "center", padding: "4px 0" }}>
        {[0, 1, 2].map(i => (
            <span key={i} style={{
                width: 7, height: 7, borderRadius: "50%",
                background: "rgba(245,158,11,0.7)",
                display: "inline-block",
                animation: "chatbotDotBounce 1.2s infinite",
                animationDelay: `${i * 0.2}s`
            }} />
        ))}
    </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Chatbot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [pulse, setPulse] = useState(true);
    const [ready, setReady] = useState(false);

    // System prompt built once from fetched content
    const systemPromptRef = useRef("");
    // Full conversation history for multi-turn context
    const historyRef = useRef([]);

    const endRef = useRef(null);
    const inputRef = useRef(null);

    // ── On mount: build context dynamically from local files ─────────
    useEffect(() => {
        let cancelled = false;

        const init = () => {
            let dynamicContext = BASE_CONTEXT;

            dynamicContext += "\n--- PROJECTS ---\n";
            projects.forEach(p => {
                dynamicContext += `${p.title} - ${p.subtitle}\nDescription: ${p.description}\nTech Stack: ${p.tech.join(", ")}\n`;
                if (p.links && p.links.length > 0) {
                    dynamicContext += `Links: ${p.links.map(l => l.url).join(", ")}\n`;
                }
                dynamicContext += "\n";
            });

            dynamicContext += "--- EXPERIENCE ---\n";
            experiences.forEach(e => {
                dynamicContext += `${e.role} at ${e.company} (${e.period}, ${e.duration})\n`;
                e.points.forEach(pt => dynamicContext += `- ${pt}\n`);
                dynamicContext += "\n";
            });

            dynamicContext += "--- SKILLS ---\n";
            dynamicContext += techSkills.map(s => `${s.name} (${s.level}%)`).join(", ") + "\n\n";

            if (!cancelled) {
                systemPromptRef.current = buildSystemPrompt(dynamicContext);
                setReady(true);
                setMessages([{
                    role: "assistant",
                    text: "Hey there! 👋 I am Vikas's AI assistant. Ask me anything about his projects, skills, experience, or how to get in touch!"
                }]);
            }
        };

        init();
        return () => { cancelled = true; };
    }, []);

    useEffect(() => {
        const t = setTimeout(() => setPulse(false), 6000);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    useEffect(() => {
        if (open) setTimeout(() => inputRef.current?.focus(), 300);
    }, [open]);

    // ── Send message — same model & prompt structure as app.py ────────────────
    const sendMessage = async () => {
        const text = input.trim();
        if (!text || loading || !ready) return;

        setMessages(prev => [...prev, { role: "user", text }]);
        setInput("");
        setLoading(true);

        // Build message history (multi-turn)
        const updatedHistory = [
            ...historyRef.current,
            { role: "user", content: text }
        ];

        try {
            const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                    "HTTP-Referer": window.location.origin,
                    "X-Title": "Vikas Portfolio Chatbot",
                },
                body: JSON.stringify({
                    model: CHAT_MODEL,
                    messages: [
                        { role: "system", content: systemPromptRef.current },
                        ...updatedHistory,
                    ],
                    temperature: 0.7,
                    max_tokens: 512,
                }),
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                if (res.status === 429) throw new Error("429");
                throw new Error(errData?.error?.message || `HTTP ${res.status}`);
            }

            const data = await res.json();
            const answer = data?.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";

            // Update history for next turn
            historyRef.current = [
                ...updatedHistory,
                { role: "assistant", content: answer }
            ];

            setMessages(prev => [...prev, { role: "assistant", text: answer }]);

            // Log to Firebase
            try {
                await addDoc(collection(db, "chatbotQueries"), {
                    question: text, answer, timestamp: serverTimestamp(),
                });
            } catch (_) { /* silent */ }

        } catch (err) {
            const is429 = String(err.message).includes("429");
            setMessages(prev => [...prev, {
                role: "assistant",
                text: is429
                    ? "I'm a bit busy right now — please try again in a moment! ⏳"
                    : `Oops! Something went wrong: ${err.message}. Try again.`
            }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKey = (e) => {
        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
    };

    const renderMessageText = (text) => {
        if (!text) return null;
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, i) => {
            if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
                return <strong key={i} style={{ color: "#fef3c7" }}>{part.slice(2, -2)}</strong>;
            }
            return part;
        });
    };

    return (
        <>
            {/* ── Floating toggle button ── */}
            <button
                id="chatbot-toggle-btn"
                onClick={() => setOpen(o => !o)}
                title="Chat with Vikas's AI"
                style={{
                    position: "fixed", bottom: 28, right: 28, zIndex: 9999,
                    width: 58, height: 58, borderRadius: "50%",
                    background: "linear-gradient(135deg, #f59e0b, #d97706)",
                    border: "none", cursor: "pointer", color: "#0a0a0f",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 4px 24px rgba(245,158,11,0.45), 0 2px 8px rgba(0,0,0,0.4)",
                    transition: "transform 0.3s cubic-bezier(0.68,-0.55,0.265,1.55), box-shadow 0.3s",
                    transform: open ? "scale(1.08) rotate(15deg)" : "scale(1)",
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.12) rotate(5deg)"}
                onMouseLeave={e => e.currentTarget.style.transform = open ? "scale(1.08) rotate(15deg)" : "scale(1)"}
            >
                {pulse && !open && (
                    <span style={{
                        position: "absolute", inset: -6, borderRadius: "50%",
                        border: "2px solid rgba(245,158,11,0.5)",
                        animation: "chatbotPulseRing 2s cubic-bezier(0.455,0.03,0.515,0.955) infinite",
                        pointerEvents: "none"
                    }} />
                )}
                {!open && (
                    <div style={{
                        position: "absolute", right: 75, top: "50%",
                        transform: "translateY(-50%)",
                        background: "rgba(13,17,23,0.9)", backdropFilter: "blur(8px)",
                        border: "1px solid rgba(245,158,11,0.3)",
                        padding: "6px 12px", borderRadius: "16px",
                        color: "#f8fafc", fontSize: "13px", fontWeight: "500",
                        whiteSpace: "nowrap", boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                        pointerEvents: "none",
                        animation: "chatbotLabelFloat 3s ease-in-out infinite"
                    }}>
                        Hey! I'm Vikas's AI Assistant 👋
                        <div style={{
                            position: "absolute", right: -6, top: "50%",
                            transform: "translateY(-50%)",
                            width: 0, height: 0,
                            borderTop: "5px solid transparent",
                            borderBottom: "5px solid transparent",
                            borderLeft: "6px solid rgba(245,158,11,0.3)",
                        }} />
                    </div>
                )}
                {open ? <CloseIcon /> : <BotIcon />}
            </button>

            {/* ── Chat panel ── */}
            <div style={{
                position: "fixed", bottom: 100, right: 28, zIndex: 9998,
                width: 370, maxWidth: "calc(100vw - 40px)",
                background: "rgba(13,17,23,0.97)", backdropFilter: "blur(20px)",
                border: "1px solid rgba(245,158,11,0.18)", borderRadius: 20,
                boxShadow: "0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(245,158,11,0.05)",
                display: "flex", flexDirection: "column", overflow: "hidden",
                transformOrigin: "bottom right",
                transition: "opacity 0.3s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1)",
                opacity: open ? 1 : 0,
                transform: open ? "scale(1) translateY(0)" : "scale(0.85) translateY(20px)",
                pointerEvents: open ? "all" : "none",
                maxHeight: "75vh",
            }}>
                {/* Header */}
                <div style={{
                    padding: "16px 18px", display: "flex", alignItems: "center", gap: 12,
                    background: "linear-gradient(135deg, rgba(245,158,11,0.12), rgba(168,85,247,0.06))",
                    borderBottom: "1px solid rgba(245,158,11,0.1)", flexShrink: 0,
                }}>
                    <div style={{
                        width: 40, height: 40, borderRadius: "50%",
                        background: "linear-gradient(135deg, #f59e0b, #d97706)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#0a0a0f", flexShrink: 0, boxShadow: "0 0 16px rgba(245,158,11,0.3)"
                    }}>
                        <BotIcon />
                    </div>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: 15, color: "#f8fafc", fontFamily: "'Inter', sans-serif" }}>
                            Vikas's AI Assistant
                        </div>
                        <div style={{ fontSize: 12, color: "rgba(245,158,11,0.8)", display: "flex", alignItems: "center", gap: 5 }}>
                            <span style={{
                                width: 7, height: 7, borderRadius: "50%",
                                background: ready ? "#22c55e" : "#f59e0b",
                                display: "inline-block",
                                boxShadow: ready ? "0 0 6px #22c55e" : "0 0 6px #f59e0b"
                            }} />
                            {ready ? "Online" : "Loading portfolio data..."}
                        </div>
                    </div>
                </div>

                {/* Messages */}
                <div style={{
                    flex: 1, overflowY: "auto", padding: "16px 14px",
                    display: "flex", flexDirection: "column", gap: 12,
                    scrollbarWidth: "thin", scrollbarColor: "rgba(245,158,11,0.3) transparent"
                }}>
                    {messages.map((msg, i) => (
                        <div key={i} style={{
                            display: "flex",
                            flexDirection: msg.role === "user" ? "row-reverse" : "row",
                            alignItems: "flex-end", gap: 8,
                            animation: "chatbotMsgIn 0.3s ease-out both"
                        }}>
                            {msg.role === "assistant" && (
                                <div style={{
                                    width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                                    background: "linear-gradient(135deg, #f59e0b, #d97706)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    color: "#0a0a0f", marginBottom: 2
                                }}>
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83M10 10l4 4m-4 0l4-4" />
                                    </svg>
                                </div>
                            )}
                            <div style={{
                                maxWidth: "78%",
                                background: msg.role === "user"
                                    ? "linear-gradient(135deg, rgba(245,158,11,0.22), rgba(217,119,6,0.15))"
                                    : "rgba(255,255,255,0.04)",
                                border: msg.role === "user"
                                    ? "1px solid rgba(245,158,11,0.2)"
                                    : "1px solid rgba(255,255,255,0.07)",
                                borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                                padding: "10px 14px",
                                fontSize: 13.5, lineHeight: 1.55,
                                color: msg.role === "user" ? "#fef3c7" : "#e2e8f0",
                                fontFamily: "'Inter', sans-serif",
                                whiteSpace: "pre-wrap", wordBreak: "break-word"
                            }}>
                                {renderMessageText(msg.text)}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
                            <div style={{
                                width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                                background: "linear-gradient(135deg, #f59e0b, #d97706)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                color: "#0a0a0f"
                            }}>
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83M10 10l4 4m-4 0l4-4" />
                                </svg>
                            </div>
                            <div style={{
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.07)",
                                borderRadius: "18px 18px 18px 4px", padding: "10px 14px"
                            }}>
                                <TypingDots />
                            </div>
                        </div>
                    )}
                    <div ref={endRef} />
                </div>

                {/* Quick suggestions */}
                {messages.length === 1 && ready && (
                    <div style={{ padding: "0 14px 10px", display: "flex", flexWrap: "wrap", gap: 6, flexShrink: 0 }}>
                        {["What projects has he built?", "What are his skills?", "How to contact him?"].map(q => (
                            <button key={q} onClick={() => setInput(q)} style={{
                                background: "rgba(245,158,11,0.07)",
                                border: "1px solid rgba(245,158,11,0.18)",
                                borderRadius: 20, padding: "5px 12px",
                                fontSize: 12, color: "rgba(245,158,11,0.9)",
                                cursor: "pointer", fontFamily: "'Inter', sans-serif",
                                transition: "background 0.2s, border-color 0.2s"
                            }}
                                onMouseEnter={e => { e.target.style.background = "rgba(245,158,11,0.14)"; e.target.style.borderColor = "rgba(245,158,11,0.35)"; }}
                                onMouseLeave={e => { e.target.style.background = "rgba(245,158,11,0.07)"; e.target.style.borderColor = "rgba(245,158,11,0.18)"; }}
                            >{q}</button>
                        ))}
                    </div>
                )}

                {/* Input bar */}
                <div style={{
                    padding: "12px 14px", borderTop: "1px solid rgba(245,158,11,0.08)",
                    display: "flex", gap: 8, flexShrink: 0, background: "rgba(0,0,0,0.2)"
                }}>
                    <input
                        ref={inputRef}
                        id="chatbot-input"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={handleKey}
                        placeholder={ready ? "Ask about Vikas..." : "Loading..."}
                        disabled={loading || !ready}
                        style={{
                            flex: 1, background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(245,158,11,0.15)",
                            borderRadius: 12, padding: "10px 14px",
                            color: "#f8fafc", fontSize: 13.5,
                            outline: "none", fontFamily: "'Inter', sans-serif",
                            transition: "border-color 0.2s"
                        }}
                        onFocus={e => e.target.style.borderColor = "rgba(245,158,11,0.45)"}
                        onBlur={e => e.target.style.borderColor = "rgba(245,158,11,0.15)"}
                    />
                    <button
                        id="chatbot-send-btn"
                        onClick={sendMessage}
                        disabled={loading || !input.trim() || !ready}
                        style={{
                            width: 42, height: 42, borderRadius: 12,
                            background: input.trim() && !loading && ready
                                ? "linear-gradient(135deg, #f59e0b, #d97706)"
                                : "rgba(245,158,11,0.15)",
                            border: "none",
                            cursor: input.trim() && !loading && ready ? "pointer" : "not-allowed",
                            color: input.trim() && !loading && ready ? "#0a0a0f" : "rgba(245,158,11,0.4)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            transition: "background 0.25s, color 0.25s, transform 0.15s",
                            flexShrink: 0
                        }}
                        onMouseEnter={e => { if (input.trim() && !loading && ready) e.currentTarget.style.transform = "scale(1.08)"; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
                    >
                        <SendIcon />
                    </button>
                </div>
            </div>
        </>
    );
}
