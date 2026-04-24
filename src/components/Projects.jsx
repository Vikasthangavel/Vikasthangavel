import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
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
  ArrowUpRight,
} from "lucide-react";

/* ── Project Data ────────────────────────────────────────────── */
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
    Icon: Zap,
    accent: "#4ade80",
    num: "01",
  },
  {
    title: "Dakshaa T26",
    subtitle: "Full-Stack Event Platform",
    description:
      "Full-stack event management platform with React frontend, Express backend, Supabase Auth, and integrated payment processing. Deployed on Cloudflare + VPS for 5000+ student participants.",
    tech: ["React", "Express", "Supabase", "Cloudflare"],
    links: [{ label: "dakshaa.ksrct.ac.in", url: "https://dakshaa.ksrct.ac.in" }],
    featured: true,
    category: "personal",
    highlight: true,
    Icon: Globe,
    accent: "#34d399",
    num: "02",
  },
  {
    title: "TrueSight AI",
    subtitle: "Deepfake Detection & Forensics",
    description:
      "AI deepfake detection using Roboflow models & Flask backend. Generates evidence-based forensic reports. Formally presented to Namakkal Cyber Cell for real-world cybercrime investigation.",
    tech: ["Roboflow", "Flask", "AI/ML", "Forensics"],
    links: [{ label: "Cyber Cell Report", url: "https://tinyurl.com/cybernamakkal" }],
    featured: true,
    category: "personal",
    highlight: true,
    Icon: Cpu,
    accent: "#86efac",
    num: "03",
  },
  {
    title: "AutoRevive",
    subtitle: "Online Vehicle Auction Platform",
    description:
      "Interactive online auction portal revolutionizing how vehicles are bought and sold. Features real-time bidding, thousands of vehicles at competitive prices, and a trustworthy marketplace with flexible offers.",
    tech: ["Web App", "Auction System", "E-Commerce"],
    links: [{ label: "autorevives.com", url: "https://autorevives.com/" }],
    featured: true,
    category: "client",
    highlight: true,
    Icon: Layers,
    accent: "#16a34a",
    num: "04",
  },
  // ── extra projects shown after "View All" ──
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
      "Digitalized a tuition centre's entire workflow — student enrollment, attendance tracking, fee management, and performance reports. Replaced manual processes with an intuitive web app.",
    tech: ["Web App", "Dashboard", "Management", "Automation"],
    links: [{ label: "Live", url: "https://tinyurl.com/2026ctc" }],
    featured: true,
    category: "client",
  },
  {
    title: "ProPic",
    subtitle: "E-Commerce Store",
    description:
      "Full-featured e-commerce platform for a house cleaning products brand. Smooth shopping experience, secure checkout, and product catalog management.",
    tech: ["E-Commerce", "Web App", "Product Catalog"],
    links: [{ label: "propic.in", url: "https://thepropic.pages.dev" }],
    featured: true,
    category: "client",
  },
  {
    title: "Pashuthalam",
    subtitle: "Veterinary Digital Prescription — SIH",
    description:
      "Built for Smart India Hackathon to combat Antimicrobial Resistance (AMR). Integrated Twilio & WhatsApp API to send medication reminders and store farmer feedback.",
    tech: ["SIH", "Twilio", "WhatsApp API", "Healthcare", "Full-Stack"],
    links: [{ label: "Live Demo", url: "https://pashuthalam-vertinary.onrender.com" }],
    featured: true,
    category: "personal",
  },
  {
    title: "QR Code Scanner",
    subtitle: "for DaKshaa T25",
    description:
      "Web-based QR code scanner that captures and processes QR codes to extract mobile numbers and event names, updating them via a server endpoint.",
    tech: ["jsQR", "JavaScript", "HTML5"],
    links: [{ label: "GitHub", url: "https://github.com/Vikasthangavel/assignQR" }],
    featured: true,
    category: "personal",
  },
  {
    title: "Time2Bus",
    subtitle: "Real-Time Bus Tracking — Web App + IoT",
    description:
      "Smart transportation system combining a web app with IoT hardware. GPS coordinates auto-announce the next stop using predefined route data.",
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
      "Professional portfolio and product catalog for an RO System company in Vellore with Cloudinary image storage and a seamless React + Firebase experience.",
    tech: ["React", "Firebase", "Cloudinary", "Product Catalog"],
    links: [{ label: "theastrotechnologies.in", url: "https://theastro.pages.dev/" }],
    featured: true,
    category: "client",
  },
];

