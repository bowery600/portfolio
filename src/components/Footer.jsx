import { Linkedin, Mail, ArrowUp } from "lucide-react";

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ethanhood9",
    icon: Linkedin,
    external: true,
  },
  {
    label: "Email",
    href: "mailto:ethan.hood@vanderbilt.edu",
    icon: Mail,
    external: false,
  },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative isolate overflow-hidden bg-[#1C1C1C] text-white"
    >
      {/* faint gold ambient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-32 h-72 bg-[radial-gradient(ellipse_at_center,rgba(207,174,112,0.18),transparent_60%)]"
      />
      {/* hairline */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#CFAE70]/40 to-transparent"
      />

      <div
        className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-8 lg:py-20"
        style={{ paddingBottom: "max(4rem, env(safe-area-inset-bottom))" }}
      >
        {/* Top: CTA */}
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
              <span className="h-px w-8 bg-[#CFAE70]" />
              Let&apos;s build
            </div>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
              Have an idea worth{" "}
              <em className="italic text-[#CFAE70]">engineering</em>?
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/65">
              I&apos;m always open to conversations across robotics, XR, and
              early-stage venture work.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="mailto:ethan.hood@vanderbilt.edu"
              className="group inline-flex items-center gap-2 rounded-full bg-[#CFAE70] px-5 py-3 text-sm font-semibold text-[#1C1C1C] shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_8px_24px_-10px_rgba(207,174,112,0.6)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#C5A364] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CFAE70] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C1C1C]"
              aria-label="Email Ethan"
            >
              <Mail className="h-4 w-4" strokeWidth={2.25} />
              <span>Email</span>
            </a>
            <a
              href="https://www.linkedin.com/in/ethanhood9"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#CFAE70]/60 hover:bg-white/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CFAE70] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C1C1C]"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4 text-[#CFAE70]" strokeWidth={2} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-14 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />

        {/* Bottom row */}
        <div className="mt-8 flex flex-col-reverse items-start justify-between gap-6 sm:flex-row sm:items-center">
          {/* Wordmark + copyright */}
          <div className="flex items-center gap-3">
            <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/[0.06] text-white">
              <span className="font-serif text-[13px] leading-none">EH</span>
              <span className="absolute -bottom-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-[#CFAE70]" />
            </span>
            <div className="text-xs leading-tight text-white/55">
              <div className="font-medium text-white/80">Ethan Hood</div>
              <div>© 2026 — All rights reserved.</div>
            </div>
          </div>

          {/* Compact icon links + back to top */}
          <div className="flex items-center gap-2">
            <ul className="flex items-center gap-1">
              {SOCIALS.map((s) => {
                const Icon = s.icon;
                return (
                  <li key={`mini-${s.label}`}>
                    <a
                      href={s.href}
                      {...(s.external
                        ? { target: "_blank", rel: "noreferrer" }
                        : {})}
                      aria-label={s.label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition-all duration-200 hover:border-[#CFAE70]/60 hover:text-[#CFAE70] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CFAE70] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C1C1C]"
                    >
                      <Icon className="h-4 w-4" strokeWidth={2} />
                    </a>
                  </li>
                );
              })}
            </ul>
            <span aria-hidden className="mx-2 h-5 w-px bg-white/10" />
            <a
              href="#top"
              aria-label="Back to top"
              className="group inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3.5 py-2 text-xs font-medium text-white/70 transition-all duration-200 hover:border-[#CFAE70]/60 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CFAE70] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C1C1C]"
            >
              <ArrowUp
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5"
                strokeWidth={2.25}
              />
              Top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
