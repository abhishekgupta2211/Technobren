import type { Metadata } from "next";
import Link from "next/link";
import { Info, ArrowUpRight, Layers, Building2, Boxes } from "lucide-react";
import { solutions, stats, industries, processSteps } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/sections/PageHero";
import { DASHBOARDS } from "@/components/visuals/dashboard";
import { ClientsSection } from "@/components/sections/ClientsSection";

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

/** The sector each platform is built for, mapped from the product portfolio. */
const SECTOR: Record<string, string> = {
  "custom-erp": "Enterprise operations",
  "van-sales-system": "FMCG · Field sales",
  "distributor-management": "Distribution · Channel",
  "merchandiser-management": "Retail execution",
  "asset-management": "Operations · Facilities",
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Work"
        title="Platforms we've designed,"
        accent="built and deployed."
        description="Production systems running real operations — from enterprise resource planning through to offline-capable field sales tooling used away from the office."
        aside={
          <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-(--shadow-card)">
            <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-ink-500">
              Delivery record
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
          <Button href="/contact" size="lg" arrow>
            Start a Project
          </Button>
          <Button href="/solutions" size="lg" variant="secondary">
            See product detail
          </Button>
        </div>
      </PageHero>

      {/* ---------- Delivery record ---------- */}
      <section className="border-t border-ink-100 bg-[var(--canvas-subtle)] py-10">
        <Container size="wide">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-200 bg-ink-200 shadow-(--shadow-card) lg:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.label} className="bg-white px-6 py-6">
                <Reveal delay={i}>
                  <dt className="font-display text-[2rem] leading-none text-brand-700">
                    <Counter value={s.value} suffix={s.suffix} />
                  </dt>
                  <dd className="mt-2.5 text-[0.88rem] font-semibold text-ink-950">
                    {s.label}
                  </dd>
                  <dd className="mt-1 text-[0.78rem] leading-snug text-ink-600">
                    {s.sub}
                  </dd>
                </Reveal>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <ClientsSection
        eyebrow="Who we build for"
        title={<>Platforms running inside <span className="text-brand-700">these businesses</span></>}
        description="Operations at these brands run on systems we designed, built and deployed."
      />

      {/* ---------- The platforms, as delivered engagements ---------- */}
      <section className="border-t border-ink-100">
        {solutions.map((s, i) => {
          const Dashboard = DASHBOARDS[i % DASHBOARDS.length];
          return (
            <article
              key={s.slug}
              id={s.slug}
              className={`scroll-mt-24 border-b border-ink-100 py-12 sm:py-14 lg:py-16 ${
                i % 2 === 1 ? "bg-[var(--canvas-subtle)]" : ""
              }`}
            >
              <Container size="wide">
                {/* ---- Case header ---- */}
                <Reveal>
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div className="flex items-center gap-4">
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 text-white shadow-[0_6px_16px_-8px_rgba(174,49,53,0.42)]">
                        <Icon name={s.icon} className="size-5" />
                      </span>
                      <div>
                        <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-brand-700">
                          Project {String(i + 1).padStart(2, "0")}
                        </p>
                        <h2 className="mt-1.5 font-display text-[1.7rem] leading-tight text-ink-950 sm:text-[2.1rem]">
                          {s.name}
                        </h2>
                      </div>
                    </div>

                    <Link
                      href={`/solutions#${s.slug}`}
                      className="group inline-flex shrink-0 items-center gap-1.5 text-[0.86rem] font-semibold text-brand-700"
                    >
                      <span className="border-b border-transparent transition-colors duration-300 group-hover:border-brand-400">
                        Full product detail
                      </span>
                      <ArrowUpRight
                        aria-hidden
                        className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </Link>
                  </div>
                </Reveal>

                {/* ---- Engagement facts ---- */}
                <Reveal delay={1}>
                  <dl className="mt-7 grid gap-px overflow-hidden rounded-2xl border border-ink-200 bg-ink-200 sm:grid-cols-3">
                    {[
                      { icon: Building2, k: "Sector", v: SECTOR[s.slug] ?? s.category },
                      { icon: Layers, k: "Platform", v: s.category },
                      {
                        icon: Boxes,
                        k: "Modules delivered",
                        v: `${s.features.length} modules`,
                      },
                    ].map((f) => (
                      <div key={f.k} className="bg-white px-5 py-4">
                        <dt className="flex items-center gap-2 font-mono text-[0.64rem] uppercase tracking-[0.16em] text-ink-500">
                          <f.icon className="size-3.5 text-brand-500" aria-hidden />
                          {f.k}
                        </dt>
                        <dd className="mt-1.5 text-[0.92rem] font-semibold text-ink-950">
                          {f.v}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>

                {/* ---- The screen ---- */}
                <Reveal delay={2}>
                  <div className="relative mt-6 overflow-hidden rounded-3xl border border-ink-200 bg-[var(--canvas-subtle)] p-4 shadow-(--shadow-card) sm:p-7">
                    <div aria-hidden className="absolute inset-0 bg-grid opacity-70" />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-[radial-gradient(circle_at_74%_12%,rgba(174,49,53,0.1),transparent_58%)]"
                    />
                    <Dashboard className="relative w-full rounded-xl shadow-[0_1px_3px_rgba(16,15,20,0.04),0_14px_32px_-24px_rgba(16,15,20,0.28)] ring-1 ring-ink-200/70" />
                  </div>
                </Reveal>

                {/* ---- Scope ---- */}
                <Reveal delay={3}>
                  <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-10">
                    <p className="max-w-md shrink-0 text-pretty text-[0.95rem] leading-[1.7] text-ink-600 lg:w-72">
                      {s.summary}
                    </p>
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-ink-500">
                        Scope of work
                      </p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {s.features.map((f) => (
                          <li
                            key={f}
                            className="rounded-lg border border-ink-200 bg-white px-3 py-1.5 text-[0.78rem] font-medium text-ink-700 transition-colors duration-300 hover:border-brand-200 hover:text-brand-800"
                          >
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              </Container>
            </article>
          );
        })}
      </section>

      {/* ---------- How these get built ---------- */}
      <section className="border-b border-ink-100 bg-[var(--canvas-subtle)] py-14 sm:py-18 lg:py-22">
        <Container size="wide">
          <div className="grid gap-9 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <SectionHeading
              eyebrow="How these get built"
              title={
                <>
                  Every platform runs the same{" "}
                  <span className="text-brand-700">six-stage process</span>
                </>
              }
              description="Nothing here was a one-off. Each system went through the same delivery method, so you know what to expect before we start."
            />

            <Reveal delay={1}>
              <ol className="grid gap-px overflow-hidden rounded-2xl border border-ink-200 bg-ink-200 sm:grid-cols-2">
                {processSteps.map((step) => (
                  <li
                    key={step.id}
                    className="group flex items-center gap-3.5 bg-white px-5 py-4 transition-colors duration-300 hover:bg-brand-50/40"
                  >
                    <span className="font-mono text-[0.78rem] text-ink-500 transition-colors duration-300 group-hover:text-brand-600">
                      {step.id}
                    </span>
                    <span className="text-[0.92rem] font-semibold text-ink-950">
                      {step.title}
                    </span>
                  </li>
                ))}
              </ol>
              <Button href="/methodology" variant="secondary" arrow className="mt-6">
                See the methodology
              </Button>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ---------- Sectors + honesty note ---------- */}
      <section className="py-14 sm:py-18 lg:py-22">
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

          {/* The previous site published no case studies; we do not invent any. */}
          <Reveal delay={2}>
            <div className="mx-auto mt-10 flex max-w-3xl items-start gap-3.5 rounded-2xl border border-ink-200 bg-[var(--canvas-subtle)] p-6">
              <Info className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden />
              <p className="text-pretty text-[0.92rem] leading-relaxed text-ink-600">
                <strong className="font-semibold text-ink-950">
                  Detailed case studies available on request.
                </strong>{" "}
                Client engagements are covered by NDA, so named references and outcome
                metrics are shared directly with prospective clients rather than
                published here.{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-brand-700 underline underline-offset-4"
                >
                  Ask us for references
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
