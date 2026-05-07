import { motion } from "framer-motion";
import {
  Megaphone,
  Trophy,
  LineChart,
  ArrowUpRight,
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

const ROLES = [
  {
    org: "ASME",
    role: "Communications & Outreach Chair",
    tag: "Engineering Society",
    icon: Megaphone,
    accent: "150+",
    accentLabel: "Members Reached",
    bullets: [
      "Curated bi-weekly industry newsletters for 150+ members.",
      "Built a student-to-industry networking platform from the ground up.",
      "Increased chapter engagement ~30% via the 'Lab Spotlight' series.",
    ],
  },
  {
    org: "Deloitte Case Competition",
    role: "Team Lead — Synergy Solvers",
    tag: "Strategy & Consulting",
    icon: Trophy,
    accent: "2nd",
    accentLabel: "Place on Campus",
    bullets: [
      "Led 'Synergy Solvers' to 2nd place in the on-campus competition.",
      "Architected operational flowcharts mapping client systems end-to-end.",
      "Managed the full project lifecycle through pitch to Deloitte executives.",
    ],
  },
  {
    org: "SEO Career",
    role: "Edge Participant",
    tag: "Finance Training",
    icon: LineChart,
    accent: "50+",
    accentLabel: "Training Hours",
    bullets: [
      "Completed 50+ hours of rigorous technical training.",
      "Studied financial modeling fundamentals and best practices.",
      "Built fluency in corporate valuation methods and frameworks.",
    ],
  },
];

export default function Leadership() {
  return (
    <section
      id="leadership"
      className="relative isolate scroll-mt-24 bg-[#FAFAFA] py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="mb-14 flex flex-col items-start gap-3 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#334155]">
            <span className="h-px w-8 bg-[#CFAE70]" />
            03 — Leadership
          </div>
          <h2 className="font-serif text-4xl font-semibold tracking-tight text-[#1C1C1C] sm:text-5xl md:text-6xl">
            Leading <em className="italic">where it matters</em>
            <span className="text-[#CFAE70]">.</span>
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-[#475569]">
            Building the platforms, teams, and rituals that turn talent into
            outcomes — across engineering societies, case rooms, and
            structured finance training.
          </p>
        </motion.div>

        {/* Cards */}
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {ROLES.map((r, i) => (
            <LeadershipCard key={r.org} role={r} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- Card ---------------- */

function LeadershipCard({ role, index }) {
  const Icon = role.icon;

  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease, delay: index * 0.08 }}
      className="group relative overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_1px_0_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-1 hover:border-[#CFAE70] hover:shadow-[0_1px_0_rgba(0,0,0,0.02),0_24px_50px_-24px_rgba(207,174,112,0.55)]"
    >
      {/* gold inner ring on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-[#CFAE70]/0 transition-all duration-500 group-hover:ring-[#CFAE70]/30"
      />
      {/* gold sweep top edge */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-[#CFAE70] to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100"
      />

      <div className="relative flex h-full flex-col p-6 sm:p-7">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-black/[0.06] bg-[#FAFAFA] text-[#CFAE70] transition-all duration-500 group-hover:border-[#CFAE70]/30 group-hover:bg-white group-hover:shadow-[0_6px_18px_-8px_rgba(207,174,112,0.55)]">
            <Icon className="h-5 w-5" strokeWidth={2} />
          </span>
          <ArrowUpRight
            className="h-4 w-4 -translate-x-1 translate-y-1 text-[#475569] opacity-50 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-[#CFAE70] group-hover:opacity-100"
            strokeWidth={2.25}
          />
        </div>

        {/* Tag */}
        <div className="mt-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#334155]">
          {role.tag}
        </div>

        {/* Title */}
        <h3 className="mt-2 font-serif text-2xl font-semibold leading-tight text-[#1C1C1C]">
          {role.org}
        </h3>
        <div className="mt-1 text-sm font-medium text-[#475569]">
          {role.role}
        </div>

        {/* Accent stat */}
        <div className="mt-5 flex items-baseline gap-2">
          <span className="font-serif text-4xl font-semibold leading-none tracking-tight tabular-nums text-[#8a6f3a]">
            {role.accent}
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#334155]">
            {role.accentLabel}
          </span>
        </div>

        {/* Divider */}
        <div className="my-6 h-px w-full bg-gradient-to-r from-black/[0.08] via-black/[0.04] to-transparent" />

        {/* Bullets */}
        <ul className="space-y-2.5">
          {role.bullets.map((b, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-[14px] leading-relaxed text-[#1C1C1C]/85"
            >
              <span
                aria-hidden
                className="mt-[7px] inline-block h-1.5 w-1.5 flex-none rounded-full bg-[#CFAE70]"
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.li>
  );
}
