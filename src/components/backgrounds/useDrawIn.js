import { useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

export function useDrawIn({ duration = 1.1, delay = 0 } = {}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return {
      initial: { pathLength: 1, opacity: 1 },
      animate: { pathLength: 1, opacity: 1 },
      transition: { duration: 0 },
    };
  }

  return {
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, margin: "-15% 0px" },
    transition: { duration, ease, delay },
  };
}

export const drawEase = ease;
