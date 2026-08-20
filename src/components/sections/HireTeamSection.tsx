"use client";

import { motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

const ROLES = [
  "ReactJS Developers",
  "NodeJS Developers",
  "VueJS Developers",
  "AngularJS Developers",
  "PHP Developers",
  "Laravel Developers",
  "Magento Developers",
  "WordPress Developers",
  "Android Developers",
  "iOS Developers",
  "Flutter Developers",
  "React Native Developers",
  "Python Developers",
  "Java Developers",
  "ASP.NET Developers",
  "Shopify Developers",
  "AI & ML Developers",
  "UI/UX Designers",
];

const POINTS = [
  "Dedicated or fixed time & cost engagements",
  "Vetted through qualification tests before you meet them",
  "Cut development costs by up to 1/3",
  "24/7 operation across your time zone",
];

export function HireTeamSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-x-clip border-t border-ink-100 bg-[var(--canvas-subtle)] py-14 sm:py-18 lg:py-22">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[10%] top-1/3 size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(174,49,53,0.09),transparent_65%)] blur-3xl"
      />

      <Container size="wide" className="relative">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Dedicated teams"
              title={
                <>
                  Build &amp; hire your own{" "}
                  <span className="text-brand-700">offshore team</span>
                </>
              }
              description="Hire developers proficient in the latest technologies to build custom, responsive websites, web applications, mobile apps and eCommerce solutions — working as an extension of your own team."
            />

            <Reveal delay={3}>
              <ul className="mt-8 space-y-3">
                {POINTS.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-3 text-[0.93rem] text-ink-700"
                  >
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                      <Check className="size-3" aria-hidden />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={4}>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="/contact" arrow>
                  Hire Dedicated Developers
                </Button>
                <Button href="/services" variant="secondary">
                  Explore Services
                </Button>
              </div>
            </Reveal>
          </div>

          {/* ---- Role cloud ---- */}
          <Reveal delay={2}>
            <div className="relative rounded-2xl border border-ink-200 bg-white p-6 shadow-(--shadow-card) sm:p-8">
              <div className="flex items-center justify-between border-b border-ink-100 pb-4">
                <h3 className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink-500">
                  Roles you can hire
                </h3>
                <span className="font-mono text-[0.68rem] text-ink-600">
                  {ROLES.length}+
                </span>
              </div>

              <ul className="mt-5 flex flex-wrap gap-2">
                {ROLES.map((role, i) => (
                  <motion.li
                    key={role}
                    initial={reduce ? false : { opacity: 0, scale: 0.94 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{
                      duration: 0.45,
                      delay: i * 0.025,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="cursor-default rounded-lg border border-ink-200 bg-white px-3 py-2 text-[0.8rem] font-medium text-ink-600"
                  >
                    {role}
                  </motion.li>
                ))}
              </ul>

              <p className="mt-6 rounded-xl border border-brand-200 bg-brand-50/60 px-4 py-3 text-[0.83rem] leading-relaxed text-brand-900">
                <strong className="font-semibold">First 7 days on us.</strong>{" "}
                Experience our excellence with zero upfront investment.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
