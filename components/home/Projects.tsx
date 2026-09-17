"use client";

import Link from "next/link";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Caption } from "@/components/ui/Caption";
import { Picture } from "@/components/ui/Picture";
import { Container } from "@/components/ui/Section";
import { SectionIndex } from "@/components/ui/SectionIndex";
import type { HomeContent, Project } from "@/content/types";
import { revealWithin, useMotion } from "@/lib/motion/useMotion";
import { useHorizontalTrack } from "@/lib/motion/useHorizontalTrack";

const IMG_HOVER = "transition-transform duration-[900ms] ease-[var(--ease-out-quart)] group-hover:scale-[1.04] group-focus-visible:scale-[1.04]";

const ASPECT: Record<Project["ratio"], string> = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[3/2]",
  square: "aspect-square",
};

interface ProjectsProps {
  content: HomeContent["projects"];
  projects: Project[];
}

/**
 * A row of project sheets that reads sideways on a wide screen and down
 * the page on a phone. Entries come from structured data; each is marked
 * as a reference interior until a real installation replaces it.
 */
export function Projects({ content, projects }: ProjectsProps) {
  const ref = useRef<HTMLElement>(null);
  useHorizontalTrack(ref);
  useMotion(ref, ({ scope }) => revealWithin(scope));

  return (
    <section ref={ref} id="projects" aria-labelledby="projects-title" className="overflow-x-clip bg-white py-section lg:py-0">
      <div data-stage className="lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-center lg:py-8">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <SectionIndex index={content.index} label={content.indexLabel} />
              <h2 id="projects-title" data-reveal className="mt-8 text-display-2">
                {content.title}
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <p data-reveal className="max-w-[44ch] text-body-l text-charcoal-soft">
                {content.body}
              </p>
              <div data-reveal className="mt-6">
                <Button href={content.cta.href} variant="quiet">
                  {content.cta.label}
                </Button>
              </div>
            </div>
          </div>
        </Container>

        <div
          data-track-wrap
          className="mt-12 pl-gutter lg:mt-10 lg:overflow-x-auto lg:overscroll-x-contain lg:pl-[max(var(--spacing-gutter),calc((100vw-90rem)/2+var(--spacing-gutter)))]"
        >
          <ol data-track className="flex flex-col gap-14 pr-gutter lg:w-max lg:flex-row lg:items-start lg:gap-16 lg:pr-32">
            {projects.map((project, i) => (
              <li key={project.id} className="w-full shrink-0 lg:w-[38vw] xl:w-[32vw]">
                <Link href={content.cta.href} className="group block border-t border-charcoal pt-5">
                  <div className="flex items-baseline justify-between gap-6">
                    <span className="text-[clamp(3rem,6vw,5.5rem)] leading-none font-medium tracking-[-0.05em] text-stone">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-mono text-small text-caption">{project.placeholder ? content.locationPlaceholder : project.location}</span>
                  </div>
                  <div data-reveal-clip className={`relative mt-6 w-full overflow-hidden ${ASPECT[project.ratio]}`} style={{ maxWidth: project.media.width }}>
                    <Picture asset={project.media} fill sizes="(min-width: 1024px) 38vw, 100vw" className="h-full w-full" imgClassName={IMG_HOVER} />
                  </div>
                  <h3 className="mt-6 text-h3">{project.title}</h3>
                  <p className="mt-2 max-w-[40ch] text-body text-charcoal-soft">{project.summary}</p>
                  <Caption className="mt-3">{project.placeholder ? content.placeholderLabel : project.location}</Caption>
                </Link>
              </li>
            ))}
          </ol>
          <div className="mt-10 mr-gutter hidden h-px bg-stone lg:block">
            <div data-progress className="h-px origin-left scale-x-0 bg-charcoal" />
          </div>
        </div>
      </div>
    </section>
  );
}
