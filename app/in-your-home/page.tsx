import type { Metadata } from "next";
import { Comparison } from "@/components/home/Comparison";
import { HomeExperience } from "@/components/home/HomeExperience";
import { UnderTheStaircase } from "@/components/home/UnderTheStaircase";
import { Faq } from "@/components/pages/Faq";
import { Ledger } from "@/components/pages/Ledger";
import { NextStep } from "@/components/pages/NextStep";
import { PageOpening } from "@/components/pages/PageOpening";
import { Configurations, Statement } from "@/components/pages/Placeholders";
import { getFaqs, getHome, getPages } from "@/lib/content";
import { openingMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { inYourHome } = await getPages();
  return openingMetadata(inYourHome.opening, "/in-your-home");
}

/**
 * In your home: existing houses, the space beneath the staircase in plan
 * and section, the three alternatives compared, configurations, examples.
 */
export default async function InYourHomePage() {
  const [pages, home, faqs] = await Promise.all([getPages(), getHome(), getFaqs("en", "home")]);
  const { inYourHome } = pages;
  const labels = home.mechanism.drawingLabels;
  return (
    <>
      <PageOpening content={inYourHome.opening} index="03" />
      <Ledger blocks={inYourHome.blocks} />
      <UnderTheStaircase content={home.underTheStaircase} drawingLabels={labels} planLabels={home.planLabels} index="02" />
      <Comparison content={home.comparison} planLabels={home.planLabels} index="03" />
      <Configurations title={inYourHome.configurationsTitle} note={inYourHome.configurationsNote} items={inYourHome.configurations} />
      <HomeExperience content={home.inYourHome} index="04" />
      <Statement id="examples" title={inYourHome.examplesTitle} body={inYourHome.examplesNote} />
      <Faq title={pages.information.faqTitle} items={faqs} />
      <NextStep content={home.finalCta} />
    </>
  );
}
