import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowUpRight, MessageCircle } from "lucide-react";

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
      color: "#c0624a",
      bg: "rgba(192,98,74,0.08)",
      border: "rgba(192,98,74,0.18)",
    },
    {
      icon: <Phone size={20} />,
      label: "Phone",
      value: "+91 63814 59911",
      href: "tel:+916381459911",
      color: "#6b8f6e",
      bg: "rgba(107,143,110,0.08)",
      border: "rgba(107,143,110,0.18)",
    },
    {
      icon: <MapPin size={20} />,
      label: "Location",
      value: "Erode, Tamil Nadu, India",
      href: null,
      color: "#4a7fa8",
      bg: "rgba(74,127,168,0.08)",
      border: "rgba(74,127,168,0.18)",
    },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="section-divider mb-24"></div>
      {/* Warm background blob */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] -z-10"
        style={{ background: "rgba(107,143,110,0.05)" }}
      ></div>

      <div className="max-w-7xl mx-auto px-6">
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
            Let's connect
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold mb-4 text-stone-900"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Get in <span className="gradient-text animate-gradient-text">Touch</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* Human intro card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="warm-card p-6 mb-8"
          >
            <p className="text-stone-700 text-base leading-relaxed">
              I'm always open to new opportunities and conversations. Whether you have a project in mind,
              a role to discuss, or just want to say hello — feel free to reach out via WhatsApp or any
              channel below. I'll get back to you as soon as I can!
            </p>
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
                className="flex items-center gap-4 p-4 rounded-xl bg-white border border-stone-200 hover:border-amber-300 hover:bg-amber-50/40 transition-all group cursor-default shadow-sm"
              >
                <div
                  className="p-2.5 rounded-lg flex-shrink-0"
                  style={{ background: item.bg, color: item.color, border: `1px solid ${item.border}` }}
                >
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-stone-400 mb-0.5 uppercase tracking-wider">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-stone-700 text-sm hover:text-amber-700 transition-colors flex items-center gap-1 truncate">
                      {item.value}
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </a>
                  ) : (
                    <p className="text-stone-700 text-sm truncate">{item.value}</p>
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
              className="inline-flex items-center gap-3 px-10 py-4 text-white font-semibold rounded-xl shadow-lg transition-all text-base magnetic-btn relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #22c55e, #16a34a)",
                boxShadow: "0 4px 20px rgba(34,197,94,0.2)",
              }}
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
