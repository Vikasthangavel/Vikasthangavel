import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart, Terminal } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#060609] border-t border-gray-800/50 py-12">
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
              className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 group-hover:border-amber-400/50 transition-colors"
            >
              <Terminal size={16} className="text-amber-400" />
            </motion.div>
            <span className="font-mono text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
              vikas<span className="text-amber-400">.dev</span>
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
                className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05] text-gray-500 hover:text-amber-400 hover:border-amber-500/20 hover:bg-amber-500/5 transition-all"
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
            className="font-mono text-xs text-gray-600 flex items-center gap-1.5"
          >
            <span>&copy; {new Date().getFullYear()}</span>
            <span className="text-gray-700">|</span>
            <span>Built</span>
            <span>by Vikas T</span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
