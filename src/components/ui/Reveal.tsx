"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Stagger index — multiplied by 0.07s */
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "article" | "header" | "figure";
  once?: boolean;
};

/**
 * The site-wide scroll entrance. One component, one easing curve,
 * so every section enters with the same rhythm.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 22,
  as = "div",
  once = true,
}: Props) {
  const reduce = useReducedMotion();

  const variants: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduce ? 0.25 : 0.75,
        delay: reduce ? 0 : delay * 0.07,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-12% 0px -12% 0px" }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}
