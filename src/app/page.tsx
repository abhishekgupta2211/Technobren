import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TechnologySection } from "@/components/sections/TechnologySection";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { AboutStripSection } from "@/components/sections/AboutStripSection";
import { WhySection } from "@/components/sections/WhySection";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { HireTeamSection } from "@/components/sections/HireTeamSection";
import { AnimatedWaveScaleSection } from "@/components/sections/AnimatedWaveScaleSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { OfficesSection } from "@/components/sections/OfficesSection";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Technobren Infotech Private Limited — Custom Software, ERP & AI Engineering",
  description:
    "TechnoBren Infotech builds custom software, enterprise ERP, mobile apps and AI-driven systems for businesses across India, the UAE and Uganda.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      {/* 01 — Positioning */}
      <Hero />
      {/* 02 — What we do */}
      <ServicesSection />
      {/* 03 — Technology expertise */}
      <TechnologySection />
      {/* 04 — Products */}
      <SolutionsSection />
      {/* 05 — What we've built */}
      <WorkSection />
      {/* 06 — Who we are */}
      <AboutStripSection />
      {/* 07 — Differentiators */}
      <WhySection />
      {/* 08 — Industries */}
      <IndustriesSection />
      {/* 09 — How we work */}
      <ProcessSection />
      {/* 10.5 — Scale with Confidence Animated Wave */}
      <AnimatedWaveScaleSection />
      {/* 11 — Enterprise Client Testimonials */}
      <TestimonialsSection />
      {/* 11.5 — Global Offices */}
      <OfficesSection />
      {/* 12 — Conversion */}
      <CTASection />
    </>
  );
}
