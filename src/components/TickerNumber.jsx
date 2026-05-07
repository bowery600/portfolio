import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function TickerNumber({ value, className = "" }) {
  const [displayValue, setDisplayValue] = useState(value);
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef(null);
  const animationStartedRef = useRef(false);

  // Extract numeric parts from the value string
  const numericMatch = value.match(/[\d.]+/);
  const hasNumeric = numericMatch !== null;
  const numericPart = numericMatch ? parseFloat(numericMatch[0]) : 0;
  const prefix = value.substring(0, numericMatch?.index || 0);
  const suffix = value.substring((numericMatch?.index || 0) + (numericMatch?.[0].length || 0));

  useEffect(() => {
    if (!hasNumeric || !isInView || animationStartedRef.current) return;

    animationStartedRef.current = true;
    const duration = 2; // seconds
    const startTime = Date.now();
    let animationId;

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuad = 1 - Math.pow(1 - progress, 2);
      const currentValue = numericPart * easeOutQuad;

      // Format the number based on the original format
      let formatted;
      if (value.includes("%")) {
        formatted = Math.round(currentValue) + "%";
      } else if (value.includes("$")) {
        formatted = "$" + Math.round(currentValue) + "K";
      } else if (value.includes("/")) {
        // For GPA format like 3.94/4.00
        const decimalPlaces = numericMatch[0].split(".")[1]?.length || 0;
        formatted = currentValue.toFixed(decimalPlaces) + suffix;
      } else if (value.includes("+") || value.includes("−")) {
        formatted = (prefix ? prefix : "+") + Math.round(currentValue) + "%";
      } else {
        formatted = Math.round(currentValue) + suffix;
      }

      setDisplayValue(prefix + formatted);

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [hasNumeric, numericPart, isInView, prefix, suffix, value]);

  // Setup intersection observer to trigger animation when in view
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
      className={className}
      initial={{ opacity: 0, y: 4 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {displayValue}
    </motion.span>
  );
}
