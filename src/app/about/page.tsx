import type { Metadata } from "next";
import { coreValues, leadership, stats, differentiators } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/sections/PageHero";
import { DisciplineStack } from "@/components/visuals/DisciplineStack";
import { OriginSection } from "@/components/sections/OriginSection";
import { GlobalPresenceSection } from "@/components/sections/GlobalPresenceSection";
import { ChairmanSection } from "@/components/sections/ChairmanSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "TechnoBren Infotech is an offshore software development company with offices across India, the UAE and Uganda. Meet the team, the values and the milestones behind our work.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Us | TechnoBren Infotech",
    description:
      "An offshore software development company with offices across India, the UAE and Uganda.",
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
        aside={<DisciplineStack />}
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

      <OriginSection />

      {/* ---------- Milestones ---------- */}
      <section id="milestones" className="scroll-mt-24 border-t border-ink-100 bg-[var(--canvas-subtle)] py-14 sm:py-18 lg:py-22">
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
      <section id="values" className="scroll-mt-24 relative overflow-x-clip border-t border-ink-100 bg-[var(--canvas-subtle)] py-14 sm:py-18 lg:py-22">
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
      <section id="team" className="scroll-mt-24 border-t border-ink-100 bg-[var(--canvas-subtle)] py-14 sm:py-18 lg:py-22">
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

      {/* ---------- Why TechnoBren ---------- */}
      {/* The office register used to sit beside this as a sticky panel. It now
          has a whole map section of its own below, so this band gets the full
          width instead of repeating it. */}
      <section className="relative overflow-x-clip border-t border-ink-100 py-14 sm:py-18 lg:py-22">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-[8%] top-1/4 size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(174,49,53,0.07),transparent_66%)] blur-3xl"
        />
        <Container size="wide" className="relative">
          <SectionHeading
            align="center"
            eyebrow="Why TechnoBren"
            title={
              <>
                We promise. <span className="text-brand-700">We deliver.</span>
              </>
            }
            description="Got an idea? Partner with us and watch it come to life — we go the extra mile for every project we undertake."
            className="mx-auto"
          />

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {differentiators.map((d, i) => (
              <Reveal
                as="li"
                key={d.title}
                delay={i % 3}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-ink-200/80 bg-white p-7 shadow-(--shadow-card) transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-brand-200 hover:shadow-(--shadow-card-hover)"
              >
                {/* the logo's arc, sweeping in behind the card on hover */}
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

                <div className="relative flex items-start justify-between gap-4">
                  {/* Tile fills from the bottom, matching the nav panel and the
                      industry cards. */}
                  <span className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-brand-200/60 bg-brand-50 text-brand-700 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-brand-500 group-hover:text-white group-hover:shadow-[0_8px_18px_-8px_rgba(174,49,53,0.6)]">
                    <span
                      aria-hidden
                      className="absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
                    />
                    <Icon name={d.icon} className="relative size-5" />
                  </span>
                  <span className="font-mono text-[0.7rem] text-ink-300 transition-colors duration-500 group-hover:text-brand-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="relative mt-5 font-display text-[1.08rem] leading-snug text-ink-950 transition-colors duration-300 group-hover:text-brand-800">
                  {d.title}
                </h3>
                <p className="relative mt-2.5 flex-1 text-pretty text-[0.88rem] leading-relaxed text-ink-600">
                  {d.description}
                </p>

                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-brand-600 to-brand-400 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                />
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <GlobalPresenceSection />

      {/* ---------- Enterprise Client Testimonials (Above Footer / CTA) ---------- */}
      <TestimonialsSection />

      {/* ---------- Call to action ---------- */}
      <CTASection />
    </>
  );
}
