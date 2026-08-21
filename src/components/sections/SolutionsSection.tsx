"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Check, MessageSquareQuote } from "lucide-react";
import { solutions } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { DASHBOARDS } from "@/components/visuals/dashboard";
import { cn } from "@/lib/utils";

/**
 * Featured products.
 *
 * A selector rail on the left, and on the right the product's actual dashboard
 * running the full width of the panel — cropped at the fold so it reads as a
 * live screen rather than a picture floating in a box.
 */
export function SolutionsSection() {
  const [active, setActive] = useState(solutions[0].slug);
  const reduce = useReducedMotion();
  const activeIndex = Math.max(
    0,
    solutions.findIndex((s) => s.slug === active),
  );
  const current = solutions[activeIndex];
  const Dashboard = DASHBOARDS[activeIndex % DASHBOARDS.length];

  return (
    <section
      id="solutions"
      className="relative overflow-x-clip border-t border-ink-100 bg-[var(--canvas-subtle)] py-14 sm:py-18 lg:py-22"
    >
      <Container size="wide">
        <SectionHeading
          eyebrow="Products & solutions"
          title={
            <>
              Customer-centric business{" "}
              <span className="text-brand-700">IT solutions</span>
            </>
          }
          description="Tailored platforms that keep organisations agile and responsive — enhancing performance, reducing cost and automating the work that slows teams down."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,18.5rem)_1fr] lg:gap-8">
          {/* ---- Selector rail ---- */}
          <Reveal className="min-w-0">
            <ul className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {solutions.map((s) => {
                const selected = s.slug === active;
                return (
                  <li key={s.slug} className="shrink-0 lg:shrink">
                    <button
                      type="button"
                      onClick={() => setActive(s.slug)}
                      aria-pressed={selected}
                      className={cn(
                        "group relative flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        selected
                          ? "border-brand-200 bg-white shadow-(--shadow-card)"
                          : "border-transparent hover:border-ink-200 hover:bg-white/70",
                      )}
                    >
                      {selected && (
                        <motion.span
                          layoutId="solution-marker"
                          transition={
                            reduce
                              ? { duration: 0 }
                              : { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                          }
                          className="absolute left-0 top-1/2 hidden h-8 w-[3px] -translate-y-1/2 rounded-full bg-brand-600 lg:block"
                        />
                      )}
                      <span
                        className={cn(
                          "flex size-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300",
                          selected
                            ? "bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 text-white shadow-[0_6px_16px_-8px_rgba(174,49,53,0.42)]"
                            : "bg-ink-100 text-ink-600 group-hover:bg-ink-200",
                        )}
                      >
                        <Icon name={s.icon} className="size-[1.05rem]" />
                      </span>
                      <span className="min-w-0">
                        <span
                          className={cn(
                            "block whitespace-nowrap text-[0.92rem] font-semibold transition-colors",
                            selected ? "text-ink-950" : "text-ink-700",
                          )}
                        >
                          {s.name}
                        </span>
                        <span className="hidden text-[0.75rem] text-ink-500 lg:block">
                          {s.category}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* fills the rail's tail and gives the column a job of its own */}
            <div className="mt-4 hidden rounded-2xl border border-ink-200 bg-white p-5 shadow-(--shadow-card) lg:block">
              <span className="flex size-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <MessageSquareQuote className="size-4" aria-hidden />
              </span>
              <p className="mt-3 text-[0.88rem] font-semibold text-ink-950">
                Need something else?
              </p>
              <p className="mt-1.5 text-pretty text-[0.82rem] leading-relaxed text-ink-600">
                Every one of these started as a custom build. Tell us your process and
                we&rsquo;ll scope it.
              </p>
              <Link
                href="/contact"
                className="group mt-4 inline-flex items-center gap-1.5 text-[0.83rem] font-semibold text-brand-700"
              >
                Talk to our team
                <ArrowUpRight
                  aria-hidden
                  className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </Reveal>

          {/* ---- Detail ---- */}
          <Reveal delay={1} className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.article
                key={current.slug}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden rounded-3xl border border-ink-200 bg-white shadow-(--shadow-card)"
              >
                {/* the live screen, running the full width and cropped at the fold */}
                <div className="relative h-[15rem] overflow-hidden border-b border-ink-100 bg-[var(--canvas-subtle)] sm:h-[19rem] lg:h-[21rem]">
                  <div aria-hidden className="absolute inset-0 bg-grid opacity-60" />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(174,49,53,0.1),transparent_58%)]"
                  />
                  <Dashboard className="absolute inset-x-5 top-6 w-[calc(100%-2.5rem)] rounded-t-xl ring-1 ring-ink-200/70 sm:inset-x-8 sm:top-8 sm:w-[calc(100%-4rem)]" />
                </div>

                <div className="p-6 sm:p-8">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-brand-700">
                    {current.category}
                  </p>
                  <h3 className="mt-3 font-display text-[1.7rem] text-ink-950 sm:text-[2rem]">
                    {current.name}
                  </h3>
                  <p className="mt-3 max-w-2xl text-pretty text-[0.98rem] leading-[1.7] text-ink-600">
                    {current.summary}
                  </p>

                  <ul className="mt-7 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                    {current.features.map((f, i) => (
                      <motion.li
                        key={f}
                        initial={reduce ? false : { opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.05 + i * 0.04,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="flex items-start gap-2.5 text-[0.9rem] text-ink-700"
                      >
                        <Check
                          className="mt-0.5 size-4 shrink-0 text-brand-600"
                          aria-hidden
                        />
                        {f}
                      </motion.li>
                    ))}
                  </ul>

                  <Link
                    href={`/solutions#${current.slug}`}
                    className="group mt-8 inline-flex items-center gap-1.5 text-[0.88rem] font-semibold text-brand-700"
                  >
                    <span className="border-b border-transparent transition-colors duration-300 group-hover:border-brand-400">
                      Learn more about {current.name}
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </Link>
                </div>
              </motion.article>
            </AnimatePresence>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
