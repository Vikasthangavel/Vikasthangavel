import React from "react";
import { motion } from "framer-motion";
import { Music, Sprout, Cpu, Headphones, TreePine, Lightbulb } from "lucide-react";

const hobbies = [
  {
    icon: <Music size={28} />,
    title: "Music",
    description: "Passionate about music — it fuels creativity and keeps me energized while coding. From lo-fi beats to Tamil classics, music is my constant companion.",
    gradient: "from-pink-500 to-rose-500",
    iconBg: "bg-pink-500/10 text-pink-400",
    borderColor: "hover:border-pink-500/30",
    emoji: "🎵",
  },
  {
    icon: <Sprout size={28} />,
    title: "Farming",
    description: "Rooted in agriculture — I enjoy hands-on farming and understanding sustainable practices. It keeps me grounded and connected to nature.",
    gradient: "from-green-500 to-emerald-500",
    iconBg: "bg-green-500/10 text-green-400",
    borderColor: "hover:border-green-500/30",
    emoji: "🌱",
  },
  {
    icon: <Cpu size={28} />,
    title: "Tech-Driven Environments",
    description: "I love creating technology-powered surroundings — from IoT-based smart setups to automation that makes everyday life smarter and more efficient.",
    gradient: "from-cyan-500 to-blue-500",
    iconBg: "bg-cyan-500/10 text-cyan-400",
    borderColor: "hover:border-cyan-500/30",
    emoji: "⚡",
  },
];

export default function Hobbies() {
  return (
    <section id="hobbies" className="py-24 relative">
      <div className="section-divider mb-24"></div>
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-cyan-500 text-sm tracking-wider mb-3 block">{"// hobbies"}</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Beyond <span className="gradient-text animate-gradient-text">Code</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {hobbies.map((hobby, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`terminal-card card-shine cursor-default group ${hobby.borderColor}`}
            >
              {/* Gradient accent */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                className={`h-1 bg-gradient-to-r ${hobby.gradient}`}
              ></motion.div>

              <div className="p-6 flex flex-col items-center text-center">
                {/* Animated icon */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.15 }}
                  transition={{ duration: 0.5 }}
                  className={`p-4 rounded-2xl ${hobby.iconBg} mb-5`}
                >
                  {hobby.icon}
                </motion.div>

                {/* Emoji + Title */}
                <div className="flex items-center gap-2 mb-3">
                  <motion.span
                    whileHover={{ scale: 1.3, rotate: 15 }}
                    className="text-xl"
                  >
                    {hobby.emoji}
                  </motion.span>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors font-mono">
                    {hobby.title}
                  </h3>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed">
                  {hobby.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
