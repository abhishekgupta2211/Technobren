"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "motion/react";
import { Check, Loader2, ShieldCheck, ChevronDown, Paperclip } from "lucide-react";
import { formOptions, contact } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent";

const FIELD =
  "peer w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-[0.92rem] text-ink-900 shadow-[inset_0_1px_2px_rgba(16,15,20,0.03)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] placeholder:text-ink-400 hover:border-ink-300 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-100";

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
      className="mb-2 block text-[0.8rem] font-medium text-ink-700"
    >
      {children}
      {required && <span className="ml-0.5 text-brand-600">*</span>}
    </label>
  );
}

/** A select that still looks like one — the native arrow is suppressed. */
function Select({
  id,
  name,
  placeholder,
  options,
}: {
  id: string;
  name: string;
  placeholder: string;
  options: readonly string[];
}) {
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        defaultValue=""
        className={cn(FIELD, "appearance-none pr-11")}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-ink-500 transition-colors duration-300 peer-focus:text-brand-600"
      />
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const reduce = useReducedMotion();

  const group: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.05 } },
  };
  const field: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.2 : 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  /**
   * No mail transport is wired up yet — the previous site posted to a PHP
   * handler that is not part of this rebuild. Until an endpoint exists the
   * enquiry is handed to the visitor's mail client so nothing is lost.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    const payload = {
      name: get("name"),
      email: get("email"),
      mobile: get("mobile"),
      company: get("company"),
      service: get("service"),
      budget: get("budget"),
      timeline: get("timeline"),
      details: get("details"),
    };

    try {
      // 1. Save submission to API route
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // 2. Prepare pre-formatted WhatsApp text message (100% FREE Direct Integration)
      const messageText = `📩 *NEW PROJECT ENQUIRY (TechnoBren)*\n\n` +
        `👤 *Name:* ${payload.name}\n` +
        `📧 *Email:* ${payload.email}\n` +
        `📱 *Mobile:* ${payload.mobile || "N/A"}\n` +
        `🏢 *Company:* ${payload.company || "N/A"}\n` +
        `🛠️ *Service:* ${payload.service || "N/A"}\n` +
        `💰 *Budget:* ${payload.budget || "N/A"}\n` +
        `⏱️ *Timeline:* ${payload.timeline || "N/A"}\n\n` +
        `📝 *Details:* ${payload.details}`;

      const companyWhatsapp = "919305365576";
      const waUrl = `https://wa.me/${companyWhatsapp}?text=${encodeURIComponent(messageText)}`;

      // Open WhatsApp chat pre-filled with formatted inquiry message
      window.open(waUrl, "_blank");

      setStatus("sent");
      e.currentTarget.reset();
    } catch (err) {
      console.error("API submission error:", err);
      setStatus("sent");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative overflow-hidden rounded-3xl border border-ink-200 bg-white shadow-(--shadow-card)"
    >
      {/* ---- Header ---- */}
      <div className="relative overflow-hidden border-b border-ink-100 bg-[var(--canvas-subtle)] px-6 py-6 sm:px-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full bg-[radial-gradient(circle,rgba(174,49,53,0.12),transparent_65%)] blur-2xl"
        />
        <div className="relative">
          <h2 className="font-display text-[1.5rem] text-ink-950 sm:text-[1.7rem]">
            Let&rsquo;s discuss your idea
          </h2>
          <p className="mt-2 flex items-center gap-2 text-[0.83rem] text-ink-600">
            <ShieldCheck className="size-4 shrink-0 text-brand-600" aria-hidden />
            All projects are secured by an NDA · 100% secure, zero spam
          </p>
        </div>
      </div>

      {/* ---- Fields ---- */}
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10%" }}
        className="px-6 py-7 sm:px-8"
      >
        <motion.p
          variants={field}
          className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-ink-500"
        >
          About you
        </motion.p>

        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <motion.div variants={field}>
            <Label htmlFor="name" required>
              Name
            </Label>
            <input
              id="name"
              name="name"
              required
              autoComplete="name"
              placeholder="Your full name"
              className={FIELD}
            />
          </motion.div>

          <motion.div variants={field}>
            <Label htmlFor="email" required>
              Email
            </Label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              className={FIELD}
            />
          </motion.div>

          <motion.div variants={field}>
            <Label htmlFor="mobile">Mobile</Label>
            <input
              id="mobile"
              name="mobile"
              type="tel"
              autoComplete="tel"
              placeholder="+91 00000 00000"
              className={FIELD}
            />
          </motion.div>

          <motion.div variants={field}>
            <Label htmlFor="company">Company</Label>
            <input
              id="company"
              name="company"
              autoComplete="organization"
              placeholder="Company name"
              className={FIELD}
            />
          </motion.div>
        </div>

        <motion.p
          variants={field}
          className="mt-8 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-ink-500"
        >
          About the project
        </motion.p>

        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <motion.div variants={field}>
            <Label htmlFor="service">Service required</Label>
            <Select
              id="service"
              name="service"
              placeholder="Select a service"
              options={formOptions.services}
            />
          </motion.div>

          <motion.div variants={field}>
            <Label htmlFor="budget">Budget range</Label>
            <Select
              id="budget"
              name="budget"
              placeholder="Select your budget"
              options={formOptions.budgets}
            />
          </motion.div>

          <motion.div variants={field} className="sm:col-span-2">
            <Label htmlFor="timeline">When would you like to start?</Label>
            <Select
              id="timeline"
              name="timeline"
              placeholder="Select a timeline"
              options={formOptions.timelines}
            />
          </motion.div>

          <motion.div variants={field} className="sm:col-span-2">
            <Label htmlFor="details" required>
              Project details
            </Label>
            <textarea
              id="details"
              name="details"
              required
              rows={5}
              placeholder="Tell us what you're trying to build, the problem it solves and anything already in place."
              className={cn(FIELD, "resize-y")}
            />
            <p className="mt-2 flex items-center gap-1.5 text-[0.76rem] text-ink-500">
              <Paperclip className="size-3.5" aria-hidden />
              Have a brief or wireframes? Attach them to the email that opens.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* ---- Submit ---- */}
      <div className="border-t border-ink-100 bg-[var(--canvas-subtle)] px-6 py-5 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="submit"
            size="lg"
            arrow
            disabled={status === "sending"}
            className="w-full sm:w-auto"
          >
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
              className="font-medium text-brand-700 underline underline-offset-4 transition-colors duration-300 hover:text-brand-800"
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
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 flex items-center gap-2.5 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3.5 text-[0.92rem] font-semibold text-emerald-900 shadow-sm"
            >
              <Check className="size-5 shrink-0 text-emerald-600" aria-hidden />
              <span>Your Enquiry Sent Successfully! Our team will reach out to you shortly.</span>
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
