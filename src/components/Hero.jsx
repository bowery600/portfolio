import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import SplineScene from "./SplineScene";

const ease = [0.22, 1, 0.36, 1];

const ROTATING = [
  "Investing",
  "XR UI Design",
  "Surgical Robotics",
  "Venture Research",
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const rise = {
  hidden: { y: 24, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.7, ease } },
};

export default function Hero() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % ROTATING.length), 2400);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-white pt-28 dark:bg-[#0E0E10] lg:pt-32"
    >
      <GridBackdrop reduce={reduce} />
      <SplineScene />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 lg:px-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center"
        >
          {/* Eyebrow */}
          <motion.p
            variants={rise}
            className="mb-10 text-[11px] font-medium uppercase tracking-[0.32em] text-[#475569] dark:text-white/45 sm:text-xs"
          >
            Mechanical Engineer &amp; Investor
          </motion.p>

          {/* Name */}
          <motion.h1
            variants={rise}
            className="font-serif text-[18vw] font-semibold uppercase leading-[0.92] tracking-[-0.02em] text-[#1C1C1C] dark:text-white sm:text-[16vw] md:text-[14vw] lg:text-[clamp(7rem,13vw,13rem)]"
          >
            Ethan Hood
          </motion.h1>

          {/* Sub-line with rotating gold phrase */}
          <motion.div
            variants={rise}
            className="mt-10 flex max-w-full flex-col items-center gap-y-2 text-lg text-[#475569] dark:text-white/65 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-4 sm:text-xl md:text-2xl"
          >
            <span className="font-light">Mechanical Engineering &amp; Business</span>
            <span aria-hidden className="hidden text-black/20 dark:text-white/20 sm:inline">|</span>
            <RotatingPhrase index={i} reduce={reduce} />
          </motion.div>

          {/* CTA */}
          <motion.div variants={rise} className="mt-14">
            <a
              href="mailto:ethan.hood@vanderbilt.edu"
              className="group inline-flex items-center justify-center rounded-md bg-[#CFAE70] px-10 py-3.5 text-sm font-semibold uppercase tracking-[0.22em] text-[#1C1C1C] shadow-[0_10px_30px_-12px_rgba(207,174,112,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#D9BC85] hover:shadow-[0_18px_40px_-14px_rgba(207,174,112,0.6)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CFAE70] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0E0E10]"
            >
              Get in Touch
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function RotatingPhrase({ index, reduce }) {
  return (
    <span className="relative inline-grid items-center">
      <span
        aria-hidden
        className="invisible col-start-1 row-start-1 whitespace-nowrap font-medium"
      >
        {ROTATING.reduce((a, b) => (b.length > a.length ? b : a), "")}
      </span>

      <span
        className="col-start-1 row-start-1 flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={ROTATING[index]}
            initial={reduce ? { opacity: 0 } : { y: "60%", opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { y: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { y: "-60%", opacity: 0 }}
            transition={{ duration: 0.55, ease }}
            className="whitespace-nowrap font-medium text-[#8a6f3a] dark:text-[#CFAE70]"
          >
            {ROTATING[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}

function GridBackdrop({ reduce }) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Light grid */}
      <div
        className="absolute inset-0 opacity-[0.55] dark:hidden"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(28,28,28,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(28,28,28,0.05) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.95) 35%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.95) 35%, transparent 80%)",
        }}
      />
      {/* Dark grid */}
      <div
        className="absolute inset-0 hidden opacity-[0.55] dark:block"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.95) 35%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.95) 35%, transparent 80%)",
        }}
      />

      {/* Top vignette */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/60 to-transparent dark:from-black/40" />
      {/* Bottom vignette */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white/80 to-transparent dark:from-black/60" />

      {/* Drifting gold glow */}
      <motion.div
        aria-hidden
        animate={reduce ? {} : { x: [0, 40, -20, 0], y: [0, -25, 15, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(207,174,112,0.18),transparent_60%)] blur-2xl dark:bg-[radial-gradient(circle_at_center,rgba(207,174,112,0.10),transparent_60%)]"
      />

      {/* Faint corner accent dots */}
      <div className="absolute left-6 top-6 h-1.5 w-1.5 rounded-full bg-black/20 dark:bg-white/30" />
      <div className="absolute right-6 bottom-6 h-1 w-1 rounded-full bg-[#CFAE70]/60 dark:bg-[#CFAE70]/50" />
    </div>
  );
}
