import React from "react";
import { motion } from "framer-motion";
import { Calendar, Briefcase, CheckCircle2, ExternalLink } from "lucide-react";

export const experiences = [
  {
    role: "Web Developer",
    company: "Gradix Technologies",
    period: "Mar 2026 – Jun 2026",
    duration: "Intern",
    link: "https://gradixtech.com/",
    points: [
      "Contributed to full-stack web development using React and Supabase in a collaborative team environment.",
      "Integrated third-party payment gateways and ensured secure, reliable transaction flows in a live production environment.",
      "Built and shipped multiple production features, focusing on responsive UI, performance optimization, and cross-device compatibility.",
    ],
  },
  {
    role: "Freelance Full-Stack Developer",
    company: "Self-Employed · Client Projects",
    period: "Jun 2024 – Present",
    duration: "Freelance",
    link: null,
    points: [
      "Delivered 8+ production-grade web applications for real clients across e-commerce, billing, auctions, and business management domains.",
      "Built AutoRevives — a real-time vehicle auction platform with live bidding and Razorpay payment integration, serving active buyers and sellers.",
      "Developed The Astro Tech billing software with full GST invoicing, customer login, and an AI business chatbot powered by LangChain + GPT Mini.",
      "Created ProPic e-commerce store and PrimePick affiliate platform — both live, generating client revenue with smooth shopping and checkout flows.",
      "Built CTC Digital to fully digitalize a tuition centre's operations — student enrollment, attendance, fees, and performance reporting.",
      "Delivered Challengers Trust blood donor registry with Firebase Auth, role-based access control, and real-time donor database.",
      "Consistently deployed all client projects on Cloudflare Pages + VPS for high availability, fast global delivery, and production reliability.",
    ],
    clients: ["AutoRevives", "Astro Technologies", "ProPic", "PrimePick", "CTC Digital", "Challengers Trust", "Time2Confirm"],
  },
  {
    role: "Backend Developer",
    company: "Dakshaa T26 — National-Level Technical Symposium",
    period: "2025 – 2026",
    duration: "Product Development",
    link: "https://dakshaa.ksrct.ac.in",
    points: [
      "Developed a full-stack web application for Dakshaa T26, a national-level technical symposium, to digitally manage 10,000+ users and event operations end-to-end",
      "Built a high-performance, responsive frontend using React, delivering a seamless registration and event experience across all devices",
      "Engineered robust backend services with Express.js and RESTful APIs to handle concurrent user loads during peak registration traffic with zero downtime",
      "Implemented Supabase for secure database management, real-time data sync, and user authentication across the platform",
      "Integrated the college payment gateway to enable smooth online registration and transaction processing, handling high-volume payment flows with real-time reconciliation",
      "Deployed the application on Cloudflare (Frontend) and a VPS server (Backend) ensuring fast global delivery, high availability, and production-grade reliability",
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
          <span
            className="text-xs uppercase tracking-[0.2em] mb-3 block font-medium"
            style={{ color: "#c0624a" }}
          >
            Where I've worked
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold mb-4 text-stone-900"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
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
            className="absolute left-4 md:left-6 top-0 w-px"
            style={{ background: "linear-gradient(to bottom, rgba(192,98,74,0.5), rgba(201,136,44,0.2), transparent)" }}
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
                  className="absolute left-2.5 md:left-4 top-2 w-4 h-4 rounded-full ring-4 ring-[#faf8f5] animate-glow-pulse"
                  style={{ background: "linear-gradient(135deg, #c0624a, #c9882c)" }}
                ></motion.div>

                <div className="warm-card overflow-hidden">
                  <div className="h-0.5 w-full" style={{ background: "linear-gradient(to right, #c0624a, #c9882c, transparent)" }} />
                  <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-start justify-between mb-5 gap-3">
                      <div>
                        <h3
                          className="text-xl font-bold text-stone-900 flex items-center gap-2"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          <Briefcase size={18} style={{ color: "#c0624a" }} />
                          {exp.role}
                        </h3>
                        <span className="text-sm mt-1 block font-medium" style={{ color: "#c0624a" }}>{exp.company}</span>
                        {exp.link && (
                          <a href={exp.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-1.5 text-xs text-amber-700 hover:text-amber-900 transition-colors">
                            <ExternalLink size={12} />
                            {exp.link.replace('https://', '')}
                          </a>
                        )}
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-100 border border-stone-200 text-stone-500 text-xs shrink-0">
                        <Calendar size={13} />
                        <span>{exp.period}</span>
                        <span style={{ color: "#c0624a" }}>({exp.duration})</span>
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
                          className="flex items-start gap-3 text-stone-600 text-sm hover:text-stone-900 hover:translate-x-1 transition-all duration-300 cursor-default"
                        >
                          <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: "#c0624a" }} />
                          {point}
                        </motion.li>
                      ))}
                    </ul>
                    {exp.clients && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: exp.points.length * 0.1 }}
                        className="mt-5 pt-4 border-t border-stone-100"
                      >
                        <p className="text-xs text-stone-400 uppercase tracking-wider mb-2.5 font-medium">Clients Served</p>
                        <div className="flex flex-wrap gap-2">
                          {exp.clients.map((client, ci) => (
                            <span
                              key={ci}
                              className="text-xs px-3 py-1 rounded-full border font-medium"
                              style={{
                                background: "rgba(192,98,74,0.06)",
                                borderColor: "rgba(192,98,74,0.2)",
                                color: "#a04d37",
                              }}
                            >
                              {client}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                    {exp.projectLink && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: exp.points.length * 0.1 }}
                        className="mt-4 pt-4 border-t border-slate-100"
                      >
                        <a href={exp.projectLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-amber-700 hover:text-amber-900 transition-colors hover:translate-x-1 duration-300">
                          <ExternalLink size={14} />
                          Project: {exp.projectLink.replace('https://', '').replace(/\/$/, '')}
                        </a>
                      </motion.div>
                    )}
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
