import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ArrowDown,
  Briefcase,
  MapPin,
  Globe,
  Bot,
  BarChart2,
  Code2,
  Settings2,
} from "lucide-react";
import { Link } from "react-scroll";
import FloatingShape from "./FloatingShape";

const resumeOptions = [
  { label: "Full Stack Developer", file: "/resume/VIKAS T_full stack.pdf",       Icon: Globe,     color: "#6366f1" },
  { label: "AI Engineer",          file: "/resume/VIKAS T AI Engineer.pdf",      Icon: Bot,       color: "#06b6d4" },
  { label: "Data Science",         file: "/resume/VIKAS T data science.pdf",    Icon: BarChart2, color: "#8b5cf6" },
  { label: "Python Developer",     file: "/resume/VIKAS_T python developer.pdf", Icon: Code2,     color: "#10b981" },
  { label: "ERP Tech",             file: "/resume/VIKAS T ERP Tech.pdf",        Icon: Settings2, color: "#f59e0b" },
];

/* ── Typewriter hook ─────────────────────────────────────── */
const roles = [
  "Software Engineer",
  "Full-Stack Developer",
  "Product Engineer",
  "AI Enthusiast",
];

function useTypewriter(words, typeSpeed = 90, deleteSpeed = 55, pause = 1800) {
  const [text, setText] = useState("");
  const [idx, setIdx]   = useState(0);
  const [del, setDel]   = useState(false);

  useEffect(() => {
    const cur = words[idx];
    if (!del && text === cur) {
      const t = setTimeout(() => setDel(true), pause);
      return () => clearTimeout(t);
    }
    if (del && text === "") {
      setDel(false);
      setIdx((p) => (p + 1) % words.length);
      return;
    }
    const t = setTimeout(() => {
      setText(del ? cur.slice(0, text.length - 1) : cur.slice(0, text.length + 1));
    }, del ? deleteSpeed : typeSpeed);
    return () => clearTimeout(t);
  }, [text, del, idx, words, typeSpeed, deleteSpeed, pause]);

  return text;
}

/* ── Animated counter ────────────────────────────────────── */
function AnimatedCounter({ value, delay = 0 }) {
  const n = parseInt(value);
  const suffix = value.replace(/[0-9]/g, "");
  const [count, setCount] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      let i = 0;
      const step = 2000 / n;
      const id = setInterval(() => { i++; setCount(i); if (i >= n) clearInterval(id); }, step);
      return () => clearInterval(id);
    }, delay);
    return () => clearTimeout(t);
  }, [n, delay]);
  return <>{count}{suffix}</>;
}

const stats = [
  { value: "15+", label: "Projects Shipped" },
  { value: "4+",  label: "Clients Served" },
  { value: "10K+", label: "Users Reached" },
  { value: "2+",  label: "Yrs Building" },
];

/* ── Particle positions ── */
const PARTICLES = Array.from({ length: 10 }, (_, i) => ({
  w:     1.5 + (i % 3),
  top:   10 + i * 8,
  left:  5  + i * 9,
  color: ["#c0624a", "#c9882c", "#6b8f6e"][i % 3],
  dur:   5  + i * 0.6,
  delay: i  * 0.5,
  yEnd:  -(60 + i * 6),
}));

