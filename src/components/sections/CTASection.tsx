import { Sparkles, ShieldCheck, Mail, Phone, Clock, Globe2 } from "lucide-react";
import { contact, offices } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";

/** The engagement flow, verbatim from the old contact page's "We're Here to Help". */
const NEXT_STEPS = [
  {
    title: "Share your requirement",
    body: "Tell us what you want to build and what already exists.",
  },
  {
    title: "NDA, then a real conversation",
    body: "Every project is covered by an NDA before anything is shared.",
  },
  {
    title: "Approach, estimate and plan",
    body: "We suggest the development approach that fits your goals.",
  },
];

export function CTASection() {
  return (
    <section className="relative overflow-x-clip border-t border-ink-100 bg-[var(--canvas-subtle)] py-14 sm:py-18 lg:py-22">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="mask-fade absolute inset-0 bg-grid opacity-70" />
        <div className="animate-bloom absolute left-1/4 top-0 size-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(174,49,53,0.13),transparent_64%)] blur-3xl" />
        <div
          className="animate-bloom absolute bottom-0 right-0 size-[30rem] translate-x-1/4 translate-y-1/3 rounded-full bg-[radial-gradient(circle,rgba(58,57,55,0.05),transparent_66%)] blur-3xl"
          style={{ ["--bloom-duration" as string]: "22s" }}
        />
      </div>

      <Container size="wide" className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          {/* ---------- Pitch ---------- */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white py-1.5 pl-1.5 pr-4 shadow-(--shadow-card)">
                <span className="flex size-6 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white">
                  <Sparkles className="size-3" aria-hidden />
                </span>
                <span className="text-[0.78rem] font-medium text-brand-900">
                  First 7 days on us — zero upfront investment
                </span>
              </span>
            </Reveal>

            <Reveal delay={1}>
              <h2 className="mt-6 max-w-xl font-display text-[2.1rem] leading-[1.05] text-ink-950 sm:text-[2.8rem] lg:text-[3.1rem]">
                Let&rsquo;s build something{" "}
                <span className="text-gradient-brand">great together</span>
              </h2>
            </Reveal>

            <Reveal delay={2}>
              <p className="mt-5 max-w-lg text-pretty text-[1rem] leading-[1.7] text-ink-600">
                Tell us what you&rsquo;re trying to build. One of our team will reach
                out to set up a call when it works best for you — a real conversation
                about your goals, not a sales pitch.
              </p>
            </Reveal>

            <Reveal delay={3}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Magnetic className="w-full sm:w-auto">
                  <Button href="/contact" size="lg" arrow className="w-full sm:w-auto">
                    Start a Project
                  </Button>
                </Magnetic>
                <Button
                  href={`mailto:${contact.primaryEmail}`}
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  Talk to Our Team
                </Button>
              </div>
            </Reveal>

            <Reveal delay={4}>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.8rem] text-ink-600">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-brand-600" aria-hidden />
                  NDA on every project
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="size-4 text-brand-600" aria-hidden />
                  24/7 operations
                </span>
                <span className="flex items-center gap-2">
                  <Globe2 className="size-4 text-brand-600" aria-hidden />
                  {offices.length} offices · 3 countries
                </span>
              </div>
            </Reveal>
          </div>

          {/* ---------- What happens next ---------- */}
          <Reveal delay={2}>
            <div className="overflow-hidden rounded-3xl border border-ink-200 bg-white shadow-(--shadow-card)">
              <div className="border-b border-ink-100 bg-[var(--canvas-subtle)] px-6 py-4 sm:px-7">
                <h3 className="flex items-center gap-2.5 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-brand-700">
                  <span aria-hidden className="h-px w-4 bg-brand-300" />
                  What happens next
                </h3>
              </div>

              <ol className="divide-y divide-ink-100">
                {NEXT_STEPS.map((s, i) => (
                  <li
                    key={s.title}
                    className="group flex gap-4 px-6 py-4 transition-colors duration-300 hover:bg-brand-50/40 sm:px-7"
                  >
                    <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-ink-200 bg-white font-mono text-[0.7rem] text-ink-700 transition-colors duration-300 group-hover:border-brand-600 group-hover:bg-brand-600 group-hover:text-white">
                      {i + 1}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.92rem] font-semibold text-ink-950">
                        {s.title}
                      </span>
                      <span className="mt-1 block text-pretty text-[0.83rem] leading-relaxed text-ink-600">
                        {s.body}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>

              <div className="grid gap-2 border-t border-ink-100 bg-[var(--canvas-subtle)] p-4 sm:grid-cols-2 sm:p-5">
                <a
                  href={`mailto:${contact.primaryEmail}`}
                  className="group flex items-center gap-3 rounded-xl border border-ink-200 bg-white px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-200"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
                    <Mail className="size-4" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[0.62rem] uppercase tracking-wider text-ink-500">
                      Email
                    </span>
                    <span className="block truncate text-[0.82rem] font-medium text-ink-950">
                      {contact.primaryEmail}
                    </span>
                  </span>
                </a>
                <a
                  href={`tel:${contact.primaryPhone.replace(/\s/g, "")}`}
                  className="group flex items-center gap-3 rounded-xl border border-ink-200 bg-white px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-200"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
                    <Phone className="size-4" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[0.62rem] uppercase tracking-wider text-ink-500">
                      Call
                    </span>
                    <span className="block truncate text-[0.82rem] font-medium text-ink-950">
                      {contact.primaryPhone}
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
