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
  { label: "Sales", icon: "cart" },
  { label: "Inventory", icon: "box" },
  { label: "Finance", icon: "money" },
  { label: "HRM", icon: "people" },
  { label: "Reports", icon: "doc" },
  { label: "Assets", icon: "tag" },
  { label: "Settings", icon: "gear" },
];

const ACTIVITY = [
  {
    title: "New sales order",
    meta: "SO #1025 created",
    time: "10:30 AM",
    color: P.blue,
  },
  {
    title: "Payment received",
    meta: "Against invoice #2041",
    time: "09:15 AM",
    color: P.green,
  },
  {
    title: "Stock updated",
    meta: "Inventory recount posted",
    time: "Yesterday",
    color: P.amber,
  },
  {
    title: "New customer added",
    meta: "Account onboarded",
    time: "Yesterday",
    color: P.violet,
  },
  {
    title: "Invoice generated",
    meta: "INV #2048 generated",
    time: "2 days ago",
    color: P.brand,
  },
];

/** Monthly series for the revenue area chart, in arbitrary units. */
const SERIES = [24, 31, 29, 44, 52, 61, 74];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

const CHART = { x: 560, y: 268, w: 306, h: 150 };

function areaPath(close: boolean) {
  const max = 80;
  const step = CHART.w / (SERIES.length - 1);
  const pts = SERIES.map((v, i) => [
    CHART.x + i * step,
    CHART.y + CHART.h - (v / max) * CHART.h,
  ]);
  // A smooth curve reads as a real chart; straight segments read as a diagram.
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [px, py] = pts[i - 1];
    const [cx, cy] = pts[i];
    const mx = (px + cx) / 2;
    d += ` C${mx} ${py}, ${mx} ${cy}, ${cx} ${cy}`;
  }
  if (close)
    d += ` L${pts[pts.length - 1][0]} ${CHART.y + CHART.h} L${pts[0][0]} ${CHART.y + CHART.h} Z`;
  return d;
}

