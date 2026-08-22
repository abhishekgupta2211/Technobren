import { offices } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { WorldMap } from "@/components/visuals/WorldMap";

/**
 * Global presence.
 *
 * The office register, drawn as a map rather than listed as a table — the point
 * of four offices across three countries is the geography, so the geography is
 * the visual. Copy is deliberately short: the map is the argument.
 */
export function GlobalPresenceSection() {
  const countries = new Set(offices.map((o) => o.country)).size;

  return (
    <section
      id="offices"
      className="scroll-mt-24 relative overflow-x-clip border-t border-ink-100 bg-white py-14 sm:py-18 lg:py-22"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[8%] top-1/3 size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(174,49,53,0.07),transparent_66%)] blur-3xl"
      />

      <Container size="wide" className="relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <p className="flex items-center gap-2.5 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-ink-500">
                <span aria-hidden className="h-px w-5 bg-brand-300" />
                Global presence
              </p>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-5 max-w-xl font-display text-[2.1rem] leading-[1.02] text-ink-950 sm:text-[2.7rem]">
                One team,{" "}
                <span className="text-brand-700">{countries} time zones</span>.
              </h2>
            </Reveal>
          </div>

          <Reveal delay={2}>
            <p className="max-w-sm text-pretty text-[0.94rem] leading-relaxed text-ink-600">
              {offices.map((o) => o.city).join(" · ")}. Select an office to see where
              it sits and what we run from it.
            </p>
          </Reveal>
        </div>

        <Reveal delay={2} className="mt-10">
          <WorldMap />
        </Reveal>
      </Container>
    </section>
  );
}
