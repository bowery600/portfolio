import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Linkedin, Mail } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};
const rise = {
  hidden: { y: 24, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.7, ease } },
};

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-gradient-to-b from-white via-white to-[#FAFAFA] pt-28 lg:pt-32"
    >
      {/* Animated background */}
      <DataLattice reduce={reduce} />

      {/* Vignette / fade edges */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(255,255,255,0.85)_100%)]" />

      <div className="mx-auto w-full max-w-5xl px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center"
        >
          {/* Eyebrow */}
          <motion.div
            variants={rise}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/70 px-3.5 py-1.5 text-xs font-medium tracking-wide text-[#3F4C5F] backdrop-blur"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full bg-[#CFAE70] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#CFAE70]" />
            </span>
            Vanderbilt · ME + Business
          </motion.div>

          {/* Greeting */}
          <motion.p
            variants={rise}
            className="mb-5 text-sm font-medium uppercase tracking-[0.18em] text-[#475569]"
          >
            Hi, I&apos;m Ethan Hood.
          </motion.p>

          {/* Headline */}
          <motion.h1
            variants={rise}
            className="font-serif text-5xl font-semibold leading-[1.02] tracking-tight text-[#1C1C1C] sm:text-6xl md:text-7xl lg:text-[88px]"
          >
            Mechanical Engineering{" "}
            <span className="relative inline-block italic text-[#1C1C1C]">
              &amp;
              <span className="absolute -inset-x-1 bottom-1 -z-10 h-3 bg-[#CFAE70]/35 sm:h-4" />
            </span>{" "}
            Business.
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={rise}
            className="mt-7 max-w-2xl text-balance text-base leading-relaxed text-[#475569] sm:text-lg"
          >
            Building at the intersection of{" "}
            <span className="text-[#1C1C1C]">surgical robotics</span>,{" "}
            <span className="text-[#1C1C1C]">XR UI design</span>, and{" "}
            <span className="text-[#1C1C1C]">venture research</span>.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={rise}
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
          >
            <a
              href="mailto:ethan.hood@vanderbilt.edu"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#1C1C1C] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.08),0_10px_30px_-12px_rgba(28,28,28,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-black hover:shadow-[0_1px_2px_rgba(0,0,0,0.08),0_18px_40px_-14px_rgba(28,28,28,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CFAE70] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              <Mail className="h-4 w-4" strokeWidth={2.25} />
              Get in Touch
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.25} />
            </a>
            <a
              href="https://www.linkedin.com/in/ethanhood9"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-black/[0.12] bg-white/70 px-6 py-3.5 text-sm font-semibold text-[#1C1C1C] backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-[#CFAE70] hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CFAE70] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              <Linkedin className="h-4 w-4" strokeWidth={2.25} />
              View LinkedIn
              <ArrowUpRight className="h-4 w-4 opacity-60 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" strokeWidth={2.25} />
            </a>
          </motion.div>

          {/* Meta strip */}
          <motion.div
            variants={rise}
            className="mt-16 grid w-full max-w-3xl grid-cols-1 divide-y divide-black/[0.08] rounded-2xl border border-black/[0.06] bg-white/60 backdrop-blur-md sm:grid-cols-3 sm:divide-x sm:divide-y-0"
          >
            {[
              { k: "Focus", v: "Surgical Robotics" },
              { k: "Design", v: "XR Interfaces" },
              { k: "Research", v: "Venture Capital" },
            ].map((s) => (
              <div key={s.k} className="px-4 py-5 text-left sm:px-6">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#334155]">
                  {s.k}
                </div>
                <div className="mt-1 text-sm font-medium text-[#1C1C1C] sm:text-base">
                  {s.v}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-[11px] font-medium uppercase tracking-[0.24em] text-[#334155]"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <motion.span
          animate={reduce ? {} : { y: [0, 4, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block"
        >
          Scroll
        </motion.span>
      </motion.div>
    </section>
  );
}

/* ---------- Background: drifting data lattice + orbits ---------- */

function DataLattice({ reduce }) {
  const nodes = [
    { cx: 12, cy: 22 },
    { cx: 28, cy: 14 },
    { cx: 44, cy: 30 },
    { cx: 62, cy: 18 },
    { cx: 78, cy: 32 },
    { cx: 88, cy: 60 },
    { cx: 70, cy: 72 },
    { cx: 50, cy: 64 },
    { cx: 30, cy: 78 },
    { cx: 14, cy: 58 },
    { cx: 36, cy: 46 },
    { cx: 58, cy: 48 },
  ];
  const edges = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7],
    [7, 8], [8, 9], [9, 0], [10, 2], [10, 7], [11, 3], [11, 6], [10, 11],
  ];

  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(28,28,28,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(28,28,28,0.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.9) 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.9) 30%, transparent 75%)",
        }}
      />

      {/* Drifting orbs */}
      <motion.div
        aria-hidden
        animate={
          reduce
            ? {}
            : { x: [0, 30, -10, 0], y: [0, -20, 10, 0] }
        }
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-32 top-1/4 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(207,174,112,0.22),transparent_60%)] blur-2xl"
      />
      <motion.div
        aria-hidden
        animate={
          reduce
            ? {}
            : { x: [0, -25, 15, 0], y: [0, 18, -12, 0] }
        }
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-32 bottom-0 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle_at_center,rgba(28,28,28,0.10),transparent_60%)] blur-2xl"
      />

      {/* Lattice SVG */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full opacity-70"
      >
        <defs>
          <radialGradient id="nodeGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#CFAE70" stopOpacity="1" />
            <stop offset="100%" stopColor="#CFAE70" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="edgeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1C1C1C" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#CFAE70" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        {/* Edges */}
        {edges.map(([a, b], i) => {
          const A = nodes[a];
          const B = nodes[b];
          return (
            <motion.line
              key={`e-${i}`}
              x1={A.cx}
              y1={A.cy}
              x2={B.cx}
              y2={B.cy}
              stroke="url(#edgeGrad)"
              strokeWidth="0.12"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 1.6,
                delay: 0.2 + i * 0.06,
                ease,
              }}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((n, i) => (
          <g key={`n-${i}`}>
            <motion.circle
              cx={n.cx}
              cy={n.cy}
              r="0.9"
              fill="url(#nodeGrad)"
              initial={{ scale: 0, opacity: 0 }}
              animate={
                reduce
                  ? { scale: 1, opacity: 1 }
                  : {
                      scale: [0.9, 1.25, 0.9],
                      opacity: [0.7, 1, 0.7],
                    }
              }
              transition={{
                duration: 4 + (i % 5),
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.15,
              }}
              style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
            />
            <circle cx={n.cx} cy={n.cy} r="0.35" fill="#1C1C1C" />
          </g>
        ))}

        {/* Orbiting traveler */}
        {!reduce && (
          <motion.circle
            r="0.6"
            fill="#CFAE70"
            initial={false}
            animate={{
              cx: nodes.map((n) => n.cx),
              cy: nodes.map((n) => n.cy),
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}
      </svg>
    </div>
  );
}
