import type { Metadata } from "next";
import { DealerCta } from "@/components/home/DealerCta";
import { DesignTeaser } from "@/components/home/DesignTeaser";
import { DesignOptions } from "@/components/pages/DesignOptions";
import { PageHero } from "@/components/pages/PageHero";
import { TextBlocks } from "@/components/pages/TextBlocks";
import { getDesignOptions, getHome, getPages } from "@/lib/content";
import { pageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { design } = await getPages();
  return pageMetadata({ title: design.hero.title, body: design.hero.lead, note: "" }, "/design");
}

/** Design: the composition, the film, the groups the range will fill. No configurator. */
export default async function DesignPage() {
  const [pages, home, options] = await Promise.all([getPages(), getHome(), getDesignOptions()]);
  const { design } = pages;
  return (
    <>
      <PageHero content={design.hero} />
      <TextBlocks blocks={design.blocks} />
      <DesignTeaser content={home.design} />
      <DesignOptions title={design.optionsTitle} note={design.optionsNote} options={options} />
      <DealerCta content={home.dealerCta} />
    </>
  );
}