const highlightProjects = projects.filter((p) => p.highlight);
const remainingProjects = projects.filter((p) => !p.highlight);

/* ── Tile Card (4×1) ──────────────────────────────────────────── */
const TileCard = ({ project, index }) => {
  const { Icon, accent, num } = project;
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
      initial={{ opacity: 0, x: -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.14, duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative w-full cursor-default"
    >
      {/* Glow behind card */}
      <motion.div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
        style={{ background: `linear-gradient(135deg, ${accent}40, transparent 60%)` }}
      />

      {/* Main tile */}
      <div
        className="relative w-full rounded-2xl overflow-hidden border border-white/5 group-hover:border-white/10 transition-all duration-500"
        style={{ background: "rgba(9,9,11,0.92)" }}
      >
        {/* Left accent strip */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-0.5"
          style={{ background: `linear-gradient(to bottom, transparent, ${accent}, transparent)` }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.14 + 0.3, duration: 0.8, ease: "easeOut" }}
        />

        {/* Subtle top-right corner glow */}
        <div
          className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-15 transition-opacity duration-700"
          style={{ background: accent }}
        />

        <div className="relative z-10 flex items-center gap-6 px-7 py-6">
          {/* Big number */}
          <motion.span
            className="hidden sm:block text-6xl font-black font-mono select-none flex-shrink-0 leading-none"
            style={{ color: `${accent}18`, WebkitTextStroke: `1px ${accent}25` }}
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
          >
            {num}
          </motion.span>

          {/* Icon */}
          <motion.div
            className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center border"
            style={{ background: `${accent}12`, borderColor: `${accent}28` }}
            whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            {Icon && <Icon size={24} style={{ color: accent }} />}
          </motion.div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3
                    className="text-xl font-bold font-mono tracking-tight transition-colors duration-300"
                    style={{ color: "#fff" }}
                  >
                    {project.title}
                  </h3>
                  <motion.span
                    className="text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold tracking-widest"
                    style={{
                      background: `${accent}14`,
                      color: accent,
                      border: `1px solid ${accent}28`,
                    }}
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 }}
                  >
                    FEATURED
                  </motion.span>
                  <motion.div
                    animate={{ rotate: [0, 20, -20, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 + index }}
                  >
                    <Star size={12} className="text-yellow-500 fill-yellow-500" />
                  </motion.div>
                </div>
                <p className="text-xs font-mono mt-0.5" style={{ color: `${accent}90` }}>
                  {project.subtitle}
                </p>
              </div>

              {/* Links (top-right) */}
              <div className="flex gap-3 flex-shrink-0">
                {project.links.length > 0 ? (
                  project.links.map((link, i) => (
                    <motion.a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={link.download}
                      whileHover={{ scale: 1.08, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg border transition-all duration-300"
                      style={{
                        background: `${accent}0a`,
                        borderColor: `${accent}28`,
                        color: `${accent}cc`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `${accent}20`;
                        e.currentTarget.style.borderColor = `${accent}60`;
                        e.currentTarget.style.color = accent;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = `${accent}0a`;
                        e.currentTarget.style.borderColor = `${accent}28`;
                        e.currentTarget.style.color = `${accent}cc`;
                      }}
                    >
                      {link.download ? <Download size={11} /> : <ArrowUpRight size={11} />}
                      {link.label}
                    </motion.a>
                  ))
                ) : (
                  <span className="text-gray-700 text-xs font-mono italic flex items-center gap-1">
                    <GitBranch size={11} /> private
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.description}</p>

            {/* Tech pills */}
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.14 + i * 0.06 + 0.4 }}
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="text-[11px] px-2.5 py-1 rounded-md font-mono border transition-all cursor-default"
                  style={{
                    background: `${accent}08`,
                    color: `${accent}bb`,
                    borderColor: `${accent}1a`,
                  }}
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom shimmer line on hover */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700"
          style={{ background: `linear-gradient(to right, ${accent}60, transparent)` }}
        />
      </div>
    </motion.div>
  );
};

/* ── Regular card (used in "All Projects" grid) ───────────────── */
const ProjectCard = ({ project, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ delay: index * 0.07, duration: 0.45 }}
    whileHover={{ y: -6, scale: 1.015 }}
    className="terminal-card flex flex-col h-full group card-shine cursor-default"
  >
    <div className="terminal-header">
      <div className="ml-auto flex items-center gap-2">
        {project.featured && <Star size={11} className="text-yellow-500 fill-yellow-500" />}
        <Folder size={11} className="text-gray-600 group-hover:text-green-400 transition-colors" />
      </div>
    </div>
    <div className="p-5 flex flex-col flex-1">
      <div className="mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-base font-bold text-white group-hover:text-green-400 transition-colors font-mono">
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
        <p className="text-green-500/60 text-[11px] font-mono mt-0.5">{project.subtitle}</p>
      </div>
      <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">{project.description}</p>
      <div className="mt-auto">
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((t, i) => (
            <span
              key={i}
              className="text-[11px] px-2 py-0.5 bg-green-500/5 text-green-400/80 rounded font-mono border border-green-500/10"
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
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-green-400 transition-all font-mono hover:translate-x-1 duration-300"
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

/* ── Main Export ──────────────────────────────────────────────── */
export default function Projects() {
  const [showAll, setShowAll] = useState(false);

  return (
    <section id="projects" className="py-24 relative">
      <div className="section-divider mb-24" />
      <div className="max-w-5xl mx-auto px-6">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.span
            className="font-mono text-green-500 text-sm tracking-wider mb-3 block"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {"// projects"}
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text animate-gradient-text">Work</span>
          </h2>
          <p className="text-gray-500 text-sm font-mono">
            {projects.length} projects shipped —{" "}
            <span className="text-green-500/70">here are the highlights</span>
          </p>
        </motion.div>

        {/* ── 4 × 1 Tile Stack ── */}
        <div className="flex flex-col gap-5 mb-10">
          {highlightProjects.map((project, index) => (
            <TileCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* ── Toggle button ── */}
        <div className="flex justify-center mb-10">
          <motion.button
            onClick={() => setShowAll((prev) => !prev)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="relative group flex items-center gap-2.5 px-8 py-3.5 rounded-full font-mono text-sm font-semibold overflow-hidden border transition-colors duration-300"
            style={{
              background: "rgba(74,222,128,0.06)",
              borderColor: "rgba(74,222,128,0.25)",
              color: "#4ade80",
            }}
          >
            {/* shimmer sweep */}
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-green-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative z-10 flex items-center gap-2">
              {showAll ? (
                <>
                  <ChevronUp size={16} /> Show Less
                </>
              ) : (
                <>
                  <Folder size={15} />
                  View All {projects.length} Projects
                  <ChevronDown size={16} />
                </>
              )}
            </span>
          </motion.button>
        </div>

        {/* ── All Projects expanded grid ── */}
        <AnimatePresence>
          {showAll && (
            <motion.div
              key="all-projects"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.55, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2 whitespace-nowrap">
                  <span className="text-green-400">✦</span> All Projects
                </h3>
                <div className="h-px flex-1 bg-gradient-to-r from-green-500/30 to-transparent" />
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
