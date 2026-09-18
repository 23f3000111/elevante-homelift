import { Comparison } from "@/components/home/Comparison";
import { Evidence } from "@/components/home/Evidence";
import { EverydayUse } from "@/components/home/EverydayUse";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { HomeExperience } from "@/components/home/HomeExperience";
import { HowItWorks } from "@/components/home/HowItWorks";
import { InstallationTimeline } from "@/components/home/InstallationTimeline";
import { Lead } from "@/components/home/Lead";
import { MaterialLab } from "@/components/home/MaterialLab";
import { ProjectsGallery } from "@/components/home/ProjectsGallery";
import { Safety } from "@/components/home/Safety";
import { StaircaseStays } from "@/components/home/StaircaseStays";
import { UnderTheStaircase } from "@/components/home/UnderTheStaircase";
import { getHome, getProjects, getSite } from "@/lib/content";
import { jsonLdScript, productJsonLd } from "@/lib/seo/jsonld";

/**
 * The homepage is a film in sections, each fed from the content layer. The
 * order follows the brief's journey: benefit, recognition, possibility, the
 * system, proof, next step. The running number is the film's chapter mark.
 */
export default async function HomePage() {
  const [home, projects, site] = await Promise.all([getHome(), getProjects(), getSite()]);
  const labels = home.mechanism.drawingLabels;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(productJsonLd(site, home)) }} />
      <Hero hero={home.hero} mechanism={home.mechanism} />
      <Lead content={home.lead} index="01" />
      <StaircaseStays content={home.staircaseStays} drawingLabels={labels} index="02" />
      <Comparison content={home.comparison} planLabels={home.planLabels} index="03" />
      <HowItWorks content={home.howItWorks} drawingLabels={labels} index="04" />
      <UnderTheStaircase content={home.underTheStaircase} drawingLabels={labels} planLabels={home.planLabels} index="05" />
      <HomeExperience content={home.inYourHome} index="06" />
      <EverydayUse content={home.everydayUse} planLabels={home.cabinPlanLabels} index="07" />
      <Safety content={home.safety} drawingLabels={labels} index="08" />
      <MaterialLab content={home.design} index="09" />
      <ProjectsGallery content={home.projects} projects={projects} index="10" />
      <InstallationTimeline content={home.installation} index="11" />
      <Evidence content={home.evidence} index="12" />
      <FinalCta content={home.finalCta} />
    </>
  );
}
