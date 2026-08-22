import Link from "next/link";
import { Mail, Phone, ArrowUpRight, ArrowUp } from "lucide-react";
import { site, contact, services, solutions, hireRoles, socials } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";

/**
 * Footer.
 *
 * Light, so it sits with the rest of the page rather than fighting it — which
 * also puts the logo on the white ground its artwork was drawn for.
 *
 * Two bands: brand + four link columns (Company, Services, Solutions and the
 * hiring rail), then the legal line. Offices are not repeated here — they have
 * a full register on /about, /contact and /careers.
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

/** A compact pill used by the hiring rail. */
function Chip({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-block rounded-full border border-ink-200 bg-white px-2.5 py-1.5 text-[0.75rem] font-medium text-ink-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700"
    >
      {children}
    </Link>
  );
}

/**
 * "ReactJS Developers" → "ReactJS". The column heading already says what these
 * are, so repeating the word on all eighteen chips only costs width.
 */
const shortRole = (role: string) => role.replace(/ (App )?Developers$/, "");

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-x-clip border-t border-ink-200 bg-[var(--canvas-subtle)]">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[8%] -top-40 size-[36rem] rounded-full bg-[radial-gradient(circle,rgba(174,49,53,0.07),transparent_66%)] blur-3xl"
      />

      <Container size="wide" className="relative">
        {/* ---------- Closing invitation ---------- */}
        <div className="group relative mt-12 overflow-hidden rounded-3xl border border-ink-200/80 bg-white p-7 shadow-(--shadow-card) sm:p-9">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-24 size-80 rounded-full bg-[radial-gradient(circle,rgba(174,49,53,0.12),transparent_66%)] blur-3xl"
          />
          <svg
            aria-hidden
            viewBox="0 0 200 200"
            fill="none"
            className="pointer-events-none absolute -right-10 -top-16 size-64 opacity-80"
          >
            <path
              d="M8 168C8 80 80 8 168 8"
              stroke="#ae3135"
              strokeOpacity="0.18"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M44 176C44 103 103 44 176 44"
              stroke="#ae3135"
              strokeOpacity="0.1"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="168" cy="8" r="4" fill="#ae3135" fillOpacity="0.4" />
          </svg>

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="flex items-center gap-2.5 font-mono text-[0.64rem] uppercase tracking-[0.22em] text-ink-500">
                <span aria-hidden className="h-px w-5 bg-brand-300" />
                Next step
              </p>
              <p className="mt-4 max-w-xl text-balance font-display text-[1.6rem] leading-tight text-ink-950 sm:text-[2rem]">
                Have something to build?{" "}
                <span className="text-brand-700">Tell us the problem.</span>
              </p>
              <p className="mt-3 text-[0.9rem] text-ink-600">
                Every engagement starts under NDA.
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="group/cta inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3.5 text-[0.9rem] font-semibold text-white shadow-[0_1px_2px_rgba(174,49,53,0.22),0_10px_24px_-12px_rgba(174,49,53,0.6)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-brand-700"
              >
                Start a project
                <ArrowUpRight
                  aria-hidden
                  className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
                />
              </Link>
              <Link
                href="/hire-developers"
                className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-6 py-3.5 text-[0.9rem] font-semibold text-ink-800 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700"
              >
                Hire developers
              </Link>
            </div>
          </div>
        </div>

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

          </div>

          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4 lg:col-span-8 lg:gap-8">
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

            {/* 4th column: the hiring rail */}
            <nav aria-label="Hire Developers">
              <ColumnTitle>Hire Developers</ColumnTitle>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {hireRoles.map((role) => (
                  <li key={role}>
                    <Chip href="/hire-developers">{shortRole(role)}</Chip>
                  </li>
                ))}
              </ul>
              <Link
                href="/hire-developers#request-form"
                className="group mt-4 inline-flex items-center gap-1.5 text-[0.82rem] font-semibold text-brand-700 transition-colors duration-300 hover:text-brand-800"
              >
                <span className="border-b border-transparent transition-colors duration-300 group-hover:border-brand-300">
                  Request developers
                </span>
                <ArrowUpRight
                  aria-hidden
                  className="size-3.5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </nav>
          </div>
        </div>



        {/* ---------- Legal ---------- */}
        <div className="flex flex-col gap-5 border-t border-ink-200 py-7 text-[0.78rem] text-ink-500 lg:flex-row lg:items-center lg:justify-between">
          {/* The MSME mark belongs beside the legal line, not floating in the
              brand column's empty gutter. */}
          <div className="flex items-center gap-3.5">
            <span className="inline-flex shrink-0 items-center justify-center rounded-xl border border-ink-200 bg-white p-2 shadow-2xs">
              <img
                src="/brand/msme-official.png"
                alt="MSME Micro, Small & Medium Enterprises — Government of India"
                className="h-9 w-auto object-contain"
              />
            </span>
            <span className="leading-snug">
              <span className="block font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink-400">
                Govt. of India registered
              </span>
              <span className="block text-ink-600">{`© ${year} ${site.legalName}`}</span>
            </span>
          </div>

          <p className="max-w-sm text-ink-500">
            {`The ${site.name} logo, brandmark and name are a registered trademark of ${site.legalName}. All rights reserved.`}
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
