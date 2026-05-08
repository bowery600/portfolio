import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

const VIEW_W = 1440;
const VIEW_H = 900;

const NODES = [
  { id: 0, x: 180, y: 180, r: 6, hub: false },
  { id: 1, x: 380, y: 280, r: 9, hub: true },
  { id: 2, x: 620, y: 160, r: 6, hub: false },
  { id: 3, x: 820, y: 320, r: 11, hub: true },
  { id: 4, x: 1080, y: 200, r: 6, hub: false },
  { id: 5, x: 1280, y: 360, r: 7, hub: false },
  { id: 6, x: 240, y: 520, r: 7, hub: false },
  { id: 7, x: 520, y: 580, r: 9, hub: true },
  { id: 8, x: 780, y: 660, r: 6, hub: false },
  { id: 9, x: 1020, y: 560, r: 7, hub: false },
  { id: 10, x: 1300, y: 700, r: 6, hub: false },
  { id: 11, x: 440, y: 760, r: 6, hub: false },
];

const EDGES = [
  [0, 1],
  [1, 2],
  [1, 3],
  [2, 3],
  [3, 4],
  [3, 5],
  [4, 5],
  [1, 7],
  [3, 7],
  [3, 9],
  [6, 7],
  [7, 8],
  [7, 11],
  [8, 9],
  [9, 10],
  [9, 5],
  [11, 8],
  [6, 1],
];

export default function NetworkBg() {
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
          <radialGradient id="nb-mask" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="65%" stopColor="#fff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="nb-fade">
            <rect width={VIEW_W} height={VIEW_H} fill="url(#nb-mask)" />
          </mask>
          <radialGradient id="nb-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#CFAE70" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#CFAE70" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g mask="url(#nb-fade)">
          {/* Edges */}
          <g
            className="text-[#1C1C1C] dark:text-white"
            stroke="currentColor"
            strokeOpacity="0.14"
            strokeWidth="1"
            fill="none"
          >
            {EDGES.map(([a, b], i) => {
              const A = NODES[a];
              const B = NODES[b];
              return (
                <motion.line
                  key={`e-${i}`}
                  x1={A.x}
                  y1={A.y}
                  x2={B.x}
                  y2={B.y}
                  initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{
                    duration: reduce ? 0 : 0.7,
                    ease,
                    delay: reduce ? 0 : i * 0.05,
                  }}
                />
              );
            })}
          </g>

          {/* Hub edges in gold */}
          <g
            stroke="#CFAE70"
            strokeOpacity="0.4"
            strokeWidth="1.25"
            fill="none"
          >
            {EDGES.filter(([a, b]) => NODES[a].hub || NODES[b].hub).map(
              ([a, b], i) => {
                const A = NODES[a];
                const B = NODES[b];
                return (
                  <motion.line
                    key={`he-${i}`}
                    x1={A.x}
                    y1={A.y}
                    x2={B.x}
                    y2={B.y}
                    initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{
                      duration: reduce ? 0 : 0.9,
                      ease,
                      delay: reduce ? 0 : 0.4 + i * 0.06,
                    }}
                  />
                );
              }
            )}
          </g>

          {/* Nodes */}
          {NODES.map((n, i) => (
            <motion.g
              key={`n-${n.id}`}
              initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.3 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: reduce ? 0 : 0.45,
                ease,
                delay: reduce ? 0 : 0.9 + i * 0.05,
              }}
              style={{ transformOrigin: `${n.x}px ${n.y}px` }}
            >
              {n.hub && (
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={n.r * 3}
                  fill="url(#nb-glow)"
                  opacity="0.7"
                />
              )}
              <motion.circle
                cx={n.x}
                cy={n.y}
                r={n.r}
                fill={n.hub ? "#CFAE70" : "#1C1C1C"}
                fillOpacity={n.hub ? 0.85 : 0.18}
                stroke="#CFAE70"
                strokeOpacity={n.hub ? 0.9 : 0.5}
                strokeWidth="1"
                animate={
                  reduce || !n.hub
                    ? {}
                    : { r: [n.r, n.r * 1.25, n.r], opacity: [0.85, 1, 0.85] }
                }
                transition={
                  reduce || !n.hub
                    ? {}
                    : {
                        duration: 2.6,
                        delay: i * 0.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                }
              />
            </motion.g>
          ))}
        </g>
      </svg>
    </div>
  );
}
