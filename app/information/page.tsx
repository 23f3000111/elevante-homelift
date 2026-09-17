import type { Metadata } from "next";
import { DealerCta } from "@/components/home/DealerCta";
import { Downloads } from "@/components/pages/Downloads";
import { Faq } from "@/components/pages/Faq";
import { PageHero } from "@/components/pages/PageHero";
import { SpecLedger } from "@/components/pages/SpecLedger";
import { getDownloads, getFaqs, getHome, getPages } from "@/lib/content";
import { pageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { information } = await getPages();
  return pageMetadata({ title: information.hero.title, body: information.hero.lead, note: "" }, "/information");
}

/** Technical topics with their status, downloads, and the questions. Nothing invented. */
export default async function InformationPage() {
  const [pages, home, downloads, faqs] = await Promise.all([getPages(), getHome(), getDownloads(), getFaqs()]);
  const { information } = pages;
  return (
    <>
      <PageHero content={information.hero} />
      <SpecLedger title={information.specsTitle} note={information.specsNote} rows={information.specs} />
      <Downloads title={information.downloadsTitle} note={information.downloadsNote} items={downloads} />
      <Faq title={information.faqTitle} items={faqs} />
      <DealerCta content={home.dealerCta} />
    </>
  );
}
