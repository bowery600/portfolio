import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Box,
  Boxes,
  CircuitBoard,
  Cpu,
  Zap,
  FunctionSquare,
  Braces,
  Coffee,
  Brain,
  Sparkles,
  Github,
  Terminal,
  Wrench,
  Cog,
  Bot,
} from "lucide-react";
import CircuitBg from "./backgrounds/CircuitBg";

const ease = [0.22, 1, 0.36, 1];

const GROUPS = [
  {
    title: "Hardware & CAD",
    code: "01",
    icon: Cog,
    blurb: "Designing and prototyping physical systems.",
    items: [
      { name: "SolidWorks", icon: Box },
      { name: "Fusion 360", icon: Boxes },
      { name: "EasyEDA", icon: CircuitBoard },
      { name: "Circuit Design", icon: Cpu },
      { name: "Soldering", icon: Zap },
    ],
  },
  {
    title: "Software & Control",
    code: "02",
    icon: Wrench,
    blurb: "Modeling, scripting, and control logic.",
    items: [
      { name: "MATLAB", icon: FunctionSquare },
      { name: "Python", icon: Braces },
      { name: "Java", icon: Coffee },
    ],
  },
  {
    title: "AI & Automation",
    code: "03",
    icon: Bot,
    blurb: "Local & frontier models, agentic workflows.",
    items: [
      { name: "Ollama", icon: Brain },
      { name: "OpenAI", icon: Sparkles },
      { name: "GitHub Copilot", icon: Github },
      { name: "Claude Code", icon: Terminal },
    ],
  },
];

/* Honeycomb row layouts — number of tiles per row, per group */
const ROW_LAYOUTS = {
  5: [3, 2], // Hardware & CAD
  3: [2, 1], // Software & Control
  4: [2, 2], // AI & Automation
};

