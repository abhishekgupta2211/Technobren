"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  BrainCircuit,
  BarChart3,
  Smartphone,
  Cloud,
  ShoppingBag,
} from "lucide-react";

/**
 * The hero visual.
 *
 * Built from the TechnoBren logo's own motif — arcs that sweep out and terminate
 * in a node dot. Those arcs become orbits, the nodes become the capabilities the
 * company actually delivers, and the brandmark sits at the core.
 *
 * SVG + CSS transforms only. No WebGL, no canvas, no per-frame JavaScript.
 *
 * Below `sm` the orbiting chips would collide with each other and the container
 * edge, so small screens get the rings and core alone, with the capabilities
 * listed underneath as a grid that can actually be read.
 */

type OrbitNode = { icon: LucideIcon; label: string; angle: number };

const OUTER: OrbitNode[] = [
  { icon: Boxes, label: "ERP", angle: 318 },
  { icon: BrainCircuit, label: "AI / ML", angle: 62 },
  { icon: BarChart3, label: "Analytics", angle: 186 },
];

const INNER: OrbitNode[] = [
  { icon: Smartphone, label: "Mobile", angle: 28 },
  { icon: Cloud, label: "Cloud", angle: 152 },
  { icon: ShoppingBag, label: "Commerce", angle: 262 },
];

function Chip({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <div className="flex items-center gap-2 whitespace-nowrap rounded-xl border border-ink-200/80 bg-white py-1.5 pl-1.5 pr-3 shadow-[0_1px_2px_rgba(16,15,20,0.03),0_8px_20px_-14px_rgba(16,15,20,0.2)]">
      <span className="flex size-6 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-[0_3px_8px_-4px_rgba(174,49,53,0.45)]">
        <Icon className="size-3" aria-hidden />
      </span>
      <span className="text-[0.73rem] font-semibold tracking-tight text-ink-900">
        {label}
      </span>
    </div>
  );
}

