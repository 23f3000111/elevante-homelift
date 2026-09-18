import type {
  Article,
  Country,
  Dealer,
  DesignOption,
  Download,
  Faq,
  HomeContent,
  LandingPage,
  Locale,
  PageIntroContent,
  PagesContent,
  Project,
  Region,
  SiteContent,
  Testimonial,
} from "@/content/types";
import { DEFAULT_LOCALE } from "@/lib/i18n";

/**
 * The content boundary. Pages call these and pass the result to components.
 * Today they read static modules; when the Elevante admin API exists, each
 * function fetches instead and nothing downstream changes. Every function
 * takes a locale so a second language is a second content directory.
 */
async function load(locale: Locale) {
  switch (locale) {
    case "en":
    default:
      return {
        site: (await import("@/content/en/site")).site,
        home: (await import("@/content/en/home")).home,
        projects: (await import("@/content/en/projects")).projects,
        testimonials: (await import("@/content/en/testimonials")).testimonials,
        faqs: (await import("@/content/en/faqs")).faqs,
        dealers: (await import("@/content/en/dealers")).dealers,
        countries: (await import("@/content/en/dealers")).countries,
        regions: (await import("@/content/en/dealers")).regions,
        articles: (await import("@/content/en/articles")).articles,
        downloads: (await import("@/content/en/downloads")).downloads,
        designOptions: (await import("@/content/en/design-options")).designOptions,
        landingPages: (await import("@/content/en/landing-pages")).landingPages,
        pages: (await import("@/content/en/pages")).pagesContent,
        legal: (await import("@/content/en/pages")).legalPages,
      };
  }
}

export async function getSite(locale: Locale = DEFAULT_LOCALE): Promise<SiteContent> {
  return (await load(locale)).site;
}
export async function getHome(locale: Locale = DEFAULT_LOCALE): Promise<HomeContent> {
  return (await load(locale)).home;
}
export async function getProjects(locale: Locale = DEFAULT_LOCALE): Promise<Project[]> {
  return (await load(locale)).projects;
}
export async function getTestimonials(locale: Locale = DEFAULT_LOCALE): Promise<Testimonial[]> {
  return (await load(locale)).testimonials;
}
export async function getFaqs(locale: Locale = DEFAULT_LOCALE, topic?: Faq["topics"][number]): Promise<Faq[]> {
  const all = (await load(locale)).faqs;
  return topic ? all.filter((f) => f.topics.includes(topic)) : all;
}
export async function getDealers(locale: Locale = DEFAULT_LOCALE): Promise<Dealer[]> {
  return (await load(locale)).dealers;
}
export async function getCountries(locale: Locale = DEFAULT_LOCALE): Promise<Country[]> {
  return (await load(locale)).countries;
}
export async function getRegions(locale: Locale = DEFAULT_LOCALE): Promise<Region[]> {
  return (await load(locale)).regions;
}
export async function getArticles(locale: Locale = DEFAULT_LOCALE): Promise<Article[]> {
  return (await load(locale)).articles;
}
export async function getDownloads(locale: Locale = DEFAULT_LOCALE): Promise<Download[]> {
  return (await load(locale)).downloads;
}
export async function getDesignOptions(locale: Locale = DEFAULT_LOCALE): Promise<DesignOption[]> {
  return (await load(locale)).designOptions;
}
export async function getLandingPages(locale: Locale = DEFAULT_LOCALE): Promise<LandingPage[]> {
  return (await load(locale)).landingPages;
}
export async function getPages(locale: Locale = DEFAULT_LOCALE): Promise<PagesContent> {
  return (await load(locale)).pages;
}
export async function getPageIntro(slug: string, locale: Locale = DEFAULT_LOCALE): Promise<PageIntroContent | undefined> {
  return (await load(locale)).legal[slug];
}
