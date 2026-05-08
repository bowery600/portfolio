import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

const VIEW_W = 1440;
const VIEW_H = 900;
const MAJOR = 96;
const MINOR = 24;

export default function BlueprintBg() {
  const reduce = useReducedMotion();

  const minorVerticals = [];
  for (let x = 0; x <= VIEW_W; x += MINOR) minorVerticals.push(x);
  const minorHorizontals = [];
  for (let y = 0; y <= VIEW_H; y += MINOR) minorHorizontals.push(y);

  const majorVerticals = [];
  for (let x = 0; x <= VIEW_W; x += MAJOR) majorVerticals.push(x);
  const majorHorizontals = [];
  for (let y = 0; y <= VIEW_H; y += MAJOR) majorHorizontals.push(y);

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
          <radialGradient id="bp-mask" cx="50%" cy="55%" r="65%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="70%" stopColor="#fff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="bp-fade">
            <rect width={VIEW_W} height={VIEW_H} fill="url(#bp-mask)" />
          </mask>
          <linearGradient id="bp-iso-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#CFAE70" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#CFAE70" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        <g mask="url(#bp-fade)">
          {/* Minor grid (very faint) */}
          <g
            className="text-[#1C1C1C] dark:text-white"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeOpacity="0.06"
          >
            {minorVerticals.map((x) => (
              <line key={`mv-${x}`} x1={x} y1={0} x2={x} y2={VIEW_H} />
            ))}
            {minorHorizontals.map((y) => (
              <line key={`mh-${y}`} x1={0} y1={y} x2={VIEW_W} y2={y} />
            ))}
          </g>

          {/* Major grid */}
          <g
            className="text-[#1C1C1C] dark:text-white"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeOpacity="0.11"
          >
            {majorVerticals.map((x, i) => (
              <motion.line
                key={`MV-${x}`}
                x1={x}
                y1={0}
                x2={x}
                y2={VIEW_H}
                initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{
                  duration: reduce ? 0 : 0.9,
                  ease,
                  delay: reduce ? 0 : 0.04 * i,
                }}
              />
            ))}
            {majorHorizontals.map((y, i) => (
              <motion.line
                key={`MH-${y}`}
                x1={0}
                y1={y}
                x2={VIEW_W}
                y2={y}
                initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{
                  duration: reduce ? 0 : 0.9,
                  ease,
                  delay: reduce ? 0 : 0.18 + 0.05 * i,
                }}
              />
            ))}
          </g>

          {/* Corner dimension ticks (top-left bracket) */}
          <g
            stroke="#CFAE70"
            strokeWidth="1.25"
            strokeOpacity="0.55"
            fill="none"
          >
            <motion.path
              d={`M 56 96 L 56 56 L 144 56`}
              initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease, delay: 0.6 }}
            />
            <motion.path
              d={`M 56 60 L 56 52 M 60 56 L 52 56 M 140 60 L 140 52 M 144 60 L 144 52`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.4, ease, delay: 0.95 }}
            />
          </g>

          {/* Isometric solid (right side) */}
          <g transform={`translate(${VIEW_W - 360} ${VIEW_H * 0.32})`}>
            <motion.g
              stroke="url(#bp-iso-stroke)"
              strokeWidth="1.25"
              fill="none"
              initial={reduce ? { opacity: 1 } : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.9, ease, delay: 0.7 }}
            >
              {/* top face */}
              <motion.path
                d="M 0 60 L 120 0 L 240 60 L 120 120 Z"
                initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.8, ease, delay: 0.75 }}
              />
              {/* left face */}
              <motion.path
                d="M 0 60 L 0 180 L 120 240 L 120 120"
                initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.8, ease, delay: 0.95 }}
              />
              {/* right face */}
              <motion.path
                d="M 240 60 L 240 180 L 120 240 L 120 120"
                initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.8, ease, delay: 1.1 }}
              />
            </motion.g>

            {/* Dimension label */}
            <motion.g
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.55 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.4, ease, delay: 1.4 }}
            >
              <text
                x="120"
                y="276"
                textAnchor="middle"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                fontSize="11"
                letterSpacing="2"
                fill="#CFAE70"
              >
                240 × 180 MM
              </text>
            </motion.g>
          </g>
        </g>
      </svg>
    </div>
  );
}
