import type { Metadata } from "next";
import { NextStep } from "@/components/pages/NextStep";
import { PageOpening } from "@/components/pages/PageOpening";
import { Testimonials } from "@/components/pages/Placeholders";
import { ProjectSpreads } from "@/components/pages/ProjectSpreads";
import { getHome, getPages, getProjects, getTestimonials } from "@/lib/content";
import { openingMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { inspiration } = await getPages();
  return openingMetadata(inspiration.opening, "/inspiration");
}

/** Inspiration: the interiors as spreads, then customer experiences when they exist. */
export default async function InspirationPage() {
  const [pages, home, projects, testimonials] = await Promise.all([getPages(), getHome(), getProjects(), getTestimonials()]);
  const { inspiration } = pages;
  return (
    <>
      <PageOpening content={inspiration.opening} index="05" />
      <ProjectSpreads projects={projects} kinds={inspiration.kinds} />
      <Testimonials title={inspiration.testimonialsTitle} note={inspiration.testimonialsNote} items={testimonials} />
      <NextStep content={home.finalCta} />
    </>
  );
}
