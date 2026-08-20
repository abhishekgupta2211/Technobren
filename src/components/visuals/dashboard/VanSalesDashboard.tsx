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
  glyph,
} from "./chassis";

const NAV = [
  { label: "Dashboard", icon: "grid" },
  { label: "Routes", icon: "pin" },
  { label: "Orders", icon: "doc" },
  { label: "Customers", icon: "people" },
  { label: "Products", icon: "box" },
  { label: "Reports", icon: "chart" },
  { label: "Users", icon: "people" },
  { label: "Settings", icon: "gear" },
];

const ORDERS = [
  {
    name: "Royal Mart",
    status: "Completed",
    value: "₹5,200",
    color: P.blue,
    done: true,
  },
  {
    name: "Star Retail",
    status: "Pending",
    value: "₹3,850",
    color: P.amber,
    done: false,
  },
  {
    name: "Green Super Store",
    status: "Completed",
    value: "₹4,100",
    color: P.green,
    done: true,
  },
  {
    name: "Fresh Mart",
    status: "Pending",
    value: "₹2,750",
    color: P.brand,
    done: false,
  },
];

/** The delivery run drawn on the route panel. */
const ROUTE = [
  [42, 96],
  [86, 118],
  [124, 104],
  [162, 122],
  [204, 108],
  [244, 78],
  [282, 92],
  [318, 54],
];

const MAP = { x: 244, y: 300, w: 344, h: 158 };

function routePath(ox: number, oy: number, scale = 1) {
  return ROUTE.map(
    ([x, y], i) => `${i === 0 ? "M" : "L"}${ox + x * scale} ${oy + y * scale}`,
  ).join(" ");
}

/** A soft, abstract street layer so the panel reads as a map without pretending to be one. */
function MapBed({
  x,
  y,
  w,
  h,
  rx = 10,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  rx?: number;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={rx} fill="#f3f4f2" />
      <g stroke="#e4e6e2" strokeWidth="6" strokeLinecap="round">
        <path d={`M${x} ${y + h * 0.34}h${w}`} />
        <path d={`M${x + w * 0.26} ${y}v${h}`} />
        <path d={`M${x + w * 0.68} ${y}v${h}`} />
      </g>
      <g stroke="#eceee9" strokeWidth="3" strokeLinecap="round">
        <path d={`M${x} ${y + h * 0.7}h${w}`} />
        <path d={`M${x + w * 0.46} ${y}v${h}`} />
      </g>
      <rect
        x={x + w * 0.06}
        y={y + h * 0.44}
        width={w * 0.15}
        height={h * 0.2}
        rx="3"
        fill="#e9ece6"
      />
      <rect
        x={x + w * 0.74}
        y={y + h * 0.12}
        width={w * 0.16}
        height={h * 0.16}
        rx="3"
        fill="#e9ece6"
      />
    </g>
  );
}

