"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import {
  Building2,
  CreditCard,
  CalendarDays,
  Smartphone,
  Globe2,
  Bot,
  Cloud,
  Database,
  ShieldCheck,
  FileCheck2,
  Bell,
  BarChart3,
  Lock,
} from "lucide-react";

interface SystemNode {
  id: string;
  label: string;
  subText: string;
  icon: any;
  features: { icon: any; title: string; desc: string }[];
}

const SYSTEM_NODES: SystemNode[] = [
  {
    id: "subscriptions",
    label: "Subscriptions & Billing",
    subText: "Automated recurring billing & subscription management",
    icon: CreditCard,
    features: [
      { icon: FileCheck2, title: "Auto Invoicing", desc: "Generate invoices automatically" },
      { icon: Bell, title: "Smart Reminders", desc: "Payment reminders & notifications" },
      { icon: BarChart3, title: "Analytics & Reports", desc: "Revenue insights & reports" },
      { icon: Lock, title: "Secure Payments", desc: "Multiple gateways & 100% secure" },
    ],
  },
  {
    id: "erp",
    label: "Enterprise ERP",
    subText: "Core business operations & resource planning",
    icon: Building2,
    features: [
      { icon: FileCheck2, title: "Inventory Control", desc: "Real-time stock tracking" },
      { icon: BarChart3, title: "Financial Ledger", desc: "Automated accounting audit" },
      { icon: Bell, title: "HR & Payroll", desc: "Staff attendance & payouts" },
      { icon: Lock, title: "Role Security", desc: "Granular enterprise permissions" },
    ],
  },
  {
    id: "booking",
    label: "Booking System",
    subText: "Smart scheduling & reservation management",
    icon: CalendarDays,
    features: [
      { icon: CalendarDays, title: "Calender Sync", desc: "Google & Outlook integration" },
      { icon: Bell, title: "SMS Alerts", desc: "Instant customer reminders" },
      { icon: BarChart3, title: "Capacity Control", desc: "Prevent double bookings" },
      { icon: Lock, title: "Deposit Lock", desc: "Advance payment hold" },
    ],
  },
  {
    id: "mobile",
    label: "Mobile Apps (iOS/Android)",
    subText: "Native mobile experience for customers & teams",
    icon: Smartphone,
    features: [
      { icon: Smartphone, title: "Cross Platform", desc: "React Native & Flutter apps" },
      { icon: Bell, title: "Push Messaging", desc: "Real-time app notifications" },
      { icon: BarChart3, title: "Offline Mode", desc: "Local database sync" },
      { icon: Lock, title: "Biometrics", desc: "FaceID & Fingerprint auth" },
    ],
  },
  {
    id: "web",
    label: "Web Portal & Marketplace",
    subText: "Digital storefronts & self-service customer portals",
    icon: Globe2,
    features: [
      { icon: Globe2, title: "SEO Optimized", desc: "Sub-second Next.js pages" },
      { icon: BarChart3, title: "Customer Desk", desc: "Self-service client portal" },
      { icon: Bell, title: "Live Chat", desc: "Automated support widget" },
      { icon: Lock, title: "SSO Login", desc: "OAuth & SAML authentication" },
    ],
  },
  {
    id: "ai",
    label: "AI & Data Pipeline",
    subText: "Intelligent automation & data processing",
    icon: Bot,
    features: [
      { icon: Bot, title: "LLM Workflows", desc: "Custom AI agent pipelines" },
      { icon: BarChart3, title: "Predictive BI", desc: "Machine learning forecasting" },
      { icon: Bell, title: "Anomaly Alerts", desc: "Automated fraud detection" },
      { icon: Lock, title: "Data Privacy", desc: "Enterprise AI data isolation" },
    ],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps (AWS/Azure)",
    subText: "Scalable infrastructure & continuous delivery",
    icon: Cloud,
    features: [
      { icon: Cloud, title: "Auto Scaling", desc: "Dynamic traffic handling" },
      { icon: BarChart3, title: "CI/CD Pipeline", desc: "Zero downtime deployments" },
      { icon: Bell, title: "System Monitor", desc: "24/7 cluster health alerts" },
      { icon: Lock, title: "DDoS Defense", desc: "WAF & SSL security shield" },
    ],
  },
  {
    id: "db",
    label: "Real-time Database",
    subText: "Live data sync & high performance storage",
    icon: Database,
    features: [
      { icon: Database, title: "Sub-ms Query", desc: "Redis & PostgreSQL caching" },
      { icon: BarChart3, title: "Multi Region", desc: "Low latency global sync" },
      { icon: Bell, title: "Auto Backup", desc: "Point-in-time recovery" },
      { icon: Lock, title: "AES Encryption", desc: "End-to-end data security" },
    ],
  },
  {
    id: "payments",
    label: "Payment Gateways (Stripe/Razorpay)",
    subText: "Secure & seamless payment processing",
    icon: ShieldCheck,
    features: [
      { icon: ShieldCheck, title: "Multi Currency", desc: "Global card payouts & UPI" },
      { icon: BarChart3, title: "Reconciliation", desc: "Automated payout matching" },
      { icon: Bell, title: "Webhook Engine", desc: "Instant payment triggers" },
      { icon: Lock, title: "PCI Compliance", desc: "Level-1 PCI-DSS security" },
    ],
  },
];

