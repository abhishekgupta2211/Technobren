import type { Metadata } from "next";
import { FileLock2, MessageSquareQuote, Target } from "lucide-react";
import { processSteps } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Methodology",
  description:
    "How TechnoBren Infotech delivers: discovery, design, development, testing, deployment and long-term support — with NDA protection and visible progress every cycle.",
  alternates: { canonical: "/methodology" },
  openGraph: {
    title: "Methodology | TechnoBren Infotech",
    description:
      "Discovery, design, development, testing, deployment and support — a delivery process built to remove surprises.",
    url: "/methodology",
  },
};

const PRINCIPLES = [
  {
    icon: MessageSquareQuote,
    title: "Understanding your requirement",
    body: "We take the time to listen and understand your needs, ensuring we deliver the best solution for your goals.",
  },
  {
    icon: FileLock2,
    title: "Non-Disclosure Agreement",
    body: "Our NDA ensures your confidential information stays secure and is not shared without consent — establishing trust from the first conversation.",
  },
  {
    icon: Target,
    title: "The right development approach",
    body: "We analyse your goals and suggest the development approach that will achieve effective results, rather than the one that suits us.",
  },
];

export default function MethodologyPage() {
  return (
    <>
      <PageHero
        eyebrow="Methodology"
        title="From first conversation to"
        accent="long-term support."
        description="A delivery process built to remove surprises. You see progress every cycle, you approve the product before it is built, and you own everything we ship."
        aside={
          <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-(--shadow-card)">
            <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-ink-500">
              The stages
            </p>
            <ol className="mt-5 space-y-px overflow-hidden rounded-2xl border border-ink-200 bg-ink-200">
              {processSteps.map((step) => (
                <li
                  key={step.id}
                  className="flex items-center gap-3.5 bg-white px-4 py-3"
                >
                  <span className="font-mono text-[0.78rem] text-brand-700">
                    {step.id}
                  </span>
                  <span className="text-[0.88rem] font-medium text-ink-800">
                    {step.title}
                  </span>
                  <span className="ml-auto font-mono text-[0.72rem] text-ink-500">
                    {step.deliverables.length}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        }
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <Button href="/contact" size="lg" arrow>
            Start a Project
          </Button>
          <Button href="/services" size="lg" variant="secondary">
            Explore Services
          </Button>
        </div>
      </PageHero>

      {/* ---------- Principles ---------- */}
      <section className="border-t border-ink-100 bg-[var(--canvas-subtle)] py-12 sm:py-14">
        <Container size="wide">
          <ul className="grid gap-4 lg:grid-cols-3">
            {PRINCIPLES.map((p, i) => (
              <Reveal
                as="li"
                key={p.title}
                delay={i}
                className="rounded-3xl border border-ink-200/80 bg-white p-7 shadow-(--shadow-card)"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 text-white shadow-[0_6px_16px_-8px_rgba(174,49,53,0.42)]">
                  <p.icon className="size-5" aria-hidden />
                </span>
                <h2 className="mt-5 font-display text-[1.1rem] text-ink-950">
                  {p.title}
                </h2>
                <p className="mt-2.5 text-pretty text-[0.9rem] leading-relaxed text-ink-600">
                  {p.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* ---------- Stages ---------- */}
      <section className="border-t border-ink-100 py-14 sm:py-18 lg:py-22">
        <Container size="wide">
          <SectionHeading
            eyebrow="The stages"
            title={
              <>
                Six stages, <span className="text-brand-700">no black boxes</span>
              </>
            }
            description="Every stage has a defined output you can review. Nothing moves forward until you have seen it."
          />

          <ol className="mt-10 grid gap-4 lg:grid-cols-2">
            {processSteps.map((step, i) => (
              <Reveal
                as="li"
                key={step.id}
                delay={i % 2}
                className="group relative overflow-hidden rounded-2xl border border-ink-200 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-brand-200 hover:shadow-(--shadow-card-hover) sm:p-8"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-20 -top-20 size-52 rounded-full bg-[radial-gradient(circle,rgba(174,49,53,0.1),transparent_64%)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="relative flex items-baseline gap-4">
                  <span className="font-display text-[2.4rem] leading-none text-ink-100 transition-colors duration-500 group-hover:text-brand-200">
                    {step.id}
                  </span>
                  <h3 className="font-display text-[1.4rem] text-ink-950">
                    {step.title}
                  </h3>
                </div>
                <p className="relative mt-4 text-pretty text-[0.95rem] leading-[1.7] text-ink-600">
                  {step.description}
                </p>
                <ul className="relative mt-5 flex flex-wrap gap-2">
                  {step.deliverables.map((d) => (
                    <li
                      key={d}
                      className="rounded-lg border border-ink-200 bg-ink-50/70 px-3 py-1.5 text-[0.78rem] font-medium text-ink-600 transition-colors duration-500 group-hover:border-brand-200 group-hover:bg-white group-hover:text-brand-800"
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}
