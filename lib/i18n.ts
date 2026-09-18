/**
 * Locales the architecture is ready for. Only English has content today;
 * adding a locale means adding `content/<locale>/*` and listing it here.
 * Routes stay at the root for the default locale; other locales will be
 * served under `/<locale>/` by a `[locale]` route group when their content
 * exists, so nothing here hard-codes a single country.
 */
export const LOCALES = ["en", "nl", "de"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** Locales that have content and can be linked. */
export const AVAILABLE_LOCALES: Locale[] = ["en"];

export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  nl: "Nederlands",
  de: "Deutsch",
};

/** The path prefix for a locale: none for the default. */
export function localePrefix(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? "" : `/${locale}`;
}

/** hreflang alternates for a path, limited to locales that exist. */
export function alternatesFor(path: string, siteUrl: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const l of AVAILABLE_LOCALES) out[l] = `${siteUrl}${localePrefix(l)}${path}`;
  out["x-default"] = `${siteUrl}${path}`;
  return out;
}
