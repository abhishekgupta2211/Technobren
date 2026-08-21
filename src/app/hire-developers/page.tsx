"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { HireDeveloperForm } from "@/components/sections/HireDeveloperForm";
import { hireRoles, techCategories } from "@/lib/site";
import {
  UserCheck,
  Zap,
  Layers,
  Clock,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Code2,
  Cpu,
  Globe2,
  Laptop,
  Terminal,
  ArrowRight,
  Star,
} from "lucide-react";

// Flatten technology badges
const TECH_BADGES = Array.from(
  new Set([
    "React",
    "Node.js",
    "Flutter",
    "Python",
    "Laravel",
    ".NET",
    "Android",
    "iOS",
    "TypeScript",
    "Next.js",
    "Vue.js",
    "Docker",
    "AWS",
    "GraphQL",
    "PostgreSQL",
  ])
);

const STATS = [
  { value: "48h", label: "Average Developer Matching Time" },
  { value: "98%", label: "Client Satisfaction & Retention" },
  { value: "7 Days", label: "Zero-Risk Trial Evaluation" },
  { value: "1/3", label: "Cost Savings vs Onshore Hiring" },
];

const BENEFITS = [
  {
    icon: UserCheck,
    title: "Rigorously Vetted Engineers",
    description:
      "Every developer passes 4 rounds of technical coding, system design, and English fluency tests before entering our talent pool.",
    gradient: "from-brand-500/10 to-brand-700/5",
    accentColor: "text-brand-600",
  },
  {
    icon: Layers,
    title: "Diverse Tech Stack Mastery",
    description:
      "Access specialized talent across Mobile, Frontend, Backend, Cloud, DevOps, and AI/ML engineers ready to deploy.",
    gradient: "from-amber-500/10 to-brand-500/5",
    accentColor: "text-amber-600",
  },
  {
    icon: Clock,
    title: "Agile & Flexible Models",
    description:
      "Scale up or down effortlessly with Full-Time, Part-Time, Contract, or Dedicated Team models aligned to your sprint cycles.",
    gradient: "from-emerald-500/10 to-brand-500/5",
    accentColor: "text-emerald-600",
  },
  {
    icon: Zap,
    title: "Zero Setup Overhead",
    description:
      "We handle payroll, hardware infrastructure, IP agreements, and HR support so your team stays focused on product shipping.",
    gradient: "from-purple-500/10 to-brand-500/5",
    accentColor: "text-purple-600",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Share Your Requirement",
    description: "Submit your tech stack, seniority, team size, and timeline using our interactive B2B requirement builder.",
    icon: Terminal,
  },
  {
    step: "02",
    title: "AI & Expert Shortlisting",
    description: "Our technical resource team evaluates candidate profiles matching your exact architecture within 24–48 hours.",
    icon: Cpu,
  },
  {
    step: "03",
    title: "Live Tech Interview",
    description: "Interview shortlisted developers directly, review code samples, or assign custom technical tests.",
    icon: Laptop,
  },
  {
    step: "04",
    title: "Onboard & 7-Day Risk-Free Trial",
    description: "Start working immediately with dedicated account management and a 7-day no-questions-asked evaluation period.",
    icon: CheckCircle2,
  },
];

