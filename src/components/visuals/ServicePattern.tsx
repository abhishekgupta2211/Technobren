/**
 * Header artwork for the service cards.
 *
 * Six variations built from the same two ingredients as the TechnoBren logo —
 * an arc that sweeps out, and the node dot it terminates at. Each service gets a
 * distinct arrangement so the row of cards reads as a set rather than a repeat,
 * without needing six photographs.
 */

type Props = { variant: number; className?: string };

const C = "#ae3135";
const INK = "#3a3937";

export function ServicePattern({ variant, className }: Props) {
  const common = {
    viewBox: "0 0 320 128",
    className,
    fill: "none" as const,
    "aria-hidden": true,
  };

  // 0 — Custom software: nested arcs radiating from the corner
  if (variant === 0) {
    return (
      <svg {...common}>
        {[38, 62, 86, 110, 134].map((r, i) => (
          <path
            key={r}
            d={`M 0 ${128 - r} A ${r} ${r} 0 0 1 ${r} 128`}
            stroke={C}
            strokeOpacity={0.34 - i * 0.05}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        ))}
        <circle cx="0" cy="90" r="4" fill={C} fillOpacity="0.55" />
        <circle cx="248" cy="34" r="3.5" fill={INK} fillOpacity="0.22" />
        <circle cx="286" cy="72" r="5" fill={C} fillOpacity="0.3" />
      </svg>
    );
  }

  // 1 — Enterprise / ERP: a modular grid of blocks
  if (variant === 1) {
    return (
      <svg {...common}>
        {[0, 1, 2, 3, 4, 5].map((col) =>
          [0, 1, 2].map((row) => {
            const on = (col + row) % 4 === 1;
            return (
              <rect
                key={`${col}-${row}`}
                x={188 + col * 26}
                y={22 + row * 30}
                width="18"
                height="20"
                rx="4"
                fill={on ? C : INK}
                fillOpacity={on ? 0.4 : 0.1}
              />
            );
          }),
        )}
        <path
          d="M 24 104 A 80 80 0 0 1 104 24"
          stroke={C}
          strokeOpacity="0.3"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="104" cy="24" r="4.5" fill={C} fillOpacity="0.6" />
      </svg>
    );
  }

  // 2 — Mobile: stacked device outlines
  if (variant === 2) {
    return (
      <svg {...common}>
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={196 + i * 34}
            y={18 + i * 8}
            width="30"
            height={92 - i * 16}
            rx="7"
            stroke={i === 0 ? C : INK}
            strokeOpacity={i === 0 ? 0.45 : 0.16}
            strokeWidth="1.5"
            fill={i === 0 ? C : "transparent"}
            fillOpacity={i === 0 ? 0.07 : 0}
          />
        ))}
        <path
          d="M 20 108 A 92 92 0 0 1 112 16"
          stroke={C}
          strokeOpacity="0.26"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="4 7"
        />
        <circle cx="112" cy="16" r="4" fill={C} fillOpacity="0.5" />
      </svg>
    );
  }

  // 3 — AI / ML: a branching node network
  if (variant === 3) {
    return (
      <svg {...common}>
        <path
          d="M196 64 L242 32 M196 64 L242 96 M242 32 L292 20 M242 32 L292 52 M242 96 L292 84 M242 96 L292 110"
          stroke={INK}
          strokeOpacity="0.18"
          strokeWidth="1.4"
        />
        <circle cx="196" cy="64" r="9" fill={C} fillOpacity="0.16" />
        <circle cx="196" cy="64" r="4" fill={C} fillOpacity="0.7" />
        {[
          [242, 32],
          [242, 96],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="4" fill={INK} fillOpacity="0.3" />
        ))}
        {[
          [292, 20],
          [292, 52],
          [292, 84],
          [292, 110],
        ].map(([x, y], i) => (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r="3"
            fill={i === 1 ? C : INK}
            fillOpacity={i === 1 ? 0.55 : 0.2}
          />
        ))}
        <path
          d="M 16 112 A 96 96 0 0 1 112 16"
          stroke={C}
          strokeOpacity="0.24"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // 4 — BI & analytics: a rising series with bars
  if (variant === 4) {
    return (
      <svg {...common}>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          const h = [20, 34, 26, 46, 38, 58, 44][i];
          return (
            <rect
              key={i}
              x={182 + i * 20}
              y={106 - h}
              width="12"
              height={h}
              rx="3"
              fill={i === 5 ? C : INK}
              fillOpacity={i === 5 ? 0.5 : 0.12}
            />
          );
        })}
        <path
          d="M182 76 L202 62 L222 68 L242 44 L262 52 L282 30 L302 40"
          stroke={C}
          strokeOpacity="0.5"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="282" cy="30" r="4" fill={C} fillOpacity="0.75" />
        <path
          d="M 18 110 A 90 90 0 0 1 108 20"
          stroke={C}
          strokeOpacity="0.24"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // 5 — Web & commerce: overlapping surfaces
  return (
    <svg {...common}>
      <rect
        x="186"
        y="26"
        width="96"
        height="70"
        rx="8"
        stroke={INK}
        strokeOpacity="0.16"
        strokeWidth="1.5"
      />
      <rect
        x="210"
        y="42"
        width="96"
        height="70"
        rx="8"
        fill={C}
        fillOpacity="0.07"
        stroke={C}
        strokeOpacity="0.4"
        strokeWidth="1.5"
      />
      <rect x="224" y="58" width="44" height="6" rx="3" fill={C} fillOpacity="0.35" />
      <rect x="224" y="72" width="60" height="6" rx="3" fill={INK} fillOpacity="0.14" />
      <rect x="224" y="86" width="32" height="10" rx="5" fill={C} fillOpacity="0.5" />
      <path
        d="M 20 106 A 86 86 0 0 1 106 20"
        stroke={C}
        strokeOpacity="0.26"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="106" cy="20" r="4" fill={C} fillOpacity="0.5" />
    </svg>
  );
}
