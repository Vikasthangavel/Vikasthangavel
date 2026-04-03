import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  GitBranch,
  Folder,
  Star,
  Download,
  ChevronDown,
  ChevronUp,
  Zap,
  Globe,
  Cpu,
  Layers,
} from "lucide-react";

const projects = [
  {
    title: "Time2Order",
    subtitle: "Preorder Management System",
    description:
      "Built a preorder management system that reduced customer waiting time by 40% and enabled secure online payments via Cashfree API. Features real-time order tracking, automated payment reconciliation, and a streamlined shop dashboard.",
    tech: ["Python", "SQL", "Cashfree API"],
    links: [
      { label: "time2orders.com", url: "https://time2orders.com" },
      { label: "time2orders.shop", url: "https://time2orders.shop" },
    ],
    featured: true,
    category: "personal",
    highlight: true,
    icon: Zap,
    accentColor: "#f59e0b",
    bgGradient: "from-amber-500/10 via-orange-500/5 to-transparent",
  },
  {
    title: "Dakshaa T26",
    subtitle: "Event Platform",
    description:
      "Full-stack event management platform with React frontend, Express backend, Supabase Auth, and integrated payment processing. Deployed on Cloudflare + VPS.",
    tech: ["React", "Express", "Supabase", "Cloudflare"],
    links: [{ label: "dakshaa.ksrct.ac.in", url: "https://dakshaa.ksrct.ac.in" }],
    featured: true,
    category: "personal",
    highlight: true,
    icon: Globe,
    accentColor: "#8b5cf6",
    bgGradient: "from-violet-500/10 via-purple-500/5 to-transparent",
  },
  {
    title: "TrueSight AI",
    subtitle: "Deepfake Detection System",
    description:
      "AI deepfake detection using Roboflow models & Flask backend. Generates evidence-based forensic reports. Presented to Namakkal Cyber Cell for cybercrime investigation.",
    tech: ["Roboflow", "Flask", "AI/ML", "Forensics"],
    links: [{ label: "Cyber Cell Report", url: "https://tinyurl.com/cybernamakkal" }],
    featured: true,
    category: "personal",
    highlight: true,
    icon: Cpu,
    accentColor: "#06b6d4",
    bgGradient: "from-cyan-500/10 via-blue-500/5 to-transparent",
  },
  {
    title: "AutoRevive",
    subtitle: "Online Vehicle Auction Platform",
    description:
      "Built an interactive online auction portal revolutionizing how vehicles are bought and sold. Features seamless bidding at users' convenience, a wide selection of thousands of vehicles at competitive prices, and a trustworthy marketplace with flexible offers for every budget.",
    tech: ["Web App", "Auction System", "E-Commerce", "Client Project"],
    links: [{ label: "autorevives.com", url: "https://autorevives.com/" }],
    featured: true,
    category: "client",
    highlight: true,
    icon: Layers,
    accentColor: "#10b981",
    bgGradient: "from-emerald-500/10 via-green-500/5 to-transparent",
  },
  // --- remaining projects shown after "View All" ---
  {
    title: "Time2Due",
    subtitle: "Operations Management Platform",
    description:
      "Platform for employee tracking, offline payments, and real-time dashboards to streamline business operations and workforce management.",
    tech: ["Web Dev", "Dashboard", "Payments"],
    links: [{ label: "time2due.com", url: "https://time2due.com" }],
    featured: true,
    category: "personal",
  },
  {
    title: "Time2Farm",
    subtitle: "Farm Finance & Management Platform",
    description:
      "AI-powered finance tracking for farmers. Features income/expense tracking and intelligent insights via Gemini API integration.",
    tech: ["AI", "Gemini API", "Finance"],
    links: [],
    featured: false,
    category: "personal",
  },
  {
    title: "IPL Analysis",
    subtitle: "Power BI Dashboard",
    description:
      "Interactive Power BI dashboard analyzing IPL match data from 2008–2024 using DAX queries for deep statistical insights.",
    tech: ["Power BI", "DAX", "Analytics"],
    links: [{ label: "Download Report", url: "/IPL 2008-2024 Dashboard.pptx", download: true }],
    featured: false,
    category: "personal",
  },
  {
    title: "CTC Digital",
    subtitle: "Tuition Centre Management",
    description:
      "Digitalized a tuition centre's entire workflow — student enrollment, attendance tracking, fee management, and performance reports. Replaced manual processes with an intuitive web app to save time and reduce errors.",
    tech: ["Web App", "Dashboard", "Management", "Automation"],
    links: [{ label: "Live", url: "https://tinyurl.com/2026ctc" }],
    featured: true,
    category: "client",
  },
  {
    title: "ProPic",
    subtitle: "E-Commerce Store",
    description:
      "Developed a full-featured e-commerce platform for a house cleaning products brand. Enables customers to browse, order, and purchase cleaning essentials online with a smooth shopping experience, secure checkout, and product catalog management.",
    tech: ["E-Commerce", "Web App", "Product Catalog", "Client Project"],
    links: [{ label: "propic.in", url: "https://propic.in/" }],
    featured: true,
    category: "client",
  },
  {
    title: "Pashuthalam",
    subtitle: "Veterinary Digital Prescription Platform — SIH",
    description:
      "Built for Smart India Hackathon to combat Antimicrobial Resistance (AMR) through structured digital prescriptions. Ensures farmers can only purchase veterinary medication with a valid digital prescription. Integrated Twilio & WhatsApp API to send medication reminders, collect farmer responses, and store feedback in DB to verify correct medicine administration.",
    tech: ["SIH", "Twilio", "WhatsApp API", "Healthcare", "Full-Stack"],
    links: [{ label: "Live Demo", url: "https://pashuthalam-vertinary.onrender.com" }],
    featured: true,
    category: "personal",
  },
  {
    title: "QR Code Scanner",
    subtitle: "for DaKshaa T25",
    description:
      "A web-based QR code scanner that captures and processes QR codes to extract mobile numbers and event names, updating them via a server endpoint. Features: Scans QR codes using device camera, extracts mobile number and event name, supports 'Old QR' and 'New QR' scanning, and sends data to a server for updates.",
    tech: ["jsQR", "JavaScript", "HTML5"],
    links: [{ label: "GitHub", url: "https://github.com/Vikasthangavel/assignQR" }],
    featured: true,
    category: "personal",
  },
  {
    title: "Time2Bus",
    subtitle: "Real-Time Bus Tracking — Web App + IoT Hardware",
    description:
      "A smart transportation system combining a web app with IoT hardware devices. Users can track live bus locations in real-time via the app. Hardware devices installed on buses share GPS coordinates and auto-announce the next stop using predefined route data — enhancing the commuter experience with accurate, hands-free updates.",
    tech: ["IoT", "GPS", "Web App", "Hardware", "Real-Time"],
    links: [],
    featured: true,
    underDev: true,
    category: "personal",
  },
  {
    title: "The Astro Technologies",
    subtitle: "RO System Portfolio & Product Catalog",
    description:
      "Designed and developed a professional portfolio and product catalog for an RO System company based in Vellore. Features a dynamic product listing, high-quality image storage using Cloudinary, and a seamless user experience built with React and Firebase.",
    tech: ["React", "Firebase", "Cloudinary", "Product Catalog"],
    links: [{ label: "theastrotechnologies.in", url: "https://theastro.pages.dev/" }],
    featured: true,
    category: "client",
  },
];

