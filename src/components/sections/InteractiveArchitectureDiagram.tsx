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
    <section className="relative overflow-hidden bg-white text-ink-950 pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 border-t border-ink-100">
      <Container size="wide" className="relative">
        
        {/* Clean Center Section Heading */}
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1 text-xs font-semibold text-brand-700">
            <span className="size-2 rounded-full bg-brand-600 animate-ping" />
            Neural Architecture Network
          </span>

          <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl lg:text-5xl text-ink-950 tracking-tight leading-tight">
            Interconnected <span className="text-brand-700">System Ecosystem</span>
          </h2>
          
          <p className="mt-2 text-sm sm:text-base text-ink-600 leading-relaxed">
            Point at any system node to see how TechnoBren’s central core engine orchestrates data across your enterprise.
          </p>
        </div>

        {/* ---------- CENTERED NEURAL NETWORK DIAGRAM WITH CIRCULAR TECHNOBREN LOGO HUB ---------- */}
        <div className="mt-10 relative max-w-5xl mx-auto min-h-[460px] sm:min-h-[500px] flex items-center justify-center p-4">
          
          {/* Curved Animated Connecting Neural Beams SVG */}
          <svg className="pointer-events-none absolute inset-0 size-full z-0" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="neuralBeamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ae3135" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#e11d48" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#ae3135" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {/* Organic Curved Neural Path Connections */}
            <path d="M 50% 50% Q 35% 30% 22% 16%" stroke="url(#neuralBeamGrad)" strokeWidth="2" strokeDasharray="4,4" fill="none" className="animate-pulse" />
            <path d="M 50% 50% Q 50% 32% 50% 14%" stroke="url(#neuralBeamGrad)" strokeWidth="2" strokeDasharray="4,4" fill="none" className="animate-pulse" />
            <path d="M 50% 50% Q 65% 30% 78% 16%" stroke="url(#neuralBeamGrad)" strokeWidth="2" strokeDasharray="4,4" fill="none" className="animate-pulse" />

            <path d="M 50% 50% Q 30% 46% 16% 44%" stroke="url(#neuralBeamGrad)" strokeWidth="2" strokeDasharray="4,4" fill="none" className="animate-pulse" />
            <path d="M 50% 50% Q 30% 54% 16% 58%" stroke="url(#neuralBeamGrad)" strokeWidth="2" strokeDasharray="4,4" fill="none" className="animate-pulse" />

            <path d="M 50% 50% Q 70% 46% 84% 44%" stroke="url(#neuralBeamGrad)" strokeWidth="2" strokeDasharray="4,4" fill="none" className="animate-pulse" />
            <path d="M 50% 50% Q 70% 54% 84% 58%" stroke="url(#neuralBeamGrad)" strokeWidth="2" strokeDasharray="4,4" fill="none" className="animate-pulse" />

            <path d="M 50% 50% Q 38% 70% 30% 84%" stroke="url(#neuralBeamGrad)" strokeWidth="2" strokeDasharray="4,4" fill="none" className="animate-pulse" />
            <path d="M 50% 50% Q 62% 70% 70% 84%" stroke="url(#neuralBeamGrad)" strokeWidth="2" strokeDasharray="4,4" fill="none" className="animate-pulse" />
          </svg>

          {/* 🌟 CENTER CORE HUB: PURE TECHNOBREN LOGO CIRCLE (NO TEXT) 🌟 */}
          <motion.div
            animate={reduce ? false : { scale: [1, 1.06, 1], boxShadow: ["0 0 15px rgba(174,49,53,0.3)", "0 0 40px rgba(174,49,53,0.65)", "0 0 15px rgba(174,49,53,0.3)"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer rounded-full overflow-hidden"
          >
            <div className="flex items-center justify-center size-24 sm:size-28 rounded-full border-3 border-brand-500 bg-white p-2.5 shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
              <img
                src="/brand/technobren-logo.png"
                alt="TechnoBren Infotech Logo"
                className="h-8 sm:h-11 w-auto object-contain max-w-[90%]"
              />
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
                  className={`flex items-center gap-2 rounded-2xl border px-3.5 py-2.5 text-xs font-bold transition-all duration-300 shadow-xs ${
                    isActive
                      ? "border-brand-500 bg-brand-50/90 text-brand-950 shadow-md ring-2 ring-brand-400/30 scale-105"
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
          <div className="absolute left-[2%] top-[38%] z-20 flex flex-col gap-3">
            {[NEURAL_NODES[3], NEURAL_NODES[4]].map((node) => {
              const isActive = activeNodeId === node.id;
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setActiveNodeId(node.id)}
                  onMouseEnter={() => setActiveNodeId(node.id)}
                  className={`flex items-center gap-2 rounded-2xl border px-3.5 py-2.5 text-xs font-bold transition-all duration-300 shadow-xs ${
                    isActive
                      ? "border-brand-500 bg-brand-50/90 text-brand-950 shadow-md ring-2 ring-brand-400/30 scale-105"
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
          <div className="absolute right-[2%] top-[38%] z-20 flex flex-col gap-3">
            {[NEURAL_NODES[5], NEURAL_NODES[6]].map((node) => {
              const isActive = activeNodeId === node.id;
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setActiveNodeId(node.id)}
                  onMouseEnter={() => setActiveNodeId(node.id)}
                  className={`flex items-center gap-2 rounded-2xl border px-3.5 py-2.5 text-xs font-bold transition-all duration-300 shadow-xs ${
                    isActive
                      ? "border-brand-500 bg-brand-50/90 text-brand-950 shadow-md ring-2 ring-brand-400/30 scale-105"
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
                  className={`flex items-center gap-2 rounded-2xl border px-3.5 py-2.5 text-xs font-bold transition-all duration-300 shadow-xs ${
                    isActive
                      ? "border-brand-500 bg-brand-50/90 text-brand-950 shadow-md ring-2 ring-brand-400/30 scale-105"
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

        {/* ---------- ACTIVE NODE COMPACT INFO CARD ---------- */}
        <motion.div
          key={activeNode.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6 max-w-lg mx-auto rounded-2xl border border-brand-200 bg-gradient-to-r from-brand-50 via-white to-brand-50/60 p-4 shadow-md text-center"
        >
          <div className="flex items-center justify-center gap-2">
            <span className="text-lg">{activeNode.icon}</span>
            <h4 className="font-display text-sm font-extrabold text-ink-950">
              {activeNode.label}
            </h4>
          </div>
          <p className="mt-1 text-xs text-ink-600 font-medium">
            {activeNode.desc}
          </p>
        </motion.div>

      </Container>
    </section>
  );
}
