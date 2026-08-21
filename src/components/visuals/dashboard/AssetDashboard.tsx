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
} from "./chassis";

const NAV = [
  { label: "Dashboard", icon: "grid" },
  { label: "Assets", icon: "tag" },
  { label: "Assignments", icon: "people" },
  { label: "Maintenance", icon: "gear" },
  { label: "Depreciation", icon: "money" },
  { label: "Audits", icon: "doc" },
  { label: "Reports", icon: "chart" },
  { label: "Settings", icon: "gear" },
];

/**
 * Placeholder asset register. Generic equipment names and made-up tag ids —
 * never a real company's inventory — so the mockup reads as sample data.
 */
const REGISTER = [
  {
    name: "Field Laptop",
    tag: "TB-04821",
    owner: "A. Sharma",
    state: "In service",
    tone: P.green,
  },
  {
    name: "Handheld Scanner",
    tag: "TB-04907",
    owner: "Route Team 3",
    state: "In service",
    tone: P.green,
  },
  {
    name: "Delivery Van",
    tag: "TB-05114",
    owner: "Logistics",
    state: "Servicing",
    tone: P.amber,
  },
  {
    name: "Cold Chain Unit",
    tag: "TB-05230",
    owner: "Warehouse B",
    state: "Servicing",
    tone: P.amber,
  },
  {
    name: "Barcode Printer",
    tag: "TB-05388",
    owner: "Dispatch Desk",
    state: "In service",
    tone: P.green,
  },
];

/** Preventive-maintenance milestones — the first three are already signed off. */
const MILESTONES = [
  { label: "Inspection", date: "12 Jun", done: true },
  { label: "Oil change", date: "28 Jun", done: true },
  { label: "Filter swap", date: "14 Jul", done: true },
  { label: "Calibration", date: "02 Aug", done: false },
  { label: "Full service", date: "26 Aug", done: false },
];

/** Condition split across the 4,820 tracked assets. */
const CONDITION = [
  { label: "Excellent", value: 2410, display: "2,410", color: P.green },
  { label: "Good", value: 1690, display: "1,690", color: P.blue },
  { label: "Needs repair", value: 657, display: "657", color: P.amber },
  { label: "Retired", value: 63, display: "63", color: P.inkFaint },
];

/** Table geometry for the left-hand panel. */
const TABLE = { x: 242, right: 542, top: 266, row: 48 };

/** Timeline geometry for the right-hand panel. */
const TIME = { x: 626, step: 54, y: 272 };

/** Donut geometry for the condition split. */
const DONUT = { cx: 664, cy: 442, r: 42, width: 15 };

const TOTAL = CONDITION.reduce((sum, c) => sum + c.value, 0);
const CIRCUMFERENCE = 2 * Math.PI * DONUT.r;

/** Each slice pre-resolved to a dash length and the offset it starts at. */
const ARCS = CONDITION.map((c, i) => {
  const before = CONDITION.slice(0, i).reduce((sum, x) => sum + x.value, 0);
  return {
    ...c,
    length: (c.value / TOTAL) * CIRCUMFERENCE,
    offset: (before / TOTAL) * CIRCUMFERENCE,
  };
});

/** A miniature QR sticker — the thing that is physically stuck on the asset. */
function Qr({ x, y }: { x: number; y: number }) {
  const cells = [1, 1, 0, 1, 0, 1, 0, 1, 1];
  return (
    <g>
      <rect
        x={x}
        y={y}
        width="22"
        height="22"
        rx="5"
        fill={P.surface}
        stroke={P.line}
      />
      {cells.map((on, i) => (
        <rect
          key={i}
          x={x + 4 + (i % 3) * 6}
          y={y + 4 + Math.floor(i / 3) * 6}
          width="4"
          height="4"
          rx="1"
          fill={on ? P.ink : P.inkFaint}
          opacity={on ? 0.85 : 0.55}
        />
      ))}
    </g>
  );
}

