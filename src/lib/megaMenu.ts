/**
 * MEGA MENU CONTENT
 *
 * Everything here is derived from `lib/site.ts` rather than retyped, so the
 * navigation can never drift from the pages it points at. Only the icons, the
 * one-line descriptions and the featured panel are authored here — and the
 * descriptions are trimmed from the same copy the destination page shows.
 *
 * Every `href` below resolves to a real page or a real anchor on that page.
 */

import {
  services,
  secondaryServices,
  solutions,
  techCategories,
  hireGroups,
  hireRoles,
  coreValues,
  processSteps,
  stats,
  focusAreas,
  rockEye,
  offices,
} from "./site";

export type MegaLink = {
  label: string;
  href: string;
  description: string;
  /** Resolved through `components/ui/Icon`. */
  icon: string;
};

export type MegaFeature = {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  cta: string;
  /** Optional figure strip along the bottom of the featured card. */
  facts?: { value: string; label: string }[];
};

export type MegaPanel = {
  /** Short line above the link grid. */
  intro: string;
  links: MegaLink[];
  feature: MegaFeature;
};

/** Mirrors the `slug()` used by `app/technology/page.tsx` for its section ids. */
const techSlug = (s: string) => s.toLowerCase().replace(/[^a-z]+/g, "-");

/** First sentence only — panel descriptions are one line, not a paragraph. */
const firstSentence = (s: string) => {
  const cut = s.split(/(?<=\.)\s/)[0];
  return cut.length > 96 ? `${cut.slice(0, 93).trimEnd()}…` : cut;
};

const TECH_ICONS: Record<string, string> = {
  Mobile: "Smartphone",
  "Front End": "Code2",
  Backend: "Server",
  Database: "Boxes",
  "CMS & Commerce": "ShoppingBag",
  "Infra & DevOps": "Blocks",
};

const HIRE_ICONS: Record<string, string> = {
  "Frontend Developers": "Code2",
  "Backend & Full-Stack Developers": "Server",
  "CMS & eCommerce Developers": "ShoppingBag",
  "Mobile App Developers": "Smartphone",
  "AI & ML Developers": "BrainCircuit",
};

const STAGE_ICONS: Record<string, string> = {
  Discovery: "MessagesSquare",
  Design: "PenTool",
  Development: "Code2",
  Testing: "ShieldCheck",
  Deployment: "Server",
  Support: "Clock",
};

const WORK_SECTORS: Record<string, string> = {
  "custom-erp": "Enterprise operations",
  "van-sales-system": "FMCG · Field sales",
  "distributor-management": "Distribution · Channel",
  "merchandiser-management": "Retail execution",
  "asset-management": "Operations · Facilities",
};

const stat = (label: string) => {
  const s = stats.find((x) => x.label === label);
  return s ? `${s.value}${s.suffix}` : "";
};

/**
 * Keyed by the nav item's label. An item with no entry here simply has no
 * dropdown — which is how Home stays a plain link.
 */
