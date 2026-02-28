import React, { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from "../firebase";

const AdminStats = () => {
    const [stats, setStats] = useState([]);
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

        fetchStats();
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
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden overflow-x-auto">
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
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminStats;
