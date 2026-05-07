import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  TrendingUp,
  Cpu,
  Layers,
  Sprout,
  ArrowUpRight,
  MapPin,
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

const EXPERIENCES = [
  {
    company: "Cherrystone Angel Group",
    role: "Investment Research Analyst",
    period: "2025 — Present",
    location: "Providence, RI",
    type: "Venture",
    icon: TrendingUp,
    summary:
      "Translating early-stage thesis work into actionable capital decisions for the angel community.",
    bullets: [
      "Authored DD reports evaluating TAM, market structure, and competitive landscapes for prospective deals.",
      "Drafted actionable investment memos synthesizing technical, financial, and team-level signals.",
      "Engaged directly with early-stage founders across diligence calls and follow-on discussions.",
    ],
    metrics: [
      { value: "TAM", label: "Modeling" },
      { value: "DD", label: "Reports" },
      { value: "Memos", label: "Authored" },
    ],
  },
  {
    company: "Dong Robotics Laboratory",
    role: "Medical Robotics Researcher",
    period: "2024 — Present",
    location: "Vanderbilt — Nashville, TN",
    type: "Research",
    icon: Cpu,
    summary:
      "Hardware, firmware, and integrated electronics for a next-generation soft surgical robotics platform.",
    bullets: [
      "Designed multi-layer integrated circuits in EasyEDA, cutting iteration time by ~20%.",
      "Engineered wireless battery & power-management solutions extending soft-robot runtime by ~40%.",
      "Integrated advanced sensing systems into the device stack, improving closed-loop responsiveness.",
    ],
    metrics: [
      { value: "−20%", label: "Iteration Time" },
      { value: "+40%", label: "Runtime" },
      { value: "PCB", label: "Stack" },
    ],
  },
  {
    company: "IQ3Connect",
    role: "XR & UI Design Intern",
    period: "Summer 2025",
    location: "Boston, MA",
    type: "XR / UX",
    icon: Layers,
    summary:
      "Bridged immersive XR product simulations with the marketing surface that drives qualified pipeline.",
    bullets: [
      "Diagnosed and triaged 15+ UI defects across live XR training simulations.",
      "Spearheaded redesign of 5+ web pages — boosting engagement by 30%.",
      "Implemented SEO frameworks improving discoverability and inbound funnel quality.",
    ],
    metrics: [
      { value: "15+", label: "UI Defects" },
      { value: "+30%", label: "Engagement" },
      { value: "5+", label: "Page Redesigns" },
    ],
  },
  {
    company: "Student Services Landscaping",
    role: "Founder & Co-Owner",
    period: "2021 — 2024",
    location: "New England",
    type: "Founder",
    icon: Sprout,
    summary:
      "Built and operated a regional landscaping business end-to-end — sales, ops, finance, and team.",
    bullets: [
      "Scaled the business to $20,000 in profit across multiple seasons of operation.",
      "Owned full P&L, budget allocations, and reinvestment strategy.",
      "Managed client relationships, recurring contracts, and on-site team execution.",
    ],
    metrics: [
      { value: "$20K", label: "Profit" },
      { value: "P&L", label: "Owned" },
      { value: "Multi-Yr", label: "Operated" },
    ],
  },
];

