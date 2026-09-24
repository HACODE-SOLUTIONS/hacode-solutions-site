import { MetadataRoute } from "next";
import { devSpecs } from "@/data/devspecs";
import { getSiteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

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

  const devSpecPages = devSpecs
    .filter((spec) => !spec.sunset)
    .map((spec) => ({
      url: `${siteUrl}/devspec/${spec.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    }));

  return [...staticPages, ...devSpecPages];
}
