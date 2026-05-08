import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const VIEW_W = 1440;
const VIEW_H = 220;

/**
 * Layered sine waves anchored to the top of the footer. Three paths drift
 * horizontally at different speeds/directions in gold tones. Falls back to
 * static curves under prefers-reduced-motion.
 */
export default function WaveBg() {
  const reduce = useReducedMotion();
  const containerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "100px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const animate = !reduce && visible;

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[220px] overflow-hidden sm:h-[260px]"
    >
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="wave-fade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fff" stopOpacity="0" />
            <stop offset="20%" stopColor="#fff" stopOpacity="1" />
            <stop offset="80%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id="wave-mask">
            <rect width={VIEW_W} height={VIEW_H} fill="url(#wave-fade)" />
          </mask>

          <linearGradient id="wave-stroke-1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#CFAE70" stopOpacity="0.0" />
            <stop offset="50%" stopColor="#CFAE70" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#CFAE70" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="wave-fill-1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#CFAE70" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#CFAE70" stopOpacity="0" />
          </linearGradient>
        </defs>

        <g mask="url(#wave-mask)">
          {/* Back wave — slow, low amplitude, faint fill */}
          <motion.g
            animate={animate ? { x: [0, -VIEW_W] } : { x: 0 }}
            transition={
              animate
                ? { duration: 28, repeat: Infinity, ease: "linear" }
                : { duration: 0 }
            }
          >
            <WaveShape
              y={130}
              amp={26}
              freq={1.6}
              fill="url(#wave-fill-1)"
              stroke="#CFAE70"
              strokeOpacity={0.18}
            />
            <WaveShape
              y={130}
              amp={26}
              freq={1.6}
              fill="url(#wave-fill-1)"
              stroke="#CFAE70"
              strokeOpacity={0.18}
              offsetX={VIEW_W}
            />
          </motion.g>

          {/* Mid wave — medium speed, opposite direction */}
          <motion.g
            animate={animate ? { x: [-VIEW_W, 0] } : { x: 0 }}
            transition={
              animate
                ? { duration: 18, repeat: Infinity, ease: "linear" }
                : { duration: 0 }
            }
          >
            <WaveShape
              y={108}
              amp={34}
              freq={1.2}
              stroke="#CFAE70"
              strokeOpacity={0.32}
              fill="none"
            />
            <WaveShape
              y={108}
              amp={34}
              freq={1.2}
              stroke="#CFAE70"
              strokeOpacity={0.32}
              fill="none"
              offsetX={VIEW_W}
            />
          </motion.g>

          {/* Front wave — fastest, sharpest stroke (gradient-tipped) */}
          <motion.g
            animate={animate ? { x: [0, -VIEW_W] } : { x: 0 }}
            transition={
              animate
                ? { duration: 12, repeat: Infinity, ease: "linear" }
                : { duration: 0 }
            }
          >
            <WaveShape
              y={80}
              amp={22}
              freq={2.2}
              stroke="url(#wave-stroke-1)"
              strokeWidth={1.5}
              fill="none"
            />
            <WaveShape
              y={80}
              amp={22}
              freq={2.2}
              stroke="url(#wave-stroke-1)"
              strokeWidth={1.5}
              fill="none"
              offsetX={VIEW_W}
            />
          </motion.g>
        </g>

        {/* Crisp gold hairline at the very top */}
        <line
          x1="0"
          y1="0.5"
          x2={VIEW_W}
          y2="0.5"
          stroke="#CFAE70"
          strokeOpacity="0.4"
          strokeWidth="1"
          mask="url(#wave-mask)"
        />
      </svg>
    </div>
  );
}

function WaveShape({
  y,
  amp,
  freq,
  stroke,
  strokeOpacity = 1,
  strokeWidth = 1,
  fill,
  offsetX = 0,
}) {
  // Build a smooth sine path across VIEW_W using cubic Bezier segments.
  const segments = 8 * freq;
  const dx = VIEW_W / segments;
  let d = `M ${offsetX} ${y}`;
  for (let i = 0; i < segments; i++) {
    const x0 = offsetX + i * dx;
    const x1 = offsetX + (i + 1) * dx;
    const dir = i % 2 === 0 ? -1 : 1;
    const cx1 = x0 + dx / 2;
    const cy1 = y + dir * amp;
    const cx2 = x0 + dx / 2;
    const cy2 = y + dir * amp;
    d += ` C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x1} ${y}`;
  }
  if (fill && fill !== "none") {
    // close the area down to the bottom
    d += ` L ${offsetX + VIEW_W} ${VIEW_H} L ${offsetX} ${VIEW_H} Z`;
  }
  return (
    <path
      d={d}
      stroke={stroke}
      strokeOpacity={strokeOpacity}
      strokeWidth={strokeWidth}
      fill={fill || "none"}
      strokeLinecap="round"
    />
  );
}
