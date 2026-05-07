import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const Spline = lazy(() => import("@splinetool/react-spline"));

export default function SplineScene() {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const reduce = useReducedMotion();
  const [loaded, setLoaded] = useState(false);

  // Skip on small screens (perf + visual: hero text needs full width on mobile)
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Forward window pointer events to the spline canvas so the scene
  // tracks the cursor across the whole hero, not just the left column.
  useEffect(() => {
    if (!enabled || !loaded || reduce) return;
    const canvas = canvasRef.current?.querySelector("canvas");
    if (!canvas) return;

    const forward = (e) => {
      const rect = canvas.getBoundingClientRect();
      const evt = new PointerEvent("pointermove", {
        clientX: e.clientX,
        clientY: e.clientY,
        screenX: e.screenX,
        screenY: e.screenY,
        bubbles: true,
        cancelable: true,
        pointerType: "mouse",
      });
      // Only forward if mouse is within the hero's vertical band
      const heroEl = wrapRef.current?.closest("section");
      if (heroEl) {
        const hr = heroEl.getBoundingClientRect();
        if (e.clientY < hr.top || e.clientY > hr.bottom) return;
      }
      canvas.dispatchEvent(evt);
      void rect;
    };

    window.addEventListener("pointermove", forward, { passive: true });
    return () => window.removeEventListener("pointermove", forward);
  }, [enabled, loaded, reduce]);

  if (!enabled) return null;

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 left-0 z-0 hidden w-1/2 lg:block"
    >
      <div
        ref={canvasRef}
        className="absolute inset-0 [&_canvas]:!h-full [&_canvas]:!w-full"
      >
        <Suspense fallback={null}>
          <Spline
            scene="/scene.splinecode"
            onLoad={() => setLoaded(true)}
            style={{ width: "100%", height: "100%" }}
          />
        </Suspense>
      </div>
      {/* Soft fade into the right side so the scene blends with the text column */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white to-transparent dark:from-[#0E0E10]"
      />
    </div>
  );
}
