import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Award, Landmark, Timer } from "lucide-react";
import { origin, offices, processSteps } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Credentials.
 *
 * Deliberately checkable claims rather than opinions: a government
 * registration, a named public recognition, a contractual commitment and a
 * published trial. It sits where a testimonial wall normally would and does the
 * same job — but nothing here depends on someone's word for it, which is what
 * makes it worth reading.
 *
 * The MSME emblem is the real registration mark; the rest are drawn from
 * lib/site.ts so they cannot drift from what the other pages say.
 */

export function CredentialsSection() {
  const countries = new Set(offices.map((o) => o.country)).size;

  const CARDS = [
    {
      icon: Landmark,
      eyebrow: "Government of India",
      title: "MSME registered",
      body: "Registered under the Ministry of Micro, Small & Medium Enterprises — a public record, not a self-declared badge.",
      emblem: "/brand/msme-official.png",
    },
    {
      icon: Award,
      eyebrow: "Public recognition",
      title: "Most Promising Company, 2018",
      body: "Recognised by the Chief Minister of Uttar Pradesh — awarded, not purchased.",
    },
    {
      icon: ShieldCheck,
      eyebrow: "Every engagement",
      title: "NDA before anything is shared",
      body: "Signed at the first conversation rather than at contract stage, so you can describe the actual problem.",
    },
    {
      icon: Timer,
      eyebrow: "Before you commit",
      title: "The first seven days are on us",
      body: `See how we work across ${processSteps.length} reviewable stages before any money changes hands.`,
    },
  ];

  // Deliberately not the delivery figures: the hero strip on this page already
  // carries projects, clients, satisfaction and headcount. These are the ones
  // that belong to a credentials claim.
  const FACTS = [
    { v: `${origin.foundedYear}`, l: "Founded" },
    { v: `${offices.length}`, l: "Offices" },
    { v: `${countries}`, l: "Countries" },
  ];

  return (
    <section className="relative overflow-x-clip border-t border-ink-100 bg-white py-14 sm:py-18 lg:py-22">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[10%] top-0 size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(174,49,53,0.07),transparent_66%)] blur-3xl"
      />

      <Container size="wide" className="relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <p className="flex items-center gap-2.5 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-ink-500">
                <span aria-hidden className="h-px w-5 bg-brand-300" />
                Credentials
              </p>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-5 max-w-xl text-balance font-display text-[2.1rem] leading-[1.04] text-ink-950 sm:text-[2.6rem]">
                Things you can{" "}
                <span className="text-brand-700">actually check</span>.
              </h2>
            </Reveal>
          </div>

          <Reveal delay={2}>
            <p className="max-w-sm text-pretty text-[0.94rem] leading-relaxed text-ink-600">
              Anyone can say they are reliable. These are matters of public record
              or written commitment.
            </p>
          </Reveal>
        </div>

        {/* ---------- The claims ---------- */}
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((c, i) => (
            <Reveal
              as="li"
              key={c.title}
              delay={i % 4}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-ink-200/80 bg-white p-6 shadow-(--shadow-card) transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-brand-200 hover:shadow-(--shadow-card-hover)"
            >
              <svg
                aria-hidden
                viewBox="0 0 200 200"
                fill="none"
                className="pointer-events-none absolute -right-14 -top-16 size-48 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              >
                <path
                  d="M8 168C8 80 80 8 168 8"
                  stroke="#ae3135"
                  strokeOpacity="0.16"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle cx="168" cy="8" r="4" fill="#ae3135" fillOpacity="0.4" />
              </svg>

              <div className="relative flex items-start justify-between gap-3">
                <span className="relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-brand-200/60 bg-brand-50 text-brand-700 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-brand-500 group-hover:text-white">
                  <span
                    aria-hidden
                    className="absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
                  />
                  <c.icon className="relative size-[1.15rem]" aria-hidden />
                </span>

                {c.emblem && (
                  <Image
                    src={c.emblem}
                    alt="MSME — Government of India registration mark"
                    width={64}
                    height={40}
                    className="h-10 w-auto shrink-0 object-contain opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                  />
                )}
              </div>

              <p className="relative mt-5 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-ink-400">
                {c.eyebrow}
              </p>
              <h3 className="relative mt-2 font-display text-[1.05rem] leading-snug text-ink-950 transition-colors duration-300 group-hover:text-brand-800">
                {c.title}
              </h3>
              <p className="relative mt-2.5 flex-1 text-pretty text-[0.85rem] leading-relaxed text-ink-600">
                {c.body}
              </p>

              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-brand-600 to-brand-400 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
              />
            </Reveal>
          ))}
        </ul>

        {/* ---------- The footprint ---------- */}
        <Reveal delay={2}>
          <div className="mt-5 flex flex-col gap-6 overflow-hidden rounded-3xl border border-ink-200 bg-[var(--canvas-subtle)] p-6 sm:p-7 lg:flex-row lg:items-center lg:justify-between">
            <dl className="grid flex-1 grid-cols-3 gap-6">
              {FACTS.map((f) => (
                <div key={f.l}>
                  <dt className="font-display text-[1.9rem] leading-none text-brand-700">
                    {f.v}
                  </dt>
                  <dd className="mt-2 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-ink-500">
                    {f.l}
                  </dd>
                </div>
              ))}
            </dl>

            <Link
              href="/about"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-ink-200 bg-white px-5 py-3 text-[0.86rem] font-semibold text-ink-800 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700"
            >
              How we got here
              <ArrowUpRight
                aria-hidden
                className="size-4 text-brand-600 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
