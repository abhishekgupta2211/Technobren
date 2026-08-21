import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { PageLoader } from "@/components/layout/PageLoader";
import { site, contact, offices } from "@/lib/site";
import "./globals.css";

/**
 * Fonts are self-hosted variable woff2 (latin subset) rather than fetched from
 * Google at build time: no third-party request at runtime, no build-time network
 * dependency, and ~110 KB for all three faces.
 */
const inter = localFont({
  src: "../fonts/inter-latin.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Arial", "sans-serif"],
});

const manrope = localFont({
  src: "../fonts/manrope-latin.woff2",
  weight: "200 800",
  style: "normal",
  variable: "--font-manrope",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Arial", "sans-serif"],
});

const jetbrains = localFont({
  src: "../fonts/jetbrains-mono-latin.woff2",
  weight: "100 800",
  style: "normal",
  variable: "--font-jetbrains",
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Consolas", "monospace"],
});

export const viewport: Viewport = {
  themeColor: "#ae3135",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "TechnoBren Infotech — Custom Software, ERP & AI Engineering",
    template: "%s | TechnoBren Infotech",
  },
  description: site.description,
  applicationName: site.legalName,
  keywords: [
    "custom software development",
    "enterprise ERP",
    "mobile app development",
    "AI and machine learning",
    "business intelligence",
    "offshore development team",
    "software company Jaunpur",
    "TechnoBren Infotech",
  ],
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.legalName,
  publisher: site.legalName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.legalName,
    url: site.url,
    title: "TechnoBren Infotech — Custom Software, ERP & AI Engineering",
    description: site.description,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechnoBren Infotech — Custom Software, ERP & AI Engineering",
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  // Icons resolve from src/app/icon.svg + src/app/apple-icon.png via the
  // Next.js file convention — no manual <link> entries needed.
  category: "technology",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  logo: `${site.url}/brand/technobren-logo.png`,
  description: site.description,
  email: contact.primaryEmail,
  telephone: contact.primaryPhone,
  founder: { "@type": "Person", name: "Rajkeshar Yadav" },
  address: offices.map((o) => ({
    "@type": "PostalAddress",
    streetAddress: o.address,
    addressLocality: o.city,
    addressCountry: o.country,
  })),
  sameAs: [
    "https://www.linkedin.com/company/technobren",
    "https://www.facebook.com/technobren",
    "https://www.instagram.com/technobren",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} ${jetbrains.variable}`}
    >
      <body className="antialiased">
        <script
          type="application/ld+json"
          // Structured data — static, authored above, not user input.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        <PageLoader />
        <SmoothScroll />
        <ScrollProgress />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
