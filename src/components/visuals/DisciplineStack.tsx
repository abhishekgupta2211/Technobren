"use client";

import { useState } from "react";
import { techCategories } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * The discipline stack.
 *
 * Real CSS 3D rather than an isometric drawing: each discipline is a plate in a
 * `preserve-3d` scene, separated in Z. That means it stays vector-crisp at any
 * size, it genuinely parallaxes as the plates float, and hovering can push the
 * stack apart along its own axis — none of which a flat SVG could do.
 *
 * The plates are the seven disciplines from `lib/site.ts`, bottom to top, so
 * the picture is a statement about the stack rather than decoration: hardware
 * up through infrastructure, front end at the surface.
 */

const PLATE_GAP = 26;

export function DisciplineStack({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  // Bottom of the stack first, so infrastructure sits under the interface.
  const plates = [...techCategories].reverse();

  return (
    <div
      className={cn("relative select-none", className)}
      style={{ perspective: "1400px", perspectiveOrigin: "50% 45%" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Ambient bloom behind the stack. */}
      <div
        aria-hidden
        className="animate-bloom pointer-events-none absolute left-1/2 top-1/2 size-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(174,49,53,0.16),transparent_66%)] blur-3xl"
      />

      <div
        className="animate-stack-float relative mx-auto flex h-[22rem] w-full max-w-[24rem] items-center justify-center"
        aria-hidden
      >
        {plates.map((c, i) => {
          const z = (i - (plates.length - 1) / 2) * (open ? PLATE_GAP + 16 : PLATE_GAP);
          return (
            <div
              key={c.name}
              className="absolute flex h-[13rem] w-[13rem] items-end justify-start rounded-2xl border border-brand-200/70 bg-white/70 p-3 shadow-[0_18px_40px_-26px_rgba(16,15,20,0.5)] backdrop-blur-sm transition-[transform,background-color,border-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                transform: `translateZ(${z}px)`,
                // Deeper plates sit back visually as well as spatially.
                backgroundColor: `rgba(255,255,255,${0.42 + i * 0.07})`,
              }}
            >
              {/* Hairline grid, so each plate reads as a surface. */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl bg-grid opacity-40"
              />
              {/* The brand edge catches the light on the leading side. */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-brand-400/70 to-transparent"
              />

              <span className="relative flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-brand-500" />
                <span className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-ink-600">
                  {c.name}
                </span>
                <span className="font-mono text-[0.58rem] text-brand-600">
                  {c.items.length}
                </span>
              </span>
            </div>
          );
        })}
      </div>

      {/* Readable summary for anyone who cannot see the stack. */}
      <p className="sr-only">
        {techCategories.length} engineering disciplines:{" "}
        {techCategories.map((c) => `${c.name} (${c.items.length} technologies)`).join(", ")}
        .
      </p>

      <p className="relative mt-2 text-center font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink-400">
        {techCategories.length} disciplines ·{" "}
        {techCategories.reduce((n, c) => n + c.items.length, 0)} technologies
      </p>
    </div>
  );
}
