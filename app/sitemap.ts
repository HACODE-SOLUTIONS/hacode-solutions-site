import { MetadataRoute } from "next";
import { devSpecs } from "@/data/devspecs";
import { getSiteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  const staticPages = [
    "",
    "/catalog",
    "/inbox-os",
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
    priority: path === "" ? 1 : path === "/inbox-os" ? 0.95 : 0.8,
  }));

  // Filter out sunset products from devspec pages
  const activeDevSpecs = devSpecs.filter((spec) => !spec.sunset);
  const devSpecPages = activeDevSpecs
    .filter((spec) => spec.slug !== "inbox-os")
    .map((spec) => ({
      url: `${siteUrl}/devspec/${spec.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    }));

  return [...staticPages, ...devSpecPages];
}
