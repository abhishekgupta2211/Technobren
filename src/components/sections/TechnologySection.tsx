"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { techCategories } from "@/lib/site";
import { getTechLogo } from "@/lib/techLogos";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/**
 * Technology expertise.
 *
 * The whole stack is on screen at once, drifting past in three lanes, rather
 * than hidden behind tabs. Two levels of interaction:
 *
 * - Pointing at a discipline narrows the lanes to it immediately — hover Mobile
 *   and the lanes carry the mobile stack and nothing else.
 * - Clicking pins that choice, so it survives the pointer leaving. Clicking
 *   again (or "Show all") releases it.
 */
export function TechnologySection() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  // A pin outranks a hover, so the lit category never flickers while pinned.
  const active = pinned ?? hovered;
  const reduce = useReducedMotion();

  // Flatten the stack, then deal it into three lanes so each row is a mix of
  // disciplines rather than one category per line.
  const lanes = useMemo(() => {
    const source = active
      ? techCategories.filter((c) => c.name === active)
      : techCategories;
    const flat = source.flatMap((c) =>
      c.items.map((item) => ({ item, category: c.name })),
    );
    // A single discipline has too few items to fill three lanes, so it runs as
    // one lane rather than three sparse ones.
    const laneCount = active ? 1 : 3;
    const out: { item: string; category: string }[][] = Array.from(
      { length: laneCount },
      () => [],
    );
    flat.forEach((entry, i) => out[i % laneCount].push(entry));
    return out;
  }, [active]);

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
              const isPinned = pinned === c.name;
              return (
                <button
                  key={c.name}
                  type="button"
                  onMouseEnter={() => setHovered(c.name)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(c.name)}
                  onBlur={() => setHovered(null)}
                  onClick={() => setPinned(isPinned ? null : c.name)}
                  aria-pressed={isPinned}
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

            {pinned && (
              <motion.button
                type="button"
                initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setPinned(null)}
                className="inline-flex items-center gap-1.5 rounded-full border border-ink-300 border-dashed bg-white px-4 py-2.5 text-[0.83rem] font-medium text-ink-600 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700"
              >
                <X className="size-3.5" aria-hidden />
                Show all
              </motion.button>
            )}
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
                    {[...lane, ...lane].map(({ item }, i) => {
                      const lit = active !== null;
                      const logoUrl = getTechLogo(item);

                      return (
                        <span
                          key={`${item}-${i}`}
                          className={cn(
                            "flex shrink-0 items-center gap-2.5 rounded-xl border bg-white px-3.5 py-2.5 text-[0.85rem] font-semibold transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-2xs hover:scale-105",
                            lit &&
                              "border-brand-500 text-brand-900 bg-brand-50/60 shadow-[0_5px_14px_-10px_rgba(174,49,53,0.4)]",
                            !lit && "border-ink-200 text-ink-800 hover:border-brand-300",
                          )}
                        >
                          {logoUrl ? (
                            <img
                              src={logoUrl}
                              alt={item}
                              className="size-4 shrink-0 object-contain"
                            />
                          ) : (
                            <span
                              aria-hidden
                              className={cn(
                                "size-1.5 shrink-0 rounded-full transition-colors duration-500",
                                lit ? "bg-brand-600" : "bg-brand-400",
                              )}
                            />
                          )}
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

      </Container>
    </section>
  );
}
