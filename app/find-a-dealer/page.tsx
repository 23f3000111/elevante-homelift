import type { Metadata } from "next";
import { DealerLocator } from "@/components/pages/DealerLocator";
import { Faq } from "@/components/pages/Faq";
import { PageOpening } from "@/components/pages/PageOpening";
import { RequestForm } from "@/components/pages/RequestForm";
import { getCountries, getDealers, getFaqs, getPages, getRegions } from "@/lib/content";
import { openingMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { findADealer } = await getPages();
  return openingMetadata(findADealer.opening, "/find-a-dealer");
}

/** The conversion page: locator, showroom note, a short request form, and the questions dealers get. */
export default async function FindADealerPage() {
  const [pages, dealers, countries, regions, faqs] = await Promise.all([getPages(), getDealers(), getCountries(), getRegions(), getFaqs("en", "dealer")]);
  const { findADealer } = pages;
  return (
    <>
      <PageOpening content={findADealer.opening} index="07" />
      <DealerLocator copy={findADealer} countries={countries} regions={regions} dealers={dealers} />
      <RequestForm copy={findADealer} countries={countries} />
      <Faq title={pages.information.faqTitle} items={faqs} />
    </>
  );
}
