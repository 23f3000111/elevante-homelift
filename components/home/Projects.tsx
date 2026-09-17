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
 * A row of project sheets that reads sideways on a wide screen, each sheet
 * sized to the stage so the whole row stays on screen, and down the page on
 * a phone. Entries come from structured data; each is marked as a reference
 * interior until a real installation replaces it.
 */
export function Projects({ content, projects }: ProjectsProps) {
  const ref = useRef<HTMLElement>(null);
  useHorizontalTrack(ref);
  useMotion(ref, ({ scope }) => revealWithin(scope));

  return (
    <section ref={ref} id="projects" aria-labelledby="projects-title" className="overflow-x-clip bg-white py-section lg:py-0">
      <div data-stage className="lg:flex lg:h-[calc(100svh-4rem)] lg:flex-col lg:py-6">
        <Container>
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
            <div className="lg:col-span-2">
              <SectionIndex index={content.index} label={content.indexLabel} size="small" />
            </div>
            <h2 id="projects-title" data-reveal className="max-w-[12ch] text-[clamp(2.25rem,4vw,3.75rem)] leading-[1] font-medium tracking-[-0.03em] text-charcoal lg:col-span-5">
              {content.title}
            </h2>
            <div className="lg:col-span-4 lg:col-start-9">
              <p data-reveal className="max-w-[44ch] text-body text-charcoal-soft">
                {content.body}
              </p>
              <div data-reveal className="mt-4">
                <Button href={content.cta.href} variant="quiet">
                  {content.cta.label}
                </Button>
              </div>
            </div>
          </div>
        </Container>

        <div
          data-track-wrap
          className="mt-10 pl-gutter lg:mt-6 lg:min-h-0 lg:flex-1 lg:overflow-x-auto lg:overscroll-x-contain lg:pl-[max(var(--spacing-gutter),calc((100vw-90rem)/2+var(--spacing-gutter)))]"
        >
          <ol data-track className="flex flex-col gap-14 pr-gutter lg:h-full lg:w-max lg:flex-row lg:items-stretch lg:gap-14 lg:pr-32">
            {projects.map((project, i) => (
              <li key={project.id} className="w-full shrink-0 lg:flex lg:w-auto lg:flex-col">
                <Link href={content.cta.href} className="group flex h-full flex-col border-t border-charcoal pt-4">
                  <div className="flex shrink-0 items-baseline justify-between gap-10">
                    <span className="text-[clamp(2.5rem,4vw,3.5rem)] leading-none font-medium tracking-[-0.05em] text-stone">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-mono text-small text-caption">{project.placeholder ? content.locationPlaceholder : project.location}</span>
                  </div>
                  <div
                    data-reveal-clip
                    className={`relative mt-4 w-full overflow-hidden lg:min-h-0 lg:w-auto lg:flex-1 ${ASPECT[project.ratio]}`}
                    style={{ maxWidth: project.media.width }}
                  >
                    <Picture asset={project.media} fill sizes="(min-width: 1024px) 34vw, 100vw" className="h-full w-full" imgClassName={IMG_HOVER} />
                  </div>
                  <div className="shrink-0 pt-4">
                    <h3 className="text-[1.375rem] leading-tight font-medium text-charcoal">{project.title}</h3>
                    <p className="mt-1 max-w-[40ch] text-small text-charcoal-soft">{project.summary}</p>
                    <Caption className="mt-2">{project.placeholder ? content.placeholderLabel : project.location}</Caption>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-6 mr-gutter ml-gutter hidden h-px shrink-0 bg-stone lg:block">
          <div data-progress className="h-px origin-left scale-x-0 bg-charcoal" />
        </div>
      </div>
    </section>
  );
}
