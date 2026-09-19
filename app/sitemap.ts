import { MetadataRoute } from "next";
import { devSpecs } from "@/data/devspecs";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hacode.solutions";

  const staticPages = [
    "",
    "/catalog",
    "/repositories",
    "/how-it-works",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const devSpecPages = devSpecs.map((spec) => ({
    url: `${siteUrl}/devspec/${spec.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...devSpecPages];
}
