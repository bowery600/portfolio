import { motion } from "framer-motion";
import {
  GraduationCap,
  MapPin,
  Mountain,
  Trophy,
  Compass,
  Sprout,
  ChefHat,
  Plane,
  Snowflake,
  Sparkles,
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

const fade = {
  hidden: { y: 20, opacity: 0 },
  show: (i = 0) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease, delay: i * 0.06 },
  }),
};

const INTERESTS = [
  { label: "Alpine Skiing", icon: Mountain },
  { label: "Tennis", icon: Trophy },
  { label: "Wilderness Skills", icon: Compass },
  { label: "Pepper & Spice Gardening", icon: Sprout },
  { label: "VandyCooks", icon: ChefHat },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative isolate scroll-mt-24 bg-[#FAFAFA] py-24 sm:py-32"
    >
      {/* faint top fade into hero */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent" />

      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="mb-14 flex flex-col items-start gap-3 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#334155]">
            <span className="h-px w-8 bg-[#CFAE70]" />
            01 — About
          </div>
          <h2 className="font-serif text-4xl font-semibold tracking-tight text-[#1C1C1C] sm:text-5xl md:text-6xl">
            A study in <em className="italic text-[#1C1C1C]">precision</em>
            <span className="text-[#CFAE70]">.</span>
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-[#475569]">
            Engineering rigor sharpened by business intuition — and a life
            shaped equally by mountains, courts, and kitchens.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-6 lg:gap-6">
          {/* Education — wide hero card */}
          <BentoCard
            index={0}
            className="lg:col-span-4 lg:row-span-2"
            tone="dark"
          >
            <div className="relative flex h-full flex-col justify-between p-7 sm:p-9">
              {/* Decorative gold ring */}
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-[#CFAE70]/25" />
              <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full border border-[#CFAE70]/15" />

              <div className="flex items-center gap-3">
                <IconBubble tone="dark">
                  <GraduationCap className="h-5 w-5 text-[#CFAE70]" strokeWidth={2} />
                </IconBubble>
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/60">
                  Education
                </span>
              </div>

              <div className="mt-10">
                <div className="font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl">
                  Vanderbilt University
                </div>
                <div className="mt-2 text-sm text-white/70 sm:text-base">
                  B.E. Mechanical Engineering · Minor in Business
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Stat
                    value="4.0"
                    label="GPA"
                    accent
                  />
                  <Stat value="Dean's List" label="Honors" />
                  <Stat value="ME + Biz" label="Track" />
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Locations */}
          <BentoCard index={1} className="lg:col-span-2 lg:row-span-1">
            <div className="flex h-full flex-col justify-between p-6">
              <div className="flex items-center gap-3">
                <IconBubble>
                  <MapPin className="h-5 w-5 text-[#CFAE70]" strokeWidth={2} />
                </IconBubble>
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#334155]">
                  Dual Presence
                </span>
              </div>

              <div className="mt-6 space-y-3">
                <CityRow city="Boston" region="Massachusetts" code="BOS" />
                <div className="ml-[15px] h-4 w-px bg-gradient-to-b from-[#CFAE70] to-transparent" />
                <CityRow city="Nashville" region="Tennessee" code="BNA" />
              </div>
            </div>
          </BentoCard>

          {/* Global Perspective */}
          <BentoCard index={2} className="lg:col-span-2 lg:row-span-1">
            <div className="flex h-full flex-col justify-between p-6">
              <div className="flex items-center gap-3">
                <IconBubble>
                  <Plane className="h-5 w-5 text-[#CFAE70]" strokeWidth={2} />
                </IconBubble>
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#334155]">
                  Global Perspective
                </span>
              </div>

              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3">
                  <Snowflake className="mt-0.5 h-4 w-4 flex-none text-[#475569]" strokeWidth={2} />
                  <div>
                    <div className="text-sm font-medium text-[#1C1C1C]">
                      Maine
                    </div>
                    <div className="text-xs text-[#334155]">
                      Recent ski trips
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Sparkles className="mt-0.5 h-4 w-4 flex-none text-[#CFAE70]" strokeWidth={2} />
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium text-[#1C1C1C]">
                      Israel
                      <span className="rounded-full bg-[#CFAE70]/15 px-2 py-[2px] text-[10px] font-semibold uppercase tracking-wider text-[#8a6f3a]">
                        May 2026
                      </span>
                    </div>
                    <div className="text-xs text-[#334155]">
                      Upcoming travel
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </BentoCard>

          {/* Interests — full-width strip */}
          <BentoCard index={3} className="lg:col-span-6">
            <div className="flex h-full flex-col gap-6 p-6 sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <IconBubble>
                    <Sparkles className="h-5 w-5 text-[#CFAE70]" strokeWidth={2} />
                  </IconBubble>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#334155]">
                    Interests & Pursuits
                  </span>
                </div>
                <span className="hidden font-serif text-sm italic text-[#475569] sm:inline">
                  beyond the lab
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {INTERESTS.map((it, i) => (
                  <InterestPill key={it.label} item={it} delay={i * 0.04} />
                ))}
              </div>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}

/* ---------- Building blocks ---------- */

function BentoCard({ children, className = "", tone = "light", index = 0 }) {
  const dark = tone === "dark";
  return (
    <motion.article
      variants={fade}
      initial="hidden"
      whileInView="show"
      custom={index}
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={[
        "group relative overflow-hidden rounded-2xl border transition-shadow duration-300",
        dark
          ? "border-white/10 bg-[#1C1C1C] text-white shadow-[0_1px_0_rgba(255,255,255,0.04)_inset,0_10px_30px_-12px_rgba(0,0,0,0.45)] hover:shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_24px_60px_-20px_rgba(0,0,0,0.55)]"
          : "border-black/[0.06] bg-white shadow-[0_1px_0_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_1px_0_rgba(0,0,0,0.02),0_18px_40px_-20px_rgba(28,28,28,0.18)]",
        className,
      ].join(" ")}
    >
      {/* gold sheen on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-[#CFAE70] to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100"
      />
      {children}
    </motion.article>
  );
}

function IconBubble({ children, tone = "light" }) {
  const dark = tone === "dark";
  return (
    <span
      className={[
        "inline-flex h-9 w-9 items-center justify-center rounded-lg border",
        dark
          ? "border-white/10 bg-white/[0.04]"
          : "border-black/[0.06] bg-[#FAFAFA]",
      ].join(" ")}
    >
      {children}
    </span>
  );
}

function Stat({ value, label, accent = false }) {
  return (
    <div>
      <div
        className={[
          "font-serif text-3xl font-semibold leading-none tracking-tight tabular-nums sm:text-4xl",
          accent ? "text-[#CFAE70]" : "text-white",
        ].join(" ")}
      >
        {value}
      </div>
      <div className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">
        {label}
      </div>
    </div>
  );
}

function CityRow({ city, region, code }) {
  return (
    <div className="flex items-center gap-3">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full bg-[#CFAE70] opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#CFAE70]" />
      </span>
      <div className="flex-1">
        <div className="text-base font-semibold text-[#1C1C1C]">
          {city}
          <span className="ml-2 text-xs font-normal text-[#334155]">
            {region}
          </span>
        </div>
      </div>
      <span className="rounded-md border border-black/[0.06] bg-[#FAFAFA] px-1.5 py-0.5 font-mono text-[11px] font-semibold tracking-wider text-[#334155]">
        {code}
      </span>
    </div>
  );
}

function InterestPill({ item, delay }) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease, delay }}
      whileHover={{ y: -2 }}
      className="group/pill relative flex items-center gap-3 overflow-hidden rounded-xl border border-black/[0.06] bg-[#FAFAFA] px-4 py-3.5 transition-colors duration-200 hover:border-[#CFAE70]/50 hover:bg-white"
    >
      <span className="inline-flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-white text-[#CFAE70] shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-transform duration-300 group-hover/pill:scale-110">
        <Icon className="h-4 w-4" strokeWidth={2.25} />
      </span>
      <span className="text-sm font-medium leading-tight text-[#1C1C1C]">
        {item.label}
      </span>
    </motion.div>
  );
}
