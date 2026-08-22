"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { megaMenu, type MegaLink, type MegaPanel } from "@/lib/megaMenu";
import { cn } from "@/lib/utils";

/**
 * The desktop dropdown.
 *
 * Rendered as a SIBLING of the navbar pill, never inside it — the pill carries
 * both `overflow-hidden` and `backdrop-blur`, either of which would clip this
 * panel or trap it in the pill's own containing block.
 *
 * Each nav item owns a different 3D entrance and exit (see MOTION below), so
 * the seven menus never feel like the same drawer reopening. The panel is keyed
 * on the open item, which is what lets one menu animate *out* while the next
 * animates *in* rather than the contents simply being swapped underneath.
 */

const EASE = [0.16, 1, 0.3, 1] as const;
const IN = { duration: 0.46, ease: EASE };
const OUT = { duration: 0.22, ease: EASE };

type MenuMotion = {
  /** The edge or corner the panel pivots around. */
  origin: string;
  panel: Variants;
  link: Variants;
  /** Run the link stagger from the last item back to the first. */
  reverse?: boolean;
};

/**
 * A distinct 3D signature per menu. They share one easing and one duration
 * band, so they read as seven moves in a single language rather than seven
 * unrelated effects.
 */
const MOTION: Record<string, MenuMotion> = {
  // Folds down from the top edge, like a panel dropping open on a hinge.
  About: {
    origin: "top center",
    panel: {
      hidden: { opacity: 0, rotateX: -16, y: -22 },
      show: { opacity: 1, rotateX: 0, y: 0, transition: IN },
      exit: { opacity: 0, rotateX: -12, y: -14, transition: OUT },
    },
    link: {
      hidden: { opacity: 0, y: 16 },
      show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: EASE } },
    },
  },

  // Rises and settles from below, the way a stack of cards is dealt up.
  "Hire Developers": {
    origin: "bottom center",
    panel: {
      hidden: { opacity: 0, rotateX: 14, y: 30, scale: 0.97 },
      show: { opacity: 1, rotateX: 0, y: 0, scale: 1, transition: IN },
      exit: { opacity: 0, rotateX: 9, y: 18, scale: 0.98, transition: OUT },
    },
    link: {
      hidden: { opacity: 0, x: -18 },
      show: { opacity: 1, x: 0, transition: { duration: 0.42, ease: EASE } },
    },
  },

  // Swings in on a left-hand hinge.
  Services: {
    origin: "left center",
    panel: {
      hidden: { opacity: 0, rotateY: -16, x: -36 },
      show: { opacity: 1, rotateY: 0, x: 0, transition: IN },
      exit: { opacity: 0, rotateY: -10, x: -22, transition: OUT },
    },
    link: {
      hidden: { opacity: 0, scale: 0.9 },
      show: { opacity: 1, scale: 1, transition: { duration: 0.42, ease: EASE } },
    },
  },

  // The mirror of Services — a right-hand hinge, unstaggered in reverse.
  Technology: {
    origin: "right center",
    panel: {
      hidden: { opacity: 0, rotateY: 16, x: 36 },
      show: { opacity: 1, rotateY: 0, x: 0, transition: IN },
      exit: { opacity: 0, rotateY: 10, x: 22, transition: OUT },
    },
    link: {
      hidden: { opacity: 0, x: 18 },
      show: { opacity: 1, x: 0, transition: { duration: 0.42, ease: EASE } },
    },
    reverse: true,
  },

  // Arrives out of depth, and leaves *towards* the viewer rather than away.
  Solutions: {
    origin: "center center",
    panel: {
      hidden: { opacity: 0, scale: 0.9, z: -220, rotateX: 8 },
      show: { opacity: 1, scale: 1, z: 0, rotateX: 0, transition: IN },
      exit: { opacity: 0, scale: 1.05, z: 90, rotateX: -4, transition: OUT },
    },
    link: {
      hidden: { opacity: 0, rotateX: -40, y: 10 },
      show: { opacity: 1, rotateX: 0, y: 0, transition: { duration: 0.46, ease: EASE } },
    },
  },

  // Unfolds from the bottom-left corner, tilted on two axes at once.
  Work: {
    origin: "bottom left",
    panel: {
      hidden: { opacity: 0, rotateX: 14, rotateY: -12, y: 24 },
      show: { opacity: 1, rotateX: 0, rotateY: 0, y: 0, transition: IN },
      exit: { opacity: 0, rotateX: 9, rotateY: -8, y: 14, transition: OUT },
    },
    link: {
      hidden: { opacity: 0, y: -14 },
      show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: EASE } },
    },
    reverse: true,
  },

  // Rolls open around the top-right corner, with a slight in-plane pivot.
  Methodology: {
    origin: "top right",
    panel: {
      hidden: { opacity: 0, rotateX: -12, rotateZ: -2.5, scale: 0.95 },
      show: { opacity: 1, rotateX: 0, rotateZ: 0, scale: 1, transition: IN },
      exit: { opacity: 0, rotateX: -8, rotateZ: -1.5, scale: 0.97, transition: OUT },
    },
    link: {
      hidden: { opacity: 0, y: 18, rotateZ: -1.5 },
      show: {
        opacity: 1,
        y: 0,
        rotateZ: 0,
        transition: { duration: 0.44, ease: EASE },
      },
    },
  },
};

