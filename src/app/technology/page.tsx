import type { Metadata } from "next";
import { techCategories, platformStrip } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Technology",
  description:
    "The full TechnoBren stack — mobile, front end, backend, databases, CMS & commerce platforms, cloud infrastructure and DevOps tooling.",
  alternates: { canonical: "/technology" },
  openGraph: {
    title: "Technology | TechnoBren Infotech",
    description:
      "Mobile, front end, backend, database, CMS and cloud infrastructure expertise.",
    url: "/technology",
  },
};

const slug = (s: string) => s.toLowerCase().replace(/[^a-z]+/g, "-");

export default function TechnologyPage() {
  const total = techCategories.reduce((n, c) => n + c.items.length, 0);

  return (
    <>
      <PageHero
        eyebrow="Technology"
        title="Building world-class solutions on a"
        accent="proven stack."
        description="As a leading app solutions provider, we design, develop and deploy enterprise-grade applications swiftly and efficiently — choosing the technology that fits the problem, not the trend."
      >
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Button href="/contact" size="lg" arrow>
            Talk to Our Team
          </Button>
          <span className="rounded-xl border border-ink-200 bg-white px-4 py-2.5 font-mono text-[0.78rem] text-ink-600 shadow-[0_1px_2px_rgba(16,15,20,0.04)]">
            {total} technologies · {techCategories.length} disciplines
          </span>
        </div>
      </PageHero>

      {/* ---------- Marquee ---------- */}
      <div className="marquee-host mask-edges relative flex overflow-hidden border-y border-ink-100 py-6">
        <div
          className="animate-marquee flex shrink-0 items-center gap-3"
          style={{ ["--marquee-duration" as string]: "44s" }}
        >
          {[...platformStrip, ...platformStrip, ...platformStrip, ...platformStrip].map(
            (p, i) => (
              <span
                key={p + i}
                className="shrink-0 rounded-xl border border-ink-200 bg-white px-5 py-2.5 text-[0.85rem] font-medium text-ink-600 shadow-[0_1px_2px_rgba(16,15,20,0.03)] transition-colors duration-300 hover:border-brand-300 hover:text-brand-700"
              >
                {p}
              </span>
            ),
          )}
        </div>
      </div>

      {/* ---------- Categories ---------- */}
      <section className="py-14 sm:py-18">
        <Container size="wide">
          <SectionHeading
            eyebrow="The stack"
            title={
              <>
                Every layer, <span className="text-brand-700">covered</span>
              </>
            }
            description="From the device in your customer's hand down to the container running in production."
          />

          <div className="mt-10 space-y-4">
            {techCategories.map((c, i) => (
              <Reveal key={c.name} delay={i % 3}>
                <div
                  id={slug(c.name)}
                  className="scroll-mt-24 overflow-hidden rounded-2xl border border-ink-200 bg-white transition-colors duration-500 hover:border-brand-200"
                >
                  <div className="grid lg:grid-cols-[18rem_1fr]">
                    <div className="relative border-b border-ink-100 bg-[var(--canvas-subtle)] p-6 sm:p-7 lg:border-b-0 lg:border-r">
                      <span className="font-mono text-[0.7rem] text-ink-300">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-2 font-display text-[1.4rem] text-ink-950">
                        {c.name}
                      </h3>
                      <p className="mt-2 text-pretty text-[0.87rem] leading-relaxed text-ink-500">
                        {c.blurb}
                      </p>
                      <p className="mt-5 inline-flex items-center gap-2 rounded-lg border border-brand-200 bg-brand-50 px-3 py-1.5 font-mono text-[0.7rem] text-brand-700">
                        <span
                          className="size-1.5 rounded-full bg-brand-600"
                          aria-hidden
                        />
                        {c.items.length} technologies
                      </p>
                    </div>

                    <ul className="grid grid-cols-2 gap-2.5 p-6 sm:grid-cols-3 sm:p-8 xl:grid-cols-4">
                      {c.items.map((item) => (
                        <li
                          key={item}
                          className="group flex items-center gap-2.5 rounded-xl border border-ink-200 bg-white px-3.5 py-3 text-[0.85rem] font-medium text-ink-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800"
                        >
                          <span
                            aria-hidden
                            className="size-1.5 shrink-0 rounded-full bg-brand-400 transition-colors duration-300 group-hover:bg-brand-600"
                          />
                          <span className="truncate">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
