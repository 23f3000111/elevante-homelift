import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo/metadata";

/** Emitted as a file, so the static export can produce it. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
