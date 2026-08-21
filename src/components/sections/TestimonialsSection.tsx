"use client";

import { useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CountryMark } from "@/components/ui/CountryMark";

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  country: string;
  rating: number;
  quote: string;
  project: string;
  result: string;
  avatar: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "01",
    name: "Tariq Al-Mansoori",
    role: "Head of Supply Chain Ops",
    company: "Al-Rayan Logistics & Distribution",
    location: "Dubai",
    country: "UAE",
    rating: 5,
    quote:
      "TechnoBren built our multi-tier Van Sales & Distribution suite for UAE operations. Their team delivered automated offline-first mobile sync that handles 15,000 daily van transactions with zero downtime.",
    project: "FMCG Van Sales & Billing System",
    result: "42% increase in daily route dispatch efficiency",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "02",
    name: "Dr. Vikramaditya Sharma",
    role: "Director & Founder",
    company: "Digital Gurukul Group",
    location: "Jaunpur, UP",
    country: "India",
    rating: 5,
    quote:
      "Our Custom ERP & Student Management Portal built by TechnoBren completely transformed how we run operations across 4 campuses. Their technical expertise in Next.js and scalable databases is top-notch.",
    project: "Enterprise Education ERP & LMS",
    result: "100% automated fee reconciliation & portal sync",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "03",
    name: "Patrick Mukasa",
    role: "Chief Operating Officer",
    company: "Victoria Nile Enterprises",
    location: "Kampala",
    country: "Uganda",
    rating: 5,
    quote:
      "TechnoBren delivered a custom Asset Management & Field Workforce App for our East Africa operations. Their responsiveness, communication, and engineering quality exceeded our expectations.",
    project: "Field Force & Asset Tracking App",
    result: "Saved 200+ manual audit hours every month",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "04",
    name: "Anand Verma",
    role: "VP of Engineering",
    company: "Apex Global Retail",
    location: "Mumbai",
    country: "India",
    rating: 5,
    quote:
      "The AI Data Pipeline & High-Concurrency Microservices deployed by TechnoBren enabled us to handle peak 10k RPS during festival sales without a single glitch. Highly recommended engineering partner!",
    project: "High-Concurrency AI & Data Pipeline",
    result: "Sub-50ms API response time at 10k RPS peak",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
  },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[activeIndex];

  return (
    <section className="relative overflow-hidden border-t border-ink-100 bg-[var(--canvas-subtle)] py-14 sm:py-18 lg:py-22">
      {/* Ambient Red Radial Background Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[12%] top-1/3 size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(174,49,53,0.07),transparent_66%)] blur-3xl"
      />

      <Container size="wide" className="relative z-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Client Success & Trust"
            title={
              <>
                What our enterprise clients{" "}
                <span className="text-brand-700">say about TechnoBren</span>
              </>
            }
            description="Real feedback from engineering leaders, directors, and operational heads across India, UAE, and East Africa."
          />

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 font-mono text-xs font-bold text-emerald-800 shadow-2xs">
              <Star className="size-3.5 fill-amber-400 text-amber-400" />
              5.0 Star Rating on Google
            </span>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={prevSlide}
                className="flex size-10 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-700 transition-all hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 active:scale-95 shadow-2xs"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="flex size-10 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-700 transition-all hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 active:scale-95 shadow-2xs"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        </div>

        {/* ---------- Featured Card Carousel & Side List ---------- */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Active Testimonial Card */}
          <Reveal className="lg:col-span-8">
            <div className="relative h-full flex flex-col justify-between rounded-3xl border-2 border-brand-500/80 bg-gradient-to-br from-white via-white to-brand-50/40 p-7 sm:p-10 shadow-2xl shadow-brand-600/10 transition-all duration-300">
              
              {/* Quote Mark Watermark */}
              <Quote className="size-14 text-brand-500/15 absolute top-6 right-8 pointer-events-none" />

              <div>
                {/* Rating Stars & Location Badge */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/70">
                    {Array.from({ length: current.rating }).map((_, i) => (
                      <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-xs font-bold text-amber-900 ml-1">5.0</span>
                  </div>

                  <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50/90 px-3.5 py-1.5 font-mono text-xs font-bold text-brand-900 shadow-2xs">
                    <CountryMark country={current.country} />
                    {current.location}, {current.country}
                  </span>
                </div>

                {/* Quote Text */}
                <p className="mt-7 text-pretty font-display text-xl sm:text-2xl lg:text-3xl text-ink-950 leading-relaxed font-bold tracking-tight">
                  &ldquo;{current.quote}&rdquo;
                </p>
              </div>

              {/* Author Info & Verified Impact Pill */}
              <div className="mt-8 pt-6 border-t border-brand-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={current.avatar}
                    alt={current.name}
                    className="size-14 rounded-full object-cover border-2 border-brand-500 shadow-md"
                  />
                  <div>
                    <h4 className="font-display text-lg font-extrabold text-ink-950 leading-tight">
                      {current.name}
                    </h4>
                    <p className="text-xs text-ink-600 font-medium mt-0.5">
                      {current.role} &bull; <span className="font-bold text-ink-900">{current.company}</span>
                    </p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 rounded-2xl border border-emerald-300 bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-900 shadow-xs">
                  <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                  <span>{current.result}</span>
                </div>
              </div>

            </div>
          </Reveal>

          {/* Side Stack / Quick Select list */}
          <div className="lg:col-span-4 flex flex-col gap-3.5">
            {TESTIMONIALS.map((t, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`w-full flex items-center justify-between gap-3.5 rounded-2xl border p-4 text-left transition-all duration-300 ${
                    isSelected
                      ? "border-2 border-brand-500 bg-gradient-to-r from-brand-50/90 via-white to-white shadow-xl shadow-brand-500/10 scale-[1.02] ring-2 ring-brand-400/20"
                      : "border-ink-200/80 bg-white/90 text-ink-800 hover:bg-white hover:border-brand-300 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className={`size-11 rounded-full object-cover shrink-0 ${isSelected ? "border-2 border-brand-500" : "border border-ink-200"}`}
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-extrabold text-ink-950 truncate">
                        {t.name}
                      </h4>
                      <p className="text-[0.72rem] text-ink-500 font-medium truncate mt-0.5">
                        {t.company}
                      </p>
                      <p className="text-[0.68rem] text-brand-700 font-mono font-bold truncate mt-1">
                        {t.project}
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 rounded-lg border border-ink-200 bg-ink-50 px-2 py-1 font-mono text-[0.68rem] font-bold text-ink-700">
                    <CountryMark country={t.country} />
                  </span>
                </button>
              );
            })}
          </div>

        </div>
      </Container>
    </section>
  );
}
