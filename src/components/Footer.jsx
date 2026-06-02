import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart, Terminal } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-12 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2.5 group cursor-default"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 group-hover:border-indigo-400/45 transition-colors"
            >
              <Terminal size={16} className="text-indigo-500" />
            </motion.div>
            <span className="font-mono text-sm text-slate-500 group-hover:text-slate-700 transition-colors">
              vikas<span className="text-indigo-600">.dev</span>
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
              { href: "https://github.com/Vikasthangavel/", icon: <Github size={16} />, label: "GitHub" },
              { href: "https://www.linkedin.com/in/vikasthangavel/", icon: <Linkedin size={16} />, label: "LinkedIn" },
              { href: "mailto:vikasthangavel@gmail.com", icon: <Mail size={16} />, label: "Email" },
            ].map((link, i) => (
              <motion.a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 transition-all"
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
            className="font-mono text-xs text-slate-400 flex items-center gap-1.5"
          >
            <span>&copy; {new Date().getFullYear()}</span>
            <span className="text-slate-300">|</span>
            <span>Built</span>
            <span>by Vikas T</span>
          </motion.div>
        </div>

        {/* Credit */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-6 pt-4 border-t border-slate-100 text-center font-mono text-xs text-slate-400 flex items-center justify-center gap-1.5"
        >
          Designed & Developed with <Heart size={11} className="text-rose-400 fill-rose-300" /> by{" "}
          <span className="text-indigo-500">Vikas T</span>
        </motion.div>
      </div>
    </footer>
  );
}
