import React from "react";
import { motion } from "framer-motion";
import { Braces, Brain, Languages, Code2, Server, Database, Cloud, Cpu, Wrench } from "lucide-react";

/* Exported flat list (used by chatbot context) */
export const techSkills = [
  { name: "Python" }, { name: "Java" }, { name: "JavaScript" }, { name: "SQL" }, { name: "HTML/CSS" },
  { name: "React" }, { name: "Flask" }, { name: "Express.js" }, { name: "Node.js" },
  { name: "Supabase" }, { name: "Firebase" }, { name: "PostgreSQL" }, { name: "MySQL" },
  { name: "Cloudflare" }, { name: "VPS" }, { name: "Git" }, { name: "Vercel" },
  { name: "Roboflow" }, { name: "LangChain" }, { name: "Gemini API" }, { name: "GPT API" },
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
  { name: "Teamwork", emoji: "🤝" },
  { name: "Critical Thinking", emoji: "🧠" },
  { name: "Problem Solving", emoji: "🧩" },
  { name: "Adaptability", emoji: "⚡" },
  { name: "Leadership", emoji: "🚀" },
];

const languages = [
  { name: "English", level: "Professional" },
  { name: "Tamil", level: "Native" },
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
          <span className="font-mono text-green-500 text-sm tracking-wider mb-3 block">{"// tech-stack"}</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text animate-gradient-text">Skills</span>
          </h2>
          <p className="text-gray-500 text-sm font-mono">{techSkills.length}+ technologies across the full stack</p>
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
              className="terminal-card card-shine group"
            >
              <div className="terminal-header">
                <span
                  className="ml-3 text-xs font-mono flex items-center gap-1.5"
                  style={{ color: `${cat.accent}99` }}
                >
                  <cat.Icon size={12} />
                  {cat.label.toLowerCase().replace(/ /g, "_")}.json
                </span>
              </div>

              <div className="p-5">
                {/* Category label */}
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${cat.accent}15`, border: `1px solid ${cat.accent}28` }}
                  >
                    <cat.Icon size={14} style={{ color: cat.accent }} />
                  </div>
                  <span className="text-sm font-bold font-mono text-gray-200">{cat.label}</span>
                </div>

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
                      className="text-[12px] px-3 py-1 rounded-full font-mono border cursor-default transition-all duration-200"
                      style={{
                        background: `${cat.accent}0d`,
                        color: `${cat.accent}cc`,
                        borderColor: `${cat.accent}25`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `${cat.accent}20`;
                        e.currentTarget.style.borderColor = `${cat.accent}55`;
                        e.currentTarget.style.color = cat.accent;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = `${cat.accent}0d`;
                        e.currentTarget.style.borderColor = `${cat.accent}25`;
                        e.currentTarget.style.color = `${cat.accent}cc`;
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
            className="terminal-card"
          >
            <div className="terminal-header">
              <span className="ml-3 text-xs text-gray-500 font-mono flex items-center gap-1.5">
                <Brain size={12} /> strengths.md
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
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] border border-transparent hover:border-purple-500/20 transition-all cursor-default"
                >
                  <motion.span whileHover={{ scale: 1.3, rotate: 15 }} className="text-base">{s.emoji}</motion.span>
                  <span className="text-xs font-medium text-gray-300 leading-tight">{s.name}</span>
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
            className="terminal-card"
          >
            <div className="terminal-header">
              <span className="ml-3 text-xs text-gray-500 font-mono flex items-center gap-1.5">
                <Languages size={12} /> languages.json
              </span>
            </div>
            <div className="p-6 space-y-3">
              {languages.map((lang) => (
                <div
                  key={lang.name}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] transition-all cursor-default"
                >
                  <span className="text-sm font-medium text-gray-300">{lang.name}</span>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
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
