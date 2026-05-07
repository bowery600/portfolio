import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function TickerNumber({ value, className = "" }) {
  const reduce = useReducedMotion();
  const elementRef = useRef(null);
  const animationStartedRef = useRef(false);

  const numericMatch = value.match(/[\d.]+/);
  const hasNumeric = numericMatch !== null;
  const numericPart = hasNumeric ? parseFloat(numericMatch[0]) : 0;
  const prefix = hasNumeric ? value.substring(0, numericMatch.index) : "";
  const suffix = hasNumeric
    ? value.substring(numericMatch.index + numericMatch[0].length)
    : "";
  const decimalPlaces = hasNumeric
    ? numericMatch[0].split(".")[1]?.length || 0
    : 0;

  const format = (n) =>
    prefix + (decimalPlaces > 0 ? n.toFixed(decimalPlaces) : Math.round(n)) + suffix;

  const [displayValue, setDisplayValue] = useState(
    hasNumeric && !reduce ? format(0) : value
  );
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!hasNumeric || !isInView || animationStartedRef.current) return;
    animationStartedRef.current = true;

    if (reduce) {
      setDisplayValue(value);
      return;
    }

    const duration = 2;
    const startTime = Date.now();
    let animationId;

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuad = 1 - Math.pow(1 - progress, 2);
      setDisplayValue(format(numericPart * easeOutQuad));

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [hasNumeric, numericPart, isInView, prefix, suffix, value, reduce, decimalPlaces]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animationStartedRef.current) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <motion.span
      ref={elementRef}
      className={`tabular-nums ${className}`}
      initial={{ opacity: 0, y: 4 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {displayValue}
    </motion.span>
  );
}
