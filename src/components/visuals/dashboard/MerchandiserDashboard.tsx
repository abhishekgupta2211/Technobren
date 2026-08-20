import {
  PALETTE as P,
  W,
  SIDEBAR_W,
  Screen,
  Sidebar,
  TopBar,
  Kpi,
  Panel,
  PanelTitle,
  Bar,
  Tile,
  glyph,
} from "./chassis";

const NAV = [
  { label: "Dashboard", icon: "grid" },
  { label: "Store Visits", icon: "pin" },
  { label: "Planogram", icon: "box" },
  { label: "Audits", icon: "doc" },
  { label: "Photos", icon: "camera" },
  { label: "Attendance", icon: "people" },
  { label: "Reports", icon: "chart" },
  { label: "Settings", icon: "gear" },
];

/**
 * A merchandiser's beat for the day. Store names are generic placeholders —
 * never a real retailer — so the mockup reads as sample data at a glance.
 */
const VISITS = [
  {
    initials: "CS",
    name: "Central Supermart",
    city: "Sector 14, Metro City",
    time: "09:24 AM",
    state: "Completed",
    tone: P.green,
  },
  {
    initials: "GM",
    name: "Green Valley Mart",
    city: "Lakeview, Metro City",
    time: "10:05 AM",
    state: "Completed",
    tone: P.green,
  },
  {
    initials: "SB",
    name: "Sunrise Bazaar",
    city: "Old Town, Northport",
    time: "11:40 AM",
    state: "In progress",
    tone: P.blue,
  },
  {
    initials: "HS",
    name: "Harbour Stores",
    city: "Dock Road, Northport",
    time: "01:15 PM",
    state: "Pending",
    tone: P.amber,
  },
  {
    initials: "PK",
    name: "Parkside Kirana",
    city: "Garden Lane, Eastville",
    time: "03:00 PM",
    state: "Pending",
    tone: P.amber,
  },
];

/** Row geometry for the visit list. */
const LIST = { x: 242, right: 574, top: 250, row: 52 };

/** Shelf-photo grid geometry — 4 columns × 3 rows of 46px tiles. */
const GRID = { x: 634, right: 866, y: 246, step: 62, size: 46 };

/** Indices in the 12-tile grid that failed the shelf check. */
const FLAGGED = [2, 9];

