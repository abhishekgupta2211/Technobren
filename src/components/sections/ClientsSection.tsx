import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { clients } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

/**
 * The client wall.
 *
 * Built on the hairline-grid pattern the site already uses for its stat rows
 * (`gap-px` over an ink background, white cells) rather than as floating cards.
 * Three reasons: every cell is guaranteed the same size, which is what makes a
 * logo wall read as deliberate; there is no ragged last row; and it carries the
 * same institutional weight as the milestone tables, which is the right register
 * for a credibility section.
 *
 * The grid is two columns on a phone and four from lg, and a closing
 * invitation cell is only added when the logo count would otherwise leave a
 * ragged last row — so the wall stays perfectly filled as clients are added.
 *
 * Logo artwork is pre-processed — background knocked out, trimmed to its ink and
 * optically balanced so a wide wordmark does not overpower a square mark. See
 * `public/clients/`. Colours are left exactly as supplied.
 */
export function ClientsSection({
  className,
  eyebrow = "Clients",
  title,
  description = "Brands across FMCG, payments and education run day-to-day operations on platforms we designed, built and deployed.",
  moreHref = "/work",
  moreLabel = "View all projects",
}: {
  className?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  description?: string;
  /** Pass null on a page that would otherwise link to itself. */
  moreHref?: string | null;
  moreLabel?: string;
}) {
  return (
    <section
      className={cn(
        "border-t border-ink-100 bg-[var(--canvas-subtle)] py-14 sm:py-18 lg:py-22",
        className,
      )}
    >
      <Container size="wide">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={eyebrow}
            title={
              title ?? (
                <>
                  The brands that{" "}
                  <span className="text-brand-700">build on our systems</span>
                </>
              )
            }
            description={description}
          />
          <Reveal delay={2} className="shrink-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink-600 shadow-(--shadow-card)">
              <span aria-hidden className="size-1.5 rounded-full bg-brand-500" />
              {clients.length} brands
            </span>
          </Reveal>
        </div>

        <Reveal delay={1}>
          <ul className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-200 bg-ink-200 shadow-(--shadow-card) lg:grid-cols-4">
            {clients.map((c) => (
              <li
                key={c.name}
                className="group relative flex flex-col items-center justify-between gap-4 bg-white px-5 py-7 transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-brand-50/40 sm:px-6 sm:py-8"
              >
                {/* The logo's arc, sweeping in behind the cell on hover. */}
                <svg
                  aria-hidden
                  viewBox="0 0 200 200"
                  fill="none"
                  className="pointer-events-none absolute -right-12 -top-14 size-40 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                >
                  <path
                    d="M8 168C8 80 80 8 168 8"
                    stroke="#ae3135"
                    strokeOpacity="0.16"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <circle cx="168" cy="8" r="4" fill="#ae3135" fillOpacity="0.4" />
                </svg>

                {/* Fixed-height stage, so every mark is centred on one baseline
                    whatever its own proportions are. */}
                <div className="relative flex h-14 w-full items-center justify-center">
                  <Image
                    src={c.logo}
                    alt={`${c.name} logo`}
                    width={c.width}
                    height={c.height}
                    className={cn(
                      "max-h-14 w-auto max-w-full object-contain transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]",
                      // A reversed lockup brings its own background plate; round
                      // it so it sits with the rest of the design language.
                      c.plate && "rounded-lg",
                    )}
                  />
                </div>

                {/* Fixed two-line box: a wrapping sector label must not make
                    its cell taller than the rest of the row. */}
                <p className="relative flex min-h-[2.1rem] items-center text-center font-mono text-[0.6rem] uppercase leading-[1.5] tracking-[0.16em] text-ink-400 transition-colors duration-500 group-hover:text-brand-700">
                  {c.sector}
                </p>
              </li>
            ))}

            {/* Only rendered when the logos would otherwise leave a gap. */}
            {clients.length % 4 !== 0 && (
            <li className="group bg-white transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-brand-50/40">
              <Link
                href="/contact"
                className="flex h-full flex-col items-center justify-center gap-2 px-5 py-7 text-center sm:px-6 sm:py-8"
              >
                <span className="flex items-center gap-1.5 font-display text-[0.98rem] leading-snug text-ink-900 transition-colors duration-300 group-hover:text-brand-800">
                  Start your project
                  <ArrowUpRight
                    aria-hidden
                    className="size-3.5 text-brand-600 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink-400">
                  Every engagement under NDA
                </span>
              </Link>
            </li>
            )}
          </ul>
        </Reveal>

        {moreHref && (
          <Reveal delay={2}>
            <div className="mt-7 flex justify-center">
              <Link
                href={moreHref}
                className="group inline-flex items-center gap-2.5 rounded-full border border-ink-200 bg-white px-6 py-3 text-[0.88rem] font-semibold text-ink-800 shadow-(--shadow-card) transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700 hover:shadow-(--shadow-card-hover)"
              >
                {moreLabel}
                <ArrowUpRight
                  aria-hidden
                  className="size-4 text-brand-600 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
