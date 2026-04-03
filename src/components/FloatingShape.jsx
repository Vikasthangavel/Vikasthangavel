import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/* ── Orbiting skill tags around a central avatar ring ── */
const ORBIT_ITEMS = [
  { label: "Python",   angle: 0   },
  { label: "React",    angle: 51  },
  { label: "Flask",    angle: 102 },
  { label: "SQL",      angle: 153 },
  { label: "AI/ML",   angle: 204 },
  { label: "Docker",  angle: 255 },
  { label: "Node",    angle: 306 },
];

function OrbitTag({ label, angle, radius, duration, delay }) {
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * radius;
  const y = Math.sin(rad) * radius;

  return (
    <motion.div
      className="absolute"
      style={{ left: "50%", top: "50%" }}
      animate={{ rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear", delay }}
    >
      <motion.div
        style={{
          x: x - 28,
          y: y - 12,
          background: "rgba(74,222,128,0.07)",
          borderColor: "rgba(74,222,128,0.22)",
          color: "rgba(74,222,128,0.85)",
          boxShadow: "0 0 8px rgba(74,222,128,0.12)",
        }}
        animate={{ rotate: -360 }}
        transition={{ duration, repeat: Infinity, ease: "linear", delay }}
        className="text-[10px] px-2 py-0.5 rounded font-mono border whitespace-nowrap"
      >
        {label}
      </motion.div>
    </motion.div>
  );
}

/* ── Matrix-style falling code columns ── */
const CODE_CHARS = "01アイウエオPYTHONREACTSQLAI</>{}[];".split("");

function CodeRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const fontSize = 11;
    let cols = Math.floor(canvas.width / fontSize);
    const drops = Array(cols).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(5,13,7,0.14)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      cols = Math.floor(canvas.width / fontSize);
      while (drops.length < cols) drops.push(Math.random() * 30);

      for (let i = 0; i < drops.length; i++) {
        const char = CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
        // head of column: bright green
        ctx.fillStyle = drops[i] < 2 ? "#a7f3d0" : `rgba(74,222,128,${0.08 + Math.random() * 0.2})`;
        ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.4;
      }
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.55 }}
    />
  );
}

/* ── Central pulse rings ── */
function PulseRings() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border"
          style={{
            width:  i * 90 + 60,
            height: i * 90 + 60,
            borderColor: `rgba(74,222,128,${0.18 - i * 0.04})`,
          }}
          animate={{ scale: [1, 1.06, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 2.5 + i * 0.7, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ── Main export ── */
export default function FloatingShape() {
  const orbitRadius = 130;
  const orbitDuration = 22;

  return (
    <div className="relative w-full aspect-square max-w-[460px] mx-auto pointer-events-none">
      {/* Matrix code rain background */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <CodeRain />
      </div>

      {/* Soft vignette so it blends into bg */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(5,13,7,0.85) 100%)",
        }}
      />

      {/* Pulse rings + orbiting tags centred */}
      <div className="absolute inset-0 flex items-center justify-center">
        <PulseRings />

        {/* Orbiting tags — outer ring */}
        <div className="relative w-0 h-0">
          {ORBIT_ITEMS.map((item, i) => (
            <OrbitTag
              key={item.label}
              label={item.label}
              angle={item.angle}
              radius={orbitRadius}
              duration={orbitDuration}
              delay={0}
            />
          ))}
        </div>

        {/* Centre: avatar / initials */}
        <div className="absolute flex flex-col items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-20 h-20 rounded-2xl flex items-center justify-center font-mono font-black text-2xl border"
            style={{
              background: "rgba(74,222,128,0.08)",
              borderColor: "rgba(74,222,128,0.3)",
              color: "#4ade80",
              boxShadow: "0 0 32px rgba(74,222,128,0.18), 0 0 64px rgba(74,222,128,0.06)",
              textShadow: "0 0 20px rgba(74,222,128,0.6)",
            }}
          >
            VT
          </motion.div>
          <motion.p
            className="mt-2 text-[10px] font-mono tracking-widest"
            style={{ color: "rgba(74,222,128,0.5)" }}
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            &lt;vikas.dev/&gt;
          </motion.p>
        </div>
      </div>
    </div>
  );
}
