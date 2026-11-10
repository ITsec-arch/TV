import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { programs } from "@/lib/courses";

type Entry = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

const routes: Entry[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/agents", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/offensive-security", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/ai-security", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/threat-hunting", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/biometric-security", priority: 0.9, changeFrequency: "monthly" },
  { path: "/product", priority: 0.8, changeFrequency: "monthly" },
  { path: "/packages", priority: 0.8, changeFrequency: "monthly" },
  { path: "/academy", priority: 0.7, changeFrequency: "monthly" },
  { path: "/research", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticEntries = routes.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
  const courseEntries = programs.map((c) => ({
    url: `${site.url}/academy/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...staticEntries, ...courseEntries];
}
