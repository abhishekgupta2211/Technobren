import type { Metadata } from "next";
import { Info, Mail } from "lucide-react";
import { coreValues, offices, contact, techCategories } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join TechnoBren Infotech. We hire engineers, designers and analysts across our offices in India, the UAE and the USA.",
  alternates: { canonical: "/careers" },
  openGraph: {
    title: "Careers | TechnoBren Infotech",
    description: "Join a team that lives, breathes and dreams technology.",
    url: "/careers",
  },
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Our team lives, breathes"
        accent="and dreams technology."
        description="Visionaries, dreamers, specialists and perfectionists. Our strength lies in the diversity, dedication and expertise we bring to every project — and we're always interested in people who feel the same way."
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <Button
            href={`mailto:${contact.primaryEmail}?subject=Career%20enquiry`}
            size="lg"
            arrow
          >
            Send Us Your Profile
          </Button>
          <Button href="/about" size="lg" variant="secondary">
            About TechnoBren
          </Button>
        </div>
      </PageHero>

      {/* ---------- Openings ---------- */}
      <section className="border-t border-ink-100 bg-[var(--canvas-subtle)] py-14 sm:py-18">
        <Container size="wide">
          <SectionHeading
            eyebrow="Open roles"
            title={
              <>
                No published vacancies <span className="text-brand-700">right now</span>
              </>
            }
            description="We keep this page honest — when we have a live opening it will be listed here with a full description. In the meantime, speculative applications are genuinely read."
          />

          <Reveal delay={2}>
            <div className="mt-10 flex flex-col gap-5 rounded-2xl border border-ink-200 bg-white p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div className="flex items-start gap-3.5">
                <Info className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden />
                <p className="max-w-xl text-pretty text-[0.94rem] leading-relaxed text-ink-600">
                  Send your CV and a short note about what you want to work on. If there
                  is a fit now or later, we will get in touch — nothing is discarded.
                </p>
              </div>
              <a
                href={`mailto:${contact.primaryEmail}?subject=Career%20enquiry`}
                className="group inline-flex shrink-0 items-center gap-2.5 rounded-xl border border-ink-200 px-4 py-3 text-[0.88rem] font-medium text-ink-800 transition-colors duration-300 hover:border-brand-200 hover:bg-brand-50 hover:text-brand-800"
              >
                <Mail className="size-4 text-brand-600" aria-hidden />
                {contact.primaryEmail}
              </a>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ---------- Disciplines ---------- */}
      <section className="border-t border-ink-100 py-14 sm:py-18">
        <Container size="wide">
          <SectionHeading
            eyebrow="Disciplines"
            title={
              <>
                The work we <span className="text-brand-700">actually do</span>
              </>
            }
            description="These are the areas our engineers work across day to day. If your experience sits in any of them, we would like to hear from you."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {techCategories.map((c, i) => (
              <Reveal
                key={c.name}
                delay={i % 3}
                className="rounded-2xl border border-ink-200 bg-white p-6 transition-colors duration-500 hover:border-brand-200"
              >
                <h3 className="font-display text-[1.1rem] text-ink-950">{c.name}</h3>
                <p className="mt-2 text-[0.86rem] leading-relaxed text-ink-500">
                  {c.blurb}
                </p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {c.items.slice(0, 5).map((t) => (
                    <li
                      key={t}
                      className="rounded-lg border border-ink-200 bg-ink-50/70 px-2.5 py-1 text-[0.74rem] font-medium text-ink-600"
                    >
                      {t}
                    </li>
                  ))}
                  {c.items.length > 5 && (
                    <li className="px-1 py-1 text-[0.74rem] text-ink-600">
                      +{c.items.length - 5}
                    </li>
                  )}
                </ul>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- Values + locations ---------- */}
      <section className="border-t border-ink-100 bg-[var(--canvas-subtle)] py-14 sm:py-18">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="How we work"
                title="What we hold ourselves to"
                description="Our core values are the guiding principles that define who we are and how we conduct our business every day."
              />
              <ul className="mt-9 space-y-5">
                {coreValues.map((v, i) => (
                  <Reveal as="li" key={v.title} delay={i % 3} className="flex gap-4">
                    <span className="mt-1 font-mono text-[0.72rem] text-brand-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-[1.05rem] text-ink-950">
                        {v.title}
                      </h3>
                      <p className="mt-1.5 max-w-xl text-pretty text-[0.89rem] leading-relaxed text-ink-600">
                        {v.description}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>

            <Reveal delay={2}>
              <div className="overflow-hidden rounded-2xl border border-ink-200 bg-white lg:sticky lg:top-28">
                <div className="border-b border-ink-200 bg-ink-50/60 px-6 py-4">
                  <h3 className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink-500">
                    Where you could work
                  </h3>
                </div>
                <ul className="divide-y divide-ink-100">
                  {offices.map((o) => (
                    <li key={o.city} className="flex items-center gap-3.5 px-6 py-4">
                      <span className="text-lg leading-none" aria-hidden>
                        {o.flag}
                      </span>
                      <div>
                        <p className="text-[0.9rem] font-semibold text-ink-950">
                          {o.city}
                        </p>
                        <p className="text-[0.78rem] text-ink-500">{o.country}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
