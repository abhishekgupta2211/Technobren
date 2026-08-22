"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
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

/**
 * The frame the map rests at: the Atlantic across to South East Asia, cropped
 * to a 3:1 band. The earlier frame was nearly square, which made the section
 * enormously tall for no extra information — every office sits in one
 * horizontal belt, so the map should be a belt too. Every pin keeps at least
 * 10 degrees of margin inside this box.
 */
const HOME = (() => {
  const tl = project(-18, 40);
  const br = project(132, -10);
  return { x: tl.x, y: tl.y, w: br.x - tl.x, h: br.y - tl.y };
})();

const ZOOM = 3.2;

/**
 * Ocean swell: three sine lines at different depths and speeds. Each spans well
 * beyond the frame and shifts by exactly one wavelength, so the loop is
 * invisible. Drawn under a water mask, so they stop at every coastline.
 */
const WAVES = [
  { y: 300, amp: 3.5, opacity: 0.5, width: 1.1, duration: "11s" },
  { y: 372, amp: 4.5, opacity: 0.38, width: 1.3, duration: "8s" },
  { y: 452, amp: 3, opacity: 0.3, width: 1, duration: "14s" },
  { y: 236, amp: 3, opacity: 0.28, width: 1, duration: "13s" },
  { y: 528, amp: 4, opacity: 0.26, width: 1.2, duration: "9.5s" },
].map((w) => {
  const WAVELENGTH = 120;
  let d = `M -240 ${w.y}`;
  for (let x = -240; x < 2400; x += WAVELENGTH) {
    d += ` q ${WAVELENGTH / 4} ${-w.amp} ${WAVELENGTH / 2} 0 q ${WAVELENGTH / 4} ${w.amp} ${WAVELENGTH / 2} 0`;
  }
  return { ...w, d };
});

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

/**
 * Live local time per office.
 *
 * Deliberately null on the first render and filled in after mount: the server
 * and the visitor's machine are in different places, so rendering a clock
 * during SSR guarantees a hydration mismatch.
 */
