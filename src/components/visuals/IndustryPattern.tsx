/**
 * Header artwork for the industry cards.
 *
 * Six motifs, each animating a different property so the row reads as six
 * different operations rather than one effect repeated: a moving conveyor, a
 * shelf waking up, turning gears, a vital sign, a route being traced, a stack
 * answering. All built from the same arc-and-node vocabulary as the logo.
 *
 * Every animation is a CSS keyframe declared in globals.css, which means the
 * `prefers-reduced-motion` block there silences all of them for free.
 */

type Props = { variant: number; className?: string };

const C = "#ae3135";
const INK = "#3a3937";

export function IndustryPattern({ variant, className }: Props) {
  const common = {
    viewBox: "0 0 320 96",
    className,
    fill: "none" as const,
    "aria-hidden": true,
  };

  // 0 — FMCG & Distribution: cases running along a line.
  if (variant === 0) {
    return (
      <svg {...common}>
        <line x1="0" y1="64" x2="320" y2="64" stroke={INK} strokeOpacity="0.1" />
        <g className="anim-track">
          {[0, 64, 128, 192, 256, 320, 384].map((x, i) => (
            <rect
              key={x}
              x={x + 12}
              y={38}
              width="22"
              height="22"
              rx="4"
              stroke={C}
              strokeOpacity={i % 2 ? 0.5 : 0.28}
              strokeWidth="1.5"
            />
          ))}
        </g>
        <circle cx="290" cy="30" r="4" fill={C} fillOpacity="0.45" />
      </svg>
    );
  }

  // 1 — Retail & Commerce: a shelf lighting up cell by cell.
  if (variant === 1) {
    return (
      <svg {...common}>
        {[0, 1, 2].map((row) =>
          [0, 1, 2, 3, 4, 5, 6].map((col) => (
            <rect
              key={`${row}-${col}`}
              className="anim-cell"
              style={{ animationDelay: `${(row * 7 + col) * 0.14}s` }}
              x={22 + col * 40}
              y={20 + row * 22}
              width="26"
              height="14"
              rx="3"
              fill={C}
              fillOpacity={row === 1 ? 0.3 : 0.16}
            />
          )),
        )}
      </svg>
    );
  }

  // 2 — Manufacturing: two meshed wheels, turning opposite ways.
  if (variant === 2) {
    const teeth = (cx: number, cy: number, r: number, n: number) =>
      Array.from({ length: n }, (_, i) => {
        const a = (i / n) * Math.PI * 2;
        return (
          <line
            key={i}
            x1={cx + Math.cos(a) * r}
            y1={cy + Math.sin(a) * r}
            x2={cx + Math.cos(a) * (r + 6)}
            y2={cy + Math.sin(a) * (r + 6)}
            stroke={C}
            strokeOpacity="0.4"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        );
      });
    return (
      <svg {...common}>
        <g
          className="animate-orbit"
          style={{ ["--orbit-duration" as string]: "14s", transformOrigin: "116px 48px" }}
        >
          <circle cx="116" cy="48" r="20" stroke={C} strokeOpacity="0.3" strokeWidth="1.5" />
          {teeth(116, 48, 20, 10)}
        </g>
        <g
          className="animate-orbit"
          style={{
            ["--orbit-duration" as string]: "10s",
            animationDirection: "reverse",
            transformOrigin: "182px 58px",
          }}
        >
          <circle cx="182" cy="58" r="13" stroke={C} strokeOpacity="0.24" strokeWidth="1.5" />
          {teeth(182, 58, 13, 8)}
        </g>
        <circle cx="116" cy="48" r="3" fill={C} fillOpacity="0.5" />
      </svg>
    );
  }

  // 3 — Healthcare: a vital sign, drawing and repeating.
  if (variant === 3) {
    const d =
      "M0 58 H88 l10 -22 l12 44 l11 -30 l10 14 h26 l9 -20 l11 26 h143";
    return (
      <svg {...common}>
        <path d={d} stroke={INK} strokeOpacity="0.08" strokeWidth="1.5" />
        <path
          className="anim-trace"
          d={d}
          stroke={C}
          strokeOpacity="0.6"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="260"
        />
        <circle cx="272" cy="58" r="3.5" fill={C} fillOpacity="0.5" />
      </svg>
    );
  }

  // 4 — Logistics & Field Ops: a route being traced between stops.
  if (variant === 4) {
    const d = "M18 74 C 78 74, 88 24, 148 24 S 232 72, 300 34";
    return (
      <svg {...common}>
        <path d={d} stroke={INK} strokeOpacity="0.1" strokeWidth="1.5" strokeDasharray="4 6" />
        <path
          className="anim-trace"
          d={d}
          stroke={C}
          strokeOpacity="0.55"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="260"
        />
        {[
          [18, 74],
          [148, 24],
          [300, 34],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i === 1 ? 4.5 : 3.5} fill={C} fillOpacity="0.5" />
        ))}
      </svg>
    );
  }

  // 5 — Enterprise IT: a stack, with one tier answering.
  return (
    <svg {...common}>
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          className={i === 1 ? "anim-bob" : undefined}
          x={104}
          y={18 + i * 22}
          width="112"
          height="16"
          rx="4"
          stroke={C}
          strokeOpacity={i === 1 ? 0.5 : 0.24}
          strokeWidth="1.5"
        />
      ))}
      {[0, 1, 2].map((i) => (
        <circle
          key={`d-${i}`}
          className="anim-cell"
          style={{ animationDelay: `${i * 0.45}s` }}
          cx={114}
          cy={26 + i * 22}
          r="2.4"
          fill={C}
          fillOpacity="0.6"
        />
      ))}
      <path
        d="M60 26 C 80 26, 80 70, 96 70"
        stroke={C}
        strokeOpacity="0.2"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="60" cy="26" r="3.5" fill={C} fillOpacity="0.4" />
    </svg>
  );
}
