"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

interface SystemNode {
  id: string;
  label: string;
  subLabel?: string;
  type?: "group" | "single" | "hub" | "icons";
  icons?: string[];
}

export function InteractiveArchitectureDiagram() {
  const reduce = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  // Auto animation cycle between nodes
  useEffect(() => {
    if (reduce) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5);
    }, 3500);
    return () => clearInterval(interval);
  }, [reduce]);

  return (
    <section className="relative overflow-hidden bg-[#090507] text-white py-20 sm:py-28">
      {/* Background Subtle Red Dot Matrix */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ae3135_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-15"
      />

      <Container size="wide" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading & Description matching Screenshot 2 */}
          <div className="lg:col-span-5 space-y-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-3.5 py-1 backdrop-blur-md">
                <span className="size-2 rounded-full bg-brand-500 animate-ping" />
                <span className="font-mono text-xs font-bold text-brand-200 tracking-wider">
                  Seamless System Integration
                </span>
              </div>
            </Reveal>

            <Reveal delay={1}>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.15] tracking-tight">
                Connect to existing systems.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-rose-200 to-white">
                  Orchestrate data &amp; workflows.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={2}>
              <p className="text-base sm:text-lg text-brand-100/80 leading-relaxed">
                Connect your legacy ERPs, mobile applications, billing engines, and AI pipelines through TechnoBren’s high-speed API orchestrator with pre-built enterprise connectors.
              </p>
            </Reveal>

            {/* Interactive Step Features */}
            <Reveal delay={3}>
              <div className="space-y-3 pt-4 border-t border-brand-900/40">
                {[
                  { title: "ERP & Legacy Billing", desc: "Automated real-time inventory & invoice sync" },
                  { title: "Mobile & Web Interfaces", desc: "Native iOS/Android & React Web App connectors" },
                  { title: "AI & Event Destinations", desc: "Real-time stream analytics & machine learning pipelines" },
                ].map((item, i) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setActiveStep(i)}
                    className={`w-full flex items-start gap-3 rounded-2xl border p-3 text-left transition-all duration-300 ${
                      activeStep === i
                        ? "border-brand-500 bg-brand-500/15 text-white shadow-md ring-1 ring-brand-400/30"
                        : "border-transparent bg-brand-950/20 text-brand-200/70 hover:bg-brand-900/20"
                    }`}
                  >
                    <span className={`flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold mt-0.5 ${activeStep === i ? "bg-brand-500 text-white" : "bg-brand-950 text-brand-300"}`}>
                      {i + 1}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-white">{item.title}</h4>
                      <p className="text-[0.72rem] text-brand-200/80">{item.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right Column: Exact Architecture Tree Node Diagram (Stripe Style) matching Screenshot 2 */}
          <div className="lg:col-span-7 relative flex items-center justify-center min-h-[460px] sm:min-h-[500px]">
            {/* SVG Connector Dashed Lines */}
            <svg className="pointer-events-none absolute inset-0 size-full z-0" xmlns="http://www.w3.org/2000/svg">
              {/* Top Group to Center Hub */}
              <path d="M 50% 22% L 50% 48%" stroke="#ae3135" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.6" />
              <path d="M 40% 34% L 50% 48%" stroke="#ae3135" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.6" />
              <path d="M 62% 34% L 50% 48%" stroke="#ae3135" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.6" />

              {/* Left Marketplace to Center Hub */}
              <path d="M 28% 54% L 50% 54%" stroke="#ae3135" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.6" />
              <path d="M 18% 54% L 32% 54%" stroke="#ae3135" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.4" />

              {/* Right Data Pipeline & Azure to Center Hub */}
              <path d="M 50% 54% L 68% 54%" stroke="#ae3135" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.6" />
              <path d="M 68% 54% L 84% 54%" stroke="#ae3135" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.4" />

              {/* Center Hub to Bottom Orchestration */}
              <path d="M 50% 60% L 50% 74%" stroke="#ae3135" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.6" />
              <path d="M 50% 80% L 44% 88%" stroke="#ae3135" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.5" />
              <path d="M 50% 80% L 54% 88%" stroke="#ae3135" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.5" />
            </svg>

            {/* Nodes Grid Container */}
            <div className="relative z-10 size-full flex flex-col items-center justify-between py-2 space-y-6">
              
              {/* TOP ROW: ERP | Subscriptions | Legacy billing | Booking system */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 rounded-2xl border border-brand-500/25 bg-brand-950/40 p-2 backdrop-blur-md">
                <span className="rounded-xl border border-brand-500/30 bg-brand-600/30 px-3 py-1.5 font-mono text-[0.72rem] font-bold text-white shadow-xs">
                  ERP Systems
                </span>
                <span className="rounded-xl border border-brand-500/30 bg-brand-600/30 px-3 py-1.5 font-mono text-[0.72rem] font-bold text-white shadow-xs">
                  Subscriptions
                </span>
                <span className="rounded-xl border border-brand-500/30 bg-brand-600/30 px-3 py-1.5 font-mono text-[0.72rem] font-bold text-white shadow-xs">
                  Legacy Billing
                </span>
                <span className="rounded-xl border border-brand-500/30 bg-brand-600/30 px-3 py-1.5 font-mono text-[0.72rem] font-bold text-white shadow-xs">
                  Booking Engine
                </span>
              </div>

              {/* SECOND ROW: SDK & Event Destinations */}
              <div className="w-full flex items-center justify-between px-8 sm:px-16">
                <span className="rounded-xl border border-brand-400/40 bg-brand-600/60 px-3.5 py-1.5 font-mono text-xs font-bold text-white shadow-md">
                  REST SDK
                </span>
                <span className="rounded-xl border border-brand-400/40 bg-brand-600/60 px-3.5 py-1.5 font-mono text-xs font-bold text-white shadow-md">
                  Event Destinations
                </span>
              </div>

              {/* CENTER ROW: App Marketplace Grid | TECHNOBREN HUB | Data Pipeline | Azure Icon */}
              <div className="w-full flex items-center justify-between gap-2 px-2 sm:px-6">
                {/* App Marketplace Icons Mini Box */}
                <div className="hidden sm:flex flex-col gap-1 rounded-xl border border-brand-500/30 bg-brand-950/50 p-2">
                  <div className="grid grid-cols-3 gap-1">
                    <span className="flex size-6 items-center justify-center rounded-lg bg-black/60 font-bold text-[0.6rem] text-white">⚛️</span>
                    <span className="flex size-6 items-center justify-center rounded-lg bg-brand-900/80 font-bold text-[0.6rem] text-white">🟢</span>
                    <span className="flex size-6 items-center justify-center rounded-lg bg-brand-800/80 font-bold text-[0.6rem] text-white">📱</span>
                    <span className="flex size-6 items-center justify-center rounded-lg bg-brand-700/80 font-bold text-[0.6rem] text-white">🐍</span>
                    <span className="flex size-6 items-center justify-center rounded-lg bg-black/60 font-bold text-[0.6rem] text-white">🔷</span>
                    <span className="flex size-6 items-center justify-center rounded-lg bg-brand-900/80 font-bold text-[0.6rem] text-white">🔴</span>
                  </div>
                </div>

                <span className="rounded-xl border border-brand-400/50 bg-brand-600/80 px-3.5 py-2 font-mono text-xs font-bold text-white shadow-lg">
                  App Marketplace ↗
                </span>

                {/* MAIN CENTER HUB: TechnoBren Core */}
                <motion.div
                  animate={reduce ? false : { scale: [1, 1.04, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="rounded-2xl border-2 border-brand-400 bg-gradient-to-br from-brand-500 via-brand-700 to-brand-950 px-6 py-4 text-center font-display text-base font-extrabold text-white shadow-[0_0_30px_rgba(174,49,53,0.6)]"
                >
                  technobren
                  <span className="block text-[0.6rem] font-mono text-brand-200 uppercase font-medium">
                    Core Engine
                  </span>
                </motion.div>

                <span className="rounded-xl border border-brand-400/50 bg-brand-600/80 px-3.5 py-2 font-mono text-xs font-bold text-white shadow-lg">
                  Data Pipeline
                </span>

                {/* Cloud Azure/AWS Single Icon Badge */}
                <span className="hidden sm:flex size-9 items-center justify-center rounded-xl border border-brand-400/40 bg-white font-extrabold text-sm text-brand-950 shadow-md">
                  ☁️
                </span>
              </div>

              {/* BOTTOM ROW: Orchestration -> PSP / Gateways */}
              <div className="flex flex-col items-center gap-2">
                <span className="rounded-xl border border-brand-400/50 bg-brand-600 px-4 py-1.5 font-mono text-xs font-bold text-white shadow-md">
                  API Orchestration
                </span>
                <div className="flex items-center gap-3">
                  <span className="rounded-lg border border-brand-500/30 bg-brand-950/70 px-3 py-1 font-mono text-[0.68rem] font-bold text-brand-200">
                    Stripe PSP
                  </span>
                  <span className="rounded-lg border border-brand-500/30 bg-brand-950/70 px-3 py-1 font-mono text-[0.68rem] font-bold text-brand-200">
                    Razorpay
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
