import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const routes: { path: string; priority: number; freq: "weekly" | "monthly" }[] = [
  { path: "", priority: 1, freq: "weekly" },
  { path: "/services", priority: 0.9, freq: "monthly" },
  { path: "/solutions", priority: 0.9, freq: "monthly" },
  { path: "/work", priority: 0.8, freq: "monthly" },
  { path: "/technology", priority: 0.8, freq: "monthly" },
  { path: "/methodology", priority: 0.7, freq: "monthly" },
  { path: "/about", priority: 0.8, freq: "monthly" },
  { path: "/careers", priority: 0.6, freq: "monthly" },
  { path: "/contact", priority: 0.9, freq: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}
