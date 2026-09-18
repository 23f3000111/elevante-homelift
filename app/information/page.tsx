import type { Metadata } from "next";
import { Faq } from "@/components/pages/Faq";
import { NextStep } from "@/components/pages/NextStep";
import { PageOpening } from "@/components/pages/PageOpening";
import { Statement } from "@/components/pages/Placeholders";
import { Downloads, SpecLedger } from "@/components/pages/SpecLedger";
import { getDownloads, getFaqs, getHome, getPages } from "@/lib/content";
import { openingMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { information } = await getPages();
  return openingMetadata(information.opening, "/information");
}

/**
 * Information: every technical topic with its status, the downloads, the
 * full set of questions, and a word for professionals.
 */
export default async function InformationPage() {
  const [pages, home, downloads, faqs] = await Promise.all([getPages(), getHome(), getDownloads(), getFaqs("en", "information")]);
  const { information } = pages;
  return (
    <>
      <PageOpening content={information.opening} index="06" />
      <SpecLedger title={information.specsTitle} note={information.specsNote} statusLabel={information.statusLabel} rows={information.specs} />
      <Downloads
        title={information.downloadsTitle}
        note={information.downloadsNote}
        kinds={information.downloadKinds}
        items={downloads}
        pendingLabel={information.pendingLabel}
        downloadLabel={information.downloadLabel}
      />
      <Statement id="professionals" title={information.professionalsTitle} body={information.professionalsBody} />
      <Faq title={information.faqTitle} items={faqs} />
      <NextStep content={home.finalCta} />
    </>
  );
}