export function InteractiveArchitectureDiagram() {
  const reduce = useReducedMotion();
  const [activeNodeId, setActiveNodeId] = useState("subscriptions");

  // Auto transition animation loop
  useEffect(() => {
    if (reduce) return;
    const interval = setInterval(() => {
      setActiveNodeId((prev) => {
        const idx = SYSTEM_NODES.findIndex((n) => n.id === prev);
        return SYSTEM_NODES[(idx + 1) % SYSTEM_NODES.length].id;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [reduce]);

  const activeNode = SYSTEM_NODES.find((n) => n.id === activeNodeId) || SYSTEM_NODES[0];
  const ActiveIcon = activeNode.icon;

  return (
    <section className="relative overflow-hidden bg-white text-ink-950 pt-24 sm:pt-28 pb-6 sm:pb-8 border-t border-ink-100 min-h-[calc(100vh-80px)] flex flex-col justify-between">
      <Container size="wide" className="relative flex-1 flex flex-col justify-between">
        
        {/* Compact Section Header */}
        <div className="max-w-2xl mx-auto text-center shrink-0">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[0.72rem] font-semibold text-brand-700 shadow-2xs">
            <span className="flex size-3.5 items-center justify-center rounded-full bg-brand-600 text-white text-[0.55rem] font-bold">
              ☸
            </span>
            <span>Neural Architecture Network</span>
          </div>

          <h2 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl lg:text-4xl text-ink-950 tracking-tight leading-tight">
            Interconnected <span className="text-brand-700">System Ecosystem</span>
          </h2>
          
          <p className="mt-1 text-xs sm:text-sm text-ink-500 font-medium leading-normal max-w-xl mx-auto">
            Point at any system node to see how TechnoBren’s central core engine orchestrates data across your enterprise.
          </p>
        </div>

        {/* ---------- EXACT DIAGRAM NETWORK NODE CANVAS FIT IN SINGLE VIEW ---------- */}
        <div className="relative max-w-5xl mx-auto size-full min-h-[380px] sm:min-h-[420px] my-2 flex items-center justify-center p-1 sm:p-4 shrink-0">
                 {/* Animated Connecting Right-Angle Dotted Neural Lines SVG matching Image 2 */}
          <svg className="pointer-events-none absolute inset-0 size-full z-0 overflow-visible" xmlns="http://www.w3.org/2000/svg">
            {/* Exact Dotted Orthogonal Connectors to Center Concentric Ring */}
            {/* 1. TOP CENTER: Subscriptions */}
            <path d="M 50% 12% L 50% 36%" stroke="#ae3135" strokeWidth="2.5" strokeDasharray="4,4" strokeLinecap="round" fill="none" />
            <circle cx="50%" cy="36%" r="4" fill="#ae3135" />

            {/* 2. TOP LEFT: Enterprise ERP */}
            <path d="M 28% 12% V 28% H 42%" stroke="#ae3135" strokeWidth="2.5" strokeDasharray="4,4" strokeLinecap="round" fill="none" />
            <circle cx="42%" cy="28%" r="4" fill="#ae3135" />

            {/* 3. TOP RIGHT: Booking System */}
            <path d="M 72% 12% V 28% H 58%" stroke="#ae3135" strokeWidth="2.5" strokeDasharray="4,4" strokeLinecap="round" fill="none" />
            <circle cx="58%" cy="28%" r="4" fill="#ae3135" />

            {/* 4. MID LEFT TOP: Mobile Apps */}
            <path d="M 23% 39% H 40%" stroke="#ae3135" strokeWidth="2.5" strokeDasharray="4,4" strokeLinecap="round" fill="none" />
            <circle cx="40%" cy="39%" r="4" fill="#ae3135" />

            {/* 5. MID LEFT BOTTOM: Web Portal */}
            <path d="M 23% 60% H 40%" stroke="#ae3135" strokeWidth="2.5" strokeDasharray="4,4" strokeLinecap="round" fill="none" />
            <circle cx="40%" cy="60%" r="4" fill="#ae3135" />

            {/* 6. MID RIGHT TOP: AI & Data Pipeline */}
            <path d="M 77% 39% H 60%" stroke="#ae3135" strokeWidth="2.5" strokeDasharray="4,4" strokeLinecap="round" fill="none" />
            <circle cx="60%" cy="39%" r="4" fill="#ae3135" />

            {/* 7. MID RIGHT BOTTOM: Cloud & DevOps */}
            <path d="M 77% 60% H 60%" stroke="#ae3135" strokeWidth="2.5" strokeDasharray="4,4" strokeLinecap="round" fill="none" />
            <circle cx="60%" cy="60%" r="4" fill="#ae3135" />

            {/* 8. BOTTOM LEFT: Real-time Database */}
            <path d="M 32% 87% V 72% H 42%" stroke="#ae3135" strokeWidth="2.5" strokeDasharray="4,4" strokeLinecap="round" fill="none" />
            <circle cx="42%" cy="72%" r="4" fill="#ae3135" />

            {/* 9. BOTTOM RIGHT: Payment Gateways */}
            <path d="M 68% 87% V 72% H 58%" stroke="#ae3135" strokeWidth="2.5" strokeDasharray="4,4" strokeLinecap="round" fill="none" />
            <circle cx="58%" cy="72%" r="4" fill="#ae3135" />
          </svg>

          {/* 🌟 CENTER HUB: MULTI-LAYERED GLOWING CONCENTRIC CIRCLE WITH TECHNOBREN LOGO 🌟 */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center pointer-events-auto">
            
            {/* Outer Concentric Light Ring */}
            <div className="size-36 sm:size-44 rounded-full border border-brand-200/50 bg-gradient-to-br from-brand-50/40 via-white to-rose-50/30 p-2.5 shadow-lg flex items-center justify-center">
              
              {/* Inner Concentric Glow Ring */}
              <div className="size-28 sm:size-34 rounded-full border-2 border-brand-300/60 bg-white p-2 shadow-inner flex items-center justify-center">
                
                {/* Center White Circle Container */}
                <motion.div
                  animate={reduce ? false : { scale: [1, 1.04, 1], boxShadow: ["0 0 12px rgba(174,49,53,0.2)", "0 0 25px rgba(174,49,53,0.4)", "0 0 12px rgba(174,49,53,0.2)"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="size-20 sm:size-24 rounded-full border-2 border-brand-500 bg-white p-2 flex flex-col items-center justify-center text-center shadow-md overflow-hidden"
                >
                  <img
                    src="/brand/technobren-logo.png"
                    alt="TechnoBren Infotech Logo"
                    className="h-5 sm:h-7 w-auto object-contain max-w-[95%]"
                  />
                  <span className="mt-0.5 text-[0.42rem] sm:text-[0.45rem] font-bold text-ink-500 uppercase tracking-widest leading-none">
                    INFOTECH PVT. LTD.
                  </span>
                </motion.div>

              </div>
            </div>
          </div>

          {/* NODE 1: TOP CENTER - Subscriptions & Billing */}
          <div className="absolute top-[2%] left-1/2 -translate-x-1/2 z-20">
            {renderNodeCard(SYSTEM_NODES[0])}
          </div>

          {/* NODE 2: TOP LEFT - Enterprise ERP */}
          <div className="absolute top-[6%] left-[1%] sm:left-[6%] z-20">
            {renderNodeCard(SYSTEM_NODES[1])}
          </div>

          {/* NODE 3: TOP RIGHT - Booking System */}
          <div className="absolute top-[6%] right-[1%] sm:right-[6%] z-20">
            {renderNodeCard(SYSTEM_NODES[2])}
          </div>

          {/* NODE 4: MID LEFT TOP - Mobile Apps */}
          <div className="absolute top-[34%] left-[0%] sm:left-[2%] z-20">
            {renderNodeCard(SYSTEM_NODES[3])}
          </div>

          {/* NODE 5: MID LEFT BOTTOM - Web Portal */}
          <div className="absolute top-[54%] left-[0%] sm:left-[2%] z-20">
            {renderNodeCard(SYSTEM_NODES[4])}
          </div>

          {/* NODE 6: MID RIGHT TOP - AI & Data Pipeline */}
          <div className="absolute top-[34%] right-[0%] sm:right-[2%] z-20">
            {renderNodeCard(SYSTEM_NODES[5])}
          </div>

          {/* NODE 7: MID RIGHT BOTTOM - Cloud & DevOps */}
          <div className="absolute top-[54%] right-[0%] sm:right-[2%] z-20">
            {renderNodeCard(SYSTEM_NODES[6])}
          </div>

          {/* NODE 8: BOTTOM LEFT - Real-time Database */}
          <div className="absolute bottom-[2%] left-[6%] sm:left-[16%] z-20">
            {renderNodeCard(SYSTEM_NODES[7])}
          </div>

          {/* NODE 9: BOTTOM RIGHT - Payment Gateways */}
          <div className="absolute bottom-[2%] right-[6%] sm:right-[16%] z-20">
            {renderNodeCard(SYSTEM_NODES[8])}
          </div>

        </div>

        {/* ---------- EXACT BOTTOM FEATURE BAR MATCHING SCREENSHOT (COMPACT) ---------- */}
        <motion.div
          key={activeNode.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-4xl mx-auto rounded-2xl border border-brand-200/80 bg-gradient-to-r from-rose-50/60 via-white to-brand-50/50 p-3 sm:p-3.5 shadow-md backdrop-blur-md shrink-0"
        >
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            
            {/* Main Active Node Title Box (Left) */}
            <div className="sm:col-span-4 flex items-center gap-3 border-b sm:border-b-0 sm:border-r border-brand-200/60 pb-2 sm:pb-0 sm:pr-3">
              <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 via-brand-600 to-rose-600 text-white shadow-xs">
                <ActiveIcon className="size-4" />
              </span>
              <div>
                <h4 className="font-display text-sm font-extrabold text-ink-950 leading-tight">
                  {activeNode.label}
                </h4>
                <p className="text-[0.68rem] text-ink-500 font-medium truncate max-w-[180px]">
                  {activeNode.subText}
                </p>
              </div>
            </div>

            {/* 4 Feature Badges (Right) */}
            <div className="sm:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-2">
              {activeNode.features.map((feat) => {
                const FeatIcon = feat.icon;
                return (
                  <div key={feat.title} className="flex items-start gap-2">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700 border border-brand-200/60 mt-0.5">
                      <FeatIcon className="size-3" />
                    </span>
                    <div>
                      <h5 className="text-[0.72rem] font-bold text-ink-900 leading-tight">
                        {feat.title}
                      </h5>
                      <p className="text-[0.65rem] text-ink-500 leading-tight mt-0.5 truncate max-w-[110px]">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </motion.div>

      </Container>
    </section>
  );

  // Helper render function for each node card (Compact Fit)
  function renderNodeCard(node: SystemNode) {
    const isActive = activeNodeId === node.id;
    const NodeIcon = node.icon;

    return (
      <button
        type="button"
        onClick={() => setActiveNodeId(node.id)}
        onMouseEnter={() => setActiveNodeId(node.id)}
        className={`flex items-center gap-2.5 rounded-xl border p-2 sm:px-3 sm:py-2 text-left transition-all duration-300 backdrop-blur-md max-w-[210px] sm:max-w-[230px] ${
          isActive
            ? "border-brand-400 bg-white shadow-lg shadow-brand-500/15 ring-2 ring-brand-400/30 scale-105"
            : "border-ink-200/80 bg-white/90 text-ink-900 hover:border-brand-300 hover:shadow-xs"
        }`}
      >
        <span className={`flex size-7 shrink-0 items-center justify-center rounded-lg transition-colors ${isActive ? "bg-brand-600 text-white" : "bg-brand-50 text-brand-700"}`}>
          <NodeIcon className="size-3.5" />
        </span>
        <div className="min-w-0">
          <h4 className="text-[0.72rem] font-bold text-ink-950 truncate leading-tight">
            {node.label}
          </h4>
          <p className="text-[0.62rem] text-ink-500 font-medium truncate mt-0.5">
            {node.subText}
          </p>
        </div>
      </button>
    );
  }
}
