import type { Metadata } from "next";
import { Check } from "lucide-react";
import { solutions, solutionsIntro, focusAreas, rockEye } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/sections/PageHero";
import { InteractiveArchitectureDiagram } from "@/components/sections/InteractiveArchitectureDiagram";
import { DASHBOARDS } from "@/components/visuals/dashboard";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Focused IT solutions and services from TechnoBren Infotech — AI, enterprise applications, technology integration, business automation, digital commerce and BI, plus Custom ERP, Van Sales, Distributor, Merchandiser and Asset Management products.",
  alternates: { canonical: "/solutions" },
  openGraph: {
    title: "Solutions | TechnoBren Infotech",
    description:
      "Focused IT solutions and services: AI, enterprise applications, integration, automation, digital commerce and BI.",
    url: "/solutions",
  },
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Focused IT solutions"
        accent="& services."
        description={solutionsIntro.body}
        aside={
          <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-(--shadow-card)">
            <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-ink-500">
              Products
            </p>
            <ul className="mt-5 space-y-px overflow-hidden rounded-2xl border border-ink-200 bg-ink-200">
              {solutions.map((s) => (
                <li key={s.slug} className="flex items-center gap-3 bg-white px-4 py-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    <Icon name={s.icon} className="size-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[0.88rem] font-medium text-ink-900">
                      {s.name}
                    </span>
                    <span className="block truncate text-[0.75rem] text-ink-500">
                      {s.category}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        }
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <Button href="/contact" size="lg" arrow>
            Request a Demo
          </Button>
          <Button href="/services" size="lg" variant="secondary">
            Explore Services
          </Button>
        </div>
      </PageHero>

      {/* ---------- Focus areas ---------- */}
      <section className="relative overflow-x-clip border-t border-ink-100 bg-[var(--canvas-subtle)] py-14 sm:py-18 lg:py-22">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-[12%] top-[14%] size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(174,49,53,0.07),transparent_66%)] blur-3xl"
        />
        <Container size="wide" className="relative">
          <SectionHeading
            eyebrow={solutionsIntro.eyebrow}
            title={
              <>
                Our current focus areas —{" "}
                <span className="text-brand-700">key points to consider</span>
              </>
            }
            description="Where we are investing our engineering effort, and the questions we help clients answer in each area."
          />

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {focusAreas.map((f, i) => (
              <Reveal
                as="li"
                key={f.title}
                delay={i % 3}
                className="group relative overflow-hidden rounded-3xl border border-ink-200/80 bg-white p-7 shadow-(--shadow-card) transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-brand-200 hover:shadow-(--shadow-card-hover)"
              >
                <svg
                  aria-hidden
                  viewBox="0 0 200 200"
                  className="pointer-events-none absolute -right-14 -top-16 size-48 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  fill="none"
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

                <span
                  aria-hidden
                  className="absolute right-6 top-5 font-display text-[2.6rem] leading-none tracking-tight text-ink-100 transition-colors duration-500 group-hover:text-brand-200"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="relative flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 text-white shadow-[0_6px_16px_-8px_rgba(174,49,53,0.42)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]">
                  <Icon name={f.icon} className="size-5" />
                </span>

                <h3 className="relative mt-6 font-display text-[1.2rem] leading-snug text-ink-950">
                  {f.title}
                </h3>
                <p className="relative mt-3 text-pretty text-[0.92rem] leading-relaxed text-ink-600">
                  {f.description}
                </p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* ---------- Interactive Architecture Ecosystem Node Network ---------- */}
      <InteractiveArchitectureDiagram />

      {/* ---------- Products ---------- */}
      <section className="border-t border-ink-100">
        <Container size="wide">
          <div className="pt-14 sm:pt-18">
            <SectionHeading
              eyebrow="Products"
              title={
                <>
                  Customer-centric business{" "}
                  <span className="text-brand-700">IT solutions</span>
                </>
              }
              description="Tailored platforms that keep organisations agile and responsive — enhancing performance, reducing cost and automating the work that slows teams down."
            />
          </div>
        </Container>

        {solutions.map((s, i) => (
          <article
            key={s.slug}
            id={s.slug}
            className={`scroll-mt-24 border-b border-ink-100 py-12 sm:py-14 lg:py-16 ${
              i % 2 === 1 ? "bg-[var(--canvas-subtle)]" : ""
            }`}
          >
            <Container size="wide">
              <div
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div>
                  <Reveal>
                    <div className="flex items-center gap-3">
                      <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 text-white shadow-[0_6px_16px_-8px_rgba(174,49,53,0.42)]">
                        <Icon name={s.icon} className="size-5" />
                      </span>
                      <span className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-brand-700">
                        {s.category}
                      </span>
                    </div>
                  </Reveal>

                  <Reveal delay={1}>
                    <h3 className="mt-5 font-display text-[1.9rem] leading-tight text-ink-950 sm:text-[2.4rem]">
                      {s.name}
                    </h3>
                  </Reveal>

                  <Reveal delay={2}>
                    <p className="mt-4 max-w-lg text-pretty text-[1rem] leading-[1.7] text-ink-600">
                      {s.summary}
                    </p>
                    <p className="mt-3 max-w-lg text-pretty text-[0.95rem] leading-[1.7] text-ink-600">
                      {s.description}
                    </p>
                  </Reveal>

                  <Reveal delay={3}>
                    <ul className="mt-7 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                      {s.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2.5 text-[0.9rem] text-ink-700"
                        >
                          <Check
                            className="mt-0.5 size-4 shrink-0 text-brand-600"
                            aria-hidden
                          />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </Reveal>

                  <Reveal delay={4}>
                    <Button href="/contact" className="mt-8" arrow>
                      Talk to our team
                    </Button>
                  </Reveal>
                </div>

                <Reveal delay={2}>
                  <div className="relative overflow-hidden rounded-2xl border border-ink-200 bg-[var(--canvas-subtle)] p-4 shadow-(--shadow-card) sm:p-6">
                    <div aria-hidden className="absolute inset-0 bg-grid opacity-70" />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-[radial-gradient(circle_at_72%_14%,rgba(174,49,53,0.1),transparent_58%)]"
                    />
                    {(() => {
                      const Dashboard = DASHBOARDS[i % DASHBOARDS.length];
                      return (
                        <Dashboard className="relative w-full rounded-xl shadow-[0_1px_3px_rgba(16,15,20,0.04),0_14px_32px_-24px_rgba(16,15,20,0.28)] ring-1 ring-ink-200/70" />
                      );
                    })()}
                  </div>
                </Reveal>
              </div>
            </Container>
          </article>
        ))}
      </section>

      {/* ---------- RockEye ERP ---------- */}
      <section className="relative overflow-x-clip border-b border-ink-100 bg-[var(--canvas-subtle)] py-14 sm:py-18 lg:py-22">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-[10%] top-0 size-[36rem] rounded-full bg-[radial-gradient(circle,rgba(174,49,53,0.09),transparent_66%)] blur-3xl"
        />
        <Container size="wide" className="relative">
          <div className="overflow-hidden rounded-3xl border border-ink-200/80 bg-white shadow-(--shadow-card)">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
              <div className="p-7 sm:p-10">
                <Reveal>
                  <span className="inline-flex items-center gap-2.5 font-mono text-[0.68rem] font-medium uppercase tracking-[0.18em] text-brand-700">
                    <span aria-hidden className="h-px w-6 bg-brand-300" />
                    {rockEye.name}
                  </span>
                </Reveal>
                <Reveal delay={1}>
                  <h2 className="mt-6 max-w-lg font-display text-[1.9rem] leading-tight text-ink-950 sm:text-[2.4rem]">
                    {rockEye.headline}
                  </h2>
                </Reveal>
                <Reveal delay={2}>
                  <p className="mt-5 max-w-xl text-pretty text-[1rem] leading-[1.7] text-ink-600">
                    {rockEye.body}
                  </p>
                </Reveal>
                <Reveal delay={3}>
                  <ul className="mt-7 flex flex-wrap gap-2.5">
                    {rockEye.points.map((pt) => (
                      <li
                        key={pt}
                        className="inline-flex items-center gap-2 rounded-xl border border-ink-200 bg-[var(--canvas-subtle)] px-3.5 py-2 text-[0.85rem] font-medium text-ink-700"
                      >
                        <span
                          aria-hidden
                          className="size-1.5 rounded-full bg-brand-500"
                        />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal delay={4}>
                  <Button href="/contact" className="mt-8" arrow>
                    See it in action
                  </Button>
                </Reveal>
              </div>

              <Reveal
                delay={2}
                className="relative min-h-[18rem] overflow-hidden border-t border-ink-100 bg-[var(--canvas-subtle)] lg:border-l lg:border-t-0"
              >
                <div aria-hidden className="absolute inset-0 bg-grid opacity-70" />
                <div className="absolute inset-x-8 bottom-0 top-10">
                  {(() => {
                    const Dashboard = DASHBOARDS[0];
                    return (
                      <Dashboard className="h-full w-full rounded-t-xl shadow-[0_1px_3px_rgba(16,15,20,0.04),0_14px_32px_-24px_rgba(16,15,20,0.28)] ring-1 ring-ink-200/70" />
                    );
                  })()}
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- Cross-link to the portfolio ---------- */}
      <section className="py-14 sm:py-18 lg:py-22">
        <Container size="wide">
          <Reveal>
            <div className="flex flex-col items-start gap-5 rounded-3xl border border-ink-200 bg-white p-7 shadow-(--shadow-card) sm:flex-row sm:items-center sm:justify-between sm:p-9">
              <div>
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-brand-700">
                  See them running
                </p>
                <p className="mt-3 max-w-xl font-display text-[1.4rem] leading-snug text-ink-950 sm:text-[1.7rem]">
                  Every one of these is a platform we designed, built and deployed.
                </p>
                <p className="mt-2.5 max-w-xl text-pretty text-[0.9rem] leading-relaxed text-ink-600">
                  See the delivery record, the scope of each engagement and the process
                  behind them.
                </p>
              </div>
              <Button href="/work" size="lg" arrow className="shrink-0">
                View our work
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
