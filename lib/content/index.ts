import type {
  Article,
  Dealer,
  DesignOption,
  Download,
  Faq,
  HomeContent,
  Locale,
  PageIntroContent,
  Project,
  SiteContent,
  Testimonial,
} from "@/content/types";

/**
 * The content boundary. Pages call these and pass the result to components.
 * Today they read static modules; when the Elevante admin API exists, each
 * function fetches instead and nothing downstream changes.
 */

const DEFAULT_LOCALE: Locale = "en";

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
        articles: (await import("@/content/en/articles")).articles,
        downloads: (await import("@/content/en/downloads")).downloads,
        designOptions: (await import("@/content/en/design-options")).designOptions,
        pages: (await import("@/content/en/pages")).pages,
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
export async function getFaqs(locale: Locale = DEFAULT_LOCALE): Promise<Faq[]> {
  return (await load(locale)).faqs;
}
export async function getDealers(locale: Locale = DEFAULT_LOCALE): Promise<Dealer[]> {
  return (await load(locale)).dealers;
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
export async function getPageIntro(
  slug: string,
  locale: Locale = DEFAULT_LOCALE,
): Promise<PageIntroContent | undefined> {
  return (await load(locale)).pages[slug];
}
