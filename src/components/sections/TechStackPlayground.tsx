"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, ArrowRight, Code2, Server, Database, Smartphone, Cloud, Cpu } from "lucide-react";

export interface TechStackTab {
  id: string;
  name: string;
  category: string;
  icon: any;
  logo: string;
  tagline: string;
  description: string;
  features: string[];
  useCases: string[];
  capabilities: { label: string; value: string }[];
}

export const TECH_TABS: TechStackTab[] = [
  {
    id: "nextjs",
    name: "Next.js & React",
    category: "Frontend & Full-Stack",
    icon: Code2,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    tagline: "Ultra-Fast Server-Rendered Enterprise Web Platforms",
    description:
      "We engineer sub-second SEO-optimised web applications, dynamic customer portals, and high-concurrency e-commerce storefronts using Next.js App Router and React Server Components.",
    features: [
      "Server-Side Rendering (SSR) & Static Generation",
      "Sub-50ms Initial Page Load Speed",
      "Edge Middleware & API Route Integration",
      "Zero-Layout Shift Tailwind UI Engineering",
    ],
    useCases: [
      "Enterprise Portals",
      "Real-Time Dashboards",
      "SaaS Platforms",
      "B2B Marketplaces",
    ],
    capabilities: [
      { label: "RPS Throughput", value: "10,000+ RPS" },
      { label: "SEO Rating", value: "100/100 Lighthouse" },
      { label: "Security", value: "OWASP Compliant" },
    ],
  },
  {
    id: "nodejs",
    name: "Node.js & TypeScript",
    category: "Backend & Microservices",
    icon: Server,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    tagline: "High-Concurrency Asynchronous Event Microservices",
    description:
      "Our backend engineers build resilient event-driven microservices, real-time WebSockets API gateways, and distributed transactional engines that handle millions of requests flawlessly.",
    features: [
      "Event-Driven Asynchronous Non-Blocking I/O",
      "REST & GraphQL Microservice Architecture",
      "Real-Time Socket.io & Webhook Streaming",
      "Strict Type-Safe Enterprise Codebases",
    ],
    useCases: [
      "Payment Gateways",
      "Real-Time Tracking",
      "Order Management Systems",
      "High-Traffic APIs",
    ],
    capabilities: [
      { label: "API Latency", value: "< 25ms Average" },
      { label: "Uptime SLA", value: "99.99% Operational" },
      { label: "Concurrency", value: "50k Active Connections" },
    ],
  },
  {
    id: "python",
    name: "Python & AI ML",
    category: "Artificial Intelligence & Analytics",
    icon: Cpu,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    tagline: "Intelligent Data Pipelines & Predictive Machine Learning",
    description:
      "We design custom AI pipelines, automated OCR document extractors, predictive sales forecasting engines, and LLM-powered enterprise chatbots tailored to business operations.",
    features: [
      "PyTorch & TensorFlow Model Training",
      "Automated OCR & Intelligent Document Processing",
      "Predictive Inventory & Demand Analytics",
      "Custom GenAI & Retrieval-Augmented Generation (RAG)",
    ],
    useCases: [
      "Smart FMCG Demand Forecast",
      "OCR Invoice Extraction",
      "Customer Intent Chatbots",
      "Fraud Detection Engines",
    ],
    capabilities: [
      { label: "Model Accuracy", value: "98.7% Certified" },
      { label: "Processing Speed", value: "1.2k Doc/Min" },
      { label: "Pipeline", value: "Automated ETL" },
    ],
  },
  {
    id: "flutter",
    name: "Flutter & Mobile Apps",
    category: "Cross-Platform Mobile Apps",
    icon: Smartphone,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
    tagline: "Native Performance iOS & Android Field Operations Apps",
    description:
      "We deliver high-speed, offline-first mobile apps for field sales, driver delivery, merchandisers, and consumer mobile apps with instant SQLite sync engine.",
    features: [
      "Single Codebase Native iOS & Android Compilation",
      "Offline-First SQLite Database Auto-Sync",
      "Background GPS Tracking & Bluetooth Thermal Printing",
      "Smooth 60 FPS Fluid Motion UI Design",
    ],
    useCases: [
      "Van Sales & Merchandising",
      "Delivery Driver Logistics",
      "Field Audit Apps",
      "Customer Mobile Apps",
    ],
    capabilities: [
      { label: "Offline Mode", value: "100% Reliable Sync" },
      { label: "Frame Rate", value: "60 FPS Native" },
      { label: "Platforms", value: "iOS & Android" },
    ],
  },
  {
    id: "postgres",
    name: "PostgreSQL & Database",
    category: "High-Scale Database & Analytics",
    icon: Database,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    tagline: "ACID-Compliant Relational Data Engines & Search",
    description:
      "We architect high-availability transactional PostgreSQL clusters, Redis caching layers, and vector search databases designed for zero data loss and sub-10ms queries.",
    features: [
      "ACID Compliant Multi-Region Read Replicas",
      "PgVector & AI Embedding Vector Search",
      "High-Speed Redis Cache Layering",
      "Automated Point-in-Time Backup & Disaster Recovery",
    ],
    useCases: [
      "Enterprise ERP Databases",
      "Financial Transaction Logs",
      "High-Speed Search",
      "Inventory Ledgers",
    ],
    capabilities: [
      { label: "Query Speed", value: "< 8ms Indexing" },
      { label: "Reliability", value: "Zero Data Loss" },
      { label: "Encryption", value: "AES-256 at Rest" },
    ],
  },
  {
    id: "aws",
    name: "AWS & Cloud DevOps",
    category: "Cloud Infrastructure & Security",
    icon: Cloud,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    tagline: "Automated CI/CD Kubernetes & Serverless Infrastructure",
    description:
      "Our Cloud Architects deploy self-healing Kubernetes clusters, serverless AWS Lambda pipelines, and automated Terraform infrastructure to guarantee zero downtime.",
    features: [
      "Docker & Kubernetes (EKS) Orchestration",
      "Infrastructure as Code (Terraform / CloudFormation)",
      "Automated GitHub Actions CI/CD Pipelines",
      "DDoS Mitigation & WAF Firewalls",
    ],
    useCases: [
      "Multi-Region Cloud Hosting",
      "Auto-Scaling Microservices",
      "Zero-Downtime Deployments",
      "Disaster Recovery",
    ],
    capabilities: [
      { label: "Auto-Scaling", value: "100% Elastic" },
      { label: "Deployment", value: "Zero Downtime" },
      { label: "Security", value: "ISO 27001 Ready" },
    ],
  },
];

