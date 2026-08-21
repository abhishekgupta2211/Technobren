"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  Cpu,
  Layers,
  Database,
  Smartphone,
  CreditCard,
  Bot,
  Cloud,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

interface NodeItem {
  id: string;
  label: string;
  category: string;
  icon: any;
  desc: string;
  x: string; // Tailwind responsive positioning or relative placement
  y: string;
}

const NODES: NodeItem[] = [
  // Top Layer: Enterprise Applications
  {
    id: "erp",
    label: "Enterprise ERP & CRM",
    category: "Applications",
    icon: Layers,
    desc: "Custom inventory, sales, HR & financial management engines.",
    x: "left-[5%] top-[10%]",
    y: "",
  },
  {
    id: "subscriptions",
    label: "Subscription & Billing",
    category: "Applications",
    icon: CreditCard,
    desc: "Automated recurring billing, invoicing & license management.",
    x: "left-[32%] top-[8%]",
    y: "",
  },
  {
    id: "booking",
    label: "Booking & Scheduling",
    category: "Applications",
    icon: Cpu,
    desc: "Real-time resource allocation and automated appointment engine.",
    x: "right-[5%] top-[10%]",
    y: "",
  },

  // Middle Layer: Core Integration Hub (Center)
  {
    id: "hub",
    label: "TechnoBren Core Engine",
    category: "Central Integration Hub",
    icon: Cpu,
    desc: "High-speed API Orchestrator processing millions of transactions.",
    x: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
    y: "",
  },

  // Side Nodes: Mobile & Connectors
  {
    id: "mobile",
    label: "Mobile Apps (iOS/Android)",
    category: "Client Interfaces",
    icon: Smartphone,
    desc: "Cross-platform React Native & Flutter native applications.",
    x: "left-[4%] top-[48%]",
    y: "",
  },
  {
    id: "ai",
    label: "AI & ML Data Pipeline",
    category: "Intelligence",
    icon: Bot,
    desc: "Predictive analytics, automated workflows & LLM processing.",
    x: "right-[4%] top-[48%]",
    y: "",
  },

  // Bottom Layer: Cloud & Payment Infrastructure
  {
    id: "cloud",
    label: "Cloud & DevOps (AWS/Azure)",
    category: "Infrastructure",
    icon: Cloud,
    desc: "Auto-scaling clusters with 99.99% high availability SLA.",
    x: "left-[12%] bottom-[10%]",
    y: "",
  },
  {
    id: "db",
    label: "Real-time Database Sync",
    category: "Storage",
    icon: Database,
    desc: "Low-latency distributed MySQL, MongoDB & Redis clusters.",
    x: "left-[42%] bottom-[8%]",
    y: "",
  },
  {
    id: "payments",
    label: "Payment Gateways",
    category: "Fintech",
    icon: ShieldCheck,
    desc: "PCI-DSS compliant multi-currency Stripe & Razorpay connectors.",
    x: "right-[12%] bottom-[10%]",
    y: "",
  },
];

