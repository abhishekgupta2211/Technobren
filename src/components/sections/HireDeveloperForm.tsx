"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  Check,
  Loader2,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Users,
  Code2,
  Building2,
  FileText,
  Paperclip,
} from "lucide-react";
import { techCategories, hireRoles, formOptions } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

// Flatten technology list dynamically from techCategories & hireRoles to ensure single source of truth
const ALL_TECH_ITEMS = Array.from(
  new Set([
    ...techCategories.flatMap((c) => c.items),
    ...hireRoles.map((r) => r.replace(" Developers", "").replace(" App", "")),
    "Flutter",
    "React Native",
    "ReactJS",
    "Node.js",
    "Python",
    "PHP",
    "Laravel",
    ".NET",
    "Android",
    "iOS",
    "VueJS",
    "AngularJS",
  ])
).sort();

const DEV_TYPES = [
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "Mobile App Developer",
  "UI/UX Developer",
  "QA / Testing Engineer",
  "DevOps Engineer",
  "AI & ML Engineer",
];

const NUM_DEVELOPERS = [
  "1 Developer",
  "2–5 Developers",
  "6–10 Developers",
  "10+ Developers",
];

const EXPERIENCE_OPTIONS = [
  "Fresher",
  "1–2 Years",
  "2–4 Years",
  "4–6 Years",
  "6+ Years",
  "Any Experience",
];

const ENGAGEMENT_TYPES = [
  "Full Time",
  "Part Time",
  "Contract",
  "Project Based",
  "Dedicated Development Team",
];

const WORK_MODES = ["Remote", "On-site", "Hybrid"];

const TIMELINES = [
  "Immediately",
  "Within 1 Week",
  "Within 1 Month",
  "1–3 Months",
  "Not Decided Yet",
];

const FIELD =
  "w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-[0.92rem] text-ink-900 shadow-[inset_0_1px_2px_rgba(16,15,20,0.03)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] placeholder:text-ink-400 hover:border-ink-300 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-100";

function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-[0.82rem] font-medium text-ink-700"
    >
      {children}
      {required && <span className="ml-0.5 text-brand-600">*</span>}
    </label>
  );
}

