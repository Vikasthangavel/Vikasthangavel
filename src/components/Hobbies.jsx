import React from "react";
import { motion } from "framer-motion";
import { Music, Sprout, Cpu, Wrench } from "lucide-react";

const beyondCode = [
  {
    icon: <Music size={20} />,
    title: "Music",
    description: "Lo-fi beats to Tamil classics — music fuels focus and creativity during long coding sessions.",
    color: "#c0624a",
    bg: "rgba(192,98,74,0.08)",
    border: "rgba(192,98,74,0.18)",
    emoji: "🎵",
  },
  {
    icon: <Sprout size={20} />,
    title: "Farming",
    description: "Hands-on agriculture keeps me grounded — literally. Sustainable practices and patience.",
    color: "#6b8f6e",
    bg: "rgba(107,143,110,0.08)",
    border: "rgba(107,143,110,0.18)",
    emoji: "🌱",
  },
  {
    icon: <Cpu size={20} />,
    title: "Tech-Driven Environments",
    description: "IoT setups and home automation — I like turning living spaces into smart, efficient systems.",
    color: "#4a7fa8",
    bg: "rgba(74,127,168,0.08)",
    border: "rgba(74,127,168,0.18)",
    emoji: "⚡",
  },
  {
    icon: <Wrench size={20} />,
    title: "Fixer, Not a Replacer",
    description: "Real satisfaction comes from diagnosing and reviving — why toss it when you can fix it?",
    color: "#c9882c",
    bg: "rgba(201,136,44,0.08)",
    border: "rgba(201,136,44,0.2)",
    emoji: "🛠️",
  },
];

export default function Hobbies() {
  return (
    <section id="hobbies" className="py-24 relative">
      <div className="section-divider mb-24" />
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span
            className="text-xs uppercase tracking-[0.2em] mb-3 block font-medium"
            style={{ color: "#c0624a" }}
          >
            When I'm offline
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold mb-4 text-stone-900"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Beyond <span className="gradient-text animate-gradient-text">Code</span>
          </h2>
          <p className="text-stone-400 text-sm max-w-sm mx-auto">
            A few things that shape how I think, build, and stay balanced outside of work.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4">
          {beyondCode.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
              whileHover={{ y: -3, scale: 1.01 }}
              className="flex items-start gap-4 p-5 rounded-xl bg-white border border-stone-200 hover:border-amber-300 hover:bg-amber-50/30 transition-all group cursor-default shadow-sm"
            >
              {/* Icon */}
              <div
                className="p-2.5 rounded-xl flex-shrink-0 mt-0.5"
                style={{ background: item.bg, color: item.color, border: `1px solid ${item.border}` }}
              >
                {item.icon}
              </div>

              {/* Text */}
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-base">{item.emoji}</span>
                  <h3
                    className="text-sm font-bold text-stone-800 group-hover:text-amber-800 transition-colors"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {item.title}
                  </h3>
                </div>
                <p className="text-stone-500 text-[13px] leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
