import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageSquare, ArrowUpRight, MessageCircle } from "lucide-react";

export default function Contact() {
  const phoneNumber = "916381459911";
  const defaultMessage = "Hi Vikas! I came across your portfolio and would like to connect.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  const contactInfo = [
    {
      icon: <Mail size={20} />,
      label: "Email",
      value: "vikasthangavel@gmail.com",
      href: "mailto:vikasthangavel@gmail.com",
      color: "amber",
    },
    {
      icon: <Phone size={20} />,
      label: "Phone",
      value: "+91 63814 59911",
      href: "tel:+916381459911",
      color: "green",
    },
    {
      icon: <MapPin size={20} />,
      label: "Location",
      value: "Erode, Tamil Nadu, India",
      href: null,
      color: "purple",
    },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="section-divider mb-24"></div>
      {/* Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/5 rounded-full blur-[150px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-amber-500 text-sm tracking-wider mb-3 block">{"// contact"}</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Get in <span className="gradient-text animate-gradient-text">Touch</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* Terminal card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="terminal-card mb-8 card-shine">
              <div className="terminal-header">
                <span className="terminal-dot bg-red-500"></span>
                <span className="terminal-dot bg-yellow-500"></span>
                <span className="terminal-dot bg-green-500"></span>
                <span className="ml-3 text-xs text-gray-500 font-mono flex items-center gap-1.5">
                  <MessageSquare size={12} /> connect.sh
                </span>
              </div>
              <div className="p-6 font-mono text-sm">
                <p className="text-gray-600 mb-4">{"# Let's build something together"}</p>
                <p><span className="text-purple-400">echo</span> <span className="text-green-400">"I'm always open to new opportunities"</span></p>
                <p><span className="text-purple-400">echo</span> <span className="text-green-400">"Reach out via WhatsApp or any channel below"</span></p>
              </div>
            </div>
          </motion.div>

          {/* Contact Info Cards */}
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {contactInfo.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-amber-500/20 hover:bg-white/[0.04] transition-all group cursor-default"
              >
                <div className={`p-2.5 rounded-lg bg-${item.color}-500/10 text-${item.color}-400`}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 font-mono mb-0.5">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-gray-200 text-sm hover:text-amber-400 transition-colors flex items-center gap-1 truncate">
                      {item.value}
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </a>
                  ) : (
                    <p className="text-gray-200 text-sm truncate">{item.value}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-semibold rounded-xl shadow-lg shadow-green-500/20 hover:shadow-green-500/40 transition-all text-base magnetic-btn relative overflow-hidden"
            >
              <MessageCircle size={22} className="animate-bounce" />
              Message on WhatsApp
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                initial={{ x: "-200%" }}
                whileHover={{ x: "200%" }}
                transition={{ duration: 0.8 }}
              />
            </motion.a>
            <p className="text-gray-600 text-xs font-mono mt-4">
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
