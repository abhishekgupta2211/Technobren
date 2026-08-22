import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { industries } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

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
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink-200/80 bg-white p-7 shadow-(--shadow-card) transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-brand-200 hover:shadow-(--shadow-card-hover)"
              >
                {/* the logo's arc motif, sweeping in on hover */}
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

                <div className="relative flex items-start justify-between gap-4">
                  {/* The tile fills from the bottom, matching the nav panel. */}
                  <span className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-brand-200/60 bg-brand-50 text-brand-700 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-brand-500 group-hover:text-white group-hover:shadow-[0_8px_18px_-8px_rgba(174,49,53,0.6)]">
                    <span
                      aria-hidden
                      className="absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
                    />
                    <Icon name={ind.icon} className="relative size-5" />
                  </span>
                  <span className="font-mono text-[0.7rem] text-ink-300 transition-colors duration-500 group-hover:text-brand-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="relative mt-5 font-display text-[1.12rem] leading-snug text-ink-950 transition-colors duration-300 group-hover:text-brand-800">
                  {ind.name}
                </h3>
                <p className="relative mt-2 text-pretty text-[0.88rem] leading-relaxed text-ink-600">
                  {ind.description}
                </p>

                {/* What we actually put in front of this sector. */}
                <ul className="relative mt-5 flex flex-wrap gap-1.5">
                  {ind.builds.map((b) => (
                    <li
                      key={b}
                      className="rounded-lg border border-ink-200 bg-ink-50/70 px-2.5 py-1 text-[0.72rem] font-medium text-ink-600 transition-colors duration-500 group-hover:border-brand-200 group-hover:bg-white group-hover:text-brand-800"
                    >
                      {b}
                    </li>
                  ))}
                </ul>

                <span className="relative mt-auto flex items-center gap-1.5 pt-5 text-[0.8rem] font-semibold text-brand-700 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
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
