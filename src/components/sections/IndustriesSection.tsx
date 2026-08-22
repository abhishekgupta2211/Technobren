import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { industries } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { IndustryPattern } from "@/components/visuals/IndustryPattern";

export function IndustriesSection() {
  return (
    <section className="relative overflow-x-clip border-t border-ink-100 bg-white py-14 sm:py-18 lg:py-22">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[12%] top-[10%] size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(174,49,53,0.07),transparent_66%)] blur-3xl"
      />

      <Container size="wide" className="relative">
        <SectionHeading
          align="center"
          eyebrow="Industries"
          title="Where our solutions go to work"
          description="Our product portfolio and engineering practice are applied across sectors where operations are complex and data has to be trusted."
          className="mx-auto"
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <Reveal as="li" key={ind.name} delay={i % 3}>
              <Link
                href={ind.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink-200/80 bg-white shadow-(--shadow-card) transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-brand-200 hover:shadow-(--shadow-card-hover)"
              >
                {/* ---- Artwork band, one motif per sector ---- */}
                <div className="relative h-24 overflow-hidden bg-gradient-to-br from-brand-50/70 via-white to-[var(--canvas-subtle)]">
                  <div aria-hidden className="absolute inset-0 bg-grid opacity-50" />
                  <IndustryPattern
                    variant={i}
                    className="absolute inset-0 size-full transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(174,49,53,0.12),transparent_62%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <span
                    aria-hidden
                    className="absolute right-5 top-4 font-mono text-[0.72rem] tracking-[0.15em] text-brand-600/45 transition-colors duration-500 group-hover:text-brand-600/80"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* ---- Icon plate straddling the band edge ---- */}
                <div className="relative z-10 -mt-7 px-6">
                  <span className="relative flex size-14 items-center justify-center overflow-hidden rounded-2xl bg-white text-brand-700 shadow-[0_6px_16px_-8px_rgba(174,49,53,0.45)] ring-4 ring-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-white">
                    <span
                      aria-hidden
                      className="absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
                    />
                    <Icon name={ind.icon} className="relative size-6" />
                  </span>
                </div>

                <h3 className="relative mt-4 px-6 font-display text-[1.12rem] leading-snug text-ink-950 transition-colors duration-300 group-hover:text-brand-800">
                  {ind.name}
                </h3>
                <p className="relative mt-2 px-6 text-pretty text-[0.88rem] leading-relaxed text-ink-600">
                  {ind.description}
                </p>

                {/* What we actually put in front of this sector. */}
                <ul className="relative mt-5 flex flex-wrap gap-1.5 px-6">
                  {ind.builds.map((b) => (
                    <li
                      key={b}
                      className="rounded-lg border border-ink-200 bg-ink-50/70 px-2.5 py-1 text-[0.72rem] font-medium text-ink-600 transition-colors duration-500 group-hover:border-brand-200 group-hover:bg-white group-hover:text-brand-800"
                    >
                      {b}
                    </li>
                  ))}
                </ul>

                <span className="relative mt-auto flex items-center gap-1.5 px-6 pb-6 pt-5 text-[0.8rem] font-semibold text-brand-700 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  See what we build
                  <ArrowUpRight aria-hidden className="size-3.5" />
                </span>

                {/* Accent that draws itself along the foot of the card. */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-brand-600 to-brand-400 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                />
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
