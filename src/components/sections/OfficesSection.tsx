import { MapPin, Building2, Globe2 } from "lucide-react";
import { offices } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CountryMark } from "@/components/ui/CountryMark";

export function OfficesSection() {
  return (
    <section className="relative border-t border-ink-100 bg-[var(--canvas-subtle)] py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Soft background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 -z-10 size-[32rem] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(174,49,53,0.05),transparent_70%)] blur-3xl"
      />

      <Container size="wide">
        <SectionHeading
          eyebrow="Global Presence"
          title={
            <>
              Our Global Offices & <span className="text-brand-700">Headquarters</span>
            </>
          }
          description="TechnoBren operates globally with offices across India, the UAE, and Uganda to support seamless client operations 24/7."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {offices.map((office, index) => (
            <Reveal key={office.city} delay={index + 1}>
              <div
                className={`group relative flex h-full flex-col justify-between rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1.5 ${
                  office.hq
                    ? "border-brand-300 bg-white shadow-(--shadow-card) ring-1 ring-brand-200/50"
                    : "border-ink-200 bg-white/90 shadow-sm hover:border-brand-200 hover:shadow-(--shadow-card)"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <CountryMark country={office.country} />
                      <h3 className="font-display text-[1.18rem] font-bold text-ink-950">
                        {office.city}
                      </h3>
                    </div>
                    {office.hq ? (
                      <span className="rounded-full border border-brand-300 bg-brand-50/80 px-2.5 py-0.5 font-mono text-[0.62rem] font-semibold uppercase tracking-wider text-brand-700">
                        Headquarters
                      </span>
                    ) : (
                      <span className="text-[0.78rem] font-medium text-ink-500">
                        {office.country}
                      </span>
                    )}
                  </div>

                  <p className="mt-4 flex items-start gap-2.5 text-[0.85rem] leading-relaxed text-ink-600">
                    <MapPin className="mt-1 size-4 shrink-0 text-brand-600" aria-hidden />
                    <span>{office.address}</span>
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-ink-100 pt-4 text-[0.75rem] font-medium text-ink-500">
                  <span className="flex items-center gap-1.5">
                    <Building2 className="size-3.5 text-brand-500" />
                    {office.hq ? "Main Operations Hub" : "Regional Office"}
                  </span>
                  <span className="flex items-center gap-1 text-brand-700 group-hover:underline">
                    <Globe2 className="size-3.5" />
                    {office.country}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
