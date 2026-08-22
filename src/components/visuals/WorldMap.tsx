"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { MapPin, Building2 } from "lucide-react";
import { offices, type Office } from "@/lib/site";
import { LAND_PATH, BORDER_PATH, COUNTRY_PATHS, project } from "./worldGeo";
import { cn } from "@/lib/utils";

/**
 * The office map.
 *
 * Real geometry — Natural Earth 1:110m coastlines and country borders, baked
 * into `worldGeo.ts` at build time — on a plain equirectangular projection, so
 * `project()` is its exact inverse and every pin sits on its true coordinate.
 *
 * Depth is real rather than painted: water, land, routes and pins each sit on
 * their own plane at a different translateZ inside a tilted preserve-3d stage,
 * so they parallax against one another instead of reading as a flat picture
 * with a drop shadow under it.
 *
 * Selecting an office flies the map to it the way a map app does. Pins
 * counter-scale as it zooms, so they stay the same size on screen.
 */

const EASE = [0.16, 1, 0.3, 1] as const;
const FLY = "1100ms cubic-bezier(0.16, 1, 0.3, 1)";

/** The frame the map rests at: Europe through South Asia, where the offices are. */
const HOME = (() => {
  const tl = project(-22, 62);
  const br = project(108, -38);
  return { x: tl.x, y: tl.y, w: br.x - tl.x, h: br.y - tl.y };
})();

const ZOOM = 3.2;

/** Meridians and parallels every 15 degrees, for the feel of a real chart. */
const GRATICULE = (() => {
  const d: string[] = [];
  for (let lon = -180; lon <= 180; lon += 15) {
    const a = project(lon, 84), b = project(lon, -60);
    d.push(`M${a.x} ${a.y}L${b.x} ${b.y}`);
  }
  for (let lat = -60; lat <= 84; lat += 15) {
    const a = project(-180, lat), b = project(180, lat);
    d.push(`M${a.x} ${a.y}L${b.x} ${b.y}`);
  }
  return d.join("");
})();

/** "Uganda" fills both the city and the country slot; never print it twice. */
function placeName(o: Office) {
  return o.city === o.country ? o.city : `${o.city}, ${o.country}`;
}

function place(o: Office) {
  return project(o.lon, o.lat);
}

/** A leg of the route, bowed so hops read as arcs rather than one straight line. */
function arcPath(a: { x: number; y: number }, b: { x: number; y: number }) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dist = Math.hypot(b.x - a.x, b.y - a.y);
  return `M ${a.x} ${a.y} Q ${mx} ${my - dist * 0.34} ${b.x} ${b.y}`;
}

