import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

const MOTIF_GLYPHS = {
  blueprint: BlueprintGlyph,
  circuit: CircuitGlyph,
  market: MarketGlyph,
  network: NetworkGlyph,
  contact: ContactGlyph,
};

/**
 * Connector band placed between two sections. Continues the gold throughline
 * with a hairline + central junction, and hints at the motifs on either side.
 *
 * Props:
 *   from / to         — motif name (blueprint | circuit | market | network | contact)
 *   bgFrom / bgTo     — light-mode background colors of adjacent sections
 *   bgFromDark / bgToDark — dark-mode background colors of adjacent sections
 */
export default function SectionTransition({
  from,
  to,
  bgFrom = "#FAFAFA",
  bgTo = "#FFFFFF",
  bgFromDark = "#121215",
  bgToDark = "#0E0E10",
}) {
  const reduce = useReducedMotion();
  const FromGlyph = MOTIF_GLYPHS[from] || (() => null);
  const ToGlyph = MOTIF_GLYPHS[to] || (() => null);

  return (
    <div
      aria-hidden
      className="relative h-24 w-full overflow-hidden sm:h-28"
      style={{
        background: `linear-gradient(to bottom, ${bgFrom}, ${bgTo})`,
      }}
    >
      {/* Dark-mode gradient overlay */}
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          background: `linear-gradient(to bottom, ${bgFromDark}, ${bgToDark})`,
        }}
      />

      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id={`st-line-${from}-${to}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#CFAE70" stopOpacity="0" />
            <stop offset="20%" stopColor="#CFAE70" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#CFAE70" stopOpacity="0.85" />
            <stop offset="80%" stopColor="#CFAE70" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#CFAE70" stopOpacity="0" />
          </linearGradient>
          <radialGradient id={`st-glow-${from}-${to}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#CFAE70" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#CFAE70" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Left motif hint */}
        <g opacity="0.55">
          <FromGlyph side="left" reduce={reduce} />
        </g>
        {/* Right motif hint */}
        <g opacity="0.55">
          <ToGlyph side="right" reduce={reduce} />
        </g>

        {/* Central glow */}
        <motion.circle
          cx="720"
          cy="60"
          r="60"
          fill={`url(#st-glow-${from}-${to})`}
          initial={reduce ? { opacity: 0.45 } : { opacity: 0 }}
          whileInView={{ opacity: 0.45 }}
          viewport={{ once: true, margin: "-10px 0px" }}
          transition={{ duration: reduce ? 0 : 0.7, ease, delay: reduce ? 0 : 0.45 }}
        />

        {/* Gold hairline */}
        <motion.line
          x1="0"
          y1="60"
          x2="1440"
          y2="60"
          stroke={`url(#st-line-${from}-${to})`}
          strokeWidth="1"
          initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-10px 0px" }}
          transition={{ duration: reduce ? 0 : 1.1, ease }}
        />

        {/* Junction node */}
        <motion.g
          initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.3 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10px 0px" }}
          transition={{ duration: reduce ? 0 : 0.4, ease, delay: reduce ? 0 : 0.6 }}
          style={{ transformOrigin: "720px 60px" }}
        >
          <circle cx="720" cy="60" r="5" fill="#CFAE70" fillOpacity="0.45" />
          <circle cx="720" cy="60" r="2" fill="#CFAE70" />
        </motion.g>
      </svg>
    </div>
  );
}

/* ---------- Motif glyphs (small fragments echoing each section) ---------- */

function drawProps(reduce, delay = 0) {
  return {
    initial: reduce ? { pathLength: 1, opacity: 0.55 } : { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 0.55 },
    viewport: { once: true, margin: "-10px 0px" },
    transition: { duration: reduce ? 0 : 0.8, ease, delay: reduce ? 0 : delay },
  };
}

function BlueprintGlyph({ side, reduce }) {
  const xs = side === "left" ? [40, 100, 160, 220, 280] : [1160, 1220, 1280, 1340, 1400];
  return (
    <g
      className="text-[#1C1C1C] dark:text-white"
      stroke="currentColor"
      strokeWidth="0.75"
      strokeOpacity="0.18"
    >
      {xs.map((x, i) => (
        <motion.line
          key={`bp-${x}`}
          x1={x}
          y1={20}
          x2={x}
          y2={100}
          {...drawProps(reduce, 0.1 + i * 0.04)}
        />
      ))}
      <motion.line x1={xs[0]} y1={60} x2={xs[xs.length - 1]} y2={60} {...drawProps(reduce, 0.3)} />
    </g>
  );
}

