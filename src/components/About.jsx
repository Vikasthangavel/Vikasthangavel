import React from "react";
import { motion } from "framer-motion";
import { MapPin, Code, Cpu, Database, Cloud, Zap } from "lucide-react";
import vikasImage from "../Vikas.jpg";

const highlights = [
  { icon: <Code size={20} />, label: "Full-Stack Apps", color: "cyan" },
  { icon: <Cpu size={20} />, label: "AI / ML", color: "purple" },
  { icon: <Database size={20} />, label: "Database Design", color: "blue" },
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
          <span className="font-mono text-cyan-500 text-sm tracking-wider mb-3 block">{"/∕ about-me"}</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
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
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl blur-md opacity-20 group-hover:opacity-50 transition duration-700"></div>
              
              {/* Image container */}
              <div className="relative w-72 h-72 md:w-[340px] md:h-[340px] rounded-2xl overflow-hidden border-2 border-gray-800 group-hover:border-cyan-500/30 transition-all duration-500 tilt-hover">
                <img src={vikasImage} alt="Vikas T" className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110" />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/80 via-transparent to-transparent group-hover:from-[#0a0a0f]/60 transition-all duration-500"></div>
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-4 -right-4 px-4 py-2 bg-[#0d1117] border border-cyan-500/30 rounded-xl font-mono text-sm text-cyan-400 glow-cyan"
              >
                <span className="text-gray-500">const</span> status = <span className="text-green-400">"building"</span>
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
                <span className="terminal-dot bg-red-500"></span>
                <span className="terminal-dot bg-yellow-500"></span>
                <span className="terminal-dot bg-green-500"></span>
                <span className="ml-3 text-xs text-gray-500 font-mono">about.js</span>
              </div>
              <div className="p-6 font-mono text-sm leading-relaxed">
                <p className="text-gray-500">{"// Who am I?"}</p>
                <p className="mt-2">
                  <span className="text-purple-400">const</span>{" "}
                  <span className="text-cyan-400">vikas</span> = {"{"}
                </p>
                <p className="ml-4"><span className="text-blue-300">role</span>: <span className="text-green-400">"Software Engineer"</span>,</p>
                <p className="ml-4"><span className="text-blue-300">location</span>: <span className="text-green-400">"Erode, TN"</span>,</p>
                <p className="ml-4"><span className="text-blue-300">passion</span>: <span className="text-green-400">"Building products that matter"</span>,</p>
                <p className="ml-4"><span className="text-blue-300">stack</span>: [<span className="text-yellow-300">"Python"</span>, <span className="text-yellow-300">"React"</span>, <span className="text-yellow-300">"SQL"</span>, <span className="text-yellow-300">"AI"</span>],</p>
                <p>{"}"}</p>
              </div>
            </div>

            <p className="text-gray-400 leading-relaxed mb-8 text-base">
              I'm a hands-on engineer who loves turning ideas into real products. 
              From payment integrations to AI-powered dashboards, I build end-to-end 
              solutions that solve real-world problems. Currently pursuing B.Tech in AI & DS.
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
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-cyan-500/20 hover:bg-cyan-500/5 transition-all group cursor-default"
                >
                  <div className="text-cyan-400 group-hover:text-cyan-300 transition-colors">{item.icon}</div>
                  <span className="text-sm text-gray-300 font-medium">{item.label}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 text-gray-500 font-mono text-sm cursor-default"
            >
              <MapPin size={16} className="text-cyan-500 animate-pulse"/>
              <span>{">> "}open_to_relocation = <span className="text-green-400">True</span></span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
