import type { Metadata } from "next";
import type { PageIntroContent, SiteContent } from "@/content/types";

/** Set NEXT_PUBLIC_SITE_URL in production; the fallback keeps local builds honest. */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function rootMetadata(site: SiteContent): Metadata {
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: site.name,
      template: `%s · ${site.name}`,
    },
    description: site.description,
    applicationName: site.name,
    openGraph: {
      type: "website",
      siteName: site.name,
      title: site.name,
      description: site.description,
      locale: "en_NL",
      images: [{ url: "/media/img/stair-gold-hall.webp", width: 1620, height: 1080, alt: "Entrance hall with a straight staircase" }],
    },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true },
    alternates: { canonical: "/" },
  };
}

export function pageMetadata(intro: PageIntroContent, path: string): Metadata {
  return {
    title: intro.title,
    description: intro.body,
    alternates: { canonical: path },
    openGraph: { title: intro.title, description: intro.body, url: path },
  };
}
