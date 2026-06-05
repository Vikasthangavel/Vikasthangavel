import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Calendar, School } from "lucide-react";

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
          <span
            className="text-xs uppercase tracking-[0.2em] mb-3 block font-medium"
            style={{ color: "#c0624a" }}
          >
            Academic background
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold mb-4 text-stone-900"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <span className="gradient-text animate-gradient-text">Education</span>
          </h2>
        </motion.div>

        {/* B.Tech Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="warm-card overflow-hidden"
        >
          {/* Top colored bar */}
          <div className="h-1 w-full" style={{ background: "linear-gradient(to right, #c0624a, #c9882c)" }} />
          <div className="p-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="flex items-start gap-4">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="p-3 rounded-xl border flex-shrink-0"
                  style={{ background: "rgba(192,98,74,0.08)", borderColor: "rgba(192,98,74,0.2)" }}
                >
                  <GraduationCap size={28} style={{ color: "#c0624a" }} />
                </motion.div>
                <div>
                  <h3
                    className="text-xl md:text-2xl font-bold text-stone-900 mb-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    B.Tech in AI &amp; Data Science
                  </h3>
                  <p className="text-sm font-medium" style={{ color: "#c0624a" }}>
                    K.S.Rangasamy College of Technology
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-start md:items-end gap-2 flex-shrink-0">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-100 border border-stone-200 text-stone-500 text-xs">
                  <Calendar size={13} />
                  Sep 2023 – Jun 2027
                </div>
                <div className="px-3 py-1.5 rounded-lg border" style={{ background: "rgba(192,98,74,0.07)", borderColor: "rgba(192,98,74,0.2)" }}>
                  <span className="text-sm font-bold" style={{ color: "#c0624a" }}>CGPA: 8.2</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-stone-100">
              <p className="text-xs uppercase tracking-wider text-stone-400 mb-3 font-medium">Key Coursework</p>
              <div className="flex flex-wrap gap-2">
                {["Machine Learning", "Data Structures", "Algorithms", "Database Management", "Deep Learning", "NLP", "Computer Vision"].map((course, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="px-3 py-1 rounded-md text-stone-600 text-xs cursor-default inline-block transition-all"
                    style={{
                      background: "rgba(192,98,74,0.06)",
                      border: "1px solid rgba(192,98,74,0.15)",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = "rgba(192,98,74,0.12)";
                      e.currentTarget.style.color = "#a04d37";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = "rgba(192,98,74,0.06)";
                      e.currentTarget.style.color = "";
                    }}
                  >
                    {course}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 12th Standard Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="warm-card overflow-hidden mt-8"
        >
          {/* Top colored bar */}
          <div className="h-1 w-full" style={{ background: "linear-gradient(to right, #6b8f6e, #4a7fa8)" }} />
          <div className="p-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="flex items-start gap-4">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="p-3 rounded-xl border flex-shrink-0"
                  style={{ background: "rgba(107,143,110,0.1)", borderColor: "rgba(107,143,110,0.22)" }}
                >
                  <School size={28} style={{ color: "#6b8f6e" }} />
                </motion.div>
                <div>
                  <h3
                    className="text-xl md:text-2xl font-bold text-stone-900 mb-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    HSC — 12th Standard
                  </h3>
                  <p className="text-sm font-medium" style={{ color: "#6b8f6e" }}>
                    SPB Matriculation Higher Secondary School
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-start md:items-end gap-2 flex-shrink-0">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-100 border border-stone-200 text-stone-500 text-xs">
                  <Calendar size={13} />
                  Graduated 2023
                </div>
                <div className="flex gap-2">
                  <div className="px-3 py-1.5 rounded-lg border" style={{ background: "rgba(107,143,110,0.08)", borderColor: "rgba(107,143,110,0.22)" }}>
                    <span className="text-sm font-bold" style={{ color: "#6b8f6e" }}>89%</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg border" style={{ background: "rgba(74,127,168,0.08)", borderColor: "rgba(74,127,168,0.22)" }}>
                    <span className="text-sm font-bold" style={{ color: "#4a7fa8" }}>Cutoff: 173</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
