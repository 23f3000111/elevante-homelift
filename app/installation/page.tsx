import type { Metadata } from "next";
import { InstallationTimeline } from "@/components/home/InstallationTimeline";
import { Faq } from "@/components/pages/Faq";
import { Ledger } from "@/components/pages/Ledger";
import { NextStep } from "@/components/pages/NextStep";
import { PageOpening } from "@/components/pages/PageOpening";
import { Statement } from "@/components/pages/Placeholders";
import { getFaqs, getHome, getPages } from "@/lib/content";
import { openingMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { installation } = await getPages();
  return openingMetadata(installation.opening, "/installation");
}

/**
 * Installation: the seven stages as one drawing, who does the work, what
 * happens before, and the service arrangement.
 */
export default async function InstallationPage() {
  const [pages, home, faqs] = await Promise.all([getPages(), getHome(), getFaqs("en", "installation")]);
  const { installation } = pages;
  return (
    <>
      <PageOpening content={installation.opening} index="04" />
      <InstallationTimeline content={home.installation} index="04" />
      <Ledger blocks={installation.blocks} tone="white" />
      <Statement id="service" title={installation.serviceTitle} body={installation.serviceBody} note={installation.servicePlaceholder} />
      <Faq title={pages.information.faqTitle} items={faqs} />
      <NextStep content={home.finalCta} />
    </>
  );
}
