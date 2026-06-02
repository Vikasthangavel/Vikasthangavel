import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  GitBranch,
  Download,
  ChevronDown,
  ChevronUp,
  Zap,
  Globe,
  Cpu,
  Layers,
  FileSignature,
  ArrowUpRight,
  Folder,
  Star,
} from "lucide-react";

/* ── Project Data ─────────────────────────────────────────────── */
export const projects = [
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
    accent: "#6366f1",
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
    accent: "#8b5cf6",
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
    accent: "#06b6d4",
    num: "03",
  },
  {
    title: "AutoRevive",
    subtitle: "Online Vehicle Auction Platform",
    description:
      "Interactive online auction portal revolutionizing how vehicles are bought and sold. Features real-time bidding, thousands of vehicles at competitive prices, and a trustworthy marketplace with flexible offers.",
    tech: ["React", "Node.js", "MongoDB", "Razorpay"],
    links: [{ label: "autorevives.com", url: "https://autorevives.com/" }],
    featured: true,
    category: "client",
    highlight: true,
    Icon: Layers,
    accent: "#10b981",
    num: "04",
  },
  {
    title: "Time2Confirm",
    subtitle: "Digital Agreement & eSign Platform",
    description:
      "A platform where tourist packers can create professional agreements and instantly send them to clients. Clients can review and digitally sign agreements online — eliminating paperwork and making the booking process seamless.",
    tech: ["React", "Digital Signatures", "Firebase", "Cloudinary"],
    links: [{ label: "time2confirm.com", url: "https://time2confirm.pages.dev/" }],
    featured: true,
    category: "personal",
    highlight: true,
    Icon: FileSignature,
    accent: "#f59e0b",
    num: "05",
  },
  // extra projects
  {
    title: "PrimePick",
    subtitle: "Affiliate Web App",
    description:
      "Affiliate web application built for a client. Developed using React and Firebase, hosted on Cloudflare Pages for optimal performance.",
    tech: ["React", "Firebase", "Cloudflare"],
    links: [{ label: "primepick.pages.dev", url: "https://primepick.pages.dev/" }],
    featured: true,
    category: "client",
    accent: "#6366f1",
  },
  {
    title: "Time2Due",
    subtitle: "Operations Management Platform",
    description:
      "Platform for employee tracking, offline payments, and real-time dashboards to streamline business operations and workforce management.",
    tech: ["React", "Firebase", "Cloudflare", "Real-Time DB"],
    links: [{ label: "time2due.com", url: "https://time2due.com" }],
    featured: true,
    category: "personal",
    accent: "#8b5cf6",
  },
  {
    title: "Time2Farm",
    subtitle: "Farm Finance & Management Platform",
    description:
      "AI-powered finance tracking for farmers. Features income/expense tracking and intelligent insights via Gemini API integration.",
    tech: ["AI", "Gemini API", "Finance"],
    links: [{ label: "Live", url: "https://time2farm.pages.dev" }],
    featured: false,
    category: "personal",
    accent: "#10b981",
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
    accent: "#f59e0b",
  },
  {
    title: "CTC Digital",
    subtitle: "Tuition Centre Management",
    description:
      "Digitalized a tuition centre's entire workflow — student enrollment, attendance tracking, fee management, and performance reports.",
    tech: ["Web App", "Dashboard", "Automation"],
    links: [{ label: "Live", url: "https://tinyurl.com/2026ctc" }],
    featured: true,
    category: "client",
    accent: "#06b6d4",
  },
  {
    title: "ProPic",
    subtitle: "E-Commerce Store",
    description:
      "Full-featured e-commerce platform for a house cleaning products brand. Smooth shopping experience, secure checkout, and product catalog.",
    tech: ["E-Commerce", "Web App", "Product Catalog"],
    links: [{ label: "propic.in", url: "https://thepropic.pages.dev" }],
    featured: true,
    category: "client",
    accent: "#f43f5e",
  },
  {
    title: "Pashuthalam",
    subtitle: "Veterinary Digital Prescription — SIH",
    description:
      "Built for Smart India Hackathon to combat Antimicrobial Resistance (AMR). Integrated Twilio & WhatsApp API for medication reminders.",
    tech: ["SIH", "Twilio", "WhatsApp API", "Full-Stack"],
    links: [{ label: "Live Demo", url: "https://pashuthalam-vertinary.onrender.com" }],
    featured: true,
    category: "personal",
    accent: "#8b5cf6",
  },
  {
    title: "QR Code Scanner",
    subtitle: "for DaKshaa T25",
    description:
      "Web-based QR code scanner that captures QR codes to extract mobile numbers and event names, updating them via a server endpoint.",
    tech: ["jsQR", "JavaScript", "HTML5"],
    links: [{ label: "GitHub", url: "https://github.com/Vikasthangavel/assignQR" }],
    featured: true,
    category: "personal",
    accent: "#6366f1",
  },
  {
    title: "Time2Bus",
    subtitle: "Real-Time Bus Tracking — Web + IoT",
    description:
      "Smart transportation system combining a web app with IoT hardware. GPS coordinates auto-announce the next stop using predefined route data.",
    tech: ["IoT", "GPS", "Web App", "Hardware"],
    links: [],
    featured: true,
    underDev: true,
    category: "personal",
    accent: "#10b981",
  },
  {
    title: "The Astro Technologies",
    subtitle: "RO System Portfolio & Product Catalog",
    description:
      "Professional portfolio and product catalog for an RO System company in Vellore with Cloudinary image storage and a seamless React + Firebase experience.",
    tech: ["React", "Firebase", "Cloudinary"],
    links: [{ label: "theastrotechnologies.in", url: "https://theastro.pages.dev/" }],
    featured: true,
    category: "client",
    accent: "#06b6d4",
  },
  {
    title: "The Astro Tech",
    subtitle: "Billing Software with GST Invoice",
    description:
      "Comprehensive billing software featuring GST invoicing and customer login. Integrated with a business chatbot using LangChain and GPT Mini.",
    tech: ["React", "Python Flask", "LangChain", "GPT Mini"],
    links: [{ label: "bill.theastrotech.in", url: "https://theastrotech.pages.dev/" }],
    featured: true,
    category: "client",
    accent: "#f59e0b",
  },
];