/** Used if a menu is ever added without its own signature. */
const FALLBACK: MenuMotion = MOTION.About;

const groupFor = (m: MenuMotion): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.038,
      delayChildren: 0.1,
      staggerDirection: m.reverse ? -1 : 1,
    },
  },
});

/** What the right-hand card is currently showing. */
type Preview = {
  key: string;
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  cta: string;
  icon?: string;
  facts?: { value: string; label: string }[];
};

/**
 * The living backdrop of the preview card: the logo's arcs, counter-rotating,
 * over a drifting bloom. All three keyframes already exist in globals.css and
 * are silenced there under `prefers-reduced-motion`.
 */
function OrbitBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40" />

      <div className="animate-bloom absolute -right-14 -top-20 size-64 rounded-full bg-[radial-gradient(circle,rgba(174,49,53,0.2),transparent_66%)] blur-2xl" />
      <div
        className="animate-bloom absolute -bottom-24 -left-16 size-56 rounded-full bg-[radial-gradient(circle,rgba(174,49,53,0.13),transparent_68%)] blur-2xl"
        style={{ ["--bloom-duration" as string]: "21s", animationDelay: "-7s" }}
      />

      {/* Outer ring, clockwise. */}
      <svg
        viewBox="0 0 240 240"
        fill="none"
        className="animate-orbit absolute -right-20 -top-24 size-80"
        style={{ ["--orbit-duration" as string]: "38s" }}
      >
        <circle
          cx="120"
          cy="120"
          r="96"
          stroke="#ae3135"
          strokeOpacity="0.1"
          strokeWidth="1"
          strokeDasharray="3 7"
        />
        <path
          d="M24 120A96 96 0 0 1 120 24"
          stroke="#ae3135"
          strokeOpacity="0.34"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="120" cy="24" r="4.5" fill="#ae3135" fillOpacity="0.5" />
      </svg>

      {/* Inner ring, counter-clockwise — same class, reversed. */}
      <svg
        viewBox="0 0 240 240"
        fill="none"
        className="animate-orbit absolute -right-20 -top-24 size-80"
        style={{
          ["--orbit-duration" as string]: "26s",
          animationDirection: "reverse",
        }}
      >
        <path
          d="M56 120A64 64 0 0 1 120 56"
          stroke="#ae3135"
          strokeOpacity="0.24"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="56" cy="120" r="3.5" fill="#ae3135" fillOpacity="0.4" />
      </svg>
    </div>
  );
}

