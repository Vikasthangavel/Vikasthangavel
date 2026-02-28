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
import { useAnalytics } from "./hooks/useAnalytics";
import AdminStats from "./components/AdminStats";


function App() {
  useAnalytics();
  const showStats = new URLSearchParams(window.location.search).get("view") === "stats";

  return (
    <div className="bg-[#0a0a0f] min-h-screen text-slate-100 font-sans selection:bg-amber-500 selection:text-black">
      {showStats && <AdminStats />}
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Achievements />
      <Hobbies />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
