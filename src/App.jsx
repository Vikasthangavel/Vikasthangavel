import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Achievements from "./components/Achievements";
import Hobbies from "./components/Hobbies";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import QuickSummary from "./components/QuickSummary";
import { useAnalytics } from "./hooks/useAnalytics";
import AdminStats from "./components/AdminStats";
import ChatBot from "./components/ChatBot.jsx";


function App() {
  useAnalytics();
  const showStats = new URLSearchParams(window.location.search).get("view") === "stats";

  return (
    <div
      className="min-h-screen text-slate-900 font-sans selection:bg-indigo-500 selection:text-white relative"
      style={{
        background: "#f8faff",
        backgroundImage: "radial-gradient(circle, rgba(99,102,241,0.08) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      {/* Soft gradient mask over dot grid */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% 0%, rgba(99,102,241,0.07) 0%, transparent 60%)," +
            "radial-gradient(ellipse 60% 50% at 90% 90%, rgba(139,92,246,0.06) 0%, transparent 55%)",
        }}
      />
      <div className="relative z-10">
        {showStats && <AdminStats />}
        <Navbar />
        <Hero />
        <QuickSummary />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Achievements />
        <Hobbies />
        <Contact />
        <Footer />
        <ChatBot />
      </div>
    </div>
  );
}

export default App;
