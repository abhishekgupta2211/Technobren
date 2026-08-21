"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";

const NEURAL_NODES = [
  // Top Layer
  { id: "erp", label: "Enterprise ERP", icon: "🏢", desc: "Custom Inventory & Financial Engine" },
  { id: "billing", label: "Subscriptions & Billing", icon: "💳", desc: "Automated Recurring Billing System" },
  { id: "booking", label: "Booking System", icon: "📅", desc: "Resource Allocation & Scheduling" },
  
  // Left Side
  { id: "mobile", label: "Mobile Apps (iOS/Android)", icon: "📱", desc: "React Native & Flutter Native Apps" },
  { id: "web", label: "Web Portal & Marketplace", icon: "🌐", desc: "High-speed Web Applications & APIs" },

  // Right Side
  { id: "ai", label: "AI & Data Pipeline", icon: "🤖", desc: "LLM, Predictive Analytics & Machine Learning" },
  { id: "cloud", label: "Cloud & DevOps (AWS/Azure)", icon: "☁️", desc: "99.99% SLA Uptime Auto-scaling Clusters" },

  // Bottom Layer
  { id: "db", label: "Real-time Database", icon: "🗄️", desc: "Distributed MySQL & MongoDB Sync" },
  { id: "payments", label: "Payment Gateways (Stripe/Razorpay)", icon: "🛡️", desc: "PCI-DSS Compliant Multi-currency Checkout" },
];

