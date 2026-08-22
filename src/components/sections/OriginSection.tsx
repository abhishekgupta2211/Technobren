import {
  origin,
  offices,
  techCategories,
  solutions,
  processSteps,
  leadership,
} from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

/**
 * Origin.
 *
 * The founding statement, given the largest type on the site — the year is the
 * claim, so it carries the weight rather than a heading above it. Everything
 * beside and below it is counted from `lib/site.ts` rather than asserted, so the
 * figures cannot drift from the rest of the pages.
 */

const founder = leadership[0];

const PILLARS = [
  {
    icon: "Code2",
    title: "Engineering depth",
    body: `${techCategories.reduce((n, c) => n + c.items.length, 0)} technologies across ${techCategories.length} disciplines — mobile, front end, backend, data, AI and infrastructure, under one roof.`,
  },
  {
    icon: "Boxes",
    title: "Built for operations",
    body: `${solutions.length} products running real distribution, field sales and asset workflows — not demos.`,
  },
  {
    icon: "ShieldCheck",
    title: "Transparent delivery",
    body: `${processSteps.length} stages, each with an output you review. Nothing moves forward until you have seen it.`,
  },
];

export function OriginSection() {
  const countries = new Set(offices.map((o) => o.country)).size;

  const FACTS = [
    { value: `${origin.yearsInBusiness}`, label: "Years building" },
    { value: `${offices.length}`, label: "Offices" },
    { value: `${countries}`, label: "Countries" },
  ];

  return (
    <section className="relative overflow-x-clip border-t border-ink-100 bg-[var(--canvas-subtle)] py-14 sm:py-18 lg:py-22">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[10%] -top-24 size-[38rem] rounded-full bg-[radial-gradient(circle,rgba(174,49,53,0.08),transparent_66%)] blur-3xl"
      />
      {/* The logo's arc, sweeping across the top-right of the band. */}
      <svg
        aria-hidden
        viewBox="0 0 200 200"
        fill="none"
        className="pointer-events-none absolute -right-24 -top-28 size-[26rem] opacity-70"
      >
        <path
          d="M8 168C8 80 80 8 168 8"
          stroke="#ae3135"
          strokeOpacity="0.14"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M44 176C44 103 103 44 176 44"
          stroke="#ae3135"
          strokeOpacity="0.09"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="168" cy="8" r="4" fill="#ae3135" fillOpacity="0.35" />
      </svg>

      <Container size="wide" className="relative">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-16">
          {/* ---- The statement ---- */}
          <div>
            <Reveal>
              <p className="flex items-center gap-2.5 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-ink-500">
                <span aria-hidden className="h-px w-5 bg-brand-300" />
                Origin
              </p>
            </Reveal>

            <Reveal delay={1}>
              <h2 className="mt-6 font-display text-[2.6rem] leading-[0.98] text-ink-950 sm:text-[3.4rem] lg:text-[4rem]">
                Founded in{" "}
                <span className="text-gradient-brand">{origin.foundedYear}</span>.
              </h2>
            </Reveal>

            <Reveal delay={2}>
              <p className="mt-2 font-display text-[1.9rem] font-medium italic leading-tight tracking-[-0.02em] text-ink-700 sm:text-[2.4rem]">
                Still founder-led.
              </p>
            </Reveal>

            {/* ---- Counted, not claimed ---- */}
            <Reveal delay={3}>
              <dl className="mt-9 grid max-w-md grid-cols-3 gap-px overflow-hidden rounded-2xl border border-ink-200 bg-ink-200 shadow-(--shadow-card)">
                {FACTS.map((f) => (
                  <div key={f.label} className="bg-white px-5 py-4">
                    <dt className="font-display text-[1.7rem] leading-none text-brand-700">
                      {f.value}
                      <span className="text-[1.1rem] align-top">+</span>
                    </dt>
                    <dd className="mt-1.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink-500">
                      {f.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* ---- The story ---- */}
          <Reveal delay={2}>
            <p className="text-pretty text-[1.02rem] leading-[1.75] text-ink-600 lg:text-[1.08rem]">
              TechnoBren started in {origin.foundedYear} as a small team of engineers
              who believed enterprise software should be built by people who
              understand the operation it runs. {origin.yearsInBusiness} years on, we
              are {offices.length} offices across {countries} countries — and{" "}
              {founder.name}, who started it, is still the one answering for what we
              ship.
            </p>
          </Reveal>
        </div>

        {/* ---- Pillars ---- */}
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal
              as="li"
              key={p.title}
              delay={i % 3}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-ink-200/80 bg-white p-7 shadow-(--shadow-card) transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-brand-200 hover:shadow-(--shadow-card-hover)"
            >
              <svg
                aria-hidden
                viewBox="0 0 200 200"
                fill="none"
                className="pointer-events-none absolute -right-14 -top-16 size-48 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
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

              <span className="relative flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 text-white shadow-[0_6px_16px_-8px_rgba(174,49,53,0.42)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]">
                <Icon name={p.icon} className="size-5" />
              </span>

              <h3 className="relative mt-5 font-display text-[1.12rem] text-ink-950">
                {p.title}
              </h3>
              <p className="relative mt-2.5 text-pretty text-[0.9rem] leading-relaxed text-ink-600">
                {p.body}
              </p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
