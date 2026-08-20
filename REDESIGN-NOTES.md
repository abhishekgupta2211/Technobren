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
- All six service practices, and the capability lists that appear on `service.html`
  (about a third of the list entries have no old-site source — see §3)
- All five products: Custom ERP, Van Sales System, Distributor Management,
  Merchandiser Management, Asset Management
- All five product descriptions, from the home page's product tabs
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
  project details). The old `requirement` field (Business / Educational) was
  replaced with a `timeline` field that did not exist before — confirm.

---

## 3. Drafted content — **please review before launch**

A second pass against the old home page found published copy for items this file
previously listed as drafted. Those are now carried over verbatim and are no longer
flagged. What remains genuinely drafted:

| Item | Why it was drafted | File |
|------|--------------------|------|
| The six **methodology stages** (Discovery → Support) | `methodology.html` was a 404 on the old site. Stage copy describes a standard delivery process. | `src/lib/site.ts` → `processSteps` |
| **Industries** list | Derived from the product portfolio (van sales / distribution / merchandising imply FMCG) plus the healthcare references on `solution.html`. **Confirm these are sectors TechnoBren actually serves.** | `src/lib/site.ts` → `industries` |
| Technology category one-liners (`blurb`) | Neutral descriptions of each category. | `src/lib/site.ts` → `techCategories` |
| Parts of the **service capability lists** | Roughly a third of the entries have no old-site source — e.g. "Legacy Modernisation", "API & Systems Design", "Online Booking & Payments", "Customer Portals", "Headless Commerce", "Performance Optimisation", and most of Enterprise Applications & ERP and Business Intelligence & Analytics. **Confirm these are services TechnoBren offers.** | `src/lib/site.ts` → `services[].capabilities` |
| `SECTOR` map on `/work` | Sector label per platform, inferred from the product's purpose. | `src/app/work/page.tsx` |

### Corrected in a later pass — previously wrong in this file

- **Product copy.** All five products have full published descriptions on the old
  home page's "Our Customer-Centric Business IT Solutions" tabs. Van Sales,
  Distributor, Merchandiser and Asset Management were briefly running on invented
  copy; they now use the client's own words.
- **Focus areas.** The old Services mega-menu carried general-purpose descriptions
  of the same six focus areas that `solution.html` described in healthcare terms.
  The general versions are now used, which resolves item 7 in §1.
- **Chairman's message.** Was missing its closing sentence, *"Together, we innovate,
  create and excel."* Now quoted in full.
- **Phone numbers.** `+91 94 0918 4115` was dropped; restored.
- **AI claim.** *"reduce operational costs by up to 30%"* was dropped while the
  sibling *"1/3"* claim was kept. Both are the client's own published claims; both
  are now present.
- **LinkedIn.** A real, working URL (`in.linkedin.com/company/technobren-infotech-ptv-ltd`)
  was replaced with a guess. Restored. Facebook is real. **Instagram and X remain
  guesses** — the old icons had empty `href`s.
- **Contact page metadata** named Ahmedabad, Indore and Melbourne, none of which are
  in `offices`. Corrected to the four real offices.

## 4. Deliberately **not** included

- **Client logos / named clients** — every logo on the old site 404s, so there is
  no verified client list. Nothing was invented.
- **Testimonials** — the only ones on the old site were lorem ipsum.
- **Case-study metrics** — none published anywhere. `/work` shows the real product
  portfolio and states plainly that detailed case studies are shared on request
  under NDA.
- **"35+ years of experience"** — contradicted by the company's own About page
  ("+4 Years"). Replaced with the concrete, verifiable milestone numbers.
- **The "Uganda" office label** — the old footer labels a Beverly Hills, USA
  address "Uganda". The old contact page labels the same address "USA", which is
  what the site uses.
- **Two named solutions** — *Sales Process Automation* and *Warehouse Management*
  appear only in the old contact page footer, with no description anywhere. Not
  carried over; see §5.
- **"Cut development costs by up to 1/3"** was kept because it is TechnoBren's own
  published claim, but it is a marketing claim rather than a verified figure.

---

## 5. Decisions needed from TechnoBren

1. **Jaunpur address.** The old site carried two different Jaunpur addresses:
   *B1, Katyani Tower, Near Ambedkar Tiraha, Jaunpur 222002* (footer, 4 pages) and
   *503, City Tower, Wazidpur Tiraha, Jaunpur* (contact page). The site now uses
   **5th Floor, City Tower, Wazidpur, Jaunpur** as supplied by the client. Confirm —
   and confirm whether the Katyani Tower office is still active.
2. **Ahmedabad and Indore.** Both have full addresses on the old contact page but are
   not in the shipped four. Add them if still active.
3. **Australia.** The old copy claimed a presence in Australia and the Australian
   number `+61 (02) 8317 1138` is still listed, but there is no Australian office in
   the four. Resolve the inconsistency.
4. **RockEye ERP.** Now live on `/solutions` at the client's request, using the old
   `solution.html` copy verbatim. Confirm TechnoBren owns this product before launch.
5. **Sales Process Automation** and **Warehouse Management** — real products, or
   leftover footer links?
6. **Years in business.** The old milestone *"+4 Years of Consistent Growth"* is not
   carried over. Supply the correct figure if it should appear.
7. **Client references and testimonials.** None are published, because none on the old
   site were real. Supply logos, permission and real quotes to add them.
8. **Instagram and X URLs.** Currently guesses. Replace with real handles or remove.
9. **Team photography.** `/about` uses initial monograms for everyone but the founder.
10. **Budget bands.** The old form offered `$700` / `$1000`; the new form offers
    `Under $5,000` through `$50,000+`. Confirm this repositioning is intended.
11. **Privacy policy.** The old footer linked one (dead). The form collects personal
    data, so a real policy page is needed.
12. **Spam protection.** The old form used reCAPTCHA. The new one has none — see §6.
13. **Contact form endpoint.** See §6.

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
