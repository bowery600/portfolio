import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

const VIEW_W = 1440;
const VIEW_H = 900;

const TRACES = [
  { d: "M -20 200 L 280 200 L 320 240 L 600 240 L 640 200 L 920 200 L 960 240 L 1460 240" },
  { d: "M -20 360 L 200 360 L 240 400 L 480 400 L 520 360 L 760 360 L 800 400 L 1100 400 L 1140 440 L 1460 440" },
  { d: "M -20 560 L 320 560 L 360 600 L 700 600 L 740 560 L 1100 560 L 1140 520 L 1460 520" },
  { d: "M -20 720 L 240 720 L 280 760 L 560 760 L 600 720 L 880 720 L 920 760 L 1460 760" },
  { d: "M 200 -20 L 200 160 L 240 200" },
  { d: "M 1080 -20 L 1080 160 L 1120 200" },
  { d: "M 480 920 L 480 760" },
  { d: "M 1300 920 L 1300 760" },
];

const NODES = [
  { cx: 280, cy: 200 },
  { cx: 640, cy: 200 },
  { cx: 960, cy: 240 },
  { cx: 480, cy: 400 },
  { cx: 800, cy: 400 },
  { cx: 1140, cy: 440 },
  { cx: 360, cy: 600 },
  { cx: 740, cy: 560 },
  { cx: 1140, cy: 520 },
  { cx: 600, cy: 720 },
  { cx: 920, cy: 760 },
];

const PULSES = [
  { traceIndex: 0, duration: 5.5, delay: 0 },
  { traceIndex: 1, duration: 6.4, delay: 1.4 },
  { traceIndex: 2, duration: 5.0, delay: 2.6 },
  { traceIndex: 3, duration: 6.8, delay: 3.8 },
];

export default function CircuitBg() {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        <defs>
          <radialGradient id="cb-mask" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="65%" stopColor="#fff" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="cb-fade">
            <rect width={VIEW_W} height={VIEW_H} fill="url(#cb-mask)" />
          </mask>
          <radialGradient id="cb-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#CFAE70" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#CFAE70" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Faint gold ambient bloom */}
        <ellipse
          cx={VIEW_W * 0.18}
          cy={VIEW_H * 0.62}
          rx={520}
          ry={320}
          fill="url(#cb-glow)"
          opacity="0.22"
        />
        <ellipse
          cx={VIEW_W * 0.82}
          cy={VIEW_H * 0.32}
          rx={420}
          ry={280}
          fill="url(#cb-glow)"
          opacity="0.16"
        />

        <g mask="url(#cb-fade)">
          {/* Traces */}
          <g
            className="text-[#1C1C1C] dark:text-white"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.16"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {TRACES.map((t, i) => (
              <motion.path
                key={`t-${i}`}
                d={t.d}
                initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{
                  duration: reduce ? 0 : 1.1,
                  ease,
                  delay: reduce ? 0 : i * 0.08,
                }}
              />
            ))}
          </g>

          {/* Gold trace overlay (highlight a few key paths) */}
          <g
            stroke="#CFAE70"
            strokeWidth="1.25"
            strokeOpacity="0.45"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {[TRACES[0], TRACES[2]].map((t, i) => (
              <motion.path
                key={`gt-${i}`}
                d={t.d}
                initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{
                  duration: reduce ? 0 : 1.4,
                  ease,
                  delay: reduce ? 0 : 0.5 + i * 0.2,
                }}
              />
            ))}
          </g>

          {/* Junction nodes */}
          {NODES.map((n, i) => (
            <motion.g
              key={`n-${i}`}
              initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: reduce ? 0 : 0.4,
                ease,
                delay: reduce ? 0 : 0.9 + i * 0.05,
              }}
              style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
            >
              <circle
                cx={n.cx}
                cy={n.cy}
                r="3.5"
                fill="#CFAE70"
                fillOpacity="0.55"
              />
              <circle
                cx={n.cx}
                cy={n.cy}
                r="1.5"
                fill="#CFAE70"
                fillOpacity="1"
              />
            </motion.g>
          ))}

          {/* Pulse dots */}
          {!reduce &&
            PULSES.map((p, i) => (
              <motion.circle
                key={`p-${i}`}
                r="3"
                fill="#CFAE70"
                initial={{ opacity: 0, offsetDistance: "0%" }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  offsetDistance: ["0%", "100%"],
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: "linear",
                  times: [0, 0.05, 0.95, 1],
                }}
                style={{
                  offsetPath: `path('${TRACES[p.traceIndex].d}')`,
                  filter: "drop-shadow(0 0 4px rgba(207,174,112,0.7))",
                }}
              />
            ))}
        </g>
      </svg>
    </div>
  );
}