function Pin({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${s})`}>
      <path d="M0 0c0 0-9-9.6-9-15.4A9 9 0 0 1 9-15.4C9-9.6 0 0 0 0Z" fill={P.brand} />
      <circle cx="0" cy="-15.2" r="3.4" fill="#fff" />
    </g>
  );
}

export function VanSalesDashboard({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${W} 560`}
      className={className}
      role="img"
      aria-label="Van Sales System dashboard showing today's route, orders and field performance with sample data"
    >
      <Screen>
        <Sidebar
          product="Van Sales"
          items={NAV}
          activeIndex={0}
          user="Field Manager"
          role="Operations"
        />
        <TopBar title="Dashboard" />

        {/* ---- KPI row ---- */}
        <Kpi
          x={SIDEBAR_W + 22}
          y={82}
          w={152}
          color={P.brand}
          label="Total orders"
          value="1,250"
          delta="18.5% this month"
        />
        <Kpi
          x={SIDEBAR_W + 186}
          y={82}
          w={152}
          color={P.blue}
          label="Total sales"
          value="₹45,600"
          delta="22.8% this month"
        />
        <Kpi
          x={SIDEBAR_W + 350}
          y={82}
          w={152}
          color={P.green}
          label="Customers"
          value="860"
          delta="12.4% this month"
        />
        <Kpi
          x={SIDEBAR_W + 514}
          y={82}
          w={152}
          color={P.amber}
          label="Pending"
          value="120"
          delta="6.3% this month"
          deltaUp={false}
        />

        {/* ---- Today's route ---- */}
        <Panel x={SIDEBAR_W + 22} y={196} w={370} h={330}>
          <PanelTitle
            x={SIDEBAR_W + 42}
            y={226}
            title="Today's route"
            action="View map"
            actionX={SIDEBAR_W + 350}
          />

          <MapBed x={MAP.x} y={MAP.y - 60} w={MAP.w} h={MAP.h} />
          <path
            d={routePath(MAP.x - 2, MAP.y - 60)}
            fill="none"
            stroke={P.brand}
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {ROUTE.slice(1, -1).map(([x, y], i) => (
            <circle
              key={i}
              cx={MAP.x - 2 + x}
              cy={MAP.y - 60 + y}
              r="3.6"
              fill="#fff"
              stroke={P.brand}
              strokeWidth="1.8"
            />
          ))}
          <Pin x={MAP.x - 2 + ROUTE[0][0]} y={MAP.y - 60 + ROUTE[0][1]} s={0.82} />
          <Pin
            x={MAP.x - 2 + ROUTE[ROUTE.length - 1][0]}
            y={MAP.y - 60 + ROUTE[ROUTE.length - 1][1]}
            s={0.82}
          />

          {/* run summary */}
          <line
            x1={SIDEBAR_W + 42}
            y1={446}
            x2={SIDEBAR_W + 350}
            y2={446}
            stroke={P.lineSoft}
          />
          {[
            { k: "Visits", v: "18" },
            { k: "Orders", v: "24" },
            { k: "Sales", v: "₹45,600" },
            { k: "Distance", v: "120 km" },
          ].map((s, i) => {
            const x = SIDEBAR_W + 46 + i * 78;
            return (
              <g key={s.k}>
                <text
                  x={x}
                  y={472}
                  fontFamily="var(--font-inter, system-ui)"
                  fontSize="9.5"
                  fill={P.inkMuted}
                >
                  {s.k}
                </text>
                <text
                  x={x}
                  y={494}
                  fontFamily="var(--font-manrope, system-ui)"
                  fontSize="13"
                  fontWeight="700"
                  fill={P.ink}
                >
                  {s.v}
                </text>
                {i < 3 && (
                  <line x1={x + 62} y1={458} x2={x + 62} y2={500} stroke={P.lineSoft} />
                )}
              </g>
            );
          })}
        </Panel>

        {/* ---- Recent orders ---- */}
        <Panel x={612} y={196} w={274} h={330}>
          <PanelTitle
            x={632}
            y={226}
            title="Recent orders"
            action="View all"
            actionX={866}
          />
          {ORDERS.map((o, i) => {
            const y = 250 + i * 66;
            return (
              <g key={o.name}>
                <rect x={632} y={y} width="234" height="54" rx="10" fill={P.canvas} />
                <rect
                  x={644}
                  y={y + 13}
                  width="28"
                  height="28"
                  rx="8"
                  fill={o.color}
                  opacity="0.14"
                />
                {glyph("doc", 650, y + 19, o.color)}
                <text
                  x={684}
                  y={y + 24}
                  fontFamily="var(--font-inter, system-ui)"
                  fontSize="11"
                  fontWeight="600"
                  fill={P.ink}
                >
                  {o.name}
                </text>
                <text
                  x={684}
                  y={y + 39}
                  fontFamily="var(--font-inter, system-ui)"
                  fontSize="9.5"
                  fill={o.done ? P.green : P.amber}
                >
                  {o.status}
                </text>
                <text
                  x={854}
                  y={y + 32}
                  fontFamily="var(--font-manrope, system-ui)"
                  fontSize="12"
                  fontWeight="700"
                  fill={P.ink}
                  textAnchor="end"
                >
                  {o.value}
                </text>
              </g>
            );
          })}
        </Panel>
      </Screen>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Companion phone — the field app the route is actually run from      */
/* ------------------------------------------------------------------ */

