"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { navigation, contact } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { MobileMenuButton, MobileMenuSheet } from "./MobileNav";
import { cn } from "@/lib/utils";

/**
 * A floating pill navbar.
 *
 * Every entry is a plain link to its own page — no dropdowns — so a click always
 * lands somewhere rather than opening a menu. The pill is a white surface, which
 * also gives the logo the background its artwork was drawn for at every scroll
 * position, without altering the artwork.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile sheet on route change. Adjusting state during render is the
  // supported pattern here — an effect would paint once with the sheet still open.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMobileOpen(false);
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        scrolled ? "pt-2.5" : "pt-4 sm:pt-5",
      )}
    >
      <Container size="wide">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Main"
          className={cn(
            "relative z-50 flex items-center justify-between gap-4 rounded-full border py-2 pl-4 pr-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:pl-5",
            scrolled || mobileOpen
              ? "border-ink-200/80 bg-white/[0.94] shadow-[0_10px_30px_-10px_rgba(174,49,53,0.12),0_4px_16px_-4px_rgba(16,15,20,0.12)] backdrop-blur-xl backdrop-saturate-150"
              : "border-ink-200/60 bg-white/85 shadow-[0_2px_15px_-4px_rgba(16,15,20,0.06),0_12px_28px_-15px_rgba(174,49,53,0.08)] backdrop-blur-xl",
          )}
        >
          {/* Subtle animated background gradient glow line */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-8 -bottom-px h-px bg-gradient-to-r from-transparent via-brand-500/40 to-transparent transition-opacity duration-500"
          />

          <Logo preload className="relative z-[60] shrink-0 transition-transform duration-300 hover:scale-[1.02]" />

          {/* ---------- Desktop nav with animated floating pill ---------- */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative block rounded-full px-4 py-2 text-[0.86rem] font-medium transition-all duration-300",
                      active
                        ? "text-brand-700 font-semibold"
                        : "text-ink-600 hover:text-ink-950",
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active-pill"
                        aria-hidden
                        transition={
                          reduce
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 380, damping: 30 }
                        }
                        className="absolute inset-0 z-0 rounded-full border border-brand-200/80 bg-gradient-to-b from-brand-50/80 to-brand-100/40 shadow-xs"
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ---------- Right actions ---------- */}
          <div className="flex shrink-0 items-center gap-2.5">
            <a
              href={`mailto:${contact.primaryEmail}`}
              className="hidden rounded-full px-3.5 py-2 text-[0.82rem] font-medium text-ink-600 transition-colors duration-300 hover:text-brand-700 2xl:block"
            >
              {contact.primaryEmail}
            </a>
            <Button
              href="/contact"
              size="sm"
              arrow
              className="hidden rounded-full px-5 shadow-md shadow-brand-600/15 transition-all duration-300 hover:shadow-lg hover:shadow-brand-600/25 hover:-translate-y-0.5 sm:inline-flex"
            >
              Start a Project
            </Button>
            <MobileMenuButton open={mobileOpen} setOpen={setMobileOpen} />
          </div>
        </motion.nav>
      </Container>

      <MobileMenuSheet open={mobileOpen} setOpen={setMobileOpen} />
    </header>
  );
}