function PanelBody({
  panel,
  motionSpec,
  onNavigate,
}: {
  panel: MegaPanel;
  motionSpec: MenuMotion;
  onNavigate: () => void;
}) {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState<MegaLink | null>(null);

  const preview: Preview = hovered
    ? {
        key: hovered.href + hovered.label,
        eyebrow: panel.intro,
        title: hovered.label,
        body: hovered.description,
        href: hovered.href,
        cta: "Open this section",
        icon: hovered.icon,
      }
    : {
        key: "default",
        eyebrow: panel.feature.eyebrow,
        title: panel.feature.title,
        body: panel.feature.body,
        href: panel.feature.href,
        cta: panel.feature.cta,
        facts: panel.feature.facts,
      };

  return (
    <motion.div
      variants={reduce ? undefined : groupFor(motionSpec)}
      initial="hidden"
      animate="show"
      className="grid gap-6 p-6 lg:grid-cols-[minmax(0,1.38fr)_minmax(0,0.62fr)]"
      onMouseLeave={() => setHovered(null)}
    >
      {/* ---------------- Link grid ---------------- */}
      <div>
        <motion.p
          variants={reduce ? undefined : motionSpec.link}
          className="flex items-center gap-2.5 px-3 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-ink-400"
        >
          <span aria-hidden className="h-px w-5 bg-brand-300" />
          {panel.intro}
        </motion.p>

        <ul className="mt-3 grid gap-1 [perspective:900px] sm:grid-cols-2">
          {panel.links.map((l) => {
            const isOn = hovered?.href === l.href && hovered?.label === l.label;
            return (
              <motion.li
                key={l.label + l.href}
                variants={reduce ? undefined : motionSpec.link}
                className="[transform-style:preserve-3d]"
              >
                <Link
                  href={l.href}
                  onClick={onNavigate}
                  onMouseEnter={() => setHovered(l)}
                  onFocus={() => setHovered(l)}
                  className="group/link relative flex gap-3.5 rounded-2xl p-3 [perspective:700px]"
                >
                  {/* Hover plate. A shared layout element, so it glides from
                      row to row instead of blinking on and off. */}
                  {isOn && !reduce && (
                    <motion.span
                      layoutId="mega-link-plate"
                      aria-hidden
                      className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-brand-50 to-brand-50/30 ring-1 ring-brand-100"
                      transition={{ duration: 0.32, ease: EASE }}
                    />
                  )}

                  {/* The tile lifts off the surface and turns as it fills. */}
                  <span className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-ink-200 bg-white text-brand-600 shadow-[0_1px_2px_rgba(16,15,20,0.04)] transition-[transform,border-color,color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] [transform-style:preserve-3d] group-hover/link:border-brand-500 group-hover/link:text-white group-hover/link:shadow-[0_10px_20px_-8px_rgba(174,49,53,0.65)] group-hover/link:[transform:translateZ(14px)_rotateY(-14deg)]">
                    <span
                      aria-hidden
                      className="absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:scale-y-100"
                    />
                    <Icon
                      name={l.icon}
                      className="relative size-[1.05rem] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:scale-110"
                    />
                  </span>

                  <span className="min-w-0 flex-1 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:translate-x-1">
                    <span className="flex items-center gap-1.5 text-[0.88rem] font-semibold leading-snug text-ink-950 transition-colors duration-300 group-hover/link:text-brand-800">
                      <span className="truncate">{l.label}</span>
                      <ArrowUpRight
                        aria-hidden
                        className="size-3 shrink-0 -translate-x-1.5 text-brand-600 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:translate-x-0 group-hover/link:opacity-100"
                      />
                    </span>
                    <span className="mt-0.5 line-clamp-2 block text-[0.765rem] leading-snug text-ink-500">
                      {l.description}
                    </span>
                  </span>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </div>

      {/* ---------------- Live preview ---------------- */}
      <motion.div
        variants={reduce ? undefined : motionSpec.link}
        className="[perspective:1000px]"
      >
        <Link
          href={preview.href}
          onClick={onNavigate}
          className="group/feature relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink-200/70 bg-gradient-to-br from-brand-50/90 via-white to-[var(--canvas-subtle)] p-6 transition-[border-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] [transform-style:preserve-3d] hover:border-brand-300 hover:shadow-(--shadow-card-hover) hover:[transform:translateZ(10px)_rotateX(2deg)]"
        >
          <OrbitBackdrop />

          {/* popLayout, not "wait": the pointer can cross six links faster than
              an exit animation runs, and "wait" queues them — leaving the card
              rendering the link you left rather than the one you are on. */}
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={preview.key}
              initial={reduce ? false : { opacity: 0, y: 12, rotateX: -12 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -10, rotateX: 8 }}
              transition={{ duration: reduce ? 0 : 0.26, ease: EASE }}
              className="relative flex h-full flex-col"
            >
              {preview.icon && (
                <motion.span
                  initial={
                    reduce ? false : { scale: 0.4, opacity: 0, rotateY: -70 }
                  }
                  animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                  transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
                  className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 text-white shadow-[0_10px_22px_-10px_rgba(174,49,53,0.65)]"
                >
                  <Icon name={preview.icon} className="size-5" />
                </motion.span>
              )}

              <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-brand-700">
                {preview.eyebrow}
              </p>
              <p className="mt-2.5 text-balance font-display text-[1.2rem] leading-tight text-ink-950">
                {preview.title}
              </p>
              <p className="mt-2.5 text-pretty text-[0.8rem] leading-relaxed text-ink-600">
                {preview.body}
              </p>

              {preview.facts && preview.facts.length > 0 && (
                <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-ink-200/70 pt-4">
                  {preview.facts.map((f, i) => (
                    <motion.div
                      key={f.label}
                      initial={reduce ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: reduce ? 0 : 0.42,
                        delay: reduce ? 0 : 0.12 + i * 0.07,
                        ease: EASE,
                      }}
                    >
                      <dt className="font-display text-[1.15rem] leading-none text-brand-700">
                        {f.value}
                      </dt>
                      <dd className="mt-1.5 font-mono text-[0.56rem] uppercase tracking-[0.16em] text-ink-500">
                        {f.label}
                      </dd>
                    </motion.div>
                  ))}
                </dl>
              )}

              <span className="mt-auto flex items-center gap-1.5 pt-5 text-[0.82rem] font-semibold text-brand-700">
                <span className="relative">
                  {preview.cta}
                  <span
                    aria-hidden
                    className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-brand-400 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/feature:scale-x-100"
                  />
                </span>
                <ArrowUpRight
                  aria-hidden
                  className="size-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/feature:-translate-y-0.5 group-hover/feature:translate-x-0.5"
                />
              </span>
            </motion.div>
          </AnimatePresence>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export function MegaMenu({
  openLabel,
  onNavigate,
  onMouseEnter,
  onMouseLeave,
}: {
  openLabel: string | null;
  onNavigate: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const reduce = useReducedMotion();
  const panel = openLabel ? megaMenu[openLabel] : undefined;
  const spec = (openLabel && MOTION[openLabel]) || FALLBACK;

  return (
    // Always mounted so AnimatePresence can play an exit, but inert while
    // closed — otherwise this strip would swallow clicks on the hero beneath.
    // The perspective lives here: the panel needs a parent to be projected in.
    <div
      className={cn(
        "absolute inset-x-0 top-full z-40 hidden pt-3 lg:block",
        panel ? "pointer-events-auto" : "pointer-events-none",
      )}
      style={{ perspective: "1800px", perspectiveOrigin: "50% 0%" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Keyed on the open item, so switching menus plays one signature out and
          the next one in, instead of swapping contents inside a static box. */}
      <AnimatePresence mode="wait" initial={false}>
        {panel && (
          <motion.div
            key={openLabel}
            id="mega-menu"
            role="group"
            aria-label={`${openLabel} menu`}
            variants={reduce ? undefined : spec.panel}
            initial={reduce ? { opacity: 0 } : "hidden"}
            animate={reduce ? { opacity: 1 } : "show"}
            exit={reduce ? { opacity: 0 } : "exit"}
            transition={reduce ? { duration: 0.12 } : undefined}
            style={{
              transformOrigin: spec.origin,
              transformStyle: "preserve-3d",
            }}
            className="relative overflow-hidden rounded-[1.75rem] border border-ink-200/70 bg-white/95 shadow-[0_24px_70px_-28px_rgba(16,15,20,0.32),0_10px_28px_-18px_rgba(174,49,53,0.26)] backdrop-blur-2xl backdrop-saturate-150"
          >
            {/* Brand hairline along the top edge, matching the navbar's beam. */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/80 to-transparent"
            />
            <PanelBody panel={panel} motionSpec={spec} onNavigate={onNavigate} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
