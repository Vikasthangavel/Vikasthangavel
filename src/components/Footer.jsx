import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-stone-200 py-12 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2.5 group cursor-default"
          >
            {/* Monogram */}
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md"
              style={{ background: "linear-gradient(135deg, #c0624a, #c9882c)" }}
            >
              VT
            </div>
            <span
              className="text-stone-600 group-hover:text-stone-800 transition-colors font-semibold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Vikas <span style={{ color: "#c0624a" }}>T</span>
            </span>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex gap-3"
          >
            {[
              { href: "https://github.com/Vikasthangavel/",          icon: <Github size={16} />, label: "GitHub" },
              { href: "https://www.linkedin.com/in/vikasthangavel/", icon: <Linkedin size={16} />, label: "LinkedIn" },
              { href: "mailto:vikasthangavel@gmail.com",              icon: <Mail size={16} />, label: "Email" },
            ].map((link, i) => (
              <motion.a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2.5 rounded-lg bg-stone-50 border border-stone-200 text-stone-400 hover:text-amber-700 hover:border-amber-300 hover:bg-amber-50 transition-all"
                aria-label={link.label}
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xs text-stone-400 flex items-center gap-1.5"
          >
            <span>&copy; {new Date().getFullYear()}</span>
            <span className="text-stone-300">|</span>
            <span>Built by Vikas T</span>
          </motion.div>
        </div>

        {/* Credit */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-6 pt-4 border-t border-stone-100 text-center text-xs text-stone-400 flex items-center justify-center gap-1.5"
        >
          Designed &amp; Developed with <Heart size={11} className="text-rose-400 fill-rose-300" /> by{" "}
          <span style={{ color: "#c0624a" }} className="font-medium">Vikas T</span>
        </motion.div>
      </div>
    </footer>
  );
}
