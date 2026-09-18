import type { Metadata } from "next";
import { MaterialLab } from "@/components/home/MaterialLab";
import { DesignOptions } from "@/components/pages/DesignOptions";
import { Faq } from "@/components/pages/Faq";
import { Ledger } from "@/components/pages/Ledger";
import { NextStep } from "@/components/pages/NextStep";
import { PageOpening } from "@/components/pages/PageOpening";
import { getDesignOptions, getFaqs, getHome, getPages } from "@/lib/content";
import { openingMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { design } = await getPages();
  return openingMetadata(design.opening, "/design");
}

/**
 * Design: the film, the four areas of the design, the material board, and
 * the options as a specification a configurator can grow from.
 */
export default async function DesignPage() {
  const [pages, home, options, faqs] = await Promise.all([getPages(), getHome(), getDesignOptions(), getFaqs("en", "design")]);
  const { design } = pages;
  return (
    <>
      <PageOpening content={design.opening} index="02" />
      <Ledger blocks={design.areas} />
      <MaterialLab content={home.design} index="02" />
      <DesignOptions title={design.optionsTitle} note={design.optionsNote} configuratorNote={design.configuratorNote} groupLabels={design.groupLabels} options={options} />
      {faqs.length > 0 && <Faq title={pages.information.faqTitle} items={faqs} />}
      <NextStep content={home.finalCta} />
    </>
  );
}
