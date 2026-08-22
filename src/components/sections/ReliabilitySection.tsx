"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { CloudCog, GitBranch, WifiOff } from "lucide-react";
import { processSteps, solutions } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

/**
 * Reliability.
 *
 * The one dark band on the site, used as a deliberate break in a long light
 * page. It replaces a section that claimed "millions of API transactions per
 * second", "sub-millisecond response times" and "99.99% SLA uptime" — none of
 * which appear anywhere in the content source, and which contradicted the card
 * directly beneath them quoting 25k requests per *day*. Numbers like that are
 * a contractual claim, so they are gone; what is here is drawn from the
 * delivery stages and product features already published elsewhere.
 *
 * The canvas is a low-cost swell: eighteen lines rather than forty, and it does
 * not start at all under `prefers-reduced-motion`, where a single static frame
 * is painted instead.
 */

const deployment = processSteps.find((s) => s.title === "Deployment");
const testing = processSteps.find((s) => s.title === "Testing");
const vanSales = solutions.find((s) => s.slug === "van-sales-system");

const PILLARS = [
  {
    icon: WifiOff,
    label: "In the field",
    title: "Runs when the network does not",
    body: "Field tooling is offline-capable by design — orders, stock and settlement keep working through a dead signal and reconcile when it returns.",
    tags: vanSales?.features.slice(0, 2) ?? [],
  },
  {
    icon: GitBranch,
    label: "On release day",
    title: "Released, not crossed-fingers deployed",
    body: "Containerised, repeatable releases to cloud or on-premise, with rollback and monitoring configured before the first one goes out.",
    tags: deployment?.deliverables.slice(0, 3) ?? [],
  },
  {
    icon: CloudCog,
    label: "Before you see it",
    title: "Checked, then handed over",
    body: "Manual and automated QA wired into the build pipeline, so regressions are caught on our side rather than yours.",
    tags: testing?.deliverables.slice(0, 3) ?? [],
  },
];

export function ReliabilitySection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let raf = 0;
    let step = 0;

    const size = () => {
      const parent = canvas.parentElement;
      canvas.width = parent?.clientWidth ?? window.innerWidth;
      canvas.height = parent?.clientHeight ?? 420;
    };
    size();
    window.addEventListener("resize", size);

    const LINES = 18;

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1.2;

      for (let i = 0; i < LINES; i++) {
        const p = i / LINES;
        // Brand crimson only — the previous version drifted into rose and
        // emerald, which exist nowhere else in the palette.
        ctx.strokeStyle = `rgba(${174 + p * 46}, ${49 + p * 26}, ${53 + p * 30}, ${
          0.1 + (1 - Math.abs(p - 0.5) * 2) * 0.42
        })`;

        ctx.beginPath();
        const amplitude = 34 + i * 2.2;
        const frequency = 0.0021 + i * 0.00009;
        for (let x = 0; x <= width; x += 8) {
          const arch = Math.sin((x / width) * Math.PI) * 96;
          const y =
            height * 0.56 -
            arch +
            Math.sin(x * frequency + step + i * 0.08) * amplitude +
            Math.cos(x * 0.0012 + step * 0.8) * 22;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    };

    if (reduce) {
      // One frame, held. No animation loop at all.
      draw();
    } else {
      const loop = () => {
        step += 0.009;
        draw();
        raf = requestAnimationFrame(loop);
      };
      loop();
    }

    return () => {
      window.removeEventListener("resize", size);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduce]);

  return (
    <section className="relative overflow-hidden bg-[var(--night)] py-14 text-white sm:py-18 lg:py-22">
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-dark" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-0 size-96 rounded-full bg-brand-600/20 blur-3xl"
      />

      <Container size="wide" className="relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <p className="flex items-center gap-2.5 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-brand-300">
                <span aria-hidden className="h-px w-5 bg-brand-500" />
                Reliability
              </p>
            </Reveal>

            <Reveal delay={1}>
              <h2 className="mt-6 text-balance font-display text-[2.1rem] leading-[1.04] text-white sm:text-[2.7rem]">
                The part that matters is{" "}
                <span className="text-brand-300">the day after launch</span>.
              </h2>
            </Reveal>

            <Reveal delay={2}>
              <p className="mt-5 max-w-xl text-pretty text-[1rem] leading-[1.7] text-white/70">
                Anyone can demo software. Keeping it running through a lost signal,
                a bad release and a Monday morning is the actual work — so it is
                designed in from the first stage, not bolted on after.
              </p>
            </Reveal>
          </div>

          <Reveal delay={2}>
            <Button
              href="/methodology"
              size="lg"
              arrow
              className="shrink-0 bg-white text-ink-950 hover:bg-brand-50"
            >
              How we deliver
            </Button>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-4 border-t border-white/10 pt-10 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal
              as="li"
              key={p.title}
              delay={i % 3}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/12 bg-white/[0.04] p-6 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-brand-400/50 hover:bg-white/[0.07]"
            >
              <span className="flex size-11 items-center justify-center rounded-2xl border border-brand-400/40 bg-brand-500/15 text-brand-200 transition-colors duration-500 group-hover:border-brand-400 group-hover:bg-brand-500/25">
                <p.icon className="size-5" aria-hidden />
              </span>

              <p className="mt-5 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-brand-300/80">
                {p.label}
              </p>
              <h3 className="mt-2 font-display text-[1.08rem] leading-snug text-white">
                {p.title}
              </h3>
              <p className="mt-2.5 flex-1 text-pretty text-[0.86rem] leading-relaxed text-white/60">
                {p.body}
              </p>

              <ul className="mt-5 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-lg border border-white/12 bg-white/[0.05] px-2.5 py-1 text-[0.72rem] font-medium text-white/70 transition-colors duration-500 group-hover:border-brand-400/40 group-hover:text-white"
                  >
                    {t}
                  </li>
                ))}
              </ul>

              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-brand-500 to-brand-300 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
              />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
