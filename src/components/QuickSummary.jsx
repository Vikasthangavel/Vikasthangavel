import React from "react";
import { motion } from "framer-motion";

const items = [
  {
    emoji: "🎓",
    label: "Education",
    value: "B.Tech AI & DS, KSRCT",
    detail: "Graduating Jul 2026",
    color: "amber",
    border: "rgba(245,158,11,0.25)",
    bg: "rgba(255,251,235,0.9)",
    glow: "rgba(245,158,11,0.08)",
    textColor: "#b45309",
    detailColor: "rgba(180,83,9,0.6)",
  },
  {
    emoji: "💼",
    label: "Role",
    value: "Full-Stack Developer",
    detail: "React · Python · Flask · Supabase",
    color: "indigo",
    border: "rgba(99,102,241,0.25)",
    bg: "rgba(238,242,255,0.9)",
    glow: "rgba(99,102,241,0.08)",
    textColor: "#4338ca",
    detailColor: "rgba(67,56,202,0.6)",
  },
  {
    emoji: "🚀",
    label: "Impact",
    value: "15+ shipped products",
    detail: "10K+ users · 4+ clients · 1 internship",
    color: "sky",
    border: "rgba(6,182,212,0.25)",
    bg: "rgba(236,254,255,0.9)",
    glow: "rgba(6,182,212,0.08)",
    textColor: "#0e7490",
    detailColor: "rgba(14,116,144,0.6)",
  },
];

export default function QuickSummary() {
  return (
    <section
      id="quick-summary"
      className="relative z-10 py-6 px-6"
      style={{ background: "transparent" }}
    >
      {/* thin top divider */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[480px] max-w-full h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(99,102,241,0.18), transparent)",
        }}
      />

      <div className="max-w-5xl mx-auto">
        {/* header label */}
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center text-[11px] font-mono tracking-[0.22em] text-slate-400 uppercase mb-4 select-none"
        >
          // TL;DR — Quick Summary
        </motion.p>

        {/* 3 cards in a row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              whileHover={{ y: -3, scale: 1.02 }}
              className="group relative flex items-center gap-3.5 px-4 py-3.5 rounded-xl border cursor-default overflow-hidden shadow-sm"
              style={{
                border: `1px solid ${item.border}`,
                background: item.bg,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = item.glow;
                e.currentTarget.style.borderColor = item.textColor + "44";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = item.bg;
                e.currentTarget.style.borderColor = item.border;
              }}
            >
              {/* left accent line */}
              <div
                className="absolute left-0 top-3 bottom-3 w-[2px] rounded-full"
                style={{
                  background: `linear-gradient(to bottom, transparent, ${item.textColor}, transparent)`,
                  opacity: 0.7,
                }}
              />

              {/* emoji */}
              <span className="text-xl flex-shrink-0 select-none pl-1">
                {item.emoji}
              </span>

              {/* text */}
              <div className="min-w-0">
                <p
                  className="text-sm font-semibold leading-snug truncate"
                  style={{ color: item.textColor }}
                >
                  {item.value}
                </p>
                <p
                  className="text-[11px] font-mono mt-0.5 leading-snug"
                  style={{ color: item.detailColor }}
                >
                  {item.detail}
                </p>
              </div>

              {/* hover glow layer */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at left center, ${item.glow} 0%, transparent 70%)`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* thin bottom divider */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[480px] max-w-full h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(99,102,241,0.1), transparent)",
        }}
      />
    </section>
  );
}
