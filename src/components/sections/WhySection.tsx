import { differentiators, stats } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

/**
 * Why TechnoBren.
 *
 * The proof sits on the left as a stack of counters that run when the section
 * arrives; the reasons sit on the right as a divided list with an accent bar
 * that wipes in on hover. Neither is a card grid, which stops this reading as
 * two grey boxes parked next to each other.
 */
export function WhySection() {
  return (
    <section className="relative overflow-x-clip border-t border-ink-100 bg-white py-14 sm:py-18 lg:py-22">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[10%] top-[24%] size-[32rem] rounded-full bg-[radial-gradient(circle,rgba(174,49,53,0.06),transparent_66%)] blur-3xl"
      />

      <Container size="wide" className="relative">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* ---- Proof ---- */}
          <div className="lg:sticky lg:top-28 lg:h-fit lg:self-start">
            <SectionHeading
              eyebrow="Why TechnoBren"
              title={
                <>
                  A partner that shows up,{" "}
                  <span className="text-brand-700">every time</span>
                </>
              }
              description="We promise. We deliver. Got an idea? Partner with us and watch it come to life — we go the extra mile for every project we undertake."
            />

            <Reveal delay={3}>
              <dl className="mt-9 space-y-px overflow-hidden rounded-2xl border border-ink-200 bg-ink-200">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-baseline gap-5 bg-white px-5 py-4 transition-colors duration-500 hover:bg-brand-50/40"
                  >
                    <dt className="w-[4.5rem] shrink-0 font-display text-[1.9rem] leading-none text-brand-700">
                      <Counter value={s.value} suffix={s.suffix} />
                    </dt>
                    <dd className="min-w-0">
                      <span className="block text-[0.9rem] font-semibold text-ink-950">
                        {s.label}
                      </span>
                      <span className="mt-0.5 block text-[0.79rem] leading-snug text-ink-600">
                        {s.sub}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={4}>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button href="/contact" arrow>
                  Start a Project
                </Button>
                <span className="text-[0.82rem] text-ink-600">First 7 days on us</span>
              </div>
            </Reveal>
          </div>

          {/* ---- Reasons ---- */}
          <ul className="divide-y divide-ink-100 border-y border-ink-100">
            {differentiators.map((d, i) => (
              <li key={d.title} className="group relative overflow-hidden">
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-gradient-to-b from-brand-500 to-brand-700 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
                />
                <Reveal delay={i % 3}>
                  <div className="flex items-start gap-5 py-6 pl-5 pr-2 transition-colors duration-500 group-hover:bg-brand-50/30 sm:py-7 sm:pl-6">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 text-white shadow-[0_6px_16px_-8px_rgba(174,49,53,0.42)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]">
                      <Icon name={d.icon} className="size-5" />
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-3">
                        <h3 className="font-display text-[1.1rem] leading-snug text-ink-950">
                          {d.title}
                        </h3>
                        <span
                          aria-hidden
                          className="ml-auto font-mono text-[0.72rem] text-ink-400 transition-colors duration-500 group-hover:text-brand-500"
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <p className="mt-2 max-w-xl text-pretty text-[0.9rem] leading-relaxed text-ink-600">
                        {d.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