function CircuitGlyph({ side, reduce }) {
  const startX = side === "left" ? 40 : 1100;
  const dir = side === "left" ? 1 : -1;
  const d = `M ${startX} 60 L ${startX + 80 * dir} 60 L ${startX + 120 * dir} 30 L ${startX + 220 * dir} 30 L ${startX + 260 * dir} 60`;
  return (
    <g
      stroke="#CFAE70"
      strokeOpacity="0.5"
      strokeWidth="1.25"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.path d={d} {...drawProps(reduce, 0.2)} />
      <motion.circle
        cx={startX + 80 * dir}
        cy={60}
        r="3"
        fill="#CFAE70"
        fillOpacity="0.7"
        stroke="none"
        initial={reduce ? { opacity: 1 } : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-10px 0px" }}
        transition={{ duration: reduce ? 0 : 0.3, ease, delay: reduce ? 0 : 0.7 }}
      />
    </g>
  );
}

function MarketGlyph({ side, reduce }) {
  const startX = side === "left" ? 40 : 1140;
  const dir = side === "left" ? 1 : -1;
  // ascending mini chart
  const pts = [
    [startX, 90],
    [startX + 50 * dir, 80],
    [startX + 100 * dir, 65],
    [startX + 150 * dir, 70],
    [startX + 200 * dir, 50],
    [startX + 260 * dir, 35],
  ];
  const d = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`).join(" ");
  return (
    <g
      stroke="#CFAE70"
      strokeOpacity="0.55"
      strokeWidth="1.25"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.path d={d} {...drawProps(reduce, 0.2)} />
    </g>
  );
}

function NetworkGlyph({ side, reduce }) {
  const x0 = side === "left" ? 40 : 1140;
  const dir = side === "left" ? 1 : -1;
  const nodes = [
    [x0, 80],
    [x0 + 80 * dir, 40],
    [x0 + 160 * dir, 70],
    [x0 + 240 * dir, 35],
    [x0 + 280 * dir, 80],
  ];
  const edges = [
    [0, 1],
    [1, 2],
    [2, 3],
    [2, 4],
    [3, 4],
  ];
  return (
    <g>
      <g
        className="text-[#1C1C1C] dark:text-white"
        stroke="currentColor"
        strokeOpacity="0.18"
        strokeWidth="1"
      >
        {edges.map(([a, b], i) => (
          <motion.line
            key={`ne-${i}`}
            x1={nodes[a][0]}
            y1={nodes[a][1]}
            x2={nodes[b][0]}
            y2={nodes[b][1]}
            {...drawProps(reduce, 0.15 + i * 0.05)}
          />
        ))}
      </g>
      {nodes.map(([x, y], i) => (
        <motion.circle
          key={`nn-${i}`}
          cx={x}
          cy={y}
          r="3"
          fill="#CFAE70"
          fillOpacity="0.75"
          initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.3 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10px 0px" }}
          transition={{ duration: reduce ? 0 : 0.35, ease, delay: reduce ? 0 : 0.5 + i * 0.05 }}
          style={{ transformOrigin: `${x}px ${y}px` }}
        />
      ))}
    </g>
  );
}

function ContactGlyph({ side, reduce }) {
  // Simple converging lines toward the right (toward footer)
  const xEnd = side === "left" ? 280 : 1160;
  const xStart = side === "left" ? 40 : 1400;
  return (
    <g
      stroke="#CFAE70"
      strokeOpacity="0.4"
      strokeWidth="1"
      fill="none"
      strokeLinecap="round"
    >
      <motion.line x1={xStart} y1={30} x2={xEnd} y2={60} {...drawProps(reduce, 0.2)} />
      <motion.line x1={xStart} y1={90} x2={xEnd} y2={60} {...drawProps(reduce, 0.3)} />
    </g>
  );
}
