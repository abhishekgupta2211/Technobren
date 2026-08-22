"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { MapPin, Building2 } from "lucide-react";
import { offices, type Office } from "@/lib/site";
import { LAND_ROWS, LAND_COLS, project } from "./worldMask";
import { cn } from "@/lib/utils";

/**
 * The office map.
 *
 * A dot field rather than filled landmasses, so the continents stay quiet and
 * the four brand-coloured nodes are the only thing with weight. Sea dots are
 * dropped entirely — only land is drawn — which keeps the SVG to roughly a
 * thousand circles instead of five thousand.
 *
 * The route between offices is the logo's arc motif again: each leg bows
 * upward, draws itself in west-to-east, and carries a travelling pulse. Pins
 * are buttons; selecting one flies the detail card in and rings the node.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

const CELL = 10;
const W = LAND_COLS * CELL;
const H = LAND_ROWS.length * CELL;

/** "Uganda" is both the city and the country slot; never print it twice. */
function placeName(o: Office) {
  return o.city === o.country ? o.city : `${o.city}, ${o.country}`;
}

/** Screen position of a lon/lat pair inside the viewBox. */
function place(office: Office) {
  const p = project(office.lon, office.lat);
  return { x: p.x * W, y: p.y * H };
}

/**
 * A leg of the route, bowed away from the equator so consecutive hops read as
 * separate arcs rather than one straight line through the middle of Africa.
 */
function arcPath(a: { x: number; y: number }, b: { x: number; y: number }) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dist = Math.hypot(b.x - a.x, b.y - a.y);
  return `M ${a.x} ${a.y} Q ${mx} ${my - dist * 0.38} ${b.x} ${b.y}`;
}

