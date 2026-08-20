"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/**
 * The first-load curtain.
 *
 * Same motif as the hero: the TechnoBren mark on the white it was drawn for,
 * ringed by two arcs that sweep out and terminate in a node dot. Here the arcs
 * draw themselves in and orbit while the document finishes loading.
 *
 * Deliberately hard to get stuck behind — the window `load` event dismisses it,
 * a failsafe timer dismisses it regardless, the scroll lock is restored to
 * whatever it was before, and with JavaScript off it never shows at all.
 */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Long enough for the arcs to finish drawing; below this the curtain reads as a flash. */
const MIN_VISIBLE_MS = 850;
const REDUCED_VISIBLE_MS = 150;
/** A stalled image or third-party script must never hold the page hostage. */
const FAILSAFE_MS = 6000;

const R_OUTER = 84;
const R_INNER = 58;

/** A point on a circle centred in the 200×200 viewBox. 0° is twelve o'clock. */
function polar(r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return {
    x: Number((100 + r * Math.cos(rad)).toFixed(2)),
    y: Number((100 + r * Math.sin(rad)).toFixed(2)),
  };
}

/** A clockwise arc plus the point it terminates at — where the logo's node sits. */
function arc(r: number, from: number, to: number) {
  const start = polar(r, from);
  const end = polar(r, to);
  const large = to - from > 180 ? 1 : 0;
  return {
    d: `M ${start.x} ${start.y} A ${r} ${r} 0 ${large} 1 ${end.x} ${end.y}`,
    node: end,
  };
}

const OUTER = arc(R_OUTER, 18, 168);
const INNER = arc(R_INNER, 200, 320);