export function HireDeveloperForm() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");
  const reduce = useReducedMotion();

  // Form state
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    workEmail: "",
    phone: "",
    companyWebsite: "",
    technologies: [] as string[],
    developerType: [] as string[],
    numDevelopers: "1 Developer",
    experience: "2–4 Years",
    engagementType: ["Full Time"],
    workMode: "Remote",
    hiringTimeline: "Immediately",
    budget: formOptions.budgets[1],
    requirementDetails: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const toggleArrayItem = (key: "technologies" | "developerType" | "engagementType", item: string) => {
    setFormData((prev) => {
      const list = prev[key];
      const exists = list.includes(item);
      const updated = exists ? list.filter((x) => x !== item) : [...list, item];
      return { ...prev, [key]: updated };
    });
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const validateStep = (currentStep: number) => {
    const errs: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.companyName.trim()) errs.companyName = "Company name is required";
      if (!formData.contactPerson.trim()) errs.contactPerson = "Contact person is required";
      if (!formData.workEmail.trim()) {
        errs.workEmail = "Work email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workEmail)) {
        errs.workEmail = "Valid email address is required";
      }
      if (!formData.phone.trim()) errs.phone = "Phone number is required";
    }

    if (currentStep === 2) {
      if (formData.technologies.length === 0) {
        errs.technologies = "Select at least 1 technology";
      }
      if (formData.developerType.length === 0) {
        errs.developerType = "Select at least 1 developer role";
      }
    }

    if (currentStep === 3) {
      if (!formData.requirementDetails.trim()) {
        errs.requirementDetails = "Please describe your developer requirement";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 4) as any);
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1) as any);
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setStatus("submitting");

    const payload = {
      enquiry_type: "developer_hiring",
      ...formData,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("sent");
      } else {
        setStatus("sent");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("sent");
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-ink-200 bg-white shadow-(--shadow-card)">
      {/* Step Header Indicator */}
      <div className="border-b border-ink-100 bg-[var(--canvas-subtle)] px-6 py-6 sm:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-xl font-bold text-ink-950 sm:text-2xl">
              Request Dedicated Developers
            </h2>
            <p className="mt-1 text-xs text-ink-600">
              Step {step} of 4 — {step === 1 && "Company Info"}
              {step === 2 && "Developer & Tech Requirements"}
              {step === 3 && "Engagement & Project Details"}
              {step === 4 && "Review & Submit"}
            </p>
          </div>
          <span className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1 font-mono text-xs font-semibold text-brand-700">
            B2B Hiring
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                i <= step ? "bg-brand-600" : "bg-ink-200"
              )}
            />
          ))}
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {status === "sent" ? (
          <div className="py-10 text-center">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <Check className="size-8" />
            </div>
            <h3 className="mt-6 font-display text-2xl font-bold text-ink-950">
              Your Developer Request Has Been Submitted!
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm text-ink-600 leading-relaxed">
              Thank you for sharing your requirements with TechnoBren Infotech. Our technical account team will review your request and contact you within 24 hours.
            </p>
            <div className="mt-8">
              <Button href="/" arrow>
                Back to Website
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* STEP 1: COMPANY INFO */}
            {step === 1 && (
              <motion.div
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35 }}
                className="space-y-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="companyName" required>
                      Company Name
                    </Label>
                    <input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => updateField("companyName", e.target.value)}
                      placeholder="e.g. Acme Corporation"
                      className={FIELD}
                    />
                    {errors.companyName && (
                      <p className="mt-1 text-xs text-brand-600">{errors.companyName}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="contactPerson" required>
                      Contact Person
                    </Label>
                    <input
                      id="contactPerson"
                      value={formData.contactPerson}
                      onChange={(e) => updateField("contactPerson", e.target.value)}
                      placeholder="Your full name"
                      className={FIELD}
                    />
                    {errors.contactPerson && (
                      <p className="mt-1 text-xs text-brand-600">{errors.contactPerson}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="workEmail" required>
                      Work Email
                    </Label>
                    <input
                      id="workEmail"
                      type="email"
                      value={formData.workEmail}
                      onChange={(e) => updateField("workEmail", e.target.value)}
                      placeholder="name@company.com"
                      className={FIELD}
                    />
                    {errors.workEmail && (
                      <p className="mt-1 text-xs text-brand-600">{errors.workEmail}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone" required>
                      Phone Number
                    </Label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      placeholder="+91 00000 00000"
                      className={FIELD}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-brand-600">{errors.phone}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="companyWebsite">Company Website (Optional)</Label>
                    <input
                      id="companyWebsite"
                      value={formData.companyWebsite}
                      onChange={(e) => updateField("companyWebsite", e.target.value)}
                      placeholder="https://company.com"
                      className={FIELD}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: TECH & DEV TYPE REQUIREMENTS */}
            {step === 2 && (
              <motion.div
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                <div>
                  <Label htmlFor="technologies" required>
                    Select Required Technologies (Select one or multiple)
                  </Label>
                  {errors.technologies && (
                    <p className="mb-2 text-xs text-brand-600">{errors.technologies}</p>
                  )}
                  <div className="flex flex-wrap gap-2 max-h-56 overflow-y-auto p-1 border border-ink-100 rounded-2xl bg-ink-50/40 p-3">
                    {ALL_TECH_ITEMS.map((t) => {
                      const selected = formData.technologies.includes(t);
                      return (
                        <button
                          key={t}
                          type="button"
                          onClick={() => toggleArrayItem("technologies", t)}
                          className={cn(
                            "rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-200",
                            selected
                              ? "border-brand-600 bg-brand-600 text-white shadow-xs"
                              : "border-ink-200 bg-white text-ink-700 hover:border-brand-300 hover:text-brand-700"
                          )}
                        >
                          {selected ? "✓ " : "+ "}
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <Label htmlFor="developerType" required>
                    Developer Type / Role Required
                  </Label>
                  {errors.developerType && (
                    <p className="mb-2 text-xs text-brand-600">{errors.developerType}</p>
                  )}
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {DEV_TYPES.map((dt) => {
                      const selected = formData.developerType.includes(dt);
                      return (
                        <button
                          key={dt}
                          type="button"
                          onClick={() => toggleArrayItem("developerType", dt)}
                          className={cn(
                            "flex items-center justify-between rounded-xl border p-3 text-left text-xs font-semibold transition-all",
                            selected
                              ? "border-brand-500 bg-brand-50 text-brand-900 shadow-2xs"
                              : "border-ink-200 bg-white text-ink-800 hover:border-ink-300"
                          )}
                        >
                          <span>{dt}</span>
                          <span
                            className={cn(
                              "flex size-4 items-center justify-center rounded-full text-[0.65rem]",
                              selected ? "bg-brand-600 text-white" : "border border-ink-300"
                            )}
                          >
                            {selected ? "✓" : ""}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="numDevelopers">How many developers do you need?</Label>
                    <select
                      id="numDevelopers"
                      value={formData.numDevelopers}
                      onChange={(e) => updateField("numDevelopers", e.target.value)}
                      className={FIELD}
                    >
                      {NUM_DEVELOPERS.map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="experience">Required Experience</Label>
                    <select
                      id="experience"
                      value={formData.experience}
                      onChange={(e) => updateField("experience", e.target.value)}
                      className={FIELD}
                    >
                      {EXPERIENCE_OPTIONS.map((ex) => (
                        <option key={ex} value={ex}>
                          {ex}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: ENGAGEMENT & PROJECT DETAILS */}
            {step === 3 && (
              <motion.div
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                <div>
                  <Label htmlFor="engagementType">Engagement Type</Label>
                  <div className="flex flex-wrap gap-2">
                    {ENGAGEMENT_TYPES.map((et) => {
                      const selected = formData.engagementType.includes(et);
                      return (
                        <button
                          key={et}
                          type="button"
                          onClick={() => toggleArrayItem("engagementType", et)}
                          className={cn(
                            "rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all",
                            selected
                              ? "border-brand-600 bg-brand-600 text-white"
                              : "border-ink-200 bg-white text-ink-700 hover:border-brand-300"
                          )}
                        >
                          {selected ? "✓ " : ""}
                          {et}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-3">
                  <div>
                    <Label htmlFor="workMode">Work Mode</Label>
                    <select
                      id="workMode"
                      value={formData.workMode}
                      onChange={(e) => updateField("workMode", e.target.value)}
                      className={FIELD}
                    >
                      {WORK_MODES.map((wm) => (
                        <option key={wm} value={wm}>
                          {wm}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="hiringTimeline">Hiring Timeline</Label>
                    <select
                      id="hiringTimeline"
                      value={formData.hiringTimeline}
                      onChange={(e) => updateField("hiringTimeline", e.target.value)}
                      className={FIELD}
                    >
                      {TIMELINES.map((tl) => (
                        <option key={tl} value={tl}>
                          {tl}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="budget">Expected Budget (Optional)</Label>
                    <select
                      id="budget"
                      value={formData.budget}
                      onChange={(e) => updateField("budget", e.target.value)}
                      className={FIELD}
                    >
                      {formOptions.budgets.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="requirementDetails" required>
                    Tell us about your requirement
                  </Label>
                  <textarea
                    id="requirementDetails"
                    rows={5}
                    value={formData.requirementDetails}
                    onChange={(e) => updateField("requirementDetails", e.target.value)}
                    placeholder="Describe your project, required skills, responsibilities, preferred experience, timeline, or any other important details…"
                    className={cn(FIELD, "resize-y")}
                  />
                  {errors.requirementDetails && (
                    <p className="mt-1 text-xs text-brand-600">{errors.requirementDetails}</p>
                  )}
                  <p className="mt-2 flex items-center gap-1.5 text-[0.76rem] text-ink-500">
                    <Paperclip className="size-3.5" aria-hidden />
                    Have a Job Description (JD)? You can also email documents to hr@technobren.com
                  </p>
                </div>
              </motion.div>
            )}

            {/* STEP 4: REVIEW & SUBMIT */}
            {step === 4 && (
              <motion.div
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                <div className="rounded-2xl border border-ink-200 bg-ink-50/50 p-6 space-y-4">
                  <h4 className="font-display text-base font-bold text-ink-950 border-b border-ink-200 pb-3">
                    Review Your Requirement Summary
                  </h4>

                  <div className="grid gap-3 sm:grid-cols-2 text-xs">
                    <div>
                      <span className="text-ink-400 block">Company Name:</span>
                      <span className="font-semibold text-ink-900">{formData.companyName}</span>
                    </div>
                    <div>
                      <span className="text-ink-400 block">Contact Person:</span>
                      <span className="font-semibold text-ink-900">{formData.contactPerson}</span>
                    </div>
                    <div>
                      <span className="text-ink-400 block">Work Email:</span>
                      <span className="font-semibold text-ink-900">{formData.workEmail}</span>
                    </div>
                    <div>
                      <span className="text-ink-400 block">Phone Number:</span>
                      <span className="font-semibold text-ink-900">{formData.phone}</span>
                    </div>
                    {formData.companyWebsite && (
                      <div className="sm:col-span-2">
                        <span className="text-ink-400 block">Website:</span>
                        <span className="font-semibold text-ink-900">{formData.companyWebsite}</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-ink-200 pt-3 space-y-2 text-xs">
                    <div>
                      <span className="text-ink-400 block mb-1">Selected Technologies:</span>
                      <div className="flex flex-wrap gap-1">
                        {formData.technologies.map((t) => (
                          <span key={t} className="rounded bg-brand-100 border border-brand-200 px-2 py-0.5 font-semibold text-brand-800">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-2 sm:grid-cols-2 pt-2">
                      <div>
                        <span className="text-ink-400 block">Developer Type:</span>
                        <span className="font-semibold text-ink-900">{formData.developerType.join(", ")}</span>
                      </div>
                      <div>
                        <span className="text-ink-400 block">Developers Required:</span>
                        <span className="font-semibold text-ink-900">{formData.numDevelopers}</span>
                      </div>
                      <div>
                        <span className="text-ink-400 block">Experience:</span>
                        <span className="font-semibold text-ink-900">{formData.experience}</span>
                      </div>
                      <div>
                        <span className="text-ink-400 block">Engagement:</span>
                        <span className="font-semibold text-ink-900">{formData.engagementType.join(", ")}</span>
                      </div>
                      <div>
                        <span className="text-ink-400 block">Work Mode:</span>
                        <span className="font-semibold text-ink-900">{formData.workMode}</span>
                      </div>
                      <div>
                        <span className="text-ink-400 block">Timeline:</span>
                        <span className="font-semibold text-ink-900">{formData.hiringTimeline}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-ink-200 pt-3 text-xs">
                    <span className="text-ink-400 block mb-1">Requirement Details:</span>
                    <p className="rounded-xl bg-white p-3 border border-ink-200 text-ink-800 leading-relaxed">
                      {formData.requirementDetails}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* NAVIGATION BUTTONS */}
            <div className="mt-8 flex items-center justify-between border-t border-ink-100 pt-6">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-600 hover:text-ink-950"
                >
                  <ChevronLeft className="size-4" /> Edit Details
                </button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <Button type="button" onClick={handleNext} size="md" arrow>
                  Continue
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  size="lg"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="size-4 animate-spin" /> Submitting Request...
                    </span>
                  ) : (
                    "Submit Request"
                  )}
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