export function ErpDashboard({ className }: { className?: string }) {
  const max = 80;
  const step = CHART.w / (SERIES.length - 1);
  const last = SERIES[SERIES.length - 1];
  const lastX = CHART.x + (SERIES.length - 1) * step;
  const lastY = CHART.y + CHART.h - (last / max) * CHART.h;

  return (
    <svg
      viewBox={`0 0 ${W} 560`}
      className={className}
      role="img"
      aria-label="Custom ERP dashboard interface showing sales, inventory and finance modules with sample data"
    >
      <Screen>
        <Sidebar product="Custom ERP" items={NAV} activeIndex={0} />
        <TopBar title="Dashboard" />

        {/* ---- KPI row ---- */}
        <Kpi
          x={SIDEBAR_W + 26}
          y={82}
          color={P.brand}
          label="Total revenue"
          value="₹48.5M"
          delta="12.5% from last month"
        />
        <Kpi
          x={SIDEBAR_W + 236}
          y={82}
          color={P.blue}
          label="Total orders"
          value="1,250"
          delta="8.2% from last month"
        />
        <Kpi
          x={SIDEBAR_W + 446}
          y={82}
          color={P.amber}
          label="Total customers"
          value="8,650"
          delta="16.3% from last month"
        />

        {/* ---- Recent activities ---- */}
        <Panel x={SIDEBAR_W + 26} y={196} w={296} h={330}>
          <PanelTitle x={SIDEBAR_W + 46} y={226} title="Recent activities" />
          {ACTIVITY.map((a, i) => {
            const y = 250 + i * 52;
            return (
              <g key={a.title}>
                <circle
                  cx={SIDEBAR_W + 60}
                  cy={y + 14}
                  r="14"
                  fill={a.color}
                  opacity="0.12"
                />
                {glyph("doc", SIDEBAR_W + 52, y + 6, a.color)}
                <text
                  x={SIDEBAR_W + 84}
                  y={y + 11}
                  fontFamily="var(--font-inter, system-ui)"
                  fontSize="11"
                  fontWeight="600"
                  fill={P.ink}
                >
                  {a.title}
                </text>
                <text
                  x={SIDEBAR_W + 84}
                  y={y + 25}
                  fontFamily="var(--font-inter, system-ui)"
                  fontSize="9.5"
                  fill={P.inkMuted}
                >
                  {a.meta}
                </text>
                <text
                  x={SIDEBAR_W + 276}
                  y={y + 12}
                  fontFamily="var(--font-inter, system-ui)"
                  fontSize="9"
                  fill={P.inkFaint}
                  textAnchor="end"
                >
                  {a.time}
                </text>
                {i < ACTIVITY.length - 1 && (
                  <line
                    x1={SIDEBAR_W + 46}
                    y1={y + 38}
                    x2={SIDEBAR_W + 276}
                    y2={y + 38}
                    stroke={P.lineSoft}
                  />
                )}
              </g>
            );
          })}
          <rect x={SIDEBAR_W + 46} y={508} width="230" height="1" fill={P.lineSoft} />
        </Panel>

        {/* ---- Revenue overview ---- */}
        <Panel x={540} y={196} w={346} h={330}>
          <PanelTitle
            x={562}
            y={226}
            title="Revenue overview"
            action="Last 7 months"
            actionX={866}
          />

          {/* gridlines + y labels */}
          {[0, 1, 2, 3, 4].map((i) => {
            const y = CHART.y + (CHART.h / 4) * i;
            return (
              <g key={i}>
                <line
                  x1={CHART.x}
                  y1={y}
                  x2={CHART.x + CHART.w}
                  y2={y}
                  stroke={P.lineSoft}
                />
                <text
                  x={CHART.x - 10}
                  y={y + 3}
                  fontFamily="var(--font-inter, system-ui)"
                  fontSize="8.5"
                  fill={P.inkFaint}
                  textAnchor="end"
                >
                  {80 - i * 20}M
                </text>
              </g>
            );
          })}

          <defs>
            <linearGradient id="erp-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={P.brand} stopOpacity="0.22" />
              <stop offset="100%" stopColor={P.brand} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={areaPath(true)} fill="url(#erp-area)" />
          <path
            d={areaPath(false)}
            fill="none"
            stroke={P.brand}
            strokeWidth="2.4"
            strokeLinecap="round"
          />

          {SERIES.map((v, i) => (
            <text
              key={MONTHS[i]}
              x={CHART.x + i * step}
              y={CHART.y + CHART.h + 18}
              fontFamily="var(--font-inter, system-ui)"
              fontSize="8.5"
              fill={P.inkFaint}
              textAnchor="middle"
            >
              {MONTHS[i]}
            </text>
          ))}

          {/* value marker on the latest point */}
          <circle
            cx={lastX}
            cy={lastY}
            r="5"
            fill="#fff"
            stroke={P.brand}
            strokeWidth="2.5"
          />
          <rect
            x={lastX - 30}
            y={lastY - 30}
            width="60"
            height="20"
            rx="6"
            fill={P.brand}
          />
          <text
            x={lastX}
            y={lastY - 16}
            fontFamily="var(--font-inter, system-ui)"
            fontSize="9.5"
            fontWeight="700"
            fill="#fff"
            textAnchor="middle"
          >
            ₹48.5M
          </text>

          {/* footer split */}
          <line x1={562} y1={452} x2={866} y2={452} stroke={P.lineSoft} />
          <text
            x={562}
            y={474}
            fontFamily="var(--font-inter, system-ui)"
            fontSize="10"
            fill={P.inkMuted}
          >
            This month
          </text>
          <text
            x={562}
            y={498}
            fontFamily="var(--font-manrope, system-ui)"
            fontSize="16"
            fontWeight="700"
            fill={P.ink}
          >
            ₹48.5M
          </text>
          <circle cx={712} cy={470} r="4" fill={P.blue} />
          <text
            x={724}
            y={474}
            fontFamily="var(--font-inter, system-ui)"
            fontSize="10"
            fill={P.inkMuted}
          >
            Expenses
          </text>
          <text
            x={724}
            y={496}
            fontFamily="var(--font-inter, system-ui)"
            fontSize="11"
            fontWeight="600"
            fill={P.ink}
          >
            ₹18.2M
          </text>
          <circle cx={806} cy={470} r="4" fill={P.brand} />
          <text
            x={818}
            y={474}
            fontFamily="var(--font-inter, system-ui)"
            fontSize="10"
            fill={P.inkMuted}
          >
            Profit
          </text>
          <text
            x={818}
            y={496}
            fontFamily="var(--font-inter, system-ui)"
            fontSize="11"
            fontWeight="600"
            fill={P.ink}
          >
            ₹30.3M
          </text>
        </Panel>

        <Bar x={0} y={0} w={0} />
      </Screen>
    </svg>
  );
}
