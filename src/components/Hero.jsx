import React, { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, FileText, ArrowDown, Terminal, ChevronRight, Download, Sparkles, Code2, Rocket, Zap } from "lucide-react";
import { Link } from "react-scroll";
import resume from "../VIKAS_T.pdf";
import FloatingShape from "./FloatingShape";

const roles = [
  "Software Engineer",
  "Product Engineer",
  "Full-Stack Developer",
  "AI Enthusiast",
];

const stats = [
  { value: "10+", label: "Projects Shipped" },
  { value: "3+", label: "Client Products" },
  { value: "10K+", label: "Users Served" },
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

function AnimatedCounter({ value, delay = 0 }) {
  const numericPart = parseInt(value);
  const suffix = value.replace(/[0-9]/g, "");
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let start = 0;
      const end = numericPart;
      const duration = 2000;
      const stepTime = duration / end;
      const counter = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= end) clearInterval(counter);
      }, stepTime);
      return () => clearInterval(counter);
    }, delay);
    return () => clearTimeout(timer);
  }, [numericPart, delay]);

  return <>{count}{suffix}</>;
}

export default function Hero() {
  const typedText = useTypewriter(roles);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center relative overflow-hidden"
    >
      {/* === Layered Background === */}
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.015] z-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")", backgroundRepeat: "repeat" }} />

      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Morphing gradient blobs */}
      <motion.div
        animate={{ x: mousePos.x * 0.5, y: mousePos.y * 0.5 }}
        transition={{ type: "spring", damping: 50 }}
        className="absolute top-[5%] left-[5%] w-[500px] h-[500px] bg-amber-500/8 rounded-full blur-[150px] hero-blob-1"
      />
      <motion.div
        animate={{ x: mousePos.x * -0.3, y: mousePos.y * -0.3 }}
        transition={{ type: "spring", damping: 50 }}
        className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] bg-purple-600/8 rounded-full blur-[140px] hero-blob-2"
      />
      <motion.div
        animate={{ x: mousePos.x * 0.2, y: mousePos.y * 0.2 }}
        transition={{ type: "spring", damping: 50 }}
        className="absolute top-[40%] left-[40%] w-[350px] h-[350px] bg-rose-500/5 rounded-full blur-[130px]"
      />

      {/* Floating ember particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`ember-${i}`}
          className="absolute rounded-full hidden md:block"
          style={{
            width: `${2 + Math.random() * 3}px`,
            height: `${2 + Math.random() * 3}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            background: i % 3 === 0 ? "#f59e0b" : i % 3 === 1 ? "#a855f7" : "#fb7185",
          }}
          animate={{
            y: [0, -80 - Math.random() * 60, 0],
            x: [0, (Math.random() - 0.5) * 40, 0],
            opacity: [0, 0.7, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* 3D Shape - repositioned and larger */}
      <Suspense fallback={null}>
        <FloatingShape />
      </Suspense>

      {/* === Main Content === */}
      <div className="max-w-7xl mx-auto px-6 w-full z-10 py-20">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left Column - Main Content (3/5) */}
          <div className="lg:col-span-3 text-left">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-300/90 text-xs font-mono mb-6 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
              </span>
              <span className="text-gray-500">~/vikas-t</span>
              <ChevronRight size={12} className="text-gray-600" />
              <span className="text-green-400">open-to-work</span>
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
            >
              <p className="text-gray-500 font-mono text-sm mb-2 tracking-wider">{"// hello world"}</p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-2 leading-[0.95] tracking-tight">
                <span className="text-white block">I'm</span>
                <span className="gradient-text text-glow-amber animate-gradient-text block mt-1">Vikas T</span>
              </h1>
            </motion.div>

            {/* Typewriter role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-5 mb-6"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2.5 bg-[#0d1117] border border-gray-800 rounded-lg font-mono text-sm">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                </div>
                <span className="text-gray-600 ml-1">|</span>
                <span className="text-amber-500">--</span>
                <span className="text-gray-300">{typedText}</span>
                <span className="text-amber-400 animate-pulse font-light">▊</span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-gray-400 text-base md:text-lg leading-relaxed mb-8 max-w-xl"
            >
              Building production-grade apps from{" "}
              <span className="text-amber-400/90 font-medium">idea to deployment</span>. 
              I craft full-stack products with Python, React & AI — focusing on 
              <span className="text-rose-400/90 font-medium"> real-world impact</span>.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="projects"
                  smooth={true}
                  duration={500}
                  offset={-70}
                  className="group px-7 py-3.5 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-xl font-semibold transition-all cursor-pointer shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 flex items-center gap-2.5 magnetic-btn relative overflow-hidden"
                >
                  <Rocket size={16} className="group-hover:rotate-12 transition-transform" />
                  View Projects
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                    initial={{ x: "-200%" }}
                    whileHover={{ x: "200%" }}
                    transition={{ duration: 0.8 }}
                  />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                <a
                  href={resume}
                  download="Vikas_T_Resume.pdf"
                  className="px-7 py-3.5 border border-gray-700/80 hover:border-amber-500/40 text-gray-300 hover:text-white rounded-xl font-semibold transition-all hover:bg-amber-500/5 cursor-pointer flex items-center gap-2.5 magnetic-btn backdrop-blur-sm"
                >
                  <Download size={16} />
                  Resume
                </a>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="contact"
                  smooth={true}
                  duration={500}
                  offset={-70}
                  className="px-7 py-3.5 border border-gray-700/80 hover:border-purple-500/40 text-gray-300 hover:text-white rounded-xl font-semibold transition-all hover:bg-purple-500/5 cursor-pointer magnetic-btn block backdrop-blur-sm"
                >
                  Let's Talk
                </Link>
              </motion.div>
            </motion.div>

            {/* Social row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="flex items-center gap-5"
            >
              <span className="text-[11px] font-mono text-gray-600 uppercase tracking-widest">Find me</span>
              <div className="w-8 h-px bg-gray-800"></div>
              {[
                { href: "https://github.com/Vikasthangavel/", icon: <Github size={18} />, hover: "hover:text-white hover:border-gray-500" },
                { href: "https://www.linkedin.com/in/vikasthangavel/", icon: <Linkedin size={18} />, hover: "hover:text-blue-400 hover:border-blue-500/40" },
                { href: "mailto:vikasthangavel@gmail.com", icon: <Mail size={18} />, hover: "hover:text-amber-400 hover:border-amber-500/40" },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + i * 0.1 }}
                  whileHover={{ y: -3, scale: 1.1 }}
                  className={`p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] text-gray-500 transition-all duration-300 ${social.hover}`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Stats & Visual (2/5) */}
          <div className="lg:col-span-2 hidden lg:flex flex-col items-end gap-6">
            {/* Stats cards */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.7 }}
              className="space-y-4 w-full max-w-xs"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + i * 0.15 }}
                  whileHover={{ x: -5, scale: 1.02 }}
                  className="group flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-amber-500/20 hover:bg-white/[0.04] transition-all backdrop-blur-sm cursor-default"
                >
                  <div className="text-3xl md:text-4xl font-black font-mono gradient-text leading-none">
                    <AnimatedCounter value={stat.value} delay={1200 + i * 300} />
                  </div>
                  <div className="w-px h-8 bg-gray-800 group-hover:bg-amber-500/30 transition-colors"></div>
                  <span className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors font-medium">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Floating tech stack badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="flex flex-wrap gap-2 justify-end max-w-xs"
            >
              {["Python", "React", "SQL", "Flask", "AI/ML"].map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.6 + i * 0.08 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="text-[11px] px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-gray-500 font-mono hover:border-amber-500/20 hover:text-amber-400/80 transition-all cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <Link to="about" smooth={true} duration={500} offset={-70} className="cursor-pointer">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hover:scale-110 transition-transform"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 rounded-full border-2 border-gray-800 hover:border-amber-500/40 transition-colors flex justify-center pt-1.5"
          >
            <div className="w-1 h-2 bg-amber-500/70 rounded-full"></div>
          </motion.div>
        </motion.div>
      </Link>

      {/* Decorative side line */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: "120px" }}
        transition={{ delay: 1.5, duration: 1 }}
        className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2 w-px bg-gradient-to-b from-transparent via-amber-500/30 to-transparent"
      />
    </section>
  );
}
