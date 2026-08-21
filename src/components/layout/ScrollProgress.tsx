"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";

/** A hairline reading-progress bar pinned under the navbar. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 34,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[55] h-[2px] origin-left bg-gradient-to-r from-brand-700 via-brand-500 to-brand-400 opacity-70"
      style={{ scaleX: reduce ? scrollYProgress : scaleX }}
    />
  );
}
