"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * Magnetic hover. The child drifts toward the cursor within a small radius —
 * used only on primary calls to action, where the extra pull is meaningful.
 * Disabled entirely for reduced-motion and touch.
 */
export function Magnetic({
  children,
  strength = 0.28,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const reduce = useReducedMotion();

  const handleMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (reduce || !ref.current) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    setOffset({
      x: (e.clientX - (rect.left + rect.width / 2)) * strength,
      y: (e.clientY - (rect.top + rect.height / 2)) * strength,
    });
  };

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ display: "inline-flex" }}
      onMouseMove={handleMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      animate={offset}
      transition={{ type: "spring", stiffness: 260, damping: 18, mass: 0.5 }}
    >
      {children}
    </motion.span>
  );
}