const highlightProjects = projects.filter((p) => p.highlight);
const remainingProjects = projects.filter((p) => !p.highlight);

/* ── Featured Card ─────────────────────────────────────────────── */
const FeaturedCard = ({ project, index }) => {
  const { Icon, accent, num } = project;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.1, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -4 }}
      className="group relative bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/60 transition-all duration-300 overflow-hidden cursor-default"
    >
      {/* Top accent bar */}
      <div
        className="h-1 w-full"
        style={{ background: `linear-gradient(90deg, ${accent}, ${accent}88)` }}
      />

      <div className="flex items-start gap-5 p-6">
        {/* Number + Icon column */}
        <div className="flex flex-col items-center gap-2 flex-shrink-0">
          <span
            className="text-3xl font-black font-mono leading-none select-none"
            style={{ color: `${accent}22`, WebkitTextStroke: `1px ${accent}40` }}
          >
            {num}
          </span>
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 border"
            style={{ background: `${accent}12`, borderColor: `${accent}30` }}
          >
            {Icon && <Icon size={20} style={{ color: accent }} />}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title row */}
          <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-bold text-slate-900 font-mono tracking-tight">
                  {project.title}
                </h3>
                <span
                  className="text-[9px] px-2 py-0.5 rounded-full font-mono font-bold tracking-widest border"
                  style={{ color: accent, background: `${accent}10`, borderColor: `${accent}30` }}
                >
                  FEATURED
                </span>
                <Star size={11} className="text-amber-400 fill-amber-400" />
              </div>
              <p className="text-xs font-mono mt-0.5" style={{ color: `${accent}bb` }}>
                {project.subtitle}
              </p>
            </div>

            {/* Links */}
            <div className="flex gap-2 flex-shrink-0 flex-wrap">
              {project.links.length > 0 ? (
                project.links.map((link, i) => (
                  <motion.a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={link.download}
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg border bg-slate-50 text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                  >
                    {link.download ? <Download size={10} /> : <ArrowUpRight size={10} />}
                    {link.label}
                  </motion.a>
                ))
              ) : (
                <span className="text-slate-400 text-xs font-mono italic flex items-center gap-1">
                  <GitBranch size={10} /> private
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-500 text-sm leading-relaxed mb-4">{project.description}</p>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t, i) => (
              <span
                key={i}
                className="text-[11px] px-2.5 py-0.5 rounded-full font-mono border bg-slate-50 text-slate-600 border-slate-200"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Extra Project Card ─────────────────────────────────────────── */
const ProjectCard = ({ project, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 16 }}
    transition={{ delay: index * 0.06, duration: 0.4 }}
    whileHover={{ y: -4 }}
    className="group bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-md hover:shadow-slate-200/50 transition-all duration-300 overflow-hidden flex flex-col cursor-default"
  >
    {/* Colored top strip */}
    <div
      className="h-0.5 w-full"
      style={{ background: project.accent || "#6366f1" }}
    />

    <div className="p-5 flex flex-col flex-1">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-bold text-slate-900 font-mono">
              {project.title}
            </h3>
            {project.underDev && (
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200 font-mono animate-pulse">
                In Dev
              </span>
            )}
            <span
              className={`text-[9px] px-1.5 py-0.5 rounded font-mono uppercase tracking-wide border ${
                project.category === "client"
                  ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                  : "bg-indigo-50 text-indigo-600 border-indigo-200"
              }`}
            >
              {project.category}
            </span>
          </div>
          <p className="text-[11px] font-mono text-slate-400 mt-0.5">{project.subtitle}</p>
        </div>
        {project.featured && <Star size={12} className="text-amber-400 fill-amber-400 flex-shrink-0 mt-0.5" />}
      </div>

      <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1">{project.description}</p>

      {/* Footer */}
      <div className="mt-auto">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tech.map((t, i) => (
            <span
              key={i}
              className="text-[10px] px-2 py-0.5 rounded-full font-mono border bg-slate-50 text-slate-500 border-slate-200"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="flex gap-3 pt-3 border-t border-slate-100">
          {project.links.length > 0 ? (
            project.links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                download={link.download}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-indigo-600 transition-colors font-mono"
              >
                {link.download ? <Download size={10} /> : <ExternalLink size={10} />}
                {link.label}
              </a>
            ))
          ) : (
            <span className="text-slate-300 text-xs font-mono italic flex items-center gap-1">
              <GitBranch size={10} /> private / offline
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
  const [filter, setFilter] = useState("all");

  const displayedHighlights = highlightProjects.filter(
    (p) => filter === "all" || p.category === filter
  );
  const displayedRemaining = remainingProjects.filter(
    (p) => filter === "all" || p.category === filter
  );

  return (
    <section id="projects" className="py-24 relative">
      <div className="section-divider mb-24" />
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-indigo-500 text-sm tracking-wider mb-3 block">
            {"// projects"}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">
            Featured <span className="gradient-text animate-gradient-text">Work</span>
          </h2>
          <p className="text-slate-500 text-sm font-mono mb-8">
            {projects.length} projects shipped —{" "}
            <span className="text-indigo-500">here are the highlights</span>
          </p>

          {/* Filter tabs */}
          <div className="flex justify-center gap-2">
            {["all", "personal", "client"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 text-sm font-mono rounded-full border transition-all ${
                  filter === f
                    ? "bg-indigo-500 border-indigo-500 text-white shadow-md shadow-indigo-200"
                    : "bg-white border-slate-200 text-slate-500 hover:text-slate-700 hover:border-slate-300"
                }`}
              >
                {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}{" "}
                {f !== "all" ? "Projects" : ""}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured stack */}
        <div className="flex flex-col gap-4 mb-10">
          {displayedHighlights.length > 0 ? (
            displayedHighlights.map((project, index) => (
              <FeaturedCard key={project.title} project={project} index={index} />
            ))
          ) : (
            <div className="text-center text-slate-400 font-mono py-10">
              No featured projects in this category.
            </div>
          )}
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-10">
          <motion.button
            onClick={() => setShowAll((prev) => !prev)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2.5 px-7 py-3 rounded-full font-mono text-sm font-semibold border bg-white border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 shadow-sm transition-all"
          >
            {showAll ? (
              <><ChevronUp size={15} /> Show Less</>
            ) : (
              <><Folder size={14} /> View All {projects.length} Projects <ChevronDown size={15} /></>
            )}
          </motion.button>
        </div>

        {/* All projects grid */}
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
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-base font-bold text-slate-800 font-mono flex items-center gap-2 whitespace-nowrap">
                  <span className="text-indigo-500">✦</span> All Projects
                </h3>
                <div className="h-px flex-1 bg-gradient-to-r from-indigo-200 to-transparent" />
                <span className="text-xs font-mono text-slate-400 whitespace-nowrap">
                  {displayedRemaining.length} more
                </span>
              </div>

              {displayedRemaining.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {displayedRemaining.map((project, index) => (
                    <ProjectCard key={project.title} project={project} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center text-slate-400 font-mono py-10">
                  No extra projects in this category.
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
