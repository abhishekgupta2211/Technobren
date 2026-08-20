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
        <nav
          aria-label="Main"
          className={cn(
            "relative z-50 flex items-center justify-between gap-4 rounded-full border py-2 pl-4 pr-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:pl-5",
            scrolled || mobileOpen
              ? "border-ink-200/70 bg-white/[0.92] shadow-[0_6px_22px_-14px_rgba(16,15,20,0.18)] backdrop-blur-xl backdrop-saturate-150"
              : "border-ink-200/60 bg-white/80 shadow-[0_1px_2px_rgba(16,15,20,0.03),0_8px_22px_-18px_rgba(16,15,20,0.2)] backdrop-blur-xl",
          )}
        >
          <Logo preload className="relative z-[60] shrink-0" />

          {/* ---------- Desktop nav ---------- */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative block rounded-full px-3.5 py-2 text-[0.86rem] font-medium transition-colors duration-300",
                      active ? "text-brand-700" : "text-ink-600 hover:text-ink-950",
                    )}
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        aria-hidden
                        transition={
                          reduce
                            ? { duration: 0 }
                            : { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
                        }
                        className="absolute bottom-0.5 left-1/2 h-[2px] w-5 -translate-x-1/2 rounded-full bg-brand-600"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ---------- Right actions ---------- */}
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={`mailto:${contact.primaryEmail}`}
              className="hidden rounded-full px-3 py-2 text-[0.82rem] font-medium text-ink-500 transition-colors duration-300 hover:text-brand-700 2xl:block"
            >
              {contact.primaryEmail}
            </a>
            <Button
              href="/contact"
              size="sm"
              arrow
              className="hidden rounded-full px-5 sm:inline-flex"
            >
              Start a Project
            </Button>
            <MobileMenuButton open={mobileOpen} setOpen={setMobileOpen} />
          </div>
        </nav>
      </Container>

      <MobileMenuSheet open={mobileOpen} setOpen={setMobileOpen} />
    </header>
  );
}
