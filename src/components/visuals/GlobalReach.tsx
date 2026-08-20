"use client";

import { motion, useReducedMotion } from "motion/react";
import { offices } from "@/lib/site";

/**
 * The office footprint drawn as the logo's own motif: arcs sweeping between
 * node dots. Each office is a node, positioned left-to-right roughly by
 * longitude, and the arcs draw themselves in when the section scrolls into view.
 */

const NODES = [
  { x: 62, code: "LKO", y: 96 },
  { x: 158, code: "JNP", y: 62 },
  { x: 262, code: "DXB", y: 104 },
  { x: 372, code: "LAX", y: 54 },
];

function arc(from: { x: number; y: number }, to: { x: number; y: number }) {
  const mx = (from.x + to.x) / 2;
  const lift = Math.min(46, Math.abs(to.x - from.x) * 0.42);
  return `M${from.x} ${from.y} Q${mx} ${Math.min(from.y, to.y) - lift} ${to.x} ${to.y}`;
}

export function GlobalReach({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const nodes = NODES.slice(0, offices.length);

  return (
    <div className={className}>
      <svg
        viewBox="0 0 434 150"
        className="w-full"
        fill="none"
        role="img"
        aria-label={`Map of TechnoBren offices: ${offices.map((o) => o.city).join(", ")}`}
      >
        <defs>
          <linearGradient id="reach-arc" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ae3135" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#ae3135" stopOpacity="0.28" />
          </linearGradient>
        </defs>

        {/* baseline */}
        <line x1="24" y1="126" x2="410" y2="126" stroke="#eeecea" strokeWidth="1" />
        {nodes.map((n) => (
          <line
            key={`drop-${n.code}`}
            x1={n.x}
            y1={n.y}
            x2={n.x}
            y2={126}
            stroke="#f1efec"
            strokeWidth="1"
          />
        ))}

        {/* connecting arcs */}
        {nodes.slice(0, -1).map((n, i) => (
          <motion.path
            key={`arc-${n.code}`}
            d={arc(n, nodes[i + 1])}
            stroke="url(#reach-arc)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeDasharray="4 6"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{
              duration: reduce ? 0 : 1.1,
              delay: reduce ? 0 : 0.15 + i * 0.22,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        ))}

        {/* nodes */}
        {nodes.map((n, i) => (
          <motion.g
            key={n.code}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{
              duration: reduce ? 0 : 0.5,
              delay: reduce ? 0 : 0.1 + i * 0.22,
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
              y={n.y - 20}
              textAnchor="middle"
              className="fill-ink-600 font-mono"
              fontSize="9"
              letterSpacing="1.2"
            >
              {n.code}
            </text>
            <text
              x={n.x}
              y={142}
              textAnchor="middle"
              className="fill-ink-500"
              fontSize="9.5"
            >
              {offices[i]?.city}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
