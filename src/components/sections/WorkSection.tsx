import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { solutions } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { DASHBOARDS } from "@/components/visuals/dashboard";
import { cn } from "@/lib/utils";

/**
 * What we've built. The first two products get the wide treatment, the rest sit
 * in a three-up row — an asymmetric grid keeps this from reading as a card wall.
 */
export function WorkSection() {
  return (
    <section
      id="work"
      className="relative overflow-x-clip border-t border-ink-100 py-14 sm:py-18 lg:py-22"
    >
      <Container size="wide">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Our work"
            title={
              <>
                Platforms we&rsquo;ve designed,{" "}
                <span className="text-brand-700">built and deployed</span>
              </>
            }
            description="Production systems running real operations — from enterprise resource planning to offline-capable field sales tooling."
          />
          <Reveal delay={2} className="shrink-0">
            <Button href="/work" variant="secondary" arrow>
              View our work
            </Button>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-6">
          {solutions.map((s, i) => {
            const wide = i < 2;
            return (
              <Reveal
                key={s.slug}
                delay={i}
                as="article"
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-ink-200 bg-white transition-all duration-500",
                  "shadow-(--shadow-card)",
                  "hover:-translate-y-1 hover:border-brand-200 hover:shadow-(--shadow-card-hover)",
                  wide ? "lg:col-span-3" : "lg:col-span-2",
                )}
              >
                <Link href={`/work#${s.slug}`} className="flex h-full flex-col">
                  {/* artwork */}
                  <div
                    className={cn(
                      "relative overflow-hidden border-b border-ink-100 bg-[var(--canvas-subtle)]",
                      wide ? "h-60 sm:h-72" : "h-52 sm:h-60",
                    )}
                  >
                    <div aria-hidden className="absolute inset-0 bg-grid opacity-60" />
                    {(() => {
                      const Dashboard = DASHBOARDS[i % DASHBOARDS.length];
                      return (
                        <Dashboard className="absolute inset-x-5 top-6 w-[calc(100%-2.5rem)] rounded-t-xl shadow-[0_1px_3px_rgba(16,15,20,0.04),0_12px_28px_-22px_rgba(16,15,20,0.28)] ring-1 ring-ink-200/70 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5 sm:inset-x-7 sm:top-8 sm:w-[calc(100%-3.5rem)]" />
                      );
                    })()}
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(174,49,53,0.1),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                  </div>

                  {/* body */}
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <div className="flex items-center gap-2.5">
                      <span className="flex size-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                        <Icon name={s.icon} className="size-4" />
                      </span>
                      <span className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-ink-600">
                        {s.category}
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-[1.3rem] leading-snug text-ink-950">
                      {s.name}
                    </h3>
                    <p className="mt-2.5 flex-1 text-pretty text-[0.9rem] leading-relaxed text-ink-600">
                      {s.summary}
                    </p>

                    <div className="mt-5 flex flex-wrap items-center gap-2">
                      {s.features.slice(0, wide ? 3 : 2).map((f) => (
                        <span
                          key={f}
                          className="rounded-lg border border-ink-200 bg-ink-50/60 px-2.5 py-1 text-[0.72rem] font-medium text-ink-600"
                        >
                          {f}
                        </span>
                      ))}
                      <span className="text-[0.72rem] text-ink-600">
                        +{s.features.length - (wide ? 3 : 2)} more
                      </span>
                    </div>

                    <span className="mt-6 inline-flex items-center gap-1.5 text-[0.82rem] font-semibold text-ink-500 transition-colors duration-300 group-hover:text-brand-700">
                      View details
                      <ArrowUpRight
                        aria-hidden
                        className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