export default function Experience() {
  const reduce = useReducedMotion();
  const trackRef = useRef(null);

  // Drive a gold progress line along the timeline as the user scrolls past it
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.65", "end 0.4"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="experience"
      className="relative isolate scroll-mt-24 bg-white py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="mb-16 flex flex-col items-start gap-3 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#334155]">
            <span className="h-px w-8 bg-[#CFAE70]" />
            02 — Experience
          </div>
          <h2 className="font-serif text-4xl font-semibold tracking-tight text-[#1C1C1C] sm:text-5xl md:text-6xl">
            A track record across{" "}
            <em className="italic">capital, code, and clay</em>
            <span className="text-[#CFAE70]">.</span>
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-[#475569]">
            From soldering soft-robotic boards to underwriting early-stage
            ventures — each role sharpened a different blade.
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={trackRef} className="relative">
          {/* Rail (background) */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-black/[0.06] via-black/[0.08] to-transparent sm:left-[23px]"
          />
          {/* Rail (gold progress) */}
          <motion.div
            aria-hidden
            style={reduce ? { height: "100%" } : { height: lineHeight }}
            className="pointer-events-none absolute left-[19px] top-2 w-px bg-gradient-to-b from-[#CFAE70] via-[#CFAE70]/70 to-[#CFAE70]/0 sm:left-[23px]"
          />

          <ol className="space-y-12 sm:space-y-16">
            {EXPERIENCES.map((exp, i) => (
              <TimelineItem key={exp.company} exp={exp} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Timeline Item ---------------- */

function TimelineItem({ exp, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-45% 0px -45% 0px" });
  const Icon = exp.icon;

  return (
    <li ref={ref} className="relative pl-14 sm:pl-20">
      {/* Node */}
      <Node active={inView} Icon={Icon} />

      {/* Card */}
      <motion.article
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease, delay: 0.05 }}
        className={[
          "group relative overflow-hidden rounded-2xl border bg-white transition-all duration-500",
          inView
            ? "border-[#CFAE70]/45 shadow-[0_1px_0_rgba(0,0,0,0.02),0_28px_60px_-28px_rgba(207,174,112,0.45)]"
            : "border-black/[0.06] shadow-[0_1px_0_rgba(0,0,0,0.02),0_2px_4px_rgba(0,0,0,0.03)]",
        ].join(" ")}
      >
        {/* gold accent edge */}
        <span
          aria-hidden
          className={[
            "pointer-events-none absolute left-0 top-0 h-full w-[3px] origin-top bg-[#CFAE70] transition-transform duration-500 ease-out",
            inView ? "scale-y-100" : "scale-y-0",
          ].join(" ")}
        />

        <div className="p-6 sm:p-8">
          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-2 text-[12px] font-medium text-[#334155]">
            <span className="rounded-full border border-black/[0.08] bg-[#FAFAFA] px-2.5 py-1 font-mono uppercase tracking-wider tabular-nums">
              {exp.period}
            </span>
            <span className="text-black/15">·</span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3 w-3" strokeWidth={2.25} />
              {exp.location}
            </span>
            <span className="text-black/15">·</span>
            <span className="rounded-full bg-[#CFAE70]/12 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#8a6f3a]">
              {exp.type}
            </span>
          </div>

          {/* Headline */}
          <div className="mt-4 flex items-start justify-between gap-4">
            <div>
              <h3 className="font-serif text-2xl font-semibold leading-tight text-[#1C1C1C] sm:text-[28px]">
                {exp.company}
              </h3>
              <div className="mt-1.5 text-sm font-medium text-[#475569] sm:text-base">
                {exp.role}
              </div>
            </div>
            <ArrowUpRight
              className={[
                "mt-1 hidden h-5 w-5 flex-none transition-all duration-500 sm:block",
                inView
                  ? "translate-x-0 -translate-y-0 text-[#CFAE70] opacity-100"
                  : "-translate-x-1 translate-y-1 text-[#475569] opacity-50",
              ].join(" ")}
              strokeWidth={2}
            />
          </div>

          {/* Summary */}
          <p className="mt-5 text-[15px] leading-relaxed text-[#475569]">
            {exp.summary}
          </p>

          {/* Bullets */}
          <ul className="mt-5 space-y-2.5">
            {exp.bullets.map((b, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-[14.5px] leading-relaxed text-[#1C1C1C]/85"
              >
                <span
                  aria-hidden
                  className="mt-[8px] inline-block h-1.5 w-1.5 flex-none rounded-full bg-[#CFAE70]"
                />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          {/* Metrics strip */}
          <div className="mt-7 grid grid-cols-3 divide-x divide-black/[0.06] overflow-hidden rounded-xl border border-black/[0.06] bg-[#FAFAFA]">
            {exp.metrics.map((m) => (
              <div
                key={m.label}
                className="px-4 py-3.5 text-center sm:py-4"
              >
                <div className="font-serif text-xl font-semibold leading-none tracking-tight tabular-nums text-[#1C1C1C] sm:text-2xl">
                  {m.value}
                </div>
                <div className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#334155]">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.article>
    </li>
  );
}

/* ---------------- Node ---------------- */

function Node({ active, Icon }) {
  return (
    <div className="absolute left-0 top-6 sm:top-8">
      {/* outer halo */}
      <motion.span
        aria-hidden
        animate={{
          scale: active ? 1 : 0.6,
          opacity: active ? 1 : 0,
        }}
        transition={{ duration: 0.5, ease }}
        className="absolute -inset-2 rounded-full bg-[#CFAE70]/25 blur-md"
      />
      {/* ping */}
      {active && (
        <span
          aria-hidden
          className="absolute inset-0 -m-1 animate-ping rounded-full bg-[#CFAE70]/30"
        />
      )}
      {/* node */}
      <motion.span
        animate={{
          backgroundColor: active ? "#CFAE70" : "#FFFFFF",
          borderColor: active ? "#CFAE70" : "rgba(28,28,28,0.15)",
          boxShadow: active
            ? "0 0 0 4px rgba(207,174,112,0.18), 0 6px 16px -4px rgba(207,174,112,0.55)"
            : "0 0 0 4px rgba(0,0,0,0), 0 1px 2px rgba(0,0,0,0.06)",
        }}
        transition={{ duration: 0.45, ease }}
        className="relative flex h-10 w-10 items-center justify-center rounded-full border sm:h-12 sm:w-12"
      >
        <motion.span
          animate={{
            color: active ? "#1C1C1C" : "#475569",
            scale: active ? 1.05 : 1,
          }}
          transition={{ duration: 0.4, ease }}
          className="inline-flex"
        >
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2} />
        </motion.span>
      </motion.span>
    </div>
  );
}
