"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Shared header for every inner page. One composition, one entrance — so moving
 * between pages feels like moving inside one product rather than between sites.
 */
export function PageHero({
  eyebrow,
  title,
  accent,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  /** Trailing words rendered in the brand gradient. */
  accent?: string;
  description: string;
  children?: React.ReactNode;
}) {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE },
  });

  return (
    <section className="relative overflow-x-clip bg-white pb-10 pt-[6.25rem] sm:pt-[6.75rem] lg:pb-14 lg:pt-[7.25rem]">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="mask-fade absolute inset-0 bg-grid" />
        <div className="animate-bloom absolute -right-[12%] -top-[30%] size-[44rem] rounded-full bg-[radial-gradient(circle,rgba(174,49,53,0.15),rgba(174,49,53,0.04)_46%,transparent_70%)] blur-3xl" />
        <div
          className="animate-bloom absolute -left-[18%] top-[10%] size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(58,57,55,0.05),transparent_66%)] blur-3xl"
          style={{ ["--bloom-duration" as string]: "22s" }}
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-white" />
      </div>

      <Container size="wide" className="relative">
        <motion.nav {...rise(0)} aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-1.5 text-[0.78rem] text-ink-500">
            <li>
              <Link
                href="/"
                className="transition-colors duration-300 hover:text-brand-700"
              >
                Home
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight className="size-3.5 text-ink-400" />
            </li>
            <li className="font-medium text-ink-800" aria-current="page">
              {eyebrow}
            </li>
          </ol>
        </motion.nav>

        <motion.div {...rise(0.06)}>
          <span className="inline-flex items-center gap-2.5 font-mono text-[0.68rem] font-medium uppercase tracking-[0.18em] text-brand-700">
            <span aria-hidden className="h-px w-6 bg-brand-300" />
            {eyebrow}
          </span>
        </motion.div>

        <motion.h1
          {...rise(0.14)}
          className="mt-6 max-w-4xl font-display text-[2.5rem] leading-[1.02] text-ink-950 sm:text-[3.4rem] lg:text-[4.1rem]"
        >
          {title}
          {accent && <span className="text-gradient-brand"> {accent}</span>}
        </motion.h1>

        <motion.p
          {...rise(0.24)}
          className="mt-6 max-w-2xl text-pretty text-[1.05rem] leading-[1.7] text-ink-600"
        >
          {description}
        </motion.p>

        {children && <motion.div {...rise(0.34)}>{children}</motion.div>}
      </Container>
    </section>
  );
}
