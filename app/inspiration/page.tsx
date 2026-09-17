import type { Metadata } from "next";
import { DealerCta } from "@/components/home/DealerCta";
import { InYourHome } from "@/components/home/InYourHome";
import { Projects } from "@/components/home/Projects";
import { PageHero } from "@/components/pages/PageHero";
import { Testimonials } from "@/components/pages/Testimonials";
import { getHome, getPages, getProjects, getTestimonials } from "@/lib/content";
import { pageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { inspiration } = await getPages();
  return pageMetadata({ title: inspiration.hero.title, body: inspiration.hero.lead, note: "" }, "/inspiration");
}

/** Photography, projects and, in time, customer experiences. */
export default async function InspirationPage() {
  const [pages, home, projects, testimonials] = await Promise.all([getPages(), getHome(), getProjects(), getTestimonials()]);
  const { inspiration } = pages;
  return (
    <>
      <PageHero content={inspiration.hero} />
      <Projects content={home.projects} projects={projects} />
      <InYourHome content={home.inYourHome} />
      <Testimonials title={inspiration.testimonialsTitle} note={inspiration.testimonialsNote} items={testimonials} />
      <DealerCta content={home.dealerCta} />
    </>
  );
}
