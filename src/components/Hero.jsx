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
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-white pt-28 lg:pt-32"
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

      <div className="pointer-events-none relative z-10 mx-auto w-full max-w-[1400px] px-6 lg:px-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center"
        >
          <motion.h1
            variants={rise}
            className="font-serif text-5xl font-medium tracking-tight text-[#1C1C1C] sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Ethan Hood
          </motion.h1>

          <motion.p
            variants={rise}
            className="mt-5 text-base font-medium uppercase tracking-[0.28em] text-[#475569] sm:text-lg"
          >
            Mechanical Engineering &amp; Business
          </motion.p>

          <motion.div
            variants={rise}
            className="pointer-events-auto mt-14 flex flex-col items-center gap-4 sm:flex-row sm:gap-5"
          >
            <a
              href="mailto:ethan.hood@vanderbilt.edu"
              className="group inline-flex items-center justify-center rounded-md bg-[#CFAE70] px-10 py-3.5 text-sm font-semibold uppercase tracking-[0.22em] text-[#1C1C1C] transition-colors duration-200 hover:bg-[#D9BC85] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CFAE70] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              Get in Touch
            </a>
            <div className="flex items-center gap-3 text-base text-[#475569] sm:text-lg md:text-xl">
              <RotatingPhrase index={i} reduce={reduce} />
            </div>
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
        aria-live="polite"
        aria-atomic="true"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={ROTATING[index]}
            initial={reduce ? { opacity: 0 } : { y: "60%", opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { y: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { y: "-60%", opacity: 0 }}
            transition={{ duration: 0.55, ease }}
            className="whitespace-nowrap font-medium text-[#8a6f3a]"
          >
            {ROTATING[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
