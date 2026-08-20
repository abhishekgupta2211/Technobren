"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { processSteps } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * How we work.
 *
 * The left column pins while the stages scroll past it, and an observer keeps it
 * in sync with whichever stage is centred — so the previously empty half of the
 * screen becomes a live readout of where you are, drawn as the logo's arc
 * closing around the stage number.
 */
export function ProcessSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const reduce = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // The stage nearest the middle of the viewport wins.
        const centred = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (!centred) return;
        const index = Number((centred.target as HTMLElement).dataset.index);
        if (!Number.isNaN(index)) setActiveIndex(index);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    const nodes = stepRefs.current.filter(Boolean) as HTMLLIElement[];
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  const active = processSteps[activeIndex];
  const progress = (activeIndex + 1) / processSteps.length;

  return (
    <section className="relative overflow-x-clip border-t border-ink-100 bg-white py-14 sm:py-18 lg:py-22">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[12%] top-[20%] size-[36rem] rounded-full bg-[radial-gradient(circle,rgba(174,49,53,0.07),transparent_66%)] blur-3xl"
      />

      <Container size="wide" className="relative">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* ---------- Pinned readout ---------- */}
          <div className="lg:sticky lg:top-28 lg:h-fit lg:self-start">
            <SectionHeading
              eyebrow="Our process"
              title={
                <>
                  From first conversation to{" "}
                  <span className="text-brand-700">long-term support</span>
                </>
              }
              description="A methodology built to remove surprises. You see progress every cycle, and you own everything we build."
            />

            <Reveal delay={3}>
              <div className="mt-9 overflow-hidden rounded-3xl border border-ink-200/80 bg-[var(--canvas-subtle)] shadow-(--shadow-card)">
                <div className="flex items-center gap-6 p-6 sm:p-7">
                  {/* Progress dial — the logo's arc, closing as you descend */}
                  <div className="relative size-32 shrink-0">
                    <svg viewBox="0 0 128 128" className="size-full -rotate-90">
                      <defs>
                        <linearGradient id="process-arc" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#d05056" />
                          <stop offset="100%" stopColor="#932a2e" />
                        </linearGradient>
                      </defs>
                      <circle
                        cx="64"
                        cy="64"
                        r={RADIUS}
                        fill="none"
                        stroke="#e9e7e4"
                        strokeWidth="3"
                      />
                      <motion.circle
                        cx="64"
                        cy="64"
                        r={RADIUS}
                        fill="none"
                        stroke="url(#process-arc)"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeDasharray={CIRCUMFERENCE}
                        initial={false}
                        animate={{ strokeDashoffset: CIRCUMFERENCE * (1 - progress) }}
                        transition={{
                          duration: reduce ? 0 : 0.7,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      />
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={active.id}
                          initial={reduce ? false : { opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                          className="font-display text-[1.9rem] leading-none text-ink-950"
                        >
                          {active.id}
                        </motion.span>
                      </AnimatePresence>
                      <span className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink-500">
                        of {String(processSteps.length).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  <div className="min-w-0">
                    <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-brand-700">
                      Current stage
                    </p>
                    <AnimatePresence mode="wait">
                      <motion.h3
                        key={active.title}
                        initial={reduce ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-2 font-display text-[1.5rem] leading-tight text-ink-950"
                      >
                        {active.title}
                      </motion.h3>
                    </AnimatePresence>
                    <p className="mt-2 text-[0.82rem] text-ink-600">
                      {active.deliverables.length} deliverables
                    </p>
                  </div>
                </div>

                {/* Stage rail */}
                <ol className="flex gap-1 border-t border-ink-200 bg-white p-3">
                  {processSteps.map((step, i) => (
                    <li key={step.id} className="min-w-0 flex-1">
                      <span
                        className={cn(
                          "block h-1 rounded-full transition-colors duration-500",
                          i <= activeIndex ? "bg-brand-600" : "bg-ink-200",
                        )}
                      />
                      <span
                        className={cn(
                          "mt-2 block truncate text-center font-mono text-[0.58rem] uppercase tracking-wider transition-colors duration-500",
                          i === activeIndex ? "text-brand-700" : "text-ink-500",
                        )}
                      >
                        {step.title}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            <Reveal delay={4}>
              <Button href="/methodology" variant="secondary" arrow className="mt-8">
                How we engage
              </Button>
            </Reveal>
          </div>

          {/* ---------- Scrolling stages ---------- */}
          <ol className="relative space-y-4">
            {processSteps.map((step, i) => {
              const on = i === activeIndex;
              return (
                <li
                  key={step.id}
                  data-index={i}
                  ref={(el) => {
                    stepRefs.current[i] = el;
                  }}
                >
                  <Reveal delay={i % 3}>
                    <article
                      className={cn(
                        "relative overflow-hidden rounded-3xl border p-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:p-8",
                        on
                          ? "border-brand-200 bg-white shadow-(--shadow-card-hover)"
                          : "border-ink-200/80 bg-[var(--canvas-subtle)]",
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-y-0 left-0 w-[3px] origin-top bg-gradient-to-b from-brand-500 to-brand-700 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                          on ? "scale-y-100" : "scale-y-0",
                        )}
                      />

                      <div className="flex items-baseline gap-4">
                        <span
                          className={cn(
                            "font-display text-[2rem] leading-none transition-colors duration-500",
                            on ? "text-brand-600" : "text-ink-200",
                          )}
                        >
                          {step.id}
                        </span>
                        <h3 className="font-display text-[1.35rem] text-ink-950 sm:text-[1.5rem]">
                          {step.title}
                        </h3>
                      </div>

                      <p className="mt-4 max-w-xl text-pretty text-[0.94rem] leading-[1.7] text-ink-600">
                        {step.description}
                      </p>

                      <ul className="mt-5 flex flex-wrap gap-2">
                        {step.deliverables.map((d) => (
                          <li
                            key={d}
                            className={cn(
                              "rounded-lg border px-3 py-1.5 text-[0.76rem] font-medium transition-colors duration-500",
                              on
                                ? "border-brand-200 bg-brand-50 text-brand-800"
                                : "border-ink-200 bg-white text-ink-600",
                            )}
                          >
                            {d}
                          </li>
                        ))}
                      </ul>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
