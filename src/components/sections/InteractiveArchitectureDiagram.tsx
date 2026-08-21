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
    <section className="relative overflow-hidden bg-white text-ink-950 pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-24 border-t border-ink-100">
      <Container size="wide" className="relative">
        
        {/* Section Header Matching Screenshot Exactly */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand-700 shadow-2xs">
            <span className="flex size-4 items-center justify-center rounded-full bg-brand-600 text-white text-[0.6rem] font-bold">
              ☸
            </span>
            <span>Neural Architecture Network</span>
          </div>

          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl lg:text-5xl text-ink-950 tracking-tight leading-tight">
            Interconnected <br />
            <span className="text-brand-700">System Ecosystem</span>
          </h2>
          
          <p className="mt-3 text-sm sm:text-base text-ink-500 font-medium leading-relaxed max-w-2xl mx-auto">
            Point at any system node to see how TechnoBren’s central core engine orchestrates data across your enterprise.
          </p>
        </div>

        {/* ---------- EXACT DIAGRAM NETWORK NODE CANVAS MATCHING SCREENSHOT ---------- */}
        <div className="mt-12 relative max-w-6xl mx-auto min-h-[520px] sm:min-h-[560px] flex items-center justify-center p-2 sm:p-6">
          
          {/* Animated Connecting Right-Angle & Curved Neural Lines SVG */}
          <svg className="pointer-events-none absolute inset-0 size-full z-0" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="dottedLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ae3135" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Neural Dotted Orthogonal Connectors to Center Ring */}
            {/* Top Node */}
            <path d="M 50% 50% L 50% 17%" stroke="url(#dottedLineGrad)" strokeWidth="1.8" strokeDasharray="3,3" fill="none" />
            {/* Top Left Node */}
            <path d="M 50% 50% Q 34% 34% 28% 18%" stroke="url(#dottedLineGrad)" strokeWidth="1.8" strokeDasharray="3,3" fill="none" />
            {/* Top Right Node */}
            <path d="M 50% 50% Q 66% 34% 72% 18%" stroke="url(#dottedLineGrad)" strokeWidth="1.8" strokeDasharray="3,3" fill="none" />

            {/* Mid Left Nodes */}
            <path d="M 50% 50% H 24% V 42%" stroke="url(#dottedLineGrad)" strokeWidth="1.8" strokeDasharray="3,3" fill="none" />
            <path d="M 50% 50% H 24% V 58%" stroke="url(#dottedLineGrad)" strokeWidth="1.8" strokeDasharray="3,3" fill="none" />

            {/* Mid Right Nodes */}
            <path d="M 50% 50% H 76% V 42%" stroke="url(#dottedLineGrad)" strokeWidth="1.8" strokeDasharray="3,3" fill="none" />
            <path d="M 50% 50% H 76% V 58%" stroke="url(#dottedLineGrad)" strokeWidth="1.8" strokeDasharray="3,3" fill="none" />

            {/* Bottom Left & Right Nodes */}
            <path d="M 50% 50% Q 38% 68% 34% 82%" stroke="url(#dottedLineGrad)" strokeWidth="1.8" strokeDasharray="3,3" fill="none" />
            <path d="M 50% 50% Q 62% 68% 66% 82%" stroke="url(#dottedLineGrad)" strokeWidth="1.8" strokeDasharray="3,3" fill="none" />
          </svg>

          {/* 🌟 CENTER HUB: MULTI-LAYERED GLOWING CONCENTRIC CIRCLE WITH TECHNOBREN LOGO 🌟 */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center pointer-events-auto">
            
            {/* Outer Concentric Light Ring */}
            <div className="size-48 sm:size-56 rounded-full border border-brand-200/50 bg-gradient-to-br from-brand-50/40 via-white to-rose-50/30 p-4 shadow-xl flex items-center justify-center">
              
              {/* Inner Concentric Glow Ring */}
              <div className="size-36 sm:size-44 rounded-full border-2 border-brand-300/60 bg-white p-3 shadow-inner flex items-center justify-center">
                
                {/* Center White Circle Container */}
                <motion.div
                  animate={reduce ? false : { scale: [1, 1.05, 1], boxShadow: ["0 0 15px rgba(174,49,53,0.2)", "0 0 30px rgba(174,49,53,0.4)", "0 0 15px rgba(174,49,53,0.2)"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="size-28 sm:size-32 rounded-full border-2 border-brand-500 bg-white p-3 flex flex-col items-center justify-center text-center shadow-lg overflow-hidden"
                >
                  <img
                    src="/brand/technobren-logo.png"
                    alt="TechnoBren Infotech Logo"
                    className="h-7 sm:h-9 w-auto object-contain max-w-[95%]"
                  />
                  <span className="mt-1 text-[0.48rem] sm:text-[0.52rem] font-bold text-ink-500 uppercase tracking-widest leading-none">
                    INFOTECH PVT. LTD.
                  </span>
                </motion.div>

              </div>
            </div>
          </div>

          {/* NODE 1: TOP CENTER - Subscriptions & Billing */}
          <div className="absolute top-[3%] left-1/2 -translate-x-1/2 z-20">
            {renderNodeCard(SYSTEM_NODES[0])}
          </div>

          {/* NODE 2: TOP LEFT - Enterprise ERP */}
          <div className="absolute top-[8%] left-[2%] sm:left-[8%] z-20">
            {renderNodeCard(SYSTEM_NODES[1])}
          </div>

          {/* NODE 3: TOP RIGHT - Booking System */}
          <div className="absolute top-[8%] right-[2%] sm:right-[8%] z-20">
            {renderNodeCard(SYSTEM_NODES[2])}
          </div>

          {/* NODE 4: MID LEFT TOP - Mobile Apps */}
          <div className="absolute top-[34%] left-[0%] sm:left-[3%] z-20">
            {renderNodeCard(SYSTEM_NODES[3])}
          </div>

          {/* NODE 5: MID LEFT BOTTOM - Web Portal */}
          <div className="absolute top-[52%] left-[0%] sm:left-[3%] z-20">
            {renderNodeCard(SYSTEM_NODES[4])}
          </div>

          {/* NODE 6: MID RIGHT TOP - AI & Data Pipeline */}
          <div className="absolute top-[34%] right-[0%] sm:right-[3%] z-20">
            {renderNodeCard(SYSTEM_NODES[5])}
          </div>

          {/* NODE 7: MID RIGHT BOTTOM - Cloud & DevOps */}
          <div className="absolute top-[52%] right-[0%] sm:right-[3%] z-20">
            {renderNodeCard(SYSTEM_NODES[6])}
          </div>

          {/* NODE 8: BOTTOM LEFT - Real-time Database */}
          <div className="absolute bottom-[4%] left-[8%] sm:left-[18%] z-20">
            {renderNodeCard(SYSTEM_NODES[7])}
          </div>

          {/* NODE 9: BOTTOM RIGHT - Payment Gateways */}
          <div className="absolute bottom-[4%] right-[8%] sm:right-[18%] z-20">
            {renderNodeCard(SYSTEM_NODES[8])}
          </div>

        </div>

        {/* ---------- EXACT BOTTOM FEATURE BAR MATCHING SCREENSHOT ---------- */}
        <motion.div
          key={activeNode.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mt-6 max-w-5xl mx-auto rounded-3xl border border-brand-200/80 bg-gradient-to-r from-rose-50/60 via-white to-brand-50/50 p-4 sm:p-5 shadow-lg backdrop-blur-md"
        >
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            
            {/* Main Active Node Title Box (Left) */}
            <div className="sm:col-span-4 flex items-center gap-3.5 border-b sm:border-b-0 sm:border-r border-brand-200/60 pb-3 sm:pb-0 sm:pr-4">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 via-brand-600 to-rose-600 text-white shadow-md shadow-brand-500/25">
                <ActiveIcon className="size-5" />
              </span>
              <div>
                <h4 className="font-display text-base font-extrabold text-ink-950">
                  {activeNode.label}
                </h4>
                <p className="text-xs text-ink-500 font-medium truncate max-w-[200px]">
                  {activeNode.subText}
                </p>
              </div>
            </div>

            {/* 4 Feature Badges (Right) */}
            <div className="sm:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {activeNode.features.map((feat) => {
                const FeatIcon = feat.icon;
                return (
                  <div key={feat.title} className="flex items-start gap-2.5">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 border border-brand-200/60 mt-0.5">
                      <FeatIcon className="size-3.5" />
                    </span>
                    <div>
                      <h5 className="text-xs font-bold text-ink-900 leading-tight">
                        {feat.title}
                      </h5>
                      <p className="text-[0.7rem] text-ink-500 leading-snug mt-0.5">
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

  // Helper render function for each node card matching Screenshot
  function renderNodeCard(node: SystemNode) {
    const isActive = activeNodeId === node.id;
    const NodeIcon = node.icon;

    return (
      <button
        type="button"
        onClick={() => setActiveNodeId(node.id)}
        onMouseEnter={() => setActiveNodeId(node.id)}
        className={`flex items-center gap-3 rounded-2xl border p-2.5 sm:px-4 sm:py-3 text-left transition-all duration-300 backdrop-blur-md max-w-[260px] sm:max-w-[280px] ${
          isActive
            ? "border-brand-400 bg-white shadow-xl shadow-brand-500/15 ring-2 ring-brand-400/40 scale-105"
            : "border-ink-200/80 bg-white/90 text-ink-900 hover:border-brand-300 hover:shadow-md"
        }`}
      >
        <span className={`flex size-9 shrink-0 items-center justify-center rounded-xl transition-colors ${isActive ? "bg-brand-600 text-white" : "bg-brand-50 text-brand-700"}`}>
          <NodeIcon className="size-4" />
        </span>
        <div className="min-w-0">
          <h4 className="text-xs font-bold text-ink-950 truncate">
            {node.label}
          </h4>
          <p className="text-[0.68rem] text-ink-500 font-medium truncate mt-0.5">
            {node.subText}
          </p>
        </div>
      </button>
    );
  }
}
