import { useEffect, useRef, useState } from "react";

export default function CursorGlow() {
  const orbRef = useRef(null);
  const trailRef = useRef(null);
  const target = useRef({ x: -200, y: -200 });
  const orb = useRef({ x: -200, y: -200 });
  const trail = useRef({ x: -200, y: -200 });
  const raf = useRef(0);
  const [active, setActive] = useState(false);
  const [overHeader, setOverHeader] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const onMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!active) setActive(true);

      const el = document.elementFromPoint(e.clientX, e.clientY);
      const inHeader = !!el?.closest("header");
      setOverHeader((prev) => (prev !== inHeader ? inHeader : prev));
    };
    const onLeave = () => setActive(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    const tick = () => {
      // Orb: tight spring
      orb.current.x += (target.current.x - orb.current.x) * 0.22;
      orb.current.y += (target.current.y - orb.current.y) * 0.22;
      // Trail: looser, lags behind for "comet" effect
      trail.current.x += (target.current.x - trail.current.x) * 0.09;
      trail.current.y += (target.current.y - trail.current.y) * 0.09;

      if (orbRef.current) {
        orbRef.current.style.transform = `translate3d(${orb.current.x}px, ${orb.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${trail.current.x}px, ${trail.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      cancelAnimationFrame(raf.current);
    };
  }, [active]);

  // Toggle a global class so the navbar can react via CSS without prop drilling.
  useEffect(() => {
    const root = document.documentElement;
    if (overHeader) root.classList.add("cursor-over-header");
    else root.classList.remove("cursor-over-header");
    return () => root.classList.remove("cursor-over-header");
  }, [overHeader]);

  const baseColor = overHeader ? "59,130,246" : "207,174,112"; // blue-500 / brand gold
  const scale = pressed ? 0.7 : overHeader ? 1.35 : 1;
  const opacity = active ? 1 : 0;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] hidden md:block"
      style={{ contain: "layout paint size" }}
    >
      {/* Soft outer halo (lags behind) */}
      <div
        ref={trailRef}
        className="absolute left-0 top-0 h-[280px] w-[280px] rounded-full transition-[opacity,background] duration-300 ease-out will-change-transform"
        style={{
          opacity: opacity * 0.55,
          background: `radial-gradient(circle, rgba(${baseColor},0.22) 0%, rgba(${baseColor},0.08) 40%, rgba(${baseColor},0) 70%)`,
          filter: "blur(8px)",
        }}
      />
      {/* Crisp inner orb */}
      <div
        ref={orbRef}
        className="absolute left-0 top-0 rounded-full transition-[opacity,background,box-shadow,width,height] duration-300 ease-out will-change-transform"
        style={{
          opacity,
          width: overHeader ? 44 : 22,
          height: overHeader ? 44 : 22,
          transform: `translate3d(-200px,-200px,0) scale(${scale})`,
          background: `radial-gradient(circle, rgba(${baseColor},0.95) 0%, rgba(${baseColor},0.35) 60%, rgba(${baseColor},0) 100%)`,
          boxShadow: overHeader
            ? `0 0 24px 4px rgba(${baseColor},0.55), 0 0 60px 10px rgba(${baseColor},0.25)`
            : `0 0 16px 2px rgba(${baseColor},0.45)`,
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}
