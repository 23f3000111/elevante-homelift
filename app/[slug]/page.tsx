import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/layout/PageIntro";
import { getPageIntro, getSite } from "@/lib/content";
import { LEGAL_SLUGS } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo/metadata";

/** Privacy, cookies and terms: one intro template until the legal text arrives. */
export const dynamicParams = false;

export function generateStaticParams() {
  return LEGAL_SLUGS.map((slug) => ({ slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const intro = await getPageIntro(slug);
  if (!intro) return {};
  return pageMetadata({ title: intro.title, description: intro.body }, `/${slug}`);
}

export default async function LegalPage({ params }: Params) {
  const { slug } = await params;
  const [intro, site] = await Promise.all([getPageIntro(slug), getSite()]);
  if (!intro) notFound();
  return <PageIntro intro={intro} dealerCta={site.dealerCta} />;
}
