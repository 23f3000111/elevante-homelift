import type { HomeContent, SiteContent } from "@/content/types";
import { siteUrl } from "./metadata";

/** Structured data limited to facts the brief states. No ratings, offers or specs. */
export function organizationJsonLd(site: SiteContent) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    legalName: site.legalName,
    url: siteUrl,
    description: site.description,
    areaServed: ["NL", "GB", "DE"],
  };
}

export function productJsonLd(site: SiteContent, home: HomeContent) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: site.name,
    brand: { "@type": "Brand", name: "Elevante" },
    description: home.productReveal.lines.join(" "),
    category: "Residential homelift",
    url: siteUrl,
  };
}

export function jsonLdScript(data: object) {
  // JSON-LD is inert data; escaping "<" keeps it safe inside a script element.
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
