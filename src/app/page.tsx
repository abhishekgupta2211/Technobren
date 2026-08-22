import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TechnologySection } from "@/components/sections/TechnologySection";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { ClientsSection } from "@/components/sections/ClientsSection";
import { AboutStripSection } from "@/components/sections/AboutStripSection";
import { WhySection } from "@/components/sections/WhySection";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ReliabilitySection } from "@/components/sections/ReliabilitySection";
import { CredentialsSection } from "@/components/sections/CredentialsSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { FaqSection } from "@/components/sections/FaqSection";
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
      {/* 06 — Who we built it for */}
      <ClientsSection />
      {/* 07 — Checkable proof, and real reviews once there are any */}
      <CredentialsSection />
      <ReviewsSection />
      {/* 08 — Differentiators */}
      <WhySection />
      {/* 09 — Industries */}
      <IndustriesSection />
      {/* 10 — How we work */}
      <ProcessSection />
      {/* 11 — Reliability */}
      <ReliabilitySection />
      {/* 12 — Objections */}
      <FaqSection />
      {/* 13 — Conversion */}
      <CTASection />
      {/* 14 — Who we are, sitting directly above the footer */}
      <AboutStripSection />
    </>
  );
}