export function InteractiveArchitectureDiagram() {
  const reduce = useReducedMotion();
  const [activeNode, setActiveNode] = useState<NodeItem>(NODES[3]); // Default to Center Hub

  return (
    <section className="relative overflow-hidden border-t border-ink-100 bg-[#0c0608] text-white py-16 sm:py-24">
      {/* Background Grid Pattern & Red Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ae3135_1px,transparent_1px)] [background-size:24px_24px] opacity-15"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[36rem] rounded-full bg-brand-600/15 blur-3xl"
      />

      <Container size="wide" className="relative z-10">
        <SectionHeading
          eyebrow="Interactive Ecosystem"
          title={
            <span className="text-white">
              TechnoBren Core <span className="text-brand-400">Integration Architecture</span>
            </span>
          }
          description="How our software solutions seamlessly interconnect your enterprise applications, mobile interfaces, cloud infrastructure, and AI pipelines in real time."
        />

        {/* ---------- Interactive Node Network Screen ---------- */}
        <div className="mt-12 relative min-h-[500px] sm:min-h-[560px] rounded-3xl border border-brand-500/30 bg-gradient-to-b from-[#140a0c]/90 via-[#0a0405]/95 to-[#060203] p-6 shadow-2xl overflow-hidden backdrop-blur-md">
          {/* Animated Connecting Vector Beams SVG */}
          <svg
            className="pointer-events-none absolute inset-0 size-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ae3135" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#f43f5e" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#ae3135" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Connecting lines from center to outer nodes */}
            <line x1="50%" y1="50%" x2="20%" y2="20%" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="5,5" className="animate-pulse" />
            <line x1="50%" y1="50%" x2="45%" y2="18%" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="5,5" />
            <line x1="50%" y1="50%" x2="80%" y2="20%" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="5,5" className="animate-pulse" />
            
            <line x1="50%" y1="50%" x2="18%" y2="50%" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="5,5" />
            <line x1="50%" y1="50%" x2="82%" y2="50%" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="5,5" />

            <line x1="50%" y1="50%" x2="25%" y2="82%" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="5,5" />
            <line x1="50%" y1="50%" x2="50%" y2="84%" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="5,5" className="animate-pulse" />
            <line x1="50%" y1="50%" x2="75%" y2="82%" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="5,5" />
          </svg>

          {/* Render Interactive Nodes */}
          <div className="relative size-full min-h-[480px] sm:min-h-[520px]">
            {/* Center Core Node */}
            <motion.div
              animate={reduce ? false : { scale: [1, 1.03, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer"
              onClick={() => setActiveNode(NODES[3])}
            >
              <div className="group relative flex flex-col items-center justify-center rounded-3xl border-2 border-brand-500 bg-gradient-to-br from-brand-600 via-brand-800 to-ink-950 px-6 py-5 text-center text-white shadow-[0_0_35px_rgba(174,49,53,0.5)] transition-all hover:scale-105">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md">
                  <Cpu className="size-6 text-brand-200 animate-spin" style={{ animationDuration: "12s" }} />
                </div>
                <span className="mt-2.5 font-display text-sm font-extrabold tracking-wide">
                  TechnoBren Engine
                </span>
                <span className="text-[0.65rem] font-mono text-brand-200 uppercase tracking-widest mt-0.5">
                  Core Architecture
                </span>
              </div>
            </motion.div>

            {/* Surrounding Nodes (Desktop / Tablet Layout) */}
            <div className="hidden sm:block">
              {NODES.filter((n) => n.id !== "hub").map((node) => {
                const isActive = activeNode.id === node.id;
                const NodeIcon = node.icon;

                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => setActiveNode(node)}
                    onMouseEnter={() => setActiveNode(node)}
                    className={`absolute ${node.x} z-20 flex items-center gap-2.5 rounded-2xl border px-4 py-2.5 text-left transition-all duration-300 ${
                      isActive
                        ? "border-brand-400 bg-brand-500/25 text-white shadow-[0_0_20px_rgba(174,49,53,0.4)] scale-105 ring-2 ring-brand-400/40"
                        : "border-brand-500/30 bg-[#160c0f]/80 text-brand-100 hover:border-brand-400/60 hover:bg-brand-950/40"
                    }`}
                  >
                    <span className={`flex size-8 shrink-0 items-center justify-center rounded-xl ${isActive ? "bg-brand-500 text-white" : "bg-brand-950 text-brand-300"}`}>
                      <NodeIcon className="size-4" />
                    </span>
                    <div>
                      <span className="block text-xs font-bold truncate max-w-[140px]">
                        {node.label}
                      </span>
                      <span className="block text-[0.65rem] font-mono text-brand-300/80 uppercase">
                        {node.category}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Mobile Touch Grid fallback */}
            <div className="grid grid-cols-2 gap-2 sm:hidden pt-2 z-20 relative">
              {NODES.filter((n) => n.id !== "hub").map((node) => {
                const isActive = activeNode.id === node.id;
                const NodeIcon = node.icon;
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => setActiveNode(node)}
                    className={`flex items-center gap-2 rounded-xl border p-2 text-left text-xs ${
                      isActive ? "border-brand-400 bg-brand-500/25 text-white" : "border-brand-500/30 bg-[#160c0f] text-brand-200"
                    }`}
                  >
                    <NodeIcon className="size-3.5 shrink-0 text-brand-400" />
                    <span className="truncate">{node.label.split(" ")[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Node Detail Card Overlay */}
          <motion.div
            key={activeNode.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-md z-40 rounded-2xl border border-brand-400/40 bg-gradient-to-r from-brand-950/95 via-[#180a0d]/95 to-ink-950/95 p-4 sm:p-5 backdrop-blur-xl shadow-2xl"
          >
            <div className="flex items-center gap-2.5">
              <span className="flex size-7 items-center justify-center rounded-lg bg-brand-500/30 text-brand-300">
                <CheckCircle2 className="size-4 text-emerald-400" />
              </span>
              <div>
                <h4 className="font-display text-sm font-bold text-white">
                  {activeNode.label}
                </h4>
                <span className="text-[0.68rem] font-mono text-brand-300 font-medium">
                  Category: {activeNode.category}
                </span>
              </div>
            </div>
            <p className="mt-2.5 text-xs text-brand-100/90 leading-relaxed">
              {activeNode.desc}
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
