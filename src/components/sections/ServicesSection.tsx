import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ServicePattern } from "@/components/visuals/ServicePattern";

type Service = (typeof services)[number];

/**
 * What we do.
 *
 * The six practices ride a continuous horizontal lane rather than sitting in a
 * static grid. The set is rendered twice so the loop is seamless, the lane pauses
 * on hover so a card can actually be read and clicked, and with reduced motion it
 * degrades to an ordinary swipeable row.
 *
 * Each card opens with its own artwork — six arrangements of the logo's
 * arc-and-node motif — with the icon plate straddling the edge of that band.
 */
function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <Link
      href={`/services#${service.slug}`}
      className="group flex w-[19rem] shrink-0 flex-col overflow-hidden rounded-3xl border border-ink-200/80 bg-white shadow-(--shadow-card) transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-brand-200 hover:shadow-(--shadow-card-hover) sm:w-[21rem]"
    >
      {/* ---- Artwork band ---- */}
      <div className="relative h-32 overflow-hidden bg-gradient-to-br from-brand-50/80 via-white to-[var(--canvas-subtle)]">
        <div aria-hidden className="absolute inset-0 bg-grid opacity-50" />
        <ServicePattern
          variant={index}
          className="absolute inset-0 size-full transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(174,49,53,0.12),transparent_62%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        <span
          aria-hidden
          className="absolute right-5 top-4 font-mono text-[0.75rem] tracking-[0.15em] text-brand-600/45 transition-colors duration-500 group-hover:text-brand-600/80"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* ---- Icon straddling the band edge ---- */}
      <div className="relative z-10 -mt-7 px-6">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 text-white shadow-[0_6px_16px_-8px_rgba(174,49,53,0.45)] ring-4 ring-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]">
          <Icon name={service.icon} className="size-6" />
        </span>
      </div>

      {/* ---- Body ---- */}
      <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
        <h3 className="font-display text-[1.2rem] leading-snug text-ink-950">
          {service.title}
        </h3>
        <p className="mt-2.5 text-pretty text-[0.89rem] leading-relaxed text-ink-600">
          {service.short}
        </p>

        <ul className="mt-5 flex flex-1 flex-wrap content-start gap-1.5">
          {service.capabilities.slice(0, 3).map((c) => (
            <li
              key={c}
              className="rounded-lg border border-ink-200 bg-[var(--canvas-subtle)] px-2.5 py-1.5 text-[0.73rem] font-medium text-ink-700 transition-colors duration-500 group-hover:border-brand-200 group-hover:bg-brand-50 group-hover:text-brand-800"
            >
              {c}
            </li>
          ))}
          <li className="rounded-lg border border-dashed border-ink-200 px-2.5 py-1.5 text-[0.73rem] font-medium text-ink-500">
            +{service.capabilities.length - 3}
          </li>
        </ul>
      </div>

      {/* ---- Action bar ---- */}
      <div className="flex items-center justify-between border-t border-ink-100 px-6 py-4 transition-colors duration-500 group-hover:border-brand-100 group-hover:bg-brand-50/50">
        <span className="text-[0.85rem] font-semibold text-ink-900 transition-colors duration-300 group-hover:text-brand-700">
          Explore service
        </span>
        <span className="flex size-8 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-600 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-brand-600 group-hover:bg-brand-600 group-hover:text-white">
          <ArrowUpRight
            aria-hidden
            className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </Link>
  );
}

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative overflow-x-clip border-t border-ink-100 bg-[var(--canvas-subtle)] py-14 sm:py-18 lg:py-22"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[14%] top-[12%] size-[36rem] rounded-full bg-[radial-gradient(circle,rgba(174,49,53,0.07),transparent_66%)] blur-3xl"
      />

      <Container size="wide" className="relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="What we do"
            title={
              <>
                A comprehensive suite of{" "}
                <span className="text-brand-700">software engineering</span> services
              </>
            }
            description="We help startups, SMEs and enterprises harness technology to drive transformation — modernising platforms and processes to unlock growth."
          />
          <Reveal delay={2} className="shrink-0">
            <Button href="/services" variant="secondary" arrow>
              See all services
            </Button>
          </Reveal>
        </div>
      </Container>

      {/* ---- Continuous lane ---- */}
      <Reveal delay={1} className="relative mt-10">
        <div className="marquee-host mask-edges flex overflow-hidden py-2 motion-reduce:overflow-x-auto motion-reduce:[scrollbar-width:none]">
          <ul
            className="animate-marquee flex shrink-0 items-stretch gap-6 px-3 motion-reduce:animate-none"
            style={{ ["--marquee-duration" as string]: "56s" }}
          >
            {[...services, ...services].map((s, i) => (
              <li key={`${s.slug}-${i}`} className="flex">
                <ServiceCard service={s} index={i % services.length} />
              </li>
            ))}
          </ul>
        </div>

        <Container size="wide">
          <p className="mt-6 text-center font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink-500">
            Hover to pause · {services.length} practices
          </p>
        </Container>
      </Reveal>
    </section>
  );
}
