import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Languages, Code2, Server, Database, Cloud, Cpu, Wrench, Sparkles, Zap } from "lucide-react";

/* ─── Exported flat list (chatbot context) ─── */
export const techSkills = [
  { name: "Python" }, { name: "Java" }, { name: "JavaScript" }, { name: "SQL" }, { name: "HTML/CSS" },
  { name: "React" }, { name: "Flask" }, { name: "Express.js" }, { name: "Node.js" }, { name: "SpringBoot" },
  { name: "Supabase" }, { name: "Firebase" }, { name: "PostgreSQL" }, { name: "MySQL" },
  { name: "Cloudflare" }, { name: "VPS" }, { name: "GitHub" }, { name: "Vercel" },
  { name: "Roboflow" }, { name: "LangChain" },
  { name: "Power BI" }, { name: "Razorpay" }, { name: "Cashfree" }, { name: "Twilio" },
];

const skillCategories = [
  {
    label: "Languages",
    Icon: Code2,
    color: "#4ade80",
    darkColor: "#166534",
    glow: "rgba(74,222,128,0.25)",
    tags: ["Python", "Java", "JavaScript", "SQL", "HTML / CSS"],
  },
  {
    label: "Frameworks",
    Icon: Server,
    color: "#60a5fa",
    darkColor: "#1e3a5f",
    glow: "rgba(96,165,250,0.25)",
    tags: ["React", "Flask", "Express.js", "Node.js"],
  },
  {
    label: "Databases",
    Icon: Database,
    color: "#a78bfa",
    darkColor: "#3b1f6b",
    glow: "rgba(167,139,250,0.25)",
    tags: ["Supabase", "Firebase", "PostgreSQL", "MySQL"],
  },
  {
    label: "Cloud & DevOps",
    Icon: Cloud,
    color: "#38bdf8",
    darkColor: "#0c3345",
    glow: "rgba(56,189,248,0.25)",
    tags: ["Cloudflare", "VPS", "GitHub", "Vercel"],
  },
  {
    label: "AI / ML",
    Icon: Cpu,
    color: "#f472b6",
    darkColor: "#5b0f3c",
    glow: "rgba(244,114,182,0.25)",
    tags: ["Roboflow", "LangChain"],
  },
  {
    label: "Tools & Integrations",
    Icon: Wrench,
    color: "#fb923c",
    darkColor: "#5c2209",
    glow: "rgba(251,146,60,0.25)",
    tags: ["Power BI", "Razorpay", "Cashfree", "Twilio"],
  },
];

const strengths = [
  { name: "Teamwork", emoji: "🤝", color: "#4ade80" },
  { name: "Critical Thinking", emoji: "🧠", color: "#a78bfa" },
  { name: "Problem Solving", emoji: "🧩", color: "#60a5fa" },
  { name: "Adaptability", emoji: "⚡", color: "#fb923c" },
  { name: "Leadership", emoji: "🚀", color: "#f472b6" },
];

const languages = [
  { name: "English", level: "Professional", flag: "🇬🇧", pct: 90 },
  { name: "Tamil", level: "Native", flag: "🇮🇳", pct: 100 },
];

/* ─── Small helper: animated glowing ring icon ─── */
function GlowIcon({ Icon, color, glow }) {
  return (
    <motion.div
      className="relative flex items-center justify-center"
      style={{ width: 44, height: 44 }}
      whileHover={{ scale: 1.15 }}
    >
      {/* outer glow ring */}
      <motion.div
        animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-xl"
        style={{ background: `radial-gradient(circle, ${glow} 0%, transparent 70%)` }}
      />
      <div
        className="relative z-10 w-10 h-10 rounded-xl flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${color}20, ${color}10)`,
          border: `1px solid ${color}40`,
          boxShadow: `0 0 12px ${glow}, inset 0 1px 0 ${color}25`,
        }}
      >
        <Icon size={18} style={{ color }} />
      </div>
    </motion.div>
  );
}

