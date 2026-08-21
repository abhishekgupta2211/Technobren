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

        {/* ---------- 3-Column Glassmorphic Testimonial Grid ---------- */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {TESTIMONIALS.map((t, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <Reveal key={t.id} delay={idx % 3}>
                <div
                  onClick={() => setActiveIndex(idx)}
                  className={`group relative h-full flex flex-col justify-between rounded-3xl border p-6 sm:p-7 transition-all duration-500 cursor-pointer ${
                    isSelected
                      ? "border-2 border-brand-500 bg-white shadow-2xl shadow-brand-600/15 -translate-y-1.5 ring-4 ring-brand-500/10"
                      : "border-ink-200/90 bg-white/95 hover:border-brand-300 hover:shadow-xl hover:-translate-y-1"
                  }`}
                >
                  {/* Top: Rating Stars & Country Badge */}
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>

                      <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-ink-50 px-3 py-1 font-mono text-xs font-bold text-ink-800">
                        <CountryMark country={t.country} />
                        {t.location}
                      </span>
                    </div>

                    {/* Quote Text */}
                    <p className="mt-5 font-display text-sm sm:text-base font-medium leading-relaxed text-ink-900 group-hover:text-ink-950">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>

                  {/* Bottom: Client Profile + Verified ROI Pill */}
                  <div className="mt-6 pt-5 border-t border-ink-100 flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="size-11 rounded-full object-cover border-2 border-brand-300 shadow-sm shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-display text-sm font-extrabold text-ink-950 truncate">
                          {t.name}
                        </h4>
                        <p className="text-[0.75rem] text-ink-500 font-medium truncate">
                          {t.role} &bull; <span className="font-semibold text-ink-800">{t.company}</span>
                        </p>
                      </div>
                    </div>

                    {/* Project & Result Badge */}
                    <div className="rounded-2xl border border-emerald-200/90 bg-emerald-50/70 p-2.5 flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                      <span className="text-[0.72rem] font-bold text-emerald-950 truncate">
                        {t.result}
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
