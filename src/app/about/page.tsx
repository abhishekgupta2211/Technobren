import type { Metadata } from "next";
import { coreValues, leadership, stats, offices, differentiators } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { CountryMark } from "@/components/ui/CountryMark";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/sections/PageHero";
import { ChairmanSection } from "@/components/sections/ChairmanSection";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "TechnoBren Infotech is an offshore software development company with offices across India, the UAE and the USA. Meet the team, the values and the milestones behind our work.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Us | TechnoBren Infotech",
    description:
      "An offshore software development company with offices across India, the UAE and the USA.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="The leading on-demand"
        accent="app solution provider."
        description="Our company is more than just a business; it is a testament to our unwavering commitment to excellence, innovation and integrity. As a unified global entity, we are dedicated to empowering our clients to innovate and thrive by delivering top-notch, customised solutions."
        aside={
          <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-(--shadow-card)">
            <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-ink-500">
              Milestones
            </p>
            <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-200 bg-ink-200">
              {stats.map((s) => (
                <div key={s.label} className="bg-white px-4 py-4">
                  <dt className="font-display text-[1.7rem] leading-none text-brand-700">
                    {s.value}
                    {s.suffix}
                  </dt>
                  <dd className="mt-1.5 text-[0.8rem] text-ink-600">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        }
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <Button href="/work" size="lg" arrow>
            View Our Work
          </Button>
          <Button href="/contact" size="lg" variant="secondary">
            Get In Touch
          </Button>
        </div>
      </PageHero>

      {/* ---------- Milestones ---------- */}
      <section className="border-t border-ink-100 bg-[var(--canvas-subtle)] py-14 sm:py-18 lg:py-22">
        <Container size="wide">
          <SectionHeading
            eyebrow="Milestones"
            title={
              <>
                A journey marked by{" "}
                <span className="text-brand-700">measurable progress</span>
              </>
            }
            description="Explore TechnoBren's journey, marked by milestones that highlight our commitment to excellence and innovation."
          />

          <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-ink-200 bg-ink-200 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.label} className="bg-white px-6 py-7">
                <Reveal delay={i}>
                  <dt className="font-display text-[2.6rem] leading-none text-brand-700">
                    <Counter value={s.value} suffix={s.suffix} />
                  </dt>
                  <dd className="mt-3 text-[0.95rem] font-semibold text-ink-950">
                    {s.label}
                  </dd>
                  <dd className="mt-1.5 text-[0.83rem] leading-relaxed text-ink-500">
                    {s.sub}
                  </dd>
                </Reveal>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <ChairmanSection />

      {/* ---------- Core values ---------- */}
      <section className="relative overflow-x-clip border-t border-ink-100 bg-[var(--canvas-subtle)] py-14 sm:py-18 lg:py-22">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-[10%] top-[16%] size-[32rem] rounded-full bg-[radial-gradient(circle,rgba(174,49,53,0.07),transparent_66%)] blur-3xl"
        />
        <Container size="wide" className="relative">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Core values"
              title={
                <>
                  The principles that{" "}
                  <span className="text-brand-700">define how we work</span>
                </>
              }
              description="Our core values shape how we treat our clients, our team and everyone we interact with. They highlight our commitment to excellence, integrity and innovation."
            />
            <Reveal delay={2} className="shrink-0">
              <span className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink-600 shadow-(--shadow-card)">
                <span aria-hidden className="size-1.5 rounded-full bg-brand-500" />
                {coreValues.length} values
              </span>
            </Reveal>
          </div>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((v, i) => (
              <Reveal
                as="li"
                key={v.title}
                delay={i % 3}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-ink-200/80 bg-white p-7 shadow-(--shadow-card) transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-brand-200 hover:shadow-(--shadow-card-hover)"
              >
                {/* the logo's arc, sweeping in behind the card on hover */}
                <svg
                  aria-hidden
                  viewBox="0 0 200 200"
                  className="pointer-events-none absolute -right-16 -top-20 size-56 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  fill="none"
                >
                  <path
                    d="M8 168C8 80 80 8 168 8"
                    stroke="#ae3135"
                    strokeOpacity="0.16"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M44 176C44 103 103 44 176 44"
                    stroke="#ae3135"
                    strokeOpacity="0.1"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <circle cx="168" cy="8" r="4" fill="#ae3135" fillOpacity="0.4" />
                </svg>

                <div className="relative flex items-center gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 font-display text-[0.95rem] text-white shadow-[0_6px_16px_-8px_rgba(174,49,53,0.42)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden
                    className="h-px flex-1 origin-left scale-x-0 bg-gradient-to-r from-brand-300 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                  />
                </div>

                <h3 className="relative mt-6 font-display text-[1.15rem] leading-snug text-ink-950">
                  {v.title}
                </h3>
                <p className="relative mt-3 flex-1 text-pretty text-[0.9rem] leading-relaxed text-ink-600">
                  {v.description}
                </p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* ---------- Leadership ---------- */}
      <section className="border-t border-ink-100 bg-[var(--canvas-subtle)] py-14 sm:py-18 lg:py-22">
        <Container size="wide">
          <SectionHeading
            eyebrow="Our team"
            title={
              <>
                Individual ambitions,{" "}
                <span className="text-brand-700">one shared vision</span>
              </>
            }
            description="Over the years, our dedicated innovators, working collaboratively, have proven to be invaluable assets driving our success."
          />

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {leadership.map((p, i) => (
              <Reveal
                as="li"
                key={p.name}
                delay={i % 5}
                className="group overflow-hidden rounded-2xl border border-ink-200 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-brand-200 hover:shadow-(--shadow-card-hover)"
              >
                {/* Monogram plate — the old site had no team photography. */}
                <div className="relative flex h-36 items-center justify-center overflow-hidden bg-[var(--canvas-subtle)]">
                  <div aria-hidden className="absolute inset-0 bg-grid opacity-70" />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(174,49,53,0.12),transparent_62%)]"
                  />
                  <span className="relative flex size-16 items-center justify-center rounded-2xl bg-white font-display text-[1.4rem] text-brand-700 shadow-[0_5px_16px_-11px_rgba(16,15,20,0.2)] ring-1 ring-ink-200">
                    {p.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div className="p-5">
                  <p className="font-display text-[1rem] text-ink-950">{p.name}</p>
                  <p className="mt-1 text-[0.83rem] text-ink-500">{p.role}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* ---------- Why + offices ---------- */}
      <section className="border-t border-ink-100 py-14 sm:py-18 lg:py-22">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Why TechnoBren"
                title="We promise. We deliver."
                description="Got an idea? Partner with us and watch it come to life — we go the extra mile for every project we undertake."
              />
              <ul className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
                {differentiators.map((d, i) => (
                  <Reveal as="li" key={d.title} delay={i % 2}>
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 text-white shadow-[0_6px_16px_-8px_rgba(174,49,53,0.42)]">
                      <Icon name={d.icon} className="size-5" />
                    </span>
                    <h3 className="mt-4 font-display text-[1.02rem] text-ink-950">
                      {d.title}
                    </h3>
                    <p className="mt-2 text-pretty text-[0.87rem] leading-relaxed text-ink-600">
                      {d.description}
                    </p>
                  </Reveal>
                ))}
              </ul>
            </div>

            <Reveal delay={2}>
              <div className="overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-(--shadow-card) lg:sticky lg:top-28">
                <div className="flex items-center justify-between border-b border-ink-200 bg-ink-50/60 px-6 py-4">
                  <h3 className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink-500">
                    Global presence
                  </h3>
                  <span className="font-mono text-[0.68rem] text-ink-600">
                    {offices.length} offices
                  </span>
                </div>
                <ul className="divide-y divide-ink-100">
                  {offices.map((o) => (
                    <li key={o.city} className="flex items-start gap-4 px-6 py-4">
                      <CountryMark country={o.country} className="mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <p className="flex items-center gap-2 text-[0.92rem] font-semibold text-ink-950">
                          {o.city}
                          <span className="text-[0.78rem] font-normal text-ink-600">
                            {o.country}
                          </span>
                          {o.hq && (
                            <span className="rounded border border-brand-200 bg-brand-50 px-1.5 py-px font-mono text-[0.6rem] uppercase tracking-wider text-brand-700">
                              HQ
                            </span>
                          )}
                        </p>
                        <p className="mt-1 text-pretty text-[0.82rem] leading-relaxed text-ink-500">
                          {o.address}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
