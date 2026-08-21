"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { ShieldCheck, ArrowDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { OrbitSystem } from "@/components/visuals/OrbitSystem";
import { platformStrip, stats } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Word-by-word mask reveal for the display headline. */
function Headline() {
  const reduce = useReducedMotion();
  const lines = [
    ["Software", "engineered"],
    ["for", "excellence"],
    ["and", "efficiency."],
  ];

  let index = 0;

  return (
    <h1 className="font-display text-[2.5rem] leading-[1.0] text-ink-950 xs:text-[2.9rem] sm:text-[3.6rem] lg:text-[3.9rem] xl:text-[4.4rem]">
      {lines.map((line, li) => (
        <span key={li} className="block overflow-hidden pb-[0.09em]">
          {line.map((word) => {
            const i = index++;
            const accent = word === "excellence" || word === "efficiency.";
            return (
              <motion.span
                key={word + i}
                initial={reduce ? { opacity: 0 } : { y: "108%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.95, delay: 0.08 + i * 0.075, ease: EASE }}
                className="mr-[0.22em] inline-block"
              >
                {accent ? <span className="text-gradient-brand">{word}</span> : word}
              </motion.span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // --- Mouse parallax: the visual leans a few pixels toward the cursor ---
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 90, damping: 22, mass: 0.6 });
  const py = useSpring(my, { stiffness: 90, damping: 22, mass: 0.6 });

  const handleMouse = (e: React.MouseEvent<HTMLElement>) => {
    if (reduce) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 26);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 26);
  };

  // --- Scroll parallax: the visual drifts up and fades as the page moves on ---
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const visualOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.2]);

  const rise = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.85, delay, ease: EASE },
  });

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouse}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="relative overflow-x-clip bg-white pb-12 pt-[6.25rem] sm:pt-[6.75rem] lg:pb-16 lg:pt-[7.25rem]"
    >
      {/* ---------- Backdrop ---------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="mask-fade absolute inset-0 bg-grid" />
        {/* warm brand light, kept low so the type stays the loudest thing here */}
        <div className="animate-bloom absolute -right-[10%] -top-[26%] size-[50rem] rounded-full bg-[radial-gradient(circle,rgba(174,49,53,0.16),rgba(174,49,53,0.04)_46%,transparent_70%)] blur-3xl" />
        <div
          className="animate-bloom absolute -left-[20%] top-[18%] size-[38rem] rounded-full bg-[radial-gradient(circle,rgba(58,57,55,0.06),transparent_66%)] blur-3xl"
          style={{ ["--bloom-duration" as string]: "22s" }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-white" />
      </div>

      <Container size="wide" className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8 xl:gap-12">
          {/* ---------- Copy ---------- */}
          <div className="max-w-3xl">
            <Headline />

            <motion.p
              {...rise(0.55)}
              className="mt-7 max-w-xl text-pretty text-[1.05rem] leading-[1.7] text-ink-600 sm:text-[1.12rem]"
            >
              TechnoBren Infotech is your trusted software development partner —
              delivering next-generation platforms, enterprise ERP and intelligent
              systems designed to empower businesses for the future.
            </motion.p>

            <motion.div
              {...rise(0.68)}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Magnetic className="w-full sm:w-auto">
                <Button href="/contact" size="lg" arrow className="w-full sm:w-auto">
                  Start a Project
                </Button>
              </Magnetic>
              <Button
                href="/services"
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                Explore Services
              </Button>
            </motion.div>

            <motion.p
              {...rise(0.8)}
              className="mt-6 flex items-center gap-2 text-[0.82rem] text-ink-500"
            >
              <ShieldCheck className="size-4 shrink-0 text-brand-600" aria-hidden />
              Every project is secured by an NDA — 100% secure, zero spam.
            </motion.p>
          </div>

          {/* ---------- Visual ---------- */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.25, ease: EASE }}
            style={reduce ? undefined : { y: visualY, opacity: visualOpacity }}
            className="relative"
          >
            <motion.div style={reduce ? undefined : { x: px, y: py }}>
              <OrbitSystem />
            </motion.div>
          </motion.div>
        </div>

        {/* ---------- Stat rail ---------- */}
        <motion.dl
          {...rise(0.95)}
          className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-200 bg-ink-200 shadow-(--shadow-card) sm:mt-14 lg:grid-cols-4"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="group relative bg-white px-5 py-6 transition-colors duration-500 hover:bg-brand-50/40 sm:px-7"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-brand-700 to-brand-400 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
              />
              <dt className="font-display text-[2.1rem] text-ink-950 sm:text-[2.5rem]">
                {s.value}
                <span className="text-brand-600">{s.suffix}</span>
              </dt>
              <dd className="mt-1 text-[0.82rem] font-medium text-ink-600">
                {s.label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </Container>

      {/* ---------- Platform marquee ---------- */}
      <motion.div {...rise(1.05)} className="relative mt-12 sm:mt-14">
        <Container size="wide">
          <p className="text-center font-mono text-[0.68rem] uppercase tracking-[0.2em] text-ink-600">
            Platforms &amp; tooling we build on
          </p>
        </Container>
        <div className="marquee-host mask-edges relative mt-7 flex overflow-hidden">
          <div
            className="animate-marquee flex shrink-0 items-center gap-3"
            style={{ ["--marquee-duration" as string]: "48s" }}
          >
            {[
              ...platformStrip,
              ...platformStrip,
              ...platformStrip,
              ...platformStrip,
            ].map((p, i) => (
              <span
                key={p + i}
                className="shrink-0 rounded-xl border border-ink-200 bg-white px-5 py-2.5 text-[0.85rem] font-medium text-ink-600 shadow-[0_1px_2px_rgba(16,15,20,0.03)] transition-colors duration-300 hover:border-brand-300 hover:text-brand-700"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ---------- Scroll cue ---------- */}
      <motion.div
        {...rise(1.3)}
        className="relative mt-10 hidden justify-center lg:flex"
        aria-hidden
      >
        <span className="flex flex-col items-center gap-2 text-ink-600">
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em]">
            Scroll
          </span>
          <motion.span
            animate={reduce ? undefined : { y: [0, 7, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="size-4" />
          </motion.span>
        </span>
      </motion.div>
    </section>
  );
}
