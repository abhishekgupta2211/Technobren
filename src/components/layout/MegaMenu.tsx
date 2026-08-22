"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { megaMenu, type MegaPanel } from "@/lib/megaMenu";

/**
 * The desktop dropdown.
 *
 * Rendered as a SIBLING of the navbar pill, never inside it — the pill carries
 * both `overflow-hidden` and `backdrop-blur`, either of which would clip this
 * panel or trap it in the pill's own containing block.
 *
 * One shell stays mounted while any item is open and animates its own size, so
 * moving between nav items morphs the panel instead of tearing it down and
 * rebuilding it. Only the contents crossfade.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

const shell: Variants = {
  hidden: { opacity: 0, y: -10, scale: 0.985 },
  show: { opacity: 1, y: 0, scale: 1 },
};

const group: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.028, delayChildren: 0.04 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.34, ease: EASE } },
};

/** The logo's two arcs, terminating in a node dot — reused as panel artwork. */
function ArcMark({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 200 200" className={className} fill="none">
      <path
        d="M8 168C8 80 80 8 168 8"
        stroke="#ae3135"
        strokeOpacity="0.2"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M44 176C44 103 103 44 176 44"
        stroke="#ae3135"
        strokeOpacity="0.13"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="168" cy="8" r="4.5" fill="#ae3135" fillOpacity="0.45" />
      <circle cx="176" cy="44" r="3" fill="#ae3135" fillOpacity="0.3" />
    </svg>
  );
}

function PanelBody({ panel, onNavigate }: { panel: MegaPanel; onNavigate: () => void }) {
  const reduce = useReducedMotion();
  const { feature } = panel;

  return (
    <motion.div
      variants={reduce ? undefined : group}
      initial="hidden"
      animate="show"
      className="grid gap-5 p-5 lg:grid-cols-[minmax(0,1.42fr)_minmax(0,0.58fr)]"
    >
      {/* ---------- Link grid ---------- */}
      <div>
        <motion.p
          variants={reduce ? undefined : item}
          className="flex items-center gap-2.5 px-3 pb-1 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ink-400"
        >
          <span aria-hidden className="h-px w-4 bg-brand-300" />
          {panel.intro}
        </motion.p>

        <ul className="mt-2 grid gap-0.5 sm:grid-cols-2">
          {panel.links.map((l) => (
            <motion.li key={l.label + l.href} variants={reduce ? undefined : item}>
              <Link
                href={l.href}
                onClick={onNavigate}
                className="group/link flex gap-3.5 rounded-2xl p-3 transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-brand-50/70"
              >
                <span className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-ink-200 bg-white text-brand-600 shadow-[0_1px_2px_rgba(16,15,20,0.04)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:border-brand-500 group-hover/link:text-white group-hover/link:shadow-[0_6px_16px_-8px_rgba(174,49,53,0.55)]">
                  {/* Brand fill wipes up from the bottom on hover. */}
                  <span
                    aria-hidden
                    className="absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:scale-y-100"
                  />
                  <Icon name={l.icon} className="relative size-4" />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1 text-[0.87rem] font-semibold leading-snug text-ink-950 transition-colors duration-300 group-hover/link:text-brand-800">
                    <span className="truncate">{l.label}</span>
                    <ArrowUpRight
                      aria-hidden
                      className="size-3 shrink-0 -translate-x-1 text-brand-600 opacity-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:translate-x-0 group-hover/link:opacity-100"
                    />
                  </span>
                  <span className="mt-0.5 line-clamp-2 block text-[0.76rem] leading-snug text-ink-500">
                    {l.description}
                  </span>
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* ---------- Featured card ---------- */}
      <motion.div variants={reduce ? undefined : item}>
        <Link
          href={feature.href}
          onClick={onNavigate}
          className="group/feature relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink-200/80 bg-gradient-to-br from-brand-50 via-white to-[var(--canvas-subtle)] p-5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-brand-300 hover:shadow-(--shadow-card-hover)"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
          <ArcMark className="pointer-events-none absolute -right-12 -top-14 size-48 opacity-70 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/feature:scale-110 group-hover/feature:opacity-100" />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-16 -left-10 size-44 rounded-full bg-[radial-gradient(circle,rgba(174,49,53,0.14),transparent_66%)] blur-2xl transition-opacity duration-700 group-hover/feature:opacity-100"
          />

          <p className="relative font-mono text-[0.6rem] uppercase tracking-[0.2em] text-brand-700">
            {feature.eyebrow}
          </p>
          <p className="relative mt-3 text-balance font-display text-[1.12rem] leading-tight text-ink-950">
            {feature.title}
          </p>
          <p className="relative mt-2.5 text-pretty text-[0.79rem] leading-relaxed text-ink-600">
            {feature.body}
          </p>

          {feature.facts && feature.facts.length > 0 && (
            <dl className="relative mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-ink-200/70 pt-3.5">
              {feature.facts.map((f) => (
                <div key={f.label}>
                  <dt className="font-display text-[1.05rem] leading-none text-brand-700">
                    {f.value}
                  </dt>
                  <dd className="mt-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-ink-500">
                    {f.label}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          <span className="relative mt-auto flex items-center gap-1.5 pt-4 text-[0.8rem] font-semibold text-brand-700">
            <span className="border-b border-transparent transition-colors duration-300 group-hover/feature:border-brand-400">
              {feature.cta}
            </span>
            <ArrowUpRight
              aria-hidden
              className="size-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/feature:-translate-y-0.5 group-hover/feature:translate-x-0.5"
            />
          </span>
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
          className="absolute inset-x-0 top-full z-40 hidden pt-3 lg:block"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          variants={shell}
          initial="hidden"
          animate="show"
          exit="hidden"
          transition={{ duration: reduce ? 0.12 : 0.3, ease: EASE }}
        >
          <motion.div
            layout={!reduce}
            transition={{ duration: reduce ? 0 : 0.34, ease: EASE }}
            id="mega-menu"
            role="group"
            aria-label={`${openLabel} menu`}
            className="relative overflow-hidden rounded-3xl border border-ink-200/80 bg-white/95 shadow-[0_18px_60px_-24px_rgba(16,15,20,0.28),0_8px_24px_-16px_rgba(174,49,53,0.22)] backdrop-blur-xl backdrop-saturate-150"
          >
            {/* Brand hairline along the top edge, matching the navbar's beam. */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/70 to-transparent"
            />
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={openLabel}
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -6 }}
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
