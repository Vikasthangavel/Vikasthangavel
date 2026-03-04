import React, { useState, useRef, useEffect } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const API_URL = "https://vikasthangavel.onrender.com/chat";

const BotIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        <line x1="12" y1="3" x2="12" y2="7" />
        <circle cx="9" cy="16" r="1" fill="currentColor" stroke="none" />
        <circle cx="15" cy="16" r="1" fill="currentColor" stroke="none" />
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

const WAKING = "Waking up the AI... this might take a few seconds if the server is asleep 😴";
const WELCOME = "Hey there! 👋 I'm Vikas's AI assistant. Ask me anything about his projects, skills, experience, or how to get in touch!";

export default function Chatbot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([{ role: "assistant", text: WAKING }]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [pulse, setPulse] = useState(true);
    const [serverAwake, setServerAwake] = useState(false);
    const endRef = useRef(null);
    const inputRef = useRef(null);

    // Initial ping to wake up backend (e.g. Render free tier)
    useEffect(() => {
        const pingServer = async () => {
            try {
                const healthUrl = API_URL.replace("/chat", "/health");
                const res = await fetch(healthUrl);
                if (res.ok) {
                    setServerAwake(true);
                    setMessages([{ role: "assistant", text: WELCOME }]);
                }
            } catch (err) {
                console.log("Waiting for backend to wake up...");
                // Retry after a bit if failed
                setTimeout(pingServer, 5000);
            }
        };
        pingServer();
    }, []);

    // Stop pulsing after 6 seconds
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

    const sendMessage = async () => {
        const text = input.trim();
        if (!text || loading) return;

        setMessages(prev => [...prev, { role: "user", text }]);
        setInput("");
        setLoading(true);

        try {
            // Determine history to send, excluding the welcome message
            const history = messages
                .filter(m => m.text !== WAKING && m.text !== WELCOME)
                .map(m => ({ role: m.role, content: m.text }));

            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: text, history: history })
            });
            const data = await res.json();
            const answer = data.answer || data.error || "Sorry, I couldn't get a response.";
            setMessages(prev => [...prev, {
                role: "assistant",
                text: answer
            }]);

            // Log query to Firebase
            if (data.answer) {
                try {
                    await addDoc(collection(db, "chatbotQueries"), {
                        question: text,
                        answer: answer,
                        timestamp: serverTimestamp()
                    });
                } catch (err) {
                    console.error("Failed to log chatbot query:", err);
                }
            }
        } catch {
            setMessages(prev => [...prev, {
                role: "assistant",
                text: "Oops! Coffee break for our chat robot ☕. Give it 2–5 minutes and try again!"
            }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKey = (e) => {
        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
    };

    // Helper to safely parse **bold** text in responses
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
                {/* Pulse ring */}
                {pulse && !open && (
                    <span style={{
                        position: "absolute", inset: -6, borderRadius: "50%",
                        border: "2px solid rgba(245,158,11,0.5)",
                        animation: "chatbotPulseRing 2s cubic-bezier(0.455,0.03,0.515,0.955) infinite",
                        pointerEvents: "none"
                    }} />
                )}
                {open ? <CloseIcon /> : <BotIcon />}
            </button>

            {/* ── Chat panel ── */}
            <div style={{
                position: "fixed", bottom: 100, right: 28, zIndex: 9998,
                width: 370, maxWidth: "calc(100vw - 40px)",
                background: "rgba(13,17,23,0.97)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(245,158,11,0.18)",
                borderRadius: 20,
                boxShadow: "0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(245,158,11,0.05)",
                display: "flex", flexDirection: "column",
                overflow: "hidden",
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
                    borderBottom: "1px solid rgba(245,158,11,0.1)",
                    flexShrink: 0,
                }}>
                    <div style={{
                        width: 40, height: 40, borderRadius: "50%",
                        background: "linear-gradient(135deg, #f59e0b, #d97706)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#0a0a0f", flexShrink: 0,
                        boxShadow: "0 0 16px rgba(245,158,11,0.3)"
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
                                background: "#22c55e",
                                display: "inline-block",
                                boxShadow: "0 0 6px #22c55e"
                            }} />
                            Online · Powered by Gemini AI
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
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <rect x="3" y="11" width="18" height="11" rx="2" />
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                        <circle cx="9" cy="16" r="1" fill="currentColor" stroke="none" />
                                        <circle cx="15" cy="16" r="1" fill="currentColor" stroke="none" />
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
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <rect x="3" y="11" width="18" height="11" rx="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    <circle cx="9" cy="16" r="1" fill="currentColor" stroke="none" />
                                    <circle cx="15" cy="16" r="1" fill="currentColor" stroke="none" />
                                </svg>
                            </div>
                            <div style={{
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.07)",
                                borderRadius: "18px 18px 18px 4px",
                                padding: "10px 14px"
                            }}>
                                <TypingDots />
                            </div>
                        </div>
                    )}
                    <div ref={endRef} />
                </div>

                {/* Suggestions */}
                {messages.length === 1 && (
                    <div style={{
                        padding: "0 14px 10px", display: "flex", flexWrap: "wrap", gap: 6, flexShrink: 0
                    }}>
                        {["What projects has he built?", "What are his skills?", "How to contact him?"].map(q => (
                            <button key={q} onClick={() => { setInput(q); }} style={{
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
                    padding: "12px 14px",
                    borderTop: "1px solid rgba(245,158,11,0.08)",
                    display: "flex", gap: 8, flexShrink: 0,
                    background: "rgba(0,0,0,0.2)"
                }}>
                    <input
                        ref={inputRef}
                        id="chatbot-input"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={handleKey}
                        placeholder="Ask about Vikas..."
                        disabled={loading}
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
                        disabled={loading || !input.trim()}
                        style={{
                            width: 42, height: 42, borderRadius: 12,
                            background: input.trim() && !loading
                                ? "linear-gradient(135deg, #f59e0b, #d97706)"
                                : "rgba(245,158,11,0.15)",
                            border: "none", cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                            color: input.trim() && !loading ? "#0a0a0f" : "rgba(245,158,11,0.4)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            transition: "background 0.25s, color 0.25s, transform 0.15s",
                            flexShrink: 0
                        }}
                        onMouseEnter={e => { if (input.trim() && !loading) e.currentTarget.style.transform = "scale(1.08)"; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
                    >
                        <SendIcon />
                    </button>
                </div>
            </div>
        </>
    );
}
