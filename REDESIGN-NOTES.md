# TechnoBren — Redesign Notes

Everything on the new site is sourced from the existing **technobren.com**. This file
records what was carried over, what was drafted, and what needs a decision from
TechnoBren before launch.

---

## 1. Problems found on the existing website

These were all live on technobren.com at the time of the audit. None of them were
carried into the rebuild.

| # | Issue | Where |
|---|-------|-------|
| 1 | **`work.html` and `methodology.html` return 404** — both are linked from the main navigation | Site-wide nav |
| 2 | **All nine client logos are broken** (`Movit-logo.png`, `masafi-logo.png`, `mastercard-logo.png`, `nfpc-logo.png`, `oasis-logo.png`, `admirals-logo.png`, `barakat-logo.png`, `gurave-logo.png`, `hariss-logo.png` → 404) | `about.html` "Brands we Worked for" |
| 3 | **Lorem ipsum testimonials are live**, attributed to "Lorem Ipsum / @loremipsumtext" | `about.html`, `contact.html` |
| 4 | **A competitor's name appears in the copy**: *"Partner with **IndiaNIC**, a leading web design and software development company…"* | Home, "Hire the Best Web and Mobile App Developers" |
| 5 | **An office is labelled "Uganda" but shows a US address**: *499, N. Canon Drive, Suite 215, Beverly Hills CA 90210 USA* | Home + About + Services + Solutions footers |
| 6 | **Contradictory experience claim**: hero says *"over 35+ years of experience"*, About says *"+4 Years of Consistent Growth"* | Home hero vs `about.html` milestones |
| 7 | **Solutions page copy is entirely healthcare-specific** (EHRs, patient scheduling, telemedicine) but presented as general focus areas | `solution.html` |
| 8 | **No `<meta charset>`** — causes mojibake throughout (`Let's` renders as `Letâ€™s`) | All pages |
| 9 | **Zero SEO metadata** — no description, canonical, Open Graph, or Twitter tags | All pages |
| 10 | **No `robots.txt`, no `sitemap.xml`, no favicon** (all 404) | Site root |
| 11 | **Horizontal overflow on mobile** — content is wider than a 375 px viewport | Home |
| 12 | **`RockEye ERP`** named on the Solutions page but nowhere else — unclear if it is a TechnoBren product | `solution.html` |
| 13 | Inconsistent contact details: `info@technobren.com` on Contact vs `r.yadav@technobren.com` on Home | Home vs Contact |

---

## 2. Content carried over verbatim (verified)

- Company name, legal name, trademark line
- Hero positioning: *"Software engineered for excellence and efficiency"*
- All six service practices and their capability lists (`service.html` + home mega-menu)
- All five products: Custom ERP, Van Sales System, Distributor Management,
  Merchandiser Management, Asset Management
- Custom ERP description (the only product with published copy)
- Full technology stack, grouped by the same six categories the old site used
- Milestones: **48+ projects · 25+ clients · 97% satisfaction**
- Six differentiators (Flexible Timings, On-Time Delivery, Cost-Effective,
  Seamless Communication, Award-Winning Service, Qualification Interview)
- Award: *"Most Promising Company by the Chief Minister of Uttar Pradesh, 2018"*
- Six core values
- Leadership: Rajkeshar Yadav (Founder, Chairman & CEO), Deepak Yadav, Pankaj
  Yadav, Arun Yadav, Akash Yadav
- Chairman's message, quoted in full
- The 7-day trial offer
- All office addresses, phone numbers and email addresses
- Contact form fields (name, email, mobile, company, service, budget,
  requirement, timeline, project details)

---

## 3. Drafted content — **please review before launch**

Marked `drafted: true` in `src/lib/site.ts` where applicable.

