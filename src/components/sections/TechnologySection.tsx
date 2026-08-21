"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { techCategories } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/**
 * Technology expertise.
 *
 * The whole stack is on screen at once, drifting past in three lanes, rather
 * than hidden behind tabs. Pointing at a discipline in the legend lights up only
 * that discipline's technologies in the lanes — so the section answers "what do
 * you work with" and "how is it organised" in a single glance, without a click.
 */
export function TechnologySection() {
  const [active, setActive] = useState<string | null>(null);
  const reduce = useReducedMotion();

  // Flatten the stack, then deal it into three lanes so each row is a mix of
  // disciplines rather than one category per line.
  const lanes = useMemo(() => {
    const flat = techCategories.flatMap((c) =>
      c.items.map((item) => ({ item, category: c.name })),
    );
    const out: { item: string; category: string }[][] = [[], [], []];
    flat.forEach((entry, i) => out[i % 3].push(entry));
    return out;
  }, []);

  const total = techCategories.reduce((n, c) => n + c.items.length, 0);

  return (
    <section className="relative overflow-x-clip border-t border-ink-100 bg-white py-14 sm:py-18 lg:py-22">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[10%] top-0 size-[38rem] rounded-full bg-[radial-gradient(circle,rgba(174,49,53,0.08),transparent_66%)] blur-3xl"
      />

      <Container size="wide" className="relative">
        <SectionHeading
          eyebrow="Technology expertise"
          title={
            <>
              Building world-class solutions on a{" "}
              <span className="text-brand-700">proven stack</span>
            </>
          }
          description="We design, develop and deploy enterprise-grade applications using the languages, frameworks and infrastructure best suited to the problem — not to fashion."
          aside={
            <Button href="/technology" variant="secondary" arrow>
              Full technology stack
            </Button>
          }
        />

        {/* ---- Discipline legend ---- */}
        <Reveal delay={1} className="mt-9">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="mr-1 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink-500">
              {total} technologies
            </span>
            {techCategories.map((c) => {
              const on = active === c.name;
              return (
                <button
                  key={c.name}
                  type="button"
                  onMouseEnter={() => setActive(c.name)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(c.name)}
                  onBlur={() => setActive(null)}
                  onClick={() => setActive(on ? null : c.name)}
                  aria-pressed={on}
                  className={cn(
                    "group inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[0.83rem] font-medium transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    on
                      ? "-translate-y-0.5 border-brand-600 bg-brand-600 text-white shadow-[0_6px_16px_-9px_rgba(174,49,53,0.45)]"
                      : "border-ink-200 bg-white text-ink-700 hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700",
                  )}
                >
                  {c.name}
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-px font-mono text-[0.62rem] transition-colors duration-300",
                      on ? "bg-white/20 text-white" : "bg-ink-100 text-ink-600",
                    )}
                  >
                    {c.items.length}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* ---- The stack, drifting ---- */}
        <Reveal delay={2} className="mt-8">
          <div className="relative overflow-hidden rounded-3xl border border-ink-200/80 bg-[var(--canvas-subtle)] py-8 shadow-(--shadow-card)">
            <div aria-hidden className="absolute inset-0 bg-grid opacity-60" />

            <div className="relative space-y-3.5">
              {lanes.map((lane, laneIndex) => (
                <div
                  key={laneIndex}
                  className="marquee-host mask-edges flex overflow-hidden"
                >
                  <div
                    className={cn("flex shrink-0 items-center gap-3", {
                      "animate-marquee": !reduce,
                    })}
                    style={{
                      ["--marquee-duration" as string]: `${52 + laneIndex * 9}s`,
                      animationDirection: laneIndex === 1 ? "reverse" : "normal",
                    }}
                  >
                    {[...lane, ...lane].map(({ item, category }, i) => {
                      const dim = active !== null && active !== category;
                      const lit = active !== null && active === category;
                      return (
                        <span
                          key={`${item}-${i}`}
                          className={cn(
                            "flex shrink-0 items-center gap-2.5 rounded-xl border bg-white px-4 py-2.5 text-[0.85rem] font-medium transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                            lit &&
                              "border-brand-300 text-brand-800 shadow-[0_5px_14px_-10px_rgba(174,49,53,0.4)]",
                            dim && "border-ink-200/60 text-ink-500 opacity-40",
                            !lit && !dim && "border-ink-200 text-ink-700",
                          )}
                        >
                          <span
                            aria-hidden
                            className={cn(
                              "size-1.5 shrink-0 rounded-full transition-colors duration-500",
                              lit ? "bg-brand-600" : "bg-brand-400",
                            )}
                          />
                          {item}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ---- Discipline detail ---- */}
        <Reveal delay={3} className="mt-6">
          <motion.p
            key={active ?? "all"}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-center text-[0.9rem] text-ink-600"
          >
            {active
              ? techCategories.find((c) => c.name === active)?.blurb
              : "Point at a discipline to see what we build with it."}
          </motion.p>
        </Reveal>
      </Container>
    </section>
  );
}
