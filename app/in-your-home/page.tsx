import type { Metadata } from "next";
import { DealerCta } from "@/components/home/DealerCta";
import { InYourHome } from "@/components/home/InYourHome";
import { UnderTheStaircase } from "@/components/home/UnderTheStaircase";
import { PageHero } from "@/components/pages/PageHero";
import { TextBlocks } from "@/components/pages/TextBlocks";
import { getHome, getPages } from "@/lib/content";
import { pageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { inYourHome } = await getPages();
  return pageMetadata({ title: inYourHome.hero.title, body: inYourHome.hero.lead, note: "" }, "/in-your-home");
}

/** Existing houses: the gallery, the space beneath the stair, the plan comparison. */
export default async function InYourHomePage() {
  const [pages, home] = await Promise.all([getPages(), getHome()]);
  const { inYourHome } = pages;
  return (
    <>
      <PageHero content={inYourHome.hero} />
      <InYourHome content={home.inYourHome} />
      <UnderTheStaircase content={home.underTheStaircase} />
      <TextBlocks blocks={inYourHome.blocks} tone="warm-white" />
      <DealerCta content={home.dealerCta} />
    </>
  );
}