| Item | Why it was drafted | File |
|------|--------------------|------|
| Descriptions + feature lists for **Van Sales System**, **Distributor Management**, **Merchandiser Management**, **Asset Management** | The old site listed the product names with no copy. Text is deliberately factual and functional — no metrics, no claims. | `src/lib/site.ts` → `solutions[]` |
| The six **methodology stages** (Discovery → Support) | `methodology.html` was a 404. Stage copy describes a standard delivery process. | `src/lib/site.ts` → `processSteps` |
| **Industries** list | Derived from the product portfolio (van sales/distribution/merchandising imply FMCG) plus the healthcare references on `solution.html`. **Confirm these are sectors TechnoBren actually serves.** | `src/lib/site.ts` → `industries` |
| Technology category one-liners (`blurb`) | Neutral descriptions of each category. | `src/lib/site.ts` → `techCategories` |
| Secondary services descriptions | Condensed from the old service page bullet lists. | `src/lib/site.ts` → `secondaryServices` |

---

## 4. Deliberately **not** included

- **Client logos / named clients** — every logo on the old site 404s, so there is
  no verified client list. Nothing was invented.
- **Testimonials** — the only ones on the old site were lorem ipsum.
- **Case-study metrics** — none published anywhere. `/work` shows the real product
  portfolio and states plainly that detailed case studies are shared on request
  under NDA.
- **"35+ years of experience"** — contradicted by the company's own About page
  ("+4 Years"). Replaced with the concrete, verifiable milestone numbers.
- **The "Uganda" office** — the address given is in Beverly Hills, USA. Omitted
  pending clarification (see §5).
- **"Cut development costs by up to 1/3"** was kept because it is TechnoBren's own
  published claim, but it is a marketing claim rather than a verified figure.

---

## 5. Decisions needed from TechnoBren

1. **The "Uganda" office.** Is there a Uganda office, or was the Beverly Hills
   address mislabelled? Currently the site lists six offices: Lucknow (HQ),
   Jaunpur, Ahmedabad, Indore, Dubai, Melbourne. Add or correct in
   `src/lib/site.ts` → `offices`.
2. **Years in business.** Confirm the real figure so the copy can say it plainly.
3. **Client references.** If any clients can be named publicly, supply logos and
   permission and a trust strip can be added to the homepage.
4. **Testimonials.** Real quotes with names/roles will slot into a testimonials
   section; there is no placeholder shipped.
5. **Social media URLs.** The handles in `src/lib/site.ts` → `socials` are guesses
   based on the old site's icons (which linked nowhere). Replace with real URLs.
6. **`RockEye ERP`** — is this a TechnoBren product, a partner product, or leftover
   copy? Not carried over.
7. **Team photography.** `/about` currently uses initial monograms. Supply photos
   to replace them.
8. **Contact form endpoint.** See §6.

---

## 6. Contact form — needs a backend

The old site posted to a PHP handler that is not part of this rebuild. The new form
(`src/components/sections/ContactForm.tsx`) currently composes the enquiry and hands
it to the visitor's mail client via `mailto:` so **no enquiry is silently lost**.

To wire up a real endpoint, replace the `handleSubmit` body with a `fetch` to your
API route or form service (Resend, Formspree, a Next.js route handler, etc.). The
field names are already aligned with the old form.

---

## 7. Brand system

Extracted directly from `logo.png`:

| Token | Value | Source |
|-------|-------|--------|
| Brand crimson | `#AE3135` | Dominant logo colour (22.5% of opaque pixels) |
| Logo charcoal | `#3A3937` | Wordmark tagline colour |
| Old site CSS accent | `#A72329` | `assets/css/style.css` |

The full 50→950 crimson ramp and warm-neutral ink ramp are in
`src/app/globals.css` under `@theme`.

**The logo is used unmodified.** Its artwork is drawn for a light background, so on
dark surfaces (the footer) it sits on its own white plate rather than being
recoloured — see `src/components/layout/Logo.tsx`.

The site's visual motif — orbital arcs terminating in node dots — is taken directly
from the two swooshes in the logo. It drives the hero visual
(`src/components/visuals/OrbitSystem.tsx`) and the favicon (`src/app/icon.svg`).

Typography: **Manrope** (display), **Inter** (body), **JetBrains Mono** (technical
labels). All three are self-hosted variable woff2, latin subset, ~110 KB total — no
runtime request to Google.
