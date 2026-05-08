import { lazy, Suspense, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const Spline = lazy(() => import("@splinetool/react-spline"));

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
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[#0E0E10] pt-28 lg:pt-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[5] overflow-hidden"
      >
        <Suspense fallback={null}>
          <Spline
            scene="/scene-clean.splinecode"
            style={{
              width: "100%",
              height: "100%",
              transform: "translateY(8%) scale(1.6)",
              transformOrigin: "center center",
            }}
          />
        </Suspense>
      </div>

      {/* Readability scrim — guarantees text contrast over the 3D scene */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[2] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.25)_45%,transparent_75%)]"
      />

      <div className="pointer-events-none relative z-10 mx-auto w-full max-w-[1400px] px-6 lg:px-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center"
        >
          <motion.h1
            variants={rise}
            className="font-serif text-5xl font-medium tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Ethan Hood
          </motion.h1>

          <motion.p
            variants={rise}
            className="mt-5 text-base font-medium uppercase tracking-[0.28em] text-white/75 sm:text-lg"
          >
            Mechanical Engineering &amp; Business
          </motion.p>

          <motion.div
            variants={rise}
            className="pointer-events-auto mt-14 flex flex-col items-center gap-4 sm:flex-row sm:gap-5"
          >
            <a
              href="mailto:ethan.hood@vanderbilt.edu"
              className="group inline-flex items-center justify-center rounded-md bg-[#CFAE70] px-10 py-3.5 text-sm font-semibold uppercase tracking-[0.22em] text-[#1C1C1C] transition-colors duration-200 hover:bg-[#D9BC85] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CFAE70] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E0E10]"
            >
              Get in Touch
            </a>
            <div className="flex items-center gap-3 text-base text-white/85 sm:text-lg md:text-xl">
              <RotatingPhrase index={i} reduce={reduce} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

const wordVariants = {
  hidden: { transition: { staggerChildren: 0.022, staggerDirection: -1 } },
  show: {
    transition: { staggerChildren: 0.032, delayChildren: 0.04 },
  },
};

const charVariants = {
  hidden: {
    y: "0.7em",
    opacity: 0,
    filter: "blur(8px)",
    transition: { duration: 0.32, ease },
  },
  show: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease },
  },
};

function RotatingPhrase({ index, reduce }) {
  const word = ROTATING[index];
  const longest = ROTATING.reduce((a, b) => (b.length > a.length ? b : a), "");

  return (
    <span className="relative inline-grid items-center">
      <span
        aria-hidden
        className="invisible col-start-1 row-start-1 whitespace-nowrap font-medium"
      >
        {longest}
      </span>

      <span
        className="col-start-1 row-start-1 flex items-center justify-center overflow-hidden py-[0.15em]"
        aria-live="polite"
        aria-atomic="true"
      >
        <AnimatePresence mode="wait" initial={false}>
          {reduce ? (
            <motion.span
              key={word}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="whitespace-nowrap font-medium text-[#E6C892]"
            >
              {word}
            </motion.span>
          ) : (
            <motion.span
              key={word}
              variants={wordVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="inline-flex whitespace-nowrap font-medium text-[#E6C892]"
              aria-label={word}
            >
              {word.split("").map((ch, idx) => (
                <motion.span
                  key={`${ch}-${idx}`}
                  variants={charVariants}
                  className="inline-block will-change-transform"
                  aria-hidden
                >
                  {ch === " " ? " " : ch}
                </motion.span>
              ))}
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </span>
  );
}
