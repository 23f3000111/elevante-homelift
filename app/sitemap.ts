import type { MetadataRoute } from "next";
import { LEGAL_SLUGS, PAGE_ROUTES } from "@/lib/routes";
import { siteUrl } from "@/lib/seo/metadata";

/** Emitted as a file, so the static export can produce it. */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...PAGE_ROUTES.map((slug) => ({
      url: `${siteUrl}/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: slug === "find-a-dealer" ? 0.9 : 0.7,
    })),
    ...LEGAL_SLUGS.map((slug) => ({
      url: `${siteUrl}/${slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    })),
  ];
}
