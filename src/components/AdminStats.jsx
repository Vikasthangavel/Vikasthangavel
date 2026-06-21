import React, { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from "../firebase";

const AdminStats = () => {
    const [stats, setStats] = useState([]);
    const [chatbotStats, setChatbotStats] = useState([]);
    const [resumeDownloads, setResumeDownloads] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // The original code used getDocs and limit.
                // With onSnapshot, we set up a real-time listener.
                // For this specific use case (fetching latest 50), getDocs might be more appropriate
                // if real-time updates aren't strictly needed for the initial load.
                // However, following the import change to onSnapshot, we'll adapt.
                // Note: onSnapshot returns a unsubscribe function.
                const q = query(collection(db, "analytics"), orderBy("startTime", "desc")); // Removed limit for onSnapshot, as it's typically used for continuous updates
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const data = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setStats(data);
                    setLoading(false);
                }, (error) => {
                    console.error("Error fetching stats:", error);
                    setLoading(false);
                });

                // Return the unsubscribe function to clean up the listener when the component unmounts
                return () => unsubscribe();

            } catch (err) {
                console.error("Error fetching stats:", err);
                setLoading(false);
            }
        };
        const fetchChatbotStats = async () => {
            try {
                const q = query(collection(db, "chatbotQueries"), orderBy("timestamp", "desc"));
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const data = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setChatbotStats(data);
                }, (error) => {
                    console.error("Error fetching chatbot stats:", error);
                });
                return () => unsubscribe();
            } catch (err) {
                console.error("Error fetching chatbot stats:", err);
            }
        };

        const fetchResumeDownloads = async () => {
            try {
                const q = query(collection(db, "resumeDownloads"), orderBy("timestamp", "desc"));
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const data = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setResumeDownloads(data);
                }, (error) => {
                    console.error("Error fetching resume downloads:", error);
                });
                return () => unsubscribe();
            } catch (err) {
                console.error("Error fetching resume downloads:", err);
            }
        };

        const unsubStats = fetchStats();
        const unsubChatbot = fetchChatbotStats();
        const unsubResume = fetchResumeDownloads();

        // Cleanup all listeners on unmount
        return () => {
            unsubStats.then(unsub => { if (unsub) unsub(); });
            unsubChatbot.then(unsub => { if (unsub) unsub(); });
            unsubResume.then(unsub => { if (unsub) unsub(); });
        };
    }, []);

    const clearData = async () => {
        if (!window.confirm("Are you sure you want to clear ALL analytics data? This cannot be undone.")) return;

        try {
            const deletePromises = stats.map(s => deleteDoc(doc(db, "analytics", s.id)));
            await Promise.all(deletePromises);
            alert("All data cleared successfully!");
        } catch (err) {
            console.error("Error clearing data:", err);
            alert("Failed to clear data.");
        }
    };

    const clearChatbotData = async () => {
        if (!window.confirm("Are you sure you want to clear ALL chatbot queries? This cannot be undone.")) return;

        try {
            const deletePromises = chatbotStats.map(s => deleteDoc(doc(db, "chatbotQueries", s.id)));
            await Promise.all(deletePromises);
            alert("All chatbot queries cleared successfully!");
        } catch (err) {
            console.error("Error clearing chatbot queries:", err);
            alert("Failed to clear chatbot queries.");
        }
    };

    const clearResumeDownloads = async () => {
        if (!window.confirm("Are you sure you want to clear ALL resume download records? This cannot be undone.")) return;

        try {
            const deletePromises = resumeDownloads.map(s => deleteDoc(doc(db, "resumeDownloads", s.id)));
            await Promise.all(deletePromises);
            alert("All resume download records cleared successfully!");
        } catch (err) {
            console.error("Error clearing resume downloads:", err);
            alert("Failed to clear resume downloads.");
        }
    };

    // Group downloads by resume label for summary
    const downloadsByLabel = resumeDownloads.reduce((acc, s) => {
        acc[s.label] = (acc[s.label] || 0) + 1;
        return acc;
    }, {});

    if (loading) return <div className="p-10 text-white">Loading stats...</div>;

    return (
        <div className="fixed inset-0 z-[100] bg-black/95 text-slate-300 p-8 overflow-y-auto font-mono">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
                    <div className="flex items-center gap-4">
                        <h1 className="text-3xl font-bold text-white">Site Analytics</h1>
                        <button
                            onClick={clearData}
                            className="px-4 py-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 border border-red-600/50 rounded-lg text-sm font-bold transition-all"
                        >
                            Clear All Data
                        </button>
                    </div>
                    <button
                        onClick={() => window.location.search = ""}
                        className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-md transition-all text-xs border border-white/10"
                    >
                        Close Dashboard
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                        <p className="text-xs text-slate-500 uppercase tracking-widest mb-2 font-bold">Total Sessions</p>
                        <h2 className="text-4xl font-bold text-white">{stats.length}</h2>
                    </div>
                    <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                        <p className="text-xs text-slate-500 uppercase tracking-widest mb-2 font-bold">Avg. Duration</p>
                        <h2 className="text-4xl font-bold text-white">
                            {stats.length > 0
                                ? Math.round(stats.reduce((acc, s) => acc + (s.totalTime || 0), 0) / stats.length)
                                : 0}s
                        </h2>
                    </div>
                    <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                        <p className="text-xs text-slate-500 uppercase tracking-widest mb-2 font-bold">Resume Downloads</p>
                        <h2 className="text-4xl font-bold text-white">{resumeDownloads.length}</h2>
                    </div>
                    <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                        <p className="text-xs text-slate-500 uppercase tracking-widest mb-2 font-bold">Chatbot Queries</p>
                        <h2 className="text-4xl font-bold text-white">{chatbotStats.length}</h2>
                    </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden overflow-x-auto mb-12">
                    <div className="p-4 border-b border-white/10 bg-white/5">
                        <h2 className="text-lg font-bold text-white">Visitor Sessions</h2>
                    </div>
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white/10 text-slate-400 font-bold">
                            <tr>
                                <th className="p-4 border-b border-white/10 whitespace-nowrap">Location</th>
                                <th className="p-4 border-b border-white/10 whitespace-nowrap">Session ID</th>
                                <th className="p-4 border-b border-white/10 whitespace-nowrap">Start Time</th>
                                <th className="p-4 border-b border-white/10 whitespace-nowrap">Duration</th>
                                <th className="p-4 border-b border-white/10 whitespace-nowrap">Current Page</th>
                                <th className="p-4 border-b border-white/10 whitespace-nowrap">User Agent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.map(s => (
                                <tr key={s.id} className="hover:bg-white/5 transition-colors group">
                                    <td className="p-4 border-b border-white/5 whitespace-nowrap">
                                        <span className="text-white font-bold">{s.location?.city || "Unknown"}</span>,
                                        <span className="text-slate-400 text-xs ml-1">{s.location?.region || "Unknown"}</span>
                                        <div className="text-[10px] text-amber-500/80 uppercase tracking-tighter mt-1">{s.location?.country || "Unknown"}</div>
                                    </td>
                                    <td className="p-4 border-b border-white/5 text-amber-500/80 font-bold truncate max-w-[120px]">{s.sessionId}</td>
                                    <td className="p-4 border-b border-white/5 whitespace-nowrap">
                                        {s.startTime?.toDate ? s.startTime.toDate().toLocaleString() : "Syncing..."}
                                    </td>
                                    <td className="p-4 border-b border-white/5 font-bold text-white">{s.totalTime || 0}s</td>
                                    <td className="p-4 border-b border-white/5 text-amber-400/80 uppercase tracking-wider text-xs font-bold">
                                        {s.currentSection || "Home"}
                                    </td>
                                    <td className="p-4 border-b border-white/5 text-xs text-slate-500 truncate max-w-[200px]" title={s.userAgent}>
                                        {s.userAgent}
                                    </td>
                                </tr>
                            ))}
                            {stats.length === 0 && (
                                <tr><td colSpan="6" className="p-8 text-center text-slate-500">No sessions recorded yet.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Resume Downloads Section */}
                <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden overflow-x-auto mb-12">
                    <div className="flex justify-between items-center p-4 border-b border-white/10 bg-white/5">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                            Resume Downloads
                            <span className="ml-2 px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full font-bold">{resumeDownloads.length} total</span>
                        </h2>
                        <button
                            onClick={clearResumeDownloads}
                            className="px-3 py-1.5 bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-600/30 rounded-lg text-xs font-bold transition-all"
                        >
                            Clear Records
                        </button>
                    </div>

                    {/* Per-resume summary badges */}
                    {Object.keys(downloadsByLabel).length > 0 && (
                        <div className="flex flex-wrap gap-2 p-4 border-b border-white/5 bg-white/[0.02]">
                            {Object.entries(downloadsByLabel).map(([label, count]) => (
                                <span key={label} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                    {label}
                                    <span className="ml-1 px-1.5 py-0.5 bg-emerald-500/25 text-emerald-300 rounded-full text-[10px] font-bold">{count}</span>
                                </span>
                            ))}
                        </div>
                    )}

                    <table className="w-full text-left text-sm">
                        <thead className="bg-white/10 text-slate-400 font-bold">
                            <tr>
                                <th className="p-4 border-b border-white/10 whitespace-nowrap">#</th>
                                <th className="p-4 border-b border-white/10 whitespace-nowrap">Resume Type</th>
                                <th className="p-4 border-b border-white/10 whitespace-nowrap">File</th>
                                <th className="p-4 border-b border-white/10 whitespace-nowrap">Downloaded At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resumeDownloads.map((s, idx) => (
                                <tr key={s.id} className="hover:bg-white/5 transition-colors group">
                                    <td className="p-4 border-b border-white/5 text-slate-500 text-xs">{idx + 1}</td>
                                    <td className="p-4 border-b border-white/5">
                                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-semibold border border-emerald-500/20">
                                            {s.label}
                                        </span>
                                    </td>
                                    <td className="p-4 border-b border-white/5 text-slate-500 text-xs truncate max-w-[240px]" title={s.file}>
                                        {s.file}
                                    </td>
                                    <td className="p-4 border-b border-white/5 text-slate-400 text-xs whitespace-nowrap">
                                        {s.timestamp?.toDate ? s.timestamp.toDate().toLocaleString() : "Syncing..."}
                                    </td>
                                </tr>
                            ))}
                            {resumeDownloads.length === 0 && (
                                <tr><td colSpan="4" className="p-8 text-center text-slate-500">No resume downloads recorded yet.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Chatbot Queries Section */}
                <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden overflow-x-auto">
                    <div className="flex justify-between items-center p-4 border-b border-white/10 bg-white/5">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                            Chatbot Queries
                        </h2>
                        <button
                            onClick={clearChatbotData}
                            className="px-3 py-1.5 bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-600/30 rounded-lg text-xs font-bold transition-all"
                        >
                            Clear Queries
                        </button>
                    </div>
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white/10 text-slate-400 font-bold">
                            <tr>
                                <th className="p-4 border-b border-white/10 whitespace-nowrap w-[200px]">Time</th>
                                <th className="p-4 border-b border-white/10 w-[40%]">Question</th>
                                <th className="p-4 border-b border-white/10">Chatbot Summary/Answer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {chatbotStats.map(s => (
                                <tr key={s.id} className="hover:bg-white/5 transition-colors group">
                                    <td className="p-4 border-b border-white/5 whitespace-nowrap text-xs text-slate-400 align-top">
                                        {s.timestamp?.toDate ? s.timestamp.toDate().toLocaleString() : "Syncing..."}
                                    </td>
                                    <td className="p-4 border-b border-white/5 text-slate-200 font-medium align-top">
                                        "{s.question}"
                                    </td>
                                    <td className="p-4 border-b border-white/5 text-slate-400 text-xs leading-relaxed align-top">
                                        <div className="line-clamp-3 hover:line-clamp-none transition-all duration-300">
                                            {s.answer}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {chatbotStats.length === 0 && (
                                <tr><td colSpan="3" className="p-8 text-center text-slate-500">No chatbot queries recorded yet.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminStats;
