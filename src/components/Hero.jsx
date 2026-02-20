import React, { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, FileText, ArrowDown, Terminal, ChevronRight, Download, Sparkles } from "lucide-react";
import { Link } from "react-scroll";
import resume from "../VIKAS_T.pdf";
import FloatingShape from "./FloatingShape";

const roles = [
  "Software Engineer",
  "Product Engineer",
  "Full-Stack Developer",
  "AI Enthusiast",
];

function useTypewriter(words, typingSpeed = 100, deletingSpeed = 60, pause = 1800) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    let timeout;

    if (!isDeleting && text === current) {
      timeout = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    } else {
      timeout = setTimeout(() => {
        setText(
          isDeleting ? current.substring(0, text.length - 1) : current.substring(0, text.length + 1)
        );
      }, isDeleting ? deletingSpeed : typingSpeed);
    }
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pause]);

  return text;
}

export default function Hero() {
  const typedText = useTypewriter(roles);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden grid-bg"
    >
      {/* 3D Floating Geometric Shape */}
      <Suspense fallback={null}>
        <FloatingShape />
      </Suspense>

      {/* Animated background orbs */}
      <div className="absolute top-20 left-[10%] w-72 h-72 bg-cyan-500/10 rounded-full blur-[120px] animate-float"></div>
      <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] animate-float-delay"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px]"></div>

      {/* Animated particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-cyan-400/30 rounded-full hidden md:block"
          style={{
            top: `${15 + i * 14}%`,
            left: `${5 + i * 16}%`,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, 20 * (i % 2 === 0 ? 1 : -1), 0],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 4 + i * 0.8,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating code symbols */}
      <motion.span
        animate={{ y: [0, -15, 0], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-[15%] left-[8%] text-cyan-500/20 text-6xl font-mono select-none hidden md:block"
      >{"<>"}</motion.span>
      <motion.span
        animate={{ y: [0, 12, 0], opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        className="absolute top-[25%] right-[12%] text-purple-500/20 text-5xl font-mono select-none hidden md:block"
      >{"/>"}</motion.span>
      <motion.span
        animate={{ y: [0, -10, 0], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        className="absolute bottom-[30%] left-[15%] text-blue-500/15 text-4xl font-mono select-none hidden md:block"
      >{"{ }"}</motion.span>
      <motion.span
        animate={{ y: [0, 18, 0], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
        className="absolute bottom-[20%] right-[8%] text-cyan-500/15 text-5xl font-mono select-none hidden md:block"
      >{"/*"}</motion.span>

      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Terminal-style intro */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-300 text-sm font-mono mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span>~/vikas-t</span>
            <ChevronRight size={14} />
            <span className="text-gray-400">status:</span>
            <span className="text-green-400">open-to-work</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 leading-tight">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-white inline-block"
            >Hi, I'm </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5, type: "spring", stiffness: 200 }}
              className="gradient-text text-glow-cyan animate-gradient-text inline-block"
            >Vikas T</motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="text-base md:text-lg text-gray-400 font-medium mb-6 tracking-wide"
          >
            Full Stack Developer <span className="text-cyan-500 animate-pulse">|</span> Python + React Developer <span className="text-cyan-500 animate-pulse">|</span> AI & Product Builder
          </motion.p>

          {/* Typing role */}
          <div className="text-xl md:text-2xl lg:text-3xl text-gray-400 mb-10 h-10 font-mono">
            <span className="text-cyan-500">{">"}</span>{" "}
            <span className="text-gray-200">{typedText}</span>
            <span className="text-cyan-400 animate-pulse">|</span>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="flex flex-wrap gap-4 justify-center mb-14"
          >
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="projects"
                smooth={true}
                duration={500}
                offset={-70}
                className="group px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold transition-all cursor-pointer shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 flex items-center gap-2 magnetic-btn relative overflow-hidden"
              >
                <Sparkles size={16} className="animate-pulse" />
                View Projects
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                  initial={{ x: "-200%" }}
                  whileHover={{ x: "200%" }}
                  transition={{ duration: 0.8 }}
                />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="contact"
                smooth={true}
                duration={500}
                offset={-70}
                className="px-8 py-3.5 border border-gray-700 hover:border-cyan-500/50 text-white rounded-xl font-semibold transition-all hover:bg-cyan-500/5 cursor-pointer magnetic-btn block"
              >
                Contact Me
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
              <a
                href={resume}
                download="Vikas_T_Resume.pdf"
                className="px-8 py-3.5 border border-gray-700 hover:border-purple-500/50 text-white rounded-xl font-semibold transition-all hover:bg-purple-500/5 cursor-pointer flex items-center gap-2 magnetic-btn"
              >
                <Download size={18} />
                Resume
              </a>
            </motion.div>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="flex gap-4 justify-center">
            {[
              { href: "https://github.com/Vikasthangavel/", icon: <Github size={22} />, color: "hover:border-gray-400 hover:text-white hover:bg-white/10" },
              { href: "https://www.linkedin.com/in/vikasthangavel/", icon: <Linkedin size={22} />, color: "hover:border-blue-500 hover:text-blue-400 hover:bg-blue-500/10" },
              { href: "mailto:vikasthangavel@gmail.com", icon: <Mail size={22} />, color: "hover:border-cyan-500 hover:text-cyan-400 hover:bg-cyan-500/10" },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.1 }}
                whileHover={{ y: -5, scale: 1.15, rotate: [0, -5, 5, 0] }}
                whileTap={{ scale: 0.9 }}
                className={`p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-gray-400 transition-all duration-300 ${social.color}`}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <Link to="about" smooth={true} duration={500} offset={-70} className="cursor-pointer">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hover:scale-110 transition-transform"
        >
          <span className="text-xs font-mono text-gray-600 tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 rounded-full border-2 border-gray-700 hover:border-cyan-500/50 transition-colors flex justify-center pt-1.5"
          >
            <div className="w-1 h-2 bg-cyan-500 rounded-full"></div>
          </motion.div>
        </motion.div>
      </Link>
    </section>
  );
}
