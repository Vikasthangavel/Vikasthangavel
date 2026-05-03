import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ChevronRight,
  Download,
  Rocket,
  ArrowDown,
} from "lucide-react";
import { Link } from "react-scroll";
import resume from "../VIKAS_T.pdf";
import FloatingShape from "./FloatingShape";

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
  { value: "10K+", label: "Users Reached", sub: "via event platforms" },
  { value: "2+",  label: "Yrs Building" },
];

/* ── Particle positions — computed once, stable across renders ── */
const PARTICLES = Array.from({ length: 10 }, (_, i) => ({
  w:     1.5 + (i % 3),
  top:   10 + i * 8,
  left:  5  + i * 9,
  color: ["#4ade80", "#34d399", "#86efac"][i % 3],
  dur:   5  + i * 0.6,
  delay: i  * 0.5,
  yEnd:  -(60 + i * 6),
}));

/* ── Main Hero ───────────────────────────────────────────── */
export default function Hero() {
  const typed = useTypewriter(roles);

  // useMotionValue: mouse updates go straight to CSS transform — zero re-renders
  const rawX  = useMotionValue(0);
  const rawY  = useMotionValue(0);
  const blobX = useSpring(rawX, { stiffness: 38, damping: 26, mass: 1 });
  const blobY = useSpring(rawY, { stiffness: 38, damping: 26, mass: 1 });

  useEffect(() => {
    const fn = (e) => {
      rawX.set((e.clientX / window.innerWidth  - 0.5) * 18);
      rawY.set((e.clientY / window.innerHeight - 0.5) * 18);
    };
    window.addEventListener("mousemove", fn, { passive: true });
    return () => window.removeEventListener("mousemove", fn);
  }, [rawX, rawY]);


  return (
    <section id="hero" className="min-h-screen flex items-center relative overflow-hidden">

      {/* ── Background layers ── */}
      {/* Subtle noise */}
      <div
        className="absolute inset-0 z-0 opacity-[0.018]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
        }}
      />

      {/* Grid lines */}
      <div className="absolute inset-0 grid-bg opacity-35 z-0" />

      {/* Mouse-reactive glow blobs — driven by motion values, no re-render */}
      <motion.div
        className="absolute top-[5%] left-[2%] w-[480px] h-[480px] rounded-full blur-[140px] hero-blob-1 z-0"
        style={{ background: "rgba(74,222,128,0.055)", x: blobX, y: blobY }}
      />
      <motion.div
        className="absolute bottom-[8%] right-[5%] w-[380px] h-[380px] rounded-full blur-[130px] hero-blob-2 z-0"
        style={{ background: "rgba(16,185,129,0.04)", x: blobX, y: blobY }}
      />

      {/* Floating particles — positions from memoised constant, CSS-only anim */}
      {PARTICLES.map((p, i) => (
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
          animate={{ y: [0, p.yEnd, 0], opacity: [0, 0.6, 0] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}

      {/* ── Main layout ── */}
      <div className="max-w-7xl mx-auto px-6 w-full z-10 py-24">
        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* ════ LEFT: Text content ════ */}
          <div className="flex flex-col">

            {/* Status pill row */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.55 }}
              className="flex flex-wrap items-center gap-2 self-start mb-7"
            >
              {/* Open-to-work pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-green-500/20 bg-green-500/5 text-green-300/85 text-xs font-mono backdrop-blur-sm">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
                </span>
                <span className="text-gray-500">~/vikas-t</span>
                <ChevronRight size={11} className="text-gray-600" />
                <span className="text-green-400">open-to-work</span>
              </div>
              {/* Degree badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.22, duration: 0.45 }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-amber-500/25 bg-amber-500/8 text-amber-300/90 text-xs font-mono backdrop-blur-sm"
              >
                <span className="text-amber-500">🎓</span>
                <span className="text-amber-400/80">B.Tech AI &amp; DS</span>
                <span className="text-gray-600">•</span>
                <span className="text-amber-300">Graduating May 2027</span>
              </motion.div>
            </motion.div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.65, ease: "easeOut" }}
            >
              <p className="text-gray-500 font-mono text-sm mb-3 tracking-widest">// hello world</p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.92] tracking-tight mb-3">
                <span className="text-white/90 block">I'm</span>
                <span
                  className="block mt-1 gradient-text animate-gradient-text"
                  style={{ filter: "drop-shadow(0 0 28px rgba(74,222,128,0.35))" }}
                >
                  Vikas T
                </span>
              </h1>
            </motion.div>

            {/* Typewriter bar */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="mt-4 mb-7"
            >
              <div
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-lg font-mono text-sm border"
                style={{ background: "#0a1a0c", borderColor: "rgba(74,222,128,0.15)" }}
              >
                {/* traffic-light dots */}
                <div className="flex gap-1.5 mr-1">
                  <span className="w-2 h-2 rounded-full bg-red-500/70" />
                  <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
                  <span className="w-2 h-2 rounded-full bg-green-500/70" />
                </div>
                <span className="text-green-600 select-none">$</span>
                <span className="text-gray-300 min-w-[180px]">{typed}</span>
                <motion.span
                  className="w-0.5 h-4 bg-green-400 rounded-sm"
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
              className="text-gray-400 text-base md:text-[17px] leading-relaxed mb-9 max-w-lg"
            >
              Building production-grade apps from{" "}
              <span className="text-green-400/90 font-medium">idea to deployment</span>.{" "}
              Full-stack products with Python, React &amp; AI —
              focused on{" "}
              <span className="text-emerald-300/80 font-medium">real-world impact</span>.
            </motion.p>

            {/* ── Hire-me CTA banner ── */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.68, duration: 0.5 }}
              className="flex items-start gap-3 px-4 py-3 rounded-xl border mb-6 relative overflow-hidden"
              style={{
                background: "rgba(251,191,36,0.05)",
                borderColor: "rgba(251,191,36,0.25)",
                boxShadow: "0 0 24px rgba(251,191,36,0.06)",
              }}
            >
              {/* Left accent strip */}
              <div
                className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-xl"
                style={{ background: "linear-gradient(to bottom, transparent, #f59e0b, transparent)" }}
              />
              {/* Pulsing dot */}
              <span className="relative flex h-2 w-2 mt-1 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
              </span>
              <div>
                <p className="text-amber-300 text-sm font-semibold leading-snug">
                  Open to Full-Stack &amp; Backend Engineering roles
                </p>
                <p className="text-amber-400/55 text-xs font-mono mt-0.5">Available from July 2026 · Open to relocation</p>
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
                    background: "linear-gradient(135deg, #22c55e, #10b981)",
                    color: "#050d07",
                    boxShadow: "0 4px 24px rgba(34,197,94,0.22)",
                  }}
                >
                  <Rocket size={15} className="group-hover:rotate-12 transition-transform" />
                  View Projects
                  {/* shimmer */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12"
                    initial={{ x: "-200%" }} whileHover={{ x: "200%" }}
                    transition={{ duration: 0.7 }}
                  />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                <a
                  href={resume} download="Vikas_T_Resume.pdf"
                  className="flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm border text-gray-300 hover:text-white transition-all backdrop-blur-sm"
                  style={{ borderColor: "rgba(74,222,128,0.2)", background: "rgba(74,222,128,0.04)" }}
                >
                  <Download size={15} /> Resume
                </a>
              </motion.div>

              <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="contact" smooth duration={500} offset={-70}
                  className="flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm border text-gray-300 hover:text-white transition-all backdrop-blur-sm cursor-pointer"
                  style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}
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
              <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">Find me</span>
              <div className="w-6 h-px bg-gray-800" />
              {[
                { href: "https://github.com/Vikasthangavel/",         icon: <Github   size={17} />, hover: "hover:text-white   hover:border-white/30" },
                { href: "https://www.linkedin.com/in/vikasthangavel/", icon: <Linkedin size={17} />, hover: "hover:text-blue-400 hover:border-blue-400/30" },
                { href: "mailto:vikasthangavel@gmail.com",             icon: <Mail     size={17} />, hover: "hover:text-green-400 hover:border-green-400/30" },
              ].map((s, i) => (
                <motion.a
                  key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1 + i * 0.1 }} whileHover={{ y: -3, scale: 1.12 }}
                  className={`p-2 rounded-lg text-gray-500 border border-white/[0.06] bg-white/[0.02] transition-all duration-300 ${s.hover}`}
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
                  className="group relative flex flex-col items-center justify-center py-4 px-3 rounded-xl border cursor-default overflow-hidden"
                  style={{
                    background: "rgba(74,222,128,0.04)",
                    borderColor: "rgba(74,222,128,0.12)",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "rgba(74,222,128,0.3)";
                    e.currentTarget.style.background  = "rgba(74,222,128,0.07)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "rgba(74,222,128,0.12)";
                    e.currentTarget.style.background  = "rgba(74,222,128,0.04)";
                  }}
                >
                  {/* glow on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse at center, rgba(74,222,128,0.08) 0%, transparent 70%)" }}
                  />
                  {/* top accent line */}
                  <div
                    className="absolute top-0 left-4 right-4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "linear-gradient(to right, transparent, rgba(74,222,128,0.5), transparent)" }}
                  />
                  <div
                    className="text-3xl font-black font-mono leading-none mb-1"
                    style={{ color: "#4ade80", textShadow: "0 0 18px rgba(74,222,128,0.4)" }}
                  >
                    <AnimatedCounter value={st.value} delay={1400 + i * 250} />
                  </div>
                  <div className="text-[11px] text-gray-500 font-mono tracking-wide group-hover:text-gray-400 transition-colors text-center">
                    {st.label}
                  </div>
                  {st.sub && (
                    <div className="text-[9px] text-gray-700 font-mono tracking-wide mt-0.5 text-center leading-tight">
                      {st.sub}
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ════ RIGHT: Animation ════ */}
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
            style={{ borderColor: "rgba(74,222,128,0.3)" }}
          >
            <div className="w-1 h-2 bg-green-500/60 rounded-full" />
          </motion.div>
        </motion.div>
      </Link>

      {/* Left decorative line */}
      <motion.div
        initial={{ height: 0 }} animate={{ height: "100px" }} transition={{ delay: 1.5, duration: 1 }}
        className="hidden lg:block absolute left-7 top-1/2 -translate-y-1/2 w-px"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(74,222,128,0.22), transparent)" }}
      />
    </section>
  );
}
