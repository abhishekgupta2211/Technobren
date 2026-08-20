import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowUpRight } from "lucide-react";
import { services, secondaryServices } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/sections/PageHero";
import { ServicePattern } from "@/components/visuals/ServicePattern";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom software development, enterprise ERP, mobile apps, AI & machine learning, business intelligence and digital commerce — engineered end to end by TechnoBren Infotech.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services | TechnoBren Infotech",
    description:
      "Custom software, enterprise ERP, mobile, AI/ML, BI and digital commerce engineering.",
    url: "/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="You envision,"
        accent="we deliver."
        description="TechnoBren is a team of skilled, dedicated professionals committed to helping you and your product grow, achieve success and reach new heights. These are the practices we run end to end."
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <Button href="/contact" size="lg" arrow>
            Start a Project
          </Button>
          <Button href="/work" size="lg" variant="secondary">
            View Our Work
          </Button>
        </div>
      </PageHero>

      {/* ---------- Index: jump to any practice ---------- */}
      <section className="border-t border-ink-100 bg-[var(--canvas-subtle)] py-10">
        <Container size="wide">
          <Reveal>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="mr-1 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-ink-500">
                {services.length} practices
              </span>
              {services.map((s, i) => (
                <Link
                  key={s.slug}
                  href={`#${s.slug}`}
                  className="group inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-4 py-2 text-[0.83rem] font-medium text-ink-700 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700"
                >
                  <span className="font-mono text-[0.68rem] text-ink-500 transition-colors duration-300 group-hover:text-brand-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.title}
                </Link>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ---------- Practice detail ---------- */}
      <section className="border-t border-ink-100">
        {services.map((s, i) => (
          <div
            key={s.slug}
            id={s.slug}
            className={`scroll-mt-24 border-b border-ink-100 py-12 sm:py-14 lg:py-16 ${
              i % 2 === 1 ? "bg-[var(--canvas-subtle)]" : ""
            }`}
          >
            <Container size="wide">
              <div className="grid gap-9 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
                {/* ---- Identity ---- */}
                <div className="lg:sticky lg:top-28 lg:h-fit lg:self-start">
                  <Reveal>
                    <div className="relative overflow-hidden rounded-3xl border border-ink-200/80 bg-white shadow-(--shadow-card)">
                      <div className="relative h-28 overflow-hidden bg-gradient-to-br from-brand-50/80 via-white to-[var(--canvas-subtle)]">
                        <div
                          aria-hidden
                          className="absolute inset-0 bg-grid opacity-50"
                        />
                        <ServicePattern
                          variant={i}
                          className="absolute inset-0 size-full"
                        />
                        <span
                          aria-hidden
                          className="absolute right-5 top-4 font-mono text-[0.75rem] tracking-[0.15em] text-brand-600/45"
                        >
                          {String(i + 1).padStart(2, "0")} / {services.length}
                        </span>
                      </div>

                      <div className="relative z-10 -mt-7 px-6">
                        <span className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 text-white shadow-[0_6px_16px_-8px_rgba(174,49,53,0.45)] ring-4 ring-white">
                          <Icon name={s.icon} className="size-6" />
                        </span>
                      </div>

                      <div className="px-6 pb-6 pt-5">
                        <h2 className="font-display text-[1.6rem] leading-tight text-ink-950 sm:text-[1.85rem]">
                          {s.title}
                        </h2>
                        <p className="mt-3 text-pretty text-[0.95rem] leading-[1.7] text-ink-600">
                          {s.description}
                        </p>
                        <Button href="/contact" className="mt-6" arrow>
                          Discuss your requirement
                        </Button>
                      </div>
                    </div>
                  </Reveal>
                </div>

                {/* ---- Capabilities ---- */}
                <Reveal delay={1}>
                  <div className="rounded-3xl border border-ink-200/80 bg-white shadow-(--shadow-card)">
                    <div className="flex items-center justify-between border-b border-ink-100 px-6 py-4 sm:px-7">
                      <h3 className="flex items-center gap-2.5 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-ink-500">
                        <span aria-hidden className="h-px w-4 bg-brand-300" />
                        What&rsquo;s included
                      </h3>
                      <span className="font-mono text-[0.66rem] text-ink-500">
                        {s.capabilities.length}
                      </span>
                    </div>

                    <ul className="grid sm:grid-cols-2">
                      {s.capabilities.map((c, ci) => (
                        <li
                          key={c}
                          className={`group flex items-center gap-3 border-ink-100 px-6 py-3.5 transition-colors duration-300 hover:bg-brand-50/40 sm:px-7 ${
                            ci % 2 === 0 ? "sm:border-r" : ""
                          } ${ci < s.capabilities.length - 2 ? "border-b" : ""}`}
                        >
                          <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-ink-200 text-ink-500 transition-all duration-300 group-hover:border-brand-600 group-hover:bg-brand-600 group-hover:text-white">
                            <Check className="size-3" aria-hidden />
                          </span>
                          <span className="text-[0.9rem] text-ink-700 transition-colors duration-300 group-hover:text-ink-950">
                            {c}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            </Container>
          </div>
        ))}
      </section>

      {/* ---------- Secondary practices ---------- */}
      <section className="relative overflow-x-clip py-14 sm:py-18 lg:py-22">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-[12%] top-[16%] size-[32rem] rounded-full bg-[radial-gradient(circle,rgba(174,49,53,0.07),transparent_66%)] blur-3xl"
        />
        <Container size="wide" className="relative">
          <SectionHeading
            align="center"
            eyebrow="Also offering"
            title="Supporting capabilities"
            description="Practices that wrap around delivery to make sure what we build lands well and keeps working."
            className="mx-auto"
          />

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {secondaryServices.map((s, i) => (
              <Reveal
                as="li"
                key={s.title}
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

                <span className="relative flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 text-white shadow-[0_6px_16px_-8px_rgba(174,49,53,0.42)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]">
                  <Icon name={s.icon} className="size-5" />
                </span>
                <h3 className="relative mt-5 font-display text-[1.08rem] text-ink-950">
                  {s.title}
                </h3>
                <p className="relative mt-2.5 text-pretty text-[0.88rem] leading-relaxed text-ink-600">
                  {s.description}
                </p>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={2}>
            <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-4 rounded-3xl border border-ink-200 bg-white p-7 text-center shadow-(--shadow-card) sm:flex-row sm:justify-between sm:text-left">
              <div>
                <p className="font-display text-[1.1rem] text-ink-950">
                  Not sure which practice you need?
                </p>
                <p className="mt-1.5 text-pretty text-[0.88rem] leading-relaxed text-ink-600">
                  Tell us the problem. We&rsquo;ll suggest the approach — and the first
                  7 days are on us.
                </p>
              </div>
              <Link
                href="/contact"
                className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-600 px-5 py-3 text-[0.87rem] font-medium text-white shadow-[0_1px_2px_rgba(174,49,53,0.22),0_5px_14px_-8px_rgba(174,49,53,0.38)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-brand-700"
              >
                Talk to our team
                <ArrowUpRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