export function WorldMap({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [selected, setSelected] = useState(0);
  // Once someone picks an office the tour stops — it must never yank the map
  // away from the one they are reading.
  const [touched, setTouched] = useState(false);

  const choose = (i: number) => {
    setTouched(true);
    setSelected(i);
  };

  const nodes = useMemo(() => offices.map(place), []);
  const legs = useMemo(
    () => nodes.slice(0, -1).map((n, i) => arcPath(n, nodes[i + 1])),
    [nodes],
  );

  // Land dots only — the sea contributes nothing but weight.
  const dots = useMemo(() => {
    const out: { x: number; y: number }[] = [];
    LAND_ROWS.forEach((row, r) => {
      for (let c = 0; c < row.length; c++) {
        if (row[c] === "#") out.push({ x: c * CELL + CELL / 2, y: r * CELL + CELL / 2 });
      }
    });
    return out;
  }, []);

  // Slowly walk the offices so the map is alive before anyone touches it.
  useEffect(() => {
    if (reduce || touched) return;
    const id = setInterval(() => setSelected((i) => (i + 1) % offices.length), 5000);
    return () => clearInterval(id);
  }, [reduce, touched]);

  const active = offices[selected];

  return (
    <div className={cn("relative", className)}>
      <div className="relative overflow-hidden rounded-3xl border border-ink-200/80 bg-[var(--canvas-subtle)] p-4 shadow-(--shadow-card) sm:p-6">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-24 size-96 rounded-full bg-[radial-gradient(circle,rgba(174,49,53,0.1),transparent_66%)] blur-3xl"
        />

        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="relative w-full"
          role="img"
          aria-label={`TechnoBren offices: ${offices.map(placeName).join("; ")}`}
        >
          <defs>
            <linearGradient id="wm-route" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ae3135" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#ae3135" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#ae3135" stopOpacity="0.15" />
            </linearGradient>
          </defs>

          {/* ---- Land ---- */}
          <g fill="#c9c6c2" opacity="0.85">
            {dots.map((d, i) => (
              <circle key={i} cx={d.x} cy={d.y} r={2.1} />
            ))}
          </g>

          {/* ---- Route ---- */}
          {legs.map((d, i) => (
            <g key={`leg-${i}`}>
              <motion.path
                d={d}
                stroke="url(#wm-route)"
                strokeWidth={2.2}
                strokeLinecap="round"
                fill="none"
                initial={reduce ? { pathLength: 1 } : { pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: reduce ? 0 : 1.4, delay: i * 0.35, ease: EASE }}
              />
              {/* A packet running the leg, so the route reads as live. */}
              {!reduce && (
                <motion.circle
                  r={3.4}
                  fill="#ae3135"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 1, 0], offsetDistance: ["0%", "100%"] }}
                  transition={{
                    duration: 3.2,
                    delay: 1.2 + i * 0.9,
                    repeat: Infinity,
                    repeatDelay: legs.length * 0.9,
                    ease: "easeInOut",
                  }}
                  style={{ offsetPath: `path("${d}")`, offsetRotate: "0deg" }}
                />
              )}
            </g>
          ))}

          {/* ---- Offices ---- */}
          {nodes.map((n, i) => {
            const on = i === selected;
            return (
              <g
                key={offices[i].city}
                className="cursor-pointer"
                onClick={() => choose(i)}
                role="button"
                tabIndex={0}
                aria-label={placeName(offices[i])}
                aria-pressed={on}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    choose(i);
                  }
                }}
              >
                {/* Generous invisible hit area — the visible dot is tiny. */}
                <circle cx={n.x} cy={n.y} r={22} fill="transparent" />

                {on && !reduce && (
                  <motion.circle
                    cx={n.x}
                    cy={n.y}
                    fill="none"
                    stroke="#ae3135"
                    strokeWidth={1.5}
                    initial={{ r: 7, opacity: 0.7 }}
                    animate={{ r: [7, 26], opacity: [0.7, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  />
                )}

                <motion.circle
                  cx={n.x}
                  cy={n.y}
                  fill="#ae3135"
                  animate={{ r: on ? 8 : 5, opacity: on ? 1 : 0.55 }}
                  transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
                />
                <circle cx={n.x} cy={n.y} r={2.2} fill="#fff" />
              </g>
            );
          })}
        </svg>

        {/* ---- Detail card, anchored to the selected node ---- */}
        {/* popLayout, not "wait": "wait" left this card stuck on whichever office
            rendered first, exactly as it did in the nav panel. */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={active.city}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: reduce ? 0.15 : 0.4, ease: EASE }}
            // On a phone the map is only ~130px tall, so an overlay would bury it —
            // the card sits below the map there and only floats from sm up.
            className="pointer-events-none relative mt-4 rounded-2xl border border-ink-200 bg-white/95 p-4 shadow-[0_16px_40px_-20px_rgba(16,15,20,0.3)] backdrop-blur-sm sm:absolute sm:bottom-8 sm:left-8 sm:mt-0 sm:max-w-xs"
          >
            <p className="flex items-center gap-2 font-display text-[1.05rem] text-ink-950">
              <MapPin className="size-4 shrink-0 text-brand-600" aria-hidden />
              {active.city}
              {active.city !== active.country && (
                <span className="text-[0.8rem] font-normal text-ink-600">
                  {active.country}
                </span>
              )}
              {active.hq && (
                <span className="rounded border border-brand-200 bg-brand-50 px-1.5 py-px font-mono text-[0.58rem] uppercase tracking-wider text-brand-700">
                  HQ
                </span>
              )}
            </p>
            {active.address ? (
              <p className="mt-2 text-pretty text-[0.8rem] leading-relaxed text-ink-500">
                {active.address}
              </p>
            ) : (
              <p className="mt-2 flex items-center gap-1.5 text-[0.8rem] text-ink-500">
                <Building2 className="size-3.5 shrink-0 text-ink-400" aria-hidden />
                Regional office
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ---- Office selector ---- */}
      <ul className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {offices.map((o, i) => {
          const on = i === selected;
          return (
            <li key={o.city}>
              <button
                type="button"
                onClick={() => choose(i)}
                aria-pressed={on}
                className={cn(
                  "group w-full rounded-2xl border px-4 py-3 text-left transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  on
                    ? "-translate-y-0.5 border-brand-300 bg-brand-50/60 shadow-[0_8px_20px_-14px_rgba(174,49,53,0.5)]"
                    : "border-ink-200 bg-white hover:-translate-y-0.5 hover:border-brand-200",
                )}
              >
                <span className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className={cn(
                      "size-1.5 shrink-0 rounded-full transition-colors duration-500",
                      on ? "bg-brand-600" : "bg-ink-300",
                    )}
                  />
                  <span
                    className={cn(
                      "text-[0.88rem] font-semibold transition-colors duration-500",
                      on ? "text-brand-800" : "text-ink-900",
                    )}
                  >
                    {o.city}
                  </span>
                  {o.hq && (
                    <span className="ml-auto font-mono text-[0.55rem] uppercase tracking-wider text-brand-700">
                      HQ
                    </span>
                  )}
                </span>
                {o.city !== o.country && (
                  <span className="mt-1 block font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink-500">
                    {o.country}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
