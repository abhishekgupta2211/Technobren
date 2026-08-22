import type { Metadata } from "next";
import {
  coreValues,
  leadership,
  stats,
  differentiators,
  offices,
} from "@/lib/site";
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

/**
 * The chairman leads the section directly above this one, so he is left out of
 * the grid rather than appearing twice on the same page.
 */
const team = leadership.slice(1);

/** Real company copy, not an invented motto. */
const philosophy = coreValues.find((v) => v.title === "Leadership By Example");

const officeCount = offices.length;

const teamSize = (() => {
  const t = stats.find((x) => x.label === "People on the team");
  return t ? `${t.value}${t.suffix}` : "our engineers";
})();

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
      {/* The chairman is not in this grid: his portrait and message already
          have a section of their own directly above, and repeating him here
          just made the same face appear twice on one page.

          Portraits sit as bare tiles with the name beneath rather than inside
          bordered cards — an editorial grid, which is what the reference
          layout is. Only the founder has a photograph (REDESIGN-NOTES §5.9),
          so the rest carry a monogram tile of identical proportion; supply the
          real portraits and they drop into the same slots unchanged. */}
      <section
        id="team"
        className="scroll-mt-24 relative overflow-x-clip border-t border-ink-100 bg-[var(--canvas-subtle)] py-14 sm:py-18 lg:py-22"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-[10%] top-1/4 size-[32rem] rounded-full bg-[radial-gradient(circle,rgba(174,49,53,0.07),transparent_66%)] blur-3xl"
        />
        <Container size="wide" className="relative">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr] lg:items-end">
            <div>
              <Reveal>
                <p className="flex items-center gap-2.5 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-ink-500">
                  <span aria-hidden className="h-px w-5 bg-brand-300" />
                  Leadership
                </p>
              </Reveal>
              <Reveal delay={1}>
                <h2 className="mt-5 font-display text-[2.4rem] leading-[1.02] text-ink-950 sm:text-[3rem]">
                  The people
                </h2>
              </Reveal>
              <Reveal delay={2}>
                <p className="font-[family-name:var(--font-display)] text-[2.1rem] font-medium italic leading-tight tracking-[-0.02em] text-brand-700 sm:text-[2.6rem]">
                  behind the work.
                </p>
              </Reveal>
            </div>

            <Reveal delay={2}>
              <p className="max-w-sm text-pretty text-[0.94rem] leading-relaxed text-ink-600">
                The people who plan the work, write it and answer for it —
                supported by a team of {teamSize} across {officeCount} offices.
              </p>
            </Reveal>
          </div>

          {/* ---- Portrait grid ---- */}
          <ul className="mt-12 grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3 lg:grid-cols-6">
            {team.map((person, i) => (
              <Reveal as="li" key={person.name} delay={i % 6} className="group">
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-[linear-gradient(160deg,#f4f2f0,#e9e6e2)] ring-1 ring-ink-200/70 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:ring-brand-300">
                  <span aria-hidden className="absolute inset-0 bg-grid opacity-50" />
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(174,49,53,0.14),transparent_62%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-[1.75rem] text-brand-700/80 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110">
                      {person.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-brand-600 to-brand-400 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                  />
                </div>

                <p className="mt-3 text-[0.9rem] font-semibold text-brand-700 transition-colors duration-300 group-hover:text-brand-800">
                  {person.name}
                </p>
                <p className="mt-0.5 font-mono text-[0.56rem] uppercase leading-relaxed tracking-[0.14em] text-ink-500">
                  {person.role}
                </p>
              </Reveal>
            ))}
          </ul>

          {/* ---- Philosophy ---- */}
          <Reveal delay={2}>
            <figure className="mt-12 grid gap-6 border-t border-ink-200 pt-9 lg:grid-cols-[0.32fr_1fr] lg:gap-10">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-brand-700">
                Our philosophy
              </p>
              <div>
                <blockquote className="max-w-2xl text-pretty font-[family-name:var(--font-display)] text-[1.3rem] font-medium italic leading-[1.5] tracking-[-0.01em] text-ink-800 sm:text-[1.55rem]">
                  &ldquo;{philosophy?.description}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span aria-hidden className="h-px w-8 bg-brand-400" />
                  <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-ink-500">
                    {philosophy?.title}
                  </span>
                </figcaption>
              </div>
            </figure>
          </Reveal>
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
