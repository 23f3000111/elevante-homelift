import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo/metadata";
import { SECONDARY_SLUGS } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...SECONDARY_SLUGS.map((slug) => ({
      url: `${siteUrl}/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: slug === "find-a-dealer" ? 0.9 : 0.6,
    })),
  ];
}
