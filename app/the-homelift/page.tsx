import type { Metadata } from "next";
import { MechanismScene } from "@/components/3d/MechanismScene";
import { EverydayUse } from "@/components/home/EverydayUse";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Safety } from "@/components/home/Safety";
import { Faq } from "@/components/pages/Faq";
import { Ledger } from "@/components/pages/Ledger";
import { NextStep } from "@/components/pages/NextStep";
import { PageOpening } from "@/components/pages/PageOpening";
import { getFaqs, getHome, getPages } from "@/lib/content";
import { openingMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { theHomelift } = await getPages();
  return openingMetadata(theHomelift.opening, "/the-homelift");
}

/**
 * The product in full: the statement, the mechanism the visitor operates by
 * scrolling, the three stages, safety, everyday use, the questions.
 */
export default async function TheHomeliftPage() {
  const [pages, home, faqs] = await Promise.all([getPages(), getHome(), getFaqs("en", "product")]);
  const { theHomelift } = pages;
  const labels = home.mechanism.drawingLabels;
  return (
    <>
      <PageOpening content={theHomelift.opening} index="01" />
      <MechanismScene id="mechanism" content={theHomelift.mechanism} statementAsHeading track={{ desktop: "480svh", mobile: "400svh" }} className="mt-section-sm" />
      <Ledger blocks={theHomelift.blocks} />
      <HowItWorks content={home.howItWorks} drawingLabels={labels} index="02" />
      <Safety content={home.safety} drawingLabels={labels} index="03" />
      <EverydayUse content={home.everydayUse} planLabels={home.cabinPlanLabels} index="04" />
      <Faq title={theHomelift.faqTitle} items={faqs} />
      <NextStep content={home.finalCta} />
    </>
  );
}
