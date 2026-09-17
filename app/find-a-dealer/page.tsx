import type { Metadata } from "next";
import { DealerLocator } from "@/components/pages/DealerLocator";
import { PageHero } from "@/components/pages/PageHero";
import { RequestForm } from "@/components/pages/RequestForm";
import { getDealers, getMarkets, getPages } from "@/lib/content";
import { pageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { findADealer } = await getPages();
  return pageMetadata({ title: findADealer.hero.title, body: findADealer.hero.lead, note: "" }, "/find-a-dealer");
}

/** The conversion page: locator, showroom note, and a short request form. */
export default async function FindADealerPage() {
  const [pages, dealers, markets] = await Promise.all([getPages(), getDealers(), getMarkets()]);
  const { findADealer } = pages;
  return (
    <>
      <PageHero content={findADealer.hero} />
      <DealerLocator copy={findADealer} markets={markets} dealers={dealers} />
      <RequestForm copy={findADealer} markets={markets} />
    </>
  );
}