export function InteractiveArchitectureDiagram() {
  const reduce = useReducedMotion();
  const [activeNodeId, setActiveNodeId] = useState("erp");

  // Auto animation cycle between neural nodes
  useEffect(() => {
    if (reduce) return;
    const interval = setInterval(() => {
      setActiveNodeId((prev) => {
        const idx = NEURAL_NODES.findIndex((n) => n.id === prev);
        return NEURAL_NODES[(idx + 1) % NEURAL_NODES.length].id;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [reduce]);

  const activeNode = NEURAL_NODES.find((n) => n.id === activeNodeId) || NEURAL_NODES[0];

  return (
    <section className="relative overflow-hidden bg-white text-ink-950 py-16 sm:py-24 border-t border-ink-100">
      <Container size="wide" className="relative">
        
        {/* Clean Center Section Heading */}
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1 text-xs font-semibold text-brand-700">
            <span className="size-2 rounded-full bg-brand-600 animate-ping" />
            Neural Architecture Network
          </span>

          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl lg:text-5xl text-ink-950 tracking-tight leading-tight">
            Interconnected <span className="text-brand-700">System Ecosystem</span>
          </h2>
          
          <p className="mt-3 text-sm sm:text-base text-ink-600 leading-relaxed">
            Point at any system node to see how TechnoBren’s central core engine orchestrates data across your enterprise.
          </p>
        </div>

        {/* ---------- CENTERED NEURAL NETWORK DIAGRAM WITH TECHNOBREN LOGO IN CENTER ---------- */}
        <div className="mt-14 relative max-w-5xl mx-auto min-h-[500px] sm:min-h-[560px] flex items-center justify-center p-4">
          
          {/* Animated Connecting Neural Beams SVG (All lines originate from Center Hub 50% 50%) */}
          <svg className="pointer-events-none absolute inset-0 size-full z-0" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="neuralBeamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ae3135" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#e11d48" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#ae3135" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Neural Lines from Center Hub (50% 50%) to surrounding nodes */}
            <line x1="50%" y1="50%" x2="20%" y2="16%" stroke="url(#neuralBeamGrad)" strokeWidth="2" strokeDasharray="4,4" className="animate-pulse" />
            <line x1="50%" y1="50%" x2="50%" y2="14%" stroke="url(#neuralBeamGrad)" strokeWidth="2" strokeDasharray="4,4" className="animate-pulse" />
            <line x1="50%" y1="50%" x2="80%" y2="16%" stroke="url(#neuralBeamGrad)" strokeWidth="2" strokeDasharray="4,4" className="animate-pulse" />

            <line x1="50%" y1="50%" x2="15%" y2="50%" stroke="url(#neuralBeamGrad)" strokeWidth="2" strokeDasharray="4,4" className="animate-pulse" />
            <line x1="50%" y1="50%" x2="85%" y2="50%" stroke="url(#neuralBeamGrad)" strokeWidth="2" strokeDasharray="4,4" className="animate-pulse" />

            <line x1="50%" y1="50%" x2="25%" y2="84%" stroke="url(#neuralBeamGrad)" strokeWidth="2" strokeDasharray="4,4" className="animate-pulse" />
            <line x1="50%" y1="50%" x2="75%" y2="84%" stroke="url(#neuralBeamGrad)" strokeWidth="2" strokeDasharray="4,4" className="animate-pulse" />
          </svg>

          {/* 🌟 CENTER CORE HUB: REAL TECHNOBREN LOGO & BRANDMARK 🌟 */}
          <motion.div
            animate={reduce ? false : { scale: [1, 1.05, 1], boxShadow: ["0 0 20px rgba(174,49,53,0.3)", "0 0 45px rgba(174,49,53,0.6)", "0 0 20px rgba(174,49,53,0.3)"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer"
          >
            <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-brand-500 bg-white p-5 sm:p-6 shadow-2xl transition-all duration-300 hover:scale-105">
              <img
                src="/brand/technobren-logo.png"
                alt="TechnoBren Infotech Logo"
                className="h-9 sm:h-12 w-auto object-contain"
              />
              <span className="mt-2 text-[0.65rem] font-mono font-bold uppercase tracking-widest text-brand-700">
                Core Neural Hub
              </span>
            </div>
          </motion.div>

          {/* TOP NODES */}
          <div className="absolute top-[8%] left-0 right-0 z-20 flex justify-around px-4">
            {[NEURAL_NODES[0], NEURAL_NODES[1], NEURAL_NODES[2]].map((node) => {
              const isActive = activeNodeId === node.id;
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setActiveNodeId(node.id)}
                  onMouseEnter={() => setActiveNodeId(node.id)}
                  className={`flex items-center gap-2 rounded-2xl border px-3.5 py-2.5 text-xs font-bold transition-all duration-300 shadow-sm ${
                    isActive
                      ? "border-brand-500 bg-brand-600 text-white shadow-md shadow-brand-500/30 scale-105"
                      : "border-ink-200 bg-white text-ink-800 hover:border-brand-300"
                  }`}
                >
                  <span className="text-base">{node.icon}</span>
                  <span className="hidden sm:inline">{node.label}</span>
                </button>
              );
            })}
          </div>

          {/* LEFT SIDE NODES */}
          <div className="absolute left-[3%] top-[45%] z-20 flex flex-col gap-4">
            {[NEURAL_NODES[3], NEURAL_NODES[4]].map((node) => {
              const isActive = activeNodeId === node.id;
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setActiveNodeId(node.id)}
                  onMouseEnter={() => setActiveNodeId(node.id)}
                  className={`flex items-center gap-2 rounded-2xl border px-3.5 py-2.5 text-xs font-bold transition-all duration-300 shadow-sm ${
                    isActive
                      ? "border-brand-500 bg-brand-600 text-white shadow-md shadow-brand-500/30 scale-105"
                      : "border-ink-200 bg-white text-ink-800 hover:border-brand-300"
                  }`}
                >
                  <span className="text-base">{node.icon}</span>
                  <span className="hidden sm:inline">{node.label}</span>
                </button>
              );
            })}
          </div>

          {/* RIGHT SIDE NODES */}
          <div className="absolute right-[3%] top-[45%] z-20 flex flex-col gap-4">
            {[NEURAL_NODES[5], NEURAL_NODES[6]].map((node) => {
              const isActive = activeNodeId === node.id;
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setActiveNodeId(node.id)}
                  onMouseEnter={() => setActiveNodeId(node.id)}
                  className={`flex items-center gap-2 rounded-2xl border px-3.5 py-2.5 text-xs font-bold transition-all duration-300 shadow-sm ${
                    isActive
                      ? "border-brand-500 bg-brand-600 text-white shadow-md shadow-brand-500/30 scale-105"
                      : "border-ink-200 bg-white text-ink-800 hover:border-brand-300"
                  }`}
                >
                  <span className="text-base">{node.icon}</span>
                  <span className="hidden sm:inline">{node.label}</span>
                </button>
              );
            })}
          </div>

          {/* BOTTOM NODES */}
          <div className="absolute bottom-[8%] left-0 right-0 z-20 flex justify-around px-8">
            {[NEURAL_NODES[7], NEURAL_NODES[8]].map((node) => {
              const isActive = activeNodeId === node.id;
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setActiveNodeId(node.id)}
                  onMouseEnter={() => setActiveNodeId(node.id)}
                  className={`flex items-center gap-2 rounded-2xl border px-3.5 py-2.5 text-xs font-bold transition-all duration-300 shadow-sm ${
                    isActive
                      ? "border-brand-500 bg-brand-600 text-white shadow-md shadow-brand-500/30 scale-105"
                      : "border-ink-200 bg-white text-ink-800 hover:border-brand-300"
                  }`}
                >
                  <span className="text-base">{node.icon}</span>
                  <span className="hidden sm:inline">{node.label}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* ---------- ACTIVE NODE FLOATING INFO CARD ---------- */}
        <motion.div
          key={activeNode.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-8 max-w-xl mx-auto rounded-3xl border border-brand-200 bg-gradient-to-r from-brand-50 via-white to-brand-50/60 p-5 shadow-lg text-center"
        >
          <div className="flex items-center justify-center gap-2">
            <span className="text-xl">{activeNode.icon}</span>
            <h4 className="font-display text-base font-extrabold text-ink-950">
              {activeNode.label}
            </h4>
          </div>
          <p className="mt-1.5 text-xs text-ink-600 font-medium">
            {activeNode.desc}
          </p>
        </motion.div>

      </Container>
    </section>
  );
}