export default function TechStack() {
  return (
    <section
      id="stack"
      className="relative isolate scroll-mt-24 overflow-hidden bg-white py-24 dark:bg-[#0E0E10] sm:py-32"
    >
      <CircuitBg />

      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="mb-14 flex flex-col items-start gap-3 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#334155] dark:text-white/60">
            <span className="h-px w-8 bg-[#CFAE70]" />
            Tech Stack
          </div>
          <h2 className="font-serif text-4xl font-semibold tracking-tight text-[#1C1C1C] dark:text-white sm:text-5xl md:text-6xl">
            The <em className="italic">working set</em>
            <span className="text-[#CFAE70]">.</span>
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-[#475569] dark:text-white/65">
            Tools sharpened across CAD benches, control loops, and AI
            workflows — chosen for the job, not the brand.
          </p>
        </motion.div>

        {/* Groups */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-7">
          {GROUPS.map((group, gi) => (
            <GroupPanel key={group.title} group={group} index={gi} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Group Panel ---------------- */

function GroupPanel({ group, index }) {
  const Icon = group.icon;
  const layout = ROW_LAYOUTS[group.items.length] || [group.items.length];

  // Slice items into rows according to the layout
  const rows = useMemo(() => {
    const out = [];
    let cursor = 0;
    for (const count of layout) {
      out.push(group.items.slice(cursor, cursor + count));
      cursor += count;
    }
    return out;
  }, [group.items, layout]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease, delay: index * 0.08 }}
      className="group relative overflow-hidden rounded-2xl border border-black/[0.06] bg-[#FAFAFA] p-6 transition-all duration-500 hover:border-[#CFAE70]/35 hover:shadow-[0_24px_50px_-24px_rgba(207,174,112,0.35)] dark:border-white/[0.08] dark:bg-[#16161A] dark:hover:border-[#CFAE70]/45 sm:p-7"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#334155] dark:text-white/60">
            <span className="font-mono text-[#CFAE70]">{group.code}</span>
            <span className="h-px w-6 bg-[#CFAE70]/50" />
            {group.title}
          </div>
          <p className="mt-3 max-w-[28ch] text-sm leading-relaxed text-[#475569] dark:text-white/65">
            {group.blurb}
          </p>
        </div>
        <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-black/[0.06] bg-white text-[#CFAE70] dark:border-white/[0.08] dark:bg-white/[0.04]">
          <Icon className="h-5 w-5" strokeWidth={2} />
        </span>
      </div>

      {/* Honeycomb */}
      <div className="mt-7 flex flex-col items-center">
        {rows.map((rowItems, ri) => (
          <div
            key={`row-${ri}`}
            className={[
              "flex justify-center gap-3",
              ri > 0 ? "-mt-[26px]" : "",
            ].join(" ")}
          >
            {rowItems.map((item, ii) => (
              <HexTile
                key={item.name}
                item={item}
                index={ri * 10 + ii}
                groupIndex={index}
              />
            ))}
          </div>
        ))}
      </div>
    </motion.article>
  );
}

/* ---------------- Hex Tile ---------------- */

const HEX_CLIP =
  "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

function HexTile({ item, index, groupIndex }) {
  const reduce = useReducedMotion();
  const Icon = item.icon;

  // Subtle deterministic float offset per tile
  const seed = (groupIndex * 7 + index * 13) % 360;
  const duration = 4.2 + ((seed % 9) * 0.18);
  const delay = (seed % 100) / 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease, delay: 0.04 * index }}
      className="relative"
      style={{ width: "104px", height: "120px" }}
    >
      {/* Gentle floating wrapper */}
      <motion.div
        animate={reduce ? {} : { y: [0, -3.5, 0, 3.5, 0] }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0"
      >
        {/* Outer (border) hex — bg becomes gold on hover, acting as the ring */}
        <div
          className="group/tile relative h-full w-full transition-transform duration-300 ease-out hover:scale-[1.06]"
        >
          {/* Border layer (light) */}
          <div
            aria-hidden
            className="absolute inset-0 transition-[background] duration-300 dark:hidden"
            style={{
              clipPath: HEX_CLIP,
              WebkitClipPath: HEX_CLIP,
              background:
                "linear-gradient(160deg, rgba(28,28,28,0.10) 0%, rgba(28,28,28,0.06) 50%, rgba(28,28,28,0.10) 100%)",
            }}
          />
          {/* Border layer (dark) */}
          <div
            aria-hidden
            className="absolute inset-0 hidden transition-[background] duration-300 dark:block"
            style={{
              clipPath: HEX_CLIP,
              WebkitClipPath: HEX_CLIP,
              background:
                "linear-gradient(160deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.16) 100%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/tile:opacity-100"
            style={{
              clipPath: HEX_CLIP,
              WebkitClipPath: HEX_CLIP,
              background:
                "linear-gradient(160deg, #CFAE70 0%, #E6C892 50%, #CFAE70 100%)",
            }}
          />

          {/* Glow (behind everything) */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-2 -z-10 opacity-0 blur-xl transition-opacity duration-300 group-hover/tile:opacity-100"
            style={{
              background:
                "radial-gradient(circle at center, rgba(207,174,112,0.55), transparent 70%)",
            }}
          />

          {/* Inner face (sits above border, holds content) */}
          <div
            className="absolute inset-[1.5px] flex flex-col items-center justify-center bg-white transition-[background] duration-300 group-hover/tile:bg-[linear-gradient(160deg,#FFFFFF_0%,#FFF6E2_100%)] dark:bg-[#1A1A1D] dark:group-hover/tile:bg-[linear-gradient(160deg,#1A1A1D_0%,#2A2418_100%)]"
            style={{
              clipPath: HEX_CLIP,
              WebkitClipPath: HEX_CLIP,
            }}
          >
            <span className="mb-1.5 inline-flex h-7 w-7 items-center justify-center text-[#475569] transition-colors duration-300 group-hover/tile:text-[#CFAE70] dark:text-white/70">
              <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
            </span>
            <span className="px-1.5 text-center text-[10.5px] font-semibold leading-[1.1] tracking-tight text-[#1C1C1C] dark:text-white">
              {item.name}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
