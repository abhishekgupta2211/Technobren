"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus, ArrowUpRight, ShieldCheck } from "lucide-react";
import { faqs, contact } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * Frequently asked.
 *
 * Two columns rather than one long stack: the heading and the escape hatch stay
 * pinned on the left while the questions scroll past on the right, so there is
 * always a way out of the list without scrolling back to the top.
 *
 * One row is open at a time. The row itself is the control — the whole header
 * is the button, not just the icon — and the answer animates its own height, so
 * the list never jumps.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

export function FaqSection() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative overflow-x-clip border-t border-ink-100 bg-[var(--canvas-subtle)] py-14 sm:py-18 lg:py-22">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[10%] top-1/4 size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(174,49,53,0.07),transparent_66%)] blur-3xl"
      />

      <Container size="wide" className="relative">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          {/* ---------- The ask ---------- */}
          <div className="lg:sticky lg:top-28 lg:h-fit lg:self-start">
            <Reveal>
              <p className="flex items-center gap-2.5 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-ink-500">
                <span aria-hidden className="h-px w-5 bg-brand-300" />
                Before you ask
              </p>
            </Reveal>

            <Reveal delay={1}>
              <h2 className="mt-6 text-balance font-display text-[2.2rem] leading-[1.02] text-ink-950 sm:text-[2.7rem]">
                The questions
                <br />
                this raises.
              </h2>
            </Reveal>

            <Reveal delay={2}>
              <p className="mt-2 font-[family-name:var(--font-display)] text-[1.9rem] font-medium italic leading-tight tracking-[-0.015em] text-brand-700 sm:text-[2.2rem]">
                Straight answers.
              </p>
            </Reveal>

            <Reveal delay={3}>
              <div className="mt-9 rounded-2xl border border-ink-200 bg-white p-5 shadow-(--shadow-card)">
                <p className="flex items-start gap-2.5 text-[0.88rem] leading-relaxed text-ink-600">
                  <ShieldCheck
                    className="mt-0.5 size-4 shrink-0 text-brand-600"
                    aria-hidden
                  />
                  Not covered here? Ask us directly — every conversation is under
                  NDA before anything is shared.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-[0.85rem] font-semibold text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-brand-700"
                  >
                    Ask a question
                    <ArrowUpRight
                      aria-hidden
                      className="size-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </Link>
                  <a
                    href={`mailto:${contact.primaryEmail}`}
                    className="text-[0.83rem] font-medium text-ink-600 underline underline-offset-4 transition-colors duration-300 hover:text-brand-700"
                  >
                    {contact.primaryEmail}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ---------- The answers ---------- */}
          <Reveal delay={1}>
            <ul className="overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-(--shadow-card)">
              {faqs.map((f, i) => {
                const isOpen = open === i;
                return (
                  <li
                    key={f.q}
                    className={cn(
                      "group relative border-ink-100 transition-colors duration-500",
                      i > 0 && "border-t",
                      isOpen && "bg-brand-50/30",
                    )}
                  >
                    {/* The brand rule that marks the open row. */}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-y-0 left-0 w-0.5 origin-top bg-gradient-to-b from-brand-500 to-brand-700 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        isOpen ? "scale-y-100" : "scale-y-0",
                      )}
                    />

                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${i}`}
                        className="flex w-full items-center gap-5 px-5 py-5 text-left transition-colors duration-300 sm:px-7 sm:py-6"
                      >
                        <span className="font-mono text-[0.68rem] text-ink-300 transition-colors duration-500 group-hover:text-brand-400">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={cn(
                            "flex-1 text-[0.95rem] font-semibold leading-snug transition-colors duration-300 sm:text-[1.02rem]",
                            isOpen
                              ? "text-brand-800"
                              : "text-ink-900 group-hover:text-brand-700",
                          )}
                        >
                          {f.q}
                        </span>
                        <motion.span
                          aria-hidden
                          animate={{ rotate: isOpen ? 135 : 0 }}
                          transition={
                            reduce ? { duration: 0 } : { duration: 0.4, ease: EASE }
                          }
                          className={cn(
                            "flex size-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-500",
                            isOpen
                              ? "border-brand-600 bg-brand-600 text-white"
                              : "border-ink-200 bg-white text-ink-500 group-hover:border-brand-300 group-hover:text-brand-600",
                          )}
                        >
                          <Plus className="size-4" />
                        </motion.span>
                      </button>
                    </h3>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-panel-${i}`}
                          key="panel"
                          initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                          animate={
                            reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }
                          }
                          exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                          transition={{ duration: reduce ? 0.15 : 0.42, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-6 pl-[3.6rem] pr-12 text-pretty text-[0.9rem] leading-[1.72] text-ink-600 sm:px-7 sm:pl-[4.4rem] sm:pr-16">
                            {f.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
