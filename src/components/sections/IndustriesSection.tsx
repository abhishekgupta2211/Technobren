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
            <Reveal
              as="li"
              key={ind.name}
              delay={i % 3}
              className="group relative overflow-hidden rounded-3xl border border-ink-200/80 bg-white p-7 shadow-(--shadow-card) transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-brand-200 hover:shadow-(--shadow-card-hover)"
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

              <div className="relative flex items-start gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 text-white shadow-[0_6px_16px_-8px_rgba(174,49,53,0.42)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]">
                  <Icon name={ind.icon} className="size-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-[1.08rem] leading-snug text-ink-950">
                    {ind.name}
                  </h3>
                  <p className="mt-2 text-pretty text-[0.88rem] leading-relaxed text-ink-600">
                    {ind.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
