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
  glyph,
} from "./chassis";

const NAV = [
  { label: "Dashboard", icon: "grid" },
  { label: "Distributors", icon: "people" },
  { label: "Orders", icon: "cart" },
  { label: "Inventory", icon: "box" },
  { label: "Schemes", icon: "tag" },
  { label: "Claims", icon: "doc" },
  { label: "Reports", icon: "chart" },
  { label: "Settings", icon: "gear" },
];

/**
 * Placeholder trade partners. Deliberately generic descriptive names — never a
 * real company — so the mockup reads as sample data at a glance.
 */
const CHANNEL = [
  {
    name: "North Zone Distributor",
    code: "DST-1042",
    region: "Delhi NCR",
    orders: "312",
    state: "Active",
    tone: P.green,
  },
  {
    name: "Metro Trade Links",
    code: "DST-1078",
    region: "Mumbai West",
    orders: "268",
    state: "Active",
    tone: P.green,
  },
  {
    name: "Coastal Supply Co.",
    code: "DST-1113",
    region: "Kochi",
    orders: "204",
    state: "On hold",
    tone: P.amber,
  },
  {
    name: "Highland Agencies",
    code: "DST-1156",
    region: "Pune",
    orders: "187",
    state: "Active",
    tone: P.green,
  },
  {
    name: "Riverside Traders",
    code: "DST-1190",
    region: "Kolkata",
    orders: "142",
    state: "On hold",
    tone: P.amber,
  },
];

/** Six months of primary (billed to distributor) vs secondary (sold on) sales, ₹M. */
const SALES = [
  { month: "Mar", primary: 8.2, secondary: 6.4 },
  { month: "Apr", primary: 9.6, secondary: 7.5 },
  { month: "May", primary: 8.9, secondary: 7.1 },
  { month: "Jun", primary: 11.2, secondary: 8.8 },
  { month: "Jul", primary: 12.8, secondary: 10.1 },
  { month: "Aug", primary: 12.4, secondary: 9.8 },
];

/** Grouped-bar geometry for the right-hand panel. */
const CHART = { x: 668, right: 866, base: 452, h: 170, group: 33, max: 16 };

/** Table geometry for the left-hand panel. */
const TABLE = { x: 242, right: 582, top: 268, row: 48 };

