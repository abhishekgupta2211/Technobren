/**
 * Shared chassis for the product dashboards.
 *
 * Every product mockup is drawn on the same 900×560 canvas with the same
 * sidebar, top bar and card language, so the five products read as one family
 * of software rather than five unrelated pictures.
 *
 * Everything is SVG: sharp at any size, themable from the brand tokens, and a
 * fraction of the weight of a screenshot. The figures shown are placeholder
 * sample data — see `<MockupFrame>`, which labels them as such.
 */

export const PALETTE = {
  brand: "#ae3135",
  brandSoft: "#fdf4f4",
  brandMid: "#d05056",
  sidebar: "#1c1b20",
  sidebarSoft: "#2a2830",
  sidebarText: "#ffffff",
  canvas: "#f8f8f7",
  surface: "#ffffff",
  line: "#e9e7e4",
  lineSoft: "#f1efec",
  ink: "#16151a",
  inkMuted: "#57565c",
  inkFaint: "#c9c6c2",
  // muted supporting hues — dashboards read as real software with more than one
  blue: "#3f6fa8",
  amber: "#c08a2e",
  green: "#3f8a63",
  violet: "#6b5aa6",
} as const;

export const W = 900;
export const H = 560;
export const SIDEBAR_W = 196;

/* ------------------------------------------------------------------ */
/* Primitives                                                          */
/* ------------------------------------------------------------------ */

/** A neutral text placeholder bar. */
export function Bar({
  x,
  y,
  w,
  h = 7,
  fill = PALETTE.inkFaint,
  opacity = 1,
  rx,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  fill?: string;
  opacity?: number;
  rx?: number;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={rx ?? h / 2}
      fill={fill}
      opacity={opacity}
    />
  );
}

/** A white content panel with a hairline border. */
export function Panel({
  x,
  y,
  w,
  h,
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  children?: React.ReactNode;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="12"
        fill={PALETTE.surface}
        stroke={PALETTE.line}
      />
      {children}
    </g>
  );
}

/** A rounded icon tile — the coloured square that heads each KPI card. */
export function Tile({
  x,
  y,
  size = 40,
  color,
  glyph,
}: {
  x: number;
  y: number;
  size?: number;
  color: string;
  glyph?: React.ReactNode;
}) {
  return (
    <g>
      <rect x={x} y={y} width={size} height={size} rx="10" fill={color} />
      {glyph ?? (
        <>
          <rect
            x={x + 11}
            y={y + 11}
            width="7"
            height="7"
            rx="2"
            fill="#fff"
            opacity="0.95"
          />
          <rect
            x={x + 22}
            y={y + 11}
            width="7"
            height="7"
            rx="2"
            fill="#fff"
            opacity="0.6"
          />
          <rect
            x={x + 11}
            y={y + 22}
            width="7"
            height="7"
            rx="2"
            fill="#fff"
            opacity="0.6"
          />
          <rect
            x={x + 22}
            y={y + 22}
            width="7"
            height="7"
            rx="2"
            fill="#fff"
            opacity="0.95"
          />
        </>
      )}
    </g>
  );
}

/** A KPI card: coloured tile, label, value, and a delta line. */
export function Kpi({
  x,
  y,
  w = 190,
  color,
  label,
  value,
  delta,
  deltaUp = true,
}: {
  x: number;
  y: number;
  w?: number;
  color: string;
  label: string;
  value: string;
  delta: string;
  deltaUp?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height="84"
        rx="12"
        fill={PALETTE.surface}
        stroke={PALETTE.line}
      />
      <Tile x={x + 16} y={y + 22} color={color} />
      <text
        x={x + 68}
        y={y + 32}
        fontFamily="var(--font-inter, system-ui)"
        fontSize="11"
        fill={PALETTE.inkMuted}
      >
        {label}
      </text>
      <text
        x={x + 68}
        y={y + 55}
        fontFamily="var(--font-manrope, system-ui)"
        fontSize="21"
        fontWeight="700"
        fill={PALETTE.ink}
      >
        {value}
      </text>
      <text
        x={x + 68}
        y={y + 71}
        fontFamily="var(--font-inter, system-ui)"
        fontSize="9.5"
        fill={deltaUp ? PALETTE.green : PALETTE.brand}
      >
        {deltaUp ? "▲" : "▼"} {delta}
      </text>
    </g>
  );
}

