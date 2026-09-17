import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/layout/PageIntro";
import { getPageIntro, getSite } from "@/lib/content";
import { SECONDARY_SLUGS } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo/metadata";

/**
 * Every route the navigation and footer point to. Each renders an intro
 * from content so no link is dead while the full pages are built.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return SECONDARY_SLUGS.map((slug) => ({ slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const intro = await getPageIntro(slug);
  if (!intro) return {};
  return pageMetadata(intro, `/${slug}`);
}

export default async function SecondaryPage({ params }: Params) {
  const { slug } = await params;
  const [intro, site] = await Promise.all([getPageIntro(slug), getSite()]);
  if (!intro) notFound();
  return <PageIntro intro={intro} dealerCta={site.dealerCta} />;
}
