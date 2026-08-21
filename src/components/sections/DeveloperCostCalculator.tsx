"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Calculator,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  DollarSign,
  ShieldCheck,
  Zap,
  Check,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const TECH_RATES: Record<string, { base: number; multiplier: number; icon: string }> = {
  "React / Next.js": { base: 1800, multiplier: 1.0, icon: "⚛️" },
  "Node.js / Express": { base: 1900, multiplier: 1.0, icon: "🟢" },
  "Flutter / Mobile": { base: 2000, multiplier: 1.1, icon: "📱" },
  "Python / AI / ML": { base: 2200, multiplier: 1.25, icon: "🐍" },
  ".NET / C#": { base: 2100, multiplier: 1.15, icon: "🔷" },
  "PHP / Laravel": { base: 1500, multiplier: 0.9, icon: "🔴" },
  "UI/UX Design": { base: 1600, multiplier: 0.95, icon: "🎨" },
  "QA & Automation": { base: 1400, multiplier: 0.85, icon: "⚙️" },
};

const EXPERIENCES = [
  { id: "junior", label: "Junior", detail: "1-2 Yrs Exp", factor: 0.8 },
  { id: "mid", label: "Mid-Level", detail: "2-4 Yrs Exp", factor: 1.0 },
  { id: "senior", label: "Senior", detail: "4-6+ Yrs Exp", factor: 1.4 },
  { id: "lead", label: "Tech Lead", detail: "6+ Yrs Lead", factor: 1.8 },
];

const TEAM_SIZES = [
  { id: "1", label: "1 Dev", desc: "Solo Engineer", count: 1 },
  { id: "2-3", label: "2–3 Devs", desc: "Small Squad", count: 2.5 },
  { id: "4-6", label: "4–6 Devs", desc: "Full Team", count: 5 },
  { id: "7+", label: "7+ Devs", desc: "Enterprise Squad", count: 8 },
];

