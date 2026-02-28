import { useEffect, useRef } from "react";
import { collection, addDoc, updateDoc, doc, serverTimestamp, increment } from "firebase/firestore";
import { db } from "../firebase";

const isBot = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    const bots = [
        "googlebot", "bingbot", "slurp", "duckduckbot", "baiduspider", "yandexbot",
        "spider", "robot", "crawler", "curl", "libwww", "phantomjs", "headless"
    ];
    return bots.some(bot => userAgent.includes(bot)) || navigator.webdriver;
};

export const useAnalytics = () => {
    const sessionId = useRef(Math.random().toString(36).substring(2, 15));
    const docRef = useRef(null);
    const startTime = useRef(Date.now());

    useEffect(() => {
        if (isBot()) return;

        const logVisit = async () => {
            try {
                let location = { city: "Unknown", region: "Unknown", country: "Unknown" };
                const fetchLocation = async () => {
                    const apis = [
                        "https://api.db-ip.com/v2/free/self",
                        "https://ipwho.is/",
                        "https://ipapi.co/json/",
                        "https://geolocation-db.com/json/"
                    ];

                    for (const url of apis) {
                        try {
                            const res = await fetch(url);
                            if (!res.ok) continue;
                            const data = await res.json();

                            // Handle different response formats accurately
                            return {
                                city: data.city || data.city_name || "Unknown",
                                region: data.region || data.region_name || data.state_prov || data.stateProv || data.state || "Unknown",
                                country: data.country || data.country_name || data.countryName || "Unknown"
                            };
                        } catch (e) {
                            // Silently try the next fallback if blocked by browser
                        }
                    }
                    return location;
                };

                location = await fetchLocation();

                const visitData = {
                    sessionId: sessionId.current,
                    startTime: serverTimestamp(),
                    userAgent: navigator.userAgent,
                    platform: navigator.platform,
                    location,
                    pagesViewed: {},
                    totalTime: 0,
                };
                const ref = await addDoc(collection(db, "analytics"), visitData);
                docRef.current = ref;
            } catch (err) {
                console.error("Error logging visit:", err);
            }
        };

        logVisit();

        const updateDuration = async () => {
            if (!docRef.current) return;
            const duration = Math.round((Date.now() - startTime.current) / 1000);
            try {
                await updateDoc(docRef.current, {
                    totalTime: duration,
                    lastActive: serverTimestamp()
                });
            } catch (err) {
                console.error("Error updating duration:", err);
            }
        };

        const interval = setInterval(updateDuration, 30000); // Update every 30s

        const handleVisibilityChange = () => {
            if (document.hidden) {
                updateDuration();
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        window.addEventListener("beforeunload", updateDuration);

        return () => {
            clearInterval(interval);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            window.removeEventListener("beforeunload", updateDuration);
            updateDuration();
        };
    }, []);

    // Section Tracking
    useEffect(() => {
        if (isBot()) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(async (entry) => {
                    if (entry.isIntersecting && docRef.current) {
                        const sectionId = entry.target.id;
                        try {
                            await updateDoc(docRef.current, {
                                [`pagesViewed.${sectionId}`]: increment(1),
                                currentSection: sectionId
                            });
                        } catch (err) {
                            console.error("Error tracking section:", err);
                        }
                    }
                });
            },
            { threshold: 0.5 }
        );

        const sections = document.querySelectorAll("section[id]");
        sections.forEach(section => observer.observe(section));

        return () => observer.disconnect();
    }, []);
};