export function DistributorDashboard({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${W} 560`}
      className={className}
      role="img"
      aria-label="Distributor management dashboard showing channel performance and primary versus secondary sales with sample data"
    >
      <Screen>
        <Sidebar
          product="Distributor Mgmt"
          items={NAV}
          activeIndex={0}
          bgFill="#111c2e"
          accentColor="#2563eb"
          activePillColor="#1c2d47"
        />
        <TopBar title="Dashboard" />

        {/* ---- KPI row ---- */}
        <Kpi
          x={SIDEBAR_W + 26}
          y={82}
          color={P.brand}
          label="Active distributors"
          value="342"
          delta="9 onboarded this month"
        />
        <Kpi
          x={SIDEBAR_W + 236}
          y={82}
          color={P.blue}
          label="Primary sales"
          value="₹12.4M"
          delta="6.8% from last month"
        />
        <Kpi
          x={SIDEBAR_W + 446}
          y={82}
          color={P.amber}
          label="Pending claims"
          value="87"
          delta="11 ageing over 30 days"
          deltaUp={false}
        />

        {/* ---- Channel performance table ---- */}
        <Panel x={222} y={196} w={380} h={330}>
          <PanelTitle
            x={TABLE.x}
            y={226}
            title="Channel performance"
            action="View all"
            actionX={TABLE.right}
          />

          {/* column headers */}
          <text
            x={TABLE.x}
            y={254}
            fontFamily="var(--font-inter, system-ui)"
            fontSize="8.5"
            fontWeight="600"
            letterSpacing="0.6"
            fill={P.inkFaint}
          >
            DISTRIBUTOR
          </text>
          <text
            x={392}
            y={254}
            fontFamily="var(--font-inter, system-ui)"
            fontSize="8.5"
            fontWeight="600"
            letterSpacing="0.6"
            fill={P.inkFaint}
          >
            REGION
          </text>
          <text
            x={506}
            y={254}
            fontFamily="var(--font-inter, system-ui)"
            fontSize="8.5"
            fontWeight="600"
            letterSpacing="0.6"
            fill={P.inkFaint}
            textAnchor="end"
          >
            ORDERS
          </text>
          <text
            x={520}
            y={254}
            fontFamily="var(--font-inter, system-ui)"
            fontSize="8.5"
            fontWeight="600"
            letterSpacing="0.6"
            fill={P.inkFaint}
          >
            STATUS
          </text>
          <line x1={TABLE.x} y1={262} x2={TABLE.right} y2={262} stroke={P.line} />

          {CHANNEL.map((d, i) => {
            const y = TABLE.top + i * TABLE.row;
            return (
              <g key={d.code}>
                <text
                  x={TABLE.x}
                  y={y + 19}
                  fontFamily="var(--font-inter, system-ui)"
                  fontSize="11"
                  fontWeight="600"
                  fill={P.ink}
                >
                  {d.name}
                </text>
                <text
                  x={TABLE.x}
                  y={y + 32}
                  fontFamily="var(--font-inter, system-ui)"
                  fontSize="9"
                  fill={P.inkMuted}
                >
                  {d.code}
                </text>

                {glyph("pin", 390, y + 14, P.inkFaint)}
                <text
                  x={406}
                  y={y + 26}
                  fontFamily="var(--font-inter, system-ui)"
                  fontSize="9.5"
                  fill={P.inkMuted}
                >
                  {d.region}
                </text>

                <text
                  x={506}
                  y={y + 26}
                  fontFamily="var(--font-manrope, system-ui)"
                  fontSize="11.5"
                  fontWeight="700"
                  fill={P.ink}
                  textAnchor="end"
                >
                  {d.orders}
                </text>

                <rect
                  x={520}
                  y={y + 13}
                  width="62"
                  height="19"
                  rx="9.5"
                  fill={d.tone}
                  opacity="0.12"
                />
                <text
                  x={551}
                  y={y + 26}
                  fontFamily="var(--font-inter, system-ui)"
                  fontSize="8.5"
                  fontWeight="600"
                  fill={d.tone}
                  textAnchor="middle"
                >
                  {d.state}
                </text>

                {i < CHANNEL.length - 1 && (
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

          <line x1={TABLE.x} y1={506} x2={TABLE.right} y2={506} stroke={P.lineSoft} />
          <text
            x={TABLE.x}
            y={520}
            fontFamily="var(--font-inter, system-ui)"
            fontSize="9"
            fill={P.inkFaint}
          >
            Showing 5 of 342 distributors
          </text>
        </Panel>

        {/* ---- Primary vs secondary sales ---- */}
        <Panel x={622} y={196} w={264} h={330}>
          <PanelTitle x={642} y={226} title="Primary vs secondary sales" />

          {/* legend */}
          <rect x={642} y={242} width="9" height="9" rx="2.5" fill={P.brand} />
          <text
            x={656}
            y={250}
            fontFamily="var(--font-inter, system-ui)"
            fontSize="9"
            fill={P.inkMuted}
          >
            Primary
          </text>
          <rect x={706} y={242} width="9" height="9" rx="2.5" fill={P.blue} />
          <text
            x={720}
            y={250}
            fontFamily="var(--font-inter, system-ui)"
            fontSize="9"
            fill={P.inkMuted}
          >
            Secondary
          </text>
          <text
            x={CHART.right}
            y={250}
            fontFamily="var(--font-inter, system-ui)"
            fontSize="8.5"
            fill={P.inkFaint}
            textAnchor="end"
          >
            ₹ in millions
          </text>

          {/* gridlines + y axis */}
          {[0, 1, 2, 3, 4].map((k) => {
            const y = CHART.base - (CHART.h / 4) * k;
            return (
              <g key={k}>
                <line x1={CHART.x} y1={y} x2={CHART.right} y2={y} stroke={P.lineSoft} />
                <text
                  x={CHART.x - 6}
                  y={y + 3}
                  fontFamily="var(--font-inter, system-ui)"
                  fontSize="8"
                  fill={P.inkFaint}
                  textAnchor="end"
                >
                  {k * 4}
                </text>
              </g>
            );
          })}
          <line
            x1={CHART.x}
            y1={CHART.base}
            x2={CHART.right}
            y2={CHART.base}
            stroke={P.line}
          />

          {/* grouped bars — crimson primary, blue secondary */}
          {SALES.map((m, i) => {
            const gx = CHART.x + i * CHART.group;
            const ph = (m.primary / CHART.max) * CHART.h;
            const sh = (m.secondary / CHART.max) * CHART.h;
            return (
              <g key={m.month}>
                <Bar
                  x={gx + 4}
                  y={CHART.base - ph}
                  w={11}
                  h={ph}
                  rx={3}
                  fill={P.brand}
                />
                <Bar
                  x={gx + 18}
                  y={CHART.base - sh}
                  w={11}
                  h={sh}
                  rx={3}
                  fill={P.blue}
                  opacity={0.85}
                />
                <text
                  x={gx + CHART.group / 2}
                  y={CHART.base + 18}
                  fontFamily="var(--font-inter, system-ui)"
                  fontSize="8.5"
                  fill={P.inkFaint}
                  textAnchor="middle"
                >
                  {m.month}
                </text>
              </g>
            );
          })}

          {/* footer split */}
          <line x1={642} y1={486} x2={CHART.right} y2={486} stroke={P.lineSoft} />
          <text
            x={642}
            y={504}
            fontFamily="var(--font-inter, system-ui)"
            fontSize="9.5"
            fill={P.inkMuted}
          >
            Primary YTD
          </text>
          <text
            x={642}
            y={519}
            fontFamily="var(--font-manrope, system-ui)"
            fontSize="13"
            fontWeight="700"
            fill={P.ink}
          >
            ₹68.4M
          </text>
          <text
            x={CHART.right}
            y={504}
            fontFamily="var(--font-inter, system-ui)"
            fontSize="9.5"
            fill={P.inkMuted}
            textAnchor="end"
          >
            Secondary YTD
          </text>
          <text
            x={CHART.right}
            y={519}
            fontFamily="var(--font-manrope, system-ui)"
            fontSize="13"
            fontWeight="700"
            fill={P.ink}
            textAnchor="end"
          >
            ₹51.2M
          </text>
        </Panel>
      </Screen>
    </svg>
  );
}