const highlightProjects = projects.filter((p) => p.highlight);
const remainingProjects = projects.filter((p) => !p.highlight);

/* ── Highlighted showcase card ─────────────────────────────────── */
const ShowcaseCard = ({ project, index }) => {
  const Icon = project.icon || Folder;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="relative group cursor-default overflow-hidden rounded-2xl border border-white/5 flex flex-col h-full"
      style={{ background: "rgba(10,10,14,0.85)" }}
    >
      {/* Animated glow background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      {/* Top accent bar */}
      <div
        className="h-0.5 w-full"
        style={{
          background: `linear-gradient(to right, ${project.accentColor}80, transparent)`,
        }}
      />

      {/* Corner glow */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10 group-hover:opacity-25 transition-opacity duration-500"
        style={{ background: project.accentColor }}
      />

      <div className="relative z-10 p-7 flex flex-col flex-1">
        {/* Icon + badge */}
        <div className="flex items-start justify-between mb-5">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center border"
            style={{
              background: `${project.accentColor}15`,
              borderColor: `${project.accentColor}30`,
            }}
          >
            <Icon size={22} style={{ color: project.accentColor }} />
          </div>
          <div className="flex items-center gap-1.5">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
            >
              <Star size={13} className="text-yellow-500 fill-yellow-500" />
            </motion.div>
            <span
              className="text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold tracking-wider"
              style={{
                background: `${project.accentColor}15`,
                color: project.accentColor,
                border: `1px solid ${project.accentColor}30`,
              }}
            >
              FEATURED
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="mb-3">
          <h3
            className="text-xl font-bold font-mono transition-colors duration-300"
            style={{ color: "#fff" }}
          >
            <span className="group-hover:text-inherit transition-colors"
              style={{ "--tw-text-opacity": 1 }}
            >
              {project.title}
            </span>
          </h3>
          <p
            className="text-xs font-mono mt-0.5 opacity-70"
            style={{ color: project.accentColor }}
          >
            {project.subtitle}
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
          {project.description}
        </p>

        <div className="mt-auto">
          {/* Tech pills */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tech.map((t, i) => (
              <motion.span
                key={i}
                whileHover={{ scale: 1.1, y: -2 }}
                className="text-[11px] px-2.5 py-1 rounded-md font-mono border transition-all cursor-default inline-block"
                style={{
                  background: `${project.accentColor}08`,
                  color: `${project.accentColor}cc`,
                  borderColor: `${project.accentColor}20`,
                }}
              >
                {t}
              </motion.span>
            ))}
          </div>

          {/* Links */}
          <div
            className="flex gap-4 pt-4 border-t"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            {project.links.length > 0 ? (
              project.links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={link.download}
                  className="flex items-center gap-1.5 text-xs font-mono transition-all duration-300 hover:translate-x-1"
                  style={{ color: "#6b7280" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = project.accentColor)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
                >
                  {link.download ? (
                    <Download size={12} />
                  ) : (
                    <ExternalLink size={12} />
                  )}
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
  );
};

/* ── Regular project card (shown in "all" view) ──────────────────── */
const ProjectCard = ({ project, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ delay: index * 0.07, duration: 0.45 }}
    whileHover={{ y: -6, scale: 1.015 }}
    className="terminal-card flex flex-col h-full group card-shine cursor-default"
  >
    <div className="terminal-header">
      <div className="ml-auto flex items-center gap-2">
        {project.featured && (
          <Star size={11} className="text-yellow-500 fill-yellow-500" />
        )}
        <Folder size={11} className="text-gray-600 group-hover:text-amber-500 transition-colors" />
      </div>
    </div>

    <div className="p-5 flex flex-col flex-1">
      <div className="mb-3">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors font-mono">
            {project.title}
          </h3>
          {project.underDev && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 font-mono animate-pulse">
              In Dev
            </span>
          )}
          <span
            className={`text-[9px] px-1.5 py-0.5 rounded font-mono uppercase tracking-wide ${
              project.category === "client"
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
            }`}
          >
            {project.category}
          </span>
        </div>
        <p className="text-amber-500/60 text-[11px] font-mono mt-0.5">{project.subtitle}</p>
      </div>

      <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">{project.description}</p>

      <div className="mt-auto">
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((t, i) => (
            <span
              key={i}
              className="text-[11px] px-2 py-0.5 bg-amber-500/5 text-amber-400/80 rounded font-mono border border-amber-500/10"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex gap-4 pt-4 border-t border-gray-800">
          {project.links.length > 0 ? (
            project.links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                download={link.download}
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-amber-400 transition-all font-mono hover:translate-x-1 duration-300"
              >
                {link.download ? <Download size={11} /> : <ExternalLink size={11} />}
                {link.label}
              </a>
            ))
          ) : (
            <span className="text-gray-600 text-xs font-mono italic flex items-center gap-1.5">
              <GitBranch size={11} /> private / offline
            </span>
          )}
        </div>
      </div>
    </div>
  </motion.div>
);

/* ── Main Section ────────────────────────────────────────────────── */
export default function Projects() {
  const [showAll, setShowAll] = useState(false);

  return (
    <section id="projects" className="py-24 relative">
      <div className="section-divider mb-24" />
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-amber-500 text-sm tracking-wider mb-3 block">
            {"// projects"}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text animate-gradient-text">Work</span>
          </h2>
          <p className="text-gray-500 text-sm font-mono max-w-md mx-auto">
            {projects.length} projects shipped — here are the highlights
          </p>
        </motion.div>

        {/* ── 4 SHOWCASE CARDS ──────────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {highlightProjects.map((project, index) => (
            <ShowcaseCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* ── TOGGLE BUTTON ─────────────────────────────────────── */}
        <div className="flex justify-center mb-10">
          <motion.button
            onClick={() => setShowAll((prev) => !prev)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="relative group flex items-center gap-3 px-8 py-3.5 rounded-full font-mono text-sm font-semibold overflow-hidden border transition-all duration-300"
            style={{
              background: showAll
                ? "rgba(245,158,11,0.08)"
                : "rgba(245,158,11,0.12)",
              borderColor: "rgba(245,158,11,0.3)",
              color: "#f59e0b",
            }}
          >
            {/* inner shimmer */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />

            <span className="relative z-10 flex items-center gap-2">
              {showAll ? (
                <>
                  <ChevronUp size={16} />
                  Show Less
                </>
              ) : (
                <>
                  <Folder size={16} />
                  View All {projects.length} Projects
                  <ChevronDown size={16} />
                </>
              )}
            </span>
          </motion.button>
        </div>

        {/* ── ALL PROJECTS GRID ──────────────────────────────────── */}
        <AnimatePresence>
          {showAll && (
            <motion.div
              key="all-projects"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              {/* Section label */}
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2 whitespace-nowrap">
                  <span className="text-amber-500">✦</span> All Projects
                </h3>
                <div className="h-px flex-1 bg-gradient-to-r from-amber-500/30 to-transparent" />
                <span className="text-xs font-mono text-gray-600 whitespace-nowrap">
                  {remainingProjects.length} more
                </span>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {remainingProjects.map((project, index) => (
                  <ProjectCard key={project.title} project={project} index={index} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
