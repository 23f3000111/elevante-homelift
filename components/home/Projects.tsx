"use client";

import { AppLink } from "@/components/ui/AppLink";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Caption } from "@/components/ui/Caption";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Container } from "@/components/ui/Section";
import { SectionIndex } from "@/components/ui/SectionIndex";
import type { HomeContent, Project } from "@/content/types";
import { revealWithin, useMotion } from "@/lib/motion/useMotion";
import { useHorizontalTrack } from "@/lib/motion/useHorizontalTrack";

const IMG_HOVER =
  "transition-transform duration-[900ms] ease-[var(--ease-out-quart)] group-hover:-translate-y-1";

interface ProjectsProps {
  content: HomeContent["projects"];
  projects: Project[];
}

/**
 * Project sheets read sideways on a wide screen and down the page on a
 * phone. Each sheet is the same size, with its picture shown whole inside
 * a frame of fixed height. Entries come from structured data; each is
 * marked as a reference interior until a real installation replaces it.
 */
export function Projects({ content, projects }: ProjectsProps) {
  const ref = useRef<HTMLElement>(null);
  useHorizontalTrack(ref);
  useMotion(ref, ({ scope }) => revealWithin(scope));

  return (
    <section
      ref={ref}
      id="projects"
      aria-labelledby="projects-title"
      className="overflow-x-clip bg-white py-section-sm lg:py-0"
    >
      <div
        data-stage
        className="lg:flex lg:h-[calc(100svh-4rem)] lg:flex-col lg:justify-center lg:py-6"
      >
        <Container>
          <div className="grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-8">
            <div className="lg:col-span-2">
              <SectionIndex
                index={content.index}
                label={content.indexLabel}
                size="small"
              />
            </div>
            <h2
              id="projects-title"
              data-reveal
              className="max-w-[12ch] text-[clamp(2.25rem,4vw,3.5rem)] leading-[1] font-medium tracking-[-0.03em] text-charcoal lg:col-span-5"
            >
              {content.title}
            </h2>
            <div className="lg:col-span-4 lg:col-start-9">
              <p
                data-reveal
                className="max-w-[44ch] text-body text-charcoal-soft"
              >
                {content.body}
              </p>
              <div data-reveal className="mt-3">
                <Button href={content.cta.href} variant="quiet">
                  {content.cta.label}
                </Button>
              </div>
            </div>
          </div>
        </Container>

        <div
          data-track-wrap
          className="mt-8 pl-gutter lg:mt-8 lg:overflow-x-auto lg:overscroll-x-contain lg:pl-[max(var(--spacing-gutter),calc((100vw-90rem)/2+var(--spacing-gutter)))]"
        >
          <ol
            data-track
            className="flex flex-col gap-12 pr-gutter lg:w-max lg:flex-row lg:items-start lg:gap-10 lg:pr-32"
          >
            {projects.map((project, i) => (
              <li key={project.id} className="w-full shrink-0 lg:w-[26rem]">
                <AppLink
                  href={content.cta.href}
                  className="group block border-t border-charcoal pt-3"
                >
                  <div className="flex items-baseline justify-between gap-8">
                    <span className="text-[clamp(2.25rem,3.4vw,3rem)] leading-none font-medium tracking-[-0.05em] text-stone">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-small text-caption">
                      {project.placeholder
                        ? content.locationPlaceholder
                        : project.location}
                    </span>
                  </div>
                  <div
                    data-reveal-clip
                    className="mt-3 h-[58vw] max-h-[20rem] sm:h-[18rem] lg:h-[clamp(13rem,34svh,19rem)]"
                  >
                    <MediaFrame
                      asset={project.media}
                      tone="warm-white"
                      sizes="(min-width: 1024px) 26rem, 92vw"
                      imgClassName={IMG_HOVER}
                    />
                  </div>
                  <h3 className="mt-4 text-[1.375rem] leading-tight font-medium text-charcoal">
                    {project.title}
                  </h3>
                  <p className="mt-1 max-w-[40ch] text-small text-charcoal-soft">
                    {project.summary}
                  </p>
                  <Caption className="mt-2">
                    {project.placeholder
                      ? content.placeholderLabel
                      : project.location}
                  </Caption>
                </AppLink>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-6 mr-gutter ml-gutter hidden h-px shrink-0 bg-stone lg:block">
          <div
            data-progress
            className="h-px origin-left scale-x-0 bg-charcoal"
          />
        </div>
      </div>
    </section>
  );
}