export function DeveloperCostCalculator() {
  const reduce = useReducedMotion();
  const [selectedTech, setSelectedTech] = useState("React / Next.js");
  const [selectedExp, setSelectedExp] = useState("mid");
  const [selectedTeam, setSelectedTeam] = useState("1");
  const [engagementType, setEngagementType] = useState<"full" | "part">("full");

  // Calculate Cost Range
  const techData = TECH_RATES[selectedTech] || TECH_RATES["React / Next.js"];
  const expData = EXPERIENCES.find((e) => e.id === selectedExp) || EXPERIENCES[1];
  const teamData = TEAM_SIZES.find((t) => t.id === selectedTeam) || TEAM_SIZES[0];

  const baseMonthly = techData.base * techData.multiplier * expData.factor * teamData.count;
  const timeFactor = engagementType === "part" ? 0.55 : 1.0;

  const minMonthly = Math.round((baseMonthly * timeFactor * 0.9) / 50) * 50;
  const maxMonthly = Math.round((baseMonthly * timeFactor * 1.15) / 50) * 50;

  const formattedMin = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(minMonthly);

  const formattedMax = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(maxMonthly);

  const scrollToForm = () => {
    const el = document.getElementById("request-form");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-ink-200 bg-white p-6 shadow-xl sm:p-8 lg:p-10">
      {/* Top Ambient Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-brand-500/10 blur-3xl"
      />

      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-ink-100 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50/80 px-3 py-1 text-xs font-semibold text-brand-700">
            <Calculator className="size-3.5 text-brand-600" /> Interactive Budget Estimator
          </div>
          <h3 className="mt-2 font-display text-2xl font-extrabold text-ink-950 sm:text-3xl tracking-tight">
            Developer Hiring Cost Calculator
          </h3>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800">
          <ShieldCheck className="size-3.5 text-emerald-600" /> 7-Day Risk-Free Trial Included
        </span>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
        {/* Left Inputs Column */}
        <div className="space-y-7">
          {/* 1. Technology */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-ink-500">
                1. Select Primary Technology
              </label>
              <span className="text-xs font-semibold text-brand-700">{selectedTech}</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {Object.entries(TECH_RATES).map(([tech, info]) => {
                const active = selectedTech === tech;
                return (
                  <button
                    key={tech}
                    type="button"
                    onClick={() => setSelectedTech(tech)}
                    className={`flex items-center gap-2 rounded-2xl border p-3 text-left text-xs font-semibold transition-all duration-200 ${
                      active
                        ? "border-brand-600 bg-brand-600 text-white shadow-md scale-[1.02]"
                        : "border-ink-200 bg-white text-ink-800 hover:border-brand-300 hover:bg-brand-50/40"
                    }`}
                  >
                    <span className="text-base">{info.icon}</span>
                    <span className="truncate">{tech.split(" / ")[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Experience Seniority */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-ink-500">
                2. Required Seniority Level
              </label>
              <span className="text-xs font-semibold text-brand-700">{expData.label} ({expData.detail})</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {EXPERIENCES.map((exp) => {
                const active = selectedExp === exp.id;
                return (
                  <button
                    key={exp.id}
                    type="button"
                    onClick={() => setSelectedExp(exp.id)}
                    className={`flex flex-col rounded-2xl border p-3 text-left transition-all duration-200 ${
                      active
                        ? "border-brand-600 bg-brand-600 text-white shadow-md scale-[1.02]"
                        : "border-ink-200 bg-white text-ink-800 hover:border-brand-300 hover:bg-brand-50/40"
                    }`}
                  >
                    <span className="text-xs font-bold">{exp.label}</span>
                    <span className={`text-[0.7rem] ${active ? "text-brand-100" : "text-ink-500"}`}>
                      {exp.detail}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Team Size & Engagement */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-ink-500 mb-3">
                3. Number of Developers
              </label>
              <div className="grid grid-cols-2 gap-2">
                {TEAM_SIZES.map((ts) => {
                  const active = selectedTeam === ts.id;
                  return (
                    <button
                      key={ts.id}
                      type="button"
                      onClick={() => setSelectedTeam(ts.id)}
                      className={`flex flex-col rounded-2xl border p-2.5 text-center transition-all duration-200 ${
                        active
                          ? "border-brand-600 bg-brand-600 text-white shadow-md"
                          : "border-ink-200 bg-white text-ink-800 hover:border-brand-300"
                      }`}
                    >
                      <span className="text-xs font-bold">{ts.label}</span>
                      <span className={`text-[0.68rem] ${active ? "text-brand-100" : "text-ink-400"}`}>
                        {ts.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-ink-500 mb-3">
                4. Engagement Model
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setEngagementType("full")}
                  className={`flex flex-col items-center rounded-2xl border p-2.5 text-center transition-all duration-200 ${
                    engagementType === "full"
                      ? "border-brand-600 bg-brand-600 text-white shadow-md"
                      : "border-ink-200 bg-white text-ink-800 hover:border-brand-300"
                  }`}
                >
                  <span className="text-xs font-bold">Full-Time</span>
                  <span className={`text-[0.68rem] ${engagementType === "full" ? "text-brand-100" : "text-ink-400"}`}>
                    160h / Month
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setEngagementType("part")}
                  className={`flex flex-col items-center rounded-2xl border p-2.5 text-center transition-all duration-200 ${
                    engagementType === "part"
                      ? "border-brand-600 bg-brand-600 text-white shadow-md"
                      : "border-ink-200 bg-white text-ink-800 hover:border-brand-300"
                  }`}
                >
                  <span className="text-xs font-bold">Part-Time</span>
                  <span className={`text-[0.68rem] ${engagementType === "part" ? "text-brand-100" : "text-ink-400"}`}>
                    80h / Month
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Live Estimate Output Card */}
        <motion.div
          key={`${selectedTech}-${selectedExp}-${selectedTeam}-${engagementType}`}
          initial={reduce ? false : { scale: 0.97, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-brand-300 bg-gradient-to-br from-brand-950 via-brand-900 to-ink-950 p-6 text-white shadow-2xl"
        >
          {/* Subtle Ambient Background Orb */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-10 -right-10 size-48 rounded-full bg-brand-500/20 blur-2xl"
          />

          <div className="relative">
            <div className="flex items-center justify-between border-b border-brand-800/80 pb-3">
              <span className="font-mono text-[0.68rem] font-bold text-brand-300 uppercase tracking-widest">
                Estimated Monthly Budget
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 px-2.5 py-0.5 text-[0.65rem] font-bold text-emerald-400">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" /> Live Estimate
              </span>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-brand-200 font-mono">
                {selectedTech} &bull; {expData.label}
              </p>
              <div className="mt-3 font-display text-3xl font-extrabold sm:text-4xl text-white tracking-tight">
                {formattedMin} – {formattedMax}
                <span className="text-xs font-medium text-brand-300 block mt-1">/ month total</span>
              </div>
            </div>

            <div className="mt-6 space-y-2.5 border-t border-brand-800/80 pt-4 text-xs text-brand-100">
              <div className="flex items-center justify-between">
                <span className="text-brand-300">Team Composition:</span>
                <span className="font-semibold text-white">{teamData.label}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-brand-300">Work Hours:</span>
                <span className="font-semibold text-white">{engagementType === "full" ? "160h / Month" : "80h / Month"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-brand-300">Trial Period:</span>
                <span className="font-bold text-emerald-400">7 Days Risk-Free</span>
              </div>
            </div>
          </div>

          <div className="relative mt-8 pt-4 border-t border-brand-800/80">
            <Button
              type="button"
              onClick={scrollToForm}
              size="lg"
              variant="primary"
              arrow
              className="w-full bg-white text-brand-950 hover:bg-brand-50 hover:text-brand-900 font-bold justify-center shadow-lg"
            >
              Get Full Quote &amp; Shortlist
            </Button>
            <p className="mt-2.5 text-center text-[0.7rem] text-brand-300 font-medium">
              ⚡ Receive vetted candidate profiles within 24–48 hours
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
