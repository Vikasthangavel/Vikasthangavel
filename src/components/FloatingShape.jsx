import React, { useEffect, useRef, useMemo, memo } from "react";
import { motion } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   All orbit positions pre-computed — never recomputed on render
   ───────────────────────────────────────────────────────────── */
const ORBIT_ITEMS = [
  { label: "Python", angle: 0   },
  { label: "React",  angle: 51  },
  { label: "Flask",  angle: 102 },
  { label: "SQL",    angle: 153 },
  { label: "AI/ML",  angle: 204 },
  { label: "Docker", angle: 255 },
  { label: "Node",   angle: 306 },
];

const ORBIT_RADIUS   = 130;
const ORBIT_DURATION = 28; // slower = less CPU torque on low-end

/* Memoised tag — only re-mounts once, framer drives it via CSS transform */
const OrbitTag = memo(function OrbitTag({ label, angle }) {
  const rad = (angle * Math.PI) / 180;
  const x   = Math.cos(rad) * ORBIT_RADIUS;
  const y   = Math.sin(rad) * ORBIT_RADIUS;

  return (
    <motion.div
      className="absolute"
      style={{ left: "50%", top: "50%", willChange: "transform" }}
      animate={{ rotate: 360 }}
      transition={{ duration: ORBIT_DURATION, repeat: Infinity, ease: "linear" }}
    >
      {/* counter-rotate so label stays upright */}
      <motion.div
        style={{
          x: x - 28,
          y: y - 12,
          willChange: "transform",
          background:   "rgba(74,222,128,0.07)",
          borderColor:  "rgba(74,222,128,0.22)",
          color:        "rgba(74,222,128,0.85)",
          boxShadow:    "0 0 6px rgba(74,222,128,0.1)",
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: ORBIT_DURATION, repeat: Infinity, ease: "linear" }}
        className="text-[10px] px-2 py-0.5 rounded font-mono border whitespace-nowrap"
      >
        {label}
      </motion.div>
    </motion.div>
  );
});

/* ─────────────────────────────────────────────────────────────
   Code rain — throttled to ~20 fps, smaller font, fewer columns
   ───────────────────────────────────────────────────────────── */
const CODE_CHARS = "01PYTHONREACTSQLAI</>{}[];".split("");

const CodeRain = memo(function CodeRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx  = canvas.getContext("2d", { alpha: false }); // alpha:false = faster composite
    let animId;
    let last   = 0;
    const FPS  = 18;               // 18 frames/s is plenty for rain effect
    const MS   = 1000 / FPS;
    const SIZE = 13;               // larger font → fewer columns

    const init = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    init();

    let cols  = Math.floor(canvas.width / SIZE);
    const drops = Array.from({ length: cols }, () => Math.random() * 30);

    const draw = (ts) => {
      animId = requestAnimationFrame(draw);
      if (ts - last < MS) return;        // skip frame — throttle
      last = ts;

      // trail fade
      ctx.fillStyle = "rgba(5,13,7,0.18)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${SIZE}px monospace`;

      cols = Math.floor(canvas.width / SIZE);
      while (drops.length < cols) drops.push(0);

      for (let i = 0; i < cols; i++) {
        const char = CODE_CHARS[(Math.random() * CODE_CHARS.length) | 0];
        ctx.fillStyle = drops[i] < 2
          ? "#a7f3d0"
          : `rgba(74,222,128,${0.1 + Math.random() * 0.18})`;
        ctx.fillText(char, i * SIZE, drops[i] * SIZE);

        if (drops[i] * SIZE > canvas.height && Math.random() > 0.97) drops[i] = 0;
        drops[i] += 0.45;
      }
    };

    animId = requestAnimationFrame(draw);

    const onResize = () => { init(); };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.5 }}
    />
  );
});

/* ─────────────────────────────────────────────────────────────
   Pulse rings — CSS animation via framer, no JS per-frame cost
   ───────────────────────────────────────────────────────────── */
const RINGS = [
  { size: 150, opacity: 0.14, dur: 3.2, delay: 0   },
  { size: 240, opacity: 0.10, dur: 3.9, delay: 0.5 },
  { size: 330, opacity: 0.07, dur: 4.6, delay: 1.0 },
];

const PulseRings = memo(function PulseRings() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {RINGS.map((r, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border"
          style={{
            width:       r.size,
            height:      r.size,
            borderColor: `rgba(74,222,128,${r.opacity})`,
            willChange:  "transform, opacity",
          }}
          animate={{ scale: [1, 1.055, 1], opacity: [r.opacity * 4, r.opacity * 7, r.opacity * 4] }}
          transition={{ duration: r.dur, repeat: Infinity, delay: r.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
});

/* ─────────────────────────────────────────────────────────────
   Main export — memoised so parent re-renders don't cascade
   ───────────────────────────────────────────────────────────── */
export default memo(function FloatingShape() {
  return (
    <div className="relative w-full aspect-square max-w-[460px] mx-auto pointer-events-none">

      {/* Code rain */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <CodeRain />
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(5,13,7,0.88) 100%)" }}
      />

      {/* Rings + orbit tags */}
      <div className="absolute inset-0 flex items-center justify-center">
        <PulseRings />

        <div className="relative w-0 h-0">
          {ORBIT_ITEMS.map((item) => (
            <OrbitTag key={item.label} label={item.label} angle={item.angle} />
          ))}
        </div>

        {/* Centre badge */}
        <div className="absolute flex flex-col items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.035, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              willChange:  "transform",
              background:  "rgba(74,222,128,0.08)",
              borderColor: "rgba(74,222,128,0.28)",
              color:       "#4ade80",
              boxShadow:   "0 0 28px rgba(74,222,128,0.15), 0 0 56px rgba(74,222,128,0.05)",
              textShadow:  "0 0 18px rgba(74,222,128,0.55)",
            }}
            className="w-20 h-20 rounded-2xl flex items-center justify-center font-mono font-black text-2xl border"
          >
            VT
          </motion.div>
          <motion.p
            className="mt-2 text-[10px] font-mono tracking-widest"
            style={{ color: "rgba(74,222,128,0.45)" }}
            animate={{ opacity: [0.35, 0.8, 0.35] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            &lt;vikas.dev/&gt;
          </motion.p>
        </div>
      </div>
    </div>
  );
});