/** Panel heading with an optional trailing action label. */
export function PanelTitle({
  x,
  y,
  title,
  action,
  actionX,
}: {
  x: number;
  y: number;
  title: string;
  action?: string;
  actionX?: number;
}) {
  return (
    <g>
      <text
        x={x}
        y={y}
        fontFamily="var(--font-manrope, system-ui)"
        fontSize="13"
        fontWeight="700"
        fill={PALETTE.ink}
      >
        {title}
      </text>
      {action && (
        <text
          x={actionX ?? x + 240}
          y={y}
          fontFamily="var(--font-inter, system-ui)"
          fontSize="10"
          fill={PALETTE.brand}
          textAnchor="end"
        >
          {action}
        </text>
      )}
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Sidebar + top bar                                                   */
/* ------------------------------------------------------------------ */

export type NavItem = { label: string; glyph: React.ReactNode };

/** Simple line glyphs, drawn on a 16×16 grid at the given origin. */
export function glyph(kind: string, x: number, y: number, stroke: string) {
  const p = {
    stroke,
    strokeWidth: 1.5,
    fill: "none",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (kind) {
    case "home":
      return (
        <path
          d={`M${x + 2} ${y + 8}L${x + 8} ${y + 3}L${x + 14} ${y + 8}V${y + 14}H${x + 2}Z`}
          {...p}
        />
      );
    case "cart":
      return (
        <g {...p}>
          <path d={`M${x + 2} ${y + 4}h2l2 7h7l2-5H${x + 6}`} />
          <circle cx={x + 7} cy={y + 13.5} r="1.2" />
          <circle cx={x + 13} cy={y + 13.5} r="1.2" />
        </g>
      );
    case "box":
      return (
        <g {...p}>
          <rect x={x + 2.5} y={y + 4} width="11" height="9" rx="1.5" />
          <path d={`M${x + 2.5} ${y + 7.5}h11`} />
        </g>
      );
    case "money":
      return (
        <g {...p}>
          <rect x={x + 2.5} y={y + 4.5} width="11" height="8" rx="1.5" />
          <circle cx={x + 8} cy={y + 8.5} r="1.8" />
        </g>
      );
    case "people":
      return (
        <g {...p}>
          <circle cx={x + 6.5} cy={y + 6} r="2.2" />
          <path d={`M${x + 2.5} ${y + 13}c0-2.2 1.8-3.6 4-3.6s4 1.4 4 3.6`} />
          <path d={`M${x + 11} ${y + 9.6}c1.6 0 2.8 1.2 2.8 3.4`} />
        </g>
      );
    case "chart":
      return (
        <g {...p}>
          <path d={`M${x + 3} ${y + 13}v-4`} />
          <path d={`M${x + 8} ${y + 13}v-8`} />
          <path d={`M${x + 13} ${y + 13}v-6`} />
        </g>
      );
    case "doc":
      return (
        <g {...p}>
          <path d={`M${x + 4} ${y + 3}h5l3 3v9H${x + 4}Z`} />
          <path d={`M${x + 6.5} ${y + 9}h4M${x + 6.5} ${y + 11.5}h3`} />
        </g>
      );
    case "pin":
      return (
        <g {...p}>
          <path
            d={`M${x + 8} ${y + 14}s4.5-4.2 4.5-7.2a4.5 4.5 0 1 0-9 0C${x + 3.5} ${y + 9.8} ${x + 8} ${y + 14} ${x + 8} ${y + 14}Z`}
          />
          <circle cx={x + 8} cy={y + 6.8} r="1.5" />
        </g>
      );
    case "grid":
      return (
        <g {...p}>
          <rect x={x + 3} y={y + 3} width="4.5" height="4.5" rx="1" />
          <rect x={x + 9} y={y + 3} width="4.5" height="4.5" rx="1" />
          <rect x={x + 3} y={y + 9} width="4.5" height="4.5" rx="1" />
          <rect x={x + 9} y={y + 9} width="4.5" height="4.5" rx="1" />
        </g>
      );
    case "gear":
      return (
        <g {...p}>
          <circle cx={x + 8} cy={y + 8.5} r="2.4" />
          <circle cx={x + 8} cy={y + 8.5} r="5.2" strokeDasharray="1.6 2.4" />
        </g>
      );
    case "camera":
      return (
        <g {...p}>
          <rect x={x + 2.5} y={y + 5} width="11" height="8" rx="1.6" />
          <circle cx={x + 8} cy={y + 9} r="2.2" />
        </g>
      );
    case "tag":
      return (
        <g {...p}>
          <path
            d={`M${x + 3} ${y + 8.5}L${x + 8.5} ${y + 3}h4.5v4.5L${x + 7.5} ${y + 13}Z`}
          />
          <circle cx={x + 10.8} cy={y + 5.6} r="0.9" />
        </g>
      );
    default:
      return <circle cx={x + 8} cy={y + 8} r="4" {...p} />;
  }
}

export function Sidebar({
  product,
  items,
  activeIndex = 0,
  user = "John Admin",
  role = "Administrator",
  bgFill = PALETTE.sidebar,
  accentColor = PALETTE.brand,
  activePillColor = PALETTE.sidebarSoft,
  activePillText = "#ffffff",
}: {
  product: string;
  items: { label: string; icon: string }[];
  activeIndex?: number;
  user?: string;
  role?: string;
  bgFill?: string;
  accentColor?: string;
  activePillColor?: string;
  activePillText?: string;
}) {
  return (
    <g>
      <path
        d={`M0 12 A12 12 0 0 1 12 0 H${SIDEBAR_W} V${H} H12 A12 12 0 0 1 0 ${H - 12} Z`}
        fill={bgFill}
      />

      {/* product lockup */}
      <rect x="22" y="24" width="30" height="30" rx="8" fill={accentColor} />
      <rect x="30" y="32" width="6" height="6" rx="1.6" fill="#fff" />
      <rect x="38" y="32" width="6" height="6" rx="1.6" fill="#fff" opacity="0.6" />
      <rect x="30" y="40" width="6" height="6" rx="1.6" fill="#fff" opacity="0.6" />
      <rect x="38" y="40" width="6" height="6" rx="1.6" fill="#fff" />
      <text
        x="62"
        y="44"
        fontFamily="var(--font-manrope, system-ui)"
        fontSize="14"
        fontWeight="700"
        fill="#ffffff"
      >
        {product}
      </text>

      {/* navigation */}
      {items.map((item, i) => {
        const y = 88 + i * 40;
        const on = i === activeIndex;
        return (
          <g key={item.label}>
            {on && (
              <rect
                x="14"
                y={y - 3}
                width={SIDEBAR_W - 28}
                height="34"
                rx="9"
                fill={activePillColor}
              />
            )}
            {on && (
              <rect
                x="14"
                y={y - 3}
                width="3"
                height="34"
                rx="1.5"
                fill={accentColor}
              />
            )}
            {glyph(item.icon, 28, y + 6, on ? activePillText : "rgba(255,255,255,0.45)")}
            <text
              x="58"
              y={y + 19}
              fontFamily="var(--font-inter, system-ui)"
              fontSize="12.5"
              fontWeight={on ? "600" : "500"}
              fill={on ? activePillText : "rgba(255,255,255,0.55)"}
            >
              {item.label}
            </text>
          </g>
        );
      })}

      {/* account */}
      <line
        x1="18"
        y1={H - 74}
        x2={SIDEBAR_W - 18}
        y2={H - 74}
        stroke="rgba(255,255,255,0.1)"
      />
      <circle cx="38" cy={H - 44} r="14" fill="rgba(255,255,255,0.12)" />
      <circle cx="38" cy={H - 48} r="4.5" fill="rgba(255,255,255,0.55)" />
      <path
        d={`M30 ${H - 34}c0-4 3.6-6.4 8-6.4s8 2.4 8 6.4`}
        fill="rgba(255,255,255,0.55)"
      />
      <text
        x="60"
        y={H - 47}
        fontFamily="var(--font-inter, system-ui)"
        fontSize="11"
        fontWeight="600"
        fill="#fff"
      >
        {user}
      </text>
      <text
        x="60"
        y={H - 34}
        fontFamily="var(--font-inter, system-ui)"
        fontSize="9.5"
        fill="rgba(255,255,255,0.45)"
      >
        {role}
      </text>
    </g>
  );
}

export function TopBar({ title }: { title: string }) {
  return (
    <g>
      <path
        d={`M${SIDEBAR_W} 0 H${W - 12} A12 12 0 0 1 ${W} 12 V60 H${SIDEBAR_W} Z`}
        fill={PALETTE.surface}
      />
      <line x1={SIDEBAR_W} y1="60" x2={W} y2="60" stroke={PALETTE.line} />

      {/* hamburger */}
      <g stroke={PALETTE.inkMuted} strokeWidth="1.6" strokeLinecap="round">
        <path d={`M${SIDEBAR_W + 26} 24h16`} />
        <path d={`M${SIDEBAR_W + 26} 30h16`} />
        <path d={`M${SIDEBAR_W + 26} 36h16`} />
      </g>

      <text
        x={SIDEBAR_W + 62}
        y="36"
        fontFamily="var(--font-manrope, system-ui)"
        fontSize="15"
        fontWeight="700"
        fill={PALETTE.ink}
      >
        {title}
      </text>

      {/* bell + badge */}
      <g transform={`translate(${W - 74}, 20)`}>
        <path
          d="M10 3a5 5 0 0 0-5 5v3l-1.6 2.4h13.2L15 11V8a5 5 0 0 0-5-5Z"
          fill="none"
          stroke={PALETTE.inkMuted}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M8 16a2 2 0 0 0 4 0"
          fill="none"
          stroke={PALETTE.inkMuted}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="15" cy="4" r="4.5" fill={PALETTE.brand} />
        <text
          x="15"
          y="7"
          fontFamily="var(--font-inter, system-ui)"
          fontSize="7"
          fontWeight="700"
          fill="#fff"
          textAnchor="middle"
        >
          3
        </text>
      </g>

      {/* avatar */}
      <g transform={`translate(${W - 40}, 20)`}>
        <circle cx="10" cy="10" r="10" fill={PALETTE.canvas} stroke={PALETTE.line} />
        <circle cx="10" cy="7.5" r="3.2" fill={PALETTE.inkFaint} />
        <path d="M4 17c0-3 2.7-4.8 6-4.8s6 1.8 6 4.8" fill={PALETTE.inkFaint} />
      </g>
    </g>
  );
}

/** The window surround every dashboard sits inside. */
export function Screen({ children }: { children: React.ReactNode }) {
  return (
    <>
      <rect x="0" y="0" width={W} height={H} rx="12" fill={PALETTE.canvas} />
      {children}
      <rect
        x="0.5"
        y="0.5"
        width={W - 1}
        height={H - 1}
        rx="12"
        fill="none"
        stroke={PALETTE.line}
      />
    </>
  );
}