export function MerchandiserDashboard({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${W} 560`}
      className={className}
      role="img"
      aria-label="Merchandiser dashboard showing today's store visits and shelf compliance photo audit with sample data"
    >
      <Screen>
        <Sidebar product="Merchandiser" items={NAV} activeIndex={0} />
        <TopBar title="Dashboard" />

        {/* ---- KPI row ---- */}
        <Kpi
          x={SIDEBAR_W + 26}
          y={82}
          color={P.brand}
          label="Visits today"
          value="128"
          delta="14 ahead of plan"
        />
        <Kpi
          x={SIDEBAR_W + 236}
          y={82}
          color={P.green}
          label="Planogram compliance"
          value="94%"
          delta="4 pts from last week"
        />
        <Kpi
          x={SIDEBAR_W + 446}
          y={82}
          color={P.amber}
          label="Open issues"
          value="12"
          delta="5 raised today"
          deltaUp={false}
        />

        {/* ---- Today's store visits ---- */}
        <Panel x={222} y={196} w={372} h={330}>
          <PanelTitle
            x={LIST.x}
            y={226}
            title="Today's store visits"
            action="128 on route"
            actionX={LIST.right}
          />

          {VISITS.map((v, i) => {
            const y = LIST.top + i * LIST.row;
            return (
              <g key={v.name}>
                {/* store avatar */}
                <circle cx={258} cy={y + 22} r="15" fill={v.tone} opacity="0.12" />
                <text
                  x={258}
                  y={y + 26}
                  fontFamily="var(--font-manrope, system-ui)"
                  fontSize="10"
                  fontWeight="700"
                  fill={v.tone}
                  textAnchor="middle"
                >
                  {v.initials}
                </text>

                <text
                  x={282}
                  y={y + 18}
                  fontFamily="var(--font-inter, system-ui)"
                  fontSize="11"
                  fontWeight="600"
                  fill={P.ink}
                >
                  {v.name}
                </text>
                <text
                  x={282}
                  y={y + 32}
                  fontFamily="var(--font-inter, system-ui)"
                  fontSize="9.5"
                  fill={P.inkMuted}
                >
                  {v.city}
                </text>

                <text
                  x={498}
                  y={y + 26}
                  fontFamily="var(--font-inter, system-ui)"
                  fontSize="9.5"
                  fill={P.inkFaint}
                  textAnchor="end"
                >
                  {v.time}
                </text>

                <rect
                  x={508}
                  y={y + 13}
                  width="66"
                  height="19"
                  rx="9.5"
                  fill={v.tone}
                  opacity="0.12"
                />
                <text
                  x={541}
                  y={y + 26}
                  fontFamily="var(--font-inter, system-ui)"
                  fontSize="8.5"
                  fontWeight="600"
                  fill={v.tone}
                  textAnchor="middle"
                >
                  {v.state}
                </text>

                {i < VISITS.length - 1 && (
                  <line
                    x1={LIST.x}
                    y1={y + 44}
                    x2={LIST.right}
                    y2={y + 44}
                    stroke={P.lineSoft}
                  />
                )}
              </g>
            );
          })}

          <line x1={LIST.x} y1={506} x2={LIST.right} y2={506} stroke={P.lineSoft} />
          <text
            x={LIST.x}
            y={520}
            fontFamily="var(--font-inter, system-ui)"
            fontSize="9"
            fill={P.inkFaint}
          >
            3 visits remaining · route closes 06:30 PM
          </text>
        </Panel>

        {/* ---- Shelf compliance ---- */}
        <Panel x={614} y={196} w={272} h={330}>
          <PanelTitle
            x={GRID.x}
            y={226}
            title="Shelf compliance"
            action="Today"
            actionX={GRID.right}
          />

          {/* 4 × 3 wall of shelf photos; flagged frames burn crimson */}
          {Array.from({ length: 12 }, (_, i) => {
            const col = i % 4;
            const row = Math.floor(i / 4);
            const x = GRID.x + col * GRID.step;
            const y = GRID.y + row * GRID.step;
            const flagged = FLAGGED.includes(i);
            return (
              <Tile
                key={i}
                x={x}
                y={y}
                size={GRID.size}
                color={flagged ? P.brand : P.lineSoft}
                glyph={glyph(
                  "camera",
                  x + 15,
                  y + 14,
                  flagged ? P.surface : P.inkFaint,
                )}
              />
            );
          })}

          <line x1={GRID.x} y1={432} x2={GRID.right} y2={432} stroke={P.lineSoft} />

          {/* compliance meter */}
          <text
            x={GRID.x}
            y={456}
            fontFamily="var(--font-inter, system-ui)"
            fontSize="10"
            fill={P.inkMuted}
          >
            Planogram compliance
          </text>
          <text
            x={GRID.right}
            y={457}
            fontFamily="var(--font-manrope, system-ui)"
            fontSize="14"
            fontWeight="700"
            fill={P.ink}
            textAnchor="end"
          >
            94%
          </text>
          <Bar x={GRID.x} y={466} w={232} h={8} fill={P.lineSoft} />
          <Bar x={GRID.x} y={466} w={218} h={8} fill={P.brand} />
          <text
            x={GRID.x}
            y={490}
            fontFamily="var(--font-inter, system-ui)"
            fontSize="8.5"
            fill={P.inkFaint}
          >
            Target 90% · 1,184 of 1,260 shelves compliant
          </text>

          <circle cx={638} cy={510} r="4" fill={P.green} />
          <text
            x={648}
            y={513}
            fontFamily="var(--font-inter, system-ui)"
            fontSize="9"
            fill={P.inkMuted}
          >
            Compliant 1,184
          </text>
          <circle cx={758} cy={510} r="4" fill={P.brand} />
          <text
            x={768}
            y={513}
            fontFamily="var(--font-inter, system-ui)"
            fontSize="9"
            fill={P.inkMuted}
          >
            Flagged 76
          </text>
        </Panel>
      </Screen>
    </svg>
  );
}
