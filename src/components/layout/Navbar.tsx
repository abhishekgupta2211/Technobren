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
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const pathname = usePathname();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
            "group relative z-50 flex items-center justify-between gap-4 rounded-full border py-2 pl-4 pr-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:pl-5 overflow-hidden",
            scrolled || mobileOpen
              ? "border-ink-200/80 bg-white/[0.94] shadow-[0_10px_35px_-10px_rgba(174,49,53,0.15),0_4px_20px_-4px_rgba(16,15,20,0.1)] backdrop-blur-xl backdrop-saturate-150"
              : "border-ink-200/60 bg-white/85 shadow-[0_2px_15px_-4px_rgba(16,15,20,0.06),0_12px_28px_-15px_rgba(174,49,53,0.08)] backdrop-blur-xl",
          )}
        >
          {/* Continuous rotating/flowing gradient light beam around navbar bottom */}
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "linear",
            }}
            className="pointer-events-none absolute -bottom-px left-0 h-[1.5px] w-1/3 bg-gradient-to-r from-transparent via-brand-500 to-transparent"
          />

          <Logo preload className="relative z-[60] shrink-0 transition-transform duration-300 hover:scale-[1.03]" />

          {/* ---------- Desktop nav with interactive hover & active pill ---------- */}
          <ul
            onMouseLeave={() => setHoveredPath(null)}
            className="hidden items-center gap-1 lg:flex"
          >
            {navigation.map((item) => {
              const active = isActive(item.href);
              const isHovered = hoveredPath === item.href;

              return (
                <li key={item.label} className="relative">
                  <Link
                    href={item.href}
                    onMouseEnter={() => setHoveredPath(item.href)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative block rounded-full px-4 py-2 text-[0.86rem] font-medium transition-colors duration-200",
                      active
                        ? "text-brand-700 font-semibold"
                        : "text-ink-600 hover:text-ink-950",
                    )}
                  >
                    {/* Hover animated expanding line (small to full width) */}
                    {isHovered && !active && (
                      <motion.span
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        exit={{ scaleX: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute bottom-1 left-2.5 right-2.5 h-[2px] rounded-full bg-brand-400/60"
                      />
                    )}

                    {/* Active animated line (starts small in center & expands smoothly to cover full text width) */}
                    {active && (
                      <motion.span
                        layoutId="nav-active-full-line"
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={
                          reduce
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 350, damping: 26 }
                        }
                        className="absolute bottom-0.5 left-2.5 right-2.5 h-[2.5px] rounded-full bg-gradient-to-r from-brand-600 via-brand-500 to-brand-600 shadow-[0_2px_8px_rgba(174,49,53,0.4)]"
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
              className="hidden rounded-full px-5 shadow-md shadow-brand-600/15 transition-all duration-300 hover:shadow-lg hover:shadow-brand-600/30 hover:scale-[1.02] active:scale-[0.98] sm:inline-flex"
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
