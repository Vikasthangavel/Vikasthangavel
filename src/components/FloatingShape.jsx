import React, { useEffect, useRef, memo, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

/* ── Warm palette ──────────────────────────────── */
const TERRA   = "#c0624a";
const AMBER   = "#c9882c";
const SAGE    = "#6b8f6e";
const BLUE    = "#4a7fa8";

/* ── Three orbital rings with different skills ─── */
const RING_1 = {
  items:    ["Python", "React", "SQL"],
  radius:   88,
  duration: 18,
  tilt:     "rotateX(55deg)",
  color:    TERRA,
  glow:     "rgba(192,98,74,0.55)",
  bg:       "rgba(192,98,74,0.12)",
  border:   "rgba(192,98,74,0.35)",
};
const RING_2 = {
  items:    ["Flask", "Node.js", "AI/ML", "Supabase"],
  radius:   138,
  duration: 26,
  tilt:     "rotateX(55deg) rotateZ(30deg)",
  color:    AMBER,
  glow:     "rgba(201,136,44,0.5)",
  bg:       "rgba(201,136,44,0.10)",
  border:   "rgba(201,136,44,0.32)",
};
const RING_3 = {
  items:    ["Git", "Cloud", "Java", "LangChain"],
  radius:   188,
  duration: 36,
  tilt:     "rotateX(55deg) rotateZ(-20deg)",
  color:    SAGE,
  glow:     "rgba(107,143,110,0.45)",
  bg:       "rgba(107,143,110,0.09)",
  border:   "rgba(107,143,110,0.28)",
};
const ALL_RINGS = [RING_1, RING_2, RING_3];

/* ── Particle canvas — warm drifting dots ──────── */
const ParticleCanvas = memo(function ParticleCanvas({ disabled }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || disabled) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    let raf;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const COLORS = [
      "rgba(192,98,74,",
      "rgba(201,136,44,",
      "rgba(107,143,110,",
      "rgba(74,127,168,",
    ];

    const count = 38;
    const pts = Array.from({ length: count }, () => ({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      r:     0.6 + Math.random() * 1.8,
      vx:    (Math.random() - 0.5) * 0.25,
      vy:    (Math.random() - 0.5) * 0.25,
      alpha: 0.15 + Math.random() * 0.35,
      color: COLORS[(Math.random() * COLORS.length) | 0],
    }));

    const draw = () => {
      raf = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pts.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width)  p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ")";
        ctx.fill();
      });

      /* Draw faint connection lines between nearby particles */
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 68) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(192,98,74,${0.06 * (1 - d / 68)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    draw();
    window.addEventListener("resize", resize, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [disabled]);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: disabled ? 0.1 : 1 }}
    />
  );
});

