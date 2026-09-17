/** Routes the navigation and footer point to, besides the homepage. */
export const SECONDARY_SLUGS = [
  "the-homelift",
  "design",
  "in-your-home",
  "installation",
  "inspiration",
  "information",
  "find-a-dealer",
  "privacy",
  "cookies",
  "terms",
] as const;

export type SecondarySlug = (typeof SECONDARY_SLUGS)[number];
