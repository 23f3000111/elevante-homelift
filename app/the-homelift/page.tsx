import type { Metadata } from "next";
import { DealerCta } from "@/components/home/DealerCta";
import { EverydayUse } from "@/components/home/EverydayUse";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ProductReveal } from "@/components/home/ProductReveal";
import { Faq } from "@/components/pages/Faq";
import { PageHero } from "@/components/pages/PageHero";
import { TextBlocks } from "@/components/pages/TextBlocks";
import { getFaqs, getHome, getPages } from "@/lib/content";
import { pageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { theHomelift } = await getPages();
  return pageMetadata({ title: theHomelift.hero.title, body: theHomelift.hero.lead, note: "" }, "/the-homelift");
}

/** The product in full: the film, the three stages, everyday use, the questions. */
export default async function TheHomeliftPage() {
  const [pages, home, faqs] = await Promise.all([getPages(), getHome(), getFaqs()]);
  const { theHomelift } = pages;
  return (
    <>
      <PageHero content={theHomelift.hero} />
      <ProductReveal content={home.productReveal} />
      <TextBlocks blocks={theHomelift.blocks} />
      <HowItWorks content={home.howItWorks} />
      <EverydayUse content={home.everydayUse} />
      <Faq title={theHomelift.faqTitle} items={faqs} />
      <DealerCta content={home.dealerCta} />
    </>
  );
}
