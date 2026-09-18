import type { Metadata } from "next";
import type { PageOpeningContent, SiteContent } from "@/content/types";
import { alternatesFor } from "@/lib/i18n";

/** Set NEXT_PUBLIC_SITE_URL in production; the fallback keeps local builds honest. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

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
      images: [{ url: site.menu.media.src, width: site.menu.media.width, height: site.menu.media.height, alt: site.menu.media.alt }],
    },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true },
    alternates: { canonical: "/", languages: alternatesFor("/", siteUrl) },
  };
}

interface PageMeta {
  title: string;
  description: string;
  /** Campaign and draft pages can be kept out of the index. */
  noindex?: boolean;
}

export function pageMetadata(meta: PageMeta, path: string): Metadata {
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: path, languages: alternatesFor(path, siteUrl) },
    openGraph: { title: meta.title, description: meta.description, url: path },
    ...(meta.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** Metadata for a page that opens with a statement and a lead. */
export function openingMetadata(opening: PageOpeningContent, path: string): Metadata {
  return pageMetadata({ title: opening.title, description: opening.lead }, path);
}
