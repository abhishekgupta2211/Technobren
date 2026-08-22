"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { navigation } from "@/lib/site";
import { megaMenu } from "@/lib/megaMenu";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { MobileMenuButton, MobileMenuSheet } from "./MobileNav";
import { MegaMenu } from "./MegaMenu";
import { cn } from "@/lib/utils";

/**
 * A floating pill navbar.
 *
 * Every entry is still a plain link to its own page, so a click always lands
 * somewhere; entries with a panel in `lib/megaMenu` additionally open it on
 * hover or keyboard focus. No caret is drawn — the panel itself is the
 * affordance, and seven carets in a row only add noise.
 *
 * There is no Home entry: the logo already goes there.
 *
 * The panel itself is rendered by `<MegaMenu>` as a sibling of the pill: the
 * pill has `overflow-hidden` and `backdrop-blur`, either of which would clip the
 * panel or trap it in the pill's containing block.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const reduce = useReducedMotion();

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  /**
   * The panel is aligned to the nav list, not to the pill: it spans exactly
   * from the first item to the last, so it reads as belonging to the links
   * rather than to the whole bar. Measured rather than guessed, because the
   * list width depends on the rendered label text.
   */
  const [span, setSpan] = useState<{ left: number; width: number } | null>(null);

  useEffect(() => {
    const measure = () => {
      const wrap = wrapRef.current;
      const list = listRef.current;
      if (!wrap || !list) return;
      // Measured from the first link's left edge to the last link's right edge,
      // not the list's own box — the list carries gaps that would leave the
      // panel visibly inset from the words it belongs to.
      const items = list.querySelectorAll<HTMLElement>(":scope > li");
      if (items.length === 0) return;
      const firstR = items[0].getBoundingClientRect();
      const lastR = items[items.length - 1].getBoundingClientRect();
      // Zero width means the list is display:none below lg — no panel there.
      if (firstR.width === 0) return setSpan(null);
      const wrapLeft = wrap.getBoundingClientRect().left;
      setSpan({ left: firstR.left - wrapLeft, width: lastR.right - firstR.left });
    };
    measure();
    // The first measurement can land while the fallback font is still in use,
    // which makes the labels — and so the list — narrower than they end up.
    document.fonts?.ready.then(measure);
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    if (listRef.current) ro.observe(listRef.current);
    return () => ro.disconnect();
  }, []);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const closeNow = () => {
    cancelClose();
    setOpenMenu(null);
  };
  const openPanel = (label: string) => {
    cancelClose();
    if (megaMenu[label]) setOpenMenu(label);
    else setOpenMenu(null);
  };
  /** A grace period, so the pointer can cross the gap from pill to panel. */
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenMenu(null), 130);
  };

  useEffect(() => cancelClose, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the panel, wherever focus happens to be.
  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openMenu]);

  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMobileOpen(false);
    setOpenMenu(null);
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
        {/* Anchors the dropdown, and bounds the hover region that keeps it open. */}
        <div ref={wrapRef} className="relative" onMouseLeave={scheduleClose}>
          <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Main"
            className={cn(
              "group relative z-50 flex items-center justify-between gap-4 rounded-full border py-2 pl-4 pr-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:pl-5 overflow-hidden",
              scrolled || mobileOpen || openMenu
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

            <Logo
              preload
              className="relative z-[60] shrink-0 transition-transform duration-300 hover:scale-[1.03]"
            />

            {/* ---------- Desktop nav with interactive hover & active pill ---------- */}
            <ul
              ref={listRef}
              onMouseLeave={() => setHoveredPath(null)}
              className="hidden items-center gap-1 lg:flex"
            >
              {navigation.map((item) => {
                const active = isActive(item.href);
                const isHovered = hoveredPath === item.href;
                const hasMenu = Boolean(megaMenu[item.label]);
                const isOpen = openMenu === item.label;

                return (
                  <li
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => {
                      setHoveredPath(item.href);
                      if (hasMenu) openPanel(item.label);
                      else closeNow();
                    }}
                  >
                    <Link
                      href={item.href}
                      onFocus={() => (hasMenu ? openPanel(item.label) : closeNow())}
                      aria-current={active ? "page" : undefined}
                      aria-haspopup={hasMenu || undefined}
                      aria-expanded={hasMenu ? isOpen : undefined}
                      aria-controls={hasMenu ? "mega-menu" : undefined}
                      className={cn(
                        "relative block rounded-full px-4 py-2 text-[0.86rem] font-medium transition-colors duration-200",
                        active || isOpen
                          ? "text-brand-700 font-semibold"
                          : "text-ink-600 hover:text-ink-950",
                      )}
                    >
                      <span className="relative z-10 block whitespace-nowrap">
                        {item.label}

                        {/* Hover line: expands from center left/right */}
                        {isHovered && !active && (
                          <motion.span
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 1 }}
                            exit={{ scaleX: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            style={{ transformOrigin: "center" }}
                            className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-brand-400/70"
                          />
                        )}

                        {/* Active line: starts from center (0 width) and expands outward to left and right smoothly */}
                        {active && (
                          <motion.span
                            layoutId="nav-active-center-line"
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 1 }}
                            transition={
                              reduce
                                ? { duration: 0 }
                                : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
                            }
                            style={{ transformOrigin: "center" }}
                            className="absolute -bottom-1 left-0 h-[2.5px] w-full rounded-full bg-gradient-to-r from-brand-600 via-brand-500 to-brand-600 shadow-[0_2px_8px_rgba(174,49,53,0.35)]"
                          />
                        )}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* ---------- Right actions ---------- */}
            <div
              className="flex shrink-0 items-center gap-2.5"
              onMouseEnter={closeNow}
            >
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

          <MegaMenu
            span={span}
            openLabel={openMenu}
            onNavigate={closeNow}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          />
        </div>
      </Container>

      <MobileMenuSheet open={mobileOpen} setOpen={setMobileOpen} />
    </header>
  );
}
