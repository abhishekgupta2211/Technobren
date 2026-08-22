"use client";

import { useState } from "react";
import { useReducedMotion } from "motion/react";
import { techCategories } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * The discipline stack.
 *
 * Real CSS 3D: each discipline is a plate in a `preserve-3d` scene, separated
 * in Z. Vector, so it stays crisp at any size, and it genuinely parallaxes
 * rather than being an isometric drawing.
 *
 * Every plate turns on its own axis rather than the stack turning as a block,
 * all at the same speed but each a second behind the one below — so the stack
 * holds a steady helix rather than the corners wandering apart. Bob lives on an
 * outer element, and depth on a wrapper inside each plate: translation and
 * rotation on one element would overwrite each other, which is a mistake
 * already made once on the office map.
 *
 * The labels are a flat legend rather than being pinned to the plates. Anchored
 * in 3D they came out skewed, collided with each other, and — once the stack
 * turns — would swing behind it and clip. As a legend they stay readable, and
 * hovering a row lifts and lights the plate it names.
 */

const GAP = 30;

/**
 * One revolution, shared by every plate, with each starting exactly a second
 * behind the one below it.
 *
 * Matched speeds and a fixed offset is what makes this read as a single object
 * twisting — the stack holds a constant helix instead of the corners wandering
 * apart, which is what unequal periods produced. At 24s a second of lag is 15
 * degrees, so the twist is visible without the plates ever looking scattered.
 */
const SPIN_SECONDS = 24;
const LAG_SECONDS = 1;

export function DisciplineStack({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);

  // Bottom of the stack first: infrastructure underneath, interface on top.
  const plates = [...techCategories].reverse();
  const total = techCategories.reduce((n, c) => n + c.items.length, 0);

  return (
    <div className={cn("relative select-none", className)}>
      <div
        aria-hidden
        className="animate-bloom pointer-events-none absolute left-1/2 top-[38%] size-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(174,49,53,0.18),transparent_66%)] blur-3xl"
      />

      {/* ---------- The stack ---------- */}
      <div
        className="relative mx-auto h-[19rem] w-full max-w-[24rem]"
        style={{ perspective: "1500px", perspectiveOrigin: "50% 42%" }}
        aria-hidden
      >
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center",
            !reduce && "animate-stack-bob",
          )}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="relative flex items-center justify-center"
            style={{
              transformStyle: "preserve-3d",
              // The stage holds the isometric tilt; the plates inside do the
              // turning, each on its own clock.
              transform: "rotateX(54deg) rotateZ(-38deg)",
            }}
          >
            {plates.map((c, i) => {
              const depth = i / (plates.length - 1); // 0 = base, 1 = surface
              const lit = active === i;
              return (
                <div
                  key={c.name}
                  // Depth only. The spin lives on the child, because one
                  // element cannot hold two transforms.
                  className="absolute size-[11.5rem] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    transform: `translateZ(${(i - (plates.length - 1) / 2) * GAP + (lit ? 22 : 0)}px)`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className={cn("absolute inset-0", !reduce && "animate-plate-spin")}
                    style={{
                      ["--plate-duration" as string]: `${SPIN_SECONDS}s`,
                      ["--plate-delay" as string]: `-${i * LAG_SECONDS}s`,
                      // Pauses the whole stack while a plate is being read.
                      animationPlayState: active !== null ? "paused" : undefined,
                    }}
                  >
                    <div
                      className={cn(
                        "absolute inset-0 rounded-2xl border transition-[background-color,border-color,box-shadow] duration-500",
                        lit ? "border-brand-500" : "border-brand-200/60",
                      )}
                      style={{
                        backgroundColor: `rgba(${255 - (1 - depth) * 16}, ${255 - (1 - depth) * 28}, ${255 - (1 - depth) * 28}, ${0.52 + depth * 0.4})`,
                        boxShadow: lit
                          ? "0 26px 50px -26px rgba(174,49,53,0.6)"
                          : "0 20px 44px -30px rgba(16,15,20,0.5)",
                      }}
                    >
                      <span className="pointer-events-none absolute inset-0 rounded-2xl bg-grid opacity-40" />
                      <span className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-brand-400/70 to-transparent" />
                    </div>
                    {/* Set behind the face: the slab's thickness. */}
                    <div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-200/50 to-brand-300/40"
                      style={{ transform: "translateZ(-7px)" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ---------- Legend ---------- */}
      <ul
        className="relative mx-auto mt-2 grid max-w-[24rem] grid-cols-2 gap-x-3 gap-y-1"
        onMouseLeave={() => setActive(null)}
      >
        {techCategories.map((c) => {
          // Plates render bottom-first, so map the legend back to that order.
          const plateIndex = techCategories.length - 1 - techCategories.indexOf(c);
          const lit = active === plateIndex;
          return (
            <li key={c.name}>
              <button
                type="button"
                onMouseEnter={() => setActive(plateIndex)}
                onFocus={() => setActive(plateIndex)}
                onBlur={() => setActive(null)}
                className={cn(
                  "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-colors duration-300",
                  lit ? "bg-brand-50" : "hover:bg-ink-50",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "size-1.5 shrink-0 rounded-full transition-colors duration-300",
                    lit ? "bg-brand-600" : "bg-brand-300",
                  )}
                />
                <span
                  className={cn(
                    "flex-1 truncate font-mono text-[0.56rem] uppercase tracking-[0.14em] transition-colors duration-300",
                    lit ? "text-brand-800" : "text-ink-600",
                  )}
                >
                  {c.name}
                </span>
                <span className="font-mono text-[0.56rem] font-bold text-brand-600">
                  {c.items.length}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <p className="relative mt-3 text-center font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink-400">
        {techCategories.length} disciplines · {total} technologies
      </p>
    </div>
  );
}