/* ── Single orbiting pill ──────────────────────── */
const OrbitPill = memo(function OrbitPill({ label, angle, ring, totalItems, disabled }) {
  const rad   = (angle * Math.PI) / 180;
  const x     = Math.cos(rad) * ring.radius;
  const y     = Math.sin(rad) * ring.radius;
  const delay = (angle / 360) * ring.duration;

  if (disabled) {
    return (
      <div
        className="absolute"
        style={{
          left: "50%", top: "50%",
          transform: `translate(${x - 30}px, ${y - 11}px)`,
        }}
      >
        <span
          className="text-[10px] px-2.5 py-0.5 rounded-full border whitespace-nowrap font-medium block"
          style={{ background: ring.bg, borderColor: ring.border, color: ring.color }}
        >
          {label}
        </span>
      </div>
    );
  }

  return (
    <motion.div
      className="absolute"
      style={{
        left: "50%", top: "50%",
        willChange: "transform",
      }}
      animate={{ rotate: 360 }}
      transition={{
        duration: ring.duration,
        repeat: Infinity,
        ease: "linear",
        delay: -delay,
      }}
    >
      {/* counter-rotate so text stays upright */}
      <motion.div
        style={{ x: x - 30, y: y - 11, willChange: "transform" }}
        animate={{ rotate: -360 }}
        transition={{
          duration: ring.duration,
          repeat: Infinity,
          ease: "linear",
          delay: -delay,
        }}
      >
        <motion.span
          whileHover={{ scale: 1.15 }}
          animate={{
            boxShadow: [
              `0 0 6px ${ring.glow}`,
              `0 0 14px ${ring.glow}`,
              `0 0 6px ${ring.glow}`,
            ],
          }}
          transition={{
            boxShadow: {
              duration: 2.5 + Math.random(),
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="text-[10px] px-2.5 py-0.5 rounded-full border whitespace-nowrap font-semibold block cursor-default"
          style={{
            background:   ring.bg,
            borderColor:  ring.border,
            color:        ring.color,
          }}
        >
          {label}
        </motion.span>
      </motion.div>
    </motion.div>
  );
});

/* ── Orbital ring track (the visible circle) ───── */
function RingTrack({ ring, disabled }) {
  const size = ring.radius * 2 + 4;
  return (
    <motion.div
      className="absolute rounded-full border"
      style={{
        width:       size,
        height:      size,
        borderColor: `rgba(${ring.color === TERRA
          ? "192,98,74"
          : ring.color === AMBER
          ? "201,136,44"
          : "107,143,110"},0.14)`,
        borderStyle: "dashed",
      }}
      animate={disabled ? {} : { rotate: 360 }}
      transition={{ duration: ring.duration * 1.8, repeat: Infinity, ease: "linear" }}
    />
  );
}

/* ── Morphing blob glow at center ─────────────── */
function CenterBlob({ disabled }) {
  return (
    <motion.div
      className="absolute"
      style={{
        width:  200,
        height: 200,
        background: `radial-gradient(ellipse at 40% 40%,
          rgba(192,98,74,0.18) 0%,
          rgba(201,136,44,0.12) 40%,
          transparent 70%)`,
        filter: "blur(28px)",
      }}
      animate={disabled ? {} : {
        borderRadius: [
          "60% 40% 30% 70% / 60% 30% 70% 40%",
          "30% 60% 70% 40% / 50% 60% 30% 60%",
          "50% 50% 20% 80% / 25% 80% 40% 50%",
          "60% 40% 30% 70% / 60% 30% 70% 40%",
        ],
        scale: [1, 1.08, 0.96, 1],
      }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

/* ── Main export ───────────────────────────────── */
export default memo(function FloatingShape() {
  const shouldReduceMotion = useReducedMotion();
  const isMobile = typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;
  const disabled = shouldReduceMotion || isMobile;

  return (
    <div className="relative w-full aspect-square max-w-[480px] mx-auto select-none pointer-events-none">

      {/* ── Particle field background ── */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden">
        <ParticleCanvas disabled={disabled} />
      </div>

      {/* ── Soft radial vignette ── */}
      <div
        className="absolute inset-0 rounded-3xl"
        style={{
          background: "radial-gradient(ellipse at center, transparent 25%, rgba(250,248,245,0.92) 80%)",
        }}
      />

      {/* ── Orbital system ── */}
      <div className="absolute inset-0 flex items-center justify-center">

        {/* Morphing blob */}
        <CenterBlob disabled={disabled} />

        {/* Ring tracks + pills */}
        {ALL_RINGS.map((ring, ri) => (
          <React.Fragment key={ri}>
            {/* Dashed track ring */}
            <div className="absolute flex items-center justify-center">
              <RingTrack ring={ring} disabled={disabled} />
            </div>

            {/* Pills */}
            <div className="relative w-0 h-0">
              {ring.items.map((label, i) => (
                <OrbitPill
                  key={label}
                  label={label}
                  angle={(360 / ring.items.length) * i}
                  ring={ring}
                  totalItems={ring.items.length}
                  disabled={disabled}
                />
              ))}
            </div>
          </React.Fragment>
        ))}

        {/* ── Centre badge ── */}
        <div className="absolute flex flex-col items-center justify-center z-10">
          {/* Outer glow ring */}
          <motion.div
            className="absolute rounded-2xl"
            style={{
              width: 108, height: 108,
              background: `conic-gradient(from 0deg, ${TERRA}, ${AMBER}, ${SAGE}, ${BLUE}, ${TERRA})`,
              filter: "blur(3px)",
            }}
            animate={disabled ? {} : { rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />

          {/* Inner badge */}
          <motion.div
            animate={disabled ? {} : {
              scale: [1, 1.04, 1],
              boxShadow: [
                `0 0 20px rgba(192,98,74,0.22), 0 0 50px rgba(192,98,74,0.08)`,
                `0 0 32px rgba(192,98,74,0.35), 0 0 70px rgba(192,98,74,0.14)`,
                `0 0 20px rgba(192,98,74,0.22), 0 0 50px rgba(192,98,74,0.08)`,
              ],
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-24 h-24 rounded-2xl flex flex-col items-center justify-center"
            style={{
              background: "white",
              border: "2px solid rgba(192,98,74,0.2)",
            }}
          >
            <span
              className="font-black text-2xl tracking-tight leading-none"
              style={{
                fontFamily: "'Playfair Display', serif",
                background: `linear-gradient(135deg, ${TERRA}, ${AMBER})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              VT
            </span>
            <span className="text-[8px] font-medium tracking-widest mt-0.5" style={{ color: "rgba(192,98,74,0.5)" }}>
              PORTFOLIO
            </span>
          </motion.div>

          {/* Floating badge below center */}
          <motion.div
            animate={disabled ? {} : { y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="mt-3 px-3 py-1 rounded-full text-[9px] font-semibold tracking-wider border"
            style={{
              background:  "rgba(192,98,74,0.07)",
              borderColor: "rgba(192,98,74,0.2)",
              color:       TERRA,
            }}
          >
            Full-Stack · AI · Cloud
          </motion.div>
        </div>
      </div>

      {/* ── Corner sparkles ── */}
      {!disabled && [
        { top: "12%", left: "10%",  size: 5,  color: TERRA, delay: 0    },
        { top: "18%", right: "12%", size: 4,  color: AMBER, delay: 0.8  },
        { top: "72%", left: "8%",  size: 3.5, color: SAGE,  delay: 1.6  },
        { top: "78%", right: "9%", size: 4.5, color: BLUE,  delay: 0.4  },
        { top: "45%", left: "5%",  size: 3,   color: AMBER, delay: 2.2  },
        { top: "35%", right: "6%", size: 3.5, color: TERRA, delay: 1.2  },
      ].map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width:      s.size,
            height:     s.size,
            top:        s.top,
            left:       s.left,
            right:      s.right,
            background: s.color,
            boxShadow:  `0 0 6px ${s.color}`,
          }}
          animate={{
            scale:   [0, 1.4, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 2.2,
            repeat:   Infinity,
            delay:    s.delay,
            ease:     "easeInOut",
          }}
        />
      ))}
    </div>
  );
});