export function WorldMap({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [selected, setSelected] = useState(0);
  // Once someone picks an office the tour stops — it must never pull the map
  // away from the one they are reading.
  const [touched, setTouched] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  const nodes = useMemo(() => offices.map(place), []);
  const legs = useMemo(
    () => nodes.slice(0, -1).map((n, i) => arcPath(n, nodes[i + 1])),
    [nodes],
  );

  const choose = (i: number) => {
    setTouched(true);
    setZoomed(true);
    setSelected(i);
  };

  useEffect(() => {
    if (reduce || touched) return;
    const id = setInterval(() => setSelected((i) => (i + 1) % offices.length), 5000);
    return () => clearInterval(id);
  }, [reduce, touched]);

  const active = offices[selected];
  const focus = nodes[selected];

  // Fly-to: put the focused node in the middle of the frame, scaled up.
  const scale = zoomed && !reduce ? ZOOM : 1;
  const cx = HOME.x + HOME.w / 2;
  const cy = HOME.y + HOME.h / 2;
  const tx = zoomed && !reduce ? cx - scale * focus.x : 0;
  const ty = zoomed && !reduce ? cy - scale * focus.y : 0;

  /**
   * Depth and fly-to have to live in ONE transform. Setting them as two
   * properties meant the second silently replaced the first, and the zoom never
   * moved. Read right to left: scale, then pan, then lift off the surface.
   */
  const plane = (z: number) =>
    ({
      transform: `translateZ(${reduce ? 0 : z}px) translate(${tx}px, ${ty}px) scale(${scale})`,
      transformOrigin: "0 0",
      transformBox: "view-box",
      transformStyle: "preserve-3d",
      transition: reduce ? undefined : `transform ${FLY}`,
    }) as const;

  return (
    <div className={cn("relative", className)}>
      <div
        className="relative overflow-hidden rounded-3xl border border-ink-200/80 bg-[var(--canvas-subtle)] p-3 shadow-(--shadow-card) sm:p-5"
        style={{ perspective: "1600px", perspectiveOrigin: "50% 40%" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-28 size-96 rounded-full bg-[radial-gradient(circle,rgba(174,49,53,0.12),transparent_66%)] blur-3xl"
        />

        {/* The stage: a shallow tilt is what turns stacked planes into depth. */}
        <div
          className="relative"
          style={{
            transformStyle: "preserve-3d",
            transform: reduce ? undefined : "rotateX(11deg)",
          }}
        >
          <svg
            viewBox={`${HOME.x} ${HOME.y} ${HOME.w} ${HOME.h}`}
            className="relative w-full"
            style={{ transformStyle: "preserve-3d" }}
            role="img"
            aria-label={`TechnoBren offices: ${offices.map(placeName).join("; ")}`}
          >
            <defs>
              <linearGradient id="wm-land" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f2f1ef" />
                <stop offset="100%" stopColor="#dedbd7" />
              </linearGradient>
              <linearGradient id="wm-route" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ae3135" stopOpacity="0.12" />
                <stop offset="50%" stopColor="#ae3135" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#ae3135" stopOpacity="0.12" />
              </linearGradient>
              <linearGradient id="wm-country" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e17c81" />
                <stop offset="100%" stopColor="#ae3135" />
              </linearGradient>
              <radialGradient id="wm-vignette" cx="50%" cy="42%" r="72%">
                <stop offset="60%" stopColor="#000" stopOpacity="0" />
                <stop offset="100%" stopColor="#16151a" stopOpacity="0.1" />
              </radialGradient>
              <filter id="wm-lift" x="-60%" y="-60%" width="220%" height="220%">
                <feDropShadow
                  dx="0"
                  dy="5"
                  stdDeviation="6"
                  floodColor="#16151a"
                  floodOpacity="0.2"
                />
              </filter>
              <filter id="wm-pin" x="-120%" y="-120%" width="340%" height="340%">
                <feDropShadow
                  dx="0"
                  dy="7"
                  stdDeviation="4"
                  floodColor="#7a2528"
                  floodOpacity="0.45"
                />
              </filter>
            </defs>

            {/* ---- Plane 0: land ---- */}
            {/* A dark copy of the coastline, offset and sunk behind everything:
                the slab the continents appear to be lifted off. */}
            <g style={plane(-30)} opacity={0.16}>
              <path d={LAND_PATH} fill="#57565c" transform="translate(0 10)" />
            </g>

            <g style={plane(0)}>
              <path
                d={GRATICULE}
                fill="none"
                stroke="#c9c6c2"
                strokeWidth={0.6}
                strokeOpacity="0.45"
                vectorEffect="non-scaling-stroke"
              />
              <path d={LAND_PATH} fill="url(#wm-land)" filter="url(#wm-lift)" />
              {/* The country the selected office is in, lit. */}
              <path
                d={COUNTRY_PATHS[active.iso]}
                fill="url(#wm-country)"
                fillOpacity={0.9}
                style={{ transition: reduce ? undefined : "d 0ms, fill-opacity 500ms" }}
              />
              <path
                d={BORDER_PATH}
                fill="none"
                stroke="#ffffff"
                strokeWidth={0.9}
                strokeOpacity="0.9"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d={LAND_PATH}
                fill="none"
                stroke="#c9c6c2"
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
              />
            </g>

            {/* ---- Plane 1: routes, floating above the land ---- */}
            <g style={plane(26)}>
              {legs.map((d, i) => (
                <g key={`leg-${i}`}>
                  <motion.path
                    d={d}
                    stroke="url(#wm-route)"
                    strokeWidth={2.4}
                    strokeLinecap="round"
                    fill="none"
                    vectorEffect="non-scaling-stroke"
                    initial={reduce ? { pathLength: 1 } : { pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-15%" }}
                    transition={{
                      duration: reduce ? 0 : 1.4,
                      delay: i * 0.3,
                      ease: EASE,
                    }}
                  />
                  {!reduce && (
                    <motion.circle
                      r={4}
                      fill="#ae3135"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: [0, 1, 1, 0],
                        offsetDistance: ["0%", "100%"],
                      }}
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
            </g>

            {/* ---- Plane 2: pins, highest off the surface ---- */}
            <g style={plane(56)}>
              {nodes.map((n, i) => {
                const on = i === selected;
                // Counter-scale, so a pin is the same size at every zoom level.
                const k = 1 / scale;
                return (
                  <g
                    key={offices[i].city}
                    transform={`translate(${n.x} ${n.y}) scale(${k})`}
                    style={{ transition: reduce ? undefined : `transform ${FLY}` }}
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
                    <circle r={26} fill="transparent" />
                    {on && !reduce && (
                      <motion.circle
                        fill="none"
                        stroke="#ae3135"
                        strokeWidth={1.6}
                        initial={{ r: 9, opacity: 0.75 }}
                        animate={{ r: [9, 34], opacity: [0.75, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                      />
                    )}
                    <motion.circle
                      fill="#ae3135"
                      filter="url(#wm-lift)"
                      animate={{ r: on ? 10 : 6.5, opacity: on ? 1 : 0.62 }}
                      transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
                    />
                    <circle r={3} fill="#fff" />
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        {/* ---- Detail card ---- */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={active.city}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: reduce ? 0.15 : 0.4, ease: EASE }}
            // On a phone the map is short, so the card stacks beneath it there
            // and only floats over the map from sm up.
            className="pointer-events-none relative mt-4 rounded-2xl border border-ink-200 bg-white/95 p-4 shadow-[0_16px_40px_-20px_rgba(16,15,20,0.3)] backdrop-blur-sm sm:absolute sm:bottom-7 sm:left-7 sm:mt-0 sm:max-w-xs"
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

        {/* ---- Back to the whole region ---- */}
        {zoomed && (
          <button
            type="button"
            onClick={() => setZoomed(false)}
            className="absolute right-4 top-4 rounded-full border border-ink-200 bg-white/95 px-3.5 py-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink-600 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-brand-300 hover:text-brand-700"
          >
            Zoom out
          </button>
        )}
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
