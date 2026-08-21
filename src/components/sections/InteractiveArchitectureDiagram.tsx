"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";

// Neural Network Slides data matching Stripe reference images
const ARCH_SLIDES = [
  {
    id: 0,
    heading: "Connect to existing systems.",
    subHeading:
      "Orchestrate enterprise data across ERPs, booking systems, and legacy infrastructure using custom APIs.",
    activeNodes: ["CRM", "Subscriptions", "Booking system", "SDK", "Event Destinations"],
    leftAppIcons: [
      { logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg", name: "Slack" },
      { logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg", name: "Jira" },
      { logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg", name: "Postman" },
      { logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/trello/trello-plain.svg", name: "Trello" },
      { logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", name: "GitHub" },
    ],
    rightCloudIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    id: 1,
    heading: "Automate custom workflows.",
    subHeading:
      "Trigger event destinations, real-time data pipelines, and third-party integrations seamlessly.",
    activeNodes: ["CRM", "Booking system", "SDK", "Event Destinations", "Data Pipeline"],
    leftAppIcons: [
      { logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hubspot/hubspot-original.svg", name: "Hubspot" },
      { logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", name: "Figma" },
      { logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg", name: "Google" },
      { logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/salesforce/salesforce-original.svg", name: "Salesforce" },
      { logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redhat/redhat-original.svg", name: "RedHat" },
    ],
    rightCloudIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
  },
  {
    id: 2,
    heading: "Scale enterprise data & analytics.",
    subHeading:
      "Stream multi-channel data to Snowflake, BigQuery, and custom AI machine learning models.",
    activeNodes: ["ERP", "CRM", "Subscriptions", "Legacy billing", "Booking system"],
    leftAppIcons: [
      { logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/salesforce/salesforce-original.svg", name: "Salesforce" },
      { logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg", name: "Oracle" },
      { logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", name: "Python" },
      { logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg", name: "Azure" },
      { logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", name: "AWS" },
    ],
    rightCloudIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
];

export function InteractiveArchitectureDiagram() {
  const reduce = useReducedMotion();
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // Auto transition loop every 4 seconds
  useEffect(() => {
    if (reduce) return;
    const interval = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % ARCH_SLIDES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [reduce]);

  const currentSlide = ARCH_SLIDES[activeSlideIndex];

  return (
    <section className="relative overflow-hidden bg-white text-ink-950 py-16 sm:py-24 border-t border-ink-100">
      <Container size="wide" className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* LEFT SIDE: Heading, Description & Slide Dots */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1 text-xs font-semibold text-brand-700">
                <span className="size-2 rounded-full bg-brand-600 animate-ping" />
                Enterprise Integration Engine
              </span>

              <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl lg:text-5xl text-ink-950 tracking-tight leading-[1.15]">
                {currentSlide.heading}{" "}
                <span className="text-brand-700 font-semibold block mt-1">
                  {currentSlide.subHeading.split(".")[0]}.
                </span>
              </h2>
              
              <p className="mt-4 text-sm sm:text-base text-ink-600 leading-relaxed">
                {currentSlide.subHeading}
              </p>
            </motion.div>

            {/* Slide Indicator Dots */}
            <div className="flex items-center gap-2 pt-2">
              {ARCH_SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveSlideIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeSlideIndex === idx ? "w-8 bg-brand-600" : "w-2.5 bg-ink-200 hover:bg-brand-300"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: Full Interconnected Neural Network Diagram Grid */}
          <div className="lg:col-span-7 relative flex items-center justify-center min-h-[460px] sm:min-h-[500px]">
            
            {/* SVG Connecting Neural Lines (EVERY NODE CONNECTED TO CENTER HUB) */}
            <svg className="pointer-events-none absolute inset-0 size-full z-0" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="brandNeuralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ae3135" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#e11d48" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#ae3135" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* 1. Top Bar to Center Neural Hub */}
              <line x1="50%" y1="18%" x2="50%" y2="50%" stroke="url(#brandNeuralGrad)" strokeWidth="2" strokeDasharray="4,4" className="animate-pulse" />
              
              {/* 2. Top-Left SDK to Center Neural Hub */}
              <line x1="28%" y1="36%" x2="50%" y2="50%" stroke="url(#brandNeuralGrad)" strokeWidth="1.5" strokeDasharray="3,3" />

              {/* 3. Top-Right Event Destinations to Center Neural Hub */}
              <line x1="72%" y1="36%" x2="50%" y2="50%" stroke="url(#brandNeuralGrad)" strokeWidth="1.5" strokeDasharray="3,3" />

              {/* 4. Left App Marketplace Grid to Center Neural Hub */}
              <line x1="26%" y1="52%" x2="50%" y2="50%" stroke="url(#brandNeuralGrad)" strokeWidth="2" strokeDasharray="4,4" className="animate-pulse" />

              {/* 5. Right Data Pipeline to Center Neural Hub */}
              <line x1="74%" y1="52%" x2="50%" y2="50%" stroke="url(#brandNeuralGrad)" strokeWidth="2" strokeDasharray="4,4" className="animate-pulse" />

              {/* 6. Right Cloud Icon to Data Pipeline & Hub */}
              <line x1="88%" y1="52%" x2="74%" y2="52%" stroke="url(#brandNeuralGrad)" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.6" />

              {/* 7. Center Hub to Bottom API Orchestration */}
              <line x1="50%" y1="50%" x2="50%" y2="80%" stroke="url(#brandNeuralGrad)" strokeWidth="2" strokeDasharray="4,4" className="animate-pulse" />

              {/* 8. Bottom API Orchestration to PSP Chips */}
              <path d="M 50% 80% L 40% 90%" stroke="#ae3135" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.6" />
              <path d="M 50% 80% L 46% 90%" stroke="#ae3135" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.6" />
              <path d="M 50% 80% L 54% 90%" stroke="#ae3135" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.6" />
              <path d="M 50% 80% L 60% 90%" stroke="#ae3135" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.6" />
            </svg>

            {/* Neural Tree Nodes Layout Structure */}
            <div className="relative z-10 size-full flex flex-col items-center justify-between py-2 space-y-6">
              
              {/* TOP ROW: ERP Bar */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 rounded-2xl border border-brand-200 bg-brand-50/70 p-2 shadow-2xs backdrop-blur-xs">
                {["ERP", "CRM", "Subscriptions", "Legacy billing", "Booking system"].map((item) => {
                  const isActive = currentSlide.activeNodes.includes(item);
                  return (
                    <motion.span
                      key={item}
                      animate={isActive ? { scale: [1, 1.04, 1] } : {}}
                      transition={{ duration: 0.3 }}
                      className={`rounded-xl px-3 py-1.5 font-mono text-[0.72rem] font-bold transition-all duration-300 ${
                        isActive
                          ? "border border-brand-500 bg-brand-600 text-white shadow-md shadow-brand-500/20"
                          : "border border-ink-200/80 bg-white text-ink-600 opacity-60"
                      }`}
                    >
                      {item}
                    </motion.span>
                  );
                })}
              </div>

              {/* SECOND ROW: SDK & Event Destinations */}
              <div className="w-full flex items-center justify-between px-6 sm:px-16">
                <span className="rounded-xl border border-brand-300 bg-brand-600 px-3.5 py-1.5 font-mono text-xs font-bold text-white shadow-sm">
                  SDK Engine
                </span>
                <span className="rounded-xl border border-brand-300 bg-brand-600 px-3.5 py-1.5 font-mono text-xs font-bold text-white shadow-sm">
                  Event Destinations
                </span>
              </div>

              {/* CENTER NEURAL ROW: Left App Grid | CENTER HUB | Data Pipeline | Right Cloud */}
              <div className="w-full flex items-center justify-between gap-2 px-1 sm:px-4">
                
                {/* Left Side App Icons Matrix Box */}
                <div className="hidden sm:flex flex-col gap-1 rounded-2xl border border-brand-200 bg-brand-50/80 p-2 shadow-2xs">
                  <div className="grid grid-cols-3 gap-1.5">
                    {currentSlide.leftAppIcons.map((app, i) => (
                      <motion.div
                        key={app.name + i}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="flex size-7 items-center justify-center rounded-lg bg-white border border-ink-100 p-1 shadow-2xs"
                      >
                        <img src={app.logo} alt={app.name} className="size-full object-contain" />
                      </motion.div>
                    ))}
                  </div>
                </div>

                <span className="rounded-xl border border-brand-400 bg-brand-600 px-3.5 py-2 font-mono text-[0.75rem] font-bold text-white shadow-sm">
                  App Marketplace ↗
                </span>

                {/* CENTER NEURAL CORE HUB: technobren */}
                <motion.div
                  animate={reduce ? false : { scale: [1, 1.05, 1], boxShadow: ["0 0 15px rgba(174,49,53,0.3)", "0 0 35px rgba(174,49,53,0.6)", "0 0 15px rgba(174,49,53,0.3)"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="rounded-2xl border-2 border-brand-400 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 px-6 py-4 text-center font-display text-base font-extrabold text-white shadow-xl"
                >
                  technobren
                  <span className="block text-[0.6rem] font-mono text-brand-100 uppercase tracking-widest mt-0.5">
                    Neural Hub
                  </span>
                </motion.div>

                <span className="rounded-xl border border-brand-400 bg-brand-600 px-3.5 py-2 font-mono text-[0.75rem] font-bold text-white shadow-sm">
                  Data Pipeline
                </span>

                {/* Right Side Cloud Logo */}
                <motion.div
                  key={currentSlide.rightCloudIcon}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="hidden sm:flex size-10 items-center justify-center rounded-xl border border-brand-200 bg-white p-2 shadow-2xs"
                >
                  <img src={currentSlide.rightCloudIcon} alt="Cloud Database" className="size-full object-contain" />
                </motion.div>
              </div>

              {/* BOTTOM ROW: API Orchestration & Gateways */}
              <div className="flex flex-col items-center gap-2">
                <span className="rounded-xl border border-brand-400 bg-brand-600 px-4 py-1.5 font-mono text-xs font-bold text-white shadow-sm">
                  API Orchestration
                </span>
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  {["Stripe PSP", "Razorpay", "PayPal", "Bank Transfer"].map((psp) => (
                    <span key={psp} className="rounded-lg border border-brand-200 bg-brand-50 px-2.5 py-1 font-mono text-[0.68rem] font-bold text-brand-900 shadow-2xs">
                      {psp}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
