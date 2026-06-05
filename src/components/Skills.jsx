import React from "react";
import { motion } from "framer-motion";
import { Brain, Languages, Code2, Server, Database, Cloud, Cpu, Wrench } from "lucide-react";

/* Exported flat list (used by chatbot context) */
export const techSkills = [
  { name: "Python" }, { name: "Java" }, { name: "JavaScript" }, { name: "SQL" }, { name: "HTML/CSS" },
  { name: "React" }, { name: "Flask" }, { name: "Express.js" }, { name: "Node.js" },{name:"SpringBoot"},
  { name: "Supabase" }, { name: "Firebase" }, { name: "PostgreSQL" }, { name: "MySQL" },
  { name: "Cloudflare" }, { name: "VPS" }, { name: "Git" }, { name: "Vercel" },
  { name: "Roboflow" }, { name: "LangChain" },
  { name: "Power BI" }, { name: "Razorpay" }, { name: "Cashfree" }, { name: "Twilio" },
];

const skillCategories = [
  {
    label: "Languages",
    Icon: Code2,
    accent: "#4ade80",
    tags: ["Python", "Java", "JavaScript", "SQL", "HTML / CSS"],
  },
  {
    label: "Frameworks",
    Icon: Server,
    accent: "#34d399",
    tags: ["React", "Flask", "Express.js", "Node.js"],
  },
  {
    label: "Databases",
    Icon: Database,
    accent: "#a78bfa",
    tags: ["Supabase", "Firebase", "PostgreSQL", "MySQL"],
  },
  {
    label: "Cloud & DevOps",
    Icon: Cloud,
    accent: "#38bdf8",
    tags: ["Cloudflare", "VPS", "Git", "Vercel"],
  },
  {
    label: "AI / ML",
    Icon: Cpu,
    accent: "#f472b6",
    tags: ["Roboflow", "LangChain", "Gemini API", "GPT API"],
  },
  {
    label: "Tools & Integrations",
    Icon: Wrench,
    accent: "#fb923c",
    tags: ["Power BI", "Razorpay", "Cashfree", "Twilio"],
  },
];

const strengths = [
  { name: "Teamwork",          emoji: "🤝" },
  { name: "Critical Thinking", emoji: "🧠" },
  { name: "Problem Solving",   emoji: "🧩" },
  { name: "Adaptability",      emoji: "⚡" },
  { name: "Leadership",        emoji: "🚀" },
];

const languages = [
  { name: "English", level: "Professional" },
  { name: "Tamil",   level: "Native" },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative">
      <div className="section-divider mb-24"></div>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span
            className="text-xs uppercase tracking-[0.2em] mb-3 block font-medium"
            style={{ color: "#c0624a" }}
          >
            What I work with
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold mb-4 text-stone-900"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            My <span className="gradient-text animate-gradient-text">Skills</span>
          </h2>
          <p className="text-stone-500 text-sm">{techSkills.length}+ technologies across the full stack</p>
        </motion.div>

        {/* ── Skill Category Grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {skillCategories.map((cat, catIdx) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: catIdx * 0.08, duration: 0.5, ease: "easeOut" }}
              className="warm-card group overflow-hidden"
            >
              {/* Card header — clean, no terminal chrome */}
              <div
                className="px-5 py-3 border-b flex items-center gap-2"
                style={{ borderColor: "rgba(0,0,0,0.06)", background: "#faf8f5" }}
              >
                <div
                  className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                  style={{ background: `${cat.accent}18`, border: `1px solid ${cat.accent}28` }}
                >
                  <cat.Icon size={13} style={{ color: cat.accent }} />
                </div>
                <span className="text-xs font-semibold text-stone-600 uppercase tracking-wider">
                  {cat.label}
                </span>
              </div>

              <div className="p-5">
                {/* Tag pills */}
                <div className="flex flex-wrap gap-2">
                  {cat.tags.map((tag, tagIdx) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: catIdx * 0.08 + tagIdx * 0.05 + 0.2 }}
                      whileHover={{ y: -3, scale: 1.08 }}
                      className="text-[12px] px-3 py-1 rounded-full border cursor-default transition-all duration-200"
                      style={{
                        background:   `${cat.accent}0d`,
                        color:        `${cat.accent}cc`,
                        borderColor:  `${cat.accent}25`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background   = `${cat.accent}20`;
                        e.currentTarget.style.borderColor  = `${cat.accent}55`;
                        e.currentTarget.style.color        = cat.accent;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background   = `${cat.accent}0d`;
                        e.currentTarget.style.borderColor  = `${cat.accent}25`;
                        e.currentTarget.style.color        = `${cat.accent}cc`;
                      }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Bottom accent bar on hover */}
              <motion.div
                className="h-px mx-5 mb-4 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                style={{ background: `linear-gradient(to right, ${cat.accent}50, transparent)` }}
              />
            </motion.div>
          ))}
        </div>

        {/* ── Strengths + Languages row ── */}
        <div className="grid sm:grid-cols-2 gap-5">
          {/* Strengths */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="warm-card overflow-hidden"
          >
            <div
              className="px-5 py-3 border-b flex items-center gap-2"
              style={{ borderColor: "rgba(0,0,0,0.06)", background: "#faf8f5" }}
            >
              <Brain size={14} style={{ color: "#c0624a" }} />
              <span className="text-xs font-semibold text-stone-600 uppercase tracking-wider">
                Strengths
              </span>
            </div>
            <div className="p-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {strengths.map((s, i) => (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-50 hover:bg-amber-50 border border-transparent hover:border-amber-200 transition-all cursor-default"
                >
                  <motion.span whileHover={{ scale: 1.3, rotate: 15 }} className="text-base">{s.emoji}</motion.span>
                  <span className="text-xs font-medium text-stone-700 leading-tight">{s.name}</span>
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
            className="warm-card overflow-hidden"
          >
            <div
              className="px-5 py-3 border-b flex items-center gap-2"
              style={{ borderColor: "rgba(0,0,0,0.06)", background: "#faf8f5" }}
            >
              <Languages size={14} style={{ color: "#6b8f6e" }} />
              <span className="text-xs font-semibold text-stone-600 uppercase tracking-wider">
                Languages
              </span>
            </div>
            <div className="p-6 space-y-3">
              {languages.map((lang) => (
                <div
                  key={lang.name}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-stone-50 hover:bg-amber-50 transition-all cursor-default"
                >
                  <span className="text-sm font-medium text-stone-700">{lang.name}</span>
                  <span
                    className="text-xs font-medium px-3 py-1 rounded-full border"
                    style={{ background: "rgba(192,98,74,0.07)", color: "#a04d37", borderColor: "rgba(192,98,74,0.18)" }}
                  >
                    {lang.level}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
