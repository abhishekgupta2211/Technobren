import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { HireDeveloperForm } from "@/components/sections/HireDeveloperForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { techCategories, hireRoles, site } from "@/lib/site";
import { Users, Code2, ShieldCheck, Zap, UserCheck, Clock, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Hire Developers",
  description:
    "Hire skilled and vetted developers for your next project from TechnoBren Infotech. Flexible engagement models across React, Node, Flutter, Python, .NET, Laravel and mobile technologies.",
  alternates: { canonical: "/hire-developers" },
  openGraph: {
    title: "Hire Developers | TechnoBren Infotech Private Limited",
    description:
      "Get access to skilled developers across multiple technologies for full-time, contract, or dedicated offshore team engagements.",
    url: "/hire-developers",
  },
};

const BENEFITS = [
  {
    icon: UserCheck,
    title: "Vetted & Skilled Developers",
    description:
      "Pre-screened engineers tested for technical expertise, problem-solving, and communication skills.",
  },
  {
    icon: Layers,
    title: "Multiple Technologies",
    description:
      "Full stack, Frontend, Mobile, Backend, DevOps, AI/ML, and cloud technology expertise.",
  },
  {
    icon: Clock,
    title: "Flexible Engagement Models",
    description:
      "Full-time, part-time, contract, or dedicated development team models tailored to your timeline.",
  },
  {
    icon: Zap,
    title: "Fast Onboarding & Support",
    description:
      "Quick developer matching with 24/7 dedicated account support and zero setup overhead.",
  },
];

const STEPS = [
  {
    id: "01",
    title: "Tell Us Your Requirement",
    description:
      "Share your required technology stack, experience level, team size, and timeline.",
  },
  {
    id: "02",
    title: "We Shortlist Candidates",
    description:
      "Our technical team matches vetted developers that fit your exact stack and domain needs.",
  },
  {
    id: "03",
    title: "Interview & Select",
    description:
      "Conduct technical interviews or tests with shortlisted engineers before finalizing.",
  },
  {
    id: "04",
    title: "Start Your Project",
    description:
      "Onboard developers seamlessly with direct communication and 7-day risk-free evaluation.",
  },
];

export default function HireDevelopersPage() {
  return (
    <>
      {/* 01 — HERO SECTION */}
      <PageHero
        eyebrow="Hire Developers"
        title="Hire Skilled Developers"
        accent="for Your Next Project."
        description="Get access to skilled and experienced developers across multiple technologies. Tell us your requirements and our team will help you find the right talent for your project."
        aside={
          <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-(--shadow-card)">
            <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-ink-500">
              Staff Augmentation Flow
            </p>

            <div className="mt-5 space-y-3">
              <div className="flex items-center gap-3 rounded-2xl border border-ink-100 bg-ink-50/60 p-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-xs font-bold text-brand-700">
                  1
                </span>
                <span className="text-xs font-semibold text-ink-900">
                  Company Requirement
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-ink-100 bg-ink-50/60 p-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-xs font-bold text-brand-700">
                  2
                </span>
                <span className="text-xs font-semibold text-ink-900">
                  Vetted Developer Matching
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-ink-100 bg-ink-50/60 p-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-xs font-bold text-brand-700">
                  3
                </span>
                <span className="text-xs font-semibold text-ink-900">
                  Seamless Project Execution
                </span>
              </div>
            </div>

            <p className="mt-5 flex items-start gap-2 text-pretty text-[0.83rem] leading-relaxed text-ink-600">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand-600" />
              First 7 days trial engagement with zero upfront risk.
            </p>

            <div className="mt-5 pt-4 border-t border-ink-100">
              <a
                href="#request-form"
                className="block text-center rounded-xl bg-brand-600 py-2.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
              >
                Request Developers ↓
              </a>
            </div>
          </div>
        }
      />

      {/* 02 — WHY HIRE FROM US */}
      <section className="border-t border-ink-100 bg-[var(--canvas-subtle)] py-14 sm:py-18 lg:py-22">
        <Container size="wide">
          <SectionHeading
            eyebrow="Why Choose TechnoBren"
            title={
              <>
                Engineered for <span className="text-brand-700">speed, quality, &amp; control</span>
              </>
            }
            description="Our developer hiring model empowers businesses to scale their engineering capacity quickly without heavy overheads."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((item, idx) => (
              <Reveal key={item.title} delay={idx + 1}>
                <div className="group flex h-full flex-col justify-between rounded-3xl border border-ink-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-md">
                  <div>
                    <span className="flex size-10 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                      <item.icon className="size-5" />
                    </span>
                    <h3 className="mt-5 font-display text-base font-bold text-ink-950">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-ink-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 03 — HOW IT WORKS */}
      <section className="border-t border-ink-100 bg-white py-14 sm:py-18 lg:py-22">
        <Container size="wide">
          <SectionHeading
            eyebrow="Simple Process"
            title={
              <>
                How <span className="text-brand-700">Developer Hiring</span> Works
              </>
            }
            description="Four straightforward steps to onboard dedicated engineers for your product."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, idx) => (
              <Reveal key={s.id} delay={idx + 1}>
                <div className="relative rounded-3xl border border-ink-200 bg-[var(--canvas-subtle)] p-6 shadow-2xs">
                  <span className="font-mono text-xs font-bold text-brand-700 uppercase tracking-widest">
                    Step {s.id}
                  </span>
                  <h3 className="mt-3 font-display text-base font-bold text-ink-950">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-ink-600">
                    {s.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 04 — DEVELOPER HIRE FORM */}
      <section id="request-form" className="border-t border-ink-100 bg-[var(--canvas-subtle)] py-14 sm:py-18 lg:py-22">
        <Container size="wide">
          <div className="max-w-4xl mx-auto">
            <SectionHeading
              eyebrow="Request Developers"
              title={
                <>
                  Submit Your <span className="text-brand-700">Hiring Requirement</span>
                </>
              }
              description="Fill out the requirement form below. Our technical resource management team will get back to you with shortlisted developer profiles."
            />

            <div className="mt-10">
              <HireDeveloperForm />
            </div>
          </div>
        </Container>
      </section>

      {/* 05 — FINAL CTA */}
      <section className="border-t border-ink-100 bg-white py-14 sm:py-18">
        <Container size="wide">
          <div className="rounded-3xl border border-brand-200 bg-gradient-to-r from-brand-50 via-white to-brand-50/50 p-8 sm:p-12 text-center shadow-sm">
            <h2 className="font-display text-2xl font-bold text-ink-950 sm:text-3xl">
              Need Developers for Your Project Immediately?
            </h2>
            <p className="mt-3 max-w-xl mx-auto text-sm text-ink-600 leading-relaxed">
              Talk directly with our technical resource team to discuss your project needs and get developers onboarded within 48 hours.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button href="#request-form" arrow>
                Request Developers
              </Button>
              <Button href="/contact" variant="secondary">
                Contact Sales Team
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
