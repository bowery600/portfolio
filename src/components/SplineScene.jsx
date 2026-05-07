import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const Spline = lazy(() => import("@splinetool/react-spline"));

export default function SplineScene({
  scene = "/scene.splinecode",
  side = "left",
  shiftClass = "",
  zClass = "z-0",
  onReady,
}) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const reduce = useReducedMotion();
  const [loaded, setLoaded] = useState(false);

  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled || !loaded || reduce) return;
    const canvas = canvasRef.current?.querySelector("canvas");
    if (!canvas) return;

    const forward = (e) => {
      const evt = new PointerEvent("pointermove", {
        clientX: e.clientX,
        clientY: e.clientY,
        screenX: e.screenX,
        screenY: e.screenY,
        bubbles: true,
        cancelable: true,
        pointerType: "mouse",
      });
      const heroEl = wrapRef.current?.closest("section");
      if (heroEl) {
        const hr = heroEl.getBoundingClientRect();
        if (e.clientY < hr.top || e.clientY > hr.bottom) return;
      }
      canvas.dispatchEvent(evt);
    };

    window.addEventListener("pointermove", forward, { passive: true });
    return () => window.removeEventListener("pointermove", forward);
  }, [enabled, loaded, reduce]);

  if (side !== "full" && !enabled) return null;

  if (side === "full") {
    return (
      <div
        ref={wrapRef}
        aria-hidden="true"
        style={{ zIndex: 0 }}
        className={`pointer-events-none absolute inset-0 ${shiftClass}`}
      >
        <div
          ref={canvasRef}
          className="absolute inset-0 [&_canvas]:!h-full [&_canvas]:!w-full"
        >
          <Suspense fallback={null}>
            <Spline
              scene={scene}
              onLoad={() => {
              setLoaded(true);
              onReady?.();
            }}
              style={{ width: "100%", height: "100%" }}
            />
          </Suspense>
        </div>
      </div>
    );
  }

  const sideClass =
    side === "right"
      ? "right-0 [&>div:last-child]:left-0 [&>div:last-child]:right-auto"
      : "left-0";

  const fadeDir =
    side === "right"
      ? "bg-gradient-to-r from-white to-transparent dark:from-[#0E0E10]"
      : "bg-gradient-to-l from-white to-transparent dark:from-[#0E0E10]";

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      style={{ zIndex: 1 }}
      className={`pointer-events-none absolute inset-y-0 hidden w-1/2 lg:block ${sideClass} ${shiftClass}`}
    >
      <div
        ref={canvasRef}
        className="absolute inset-0 [&_canvas]:!h-full [&_canvas]:!w-full"
      >
        <Suspense fallback={null}>
          <Spline
            scene={scene}
            onLoad={() => {
              setLoaded(true);
              onReady?.();
            }}
            style={{ width: "100%", height: "100%" }}
          />
        </Suspense>
      </div>
      <div
        className={`pointer-events-none absolute inset-y-0 ${
          side === "right" ? "left-0" : "right-0"
        } w-1/3 ${fadeDir}`}
      />
    </div>
  );
}
