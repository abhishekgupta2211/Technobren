import Image from "next/image";
import { Quote } from "lucide-react";
import { chairmanMessage } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";

/**
 * The chairman's message, with the founder's portrait.
 *
 * The portrait sits inside the logo's arc motif — a crimson ring sweeping behind
 * the frame with a node dot on it — so the person and the brandmark share a
 * visual language rather than the photo being dropped in as a rectangle.
 */
export function ChairmanSection() {
  return (
    <section className="relative overflow-x-clip border-t border-ink-100 bg-[var(--canvas-subtle)] py-14 sm:py-18 lg:py-22">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[10%] top-1/4 size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(174,49,53,0.08),transparent_66%)] blur-3xl"
      />

      <Container size="wide" className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* ---------- Portrait ---------- */}
          <Reveal className="mx-auto w-full max-w-[19rem] lg:mx-0 lg:max-w-none">
            <div className="group relative aspect-[3/4] w-full">
              {/* the logo's arc, sweeping behind the frame */}
              <svg
                aria-hidden
                viewBox="0 0 400 520"
                className="pointer-events-none absolute -inset-x-8 -inset-y-6 size-auto h-[calc(100%+3rem)] w-[calc(100%+4rem)]"
                fill="none"
              >
                <defs>
                  <linearGradient id="chair-arc" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stopColor="#ae3135" stopOpacity="0.75" />
                    <stop offset="60%" stopColor="#ae3135" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#3a3937" stopOpacity="0.14" />
                  </linearGradient>
                </defs>
                <path
                  d="M18 470C18 214 214 18 470 18"
                  transform="translate(-40, 20)"
                  stroke="url(#chair-arc)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="352" cy="60" r="7" fill="#ae3135" />
                <circle
                  cx="352"
                  cy="60"
                  r="7"
                  fill="#ae3135"
                  className="animate-node-pulse origin-center"
                />
              </svg>

              <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] border border-ink-200/80 bg-white shadow-[0_1px_3px_rgba(16,15,20,0.04),0_16px_38px_-26px_rgba(16,15,20,0.3)]">
                <Image
                  src={chairmanMessage.photo}
                  alt={`${chairmanMessage.name}, ${chairmanMessage.role} of TechnoBren Infotech`}
                  fill
                  sizes="(min-width: 1024px) 24rem, 19rem"
                  className="object-cover object-top transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
                {/* a soft brand wash so the casual snapshot sits in the palette */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink-950/55 via-ink-950/5 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-display text-[1.05rem] text-white">
                    {chairmanMessage.name}
                  </p>
                  <p className="mt-0.5 text-[0.8rem] text-white/70">
                    {chairmanMessage.role}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ---------- Message ---------- */}
          <div>
            <Reveal>
              <Eyebrow>Chairman&rsquo;s message</Eyebrow>
            </Reveal>

            <Reveal delay={1}>
              <Quote className="mt-7 size-9 rotate-180 text-brand-200" aria-hidden />
            </Reveal>

            <Reveal delay={2}>
              <blockquote className="mt-5 text-balance font-display text-[1.3rem] font-semibold leading-[1.5] tracking-[-0.02em] text-ink-900 sm:text-[1.6rem] lg:text-[1.8rem]">
                {chairmanMessage.quote}
              </blockquote>
            </Reveal>

            <Reveal delay={3}>
              <div className="mt-8 flex items-center gap-4">
                <span aria-hidden className="h-px w-10 bg-brand-300" />
                <span>
                  <span className="block text-[0.95rem] font-semibold text-ink-950">
                    {chairmanMessage.name}
                  </span>
                  <span className="block text-[0.83rem] text-ink-500">
                    {chairmanMessage.role}
                  </span>
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
