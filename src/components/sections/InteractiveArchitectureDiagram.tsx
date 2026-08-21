"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";

// Exact Stripe Architecture node steps data in TechnoBren Brand Red Theme
const ARCH_STEPS = [
  {
    id: 0,
    heading: "Connect to existing systems.",
    subHeading:
      "Orchestrate payments, ERPs, and legacy billing across multiple processors and custom API workflows.",
    activeTop: "Subscriptions",
    activeSub: "SDK",
    leftAppIcons: [
      { logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg", name: "Slack" },
      { logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg", name: "Jira" },
      { logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg", name: "Postman" },
      { logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/trello/trello-plain.svg", name: "Trello" },
    ],
    rightDbLogo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    id: 1,
    heading: "Orchestrate real-time workflows.",
    subHeading:
      "Trigger event destinations, data pipelines, and third-party partner app integrations seamlessly.",
    activeTop: "Booking system",
    activeSub: "Event Destinations",
    leftAppIcons: [
      { logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hubspot/hubspot-original.svg", name: "Hubspot" },
      { logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", name: "Figma" },
      { logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg", name: "Google" },
      { logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/salesforce/salesforce-original.svg", name: "Salesforce" },
    ],
    rightDbLogo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
  },
  {
    id: 2,
    heading: "Scale enterprise data & analytics.",
    subHeading:
      "Stream multi-channel transactions to Snowflake, BigQuery, and custom machine learning pipelines.",
    activeTop: "ERP",
    activeSub: "SDK",
    leftAppIcons: [
      { logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg", name: "Oracle" },
      { logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", name: "Python" },
      { logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg", name: "Azure" },
      { logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", name: "AWS" },
    ],
    rightDbLogo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
];

export function InteractiveArchitectureDiagram() {
  const reduce = useReducedMotion();
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  // Auto transition loop every 3.5 seconds
  useEffect(() => {
    if (reduce) return;
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % ARCH_STEPS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [reduce]);

  const currentStep = ARCH_STEPS[activeStepIndex];

  return (
    <section className="relative overflow-hidden bg-white text-ink-950 pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-24 border-t border-ink-100">
      <Container size="wide" className="relative">
        
        {/* Top Text Header Matching Stripe Design exactly */}
        <div className="max-w-3xl">
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl lg:text-5xl text-ink-950 tracking-tight leading-[1.15]">
              {currentStep.heading}{" "}
              <span className="text-brand-700 font-semibold block sm:inline">
                {currentStep.subHeading.split(".")[0]}.
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-ink-500 font-medium leading-relaxed max-w-2xl">
              {currentStep.subHeading}
            </p>
          </motion.div>

          {/* Indicator dots */}
          <div className="mt-5 flex items-center gap-2">
            {ARCH_STEPS.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveStepIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeStepIndex === idx ? "w-8 bg-brand-600" : "w-2 bg-ink-200 hover:bg-brand-300"
                }`}
                aria-label={`Step ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* ---------- EXACT STRIPE ARCHITECTURE NODE TREE CANVAS (TECHNOBREN RED BRAND THEME) ---------- */}
        <div className="mt-14 relative max-w-5xl mx-auto min-h-[460px] sm:min-h-[500px] flex items-center justify-center p-2">
          
          {/* Animated Dashed Connection SVG Lines (100% Matching Stripe Image) */}
          <svg className="pointer-events-none absolute inset-0 size-full z-0 overflow-visible" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="stripeLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ae3135" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#e11d48" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {/* Top Bar Nodes to SDK & Event Destinations */}
            <path d="M 34% 18% V 33%" stroke="#ae3135" strokeWidth="1.8" strokeDasharray="3,3" fill="none" opacity="0.6" />
            <path d="M 66% 18% V 33%" stroke="#ae3135" strokeWidth="1.8" strokeDasharray="3,3" fill="none" opacity="0.6" />

            {/* SDK & Event Destinations to Center Hub */}
            <path d="M 34% 39% H 50% V 50%" stroke="url(#stripeLineGrad)" strokeWidth="2" strokeDasharray="4,4" className="animate-pulse" fill="none" />
            <path d="M 66% 39% H 50% V 50%" stroke="url(#stripeLineGrad)" strokeWidth="2" strokeDasharray="4,4" className="animate-pulse" fill="none" />

            {/* App Marketplace Grid -> App Marketplace -> Center Hub -> Data Pipeline -> DB Logo */}
            <path d="M 21% 50% H 30%" stroke="#ae3135" strokeWidth="1.8" strokeDasharray="3,3" fill="none" opacity="0.6" />
            <path d="M 30% 50% H 44%" stroke="url(#stripeLineGrad)" strokeWidth="2" strokeDasharray="4,4" className="animate-pulse" fill="none" />
            <path d="M 56% 50% H 68%" stroke="url(#stripeLineGrad)" strokeWidth="2" strokeDasharray="4,4" className="animate-pulse" fill="none" />
            <path d="M 68% 50% H 88%" stroke="#ae3135" strokeWidth="1.8" strokeDasharray="3,3" fill="none" opacity="0.6" />

            {/* Center Hub to Orchestration -> PSPs */}
            <path d="M 50% 56% V 72%" stroke="url(#stripeLineGrad)" strokeWidth="2" strokeDasharray="4,4" className="animate-pulse" fill="none" />
            <path d="M 50% 77% V 84% H 46% V 88%" stroke="#ae3135" strokeWidth="1.8" strokeDasharray="3,3" fill="none" opacity="0.7" />
            <path d="M 50% 77% V 84% H 54% V 88%" stroke="#ae3135" strokeWidth="1.8" strokeDasharray="3,3" fill="none" opacity="0.7" />
          </svg>

          {/* NODE CARDS GRID POSITIONED EXACTLY LIKE STRIPE IMAGE */}
          <div className="relative z-10 size-full flex flex-col items-center justify-between py-2 space-y-6 sm:space-y-8">
            
            {/* ROW 1: TOP GROUP BAR (ERP, CRM, Subscriptions, Legacy billing, Booking system) */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 rounded-2xl border border-brand-200 bg-brand-50/70 p-2 shadow-xs backdrop-blur-xs">
              {["ERP", "CRM", "Subscriptions", "Legacy billing", "Booking system"].map((item) => {
                const isActive = currentStep.activeTop === item;
                return (
                  <motion.span
                    key={item}
                    animate={isActive ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 0.3 }}
                    className={`rounded-xl px-4 py-2 font-mono text-xs sm:text-sm font-bold transition-all duration-300 ${
                      isActive
                        ? "border border-brand-500 bg-brand-600 text-white shadow-md shadow-brand-500/25 ring-2 ring-brand-400/30"
                        : "border border-ink-200/80 bg-white text-ink-600 opacity-60"
                    }`}
                  >
                    {item}
                  </motion.span>
                );
              })}
            </div>

            {/* ROW 2: SDK Engine & Event Destinations */}
            <div className="w-full flex items-center justify-between px-10 sm:px-28">
              <span className={`rounded-xl border px-4 py-2 font-mono text-xs sm:text-sm font-bold shadow-xs transition-all ${
                currentStep.activeSub === "SDK" ? "border-brand-500 bg-brand-600 text-white shadow-md" : "border-brand-300 bg-brand-50 text-brand-900"
              }`}>
                SDK Engine
              </span>

              <span className={`rounded-xl border px-4 py-2 font-mono text-xs sm:text-sm font-bold shadow-xs transition-all ${
                currentStep.activeSub === "Event Destinations" ? "border-brand-500 bg-brand-600 text-white shadow-md" : "border-brand-300 bg-brand-50 text-brand-900"
              }`}>
                Event Destinations
              </span>
            </div>

            {/* ROW 3: Left App Grid Card | App Marketplace | CENTER HUB (technobren) | Data Pipeline | Right DB Logo */}
            <div className="w-full flex items-center justify-between gap-2 px-1 sm:px-4">
              
              {/* Left App Icons Matrix Box (Exact 2x2 grid from Stripe image) */}
              <div className="hidden sm:flex flex-col gap-1 rounded-2xl border border-brand-200 bg-brand-50/80 p-2.5 shadow-xs">
                <div className="grid grid-cols-2 gap-2">
                  {currentStep.leftAppIcons.map((app, i) => (
                    <motion.div
                      key={app.name + i}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="flex size-8 items-center justify-center rounded-xl bg-white border border-ink-100 p-1.5 shadow-2xs"
                    >
                      <img src={app.logo} alt={app.name} className="size-full object-contain" />
                    </motion.div>
                  ))}
                </div>
              </div>

              <span className="rounded-xl border border-brand-400 bg-brand-600 px-4 py-2.5 font-mono text-xs sm:text-sm font-bold text-white shadow-md">
                App Marketplace ↗
              </span>

              {/* CENTER HUB: technobren (Matching Stripe Square Hub) */}
              <motion.div
                animate={reduce ? false : { scale: [1, 1.04, 1], boxShadow: ["0 0 15px rgba(174,49,53,0.3)", "0 0 35px rgba(174,49,53,0.6)", "0 0 15px rgba(174,49,53,0.3)"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-2xl border-2 border-brand-400 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 px-7 py-5 text-center font-display text-base sm:text-lg font-extrabold text-white shadow-xl min-w-[130px]"
              >
                technobren
                <span className="block text-[0.6rem] font-mono text-brand-100 uppercase tracking-widest mt-0.5">
                  Core Hub
                </span>
              </motion.div>

              <span className="rounded-xl border border-brand-400 bg-brand-600 px-4 py-2.5 font-mono text-xs sm:text-sm font-bold text-white shadow-md">
                Data Pipeline
              </span>

              {/* Right Cloud / DB Integration Badge */}
              <motion.div
                key={currentStep.rightDbLogo}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="hidden sm:flex size-11 items-center justify-center rounded-2xl border border-brand-200 bg-white p-2.5 shadow-xs"
              >
                <img src={currentStep.rightDbLogo} alt="Database" className="size-full object-contain" />
              </motion.div>
            </div>

            {/* ROW 4: Orchestration & PSP Nodes (Matching Stripe Image Bottom) */}
            <div className="flex flex-col items-center gap-2.5">
              <span className="rounded-xl border border-brand-400 bg-brand-600 px-5 py-2 font-mono text-xs sm:text-sm font-bold text-white shadow-md">
                API Orchestration
              </span>
              <div className="flex items-center gap-3">
                <span className="rounded-xl border border-brand-300 bg-brand-50 px-4 py-1.5 font-mono text-xs font-bold text-brand-900 shadow-2xs">
                  Stripe PSP
                </span>
                <span className="rounded-xl border border-brand-300 bg-brand-50 px-4 py-1.5 font-mono text-xs font-bold text-brand-900 shadow-2xs">
                  Razorpay
                </span>
              </div>
            </div>

          </div>
        </div>

      </Container>
    </section>
  );
}
