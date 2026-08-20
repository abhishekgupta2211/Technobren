# TechnoBren Infotech — Website

A rebuild of [technobren.com](https://technobren.com) for **TechnoBren Infotech Private
Limited**: a premium, animated, production-ready marketing site.

All business content is transcribed from the existing website. Nothing is invented —
where the old site had no copy, the text is flagged in
[`REDESIGN-NOTES.md`](./REDESIGN-NOTES.md) for review before launch.

---

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

| Script                 | What it does                        |
| ---------------------- | ----------------------------------- |
| `npm run dev`          | Dev server                          |
| `npm run build`        | Production build                    |
| `npm start`            | Serve the production build          |
| `npm run typecheck`    | `tsc --noEmit`                      |
| `npm run lint`         | ESLint                              |
| `npm run format`       | Prettier, write                     |
| `npm run format:check` | Prettier, check only                |

---

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4** — design tokens live in `src/app/globals.css` under `@theme`
- **Motion** (Framer Motion v12) for entrances, hover and micro-interaction
- **Lenis** for smooth scrolling — disabled for reduced-motion and coarse pointers
- **Lucide** icons
- Fonts are **self-hosted** variable woff2 (Manrope / Inter / JetBrains Mono, latin
  subset, ~110 KB total) — no runtime request to Google, no build-time network need

Every route is statically prerendered.

---

## Routes

| Route          | Page                                             |
| -------------- | ------------------------------------------------ |
| `/`            | Home — 11 sections                               |
| `/about`       | Milestones, chairman's message, values, team     |
| `/services`    | Six practices with capability lists              |
| `/technology`  | The full stack, by discipline                    |
| `/solutions`   | Focus areas, five products, RockEye ERP          |
| `/work`        | Platforms designed, built and deployed           |
| `/methodology` | Six delivery stages                              |
| `/careers`     | Disciplines, values, locations                   |
| `/contact`     | Enquiry form and direct contact                  |

Plus `robots.txt`, `sitemap.xml`, a custom `404`, and generated icons.

---

## Brand system

Extracted from the existing logo (`public/brand/technobren-logo.png`):

| Token          | Value     | Source                          |
| -------------- | --------- | ------------------------------- |
| Brand crimson  | `#AE3135` | Dominant logo colour            |
| Logo charcoal  | `#3A3937` | Wordmark tagline                |

Full 50→950 crimson and warm-neutral ink ramps are in `src/app/globals.css`.

**The logo is used unmodified.** Its artwork is drawn for a light background, so the
navbar is a white pill and the footer is light — the mark always sits on the surface it
was designed for, without recolouring.

The site's visual motif — **arcs terminating in a node dot** — is lifted straight from
the two swooshes in the logo. It drives the hero orbit (`OrbitSystem`), the service card
artwork (`ServicePattern`), the office map (`GlobalReach`), the process dial, and the
favicon.

---

## Architecture

```
src/
  app/                     routes, metadata, robots, sitemap, icons
  components/
    layout/                Navbar, MobileNav, Footer, Logo, SmoothScroll,
                           ScrollProgress, PageLoader
    sections/              one file per page section
    ui/                    Button, Container, Counter, Icon, Magnetic,
                           Reveal, SectionHeading
    visuals/               OrbitSystem, ServicePattern, GlobalReach
      dashboard/           product dashboards on one shared chassis
  lib/site.ts              ALL content — single source of truth
  fonts/                   self-hosted woff2
```

`src/lib/site.ts` holds every piece of copy, every address, phone number and product
detail. Change content there, not in components.

### Product dashboards

`src/components/visuals/dashboard/` renders each product as a detailed interface mockup
in pure SVG — shared sidebar, top bar and card language via `chassis.tsx`, so all five
read as one family of software. They are sharp at any size and a fraction of the weight
of a screenshot. **The figures shown are placeholder sample data**, not client data.

---

## Accessibility & motion

- Every animation checks `prefers-reduced-motion`
- Mobile menu is a focus-trapped dialog with Escape-to-close and scroll lock
- Semantic landmarks, one `h1` per page, skip-to-content link
- Visible brand-coloured focus rings, never removed

---

## Before launch

See [`REDESIGN-NOTES.md`](./REDESIGN-NOTES.md) — it lists the problems found on the old
site, what was carried over verbatim, what was drafted, and the open questions that need
a decision from TechnoBren (including wiring the contact form to a real endpoint).
