"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { megaMenu, type MegaLink, type MegaPanel } from "@/lib/megaMenu";

/**
 * The desktop dropdown.
 *
 * Rendered as a SIBLING of the navbar pill, never inside it — the pill carries
 * both `overflow-hidden` and `backdrop-blur`, either of which would clip this
 * panel or trap it in the pill's own containing block.
 *
 * One shell stays mounted while any item is open and animates its own size, so
 * moving between nav items morphs the panel instead of tearing it down. Inside,
 * hovering any link re-targets the preview on the right: the panel answers every
 * pointer move rather than only the one that opened it.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

const shell: Variants = {
  hidden: { opacity: 0, y: -12, scale: 0.985 },
  show: { opacity: 1, y: 0, scale: 1 },
};

const group: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.03, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

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
  onNavigate,
}: {
  panel: MegaPanel;
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
      variants={reduce ? undefined : group}
      initial="hidden"
      animate="show"
      className="grid gap-6 p-6 lg:grid-cols-[minmax(0,1.38fr)_minmax(0,0.62fr)]"
      onMouseLeave={() => setHovered(null)}
    >
      {/* ---------------- Link grid ---------------- */}
      <div>
        <motion.p
          variants={reduce ? undefined : item}
          className="flex items-center gap-2.5 px-3 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-ink-400"
        >
          <span aria-hidden className="h-px w-5 bg-brand-300" />
          {panel.intro}
        </motion.p>

        <ul className="mt-3 grid gap-1 sm:grid-cols-2">
          {panel.links.map((l) => {
            const isOn = hovered?.href === l.href && hovered?.label === l.label;
            return (
              <motion.li key={l.label + l.href} variants={reduce ? undefined : item}>
                <Link
                  href={l.href}
                  onClick={onNavigate}
                  onMouseEnter={() => setHovered(l)}
                  onFocus={() => setHovered(l)}
                  className="group/link relative flex gap-3.5 rounded-2xl p-3 transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
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

                  <span className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-ink-200 bg-white text-brand-600 shadow-[0_1px_2px_rgba(16,15,20,0.04)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:border-brand-500 group-hover/link:text-white group-hover/link:shadow-[0_8px_18px_-8px_rgba(174,49,53,0.6)]">
                    <span
                      aria-hidden
                      className="absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:scale-y-100"
                    />
                    <Icon
                      name={l.icon}
                      className="relative size-[1.05rem] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:scale-110"
                    />
                  </span>

                  <span className="min-w-0 flex-1 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:translate-x-0.5">
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
      <motion.div variants={reduce ? undefined : item}>
        <Link
          href={preview.href}
          onClick={onNavigate}
          className="group/feature relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink-200/70 bg-gradient-to-br from-brand-50/90 via-white to-[var(--canvas-subtle)] p-6 transition-[border-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-(--shadow-card-hover)"
        >
          <OrbitBackdrop />

          {/* popLayout, not "wait": the pointer can cross six links faster than
              an exit animation runs, and "wait" queues them — leaving the card
              rendering the link you left rather than the one you are on. */}
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={preview.key}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: reduce ? 0 : 0.24, ease: EASE }}
              className="relative flex h-full flex-col"
            >
              {preview.icon && (
                <motion.span
                  initial={reduce ? false : { scale: 0.5, opacity: 0, rotate: -12 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  transition={{ duration: reduce ? 0 : 0.44, ease: EASE }}
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
                      initial={reduce ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: reduce ? 0 : 0.4,
                        delay: reduce ? 0 : 0.1 + i * 0.06,
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

  return (
    <AnimatePresence>
      {panel && (
        <motion.div
          // The pill sits above; this hangs off the bottom of the same wrapper.
          // The padding doubles as the bridge the pointer crosses.
          className="absolute inset-x-0 top-full z-40 hidden pt-3 lg:block"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          variants={shell}
          initial="hidden"
          animate="show"
          exit="hidden"
          transition={{ duration: reduce ? 0.12 : 0.32, ease: EASE }}
        >
          <motion.div
            layout={!reduce}
            transition={{ duration: reduce ? 0 : 0.36, ease: EASE }}
            id="mega-menu"
            role="group"
            aria-label={`${openLabel} menu`}
            className="relative overflow-hidden rounded-[1.75rem] border border-ink-200/70 bg-white/95 shadow-[0_24px_70px_-28px_rgba(16,15,20,0.32),0_10px_28px_-18px_rgba(174,49,53,0.26)] backdrop-blur-2xl backdrop-saturate-150"
          >
            {/* Brand hairline along the top edge, matching the navbar's beam. */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/80 to-transparent"
            />
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={openLabel}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: reduce ? 0 : 0.2, ease: EASE }}
              >
                <PanelBody panel={panel} onNavigate={onNavigate} />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
