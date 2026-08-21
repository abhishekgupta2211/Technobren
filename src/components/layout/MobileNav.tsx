"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Mail, Phone, ArrowUpRight } from "lucide-react";
import { navigation, contact } from "@/lib/site";
import { Button } from "@/components/ui/Button";

type Props = { open: boolean; setOpen: (v: boolean) => void };

/** The hamburger. Lives inside the navbar pill. */
export function MobileMenuButton({ open, setOpen }: Props) {
  return (
    <button
      type="button"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      aria-controls="mobile-menu"
      onClick={() => setOpen(!open)}
      className="relative flex size-11 items-center justify-center rounded-full border border-ink-200 bg-ink-50 transition-colors duration-300 hover:border-ink-300 hover:bg-ink-100 lg:hidden"
    >
      <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      <span className="flex h-3.5 w-[18px] flex-col justify-between">
        <motion.span
          animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="block h-[1.5px] w-full origin-center rounded-full bg-ink-900"
        />
        <motion.span
          animate={open ? { opacity: 0, x: -6 } : { opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="block h-[1.5px] w-full rounded-full bg-ink-900"
        />
        <motion.span
          animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="block h-[1.5px] w-full origin-center rounded-full bg-ink-900"
        />
      </span>
    </button>
  );
}

/**
 * The sheet.
 *
 * Rendered as a sibling of the navbar pill, never inside it: the pill carries
 * `backdrop-blur`, and a backdrop-filter makes an element the containing block
 * for its fixed-position descendants — which collapsed this sheet to the height
 * of the pill instead of the viewport.
 */
export function MobileMenuSheet({ open, setOpen }: Props) {
  const reduce = useReducedMotion();
  const sheetRef = useRef<HTMLDivElement>(null);

  // Lock body scroll while the sheet covers the page.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Escape closes, and Tab stays inside the sheet while it is open.
  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;

    const focusables = () =>
      Array.from(
        sheetRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );

    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [open, setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          ref={sheetRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.15 : 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto overscroll-contain bg-white pt-[6.5rem] lg:hidden"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_60%_100%_at_80%_0%,rgba(174,49,53,0.1),transparent_70%)]"
          />

          <motion.nav
            aria-label="Mobile"
            className="relative flex-1 px-5 pb-10"
            initial={reduce ? false : { y: -14 }}
            animate={{ y: 0 }}
            transition={{ duration: reduce ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <ul className="flex flex-col">
              {navigation.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.05 + i * 0.045,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="border-b border-ink-100"
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between py-3.5 font-display text-[1.3rem] text-ink-950"
                  >
                    {item.label}
                    <ArrowUpRight
                      aria-hidden
                      className="size-5 text-ink-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-600"
                    />
                  </Link>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 space-y-3"
            >
              <Button href="/contact" size="lg" arrow className="w-full">
                Start a Project
              </Button>
              <div className="grid gap-2 pt-1">
                <a
                  href={`mailto:${contact.primaryEmail}`}
                  className="flex items-center gap-3 rounded-xl border border-ink-200 px-4 py-3 text-[0.88rem] text-ink-700"
                >
                  <Mail className="size-4 shrink-0 text-brand-600" aria-hidden />
                  {contact.primaryEmail}
                </a>
                <a
                  href={`tel:${contact.primaryPhone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 rounded-xl border border-ink-200 px-4 py-3 text-[0.88rem] text-ink-700"
                >
                  <Phone className="size-4 shrink-0 text-brand-600" aria-hidden />
                  {contact.primaryPhone}
                </a>
              </div>
            </motion.div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
