import React from "react";
import { motion } from "framer-motion";
import { Calendar, Briefcase, CheckCircle2, ExternalLink } from "lucide-react";

const experiences = [
  {
    role: "Full-Stack Developer",
    company: "Dakshaa T26 — National-Level Technical Symposium",
    period: "2024 – 2025",
    duration: "Product Build",
    link: "https://dakshaa.ksrct.ac.in",
    points: [
      "Developed a full-stack web application for Dakshaa T26, a national-level technical symposium, to digitally manage 10,000+ registrations and event operations end-to-end",
      "Built a high-performance, responsive frontend using React, delivering a seamless registration and event experience across all devices",
      "Engineered robust backend services with Express.js and RESTful APIs to handle concurrent user loads during peak registration traffic with zero downtime",
      "Implemented Supabase for secure database management, real-time data sync, and user authentication across the platform",
      "Integrated the college payment gateway to enable smooth online registration and transaction processing, handling high-volume payment flows with real-time reconciliation",
      "Deployed the application on Cloudflare (Frontend) and a VPS server (Backend) ensuring fast global delivery, high availability, and production-grade reliability",
    ],
  },
  {
    role: "AIML Virtual Internship",
    company: "Virtual Program",
    period: "April 2025 – June 2025",
    duration: "10 Weeks",
    points: [
      "Engaged in hands-on model development for AI/ML applications",
      "Performed extensive data preprocessing for high-quality algorithm inputs",
      "Worked on algorithm optimization to improve accuracy and efficiency",
      "Collaborated with peers to solve complex machine learning problems",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative">
      <div className="section-divider mb-24"></div>
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-cyan-500 text-sm tracking-wider mb-3 block">{"// experience"}</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Work <span className="gradient-text animate-gradient-text">Experience</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute left-4 md:left-6 top-0 w-px bg-gradient-to-b from-cyan-500/50 via-blue-500/30 to-transparent"
          ></motion.div>

          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="relative pl-12 md:pl-16"
              >
                {/* Dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2, type: "spring", stiffness: 300 }}
                  className="absolute left-2.5 md:left-4 top-2 w-4 h-4 rounded-full bg-cyan-500 ring-4 ring-[#0a0a0f] glow-cyan animate-glow-pulse"
                ></motion.div>

                <div className="terminal-card card-shine">
                  <div className="terminal-header">
                    <span className="terminal-dot bg-red-500"></span>
                    <span className="terminal-dot bg-yellow-500"></span>
                    <span className="terminal-dot bg-green-500"></span>
                    <span className="ml-3 text-xs text-gray-500 font-mono">experience.log</span>
                  </div>
                  <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-start justify-between mb-5 gap-3">
                      <div>
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                          <Briefcase size={18} className="text-cyan-400" />
                          {exp.role}
                        </h3>
                        <span className="text-cyan-400/70 font-mono text-sm mt-1 block">{exp.company}</span>
                        {exp.link && (
                          <a href={exp.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors">
                            <ExternalLink size={12} />
                            {exp.link.replace('https://', '')}
                          </a>
                        )}
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/5 border border-cyan-500/15 text-gray-400 text-xs font-mono shrink-0">
                        <Calendar size={13} />
                        <span>{exp.period}</span>
                        <span className="text-cyan-400">({exp.duration})</span>
                      </div>
                    </div>

                    <ul className="space-y-3">
                      {exp.points.map((point, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-3 text-gray-300 text-sm hover:text-gray-100 hover:translate-x-1 transition-all duration-300 cursor-default"
                        >
                          <CheckCircle2 size={16} className="text-green-500 mt-0.5 shrink-0" />
                          {point}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
