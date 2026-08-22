"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The floating return-to-top control.
 *
 * Not a plain button: the ring around it is the page's reading progress, so the
 * control answers "how much is left?" as well as "take me back". That is the
 * same job the hairline bar under the navbar does, restated where the pointer
 * already is on a long page.
 *
 * Appears only once there is a meaningful distance to scroll back, and hands
 * the scroll to Lenis when it is driving, so the return matches the easing of
 * every other scroll on the site.
 *
 * Always mounted, shown and hidden with CSS rather than by mounting: this
 * project has hit AnimatePresence failing to complete an exit four times now,
 * and a control that refuses to disappear is worse than one that never
 * animated. Inert while hidden, so it cannot swallow clicks.
 */

const R = 21;
const CIRCUMFERENCE = 2 * Math.PI * R;
/** Far enough down that the control is useful rather than in the way. */
const SHOW_AFTER = 700;

export function ScrollToTop() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(window.scrollY > SHOW_AFTER);
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const toTop = () => {
    // Lenis owns the scroll on pointer-fine devices; going around it would
    // fight the smoothing rather than ride it.
    if (window.__lenis) window.__lenis.scrollTo(0, { duration: reduce ? 0 : 1.1 });
    else window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={cn(
        "group fixed bottom-5 right-5 z-[60] flex size-12 items-center justify-center rounded-full border border-ink-200/80 bg-white/90 shadow-[0_8px_28px_-10px_rgba(16,15,20,0.28),0_2px_8px_-4px_rgba(174,49,53,0.25)] backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-brand-300 hover:shadow-[0_14px_34px_-12px_rgba(174,49,53,0.45)] sm:bottom-8 sm:right-8 sm:size-[3.25rem]",
        visible
          ? "translate-y-0 scale-100 opacity-100 hover:-translate-y-1"
          : "pointer-events-none translate-y-4 scale-90 opacity-0",
      )}
    >
      {/* Reading progress, drawn around the edge. */}
      <svg
        aria-hidden
        viewBox="0 0 48 48"
        className="pointer-events-none absolute inset-0 size-full -rotate-90"
        fill="none"
      >
        <circle cx="24" cy="24" r={R} stroke="#efedea" strokeWidth="2.5" />
        <circle
          cx="24"
          cy="24"
          r={R}
          stroke="#ae3135"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
          style={{ transition: "stroke-dashoffset 120ms linear" }}
        />
      </svg>

      {/* The brand disc fills in from below on hover. */}
      <span
        aria-hidden
        className="absolute inset-1.5 origin-bottom scale-0 rounded-full bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100"
      />
      <ArrowUp
        aria-hidden
        className="relative size-[1.15rem] text-brand-700 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:text-white"
      />
    </button>
  );
}
