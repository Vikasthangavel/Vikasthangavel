import React from "react";
import { motion } from "framer-motion";
import { Braces, Brain, Languages } from "lucide-react";

const techSkills = [
  { name: "Python", level: 90 },
  { name: "Java", level: 70 },
  { name: "SQL", level: 85 },
  { name: "React / JS", level: 75 },
  { name: "Flask", level: 80 },
  { name: "Power BI", level: 75 },
  { name: "HTML / CSS", level: 85 },
  { name: "Web Hosting", level: 80 },
  { name: "Networking", level: 65 },
  { name: "Git", level: 75 },
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
          <span className="font-mono text-cyan-500 text-sm tracking-wider mb-3 block">{"// tech-stack"}</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text animate-gradient-text">Skills</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Technical Skills - Skill Bars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 terminal-card card-shine"
          >
            <div className="terminal-header">
              <span className="terminal-dot bg-red-500"></span>
              <span className="terminal-dot bg-yellow-500"></span>
              <span className="terminal-dot bg-green-500"></span>
              <span className="ml-3 text-xs text-gray-500 font-mono flex items-center gap-1.5">
                <Braces size={12} /> skills.config
              </span>
            </div>
            <div className="p-6 space-y-4">
              {techSkills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ x: 5 }}
                  className="group/skill cursor-default"
                >
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm font-mono text-gray-300 group-hover/skill:text-cyan-300 transition-colors">{skill.name}</span>
                    <motion.span
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.05 }}
                      className="text-xs font-mono text-cyan-400"
                    >{skill.level}%</motion.span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden group-hover/skill:bg-gray-700 transition-colors">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: i * 0.08, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 group-hover/skill:from-cyan-400 group-hover/skill:to-purple-500 transition-all relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer rounded-full"></div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Strengths + Languages */}
          <div className="space-y-8">
            {/* Strengths */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="terminal-card"
            >
              <div className="terminal-header">
                <span className="terminal-dot bg-red-500"></span>
                <span className="terminal-dot bg-yellow-500"></span>
                <span className="terminal-dot bg-green-500"></span>
                <span className="ml-3 text-xs text-gray-500 font-mono flex items-center gap-1.5">
                  <Brain size={12} /> strengths.md
                </span>
              </div>
              <div className="p-6 space-y-3">
                {strengths.map((s, i) => (
                  <motion.div
                    key={s.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] border border-transparent hover:border-purple-500/20 transition-all cursor-default"
                  >
                    <motion.span whileHover={{ scale: 1.3, rotate: 15 }} className="text-lg">{s.emoji}</motion.span>
                    <span className="text-sm font-medium text-gray-300">{s.name}</span>
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
                <span className="terminal-dot bg-red-500"></span>
                <span className="terminal-dot bg-yellow-500"></span>
                <span className="terminal-dot bg-green-500"></span>
                <span className="ml-3 text-xs text-gray-500 font-mono flex items-center gap-1.5">
                  <Languages size={12} /> languages.json
                </span>
              </div>
              <div className="p-6 space-y-3">
                {languages.map((lang, i) => (
                  <div key={lang.name} className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] transition-all cursor-default group/lang">
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
      </div>
    </section>
  );
}
