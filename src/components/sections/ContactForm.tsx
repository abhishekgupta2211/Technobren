"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Check, Loader2, ShieldCheck, AlertCircle } from "lucide-react";
import { formOptions, contact } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-[0.92rem] text-ink-900 placeholder:text-ink-600 transition-colors duration-300 focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100";

const label = "block text-[0.82rem] font-medium text-ink-700";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const reduce = useReducedMotion();

  /**
   * No mail transport is wired up yet — the previous site posted to a PHP
   * handler that is not part of this rebuild. Until an endpoint exists we hand
   * the enquiry off to the visitor's mail client so nothing is silently lost.
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    const body = [
      `Name: ${get("name")}`,
      `Email: ${get("email")}`,
      `Mobile: ${get("mobile")}`,
      `Company: ${get("company")}`,
      `Service: ${get("service")}`,
      `Budget: ${get("budget")}`,
      `Timeline: ${get("timeline")}`,
      "",
      "Project details:",
      get("details"),
    ].join("\n");

    const href = `mailto:${contact.primaryEmail}?subject=${encodeURIComponent(
      `New project enquiry — ${get("name")}`,
    )}&body=${encodeURIComponent(body)}`;

    // Handing off to the mail client is fire-and-forget: it cannot report
    // success, so the confirmation below tells the visitor what to do if their
    // client did not open rather than claiming the message was sent.
    window.location.href = href;
    setStatus("sent");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative overflow-hidden rounded-2xl border border-ink-200 bg-white p-6 sm:p-7"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-[radial-gradient(circle,rgba(174,49,53,0.08),transparent_65%)] blur-2xl"
      />

      <div className="relative">
        <h2 className="font-display text-[1.5rem] text-ink-950">
          Let&rsquo;s discuss your idea
        </h2>
        <p className="mt-2 flex items-center gap-2 text-[0.83rem] text-ink-500">
          <ShieldCheck className="size-4 text-brand-600" aria-hidden />
          All projects are secured by NDA · 100% secure, zero spam
        </p>

        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <label className={label} htmlFor="name">
              Name <span className="text-brand-600">*</span>
            </label>
            <input
              id="name"
              name="name"
              required
              autoComplete="name"
              placeholder="Your full name"
              className={field}
            />
          </div>

          <div className="space-y-2">
            <label className={label} htmlFor="email">
              Email <span className="text-brand-600">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              className={field}
            />
          </div>

          <div className="space-y-2">
            <label className={label} htmlFor="mobile">
              Mobile
            </label>
            <input
              id="mobile"
              name="mobile"
              type="tel"
              autoComplete="tel"
              placeholder="+91 00000 00000"
              className={field}
            />
          </div>

          <div className="space-y-2">
            <label className={label} htmlFor="company">
              Company
            </label>
            <input
              id="company"
              name="company"
              autoComplete="organization"
              placeholder="Company name"
              className={field}
            />
          </div>

          <div className="space-y-2">
            <label className={label} htmlFor="service">
              Service required
            </label>
            <select
              id="service"
              name="service"
              className={cn(field, "appearance-none")}
            >
              <option value="">Select a service</option>
              {formOptions.services.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className={label} htmlFor="budget">
              Budget range
            </label>
            <select id="budget" name="budget" className={cn(field, "appearance-none")}>
              <option value="">Select your budget</option>
              {formOptions.budgets.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label className={label} htmlFor="timeline">
              When would you like to start?
            </label>
            <select
              id="timeline"
              name="timeline"
              className={cn(field, "appearance-none")}
            >
              <option value="">Select a timeline</option>
              {formOptions.timelines.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label className={label} htmlFor="details">
              Project details <span className="text-brand-600">*</span>
            </label>
            <textarea
              id="details"
              name="details"
              required
              rows={5}
              placeholder="Tell us what you're trying to build, the problem it solves and anything already in place."
              className={cn(field, "resize-y")}
            />
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Button type="submit" size="lg" arrow disabled={status === "sending"}>
            {status === "sending" ? (
              <span className="flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" aria-hidden />
                Preparing…
              </span>
            ) : (
              "Send Enquiry"
            )}
          </Button>

          <p className="text-[0.78rem] leading-relaxed text-ink-600">
            Prefer email?{" "}
            <a
              href={`mailto:${contact.primaryEmail}`}
              className="font-medium text-brand-700 underline underline-offset-4"
            >
              {contact.primaryEmail}
            </a>
          </p>
        </div>

        <AnimatePresence>
          {status === "sent" && (
            <motion.p
              role="status"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-5 flex items-start gap-2.5 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-[0.86rem] text-brand-900"
            >
              <Check className="mt-0.5 size-4 shrink-0" aria-hidden />
              If your mail client did not open, email your enquiry directly to{" "}
              {contact.primaryEmail} — we reply to every message.
            </motion.p>
          )}
          {status === "error" && (
            <motion.p
              role="alert"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-5 flex items-start gap-2.5 rounded-xl border border-ink-200 bg-ink-50 px-4 py-3 text-[0.86rem] text-ink-700"
            >
              <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
              Something went wrong. Please email {contact.primaryEmail} directly.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
