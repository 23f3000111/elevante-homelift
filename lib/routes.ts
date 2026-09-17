/** The seven pages the navigation and footer point to, in navigation order. */
export const PAGE_ROUTES = [
  "the-homelift",
  "design",
  "in-your-home",
  "installation",
  "inspiration",
  "information",
  "find-a-dealer",
] as const;

/** Legal routes, served from one intro template until their text arrives. */
export const LEGAL_SLUGS = ["privacy", "cookies", "terms"] as const;

export type LegalSlug = (typeof LEGAL_SLUGS)[number];
