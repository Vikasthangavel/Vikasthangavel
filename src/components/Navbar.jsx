import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", to: "about" },
    { name: "Skills", to: "skills" },
    { name: "Projects", to: "projects" },
    { name: "Experience", to: "experience" },
    { name: "Certificates", to: "certificates" },
    { name: "Hobbies", to: "hobbies" },
    { name: "Contact", to: "contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? "glass-nav py-3" : "bg-transparent py-5"
      }`}
    >
      {/* Skip to main content — visible on focus for keyboard/screen-reader users */}
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[999] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-white focus:text-amber-800 focus:font-semibold focus:shadow-lg focus:outline-none"
      >
        Skip to content
      </a>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo — personal initials monogram */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link
            to="hero"
            smooth={true}
            duration={500}
            className="cursor-pointer font-bold text-xl flex items-center gap-2.5 group"
          >
            {/* Monogram badge */}
            <motion.div
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.25 }}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md"
              style={{ background: "linear-gradient(135deg, #c0624a, #c9882c)" }}
            >
              VT
            </motion.div>
            <span
              className="font-semibold tracking-tight text-stone-800 group-hover:text-stone-600 transition-colors"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem" }}
            >
              Vikas<span style={{ color: "#c0624a" }}> T</span>
            </span>
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:flex items-center gap-1"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              smooth={true}
              duration={500}
              spy={true}
              offset={-70}
              onSetActive={() => setActiveSection(link.to)}
              className="relative px-4 py-2 text-sm text-stone-600 hover:text-amber-800 cursor-pointer transition-all font-medium rounded-lg hover:bg-amber-500/[0.07] group"
            >
              {link.name}
              {activeSection === link.to && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                  style={{ background: "linear-gradient(to right, #c0624a, #c9882c)" }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </motion.div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="p-2 rounded-lg text-stone-500 hover:text-amber-700 hover:bg-amber-50 transition-all"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden glass-nav border-t border-stone-200/60"
          >
            <div className="flex flex-col p-4 gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ x: 5 }}
                >
                  <Link
                    to={link.to}
                    smooth={true}
                    duration={500}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 text-stone-600 hover:text-amber-800 font-medium text-base cursor-pointer py-3 px-4 rounded-lg hover:bg-amber-50 transition-all"
                  >
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, #c0624a, #c9882c)" }}
                    >
                      {i + 1}
                    </span>
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
