import React from "react";
import { motion } from "framer-motion";
import { Trophy, Award, Sparkles, Shield } from "lucide-react";

const achievements = [
  {
    icon: <Trophy size={24} />,
    title: "2nd Place – Cybersecurity Hackathon 2025",
    org: "Namakkal Police",
    description: 'Built "TrueSight AI" — an AI-based deepfake detection solution generating forensic reports for cybercrime investigation.',
    gradient: "from-yellow-500 to-orange-500",
    glow: "shadow-yellow-500/20",
    borderColor: "border-yellow-500/30",
    iconBg: "bg-yellow-500/10 text-yellow-400",
  },
  {
    icon: <Shield size={24} />,
    title: "Presented to Namakkal Cyber Cell",
    org: "Tamil Nadu Police",
    description: "Demonstrated the deepfake detection system to law enforcement officials for real-world cybercrime applications.",
    gradient: "from-amber-500 to-rose-500",
    glow: "shadow-amber-500/20",
    borderColor: "border-amber-500/30",
    iconBg: "bg-amber-500/10 text-amber-400",
  }
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 relative">
      <div className="section-divider mb-24"></div>
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-amber-500 text-sm tracking-wider mb-3 block">{"// achievements"}</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="gradient-text animate-gradient-text">Achievements</span>
          </h2>
        </motion.div>

        <div className="grid gap-6">
          {achievements.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              className={`relative terminal-card overflow-hidden group card-shine cursor-default`}
            >
              {/* Gradient accent line at top */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                className={`h-1 bg-gradient-to-r ${item.gradient}`}
              ></motion.div>

              <div className="p-6 md:p-8 flex items-start gap-5">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className={`p-3 rounded-xl ${item.iconBg} shrink-0`}
                >
                  {item.icon}
                </motion.div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-xs font-mono text-gray-500 mb-3 block">{item.org}</span>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
