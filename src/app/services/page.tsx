import type { Metadata } from "next";
import { Check } from "lucide-react";
import { services, secondaryServices } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom software development, enterprise ERP, mobile apps, AI & machine learning, business intelligence and digital commerce — engineered end to end by TechnoBren Infotech.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services | TechnoBren Infotech",
    description:
      "Custom software, enterprise ERP, mobile, AI/ML, BI and digital commerce engineering.",
    url: "/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="You envision,"
        accent="we deliver."
        description="TechnoBren is a team of skilled, dedicated professionals committed to helping you and your product grow, achieve success and reach new heights. These are the practices we run end to end."
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <Button href="/contact" size="lg" arrow>
            Start a Project
          </Button>
          <Button href="/work" size="lg" variant="secondary">
            View Our Work
          </Button>
        </div>
      </PageHero>

      {/* ---------- Practice detail ---------- */}
      <section className="border-t border-ink-100">
        {services.map((s, i) => (
          <div
            key={s.slug}
            id={s.slug}
            className={`scroll-mt-24 border-b border-ink-100 py-12 sm:py-14 lg:py-16 ${
              i % 2 === 1 ? "bg-[var(--canvas-subtle)]" : ""
            }`}
          >
            <Container size="wide">
              <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
                <div className="lg:sticky lg:top-28 lg:self-start">
                  <Reveal>
                    <div className="flex items-center gap-4">
                      <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 text-white shadow-[0_6px_16px_-8px_rgba(174,49,53,0.42)]">
                        <Icon name={s.icon} className="size-5" />
                      </span>
                      <span className="font-mono text-[0.8rem] text-ink-300">
                        {String(i + 1).padStart(2, "0")} / {services.length}
                      </span>
                    </div>
                  </Reveal>

                  <Reveal delay={1}>
                    <h2 className="mt-6 font-display text-[1.8rem] leading-tight text-ink-950 sm:text-[2.3rem]">
                      {s.title}
                    </h2>
                  </Reveal>

                  <Reveal delay={2}>
                    <p className="mt-4 max-w-lg text-pretty text-[1rem] leading-[1.7] text-ink-600">
                      {s.description}
                    </p>
                  </Reveal>

                  <Reveal delay={3}>
                    <Button href="/contact" className="mt-7" arrow>
                      Discuss your requirement
                    </Button>
                  </Reveal>
                </div>

                <Reveal delay={2}>
                  <div className="rounded-2xl border border-ink-200 bg-white p-6 sm:p-7">
                    <h3 className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink-500">
                      What&rsquo;s included
                    </h3>
                    <ul className="mt-6 grid gap-x-6 gap-y-3.5 sm:grid-cols-2">
                      {s.capabilities.map((c) => (
                        <li
                          key={c}
                          className="flex items-start gap-2.5 text-[0.92rem] text-ink-700"
                        >
                          <Check
                            className="mt-0.5 size-4 shrink-0 text-brand-600"
                            aria-hidden
                          />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            </Container>
          </div>
        ))}
      </section>

      {/* ---------- Secondary practices ---------- */}
      <section className="py-14 sm:py-18">
        <Container size="wide">
          <SectionHeading
            align="center"
            eyebrow="Also offering"
            title="Supporting capabilities"
            description="Practices that wrap around delivery to make sure what we build lands well and keeps working."
            className="mx-auto"
          />

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {secondaryServices.map((s, i) => (
              <Reveal
                as="li"
                key={s.title}
                delay={i % 3}
                className="group rounded-3xl border border-ink-200/80 bg-white p-7 shadow-(--shadow-card) transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-brand-200 hover:shadow-(--shadow-card-hover)"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 text-white shadow-[0_6px_16px_-8px_rgba(174,49,53,0.42)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]">
                  <Icon name={s.icon} className="size-5" />
                </span>
                <h3 className="mt-5 font-display text-[1.08rem] text-ink-950">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-pretty text-[0.88rem] leading-relaxed text-ink-600">
                  {s.description}
                </p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
