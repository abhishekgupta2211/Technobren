"use client";

import { useState, useId } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Calculator,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  DollarSign,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const TECH_RATES: Record<string, { base: number; multiplier: number }> = {
  "React / Next.js": { base: 1800, multiplier: 1.0 },
  "Node.js / Express": { base: 1900, multiplier: 1.0 },
  "Flutter / Mobile": { base: 2000, multiplier: 1.1 },
  "Python / Django / AI": { base: 2200, multiplier: 1.25 },
  ".NET / C#": { base: 2100, multiplier: 1.15 },
  "PHP / Laravel": { base: 1500, multiplier: 0.9 },
  "UI/UX Design": { base: 1600, multiplier: 0.95 },
  "QA & Automation": { base: 1400, multiplier: 0.85 },
};

const EXPERIENCES = [
  { id: "junior", label: "Junior (1-2 Yrs)", factor: 0.8 },
  { id: "mid", label: "Mid-Level (2-4 Yrs)", factor: 1.0 },
  { id: "senior", label: "Senior (4-6+ Yrs)", factor: 1.4 },
  { id: "lead", label: "Tech Lead (6+ Yrs)", factor: 1.8 },
];

const TEAM_SIZES = [
  { id: "1", label: "1 Developer", count: 1 },
  { id: "2-3", label: "2–3 Developers", count: 2.5 },
  { id: "4-6", label: "4–6 Developers", count: 5 },
  { id: "7+", label: "7+ Dedicated Team", count: 8 },
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
    <div className="relative overflow-hidden rounded-3xl border border-ink-200 bg-white p-6 shadow-(--shadow-card) sm:p-8 lg:p-10">
      {/* Background Orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-brand-500/10 blur-3xl"
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-ink-100 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
            <Calculator className="size-3.5" /> Real-Time Cost Estimator
          </div>
          <h3 className="mt-2 font-display text-xl font-bold text-ink-950 sm:text-2xl">
            Developer Hiring Cost Calculator
          </h3>
        </div>
        <span className="font-mono text-xs font-medium text-ink-500">
          ⚡ 7-Day Risk-Free Trial Included
        </span>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Controls Column */}
        <div className="space-y-6">
          {/* 1. Technology */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ink-500 mb-2">
              1. Select Primary Technology
            </label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {Object.keys(TECH_RATES).map((tech) => {
                const active = selectedTech === tech;
                return (
                  <button
                    key={tech}
                    type="button"
                    onClick={() => setSelectedTech(tech)}
                    className={`rounded-xl border px-3 py-2 text-left text-xs font-semibold transition-all ${
                      active
                        ? "border-brand-600 bg-brand-600 text-white shadow-xs"
                        : "border-ink-200 bg-white text-ink-800 hover:border-brand-300"
                    }`}
                  >
                    {tech}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Experience Level */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ink-500 mb-2">
              2. Required Experience Level
            </label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {EXPERIENCES.map((exp) => {
                const active = selectedExp === exp.id;
                return (
                  <button
                    key={exp.id}
                    type="button"
                    onClick={() => setSelectedExp(exp.id)}
                    className={`rounded-xl border px-3 py-2 text-left text-xs font-semibold transition-all ${
                      active
                        ? "border-brand-600 bg-brand-600 text-white shadow-xs"
                        : "border-ink-200 bg-white text-ink-800 hover:border-brand-300"
                    }`}
                  >
                    {exp.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Team Size & Engagement */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-ink-500 mb-2">
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
                      className={`rounded-xl border px-3 py-2 text-center text-xs font-semibold transition-all ${
                        active
                          ? "border-brand-600 bg-brand-600 text-white shadow-xs"
                          : "border-ink-200 bg-white text-ink-800 hover:border-brand-300"
                      }`}
                    >
                      {ts.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-ink-500 mb-2">
                4. Engagement Model
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setEngagementType("full")}
                  className={`rounded-xl border px-3 py-2 text-center text-xs font-semibold transition-all ${
                    engagementType === "full"
                      ? "border-brand-600 bg-brand-600 text-white shadow-xs"
                      : "border-ink-200 bg-white text-ink-800 hover:border-brand-300"
                  }`}
                >
                  Full Time (160h)
                </button>
                <button
                  type="button"
                  onClick={() => setEngagementType("part")}
                  className={`rounded-xl border px-3 py-2 text-center text-xs font-semibold transition-all ${
                    engagementType === "part"
                      ? "border-brand-600 bg-brand-600 text-white shadow-xs"
                      : "border-ink-200 bg-white text-ink-800 hover:border-brand-300"
                  }`}
                >
                  Part Time (80h)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Estimation Output Card */}
        <motion.div
          key={`${selectedTech}-${selectedExp}-${selectedTeam}-${engagementType}`}
          initial={reduce ? false : { scale: 0.98, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col justify-between rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-950 via-brand-900 to-ink-950 p-6 text-white shadow-xl"
        >
          <div>
            <div className="flex items-center justify-between border-b border-brand-800 pb-3">
              <span className="font-mono text-xs font-semibold text-brand-300 uppercase tracking-wider">
                Estimated Monthly Cost
              </span>
              <span className="rounded-full bg-emerald-500/20 border border-emerald-400/30 px-2.5 py-0.5 text-[0.68rem] font-bold text-emerald-400">
                ● Live Estimate
              </span>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-brand-200 uppercase font-mono tracking-widest">
                {selectedTech} &bull; {expData.label}
              </p>
              <div className="mt-2 font-display text-3xl font-extrabold sm:text-4xl text-white tracking-tight">
                {formattedMin} – {formattedMax}
                <span className="text-xs font-normal text-brand-300 block mt-1">/ month</span>
              </div>
            </div>

            <div className="mt-6 space-y-2 border-t border-brand-800/80 pt-4 text-xs text-brand-100/90">
              <div className="flex items-center justify-between">
                <span>Developers Included:</span>
                <span className="font-bold text-white">{teamData.label}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Billing Commitment:</span>
                <span className="font-bold text-white">Monthly / No Lock-in</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Trial Period:</span>
                <span className="font-bold text-emerald-400">7 Days Risk-Free</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-brand-800/80">
            <Button
              type="button"
              onClick={scrollToForm}
              size="lg"
              variant="primary"
              arrow
              className="w-full bg-white text-brand-950 hover:bg-brand-50 hover:text-brand-900 font-bold justify-center"
            >
              Get Full Quote &amp; Shortlist
            </Button>
            <p className="mt-2 text-center text-[0.7rem] text-brand-300">
              ⚡ Guaranteed response within 4 hours
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
