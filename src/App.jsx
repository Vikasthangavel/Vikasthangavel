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
import ChatBot from "./components/Chatbot.jsx";


function App() {
  useAnalytics();
  const showStats = new URLSearchParams(window.location.search).get("view") === "stats";

  return (
    <div
      className="min-h-screen text-stone-900 font-sans selection:bg-amber-700/20 selection:text-amber-900 relative"
      style={{
        background: "#faf8f5",
      }}
    >
      {/* Warm gradient overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 15% 0%, rgba(192,98,74,0.06) 0%, transparent 60%)," +
            "radial-gradient(ellipse 55% 45% at 88% 92%, rgba(201,136,44,0.05) 0%, transparent 55%)",
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
