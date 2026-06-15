import React from "react";
import { motion } from "framer-motion";
import { MapPin, Code, Cpu, Database, Cloud } from "lucide-react";
import vikasImage from "../Vikas.jpg";

const highlights = [
  { icon: <Code size={20} />, label: "Full-Stack Apps", color: "#c0624a" },
  { icon: <Cpu size={20} />, label: "AI / ML", color: "#6b8f6e" },
  { icon: <Database size={20} />, label: "Database Design", color: "#4a7fa8" },
  { icon: <Cloud size={20} />, label: "Cloud Deploy", color: "#c9882c" },
];

export default function About() {
  return (
    <section id="about" className="py-24 relative">
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
            A little about me
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold mb-4 text-stone-900"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            About <span className="gradient-text animate-gradient-text">Me</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            {/* Floating wrapper */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative group"
            >
              {/* Slow spinning decorative ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-2 rounded-2xl opacity-30"
                style={{
                  background: "conic-gradient(from 0deg, #c0624a, #c9882c, #6b8f6e, #c0624a)",
                  borderRadius: "18px",
                  filter: "blur(6px)",
                }}
              />

              {/* Static soft glow */}
              <div
                className="absolute -inset-1 rounded-2xl opacity-15 group-hover:opacity-30 transition duration-700"
                style={{ background: "linear-gradient(135deg, #c0624a, #c9882c)" }}
              />

              {/* Image container */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="relative w-72 md:w-[340px] rounded-2xl overflow-hidden border-2 border-stone-200 group-hover:border-amber-400/50 transition-colors duration-500 shadow-xl bg-stone-50"
              >
                <img
                  src={vikasImage}
                  alt="Vikas T — Software Engineer"
                  width={340}
                  height={420}
                  loading="lazy"
                  className="w-full h-auto object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 via-transparent to-transparent group-hover:from-stone-900/10 transition-all duration-500" />
              </motion.div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-4 -right-4 px-4 py-2.5 bg-white border border-amber-200 rounded-xl text-sm shadow-lg"
                style={{ boxShadow: "0 4px 20px rgba(192,98,74,0.12)" }}
              >
                <span className="text-stone-500 text-xs">Currently</span>
                <span className="ml-1.5 font-semibold text-amber-700">Building 🚀</span>
              </motion.div>
            </motion.div>
          </motion.div>


          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Simple personal intro card */}
            <div className="warm-card p-6 mb-8">
              <h3
                className="text-lg font-bold text-stone-800 mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Who am I?
              </h3>
              <div className="space-y-1.5 text-sm text-stone-600">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#c0624a" }} />
                  <span><strong className="text-stone-800">Role:</strong> Software Engineer</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#c9882c" }} />
                  <span><strong className="text-stone-800">Location:</strong> Erode, Tamil Nadu</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#6b8f6e" }} />
                  <span><strong className="text-stone-800">Passion:</strong> Building products that matter</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#4a7fa8" }} />
                  <span><strong className="text-stone-800">Stack:</strong> Python, Java, React, Node.js, SQL, AI</span>
                </div>
              </div>
            </div>

            <p className="text-stone-600 leading-relaxed mb-4 text-base">
              I'm a hands-on engineer who loves turning ideas into real products.
              From payment integrations to AI-powered dashboards, I build end-to-end
              solutions that solve real-world problems. Currently pursuing B.Tech in AI &amp; DS.
            </p>

            {/* Highlight chips */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-stone-50 border border-stone-200 hover:border-amber-300 hover:bg-amber-50/40 transition-all group cursor-default shadow-sm"
                >
                  <div className="transition-colors" style={{ color: item.color }}>{item.icon}</div>
                  <span className="text-sm text-stone-700 font-medium">{item.label}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 text-stone-500 text-sm cursor-default mb-8"
            >
              <MapPin size={16} className="animate-pulse" style={{ color: "#c0624a" }} />
              <span>Open to relocation across India · Available from Jan 2027</span>
            </motion.div>

            {/* GitHub Stats */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 }}
              className="w-full overflow-hidden rounded-xl border border-stone-800/10 shadow-sm"
              style={{ background: "#0a0a10" }}
            >
              <img 
                src="https://github-readme-streak-stats.herokuapp.com/?user=Vikasthangavel&theme=tokyonight&hide_border=true&background=0a0a10&ring=8b5cf6&fire=f472b6&currStreakLabel=22d3ee&sideLabels=e2e0f0&dates=6b6888" 
                alt="GitHub Streak Stats" 
                className="w-full h-auto"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
