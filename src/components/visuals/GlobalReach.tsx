"use client";

import { motion, useReducedMotion } from "motion/react";
import { offices } from "@/lib/site";

/**
 * The office footprint drawn as the logo's own motif: arcs sweeping between
 * node dots, one node per office, west to east.
 *
 * Node positions are derived from the office count rather than hard-coded, and
 * the viewBox carries enough gutter for the outermost label — an earlier version
 * pinned the last node near the right edge and clipped it.
 */

const CODES: Record<string, string> = {
  Lucknow: "LKO",
  Jaunpur: "JNP",
  Ahmedabad: "AMD",
  Indore: "IDR",
  Dubai: "DXB",
  "Beverly Hills": "LAX",
  Melbourne: "MEL",
};

const VB = { w: 440, h: 140 };
const GUTTER = 56; // room for the outermost label at either end
const BASE_Y = 104;
/** Gentle alternating lift so the row reads as a route, not a bar chart. */
const LIFT = [34, 16, 30, 12];

function code(city: string) {
  return CODES[city] ?? city.slice(0, 3).toUpperCase();
}

export function GlobalReach({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  const span = VB.w - GUTTER * 2;
  const nodes = offices.map((o, i) => ({
    city: o.city,
    code: code(o.city),
    x: offices.length === 1 ? VB.w / 2 : GUTTER + (span / (offices.length - 1)) * i,
    y: BASE_Y - LIFT[i % LIFT.length] - 14,
  }));

  return (
    <div className={className}>
      <svg
        viewBox={`0 0 ${VB.w} ${VB.h}`}
        className="w-full"
        fill="none"
        role="img"
        aria-label={`TechnoBren offices: ${offices.map((o) => `${o.city}, ${o.country}`).join("; ")}`}
      >
        <defs>
          <linearGradient id="reach-arc" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ae3135" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#ae3135" stopOpacity="0.32" />
          </linearGradient>
        </defs>

        {/* ground line + drop lines */}
        <line
          x1={GUTTER - 24}
          y1={BASE_Y}
          x2={VB.w - GUTTER + 24}
          y2={BASE_Y}
          stroke="#eeecea"
          strokeWidth="1"
        />
        {nodes.map((n) => (
          <line
            key={`drop-${n.code}`}
            x1={n.x}
            y1={n.y}
            x2={n.x}
            y2={BASE_Y}
            stroke="#f2f0ed"
            strokeWidth="1"
          />
        ))}

        {/* connecting arcs */}
        {nodes.slice(0, -1).map((n, i) => {
          const next = nodes[i + 1];
          const mx = (n.x + next.x) / 2;
          const peak = Math.min(n.y, next.y) - 22;
          return (
            <motion.path
              key={`arc-${n.code}`}
              d={`M${n.x} ${n.y} Q${mx} ${peak} ${next.x} ${next.y}`}
              stroke="url(#reach-arc)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeDasharray="4 6"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: reduce ? 0 : 1,
                delay: reduce ? 0 : 0.15 + i * 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          );
        })}

        {/* nodes */}
        {nodes.map((n, i) => (
          <motion.g
            key={n.code}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              duration: reduce ? 0 : 0.45,
              delay: reduce ? 0 : 0.1 + i * 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          >
            <circle cx={n.x} cy={n.y} r="11" fill="#ae3135" fillOpacity="0.1" />
            <circle
              cx={n.x}
              cy={n.y}
              r="4.5"
              fill={i === 0 ? "#ae3135" : "#ffffff"}
              stroke="#ae3135"
              strokeWidth="2"
            />
            <text
              x={n.x}
              y={n.y - 19}
              textAnchor="middle"
              className="fill-ink-600 font-mono"
              fontSize="12"
              letterSpacing="1.1"
            >
              {n.code}
            </text>
            <text
              x={n.x}
              y={BASE_Y + 20}
              textAnchor="middle"
              className="fill-ink-500"
              fontSize="13"
            >
              {n.city}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
