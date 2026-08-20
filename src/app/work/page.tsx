import type { Metadata } from "next";
import { Check, Info } from "lucide-react";
import { solutions, stats, industries } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { DASHBOARDS } from "@/components/visuals/dashboard";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Platforms TechnoBren Infotech has designed, built and deployed — enterprise ERP, van sales, distributor management, retail execution and asset management systems.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Our Work | TechnoBren Infotech",
    description:
      "Enterprise platforms designed, built and deployed by TechnoBren Infotech.",
    url: "/work",
  },
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Work"
        title="Platforms we've designed,"
        accent="built and deployed."
        description="Production systems running real operations — from enterprise resource planning through to offline-capable field sales tooling used away from the office."
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <Button href="/contact" size="lg" arrow>
            Start a Project
          </Button>
          <Button href="/solutions" size="lg" variant="secondary">
            Explore Solutions
          </Button>
        </div>
      </PageHero>

      {/* ---------- Numbers ---------- */}
      <section className="border-t border-ink-100 bg-[var(--canvas-subtle)] py-14">
        <Container size="wide">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-200 bg-ink-200 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.label} className="bg-white px-6 py-7">
                <Reveal delay={i}>
                  <dt className="font-display text-[2.2rem] leading-none text-brand-700">
                    <Counter value={s.value} suffix={s.suffix} />
                  </dt>
                  <dd className="mt-2.5 text-[0.88rem] font-semibold text-ink-950">
                    {s.label}
                  </dd>
                </Reveal>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ---------- Projects ---------- */}
      <section className="border-t border-ink-100">
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
                <Reveal>
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

                <div>
                  <Reveal delay={1}>
                    <div className="flex items-center gap-3">
                      <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 text-white shadow-[0_6px_16px_-8px_rgba(174,49,53,0.42)]">
                        <Icon name={s.icon} className="size-5" />
                      </span>
                      <span className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-brand-700">
                        {s.category}
                      </span>
                    </div>
                    <h2 className="mt-5 font-display text-[1.85rem] leading-tight text-ink-950 sm:text-[2.3rem]">
                      {s.name}
                    </h2>
                    <p className="mt-4 max-w-lg text-pretty text-[1rem] leading-[1.7] text-ink-600">
                      {s.summary}
                    </p>
                    <p className="mt-3 max-w-lg text-pretty text-[0.95rem] leading-[1.7] text-ink-500">
                      {s.description}
                    </p>
                  </Reveal>

                  <Reveal delay={2}>
                    <h3 className="mt-7 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink-500">
                      Capabilities delivered
                    </h3>
                    <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
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
                </div>
              </div>
            </Container>
          </article>
        ))}
      </section>

      {/* ---------- Sectors ---------- */}
      <section className="py-14 sm:py-18">
        <Container size="wide">
          <SectionHeading
            align="center"
            eyebrow="Sectors"
            title="Where these systems run"
            description="Our platforms are applied where operations are complex, teams are distributed and data has to be trusted."
            className="mx-auto"
          />
          <ul className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-2.5">
            {industries.map((ind, i) => (
              <Reveal
                as="li"
                key={ind.name}
                delay={i}
                className="rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-[0.88rem] font-medium text-ink-700"
              >
                {ind.name}
              </Reveal>
            ))}
          </ul>

          {/* Honest note — the previous site had no published case studies. */}
          <Reveal delay={2}>
            <div className="mx-auto mt-12 flex max-w-3xl items-start gap-3.5 rounded-2xl border border-ink-200 bg-[var(--canvas-subtle)] p-6">
              <Info className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden />
              <p className="text-pretty text-[0.92rem] leading-relaxed text-ink-600">
                <strong className="font-semibold text-ink-950">
                  Detailed case studies available on request.
                </strong>{" "}
                Client engagements are covered by NDA, so named references and outcome
                metrics are shared directly with prospective clients rather than
                published here.{" "}
                <a
                  href="/contact"
                  className="font-semibold text-brand-700 underline underline-offset-4"
                >
                  Ask us for references
                </a>
                .
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