/* ─── Main Component ─── */
export default function Skills() {
  const [activeIdx, setActiveIdx] = useState(null);

  return (
    <section
      id="skills"
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0f0f14 0%, #13111a 50%, #0e1018 100%)" }}
    >
      {/* Background ambient orbs */}
      <div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(96,165,250,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-widest"
            style={{
              background: "rgba(167,139,250,0.1)",
              border: "1px solid rgba(167,139,250,0.25)",
              color: "#c4b5fd",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <Sparkles size={12} />
            What I work with
          </motion.div>

          <h2
            className="text-4xl md:text-6xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: "#f1f0ff" }}
          >
            My{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #a78bfa 0%, #60a5fa 50%, #f472b6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Skills
            </span>
          </h2>
          <p className="text-sm" style={{ color: "#6b7280" }}>
            {techSkills.length}+ technologies across the full stack
          </p>
        </motion.div>

        {/* ── Bento Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {skillCategories.map((cat, catIdx) => {
            const isActive = activeIdx === catIdx;
            return (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: catIdx * 0.08, duration: 0.55, ease: "easeOut" }}
                onClick={() => setActiveIdx(isActive ? null : catIdx)}
                className="relative group cursor-pointer overflow-hidden rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${isActive ? cat.color + "50" : "rgba(255,255,255,0.07)"}`,
                  boxShadow: isActive ? `0 0 30px ${cat.glow}, 0 4px 20px rgba(0,0,0,0.4)` : "0 2px 8px rgba(0,0,0,0.3)",
                  transition: "all 0.35s ease",
                }}
                whileHover={{
                  borderColor: cat.color + "40",
                  boxShadow: `0 0 20px ${cat.glow}, 0 4px 16px rgba(0,0,0,0.4)`,
                  y: -4,
                }}
              >
                {/* Top-left glow shard */}
                <div
                  className="absolute -top-12 -left-12 w-32 h-32 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle, ${cat.glow} 0%, transparent 70%)`, filter: "blur(20px)" }}
                />

                {/* Header row */}
                <div className="flex items-center gap-3 p-5 pb-4">
                  <GlowIcon Icon={cat.Icon} color={cat.color} glow={cat.glow} />
                  <div>
                    <h3
                      className="text-sm font-semibold uppercase tracking-widest"
                      style={{ color: cat.color }}
                    >
                      {cat.label}
                    </h3>
                    <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>
                      {cat.tags.length} technologies
                    </p>
                  </div>
                  <motion.div
                    className="ml-auto"
                    animate={{ rotate: isActive ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Zap size={14} style={{ color: isActive ? cat.color : "rgba(255,255,255,0.2)" }} />
                  </motion.div>
                </div>

                {/* Divider */}
                <div
                  className="mx-5 h-px mb-4"
                  style={{
                    background: `linear-gradient(to right, ${cat.color}30, transparent)`,
                  }}
                />

                {/* Skill chips */}
                <div className="px-5 pb-5 flex flex-wrap gap-2">
                  {cat.tags.map((tag, tagIdx) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.7 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: catIdx * 0.06 + tagIdx * 0.05 + 0.2 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="text-[11px] font-medium px-3 py-1 rounded-full cursor-default"
                      style={{
                        background: `${cat.color}12`,
                        color: `${cat.color}cc`,
                        border: `1px solid ${cat.color}28`,
                        backdropFilter: "blur(4px)",
                        transition: "background 0.2s, border-color 0.2s, color 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `${cat.color}25`;
                        e.currentTarget.style.borderColor = `${cat.color}55`;
                        e.currentTarget.style.color = cat.color;
                        e.currentTarget.style.boxShadow = `0 0 8px ${cat.glow}`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = `${cat.color}12`;
                        e.currentTarget.style.borderColor = `${cat.color}28`;
                        e.currentTarget.style.color = `${cat.color}cc`;
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                {/* Active glow bottom bar */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      key="bar"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      exit={{ scaleX: 0 }}
                      transition={{ duration: 0.35 }}
                      className="absolute bottom-0 left-0 right-0 h-0.5 origin-left"
                      style={{ background: `linear-gradient(to right, ${cat.color}, transparent)` }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* ── Bottom Row: Strengths + Languages ── */}
        <div className="grid sm:grid-cols-2 gap-4">

          {/* Strengths */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div
              className="flex items-center gap-2 px-5 py-4 border-b"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              <Brain size={15} style={{ color: "#a78bfa" }} />
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "#a78bfa" }}
              >
                Strengths
              </span>
            </div>
            <div className="p-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {strengths.map((s, i) => (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ scale: 1.04, y: -2 }}
                  className="flex items-center gap-2 p-3 rounded-xl cursor-default"
                  style={{
                    background: `${s.color}08`,
                    border: `1px solid ${s.color}18`,
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${s.color}15`;
                    e.currentTarget.style.borderColor = `${s.color}35`;
                    e.currentTarget.style.boxShadow = `0 0 12px ${s.color}20`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = `${s.color}08`;
                    e.currentTarget.style.borderColor = `${s.color}18`;
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <motion.span
                    whileHover={{ scale: 1.4, rotate: 20 }}
                    className="text-base"
                  >
                    {s.emoji}
                  </motion.span>
                  <span
                    className="text-xs font-medium leading-tight"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    {s.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div
              className="flex items-center gap-2 px-5 py-4 border-b"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              <Languages size={15} style={{ color: "#4ade80" }} />
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "#4ade80" }}
              >
                Languages
              </span>
            </div>
            <div className="p-5 space-y-4">
              {languages.map((lang, i) => (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{lang.flag}</span>
                      <span
                        className="text-sm font-semibold"
                        style={{ color: "rgba(255,255,255,0.85)" }}
                      >
                        {lang.name}
                      </span>
                    </div>
                    <span
                      className="text-[11px] font-medium px-3 py-0.5 rounded-full"
                      style={{
                        background: "rgba(74,222,128,0.1)",
                        color: "#4ade80",
                        border: "1px solid rgba(74,222,128,0.25)",
                      }}
                    >
                      {lang.level}
                    </span>
                  </div>
                  {/* Animated progress bar */}
                  <div
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: "linear-gradient(to right, #4ade80, #22d3ee)",
                        boxShadow: "0 0 8px rgba(74,222,128,0.4)",
                      }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.4 + i * 0.15, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