export function PageLoader() {
  const reduce = useReducedMotion();
  const [dismissed, setDismissed] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const start = performance.now();
    const hold = reduce ? REDUCED_VISIBLE_MS : MIN_VISIBLE_MS;
    let timer = 0;

    // Always scheduled, never called during render — `set-state-in-effect` bans the latter.
    const dismiss = (delay: number) => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setDismissed(true), delay);
    };

    const onReady = () => dismiss(Math.max(0, hold - (performance.now() - start)));

    dismiss(FAILSAFE_MS);

    // `load` has already fired if this mounted late (a soft navigation, a warm cache).
    if (document.readyState === "complete") {
      onReady();
    } else {
      window.addEventListener("load", onReady, { once: true });
    }

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", onReady);
    };
  }, [reduce]);

  useEffect(() => {
    if (dismissed) {
      // AnimatePresence keeps rendering this element with the props it had when
      // it left, so these two are set on the node instead — otherwise the fade
      // out spends half a second as a live status region that eats clicks.
      const el = root.current;
      if (el) {
        el.setAttribute("aria-hidden", "true");
        el.style.pointerEvents = "none";
      }
      return;
    }

    const { body } = document;
    const previous = body.style.overflow;
    body.style.overflow = "hidden";
    return () => {
      body.style.overflow = previous;
    };
  }, [dismissed]);

  /**
   * `useReducedMotion` is null on the server and the real preference on the
   * client's first render, so nothing rendered here may depend on it — that
   * would be a hydration mismatch on the very first paint. Only durations vary,
   * and they collapse to zero: the choreography is skipped, never half-played.
   * The CSS keyframes below opt out through the media query in globals.css.
   */
  const seconds = (full: number) => (reduce ? 0 : full);

  const curtain = {
    hidden: { opacity: 1 },
    visible: { opacity: 1 },
    leaving: {
      opacity: 0,
      transition: { duration: seconds(0.55), ease: EASE },
    },
  };

  const core = {
    hidden: { opacity: 0, scale: 0.97 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: seconds(0.6), ease: EASE },
    },
    leaving: {
      opacity: 0,
      scale: 1.05,
      transition: { duration: seconds(0.5), ease: EASE },
    },
  };

  const stroke = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: seconds(0.7),
        delay: seconds(0.05),
        ease: EASE,
      },
    },
    leaving: { opacity: 0, transition: { duration: seconds(0.35) } },
  };

  const node = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: seconds(0.35), delay: seconds(0.55) },
    },
    leaving: { opacity: 0, transition: { duration: seconds(0.3) } },
  };

  const outerSpin = {
    animation: "orbit-spin 4.5s linear infinite",
    transformOrigin: "100px 100px",
  };

  const innerSpin = {
    animation: "orbit-spin 3.4s linear infinite",
    animationDirection: "reverse" as const,
    transformOrigin: "100px 100px",
  };

  return (
    <>
      {/* Without JS nothing here can ever dismiss itself, so it must not exist. */}
      <noscript
        dangerouslySetInnerHTML={{
          __html: "<style>[data-page-loader]{display:none!important}</style>",
        }}
      />

      <AnimatePresence>
        {!dismissed && (
          <motion.div
            key="page-loader"
            ref={root}
            data-page-loader=""
            role="status"
            aria-live="polite"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
            variants={curtain}
            initial="hidden"
            animate="visible"
            exit="leaving"
          >
            <div className="bg-grid mask-fade absolute inset-0" aria-hidden />

            <motion.div variants={core} className="relative flex flex-col items-center">
              <div className="relative size-56 sm:size-64">
                {/* Soft brand light behind the mark */}
                <div
                  className="animate-bloom absolute inset-[18%] rounded-full bg-[radial-gradient(circle,rgba(174,49,53,0.18),rgba(174,49,53,0.05)_45%,transparent_70%)] blur-2xl"
                  style={{ ["--bloom-duration" as string]: "9s" }}
                  aria-hidden
                />

                <svg
                  viewBox="0 0 200 200"
                  className="absolute inset-0 size-full"
                  fill="none"
                  aria-hidden
                >
                  <defs>
                    <linearGradient id="pl-arc-outer" x1="0" y1="0" x2="0.6" y2="1">
                      <stop offset="0%" stopColor="#ae3135" stopOpacity="0.08" />
                      <stop offset="55%" stopColor="#ae3135" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#ae3135" stopOpacity="0.95" />
                    </linearGradient>
                    <linearGradient id="pl-arc-inner" x1="0" y1="1" x2="0.4" y2="0">
                      <stop offset="0%" stopColor="#3a3937" stopOpacity="0.06" />
                      <stop offset="100%" stopColor="#3a3937" stopOpacity="0.45" />
                    </linearGradient>
                  </defs>

                  {/* Structural field — the hairline rings the arcs travel on */}
                  <circle
                    cx="100"
                    cy="100"
                    r={R_OUTER}
                    stroke="#f1efec"
                    strokeWidth="1"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r={R_INNER}
                    stroke="#f1efec"
                    strokeWidth="1"
                  />

                  <g style={outerSpin}>
                    <motion.path
                      variants={stroke}
                      d={OUTER.d}
                      stroke="url(#pl-arc-outer)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <motion.g variants={node}>
                      <circle
                        cx={OUTER.node.x}
                        cy={OUTER.node.y}
                        r="8.5"
                        fill="#ae3135"
                        opacity="0.12"
                      />
                      <circle
                        cx={OUTER.node.x}
                        cy={OUTER.node.y}
                        r="3.4"
                        fill="#ae3135"
                      />
                      {/* Signal pulse. Same crimson as the dot, so when reduced
                          motion freezes it there is nothing to see. */}
                      <circle
                        className="animate-node-pulse"
                        cx={OUTER.node.x}
                        cy={OUTER.node.y}
                        r="3.4"
                        fill="#ae3135"
                        style={{
                          transformBox: "fill-box",
                          transformOrigin: "center",
                        }}
                      />
                    </motion.g>
                  </g>

                  <g style={innerSpin}>
                    <motion.path
                      variants={stroke}
                      d={INNER.d}
                      stroke="url(#pl-arc-inner)"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <motion.circle
                      variants={node}
                      cx={INNER.node.x}
                      cy={INNER.node.y}
                      r="2.8"
                      fill="#3a3937"
                    />
                  </g>
                </svg>

                {/* The brandmark, unmodified, on the white surface it was drawn for */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <Image
                    src="/brand/technobren-logo.png"
                    alt=""
                    width={169}
                    height={60}
                    preload
                    className="h-7 w-auto object-contain sm:h-8"
                  />
                </div>
              </div>

              {/* Indeterminate hairline. Driven by motion rather than the `sweep`
                  keyframes — those are referenced by no class, so the CSS build
                  drops them before an arbitrary `animate-[sweep_…]` can use them. */}
              <div
                className="relative mt-7 h-px w-24 overflow-hidden rounded-full bg-ink-200"
                aria-hidden
              >
                <motion.span
                  className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-brand-600 to-transparent"
                  initial={{ x: "-120%" }}
                  animate={{ x: "220%" }}
                  transition={{
                    duration: seconds(1.4),
                    repeat: reduce ? 0 : Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>

            <span className="sr-only">Loading</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
