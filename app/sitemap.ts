import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { projects } from "@/lib/work";
import { resources } from "@/lib/resources";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { path: "/", priority: 1.0 },
    { path: "/services", priority: 0.9 },
    { path: "/work", priority: 0.9 },
    { path: "/work/case-studies", priority: 0.8 },
    { path: "/work/results", priority: 0.7 },
    { path: "/about", priority: 0.7 },
    { path: "/resources", priority: 0.8 },
    { path: "/faq", priority: 0.6 },
    { path: "/business-growth-audit", priority: 0.9 },
    { path: "/start-a-project", priority: 0.9 },
    { path: "/contact", priority: 0.7 },
    { path: "/privacy", priority: 0.3 },
    { path: "/terms", priority: 0.3 },
    { path: "/cookies", priority: 0.3 },
    { path: "/login", priority: 0.4 },
  ].map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: r.priority,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${site.url}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const caseStudyRoutes = projects.map((p) => ({
    url: `${site.url}/work/case-studies/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const resourceRoutes = resources.map((r) => ({
    url: `${site.url}/resources/${r.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...caseStudyRoutes,
    ...resourceRoutes,
  ];
}