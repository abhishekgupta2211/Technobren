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
 * The six practices sit in a fixed three-column grid. They used to ride a
 * continuous horizontal lane, which meant half of them were always cut off at
 * the frame edge and the whole set could never be compared at a glance — a
 * moving target is a poor way to present a menu of what a company does.
 *
 * Each card opens with its own artwork — six arrangements of the logo's
 * arc-and-node motif — with the icon plate straddling the edge of that band.
 */
function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <Link
      href={`/services#${service.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink-200/80 bg-white shadow-(--shadow-card) transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-brand-200 hover:shadow-(--shadow-card-hover)"
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
        {/* Both boxes are floored to their longest case, so a two-line title or
            a three-line summary cannot make one grid row taller than the next. */}
        <h3 className="flex min-h-[3.3rem] items-start font-display text-[1.2rem] leading-snug text-ink-950">
          {service.title}
        </h3>
        <p className="mt-1 line-clamp-3 min-h-[4.4rem] text-pretty text-[0.89rem] leading-relaxed text-ink-600">
          {service.short}
        </p>

        {/* Fixed box: capability names wrap differently per service, and without
            a floor the grid rows end up different heights. */}
        <ul className="mt-5 flex h-[5.5rem] shrink-0 flex-wrap content-start gap-1.5 overflow-hidden">
          {service.capabilities.slice(0, 3).map((c) => (
            <li
              key={c}
              className="rounded-lg border border-ink-200 bg-[var(--canvas-subtle)] px-2.5 py-1.5 text-[0.73rem] font-medium text-ink-700 transition-colors duration-500 group-hover:border-brand-200 group-hover:bg-brand-50 group-hover:text-brand-800"
            >
              {c}
            </li>
          ))}
          <li className="rounded-lg border border-dashed border-ink-200 px-2.5 py-1.5 text-[0.73rem] font-medium text-ink-500">
            +{service.capabilities.length - 3} more
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
        <SectionHeading
          eyebrow="What we do"
          title={
            <>
              A comprehensive suite of{" "}
              <span className="text-brand-700">software engineering</span> services
            </>
          }
          description="We help startups, SMEs and enterprises harness technology to drive transformation — modernising platforms and processes to unlock growth."
          aside={
            <Button href="/services" variant="secondary" arrow>
              See all services
            </Button>
          }
        />
      </Container>

      <Container size="wide" className="relative">
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={i % 3} className="flex">
              <ServiceCard service={s} index={i} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