function Ring({
  nodes,
  inset,
  duration,
  reverse = false,
}: {
  nodes: OrbitNode[];
  inset: string;
  duration: number;
  reverse?: boolean;
}) {
  const spin = {
    animation: `orbit-spin ${duration}s linear infinite`,
    animationDirection: reverse ? ("reverse" as const) : ("normal" as const),
  };

  // Cancels the ring rotation so each chip stays upright as it travels.
  const counterSpin = {
    animation: `orbit-spin ${duration}s linear infinite`,
    animationDirection: reverse ? ("normal" as const) : ("reverse" as const),
  };

  return (
    <div className="absolute" style={{ inset, ...spin }}>
      {nodes.map((n) => (
        <div
          key={n.label}
          className="absolute inset-0"
          style={{ transform: `rotate(${n.angle}deg)` }}
        >
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
            <div style={{ transform: `rotate(${-n.angle}deg)` }}>
              <div style={counterSpin}>
                <Chip icon={n.icon} label={n.label} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function OrbitSystem() {
  const reduce = useReducedMotion();

  return (
    <div className="w-full">
      <div
        className="relative mx-auto aspect-square w-full max-w-[18rem] sm:max-w-[26rem] lg:max-w-[33rem]"
        aria-hidden
      >
        {/* Soft brand light behind the core */}
        <div
          className="animate-bloom absolute inset-[16%] rounded-full bg-[radial-gradient(circle,rgba(174,49,53,0.16),rgba(174,49,53,0.05)_45%,transparent_70%)] blur-3xl"
          style={{ ["--bloom-duration" as string]: "15s" }}
        />

        {/* Orbit rings */}
        <svg viewBox="0 0 400 400" className="absolute inset-0 size-full" fill="none">
          <defs>
            <linearGradient id="orbit-a" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ae3135" stopOpacity="0.85" />
              <stop offset="46%" stopColor="#ae3135" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#3a3937" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="orbit-b" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3a3937" stopOpacity="0.35" />
              <stop offset="56%" stopColor="#ae3135" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#ae3135" stopOpacity="0.8" />
            </linearGradient>
            <radialGradient id="core-glow">
              <stop offset="0%" stopColor="#ae3135" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#ae3135" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* structural field */}
          <circle cx="200" cy="200" r="192" stroke="#f1efec" strokeWidth="1" />
          <circle cx="200" cy="200" r="152" stroke="#eeecea" strokeWidth="1" />
          <circle cx="200" cy="200" r="100" stroke="#f1efec" strokeWidth="1" />

          <circle cx="200" cy="200" r="118" fill="url(#core-glow)" />

          <motion.circle
            cx="200"
            cy="200"
            r="152"
            stroke="url(#orbit-a)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="360 595"
            initial={{ strokeDashoffset: 955, opacity: 0 }}
            animate={{ strokeDashoffset: 0, opacity: 1 }}
            transition={{
              duration: reduce ? 0 : 2.1,
              ease: [0.16, 1, 0.3, 1],
              delay: reduce ? 0 : 0.35,
            }}
          />
          <motion.circle
            cx="200"
            cy="200"
            r="100"
            stroke="url(#orbit-b)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="230 399"
            initial={{ strokeDashoffset: 629, opacity: 0 }}
            animate={{ strokeDashoffset: 0, opacity: 1 }}
            transition={{
              duration: reduce ? 0 : 2.1,
              ease: [0.16, 1, 0.3, 1],
              delay: reduce ? 0 : 0.55,
            }}
          />
        </svg>

        {/* Travelling node dots — the logo's terminating dot, in motion */}
        <div
          className="animate-orbit absolute inset-[12%]"
          style={{ ["--orbit-duration" as string]: "30s" }}
        >
          <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
            <span className="relative block size-2.5 rounded-full bg-brand-600 shadow-[0_0_0_4px_rgba(174,49,53,0.14)]">
              <span className="animate-node-pulse absolute inset-0 rounded-full bg-brand-500" />
            </span>
          </span>
        </div>
        <div
          className="animate-orbit absolute inset-[25%]"
          style={{
            ["--orbit-duration" as string]: "22s",
            animationDirection: "reverse",
          }}
        >
          <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
            <span className="block size-2 rounded-full bg-ink-700 shadow-[0_0_0_4px_rgba(58,57,55,0.1)]" />
          </span>
        </div>

        {/* Orbiting capability chips — sm and up, where they have room to travel */}
        <div className="hidden sm:block">
          <Ring nodes={OUTER} inset="12%" duration={30} />
          <Ring nodes={INNER} inset="25%" duration={22} reverse />
        </div>

        {/* Core: the brandmark on the white surface it was drawn for */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: reduce ? 0 : 1,
            ease: [0.16, 1, 0.3, 1],
            delay: reduce ? 0 : 0.15,
          }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="rounded-2xl border border-ink-200/80 bg-white px-4 py-3.5 shadow-[0_1px_3px_rgba(16,15,20,0.04),0_14px_34px_-24px_rgba(174,49,53,0.24)] sm:px-5 sm:py-4">
            <Image
              src="/brand/technobren-logo.png"
              alt=""
              width={169}
              height={60}
              preload
              className="h-7 w-auto object-contain sm:h-9"
            />
            <p className="mt-2.5 border-t border-ink-100 pt-2 text-center font-mono text-[0.55rem] uppercase tracking-[0.16em] text-ink-500">
              Engineering Core
            </p>
          </div>
        </motion.div>
      </div>

      {/* Small screens: same capabilities, laid out to be read rather than orbited */}
      <ul className="mt-8 grid grid-cols-3 gap-2 sm:hidden" aria-hidden>
        {[...OUTER, ...INNER].map((n) => (
          <li
            key={n.label}
            className="flex flex-col items-center gap-1.5 rounded-xl border border-ink-200 bg-white px-2 py-3 shadow-[0_1px_2px_rgba(16,15,20,0.04)]"
          >
            <span className="flex size-7 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <n.icon className="size-3.5" aria-hidden />
            </span>
            <span className="text-center text-[0.68rem] font-semibold leading-tight tracking-tight text-ink-800">
              {n.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
