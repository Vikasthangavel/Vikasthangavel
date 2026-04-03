import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
  { value: "13+", label: "Projects" },
  { value: "4+",  label: "Clients" },
  { value: "10K+",label: "Users" },
];

/* ── Main Hero ───────────────────────────────────────────── */
export default function Hero() {
  const typed = useTypewriter(roles);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fn = (e) =>
      setMouse({
        x: (e.clientX / window.innerWidth  - 0.5) * 18,
        y: (e.clientY / window.innerHeight - 0.5) * 18,
      });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

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

      {/* Mouse-reactive glow blobs */}
      <motion.div
        className="absolute top-[5%] left-[2%] w-[480px] h-[480px] rounded-full blur-[140px] hero-blob-1 z-0"
        style={{ background: "rgba(74,222,128,0.055)" }}
        animate={{ x: mouse.x * 0.4, y: mouse.y * 0.4 }}
        transition={{ type: "spring", damping: 55 }}
      />
      <motion.div
        className="absolute bottom-[8%] right-[5%] w-[380px] h-[380px] rounded-full blur-[130px] hero-blob-2 z-0"
        style={{ background: "rgba(16,185,129,0.04)" }}
        animate={{ x: mouse.x * -0.25, y: mouse.y * -0.25 }}
        transition={{ type: "spring", damping: 55 }}
      />

      {/* Floating micro-particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full hidden md:block z-0"
          style={{
            width:  `${1.5 + (i % 3)}px`,
            height: `${1.5 + (i % 3)}px`,
            top:    `${10 + i * 8}%`,
            left:   `${5  + i * 9}%`,
            background: ["#4ade80","#34d399","#86efac"][i % 3],
          }}
          animate={{ y: [0, -60 - i * 6, 0], opacity: [0, 0.65, 0] }}
          transition={{ duration: 5 + i * 0.6, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
        />
      ))}

      {/* ── Main layout ── */}
      <div className="max-w-7xl mx-auto px-6 w-full z-10 py-24">
        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* ════ LEFT: Text content ════ */}
          <div className="flex flex-col">

            {/* Status pill */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.55 }}
              className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full border border-green-500/20 bg-green-500/5 text-green-300/85 text-xs font-mono mb-7 backdrop-blur-sm"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
              </span>
              <span className="text-gray-500">~/vikas-t</span>
              <ChevronRight size={11} className="text-gray-600" />
              <span className="text-green-400">open-to-work</span>
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

            {/* Socials + stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="flex items-center gap-6 flex-wrap"
            >
              {/* Social icons */}
              <div className="flex items-center gap-2">
                {[
                  { href: "https://github.com/Vikasthangavel/",        icon: <Github   size={17} />, hover: "hover:text-white   hover:border-white/30" },
                  { href: "https://www.linkedin.com/in/vikasthangavel/",icon: <Linkedin size={17} />, hover: "hover:text-blue-400 hover:border-blue-400/30" },
                  { href: "mailto:vikasthangavel@gmail.com",            icon: <Mail     size={17} />, hover: "hover:text-green-400 hover:border-green-400/30" },
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
              </div>

              {/* Divider */}
              <div className="w-px h-8 bg-gray-800 hidden sm:block" />

              {/* Mini stats */}
              <div className="flex gap-5">
                {stats.map((st, i) => (
                  <div key={i} className="text-center cursor-default">
                    <div className="text-lg font-black font-mono gradient-text leading-none">
                      <AnimatedCounter value={st.value} delay={1300 + i * 250} />
                    </div>
                    <div className="text-[10px] text-gray-600 font-mono mt-0.5 tracking-wide">{st.label}</div>
                  </div>
                ))}
              </div>
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
