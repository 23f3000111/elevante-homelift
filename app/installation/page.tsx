import type { Metadata } from "next";
import { DealerCta } from "@/components/home/DealerCta";
import { Installation } from "@/components/home/Installation";
import { PageHero } from "@/components/pages/PageHero";
import { TextBlocks } from "@/components/pages/TextBlocks";
import { getHome, getPages } from "@/lib/content";
import { pageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { installation } = await getPages();
  return pageMetadata({ title: installation.hero.title, body: installation.hero.lead, note: "" }, "/installation");
}

/** The seven stages, then who does the work and what happens before and after. */
export default async function InstallationPage() {
  const [pages, home] = await Promise.all([getPages(), getHome()]);
  const { installation } = pages;
  return (
    <>
      <PageHero content={installation.hero} />
      <Installation content={home.installation} />
      <TextBlocks blocks={installation.blocks} />
      <DealerCta content={home.dealerCta} />
    </>
  );
}