function useLocalTimes() {
  const [times, setTimes] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    const read = () =>
      setTimes(
        Object.fromEntries(
          offices.map((o) => [
            o.city,
            new Intl.DateTimeFormat("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              timeZone: o.tz,
            }).format(new Date()),
          ]),
        ),
      );
    read();
    const id = setInterval(read, 30_000);
    return () => clearInterval(id);
  }, []);

  return times;
}

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
  const [hovered, setHovered] = useState<number | null>(null);

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

  const times = useLocalTimes();
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
        style={{ perspective: "2000px", perspectiveOrigin: "50% 35%" }}
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
            transform: reduce ? undefined : "rotateX(7deg)",
          }}
        >
          <svg
            viewBox={`${HOME.x} ${HOME.y} ${HOME.w} ${HOME.h}`}
            className="relative w-full"
            shapeRendering="geometricPrecision"
            style={{ transformStyle: "preserve-3d" }}
            role="img"
            aria-label={`TechnoBren offices: ${offices.map(placeName).join("; ")}`}
          >
            <defs>
              <linearGradient id="wm-land" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fbfaf9" />
                <stop offset="55%" stopColor="#efedea" />
                <stop offset="100%" stopColor="#e2dfda" />
              </linearGradient>
              <linearGradient id="wm-sea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#eceef0" />
                <stop offset="100%" stopColor="#e3e6ea" />
              </linearGradient>
              {/* Water-only mask, so the swell never crosses a coastline. */}
              <mask id="wm-sea-mask">
                <rect x="-4000" y="-4000" width="12000" height="12000" fill="#fff" />
                <path d={LAND_PATH} fill="#000" />
              </mask>
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
              <rect
                x={-4000}
                y={-4000}
                width={12000}
                height={12000}
                fill="url(#wm-sea)"
              />
              {/* Ocean swell: sine lines drifting west, clipped to water. */}
              <g mask="url(#wm-sea-mask)">
                {WAVES.map((w, i) => (
                  <g
                    key={i}
                    className={reduce ? undefined : "anim-wave"}
                    style={{ ["--wave-duration" as string]: w.duration }}
                  >
                    <path
                      d={w.d}
                      stroke="#8fa6bb"
                      strokeOpacity={w.opacity}
                      strokeWidth={w.width}
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                      fill="none"
                    />
                  </g>
                ))}
              </g>
              <path
                d={GRATICULE}
                fill="none"
                stroke="#a3a09b"
                strokeWidth={0.5}
                strokeOpacity="0.28"
                vectorEffect="non-scaling-stroke"
              />
              {/* A crisp offset copy stands in for the drop shadow: an SVG
                  filter rasterises at one resolution, so at 3.2x zoom it was
                  the single blurriest thing on the map. */}
              <path
                d={LAND_PATH}
                fill="#57565c"
                opacity={0.18}
                transform="translate(0 5)"
              />
              <path d={LAND_PATH} fill="url(#wm-land)" />
              {/* The country the selected office is in, lit. */}
              <path
                d={COUNTRY_PATHS[active.iso]}
                fill="url(#wm-country)"
                fillOpacity={0.28}
                stroke="#ae3135"
                strokeWidth={1.6}
                strokeOpacity={0.9}
                vectorEffect="non-scaling-stroke"
                style={{ transition: reduce ? undefined : "fill-opacity 500ms" }}
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
                const lit = on || hovered === i;
                // Counter-scale, so a pin is the same size at every zoom level.
                const k = 1 / scale;
                const STEM = 26;
                return (
                  <g
                    key={offices[i].city}
                    transform={`translate(${n.x} ${n.y}) scale(${k})`}
                    style={{ transition: reduce ? undefined : `transform ${FLY}` }}
                    className="cursor-pointer"
                    onClick={() => choose(i)}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
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
                    <circle r={30} fill="transparent" />

                    {/* Where the marker meets the ground. */}
                    <ellipse
                      rx={lit ? 10 : 7}
                      ry={lit ? 3.4 : 2.4}
                      fill="#16151a"
                      opacity={0.22}
                      style={{ transition: reduce ? undefined : "all 400ms" }}
                    />
                    {on && !reduce && (
                      <motion.ellipse
                        rx={10}
                        ry={3.4}
                        fill="none"
                        stroke="#ae3135"
                        strokeWidth={1.4}
                        initial={{ rx: 10, ry: 3.4, opacity: 0.8 }}
                        animate={{ rx: [10, 40], ry: [3.4, 13], opacity: [0.8, 0] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                      />
                    )}

                    {/* The mast, and the head sitting on top of it. */}
                    <motion.g
                      initial={reduce ? false : { y: -70, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true, margin: "-10%" }}
                      transition={{
                        type: "spring",
                        stiffness: 220,
                        damping: 16,
                        delay: 0.5 + i * 0.12,
                      }}
                    >
                      <line
                        x1={0}
                        y1={0}
                        x2={0}
                        y2={-STEM}
                        stroke="#ae3135"
                        strokeWidth={lit ? 2.4 : 1.8}
                        strokeOpacity={lit ? 0.9 : 0.5}
                        style={{ transition: reduce ? undefined : "all 400ms" }}
                      />
                      <motion.circle
                        cy={-STEM}
                        // An explicit r is required: with only `animate`, the
                        // first paint writes r="undefined" and the browser
                        // rejects the attribute.
                        r={6}
                        fill="#ae3135"
                        filter="url(#wm-pin)"
                        animate={{ r: lit ? 9 : 6 }}
                        transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
                      />
                      <circle cy={-STEM} r={2.8} fill="#fff" />
                    </motion.g>

                    {/* Name on the map, so it reads without clicking. */}
                    <text
                      x={0}
                      y={STEM + 16}
                      textAnchor="middle"
                      className="font-mono"
                      fontSize={11}
                      fontWeight={700}
                      letterSpacing={0.6}
                      fill={lit ? "#932a2e" : "#57565c"}
                      stroke="#faf9f8"
                      strokeWidth={3}
                      paintOrder="stroke"
                      style={{ transition: reduce ? undefined : "fill 400ms" }}
                    >
                      {offices[i].city.toUpperCase()}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        {/* ---- Detail card ---- */}
        {/*
          Keyed remount, not AnimatePresence. AnimatePresence's exits do not
          complete for this component pair: every selection left another card
          behind at opacity 0, so four dead nodes stacked up and nothing was
          visible at all. React removing the old node outright is both correct
          and snappier — there is nothing to see during an exit here anyway.
        */}
        <div
          key={active.city}
          // On a phone the map is short, so the card stacks beneath it there
          // and only floats over the map from sm up.
          className="pointer-events-none animate-card-rise relative mt-4 rounded-2xl border border-ink-200 bg-white/95 p-4 shadow-[0_16px_40px_-20px_rgba(16,15,20,0.3)] backdrop-blur-sm sm:absolute sm:bottom-7 sm:left-7 sm:mt-0 sm:max-w-xs"
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
            {times && (
              <span className="ml-auto shrink-0 font-mono text-[0.8rem] font-semibold tabular-nums text-brand-700">
                {times[active.city]}
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
        </div>

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
                    <span className="font-mono text-[0.55rem] uppercase tracking-wider text-brand-700">
                      HQ
                    </span>
                  )}
                  {times && (
                    <span
                      className={cn(
                        "ml-auto font-mono text-[0.72rem] font-semibold tabular-nums transition-colors duration-500",
                        on ? "text-brand-700" : "text-ink-500",
                      )}
                    >
                      {times[o.city]}
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