export function AssetDashboard({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${W} 560`}
      className={className}
      role="img"
      aria-label="Asset management dashboard showing the tagged asset register, maintenance schedule and condition split with sample data"
    >
      <Screen>
        <Sidebar
          product="Asset Mgmt"
          items={NAV}
          activeIndex={0}
          bgFill="#24201b"
          accentColor="#d97706"
          activePillColor="#38322a"
        />
        <TopBar title="Dashboard" />

        {/* ---- KPI row ---- */}
        <Kpi
          x={SIDEBAR_W + 26}
          y={82}
          color={P.brand}
          label="Total assets"
          value="4,820"
          delta="142 tagged this quarter"
        />
        <Kpi
          x={SIDEBAR_W + 236}
          y={82}
          color={P.amber}
          label="Under maintenance"
          value="63"
          delta="8 overdue for return"
          deltaUp={false}
        />
        <Kpi
          x={SIDEBAR_W + 446}
          y={82}
          color={P.violet}
          label="Due for audit"
          value="118"
          delta="Cycle closes in 21 days"
        />

        {/* ---- Asset register ---- */}
        <Panel x={222} y={196} w={340} h={330}>
          <PanelTitle
            x={TABLE.x}
            y={226}
            title="Asset register"
            action="Export"
            actionX={TABLE.right}
          />

          {/* column headers */}
          <text
            x={TABLE.x}
            y={252}
            fontFamily="var(--font-inter, system-ui)"
            fontSize="8.5"
            fontWeight="600"
            letterSpacing="0.6"
            fill={P.inkFaint}
          >
            ASSET
          </text>
          <text
            x={372}
            y={252}
            fontFamily="var(--font-inter, system-ui)"
            fontSize="8.5"
            fontWeight="600"
            letterSpacing="0.6"
            fill={P.inkFaint}
          >
            ASSIGNED TO
          </text>
          <text
            x={478}
            y={252}
            fontFamily="var(--font-inter, system-ui)"
            fontSize="8.5"
            fontWeight="600"
            letterSpacing="0.6"
            fill={P.inkFaint}
          >
            STATUS
          </text>
          <line x1={TABLE.x} y1={260} x2={TABLE.right} y2={260} stroke={P.line} />

          {REGISTER.map((a, i) => {
            const y = TABLE.top + i * TABLE.row;
            return (
              <g key={a.tag}>
                <Qr x={TABLE.x} y={y + 13} />

                <text
                  x={274}
                  y={y + 19}
                  fontFamily="var(--font-inter, system-ui)"
                  fontSize="11"
                  fontWeight="600"
                  fill={P.ink}
                >
                  {a.name}
                </text>
                <text
                  x={274}
                  y={y + 32}
                  fontFamily="var(--font-inter, system-ui)"
                  fontSize="9"
                  fill={P.inkMuted}
                >
                  {a.tag}
                </text>

                <text
                  x={372}
                  y={y + 26}
                  fontFamily="var(--font-inter, system-ui)"
                  fontSize="9.5"
                  fill={P.inkMuted}
                >
                  {a.owner}
                </text>

                <rect
                  x={478}
                  y={y + 13}
                  width="64"
                  height="19"
                  rx="9.5"
                  fill={a.tone}
                  opacity="0.12"
                />
                <text
                  x={510}
                  y={y + 26}
                  fontFamily="var(--font-inter, system-ui)"
                  fontSize="8.5"
                  fontWeight="600"
                  fill={a.tone}
                  textAnchor="middle"
                >
                  {a.state}
                </text>

                {i < REGISTER.length - 1 && (
                  <line
                    x1={TABLE.x}
                    y1={y + 42}
                    x2={TABLE.right}
                    y2={y + 42}
                    stroke={P.lineSoft}
                  />
                )}
              </g>
            );
          })}

          <line x1={TABLE.x} y1={504} x2={TABLE.right} y2={504} stroke={P.lineSoft} />
          <text
            x={TABLE.x}
            y={520}
            fontFamily="var(--font-inter, system-ui)"
            fontSize="9"
            fill={P.inkFaint}
          >
            Showing 5 of 4,820 tagged assets
          </text>
        </Panel>

        {/* ---- Maintenance schedule ---- */}
        <Panel x={582} y={196} w={304} h={330}>
          <PanelTitle
            x={602}
            y={226}
            title="Maintenance schedule"
            action="Next 90 days"
            actionX={866}
          />

          {/* completed run, then the road ahead */}
          <Bar
            x={TIME.x}
            y={TIME.y - 1.5}
            w={TIME.step * 2}
            h={3}
            rx={1.5}
            fill={P.brand}
          />
          <Bar
            x={TIME.x + TIME.step * 2}
            y={TIME.y - 1.5}
            w={TIME.step * 2}
            h={3}
            rx={1.5}
            fill={P.line}
          />

          {MILESTONES.map((m, i) => {
            const x = TIME.x + i * TIME.step;
            return (
              <g key={m.label}>
                {m.done ? (
                  <>
                    <circle cx={x} cy={TIME.y} r="7" fill={P.brand} />
                    <path
                      d={`M${x - 3} ${TIME.y} l2.2 2.4 L${x + 3.4} ${TIME.y - 3.2}`}
                      fill="none"
                      stroke={P.surface}
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </>
                ) : (
                  <circle
                    cx={x}
                    cy={TIME.y}
                    r="6"
                    fill={P.surface}
                    stroke={P.inkFaint}
                    strokeWidth="2"
                  />
                )}
                <text
                  x={x}
                  y={296}
                  fontFamily="var(--font-inter, system-ui)"
                  fontSize="8"
                  fontWeight="600"
                  fill={m.done ? P.ink : P.inkMuted}
                  textAnchor="middle"
                >
                  {m.label}
                </text>
                <text
                  x={x}
                  y={308}
                  fontFamily="var(--font-inter, system-ui)"
                  fontSize="7.5"
                  fill={P.inkFaint}
                  textAnchor="middle"
                >
                  {m.date}
                </text>
              </g>
            );
          })}

          <line x1={602} y1={330} x2={866} y2={330} stroke={P.lineSoft} />

          {/* condition split */}
          <text
            x={602}
            y={352}
            fontFamily="var(--font-manrope, system-ui)"
            fontSize="11.5"
            fontWeight="700"
            fill={P.ink}
          >
            Asset condition
          </text>
          <text
            x={866}
            y={352}
            fontFamily="var(--font-inter, system-ui)"
            fontSize="9"
            fill={P.inkFaint}
            textAnchor="end"
          >
            4,820 tracked
          </text>

          <g transform={`rotate(-90 ${DONUT.cx} ${DONUT.cy})`}>
            {ARCS.map((a) => (
              <circle
                key={a.label}
                cx={DONUT.cx}
                cy={DONUT.cy}
                r={DONUT.r}
                fill="none"
                stroke={a.color}
                strokeWidth={DONUT.width}
                strokeDasharray={`${Math.max(a.length - 2, 0.5)} ${CIRCUMFERENCE}`}
                strokeDashoffset={-a.offset}
              />
            ))}
          </g>
          <text
            x={DONUT.cx}
            y={DONUT.cy - 2}
            fontFamily="var(--font-manrope, system-ui)"
            fontSize="16"
            fontWeight="700"
            fill={P.ink}
            textAnchor="middle"
          >
            4,820
          </text>
          <text
            x={DONUT.cx}
            y={DONUT.cy + 12}
            fontFamily="var(--font-inter, system-ui)"
            fontSize="8.5"
            fill={P.inkMuted}
            textAnchor="middle"
          >
            assets
          </text>

          {ARCS.map((a, i) => {
            const y = 406 + i * 26;
            return (
              <g key={a.label}>
                <rect x={726} y={y - 8} width="9" height="9" rx="2.5" fill={a.color} />
                <text
                  x={741}
                  y={y}
                  fontFamily="var(--font-inter, system-ui)"
                  fontSize="9"
                  fill={P.inkMuted}
                >
                  {a.label}
                </text>
                <text
                  x={866}
                  y={y}
                  fontFamily="var(--font-inter, system-ui)"
                  fontSize="9.5"
                  fontWeight="600"
                  fill={P.ink}
                  textAnchor="end"
                >
                  {a.display}
                </text>
              </g>
            );
          })}

          <line x1={602} y1={504} x2={866} y2={504} stroke={P.lineSoft} />
          <text
            x={602}
            y={519}
            fontFamily="var(--font-inter, system-ui)"
            fontSize="9"
            fill={P.inkFaint}
          >
            63 assets under maintenance · 118 due for audit
          </text>
        </Panel>
      </Screen>
    </svg>
  );
}
