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
    <section className="relative overflow-hidden bg-[var(--night)] py-14 sm:py-18 lg:py-22">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid-dark opacity-60" />
        <div className="animate-bloom absolute left-1/4 top-0 size-[46rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(circle,rgba(174,49,53,0.3),transparent_62%)] blur-3xl" />
        <div
          className="animate-bloom absolute bottom-0 right-0 size-[32rem] translate-x-1/4 translate-y-1/3 rounded-full bg-[radial-gradient(circle,rgba(120,118,130,0.16),transparent_66%)] blur-3xl"
          style={{ ["--bloom-duration" as string]: "22s" }}
        />
      </div>

      <Container size="wide" className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          {/* ---------- Pitch ---------- */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] py-1.5 pl-1.5 pr-4 backdrop-blur-sm">
                <span className="flex size-6 items-center justify-center rounded-full bg-brand-600 text-white">
                  <Sparkles className="size-3" aria-hidden />
                </span>
                <span className="text-[0.78rem] font-medium text-white/80">
                  First 7 days on us — zero upfront investment
                </span>
              </span>
            </Reveal>

            <Reveal delay={1}>
              <h2 className="mt-6 max-w-xl font-display text-[2.1rem] leading-[1.05] text-white sm:text-[2.8rem] lg:text-[3.1rem]">
                Let&rsquo;s build something{" "}
                <span className="text-brand-400">great together</span>
              </h2>
            </Reveal>

            <Reveal delay={2}>
              <p className="mt-5 max-w-lg text-pretty text-[1rem] leading-[1.7] text-white/70">
                Tell us what you&rsquo;re trying to build. One of our team will reach
                out to set up a call when it works best for you — a real conversation
                about your goals, not a sales pitch.
              </p>
            </Reveal>

            <Reveal delay={3}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Magnetic className="w-full sm:w-auto">
                  <Button
                    href="/contact"
                    size="lg"
                    variant="onDark"
                    arrow
                    className="w-full sm:w-auto"
                  >
                    Start a Project
                  </Button>
                </Magnetic>
                <Button
                  href={`mailto:${contact.primaryEmail}`}
                  size="lg"
                  variant="outlineDark"
                  className="w-full sm:w-auto"
                >
                  Talk to Our Team
                </Button>
              </div>
            </Reveal>

            <Reveal delay={4}>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.8rem] text-white/70">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-brand-400" aria-hidden />
                  NDA on every project
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="size-4 text-brand-400" aria-hidden />
                  24/7 operations
                </span>
                <span className="flex items-center gap-2">
                  <Globe2 className="size-4 text-brand-400" aria-hidden />
                  {offices.length} offices · 3 countries
                </span>
              </div>
            </Reveal>
          </div>

          {/* ---------- What happens next ---------- */}
          <Reveal delay={2}>
            <div className="overflow-hidden rounded-3xl border border-white/12 bg-white/[0.04] backdrop-blur-md">
              <div className="border-b border-white/10 px-6 py-4 sm:px-7">
                <h3 className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-brand-300">
                  What happens next
                </h3>
              </div>

              <ol className="divide-y divide-white/[0.07]">
                {NEXT_STEPS.map((s, i) => (
                  <li
                    key={s.title}
                    className="group flex gap-4 px-6 py-4 transition-colors duration-300 hover:bg-white/[0.04] sm:px-7"
                  >
                    <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] font-mono text-[0.7rem] text-white/80 transition-colors duration-300 group-hover:border-brand-500 group-hover:bg-brand-600 group-hover:text-white">
                      {i + 1}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.92rem] font-semibold text-white">
                        {s.title}
                      </span>
                      <span className="mt-1 block text-pretty text-[0.83rem] leading-relaxed text-white/70">
                        {s.body}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>

              <div className="grid gap-2 border-t border-white/10 p-4 sm:grid-cols-2 sm:p-5">
                <a
                  href={`mailto:${contact.primaryEmail}`}
                  className="group flex items-center gap-3 rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-500/60 hover:bg-brand-600/15"
                >
                  <Mail className="size-4 shrink-0 text-brand-400" aria-hidden />
                  <span className="min-w-0">
                    <span className="block text-[0.68rem] uppercase tracking-wider text-white/50">
                      Email
                    </span>
                    <span className="block truncate text-[0.82rem] font-medium text-white">
                      {contact.primaryEmail}
                    </span>
                  </span>
                </a>
                <a
                  href={`tel:${contact.primaryPhone.replace(/\s/g, "")}`}
                  className="group flex items-center gap-3 rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-500/60 hover:bg-brand-600/15"
                >
                  <Phone className="size-4 shrink-0 text-brand-400" aria-hidden />
                  <span className="min-w-0">
                    <span className="block text-[0.68rem] uppercase tracking-wider text-white/50">
                      Call
                    </span>
                    <span className="block truncate text-[0.82rem] font-medium text-white">
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
