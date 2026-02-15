import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Calendar, BookOpen } from "lucide-react";

export default function Education() {
  return (
    <section id="education" className="py-24 relative">
      <div className="section-divider mb-24"></div>
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-cyan-500 text-sm tracking-wider mb-3 block">{"// education"}</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="gradient-text animate-gradient-text">Education</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="terminal-card card-shine"
        >
          <div className="terminal-header">
            <span className="terminal-dot bg-red-500"></span>
            <span className="terminal-dot bg-yellow-500"></span>
            <span className="terminal-dot bg-green-500"></span>
            <span className="ml-3 text-xs text-gray-500 font-mono flex items-center gap-1.5">
              <BookOpen size={12} /> education.md
            </span>
          </div>
          <div className="p-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="flex items-start gap-4">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20 shrink-0"
                >
                  <GraduationCap size={28} className="text-purple-400" />
                </motion.div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                    B.Tech in AI & Data Science
                  </h3>
                  <p className="text-cyan-400 font-mono text-sm">
                    K.S.Rangasamy College of Technology
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/5 border border-cyan-500/15 text-gray-400 text-xs font-mono">
                  <Calendar size={13} />
                  Sep 2023 – Jun 2027
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 font-mono animate-glow-pulse">
                  <span className="text-green-400 text-sm font-bold">CGPA: 8.2</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-800">
              <div className="font-mono text-sm leading-relaxed text-gray-400">
                <p className="text-gray-600 mb-2">{"// coursework & focus areas"}</p>
                <div className="flex flex-wrap gap-2">
                  {["Machine Learning", "Data Structures", "Algorithms", "Database Management", "Deep Learning", "NLP", "Computer Vision"].map((course, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="px-3 py-1 rounded-md bg-white/[0.03] border border-white/[0.06] text-gray-400 text-xs hover:border-purple-500/30 hover:text-purple-300 hover:bg-purple-500/5 transition-all cursor-default inline-block"
                    >
                      {course}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