export default function HireDevelopersPage() {
  const reduce = useReducedMotion();

  return (
    <div className="overflow-x-clip">
      {/* 01 — ULTRA MODERN HERO WITH GLOW & ANIMATED TECH MARQUEE */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[var(--canvas-subtle)] via-white to-[var(--canvas-subtle)] pt-24 pb-20 sm:pt-28 sm:pb-28 lg:pt-32">
        {/* Glow Effects */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 top-0 size-[36rem] rounded-full bg-[radial-gradient(circle,rgba(174,49,53,0.14),transparent_65%)] blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-1/4 size-[40rem] rounded-full bg-[radial-gradient(circle,rgba(174,49,53,0.08),transparent_70%)] blur-3xl"
        />

        <Container size="wide" className="relative">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50/80 px-4 py-1.5 backdrop-blur-xs">
                <Sparkles className="size-3.5 text-brand-600 animate-pulse" />
                <span className="font-mono text-xs font-semibold text-brand-900 tracking-wide">
                  Top 2% Vetted Tech Talent
                </span>
              </div>

              <h1 className="mt-6 font-display text-3xl font-extrabold tracking-tight text-ink-950 sm:text-5xl lg:text-6xl leading-[1.1]">
                Hire Dedicated{" "}
                <span className="relative inline-block text-brand-700">
                  Software Developers
                  <svg
                    className="absolute -bottom-2 left-0 w-full text-brand-300"
                    viewBox="0 0 250 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 9C50 3 150 3 248 9"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>{" "}
                On Demand.
              </h1>

              <p className="mt-6 text-base text-ink-700 sm:text-lg leading-relaxed max-w-xl">
                Scale your engineering capacity fast. Hire top-tier React, Node, Flutter, Python, .NET &amp; Mobile developers tailored to your product roadmap.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button href="#request-form" size="lg" arrow>
                  Request Developers Now
                </Button>
                <Button href="#how-it-works" variant="secondary" size="lg">
                  Explore Hiring Process
                </Button>
              </div>

              {/* Guarantees */}
              <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-ink-100 pt-6 text-xs font-medium text-ink-600">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  First 7 Days Risk-Free
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  Strict NDA Protection
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  48-Hour Matching
                </span>
              </div>
            </div>

            {/* Right Visual Card */}
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-3xl border border-ink-200 bg-white p-6 sm:p-8 shadow-(--shadow-card)"
            >
              <div className="flex items-center justify-between border-b border-ink-100 pb-4">
                <div className="flex items-center gap-2">
                  <span className="flex size-3 rounded-full bg-red-500" />
                  <span className="flex size-3 rounded-full bg-amber-500" />
                  <span className="flex size-3 rounded-full bg-emerald-500" />
                </div>
                <span className="font-mono text-[0.7rem] font-bold text-brand-700 uppercase tracking-widest">
                  Live Resource Pool
                </span>
              </div>

              {/* Interactive Visual Badges Grid */}
              <div className="mt-6 space-y-4">
                <div className="rounded-2xl bg-ink-950 p-4 font-mono text-xs text-brand-300 shadow-inner">
                  <div className="flex items-center justify-between text-[0.68rem] text-ink-400 border-b border-ink-800 pb-2 mb-3">
                    <span>// TECHNOBREN STAFF AUGMENTATION</span>
                    <span className="text-emerald-400 font-bold">ACTIVE DEPLOYMENT</span>
                  </div>
                  <p className="text-white">
                    <span className="text-brand-400">const</span> team = <span className="text-amber-300">await</span> TechnoBren.<span className="text-blue-300">matchDevelopers</span>(&#123;
                  </p>
                  <p className="pl-4 text-ink-300">technologies: [<span className="text-emerald-300">&quot;React&quot;, &quot;Node.js&quot;, &quot;Flutter&quot;</span>],</p>
                  <p className="pl-4 text-ink-300">experience: <span className="text-emerald-300">&quot;3-5 Years&quot;</span>,</p>
                  <p className="pl-4 text-ink-300">trial: <span className="text-amber-300">true</span></p>
                  <p className="text-white">&#125;);</p>
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {TECH_BADGES.map((tech, i) => (
                    <motion.span
                      key={tech}
                      initial={reduce ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.03 }}
                      className="rounded-xl border border-ink-200 bg-white px-3 py-1.5 text-xs font-semibold text-ink-800 shadow-2xs transition-colors hover:border-brand-300 hover:text-brand-700"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                <div className="mt-4 rounded-2xl bg-brand-50 border border-brand-200 p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-brand-950">Need a custom stack?</p>
                    <p className="text-[0.75rem] text-brand-800">We match specialized engineers tailored to your architecture.</p>
                  </div>
                  <a href="#request-form" className="shrink-0 text-xs font-bold text-brand-700 underline">
                    Build Requirement →
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* STATS BAR */}
          <div className="mt-16 grid grid-cols-2 gap-4 rounded-3xl border border-ink-200 bg-white p-6 shadow-sm sm:grid-cols-4 sm:p-8">
            {STATS.map((st) => (
              <div key={st.label} className="text-center sm:text-left sm:border-r sm:border-ink-100 sm:last:border-r-0 sm:pr-4">
                <p className="font-display text-3xl font-extrabold text-brand-700 sm:text-4xl">
                  {st.value}
                </p>
                <p className="mt-1 text-xs font-medium text-ink-600">{st.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 02 — WHY HIRE FROM US (ANIMATED CARDS) */}
      <section className="border-t border-ink-100 bg-[var(--canvas-subtle)] py-16 sm:py-24">
        <Container size="wide">
          <SectionHeading
            eyebrow="Why TechnoBren"
            title={
              <>
                Engineered for <span className="text-brand-700">Enterprise Speed &amp; Quality</span>
              </>
            }
            description="Our staff augmentation framework ensures you hire high-performing developers without administrative friction."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((item, idx) => (
              <Reveal key={item.title} delay={idx + 1}>
                <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-ink-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-300 hover:shadow-lg">
                  <div className={`absolute top-0 right-0 size-32 bg-gradient-to-br ${item.gradient} rounded-bl-full blur-xl transition-all group-hover:scale-125`} />
                  
                  <div className="relative">
                    <span className={`flex size-12 items-center justify-center rounded-2xl bg-brand-50 ${item.accentColor} transition-colors group-hover:bg-brand-600 group-hover:text-white`}>
                      <item.icon className="size-6" />
                    </span>
                    <h3 className="mt-6 font-display text-lg font-bold text-ink-950">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-xs leading-relaxed text-ink-600">
                      {item.description}
                    </p>
                  </div>

                  <div className="relative mt-6 pt-4 border-t border-ink-100 flex items-center gap-1.5 text-xs font-bold text-brand-700">
                    <span>Verified Capability</span>
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 03 — HOW IT WORKS (STEP BY STEP WORKFLOW) */}
      <section id="how-it-works" className="border-t border-ink-100 bg-white py-16 sm:py-24">
        <Container size="wide">
          <SectionHeading
            eyebrow="4-Step Hiring Flow"
            title={
              <>
                How to Hire Developers <span className="text-brand-700">in 48 Hours</span>
              </>
            }
            description="Simple, transparent, and hassle-free developer onboarding."
          />

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((ps, idx) => (
              <Reveal key={ps.step} delay={idx + 1}>
                <div className="relative flex flex-col justify-between h-full rounded-3xl border border-ink-200 bg-[var(--canvas-subtle)] p-7 shadow-2xs hover:border-brand-200 transition-all">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-extrabold text-brand-700 bg-brand-50 border border-brand-200 px-3 py-1 rounded-full">
                        {ps.step}
                      </span>
                      <ps.icon className="size-5 text-ink-400" />
                    </div>

                    <h3 className="mt-5 font-display text-lg font-bold text-ink-950">
                      {ps.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-ink-600">
                      {ps.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-1 text-[0.72rem] font-semibold text-brand-700">
                    <span>Step {ps.step} Completed</span>
                    <CheckCircle2 className="size-3.5 text-emerald-600" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 04 — DEVELOPER REQUIREMENT FORM */}
      <section id="request-form" className="border-t border-ink-100 bg-gradient-to-b from-[var(--canvas-subtle)] to-white py-16 sm:py-24">
        <Container size="wide">
          <div className="max-w-4xl mx-auto">
            <SectionHeading
              eyebrow="Interactive Requirement Builder"
              title={
                <>
                  Build Your <span className="text-brand-700">Developer Hiring Requirement</span>
                </>
              }
              description="Tell us about your technical stack, seniority preference, and project goals to receive tailored developer profiles."
            />

            <div className="mt-12">
              <HireDeveloperForm />
            </div>
          </div>
        </Container>
      </section>

      {/* 05 — PREMIUM BOTTOM CTA */}
      <section className="border-t border-ink-100 bg-white py-16 sm:py-20">
        <Container size="wide">
          <div className="relative overflow-hidden rounded-3xl border border-brand-200 bg-gradient-to-r from-brand-900 via-brand-800 to-brand-950 p-8 sm:p-14 text-white shadow-xl">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-brand-500/20 blur-3xl"
            />

            <div className="relative max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 font-mono text-xs font-semibold text-brand-200 backdrop-blur-xs">
                <Star className="size-3 text-amber-300 fill-amber-300" /> Ready to Scale Your Engineering Team?
              </span>

              <h2 className="mt-4 font-display text-2xl font-bold sm:text-4xl leading-tight">
                Get Pre-Vetted Developers Onboarded in 48 Hours.
              </h2>
              
              <p className="mt-3 text-sm text-brand-100/90 leading-relaxed">
                Connect with our technical account director to discuss team composition, time zones, and custom skill requirements.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button href="#request-form" variant="primary" size="lg" arrow className="bg-white text-brand-950 hover:bg-brand-50">
                  Request Developers Now
                </Button>
                <Button href="/contact" variant="secondary" size="lg" className="border-white/20 text-white hover:bg-white/10">
                  Speak to Account Manager
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