/* ── Main Hero ───────────────────────────────────────────── */
export default function Hero() {
  const typed = useTypewriter(roles);
  const shouldReduceMotion = useReducedMotion();
  const [showResumeModal, setShowResumeModal] = useState(false);

  const isMobile = typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;
  const disableHeavyFx = shouldReduceMotion || isMobile;

  const rawX  = useMotionValue(0);
  const rawY  = useMotionValue(0);
  const blobX = useSpring(rawX, { stiffness: 38, damping: 26, mass: 1 });
  const blobY = useSpring(rawY, { stiffness: 38, damping: 26, mass: 1 });

  useEffect(() => {
    if (disableHeavyFx) return;
    const fn = (e) => {
      rawX.set((e.clientX / window.innerWidth  - 0.5) * 18);
      rawY.set((e.clientY / window.innerHeight - 0.5) * 18);
    };
    window.addEventListener("mousemove", fn, { passive: true });
    return () => window.removeEventListener("mousemove", fn);
  }, [rawX, rawY, disableHeavyFx]);


  return (
    <section id="hero" className="min-h-screen flex items-center relative overflow-hidden hero-mesh">

      {/* ── Background layers ── */}
      {/* Warm dot grid */}
      <div className="absolute inset-0 grid-bg opacity-50 z-0" />

      {/* Mouse-reactive warm blobs */}
      <motion.div
        className="absolute top-[5%] left-[2%] w-[480px] h-[480px] rounded-full blur-[150px] hero-blob-1 z-0"
        style={{ background: "rgba(192,98,74,0.11)", x: disableHeavyFx ? 0 : blobX, y: disableHeavyFx ? 0 : blobY }}
      />
      <motion.div
        className="absolute bottom-[8%] right-[5%] w-[380px] h-[380px] rounded-full blur-[140px] hero-blob-2 z-0"
        style={{ background: "rgba(201,136,44,0.08)", x: disableHeavyFx ? 0 : blobX, y: disableHeavyFx ? 0 : blobY }}
      />
      <motion.div
        className="absolute top-[40%] right-[20%] w-[280px] h-[280px] rounded-full blur-[120px] z-0"
        style={{ background: "rgba(107,143,110,0.07)" }}
      />

      {/* Floating particles */}
      {!disableHeavyFx && PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full hidden md:block z-0"
          style={{
            width:      p.w,
            height:     p.w,
            top:        `${p.top}%`,
            left:       `${p.left}%`,
            background: p.color,
            willChange: "transform, opacity",
          }}
          animate={{ y: [0, p.yEnd, 0], opacity: [0, 0.5, 0] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}

      {/* ── Main layout ── */}
      <div className="max-w-7xl mx-auto px-6 w-full z-10 py-24">
        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* ════ LEFT: Text content ════ */}
          <div className="flex flex-col">

            {/* Status pills */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.55 }}
              className="flex flex-wrap items-center gap-2 self-start mb-7"
            >
              {/* Open-to-work pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/25 bg-emerald-50 text-emerald-700 text-xs font-medium backdrop-blur-sm shadow-sm">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
                <span className="text-emerald-700 font-semibold">Open to Work</span>
              </div>
              {/* Degree badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.22, duration: 0.45 }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-amber-400/30 bg-amber-50 text-amber-800 text-xs font-medium backdrop-blur-sm shadow-sm"
              >
                <span>🎓</span>
                <span>B.Tech AI &amp; DS · Graduating 2027</span>
              </motion.div>
            </motion.div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.65, ease: "easeOut" }}
            >
              <p className="text-stone-400 text-sm mb-3 tracking-wider uppercase" style={{ letterSpacing: "0.12em" }}>
                Hello, I'm
              </p>
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight mb-3"
                style={{ fontFamily: "'Playfair Display', 'DM Serif Display', serif" }}
              >
                <span className="text-stone-900 block">Vikas T</span>
              </h1>
            </motion.div>

            {/* Role typewriter — clean bar, no terminal chrome */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="mt-4 mb-7"
            >
              <div
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border shadow-sm"
                style={{ background: "#f5f0e8", borderColor: "rgba(192,98,74,0.18)" }}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,#c0624a,#c9882c)" }}
                />
                <span className="text-stone-700 text-sm font-medium min-w-[180px]">{typed}</span>
                <motion.span
                  className="w-0.5 h-4 rounded-sm"
                  style={{ background: "#c0624a" }}
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.9, repeat: Infinity }}
                />
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-stone-600 text-base md:text-[17px] leading-relaxed mb-9 max-w-lg"
            >
              I build production-grade apps from{" "}
              <span className="font-semibold" style={{ color: "#c0624a" }}>idea to deployment</span>.{" "}
              Full-stack products with Python, React &amp; AI —
              always focused on{" "}
              <span className="font-semibold" style={{ color: "#6b8f6e" }}>real-world impact</span>.
            </motion.p>

            {/* Hire-me banner */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.68, duration: 0.5 }}
              className="flex items-start gap-3 px-4 py-3 rounded-xl border mb-6 relative overflow-hidden"
              style={{
                background: "rgba(201,136,44,0.05)",
                borderColor: "rgba(201,136,44,0.25)",
              }}
            >
              <div
                className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-xl"
                style={{ background: "linear-gradient(to bottom, transparent, #c9882c, transparent)" }}
              />
              <span className="relative flex h-2 w-2 mt-1 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
              </span>
              <div>
                <p className="text-amber-800 text-sm font-semibold leading-snug">
                  Open to Full-Stack &amp; Backend Engineering roles
                </p>
                <p className="text-amber-700/60 text-xs mt-0.5">Available from Jan 2027 · Open to relocation</p>
              </div>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.5 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="projects" smooth duration={500} offset={-70}
                  className="group relative flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm cursor-pointer overflow-hidden transition-all"
                  style={{
                    background: "linear-gradient(135deg, #c0624a, #c9882c)",
                    color: "#ffffff",
                    boxShadow: "0 4px 24px rgba(192,98,74,0.28)",
                  }}
                >
                  <Briefcase size={15} className="group-hover:rotate-6 transition-transform" />
                  View Projects
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12"
                    initial={{ x: "-200%" }} whileHover={{ x: "200%" }}
                    transition={{ duration: 0.7 }}
                  />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                <button
                  onClick={() => setShowResumeModal(true)}
                  className="flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm border text-stone-700 hover:text-amber-800 transition-all bg-white shadow-sm"
                  style={{ borderColor: "rgba(192,98,74,0.18)" }}
                >
                  <Download size={15} /> Resume
                </button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="contact" smooth duration={500} offset={-70}
                  className="flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm border text-stone-700 hover:text-amber-800 transition-all cursor-pointer bg-white shadow-sm"
                  style={{ borderColor: "rgba(192,98,74,0.14)" }}
                >
                  Let's Talk
                </Link>
              </motion.div>
            </motion.div>

            {/* Social icons row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="text-[10px] text-stone-400 uppercase tracking-widest">Find me</span>
              <div className="w-6 h-px bg-stone-300" />
              {[
                { href: "https://github.com/Vikasthangavel/",         icon: <Github   size={17} />, hover: "hover:text-stone-900 hover:border-stone-300" },
                { href: "https://www.linkedin.com/in/vikasthangavel/", icon: <Linkedin size={17} />, hover: "hover:text-blue-600 hover:border-blue-300" },
                { href: "mailto:vikasthangavel@gmail.com",             icon: <Mail     size={17} />, hover: "hover:text-amber-700 hover:border-amber-300" },
              ].map((s, i) => (
                <motion.a
                  key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1 + i * 0.1 }} whileHover={{ y: -3, scale: 1.12 }}
                  className={`p-2 rounded-lg text-stone-400 border border-stone-200 bg-white shadow-sm transition-all duration-300 ${s.hover}`}
                >
                  {s.icon}
                </motion.a>
              ))}
            </motion.div>

            {/* ── Stat cards ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.55 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg"
            >
              {stats.map((st, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + i * 0.12 }}
                  whileHover={{ y: -4, scale: 1.03 }}
                  className="group relative flex flex-col items-center justify-center py-4 px-3 rounded-xl border cursor-default overflow-hidden warm-card"
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "rgba(192,98,74,0.35)";
                    e.currentTarget.style.background  = "rgba(192,98,74,0.04)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "";
                    e.currentTarget.style.background  = "";
                  }}
                >
                  <div
                    className="text-3xl font-black leading-none mb-1"
                    style={{ color: "#c0624a", fontFamily: "'Playfair Display', serif" }}
                  >
                    <AnimatedCounter value={st.value} delay={1400 + i * 250} />
                  </div>
                  <div className="text-[11px] text-stone-500 tracking-wide group-hover:text-stone-700 transition-colors text-center">
                    {st.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ════ RIGHT: Floating visual ════ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="hidden lg:flex items-center justify-center relative"
          >
            <FloatingShape />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <Link to="about" smooth duration={500} offset={-70} className="cursor-pointer absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
          className="flex flex-col items-center gap-1.5 hover:scale-110 transition-transform"
        >
          <motion.div
            animate={{ y: [0, 7, 0] }} transition={{ duration: 1.6, repeat: Infinity }}
            className="w-5 h-8 rounded-full border-2 flex justify-center pt-1.5"
            style={{ borderColor: "rgba(192,98,74,0.3)" }}
          >
            <div className="w-1 h-2 rounded-full" style={{ background: "rgba(192,98,74,0.5)" }} />
          </motion.div>
        </motion.div>
      </Link>

      {/* Left decorative line */}
      <motion.div
        initial={{ height: 0 }} animate={{ height: "100px" }} transition={{ delay: 1.5, duration: 1 }}
        className="hidden lg:block absolute left-7 top-1/2 -translate-y-1/2 w-px"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(192,98,74,0.2), transparent)" }}
      />
      {/* Resume Picker Modal */}
      {showResumeModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }}
          onClick={() => setShowResumeModal(false)}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.88, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 pt-6 pb-4 border-b border-stone-100">
              <h3
                className="text-lg font-bold text-stone-900 mb-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Download Resume
              </h3>
              <p className="text-xs text-stone-400">Choose the version that fits your need</p>
            </div>

            {/* Options */}
            <div className="p-4 flex flex-col gap-2">
              {resumeOptions.map((opt, i) => (
                <motion.a
                  key={i}
                  href={opt.file}
                  download
                  whileHover={{ x: 4, backgroundColor: "#fdf6f0" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowResumeModal(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border border-stone-100 hover:border-amber-300 transition-all cursor-pointer group"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${opt.color}15`, color: opt.color }}
                  >
                    <opt.Icon size={16} strokeWidth={2} />
                  </div>
                  <span className="flex-1 text-sm font-medium text-stone-700 group-hover:text-amber-800 transition-colors">
                    {opt.label}
                  </span>
                  <Download size={13} className="text-stone-300 group-hover:text-amber-500 transition-colors" />
                </motion.a>
              ))}
            </div>

            {/* Footer */}
            <div className="px-6 pb-5">
              <button
                onClick={() => setShowResumeModal(false)}
                className="w-full py-2 rounded-xl text-sm text-stone-400 hover:text-stone-600 hover:bg-stone-50 transition-all border border-transparent hover:border-stone-200"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
