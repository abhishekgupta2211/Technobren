"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";

// Slides data matching screenshots 2, 3, 4 with real icons & node states
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

  // Auto transition animation loop every 4 seconds
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
        {/* Animated Top Heading (No Dark Background) */}
        <div className="max-w-3xl">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl lg:text-5xl text-ink-950 tracking-tight leading-[1.15]">
              {currentSlide.heading}{" "}
              <span className="text-brand-700 font-semibold block sm:inline">
                {currentSlide.subHeading.split(".")[0]}.
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-ink-600 leading-relaxed max-w-2xl">
              {currentSlide.subHeading}
            </p>
          </motion.div>

          {/* Slide Indicator Dots */}
          <div className="mt-6 flex items-center gap-2">
            {ARCH_SLIDES.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveSlideIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeSlideIndex === idx ? "w-8 bg-brand-600" : "w-2 bg-ink-200 hover:bg-brand-300"
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* ---------- EXACT STRIPE NEURAL NETWORK ARCHITECTURE NODE TREE (NO DARK BG) ---------- */}
        <div className="mt-14 relative flex flex-col items-center justify-center min-h-[460px] sm:min-h-[500px]">
          
          {/* Animated Connecting Neural Lines (SVG) */}
          <svg className="pointer-events-none absolute inset-0 size-full z-0" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="linePulseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ae3135" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#e11d48" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#ae3135" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Neural Lines from Top Bar to SDK & Event Destinations */}
            <path d="M 33% 20% L 33% 34%" stroke="#ae3135" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.6" />
            <path d="M 67% 20% L 67% 34%" stroke="#ae3135" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.6" />

            {/* Neural Lines from SDK & Event Destinations to Center Hub */}
            <path d="M 33% 40% L 50% 52%" stroke="url(#linePulseGrad)" strokeWidth="2" strokeDasharray="4,4" className="animate-pulse" />
            <path d="M 67% 40% L 50% 52%" stroke="url(#linePulseGrad)" strokeWidth="2" strokeDasharray="4,4" className="animate-pulse" />

            {/* Horizontal Neural Line: Left Marketplace -> Center Hub -> Right Data Pipeline */}
            <path d="M 22% 54% L 32% 54%" stroke="#ae3135" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.5" />
            <path d="M 32% 54% L 45% 54%" stroke="url(#linePulseGrad)" strokeWidth="2" strokeDasharray="4,4" className="animate-pulse" />
            <path d="M 55% 54% L 68% 54%" stroke="url(#linePulseGrad)" strokeWidth="2" strokeDasharray="4,4" className="animate-pulse" />
            <path d="M 68% 54% L 88% 54%" stroke="#ae3135" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.5" />

            {/* Neural Line: Center Hub -> Bottom Orchestration */}
            <path d="M 50% 60% L 50% 74%" stroke="url(#linePulseGrad)" strokeWidth="2" strokeDasharray="4,4" className="animate-pulse" />
            <path d="M 50% 80% L 42% 88%" stroke="#ae3135" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.6" />
            <path d="M 50% 80% L 47% 88%" stroke="#ae3135" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.6" />
            <path d="M 50% 80% L 53% 88%" stroke="#ae3135" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.6" />
            <path d="M 50% 80% L 58% 88%" stroke="#ae3135" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.6" />
          </svg>

          {/* Neural Tree Nodes Structure */}
          <div className="relative z-10 size-full flex flex-col items-center justify-between py-2 space-y-7">
            
            {/* ROW 1: Top Enterprise Node Group Bar */}
            <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-brand-200 bg-brand-50/60 p-2.5 backdrop-blur-xs shadow-xs">
              {["ERP", "CRM", "Subscriptions", "Legacy billing", "Booking system"].map((item) => {
                const isActive = currentSlide.activeNodes.includes(item);
                return (
                  <motion.span
                    key={item}
                    animate={isActive ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 0.3 }}
                    className={`rounded-xl px-4 py-2 font-mono text-xs font-bold transition-all duration-300 ${
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

            {/* ROW 2: SDK & Event Destinations */}
            <div className="w-full flex items-center justify-between px-12 sm:px-32">
              <span className="rounded-xl border border-brand-300 bg-brand-600 px-4 py-2 font-mono text-xs font-bold text-white shadow-sm">
                SDK Engine
              </span>
              <span className="rounded-xl border border-brand-300 bg-brand-600 px-4 py-2 font-mono text-xs font-bold text-white shadow-sm">
                Event Destinations
              </span>
            </div>

            {/* ROW 3: Left App Grid | CENTER HUB (technobren) | App Marketplace | Right Cloud Logo */}
            <div className="w-full flex items-center justify-between gap-3 px-2 sm:px-8">
              
              {/* Left App Icons Matrix Card matching Screenshot 2/3/4 */}
              <div className="hidden sm:flex flex-col gap-1.5 rounded-2xl border border-brand-200 bg-brand-50/70 p-3 shadow-sm">
                <div className="grid grid-cols-3 gap-2">
                  {currentSlide.leftAppIcons.map((app, i) => (
                    <motion.div
                      key={app.name + i}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: i * 0.08 }}
                      className="flex size-9 items-center justify-center rounded-xl bg-white border border-ink-100 p-1.5 shadow-2xs"
                    >
                      <img src={app.logo} alt={app.name} className="size-full object-contain" />
                    </motion.div>
                  ))}
                </div>
              </div>

              <span className="rounded-xl border border-brand-400 bg-brand-600 px-4 py-2.5 font-mono text-xs font-bold text-white shadow-md">
                App Marketplace ↗
              </span>

              {/* CENTER NEURAL HUB: technobren */}
              <motion.div
                animate={reduce ? false : { scale: [1, 1.05, 1], boxShadow: ["0 0 15px rgba(174,49,53,0.3)", "0 0 35px rgba(174,49,53,0.6)", "0 0 15px rgba(174,49,53,0.3)"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-2xl border-2 border-brand-400 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 px-8 py-5 text-center font-display text-lg font-extrabold text-white shadow-xl"
              >
                technobren
                <span className="block text-[0.65rem] font-mono text-brand-100 uppercase tracking-widest mt-0.5">
                  Neural Core Hub
                </span>
              </motion.div>

              <span className="rounded-xl border border-brand-400 bg-brand-600 px-4 py-2.5 font-mono text-xs font-bold text-white shadow-md">
                Data Pipeline
              </span>

              {/* Right Cloud Integration Icon matching Screenshot 2/3/4 */}
              <motion.div
                key={currentSlide.rightCloudIcon}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="hidden sm:flex size-11 items-center justify-center rounded-2xl border border-brand-200 bg-white p-2.5 shadow-sm"
              >
                <img src={currentSlide.rightCloudIcon} alt="Cloud Database" className="size-full object-contain" />
              </motion.div>
            </div>

            {/* ROW 4: Orchestration & PSP Nodes */}
            <div className="flex flex-col items-center gap-2.5">
              <span className="rounded-xl border border-brand-400 bg-brand-600 px-5 py-2 font-mono text-xs font-bold text-white shadow-sm">
                API Orchestration
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {["Stripe PSP", "Razorpay", "PayPal", "Bank Transfer"].map((psp) => (
                  <span key={psp} className="rounded-xl border border-brand-200 bg-brand-50/80 px-3 py-1 font-mono text-[0.7rem] font-bold text-brand-900 shadow-2xs">
                    {psp}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}
