import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { navigation } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="mask-fade absolute inset-0 bg-grid" />
        <div className="absolute left-1/2 top-0 size-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(174,49,53,0.12),transparent_64%)] blur-3xl" />
      </div>

      <Container size="narrow" className="text-center">
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-brand-700">
          Error 404
        </p>
        <h1 className="mt-6 font-display text-[2.4rem] leading-tight text-ink-950 sm:text-[3.2rem]">
          This page doesn&rsquo;t exist
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-pretty text-[1rem] leading-[1.7] text-ink-600">
          The link may be out of date or the page may have moved. Here&rsquo;s the rest
          of the site.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button href="/" size="lg" arrow>
            Back to Home
          </Button>
          <Button href="/contact" size="lg" variant="secondary">
            Contact Us
          </Button>
        </div>

        <nav aria-label="Site" className="mt-12">
          <ul className="flex flex-wrap justify-center gap-2">
            {navigation.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="rounded-xl border border-ink-200 bg-white px-4 py-2 text-[0.85rem] font-medium text-ink-700 transition-colors duration-300 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  );
}
