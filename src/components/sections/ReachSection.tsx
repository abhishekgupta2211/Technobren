import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { clients, origin, offices } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Reach.
 *
 * A wall of the brands we actually build for, drifting upward behind the
 * headline in three columns at different speeds, faded hard at the edges so the
 * statement stays the thing you read.
 *
 * Deliberately built from real client marks rather than review cards with faces
 * and quotes: we have no permissioned quotes to publish, and inventing them
 * would be the one thing that could undermine a credibility section. Logos we
 * have; those carry it honestly.
 */

/** Three columns, dealt round-robin so each carries a mix of sectors. */
const COLUMNS = [0, 1, 2].map((c) => clients.filter((_, i) => i % 3 === c));

const SPEEDS = ["64s", "82s", "72s"];

export function ReachSection() {
  const countries = new Set(offices.map((o) => o.country)).size;

  return (
    <section className="relative isolate overflow-hidden border-t border-ink-100 bg-white py-16 sm:py-20 lg:py-24">
      {/* ---------- The drifting wall ---------- */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 select-none"
        style={{
          maskImage:
            "radial-gradient(ellipse 78% 62% at 50% 50%, transparent 8%, #000 72%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 78% 62% at 50% 50%, transparent 8%, #000 72%)",
        }}
      >
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="mx-auto grid h-full max-w-[88rem] grid-cols-2 gap-4 px-5 sm:px-8 lg:grid-cols-3">
          {COLUMNS.map((col, ci) => (
            <div
              key={ci}
              className={ci === 2 ? "hidden overflow-hidden lg:block" : "overflow-hidden"}
            >
              <div
                className="animate-marquee-y flex flex-col gap-4"
                style={{
                  ["--marquee-duration" as string]: SPEEDS[ci],
                  animationDirection: ci === 1 ? "reverse" : "normal",
                }}
              >
                {[...col, ...col, ...col].map((c, i) => (
                  <div
                    key={`${c.name}-${i}`}
                    className="flex items-center gap-4 rounded-2xl border border-ink-200/70 bg-white/80 px-5 py-4 shadow-[0_1px_2px_rgba(16,15,20,0.03)]"
                  >
                    <span className="flex h-9 w-20 shrink-0 items-center justify-center">
                      <Image
                        src={c.logo}
                        alt=""
                        width={c.width}
                        height={c.height}
                        className="max-h-9 w-auto max-w-full object-contain opacity-70"
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[0.82rem] font-semibold text-ink-800">
                        {c.name}
                      </span>
                      <span className="block truncate font-mono text-[0.58rem] uppercase tracking-[0.16em] text-ink-400">
                        {c.sector}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- The statement ---------- */}
      <Container size="wide" className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="flex items-center justify-center gap-2.5 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-ink-500">
              <span aria-hidden className="h-px w-5 bg-brand-300" />
              Reach
              <span aria-hidden className="h-px w-5 bg-brand-300" />
            </p>
          </Reveal>

          <Reveal delay={1}>
            <h2 className="mt-6 text-balance font-display text-[2.2rem] leading-[1.04] text-ink-950 sm:text-[3rem]">
              Systems running in
            </h2>
          </Reveal>

          <Reveal delay={2}>
            <p className="mt-1 font-[family-name:var(--font-display)] text-[2.6rem] font-semibold italic leading-tight tracking-[-0.02em] sm:text-[3.4rem]">
              <span className="text-gradient-brand">
                {origin.countriesServed}+ countries.
              </span>
            </p>
          </Reveal>

          <Reveal delay={3}>
            <p className="mx-auto mt-6 max-w-lg text-pretty text-[0.98rem] leading-[1.7] text-ink-600">
              {clients.length} brands across FMCG, payments and education run
              day-to-day operations on platforms we built — supported from{" "}
              {offices.length} offices in {countries} countries, around the clock.
            </p>
          </Reveal>

          <Reveal delay={3}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/work"
                className="group inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3.5 text-[0.9rem] font-semibold text-white shadow-[0_1px_2px_rgba(174,49,53,0.22),0_10px_24px_-12px_rgba(174,49,53,0.6)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-brand-700"
              >
                See the work
                <ArrowUpRight
                  aria-hidden
                  className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white/90 px-6 py-3.5 text-[0.9rem] font-semibold text-ink-800 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700"
              >
                Talk to us
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
