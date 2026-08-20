import { Globe2, Building2, Users2 } from "lucide-react";
import { offices } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { GlobalReach } from "@/components/visuals/GlobalReach";

/**
 * Positioning + global footprint. Two columns of real substance rather than
 * another icon grid.
 */
export function AboutStripSection() {
  return (
    <section className="relative overflow-x-clip border-t border-ink-100 bg-[var(--canvas-subtle)] py-14 sm:py-18 lg:py-22">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="Who we are"
              title={
                <>
                  An offshore software partner with a{" "}
                  <span className="text-brand-700">global footprint</span>
                </>
              }
              description="TechnoBren is an offshore software development company based in India, delivering web design, development and enterprise solutions. With a presence across India, the UAE and the USA, we are trusted by clients worldwide."
            />

            <Reveal delay={3}>
              <p className="mt-6 max-w-xl text-pretty text-[0.95rem] leading-[1.7] text-ink-500">
                Specialising in Microsoft and open-source technologies, we are equipped
                to provide end-to-end solutions — offshore development, web-enabled
                applications, e-commerce platforms and .NET application development.
              </p>
            </Reveal>

            <Reveal delay={4}>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="/about" arrow>
                  Read our story
                </Button>
                <Button href="/careers" variant="secondary">
                  Join the team
                </Button>
              </div>
            </Reveal>

            <Reveal delay={5}>
              <ul className="mt-9 grid gap-3 sm:grid-cols-3">
                {[
                  { icon: Globe2, k: "3", v: "Countries" },
                  { icon: Building2, k: String(offices.length), v: "Offices" },
                  { icon: Users2, k: "24/7", v: "Operations" },
                ].map((x) => (
                  <li
                    key={x.v}
                    className="group rounded-2xl border border-ink-200 bg-white p-4 shadow-(--shadow-card) transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-brand-200"
                  >
                    <span className="flex size-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors duration-500 group-hover:bg-brand-600 group-hover:text-white">
                      <x.icon className="size-4" aria-hidden />
                    </span>
                    <p className="mt-3 font-display text-[1.45rem] leading-none text-ink-950">
                      {x.k}
                    </p>
                    <p className="mt-1.5 text-[0.8rem] text-ink-600">{x.v}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* ---- Offices ---- */}
          <Reveal delay={2}>
            <div className="overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-(--shadow-card)">
              <div className="flex items-center justify-between border-b border-ink-200 bg-ink-50/60 px-6 py-4">
                <h3 className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink-500">
                  Where we work
                </h3>
                <span className="font-mono text-[0.68rem] text-ink-600">
                  {offices.length} locations
                </span>
              </div>

              {/* the footprint, drawn as the logo's arcs between office nodes */}
              <div className="border-b border-ink-100 bg-[var(--canvas-subtle)] px-5 pb-3 pt-5">
                <GlobalReach />
              </div>

              <ul className="divide-y divide-ink-100">
                {offices.map((o) => (
                  <li
                    key={o.city}
                    className="group flex items-start gap-4 px-6 py-3.5 transition-colors duration-300 hover:bg-brand-50/30"
                  >
                    <span className="mt-0.5 text-lg leading-none" aria-hidden>
                      {o.flag}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="flex items-center gap-2 text-[0.92rem] font-semibold text-ink-950">
                        {o.city}
                        <span className="text-[0.78rem] font-normal text-ink-600">
                          {o.country}
                        </span>
                        {o.hq && (
                          <span className="rounded border border-brand-200 bg-brand-50 px-1.5 py-px font-mono text-[0.6rem] uppercase tracking-wider text-brand-700">
                            HQ
                          </span>
                        )}
                      </p>
                      <p className="mt-1 text-pretty text-[0.82rem] leading-relaxed text-ink-500">
                        {o.address}
                      </p>
                    </div>
                    <span
                      aria-hidden
                      className="mt-1 size-1.5 shrink-0 rounded-full bg-ink-200 transition-colors duration-300 group-hover:bg-brand-500"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
