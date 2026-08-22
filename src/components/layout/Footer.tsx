import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight, ArrowUp } from "lucide-react";
import {
  site,
  contact,
  services,
  solutions,
  techCategories,
  hireRoles,
  offices,
  socials,
} from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { CountryMark } from "@/components/ui/CountryMark";
import { Logo } from "./Logo";

/**
 * Footer.
 *
 * Light, so it sits with the rest of the page rather than fighting it — which
 * also puts the logo on the white ground its artwork was drawn for.
 *
 * Four bands, each using the full width rather than stacking narrow columns:
 * brand + three link columns, a wide chip rail for the long lists (hiring and
 * the stack), the office register, then the legal line.
 */

const COMPANY = [
  { label: "About Us", href: "/about" },
  { label: "Our Work", href: "/work" },
  { label: "Methodology", href: "/methodology" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const COLUMNS = [
  { title: "Company", links: COMPANY },
  {
    title: "Services",
    links: services.map((s) => ({
      label: s.title,
      href: `/services#${s.slug}`,
    })),
  },
  {
    title: "Solutions",
    links: solutions.map((s) => ({ label: s.name, href: `/solutions#${s.slug}` })),
  },
];

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="flex items-center gap-2.5 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-ink-500">
      <span aria-hidden className="h-px w-4 bg-brand-300" />
      {children}
    </h3>
  );
}

/** A compact pill used by the wide hiring / technology rail. */
function Chip({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-full border border-ink-200 bg-white px-3 py-2 text-[0.78rem] font-medium text-ink-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700"
    >
      {children}
    </Link>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-x-clip border-t border-ink-200 bg-[var(--canvas-subtle)]">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[8%] -top-40 size-[36rem] rounded-full bg-[radial-gradient(circle,rgba(174,49,53,0.07),transparent_66%)] blur-3xl"
      />

      <Container size="wide" className="relative">
        {/* ---------- Brand + primary navigation ---------- */}
        <div className="grid gap-10 py-12 lg:grid-cols-12 lg:gap-8 lg:py-14">
          <div className="lg:col-span-4">
            <Logo />

            <p className="mt-5 max-w-xs text-pretty text-[0.9rem] leading-relaxed text-ink-600">
              Software engineered for excellence and efficiency — custom platforms,
              enterprise ERP and intelligent systems.
            </p>

            <div className="mt-6 flex flex-col gap-2.5">
              {contact.emails.map((item) => (
                <a
                  key={item.email}
                  href={`mailto:${item.email}`}
                  className="group inline-flex items-center gap-2.5 text-[0.87rem] font-medium text-ink-800 transition-colors duration-300 hover:text-brand-700"
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
                    <Mail className="size-3.5" aria-hidden />
                  </span>
                  <span className="truncate">{item.email}</span>
                </a>
              ))}
              <a
                href={`https://wa.me/${contact.primaryPhone.replace(/[^\d]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 text-[0.87rem] font-medium text-ink-800 transition-colors duration-300 hover:text-brand-700"
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
                  <Phone className="size-3.5" aria-hidden />
                </span>
                {contact.primaryPhone} (WhatsApp)
              </a>
            </div>

            <ul className="mt-6 flex flex-wrap gap-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white px-3 py-2 text-[0.78rem] font-medium text-ink-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700"
                  >
                    {s.label}
                    <ArrowUpRight
                      aria-hidden
                      className="size-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                </li>
              ))}
            </ul>

            {/* Official MSME & Govt Registration Badge */}
            <div className="mt-7 pt-5 border-t border-ink-200/70 flex flex-col gap-2.5">
              <span className="font-mono text-[0.65rem] uppercase tracking-wider text-ink-400 font-bold">
                Government Certification &amp; Trust
              </span>
              <div className="flex items-center gap-3.5 rounded-2xl border border-ink-200/90 bg-white p-3 shadow-2xs">
                {/* Embedded Govt MSME Seal SVG */}
                <div className="relative size-12 shrink-0 rounded-xl bg-[#003366] flex items-center justify-center border-2 border-[#FF9933] shadow-xs overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <div className="size-8 rounded-full border border-white" />
                  </div>
                  <span className="font-mono text-[0.65rem] font-black text-white tracking-widest">
                    MSME
                  </span>
                </div>

                <div className="border-l border-ink-200 pl-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-display text-xs font-extrabold text-ink-950">
                      MSME Registered
                    </span>
                  </div>
                  <span className="block text-[0.7rem] font-bold text-brand-700 mt-0.5">
                    Govt. of India Enterprise
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8 lg:gap-8">
            {COLUMNS.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <ColumnTitle>{col.title}</ColumnTitle>
                <ul className="mt-5 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href + l.label}>
                      <Link
                        href={l.href}
                        className="group inline-flex items-center gap-1.5 text-[0.87rem] leading-snug text-ink-600 transition-colors duration-300 hover:text-brand-700"
                      >
                        <span className="border-b border-transparent transition-colors duration-300 group-hover:border-brand-300">
                          {l.label}
                        </span>
                        <ArrowUpRight
                          aria-hidden
                          className="size-3 shrink-0 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>



        {/* ---------- Legal ---------- */}
        <div className="flex flex-col gap-4 border-t border-ink-200 py-7 text-[0.78rem] text-ink-500 lg:flex-row lg:items-center lg:justify-between">
          <p>{`© ${year} ${site.legalName}. All rights reserved.`}</p>
          <p className="max-w-md text-ink-500">
            {`The ${site.name} logo, brandmark and name are a registered trademark of ${site.legalName}.`}
          </p>
          <a
            href="#main"
            className="group inline-flex items-center gap-2 self-start rounded-full border border-ink-200 bg-white px-4 py-2 font-medium text-ink-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700 lg:self-auto"
          >
            Back to top
            <ArrowUp
              aria-hidden
              className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </Container>
    </footer>
  );
}