export function VanSalesPhone({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 260 540"
      className={className}
      role="img"
      aria-label="Van Sales mobile app showing today's route and summary with sample data"
    >
      {/* device */}
      <rect x="4" y="4" width="252" height="532" rx="34" fill="#16151a" />
      <rect x="10" y="10" width="240" height="520" rx="29" fill={P.canvas} />

      {/* status bar */}
      <text
        x="30"
        y="34"
        fontFamily="var(--font-inter, system-ui)"
        fontSize="10"
        fontWeight="600"
        fill={P.ink}
      >
        9:41
      </text>
      <g fill={P.ink}>
        <rect x="196" y="26" width="3" height="7" rx="1" />
        <rect x="201" y="24" width="3" height="9" rx="1" />
        <rect x="206" y="22" width="3" height="11" rx="1" />
        <rect x="216" y="24" width="16" height="9" rx="2.5" opacity="0.75" />
      </g>

      {/* app bar */}
      <path d="M10 44h240v46H10Z" fill={P.brand} />
      <g stroke="#fff" strokeWidth="1.6" strokeLinecap="round" opacity="0.9">
        <path d="M28 62h14M28 67h14M28 72h14" />
      </g>
      <text
        x="130"
        y="72"
        fontFamily="var(--font-manrope, system-ui)"
        fontSize="14"
        fontWeight="700"
        fill="#fff"
        textAnchor="middle"
      >
        Today&apos;s Route
      </text>
      <circle cx="228" cy="61" r="1.6" fill="#fff" />
      <circle cx="228" cy="67" r="1.6" fill="#fff" />
      <circle cx="228" cy="73" r="1.6" fill="#fff" />

      {/* map card */}
      <rect
        x="22"
        y="102"
        width="216"
        height="140"
        rx="12"
        fill="#fff"
        stroke={P.line}
      />
      <MapBed x={30} y={110} w={200} h={124} rx={9} />
      <path
        d={ROUTE.map(
          ([x, y], i) => `${i === 0 ? "M" : "L"}${34 + x * 0.56} ${118 + y * 0.72}`,
        ).join(" ")}
        fill="none"
        stroke={P.brand}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {ROUTE.slice(1, -1).map(([x, y], i) => (
        <circle
          key={i}
          cx={34 + x * 0.56}
          cy={118 + y * 0.72}
          r="2.6"
          fill="#fff"
          stroke={P.brand}
          strokeWidth="1.4"
        />
      ))}
      <Pin x={34 + ROUTE[0][0] * 0.56} y={118 + ROUTE[0][1] * 0.72} s={0.6} />
      <Pin
        x={34 + ROUTE[ROUTE.length - 1][0] * 0.56}
        y={118 + ROUTE[ROUTE.length - 1][1] * 0.72}
        s={0.6}
      />

      {/* summary */}
      <text
        x="26"
        y="270"
        fontFamily="var(--font-manrope, system-ui)"
        fontSize="12.5"
        fontWeight="700"
        fill={P.ink}
      >
        Today&apos;s summary
      </text>
      <rect
        x="22"
        y="282"
        width="216"
        height="54"
        rx="11"
        fill="#fff"
        stroke={P.line}
      />
      {[
        { k: "Visits", v: "18" },
        { k: "Orders", v: "24" },
        { k: "Sales", v: "₹45,600" },
      ].map((s, i) => {
        const x = 40 + i * 72;
        return (
          <g key={s.k}>
            <text
              x={x}
              y={302}
              fontFamily="var(--font-inter, system-ui)"
              fontSize="8.5"
              fill={P.inkMuted}
              textAnchor="middle"
            >
              {s.k}
            </text>
            <text
              x={x}
              y={321}
              fontFamily="var(--font-manrope, system-ui)"
              fontSize="11.5"
              fontWeight="700"
              fill={P.ink}
              textAnchor="middle"
            >
              {s.v}
            </text>
            {i < 2 && (
              <line x1={x + 36} y1={292} x2={x + 36} y2={326} stroke={P.lineSoft} />
            )}
          </g>
        );
      })}

      {/* orders */}
      <text
        x="26"
        y="362"
        fontFamily="var(--font-manrope, system-ui)"
        fontSize="12.5"
        fontWeight="700"
        fill={P.ink}
      >
        Recent orders
      </text>
      <text
        x="234"
        y="362"
        fontFamily="var(--font-inter, system-ui)"
        fontSize="9.5"
        fill={P.brand}
        textAnchor="end"
      >
        View all
      </text>
      {ORDERS.slice(0, 3).map((o, i) => {
        const y = 374 + i * 46;
        return (
          <g key={o.name}>
            <rect
              x={22}
              y={y}
              width="216"
              height="38"
              rx="10"
              fill="#fff"
              stroke={P.line}
            />
            <rect
              x={32}
              y={y + 9}
              width="20"
              height="20"
              rx="6"
              fill={o.color}
              opacity="0.14"
            />
            {glyph("doc", 34, y + 11, o.color)}
            <text
              x={60}
              y={y + 18}
              fontFamily="var(--font-inter, system-ui)"
              fontSize="9.5"
              fontWeight="600"
              fill={P.ink}
            >
              {o.name}
            </text>
            <text
              x={60}
              y={y + 30}
              fontFamily="var(--font-inter, system-ui)"
              fontSize="8"
              fill={o.done ? P.green : P.amber}
            >
              {o.status}
            </text>
            <text
              x={228}
              y={y + 24}
              fontFamily="var(--font-manrope, system-ui)"
              fontSize="10.5"
              fontWeight="700"
              fill={P.ink}
              textAnchor="end"
            >
              {o.value}
            </text>
          </g>
        );
      })}

      {/* tab bar */}
      <rect x="10" y="486" width="240" height="44" rx="0" fill="#fff" />
      <line x1="10" y1="486" x2="250" y2="486" stroke={P.line} />
      {["grid", "doc", "people", "chart"].map((k, i) => {
        const x = i < 2 ? 38 + i * 52 : 148 + (i - 2) * 52;
        return <g key={k}>{glyph(k, x, 498, i === 0 ? P.brand : P.inkFaint)}</g>;
      })}
      <circle cx="130" cy="498" r="20" fill={P.brand} />
      <g stroke="#fff" strokeWidth="2.2" strokeLinecap="round">
        <path d="M130 490v16M122 498h16" />
      </g>
    </svg>
  );
}
