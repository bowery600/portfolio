import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Download, Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Leadership", href: "#leadership" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const buttonRef = useRef(null);
  const firstLinkRef = useRef(null);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => firstLinkRef.current?.focus(), 60);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <motion.header
      initial={reduce ? false : { y: -24, opacity: 0 }}
      animate={reduce ? undefined : { y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={[
        "fixed inset-x-0 top-0 z-50 transition-[background,backdrop-filter,border-color,box-shadow] duration-300",
        scrolled
          ? "bg-white/70 dark:bg-[#0E0E10]/70 backdrop-blur-xl border-b border-black/[0.06] dark:border-white/[0.08] shadow-[0_1px_0_rgba(0,0,0,0.02),0_8px_24px_-12px_rgba(0,0,0,0.08)] dark:shadow-[0_1px_0_rgba(255,255,255,0.04),0_8px_24px_-12px_rgba(0,0,0,0.5)]"
          : "bg-white/40 dark:bg-[#0E0E10]/40 backdrop-blur-md border-b border-transparent",
      ].join(" ")}
    >
      {/* Animated gold gradient sweep along the bottom edge (GPU-accelerated translate) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px overflow-hidden"
        style={{
          opacity: scrolled ? 1 : 0.55,
          transition: "opacity 300ms ease",
        }}
      >
        <motion.span
          className="absolute inset-y-0 left-0 w-[60%]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(207,174,112,0) 0%, rgba(207,174,112,0.9) 50%, rgba(207,174,112,0) 100%)",
            willChange: "transform",
          }}
          animate={reduce ? { x: "70%" } : { x: ["-60%", "170%"] }}
          transition={
            reduce
              ? { duration: 0 }
              : { duration: 7, repeat: Infinity, ease: "linear" }
          }
        />
      </div>

      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:h-[72px] lg:px-8"
        aria-label="Primary"
      >
        {/* Wordmark */}
        <a
          href="#top"
          className="group flex items-center gap-2 text-[15px] font-semibold tracking-tight text-[#1C1C1C] dark:text-white"
          aria-label="Ethan Hood — Home"
        >
          <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-md bg-[#1C1C1C] text-white dark:bg-white dark:text-[#1C1C1C]">
            <span className="font-serif text-[13px] leading-none">EH</span>
            <span className="absolute -bottom-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-[#CFAE70]" />
          </span>
          <span className="hidden sm:inline">Ethan Hood</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative rounded-md px-3 py-2 text-sm font-medium text-[#475569] transition-colors hover:text-[#1C1C1C] dark:text-white/65 dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CFAE70] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0E0E10]"
              >
                {l.label}
                <span className="pointer-events-none absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-[#CFAE70] transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        {/* Right cluster */}
        <div className="flex items-center gap-2">
          <ThemeToggle theme={theme} toggle={toggle} reduce={reduce} />

          <a
            href="/Ethan-Hood-Resume.pdf"
            download
            className="group hidden items-center gap-2 rounded-full border border-[#CFAE70]/60 bg-[#CFAE70] px-4 py-2 text-sm font-semibold text-[#1C1C1C] shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_1px_2px_rgba(28,28,28,0.08)] transition-all duration-200 hover:-translate-y-px hover:bg-[#C5A364] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_8px_20px_-8px_rgba(207,174,112,0.6)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CFAE70] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0E0E10] sm:inline-flex"
          >
            <Download className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" strokeWidth={2.25} />
            Resume
          </a>

          {/* Mobile menu button */}
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-[#1C1C1C] hover:bg-black/5 dark:text-white dark:hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CFAE70] md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="primary-mobile-menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile"
            id="primary-mobile-menu"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-black/[0.06] bg-white/85 backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#0E0E10]/90 md:hidden"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          >
            <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
              {LINKS.map((l, i) => (
                <li key={l.href}>
                  <a
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-3 text-base font-medium text-[#1C1C1C] hover:bg-black/[0.04] dark:text-white dark:hover:bg-white/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CFAE70]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="/Ethan-Hood-Resume.pdf"
                  download
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#CFAE70] px-4 py-3 text-sm font-semibold text-[#1C1C1C]"
                >
                  <Download className="h-4 w-4" strokeWidth={2.25} />
                  Download Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function ThemeToggle({ theme, toggle, reduce }) {
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/[0.08] bg-white/60 text-[#1C1C1C] transition-all duration-200 hover:border-[#CFAE70]/60 hover:bg-white dark:border-white/[0.10] dark:bg-white/[0.04] dark:text-white dark:hover:border-[#CFAE70]/60 dark:hover:bg-white/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CFAE70] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0E0E10]"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={reduce ? { opacity: 0 } : { rotate: -90, opacity: 0, scale: 0.7 }}
          animate={reduce ? { opacity: 1 } : { rotate: 0, opacity: 1, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { rotate: 90, opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex"
        >
          {isDark ? (
            <Moon className="h-[18px] w-[18px] text-[#CFAE70]" strokeWidth={2} />
          ) : (
            <Sun className="h-[18px] w-[18px] text-[#CFAE70]" strokeWidth={2} />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
