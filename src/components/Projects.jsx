import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, GitBranch, Folder, Star } from "lucide-react";

const projects = [
  {
    title: "Time2Order",
    subtitle: "Preorder Management System",
    description: "Built a preorder management system that reduced customer waiting time by 40% and enabled secure online payments via Cashfree API. Features real-time order tracking, automated payment reconciliation, and a streamlined shop dashboard.",
    tech: ["Python", "SQL", "Cashfree API"],
    links: [
      { label: "time2orders.com", url: "https://time2orders.com" },
      { label: "time2orders.shop", url: "https://time2orders.shop" },
    ],
    featured: true,
  },
  {
    title: "Time2Due",
    subtitle: "Operations Management Platform",
    description: "Platform for employee tracking, offline payments, and real-time dashboards to streamline business operations and workforce management.",
    tech: ["Web Dev", "Dashboard", "Payments"],
    links: [{ label: "time2due.com", url: "https://time2due.com" }],
    featured: true,
  },
  {
    title: "Time2Farm",
    subtitle: "Farm Finance & Management Platform",
    description: "AI-powered finance tracking for farmers. Features income/expense tracking and intelligent insights via Gemini API integration.",
    tech: ["AI", "Gemini API", "Finance"],
    links: [],
    featured: false,
  },
  {
    title: "IPL Analysis",
    subtitle: "Power BI Dashboard",
    description: "Interactive Power BI dashboard analyzing IPL match data from 2008–2024 using DAX queries for deep statistical insights.",
    tech: ["Power BI", "DAX", "Analytics"],
    links: [],
    featured: false,
  },
  {
    title: "Dakshaa T26",
    subtitle: "Event Platform",
    description: "Full-stack event management platform with React frontend, Express backend, Supabase Auth, and integrated payment processing. Deployed on Cloudflare + VPS.",
    tech: ["React", "Express", "Supabase", "Cloudflare"],
    links: [{ label: "dakshaa.ksrct.ac.in", url: "https://dakshaa.ksrct.ac.in" }],
    featured: true,
  },
  {
    title: "TrueSight AI",
    subtitle: "Deepfake Detection System",
    description: "AI deepfake detection using Roboflow models & Flask backend. Generates evidence-based forensic reports. Presented to Namakkal Cyber Cell for cybercrime investigation.",
    tech: ["Roboflow", "Flask", "AI/ML", "Forensics"],
    links: [{ label: "Cyber Cell Report", url: "https://tinyurl.com/cybernamakkal" }],
    featured: true,
  },
  {
    title: "CTC Digital",
    subtitle: "Tuition Centre Management Web App",
    description: "Digitalized a tuition centre's entire workflow — student enrollment, attendance tracking, fee management, and performance reports. Replaced manual processes with an intuitive web app to save time and reduce errors.",
    tech: ["Web App", "Dashboard", "Management", "Automation"],
    links: [{ label: "Live", url: "https://tinyurl.com/2026ctc" }],
    featured: true,
  },
  {
    title: "AutoRevive",
    subtitle: "Online Vehicle Auction Platform — Client Project",
    description: "Built an interactive online auction portal revolutionizing how vehicles are bought and sold. Features seamless bidding at users' convenience, a wide selection of thousands of vehicles at competitive prices, and a trustworthy marketplace with flexible offers for every budget.",
    tech: ["Web App", "Auction System", "E-Commerce", "Client Project"],
    links: [{ label: "autorevives.com", url: "https://autorevives.com/" }],
    featured: true,
  },
  {
    title: "ProPic",
    subtitle: "E-Commerce Store — Client Project",
    description: "Developed a full-featured e-commerce platform for a house cleaning products brand. Enables customers to browse, order, and purchase cleaning essentials online with a smooth shopping experience, secure checkout, and product catalog management.",
    tech: ["E-Commerce", "Web App", "Product Catalog", "Client Project"],
    links: [{ label: "propic.in", url: "https://propic.in/" }],
    featured: true,
  },
  {
    title: "Pashuthalam",
    subtitle: "Veterinary Digital Prescription Platform — SIH",
    description: "Built for Smart India Hackathon to combat Antimicrobial Resistance (AMR) through structured digital prescriptions. Ensures farmers can only purchase veterinary medication with a valid digital prescription. Integrated Twilio & WhatsApp API to send medication reminders, collect farmer responses, and store feedback in DB to verify correct medicine administration.",
    tech: ["SIH", "Twilio", "WhatsApp API", "Healthcare", "Full-Stack"],
    links: [{ label: "Live Demo", url: "https://pashuthalam-vertinary.onrender.com" }],
    featured: true,
  },
  {
    title: "Time2Bus",
    subtitle: "Real-Time Bus Tracking — Web App + IoT Hardware",
    description: "A smart transportation system combining a web app with IoT hardware devices. Users can track live bus locations in real-time via the app. Hardware devices installed on buses share GPS coordinates and auto-announce the next stop using predefined route data — enhancing the commuter experience with accurate, hands-free updates.",
    tech: ["IoT", "GPS", "Web App", "Hardware", "Real-Time"],
    links: [],
    featured: true,
    underDev: true,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative">
      <div className="section-divider mb-24"></div>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-cyan-500 text-sm tracking-wider mb-3 block">{"// projects"}</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text animate-gradient-text">Projects</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="terminal-card flex flex-col h-full group card-shine cursor-default"
            >
              {/* Card Header - Terminal Chrome */}
              <div className="terminal-header">
                <span className="terminal-dot bg-red-500"></span>
                <span className="terminal-dot bg-yellow-500"></span>
                <span className="terminal-dot bg-green-500"></span>
                <div className="ml-auto flex items-center gap-2">
                  {project.featured && (
                    <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
                      <Star size={12} className="text-yellow-500 fill-yellow-500" />
                    </motion.div>
                  )}
                  <Folder size={12} className="text-gray-600 group-hover:text-cyan-500 transition-colors" />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1">
                <div className="mb-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors font-mono">
                      {project.title}
                    </h3>
                    {project.underDev && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 font-mono animate-pulse">
                        In Dev
                      </span>
                    )}
                  </div>
                  <p className="text-cyan-500/60 text-xs font-mono mt-0.5">{project.subtitle}</p>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">{project.description}</p>

                <div className="mt-auto">
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech.map((t, i) => (
                      <motion.span
                        key={i}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="text-[11px] px-2.5 py-1 bg-cyan-500/5 text-cyan-400/80 rounded-md font-mono border border-cyan-500/10 hover:bg-cyan-500/15 hover:border-cyan-500/30 transition-all cursor-default inline-block"
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 pt-4 border-t border-gray-800">
                    {project.links.length > 0 ? (
                      project.links.map((link, i) => (
                        <a
                          key={i}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-cyan-400 transition-all font-mono group/link hover:translate-x-1 duration-300"
                        >
                          <ExternalLink size={12} className="group-hover/link:text-cyan-400" />
                          {link.label}
                        </a>
                      ))
                    ) : (
                      <span className="text-gray-600 text-xs font-mono italic flex items-center gap-1.5">
                        <GitBranch size={12} /> private / offline
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