export function TechStackPlayground() {
  const [activeTabId, setActiveTabId] = useState("nextjs");
  const currentTab = TECH_TABS.find((t) => t.id === activeTabId) || TECH_TABS[0];

  return (
    <section className="relative overflow-hidden bg-white border-t border-ink-100 py-16 sm:py-20 lg:py-24">
      {/* Background Ambient Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[10%] top-1/4 size-[36rem] rounded-full bg-[radial-gradient(circle,rgba(174,49,53,0.06),transparent_66%)] blur-3xl"
      />

      <Container size="wide" className="relative z-10">
        <div className="flex flex-col gap-4 max-w-3xl">
          <SectionHeading
            eyebrow="Interactive Tech Playground"
            title={
              <>
                Explore how TechnoBren engineers{" "}
                <span className="text-brand-700">each technology stack</span>
              </>
            }
            description="Click on any technology framework below to inspect how we architect, scale, and deliver enterprise solutions using that tool."
          />
        </div>

        {/* ---------- Interactive Tab Navigation Bar ---------- */}
        <div className="mt-10 flex flex-wrap items-center gap-2.5 sm:gap-3 border-b border-ink-100 pb-4 overflow-x-auto no-scrollbar">
          {TECH_TABS.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTabId(tab.id)}
                className={`relative flex items-center gap-2.5 rounded-2xl px-4 py-3 text-xs sm:text-sm font-bold transition-all duration-300 shrink-0 ${
                  isActive
                    ? "border-2 border-brand-500 bg-brand-50/90 text-brand-950 shadow-md shadow-brand-500/10 ring-2 ring-brand-400/20"
                    : "border border-ink-200/80 bg-white text-ink-700 hover:border-brand-300 hover:bg-brand-50/40 hover:text-ink-950"
                }`}
              >
                <img src={tab.logo} alt={tab.name} className="size-5 object-contain" />
                <span>{tab.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="tech-tab-active-indicator"
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-1 rounded-t-full bg-brand-600 shadow-sm"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ---------- Active Tech Card Content Display ---------- */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl border border-ink-200/90 bg-gradient-to-br from-white via-white to-brand-50/30 p-6 sm:p-10 shadow-xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: Tech Overview & Capabilities */}
                <div className="lg:col-span-7 flex flex-col justify-between h-full">
                  <div>
                    {/* Category Pill & Logo */}
                    <div className="flex items-center gap-3">
                      <div className="size-12 rounded-2xl border border-brand-200 bg-white p-2.5 shadow-xs flex items-center justify-center">
                        <img src={currentTab.logo} alt={currentTab.name} className="size-full object-contain" />
                      </div>
                      <div>
                        <span className="font-mono text-[0.68rem] font-bold uppercase tracking-widest text-brand-700">
                          {currentTab.category}
                        </span>
                        <h3 className="font-display text-xl sm:text-2xl font-extrabold text-ink-950">
                          {currentTab.name}
                        </h3>
                      </div>
                    </div>

                    {/* Tagline & Description */}
                    <h4 className="mt-5 font-display text-lg font-bold text-ink-900 leading-snug">
                      {currentTab.tagline}
                    </h4>
                    <p className="mt-2.5 text-sm leading-relaxed text-ink-600 font-medium">
                      {currentTab.description}
                    </p>

                    {/* Feature Points */}
                    <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentTab.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-ink-800">
                          <CheckCircle2 className="size-4 text-brand-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Metric Badges */}
                  <div className="mt-8 pt-6 border-t border-ink-100 grid grid-cols-3 gap-3">
                    {currentTab.capabilities.map((cap, i) => (
                      <div key={i} className="rounded-2xl border border-brand-200/80 bg-white p-3 shadow-2xs">
                        <span className="block text-[0.65rem] font-bold uppercase tracking-wider text-ink-400 font-mono">
                          {cap.label}
                        </span>
                        <span className="block font-display text-xs sm:text-sm font-extrabold text-brand-700 mt-0.5">
                          {cap.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column: Typical Use Cases & CTA Card */}
                <div className="lg:col-span-5 flex flex-col gap-5">
                  <div className="rounded-2xl border border-ink-200/80 bg-white p-6 shadow-xs">
                    <h4 className="font-mono text-[0.72rem] font-bold uppercase tracking-wider text-ink-500 mb-4 flex items-center gap-2">
                      <currentTab.icon className="size-4 text-brand-600" /> Key Enterprise Use Cases
                    </h4>
                    <ul className="space-y-2.5">
                      {currentTab.useCases.map((uc, i) => (
                        <li
                          key={i}
                          className="flex items-center justify-between rounded-xl border border-ink-100 bg-ink-50/60 px-3.5 py-2.5 text-xs sm:text-sm font-bold text-ink-900 transition-colors hover:border-brand-200 hover:bg-brand-50/50"
                        >
                          <span>{uc}</span>
                          <ArrowRight className="size-3.5 text-brand-600" />
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Consultation Card */}
                  <div className="rounded-2xl border border-brand-300 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 p-6 text-white shadow-md">
                    <h4 className="font-display text-base font-extrabold">
                      Need a project built with {currentTab.name}?
                    </h4>
                    <p className="mt-1.5 text-xs text-brand-100 leading-relaxed font-medium">
                      Our senior tech architects can evaluate your existing codebase or plan your greenfield architecture.
                    </p>
                    <Button
                      href="/contact"
                      size="sm"
                      className="mt-4 bg-white text-brand-900 hover:bg-brand-50 rounded-full font-bold shadow-sm"
                    >
                      Consult Our Engineers
                    </Button>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </Container>
    </section>
  );
}
