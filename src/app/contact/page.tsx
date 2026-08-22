import type { Metadata } from "next";
import { Mail, Phone, MapPin, ShieldCheck } from "lucide-react";
import { contact, offices, site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with TechnoBren Infotech. Offices in Jaunpur (HQ), Ahmedabad, Dubai and Uganda. All enquiries covered by NDA.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | TechnoBren Infotech",
    description:
      "Start a project with TechnoBren Infotech. All enquiries covered by NDA.",
    url: "/contact",
  },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: `Contact ${site.legalName}`,
  url: `${site.url}/contact`,
  mainEntity: {
    "@type": "Organization",
    name: site.legalName,
    email: contact.primaryEmail,
    telephone: contact.phones,
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />

      <PageHero
        eyebrow="Contact"
        title="Start your journey"
        accent="with us."
        description="One of our team will reach out to set up a call when it works best for you. It's a simple way for us to understand what you're looking for and explore how we can help — real conversations, fresh ideas, and building something great together."
        aside={
          <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-(--shadow-card)">
            <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-ink-500">
              Reach us directly
            </p>
            <a
              href={`mailto:${contact.primaryEmail}`}
              className="group mt-5 flex items-center gap-3 rounded-xl border border-ink-200 px-4 py-3 transition-colors duration-300 hover:border-brand-200 hover:bg-brand-50/50"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
                <Mail className="size-4" aria-hidden />
              </span>
              <span className="truncate text-[0.88rem] font-medium text-ink-900">
                {contact.primaryEmail}
              </span>
            </a>
            <a
              href={`https://wa.me/${contact.primaryPhone.replace(/[^\d]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-2 flex items-center gap-3 rounded-xl border border-ink-200 px-4 py-3 transition-colors duration-300 hover:border-brand-200 hover:bg-brand-50/50"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
                <Phone className="size-4" aria-hidden />
              </span>
              <span className="truncate text-[0.88rem] font-medium text-ink-900">
                {contact.primaryPhone} (WhatsApp Call / Chat)
              </span>
            </a>
            <p className="mt-5 flex items-start gap-2 text-pretty text-[0.83rem] leading-relaxed text-ink-600">
              <ShieldCheck
                className="mt-0.5 size-4 shrink-0 text-brand-600"
                aria-hidden
              />
              Every enquiry is covered by an NDA. First 7 days on us.
            </p>
          </div>
        }
      />

      <section className="border-t border-ink-100 bg-[var(--canvas-subtle)] py-12 sm:py-14 lg:py-16">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            <Reveal>
              <ContactForm />
            </Reveal>

            <div className="space-y-4">
              <Reveal delay={1}>
                <div className="rounded-2xl border border-ink-200 bg-white shadow-(--shadow-card) p-6 sm:p-7">
                  <h3 className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink-500">
                    Direct contact
                  </h3>

                  <div className="mt-5 space-y-2.5">
                    {contact.emails.map((item) => (
                      <a
                        key={item.email}
                        href={`mailto:${item.email}`}
                        className="group flex items-center gap-3.5 rounded-xl border border-ink-200 p-3.5 transition-colors duration-300 hover:border-brand-200 hover:bg-brand-50/50"
                      >
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
                          <Mail className="size-4" aria-hidden />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[0.72rem] font-medium text-ink-500">
                            {item.label}
                          </span>
                          <span className="block truncate text-[0.88rem] font-semibold text-ink-950">
                            {item.email}
                          </span>
                        </span>
                      </a>
                    ))}
                  </div>

                    <div className="mt-3 rounded-xl border border-ink-200 p-4">
                      <span className="flex items-center gap-2 text-[0.78rem] font-medium text-ink-600">
                        <Phone className="size-3.5 text-brand-600" aria-hidden />
                        WhatsApp Call & Chat
                      </span>
                      <ul className="mt-3 space-y-2">
                        {contact.phones.map((p) => (
                          <li key={p}>
                            <a
                              href={`https://wa.me/${p.replace(/[^\d]/g, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-[0.88rem] font-medium text-ink-800 transition-colors duration-300 hover:text-brand-700"
                            >
                              {p}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                </div>
              </Reveal>

              <Reveal delay={2}>
                <div className="overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-(--shadow-card)">
                  <div className="flex items-center justify-between border-b border-ink-200 bg-ink-50/60 px-6 py-4">
                    <h3 className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink-500">
                      Our offices
                    </h3>
                    <span className="font-mono text-[0.68rem] text-ink-600">
                      {offices.length}
                    </span>
                  </div>
                  <ul className="divide-y divide-ink-100">
                    {offices.map((o) => (
                      <li key={o.city} className="flex items-start gap-3.5 px-6 py-4">
                        <MapPin
                          className="mt-0.5 size-4 shrink-0 text-brand-600"
                          aria-hidden
                        />
                        <div className="min-w-0">
                          <p className="flex items-center gap-2 text-[0.9rem] font-semibold text-ink-950">
                            {o.city}
                            {o.city !== o.country && (
                              <span className="text-[0.76rem] font-normal text-ink-600">
                                {o.country}
                              </span>
                            )}
                            {o.hq && (
                              <span className="rounded border border-brand-200 bg-brand-50 px-1.5 py-px font-mono text-[0.6rem] uppercase tracking-wider text-brand-700">
                                HQ
                              </span>
                            )}
                          </p>
                          {o.address && (
                            <p className="mt-1 text-pretty text-[0.8rem] leading-relaxed text-ink-500">
                              {o.address}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={3}>
                <div className="rounded-2xl border border-brand-200 bg-brand-50/70 p-6">
                  <p className="font-display text-[1.05rem] text-brand-900">
                    First 7 days on us
                  </p>
                  <p className="mt-2 text-pretty text-[0.88rem] leading-relaxed text-brand-800/80">
                    Experience our excellence with zero upfront investment — start a
                    trial engagement and see how we work before you commit.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
