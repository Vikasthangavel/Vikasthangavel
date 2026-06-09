import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ExternalLink, Download, X, FileText, BookOpen, Code2, Wifi, Globe } from "lucide-react";

const certificates = [
  {
    title: "Advanced R Programming for Data Analytics in Business",
    file: "/certificates/Advanced R Programming for Data Analytics in Business.pdf",
    category: "Data Science",
    icon: <BookOpen size={22} />,
    gradient: "from-[#c0624a] to-[#a04d37]",
    glow: "shadow-[#c0624a]/20",
    borderColor: "border-[#c0624a]/30",
    iconBg: "bg-[#c0624a]/10 text-[#c0624a]",
    tagColor: "bg-[#fdf0eb] text-[#a04d37]",
    description: "Advanced techniques in R programming applied to business analytics and data-driven decision making.",
  },
  {
    title: "Data Analytics with Python",
    file: "/certificates/Data Analytics with Python.pdf",
    category: "Data Science",
    icon: <Code2 size={22} />,
    gradient: "from-[#4a7fa8] to-[#2d6a8c]",
    glow: "shadow-[#4a7fa8]/20",
    borderColor: "border-[#4a7fa8]/30",
    iconBg: "bg-[#4a7fa8]/10 text-[#4a7fa8]",
    tagColor: "bg-[#edf4f9] text-[#2d6a8c]",
    description: "Comprehensive data analysis using Python libraries including Pandas, NumPy, and visualization tools.",
  },
  {
    title: "English Language for Competitive Exams",
    file: "/certificates/English Language for Competitive Exams.pdf",
    category: "Communication",
    icon: <Globe size={22} />,
    gradient: "from-[#6b8f6e] to-[#4a6d4c]",
    glow: "shadow-[#6b8f6e]/20",
    borderColor: "border-[#6b8f6e]/30",
    iconBg: "bg-[#6b8f6e]/10 text-[#6b8f6e]",
    tagColor: "bg-[#eef4ee] text-[#4a6d4c]",
    description: "English language proficiency course focused on grammar, vocabulary, and comprehension for competitive exams.",
  },
  {
    title: "Internet of Things (IoT)",
    file: "/certificates/IOT.pdf",
    category: "Technology",
    icon: <Wifi size={22} />,
    gradient: "from-[#c9882c] to-[#a06a1a]",
    glow: "shadow-[#c9882c]/20",
    borderColor: "border-[#c9882c]/30",
    iconBg: "bg-[#c9882c]/10 text-[#c9882c]",
    tagColor: "bg-[#fdf5e4] text-[#8a6010]",
    description: "Fundamentals of IoT architecture, sensors, connectivity protocols, and real-world applications.",
  },
  {
    title: "The Joy of Computing using Python",
    file: "/certificates/The Joy of Computing using Python.pdf",
    category: "Programming",
    icon: <FileText size={22} />,
    gradient: "from-[#d4765e] to-[#c0624a]",
    glow: "shadow-[#d4765e]/20",
    borderColor: "border-[#d4765e]/30",
    iconBg: "bg-[#d4765e]/10 text-[#d4765e]",
    tagColor: "bg-[#fdf0eb] text-[#a04d37]",
    description: "An exploration of computational thinking and problem-solving using Python programming language.",
  },
];

export default function Certificates() {
  const [selected, setSelected] = useState(null);

  // Close modal on Escape key
  useEffect(() => {
    if (!selected) return;
    const onKey = (e) => { if (e.key === "Escape") setSelected(null); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <section id="certificates" className="py-24 relative">
      <div className="section-divider mb-24"></div>
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
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
            Credentials & Learning
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold mb-4 text-stone-900"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <span className="gradient-text animate-gradient-text">Certificates</span>
          </h2>
          <p className="text-stone-500 max-w-xl mx-auto text-sm leading-relaxed">
            A collection of certifications I've earned through dedicated online learning and professional development.
          </p>
        </motion.div>

        {/* Certificate Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {certificates.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              role="button"
              tabIndex={0}
              aria-label={`Open ${cert.title} certificate`}
              className="warm-card overflow-hidden group cursor-pointer relative"
              onClick={() => setSelected(cert)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSelected(cert)}
            >
              {/* Top gradient line */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                aria-hidden="true"
                className={`h-1 bg-gradient-to-r ${cert.gradient}`}
              />

              <div className="p-5">
                {/* Icon + Tag Row */}
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    className={`p-2.5 rounded-xl ${cert.iconBg}`}
                  >
                    {cert.icon}
                  </motion.div>
                  <span className={`text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full ${cert.tagColor}`}>
                    {cert.category}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="text-sm font-bold text-stone-800 mb-2 leading-snug group-hover:text-amber-800 transition-colors line-clamp-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {cert.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed line-clamp-2 mb-4">
                  {cert.description}
                </p>

                {/* Action Row */}
                <div className="flex gap-2 mt-auto">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => { e.stopPropagation(); setSelected(cert); }}
                    aria-label={`View ${cert.title}`}
                    className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-2 px-3 rounded-lg border border-stone-200 text-stone-600 hover:border-amber-400 hover:text-amber-700 hover:bg-amber-50 transition-all"
                  >
                    <ExternalLink size={12} />
                    View
                  </motion.button>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={cert.file}
                    download
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-2 px-3 rounded-lg text-white transition-all"
                    style={{ background: "linear-gradient(135deg, #c0624a, #c9882c)" }}
                  >
                    <Download size={12} />
                    Download
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* PDF Viewer Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col overflow-hidden"
              style={{ maxHeight: "90vh" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div
                className="flex items-center justify-between px-5 py-4 border-b border-stone-100"
                style={{ background: "linear-gradient(135deg, #fdf6f0, #fef9f5)" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-xl ${selected.iconBg}`}
                  >
                    <Award size={18} />
                  </div>
                  <div>
                    <h4
                      className="text-sm font-bold text-stone-800 leading-tight"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {selected.title}
                    </h4>
                    <span className={`text-[10px] font-semibold uppercase tracking-widest ${selected.tagColor.split(" ")[1]}`}>
                      {selected.category}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={selected.file}
                    download
                    className="flex items-center gap-1.5 text-xs font-semibold py-1.5 px-3 rounded-lg text-white transition-all"
                    style={{ background: "linear-gradient(135deg, #c0624a, #c9882c)" }}
                  >
                    <Download size={12} />
                    Download
                  </a>
                  <button
                    onClick={() => setSelected(null)}
                    aria-label="Close certificate viewer"
                    className="p-2 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-all"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* PDF Embed */}
              <div className="flex-1 bg-stone-100" style={{ minHeight: "60vh" }}>
                <iframe
                  src={selected.file}
                  title={selected.title}
                  className="w-full h-full"
                  style={{ minHeight: "60vh", border: "none" }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
