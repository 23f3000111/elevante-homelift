import { DealerCta } from "@/components/home/DealerCta";
import { DesignTeaser } from "@/components/home/DesignTeaser";
import { EverydayUse } from "@/components/home/EverydayUse";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Idea } from "@/components/home/Idea";
import { Installation } from "@/components/home/Installation";
import { InYourHome } from "@/components/home/InYourHome";
import { ProductReveal } from "@/components/home/ProductReveal";
import { Projects } from "@/components/home/Projects";
import { Trust } from "@/components/home/Trust";
import { UnderTheStaircase } from "@/components/home/UnderTheStaircase";
import { getHome, getProjects, getSite } from "@/lib/content";
import { jsonLdScript, productJsonLd } from "@/lib/seo/jsonld";

/**
 * The homepage is a sequence of sections, each fed from the content layer.
 * Order follows the brief's journey: benefit, recognition, possibility,
 * the system, proof, next step.
 */
export default async function HomePage() {
  const [home, projects, site] = await Promise.all([getHome(), getProjects(), getSite()]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(productJsonLd(site, home)) }} />
      <Hero content={home.hero} />
      <ProductReveal content={home.productReveal} />
      <Idea content={home.idea} />
      <HowItWorks content={home.howItWorks} />
      <UnderTheStaircase content={home.underTheStaircase} />
      <InYourHome content={home.inYourHome} />
      <EverydayUse content={home.everydayUse} />
      <DesignTeaser content={home.design} />
      <Projects content={home.projects} projects={projects} />
      <Installation content={home.installation} />
      <Trust content={home.trust} />
      <DealerCta content={home.dealerCta} />
    </>
  );
}