export const megaMenu: Record<string, MegaPanel> = {
  About: {
    intro: "Who we are",
    links: [
      {
        label: "Milestones",
        href: "/about#milestones",
        description: "The delivery record, in numbers.",
        icon: "Award",
      },
      {
        label: "Chairman's message",
        href: "/about#chairman",
        description: "A word from our founder and CEO.",
        icon: "MessagesSquare",
      },
      {
        label: "Core values",
        href: "/about#values",
        description: `The ${coreValues.length} principles behind how we work.`,
        icon: "ShieldCheck",
      },
      {
        label: "Our team",
        href: "/about#team",
        description: "The people who build and run it.",
        icon: "Users",
      },
      {
        label: "Global presence",
        href: "/about#offices",
        description: `${offices.length} offices across three countries.`,
        icon: "Globe",
      },
      {
        label: "Careers",
        href: "/careers",
        description: "Disciplines we hire for, and how to apply.",
        icon: "UserCheck",
      },
    ],
    feature: {
      eyebrow: "Since day one",
      title: "Built by people who care about the craft",
      body: "A unified global entity delivering custom platforms, enterprise ERP and intelligent systems.",
      href: "/about",
      cta: "Read our story",
      facts: [
        { value: stat("Projects delivered"), label: "Projects" },
        { value: stat("Clients served"), label: "Clients" },
        { value: stat("Satisfaction rate"), label: "Satisfaction" },
      ],
    },
  },

  "Hire Developers": {
    intro: "Build your offshore team",
    links: [
      ...hireGroups.map((g) => ({
        label: g.title,
        href: "/hire-developers",
        description: g.roles.join(" · "),
        icon: HIRE_ICONS[g.title] ?? "Code2",
      })),
      {
        label: "How it works",
        href: "/hire-developers#how-it-works",
        description: "From brief to onboarded engineer.",
        icon: "Workflow",
      },
    ],
    feature: {
      eyebrow: "Dedicated teams",
      title: "Cut development cost by up to a third",
      body: "Vetted engineers on dedicated or fixed-time engagements, each cleared by a qualification test.",
      href: "/hire-developers#request-form",
      cta: "Request developers",
      facts: [
        { value: `${hireRoles.length}`, label: "Roles" },
        { value: "24/7", label: "Overlap" },
        { value: "NDA", label: "Covered" },
      ],
    },
  },

  Services: {
    intro: "What we do, end to end",
    links: services.map((s) => ({
      label: s.title,
      href: `/services#${s.slug}`,
      description: `${s.capabilities.length} capabilities · ${s.capabilities[0]}`,
      icon: s.icon,
    })),
    feature: {
      eyebrow: "Also offering",
      title: "Supporting capabilities",
      body: secondaryServices.map((s) => s.title).join(" · "),
      href: "/services",
      cta: "Explore all services",
      facts: [
        { value: `${services.length}`, label: "Practices" },
        {
          value: `${services.reduce((n, s) => n + s.capabilities.length, 0)}`,
          label: "Capabilities",
        },
        { value: `${secondaryServices.length}`, label: "Supporting" },
      ],
    },
  },

  Technology: {
    intro: "Every layer, covered",
    links: techCategories.map((c) => ({
      label: c.name,
      href: `/technology#${techSlug(c.name)}`,
      description: `${c.items.length} technologies · ${c.items.slice(0, 3).join(", ")}`,
      icon: TECH_ICONS[c.name] ?? "Code2",
    })),
    feature: {
      eyebrow: "The stack",
      title: "Chosen to fit the problem, not the trend",
      body: "From the device in your customer's hand down to the container running in production.",
      href: "/technology",
      cta: "See the full stack",
      facts: [
        {
          value: `${techCategories.reduce((n, c) => n + c.items.length, 0)}`,
          label: "Technologies",
        },
        { value: `${techCategories.length}`, label: "Disciplines" },
      ],
    },
  },

  Solutions: {
    intro: "Products built for operations",
    links: [
      ...solutions.map((s) => ({
        label: s.name,
        href: `/solutions#${s.slug}`,
        description: `${s.category} · ${s.features.length} modules`,
        icon: s.icon,
      })),
      {
        label: "Focus areas",
        href: "/solutions",
        description: focusAreas
          .slice(0, 3)
          .map((f) => f.title)
          .join(" · "),
        icon: "LayoutGrid",
      },
    ],
    feature: {
      eyebrow: rockEye.name,
      title: rockEye.headline,
      body: firstSentence(rockEye.body),
      href: "/solutions#custom-erp",
      cta: "See it in action",
      facts: [
        { value: `${solutions.length}`, label: "Products" },
        { value: `${focusAreas.length}`, label: "Focus areas" },
      ],
    },
  },

  Work: {
    intro: "Platforms we've shipped",
    links: solutions.map((s, i) => ({
      label: s.name,
      href: `/work#${s.slug}`,
      description: `Project ${String(i + 1).padStart(2, "0")} · ${
        WORK_SECTORS[s.slug] ?? s.category
      }`,
      icon: s.icon,
    })),
    feature: {
      eyebrow: "References",
      title: "Case studies available on request",
      body: "Client engagements are covered by NDA, so named references are shared directly rather than published.",
      href: "/contact",
      cta: "Ask us for references",
      facts: [
        { value: stat("Projects delivered"), label: "Delivered" },
        { value: stat("Clients served"), label: "Clients" },
      ],
    },
  },

  Methodology: {
    intro: "How the work actually runs",
    links: processSteps.map((step) => ({
      label: `${step.id} · ${step.title}`,
      href: "/methodology#stages",
      description: step.deliverables.slice(0, 3).join(" · "),
      icon: STAGE_ICONS[step.title] ?? "Workflow",
    })),
    feature: {
      eyebrow: "No black boxes",
      title: "Every stage has an output you can review",
      body: "Nothing moves forward until you have seen it. You approve the product before it is built.",
      href: "/methodology#principles",
      cta: "See the methodology",
      facts: [
        { value: `${processSteps.length}`, label: "Stages" },
        { value: "NDA", label: "From day one" },
      ],
    },
  },
};
