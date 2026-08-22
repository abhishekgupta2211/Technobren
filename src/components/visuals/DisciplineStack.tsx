"use client";

import { useState } from "react";
import { techCategories } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * The discipline stack.
 *
 * Real CSS 3D rather than an isometric drawing: each discipline is a plate in a
 * `preserve-3d` scene, separated in Z. It stays vector-crisp at any size, the
 * plates genuinely parallax as they float, and the stack pushes apart along its
 * own axis on hover.
 *
 * Two things the first version got wrong, both fixed here:
 *
 * - Labels inherited the stage rotation, so they rendered skewed and collided
 *   with each other. Each label now counter-rotates by the exact inverse of the
 *   stage, so it faces the viewer and reads horizontally while still being
 *   anchored to its plate in 3D.
 * - Every plate was the same near-white, which flattened the very depth the
 *   scene exists to show. They now run from a clean white surface at the top to
 *   a brand-tinted base, and each carries an edge strip so it reads as a slab
 *   with thickness rather than a sheet of paper.
 */

const TILT_X = 54;
const TILT_Z = -38;
const GAP = 30;
const GAP_OPEN = 46;

/** Undoes the stage rotation so a child faces the viewer. Order matters. */
const FACE_VIEWER = `rotateZ(${-TILT_Z}deg) rotateX(${-TILT_X}deg)`;

export function DisciplineStack({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  // Bottom of the stack first: infrastructure underneath, interface on top.
  const plates = [...techCategories].reverse();
  const total = techCategories.reduce((n, c) => n + c.items.length, 0);

  return (
    <div
      className={cn("relative select-none", className)}
      style={{ perspective: "1500px", perspectiveOrigin: "50% 42%" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => {
        setOpen(false);
        setHovered(null);
      }}
    >
      <div
        aria-hidden
        className="animate-bloom pointer-events-none absolute left-1/2 top-1/2 size-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(174,49,53,0.18),transparent_66%)] blur-3xl"
      />

      <div
        className="animate-stack-float relative mx-auto flex h-[23rem] w-full max-w-[26rem] items-center justify-center"
        aria-hidden
      >
        {plates.map((c, i) => {
          const depth = i / (plates.length - 1); // 0 = base, 1 = surface
          const z = (i - (plates.length - 1) / 2) * (open ? GAP_OPEN : GAP);
          const lit = hovered === i;

          return (
            <div
              key={c.name}
              onMouseEnter={() => setHovered(i)}
              className="absolute size-[12.5rem] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                transform: `translateZ(${z + (lit ? 14 : 0)}px)`,
                transformStyle: "preserve-3d",
              }}
            >
              {/* The slab. Tinted from base to surface so depth is legible. */}
              <div
                className={cn(
                  "absolute inset-0 rounded-2xl border transition-[background-color,border-color,box-shadow] duration-500",
                  lit ? "border-brand-500" : "border-brand-200/60",
                )}
                style={{
                  backgroundColor: `rgba(${255 - (1 - depth) * 18}, ${255 - (1 - depth) * 30}, ${255 - (1 - depth) * 30}, ${0.5 + depth * 0.42})`,
                  boxShadow: lit
                    ? "0 26px 50px -28px rgba(174,49,53,0.55)"
                    : "0 20px 44px -30px rgba(16,15,20,0.55)",
                }}
              >
                <span className="pointer-events-none absolute inset-0 rounded-2xl bg-grid opacity-40" />
                <span className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-brand-400/70 to-transparent" />
              </div>

              {/* Edge strip, dropped just below the face: the slab's thickness. */}
              <div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-200/50 to-brand-300/40"
                style={{ transform: "translateZ(-7px)" }}
              />

              {/* Counter-rotated so it faces the viewer and reads straight. */}
              <div
                className="absolute left-full top-1/2 origin-left"
                style={{ transform: `translateY(-50%) ${FACE_VIEWER}` }}
              >
                <span
                  className={cn(
                    "flex items-center gap-2 whitespace-nowrap rounded-full border py-1 pl-2 pr-2.5 backdrop-blur-sm transition-colors duration-500",
                    lit
                      ? "border-brand-300 bg-white text-brand-800"
                      : "border-ink-200/70 bg-white/80 text-ink-600",
                  )}
                >
                  <span
                    className={cn(
                      "size-1.5 shrink-0 rounded-full transition-colors duration-500",
                      lit ? "bg-brand-600" : "bg-brand-400",
                    )}
                  />
                  <span className="font-mono text-[0.56rem] uppercase tracking-[0.16em]">
                    {c.name}
                  </span>
                  <span className="font-mono text-[0.56rem] font-bold text-brand-600">
                    {c.items.length}
                  </span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <p className="sr-only">
        {techCategories.length} engineering disciplines:{" "}
        {techCategories.map((c) => `${c.name} (${c.items.length} technologies)`).join(", ")}.
      </p>

      <p className="relative mt-1 text-center font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink-400">
        {techCategories.length} disciplines · {total} technologies
      </p>
    </div>
  );
}
