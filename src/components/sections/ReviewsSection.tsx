import { Star, Quote } from "lucide-react";
import { reviews, stats, clients } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CountryMark } from "@/components/ui/CountryMark";
import { cn } from "@/lib/utils";

/**
 * Reviews.
 *
 * Renders nothing until `reviews` in lib/site.ts has entries. That is
 * deliberate: an empty wall is better than a wall of invented praise, and this
 * site already carries fabricated testimonials that need removing rather than
 * company.
 *
 * The layout is a sticky summary beside a drifting wall — two columns of cards
 * rising at different speeds, masked top and bottom so the wall reads as
 * continuing beyond the frame rather than starting and stopping. Faces are
 * monograms, not stock photography.
 */

/** Average of what has actually been published, not a claimed figure. */
function average(list: typeof reviews) {
  if (list.length === 0) return 0;
  return list.reduce((n, r) => n + r.rating, 0) / list.length;
}

function Stars({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn("flex items-center gap-0.5", className)} aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          className={cn(
            "size-3.5",
            i < Math.round(value)
              ? "fill-brand-500 text-brand-500"
              : "fill-ink-200 text-ink-200",
          )}
        />
      ))}
    </span>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function ReviewCard({ r }: { r: (typeof reviews)[number] }) {
  return (
    <figure className="group relative overflow-hidden rounded-2xl border border-ink-200/80 bg-white p-5 shadow-(--shadow-card) transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-(--shadow-card-hover)">
      <Quote
        aria-hidden
        className="pointer-events-none absolute -right-2 -top-1 size-14 text-brand-50 transition-colors duration-500 group-hover:text-brand-100"
      />

      <div className="relative flex items-center justify-between gap-3">
        <Stars value={r.rating} />
        {r.source && (
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-ink-400">
            {r.source}
          </span>
        )}
      </div>

      <blockquote className="relative mt-3 text-pretty text-[0.88rem] leading-[1.65] text-ink-700">
        {r.body}
      </blockquote>

      <figcaption className="relative mt-4 flex items-center gap-3 border-t border-ink-100 pt-4">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 font-display text-[0.72rem] text-white">
          {initials(r.name)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[0.83rem] font-semibold text-ink-950">
            {r.name}
          </span>
          <span className="block truncate font-mono text-[0.58rem] uppercase tracking-[0.14em] text-ink-400">
            {[r.role, r.company].filter(Boolean).join(" · ") || r.date}
          </span>
        </span>
        {r.country && <CountryMark country={r.country} className="size-5 shrink-0" />}
      </figcaption>
    </figure>
  );
}

export function ReviewsSection() {
  // Nothing to show, nothing to invent.
  if (reviews.length === 0) return null;

  const avg = average(reviews);
  const satisfaction = stats.find((s) => s.label === "Satisfaction rate");
  const clientsServed = stats.find((s) => s.label === "Clients served");

  // Dealt into two columns so each drifts independently.
  const columns = [0, 1].map((c) => reviews.filter((_, i) => i % 2 === c));

  return (
    <section className="relative overflow-hidden border-t border-ink-100 bg-[var(--canvas-subtle)] py-14 sm:py-18 lg:py-22">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[10%] top-1/4 size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(174,49,53,0.07),transparent_66%)] blur-3xl"
      />

      <Container size="wide" className="relative">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          {/* ---------- Summary ---------- */}
          <div className="lg:sticky lg:top-28 lg:h-fit lg:self-start">
            <Reveal>
              <p className="flex items-center gap-2.5 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-ink-500">
                <span aria-hidden className="h-px w-5 bg-brand-300" />
                In their words
              </p>
            </Reveal>

            <Reveal delay={1}>
              <h2 className="mt-6 text-balance font-display text-[2.1rem] leading-[1.04] text-ink-950 sm:text-[2.6rem]">
                What the people who{" "}
                <span className="text-brand-700">run these systems</span> say.
              </h2>
            </Reveal>

            <Reveal delay={2}>
              <div className="mt-8 rounded-2xl border border-ink-200 bg-white p-6 shadow-(--shadow-card)">
                <div className="flex items-end gap-3">
                  <span className="font-display text-[3rem] leading-none text-brand-700">
                    {avg.toFixed(1)}
                  </span>
                  <span className="pb-1.5">
                    <Stars value={avg} />
                    <span className="mt-1.5 block font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink-500">
                      {reviews.length} review{reviews.length === 1 ? "" : "s"}
                    </span>
                  </span>
                </div>

                <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-ink-200 bg-ink-200">
                  <div className="bg-white px-4 py-3.5">
                    <dt className="font-display text-[1.4rem] leading-none text-ink-950">
                      {satisfaction ? `${satisfaction.value}${satisfaction.suffix}` : "—"}
                    </dt>
                    <dd className="mt-1.5 font-mono text-[0.56rem] uppercase tracking-[0.14em] text-ink-500">
                      Satisfaction
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-3.5">
                    <dt className="font-display text-[1.4rem] leading-none text-ink-950">
                      {clientsServed
                        ? `${clientsServed.value}${clientsServed.suffix}`
                        : clients.length}
                    </dt>
                    <dd className="mt-1.5 font-mono text-[0.56rem] uppercase tracking-[0.14em] text-ink-500">
                      Clients
                    </dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          </div>

          {/* ---------- The wall ---------- */}
          <Reveal delay={1}>
            <div
              className="relative max-h-[34rem] overflow-hidden"
              style={{
                maskImage:
                  "linear-gradient(to bottom, transparent, #000 9%, #000 91%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent, #000 9%, #000 91%, transparent)",
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                {columns.map((col, ci) => (
                  <div key={ci} className="overflow-hidden">
                    <div
                      className={cn(
                        "flex flex-col gap-4",
                        // Only drift when there is enough to loop; a short list
                        // would visibly snap back.
                        reviews.length >= 6 && "animate-marquee-y",
                      )}
                      style={{
                        ["--marquee-duration" as string]: ci === 0 ? "48s" : "62s",
                        animationDirection: ci === 1 ? "reverse" : "normal",
                      }}
                    >
                      {(reviews.length >= 6 ? [...col, ...col] : col).map((r, i) => (
                        <ReviewCard key={`${r.name}-${i}`} r={r} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
