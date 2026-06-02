import React from "react";
import { motion } from "framer-motion";
import { MapPin, Code, Cpu, Database, Cloud, Zap } from "lucide-react";
import vikasImage from "../Vikas.jpg";

const highlights = [
  { icon: <Code size={20} />, label: "Full-Stack Apps", color: "amber" },
  { icon: <Cpu size={20} />, label: "AI / ML", color: "purple" },
  { icon: <Database size={20} />, label: "Database Design", color: "rose" },
  { icon: <Cloud size={20} />, label: "Cloud Deploy", color: "green" },
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
          <span className="font-mono text-violet-500 text-sm tracking-wider mb-3 block">{"/∕ about-me"}</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">
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
            <div className="relative group">
              {/* Glow ring */}
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 rounded-2xl blur-md opacity-20 group-hover:opacity-50 transition duration-700"></div>
              
              {/* Image container */}
              <div className="relative w-72 h-72 md:w-[340px] md:h-[340px] rounded-2xl overflow-hidden border-2 border-slate-200 group-hover:border-indigo-400/50 transition-all duration-500 tilt-hover shadow-xl">
                <img src={vikasImage} alt="Vikas T" className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110" />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent group-hover:from-slate-900/20 transition-all duration-500"></div>
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-4 -right-4 px-4 py-2 bg-white border border-indigo-200 rounded-xl font-mono text-sm text-indigo-600 shadow-lg shadow-indigo-500/15"
              >
                <span className="text-slate-400">const</span> status = <span className="text-emerald-600">"building"</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Terminal-style about card */}
            <div className="terminal-card mb-8">
              <div className="terminal-header">
                <span className="ml-3 text-xs text-gray-500 font-mono">about.js</span>
              </div>
              <div className="p-6 font-mono text-sm leading-relaxed">
                <p className="text-gray-500">{"// Who am I?"}</p>
                <p className="mt-2">
                  <span className="text-purple-400">const</span>{" "}
                  <span className="text-amber-400">vikas</span> = {"{"}
                </p>
                <p className="ml-4"><span className="text-orange-300">role</span>: <span className="text-green-400">"Software Engineer"</span>,</p>
                <p className="ml-4"><span className="text-orange-300">location</span>: <span className="text-green-400">"Erode, TN"</span>,</p>
                <p className="ml-4"><span className="text-orange-300">passion</span>: <span className="text-green-400">"Building products that matter"</span>,</p>
                <p className="ml-4"><span className="text-orange-300">stack</span>: [<span className="text-yellow-300">"Python"</span>,<span className="text-yellow-300">"Java"</span>,<span className="text-yellow-300">"React & Node"</span>,<span className="text-yellow-300">"SQL"</span>,<span className="text-yellow-300">"AI"</span>],</p>
                <p>{"}"}</p>
              </div>
            </div>

            <p className="text-slate-600 leading-relaxed mb-4 text-base">
              I'm a hands-on engineer who loves turning ideas into real products. 
              From payment integrations to AI-powered dashboards, I build end-to-end 
              solutions that solve real-world problems. Currently pursuing B.Tech in AI & DS.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative flex items-start gap-3.5 px-4 py-3.5 rounded-xl border mb-8 overflow-hidden"
              style={{
                background: "rgba(251,191,36,0.06)",
                borderColor: "rgba(251,191,36,0.3)",
                boxShadow: "0 0 32px rgba(251,191,36,0.07), inset 0 0 20px rgba(251,191,36,0.03)",
              }}
            >
              {/* Left glow strip */}
              <div
                className="absolute left-0 top-0 bottom-0 w-0.5"
                style={{ background: "linear-gradient(to bottom, transparent, #f59e0b, transparent)" }}
              />
              {/* Top shimmer */}
              <div
                className="absolute top-0 left-8 right-8 h-px"
                style={{ background: "linear-gradient(to right, transparent, rgba(251,191,36,0.35), transparent)" }}
              />
              {/* Pulsing indicator */}
              <span className="relative flex h-2.5 w-2.5 mt-1 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-amber-700 font-semibold text-sm leading-snug">
                  🚀 Open to Full-Stack &amp; Backend Engineering roles
                </p>
                <p className="text-amber-600/70 text-xs font-mono mt-1">
                  Available from July 2026 &nbsp;·&nbsp; Open to relocation &nbsp;·&nbsp; Internship or FTE
                </p>
              </div>
            </motion.div>

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
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all group cursor-default shadow-sm"
                >
                  <div className="text-indigo-500 group-hover:text-indigo-600 transition-colors">{item.icon}</div>
                  <span className="text-sm text-slate-700 font-medium">{item.label}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 text-slate-500 font-mono text-sm cursor-default"
            >
              <span>{">> "}is_open_to_relocation = <span className="text-indigo-600">True</span></span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
