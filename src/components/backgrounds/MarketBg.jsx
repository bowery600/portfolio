import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

const VIEW_W = 1440;
const VIEW_H = 900;

// Ascending area chart points (slight noise but generally up-and-right)
const POINTS = [
  [0, 720],
  [80, 700],
  [160, 660],
  [240, 670],
  [320, 620],
  [400, 600],
  [480, 555],
  [560, 575],
  [640, 510],
  [720, 480],
  [800, 440],
  [880, 460],
  [960, 400],
  [1040, 360],
  [1120, 320],
  [1200, 290],
  [1280, 240],
  [1360, 220],
  [1440, 180],
];

const linePath = POINTS.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`).join(" ");
const areaPath = `${linePath} L ${VIEW_W} ${VIEW_H} L 0 ${VIEW_H} Z`;

// Sparse candlesticks on the right side
const CANDLES = [
  { x: 1080, low: 320, high: 250, open: 305, close: 270, up: true },
  { x: 1140, low: 290, high: 230, open: 275, close: 245, up: true },
  { x: 1200, low: 270, high: 210, open: 250, close: 225, up: true },
  { x: 1260, low: 240, high: 180, open: 230, close: 195, up: true },
  { x: 1320, low: 220, high: 160, open: 200, close: 175, up: true },
  { x: 1380, low: 200, high: 140, open: 185, close: 155, up: true },
];

// Faint horizontal gridlines
const HLINES = [220, 360, 500, 640];

export default function MarketBg() {
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
          <linearGradient id="mb-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#CFAE70" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#CFAE70" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="mb-fade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fff" stopOpacity="0" />
            <stop offset="20%" stopColor="#fff" stopOpacity="0.7" />
            <stop offset="80%" stopColor="#fff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id="mb-fade-mask">
            <rect width={VIEW_W} height={VIEW_H} fill="url(#mb-fade)" />
          </mask>
        </defs>

        <g mask="url(#mb-fade-mask)">
          {/* Horizontal gridlines */}
          <g
            className="text-[#1C1C1C] dark:text-white"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeOpacity="0.07"
            strokeDasharray="4 6"
          >
            {HLINES.map((y, i) => (
              <motion.line
                key={`hl-${y}`}
                x1={0}
                y1={y}
                x2={VIEW_W}
                y2={y}
                initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{
                  duration: reduce ? 0 : 0.7,
                  ease,
                  delay: reduce ? 0 : 0.1 * i,
                }}
              />
            ))}
          </g>

          {/* Area fill */}
          <motion.path
            d={areaPath}
            fill="url(#mb-area)"
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: reduce ? 0 : 0.9, ease, delay: reduce ? 0 : 0.5 }}
          />

          {/* Trend line */}
          <motion.path
            d={linePath}
            stroke="#CFAE70"
            strokeOpacity="0.55"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: reduce ? 0 : 1.5, ease, delay: reduce ? 0 : 0.3 }}
          />

          {/* Data points (subtle) */}
          {POINTS.filter((_, i) => i % 3 === 0).map(([x, y], i) => (
            <motion.circle
              key={`pt-${x}`}
              cx={x}
              cy={y}
              r="2.5"
              fill="#CFAE70"
              fillOpacity="0.7"
              initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              whileInView={{ opacity: 0.7, scale: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: reduce ? 0 : 0.35,
                ease,
                delay: reduce ? 0 : 1.2 + i * 0.08,
              }}
              style={{ transformOrigin: `${x}px ${y}px` }}
            />
          ))}

          {/* Candlesticks */}
          <g>
            {CANDLES.map((c, i) => {
              const bodyTop = Math.min(c.open, c.close);
              const bodyHeight = Math.abs(c.close - c.open);
              return (
                <motion.g
                  key={`c-${c.x}`}
                  initial={reduce ? { opacity: 0.5, y: 0 } : { opacity: 0, y: 8 }}
                  whileInView={{ opacity: 0.5, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{
                    duration: reduce ? 0 : 0.45,
                    ease,
                    delay: reduce ? 0 : 1.6 + i * 0.07,
                  }}
                >
                  {/* wick */}
                  <line
                    x1={c.x}
                    y1={c.high}
                    x2={c.x}
                    y2={c.low}
                    stroke="#CFAE70"
                    strokeOpacity="0.55"
                    strokeWidth="1"
                  />
                  {/* body */}
                  <rect
                    x={c.x - 8}
                    y={bodyTop}
                    width="16"
                    height={Math.max(bodyHeight, 2)}
                    fill="#CFAE70"
                    fillOpacity="0.35"
                    stroke="#CFAE70"
                    strokeOpacity="0.65"
                    strokeWidth="1"
                  />
                </motion.g>
              );
            })}
          </g>
        </g>
      </svg>
    </div>
  );
}
