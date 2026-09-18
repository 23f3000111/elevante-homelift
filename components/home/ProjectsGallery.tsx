"use client";

import { useRef } from "react";
import { AppLink } from "@/components/ui/AppLink";
import { Arrow } from "@/components/ui/Arrow";
import { MediaFrame } from "@/components/ui/MediaFrame";
import type { HomeContent, Project } from "@/content/types";
import { useHorizontalTrack } from "@/lib/motion/useHorizontalTrack";

interface ProjectsGalleryProps {
  content: HomeContent["projects"];
  projects: Project[];
  index: string;
}

/**
 * An editorial gallery that moves sideways: each interior a spread with a
 * running number, a title and a line of metadata. Every spread is a link.
 * Until real installations exist, each one says it is a reference interior.
 */
export function ProjectsGallery({ content, projects, index }: ProjectsGalleryProps) {
  const ref = useRef<HTMLElement>(null);
  useHorizontalTrack(ref);

  return (
    <section ref={ref} id="projects" aria-labelledby="projects-title" className="bg-warm-white">
      <div data-stage className="flex min-h-[100svh] flex-col justify-center pt-[calc(var(--spacing-header)+1rem)] pb-[max(2.5rem,env(safe-area-inset-bottom))] lg:pb-14">
        <div className="container-content">
          <div className="sheet items-end gap-y-6">
            <p className="col-span-12 font-mono text-mono text-caption lg:col-span-1">{index}</p>
            <h2 id="projects-title" className="col-span-12 text-display-3 font-medium text-charcoal lg:col-span-6 lg:col-start-3">
              {content.title}
            </h2>
            <p className="col-span-12 max-w-[40ch] text-body text-charcoal-soft lg:col-span-3 lg:col-start-10">{content.body}</p>
          </div>
        </div>

        <div data-track-wrap className="mt-10 lg:mt-14 lg:overflow-x-auto">
          <ul data-track className="grid gap-12 px-gutter lg:ml-[max(0px,calc((100vw-90rem)/2))] lg:flex lg:w-max lg:items-end lg:gap-14" role="list">
            {projects.map((p, i) => (
              <li key={p.id} className="lg:shrink-0">
                <AppLink href={`/inspiration#${p.slug}`} className="group block">
                  <div className="h-[min(24rem,34svh)] min-h-[13rem]">
                    <MediaFrame asset={p.media} sizes="(min-width: 64rem) 40vw, 100vw" tone="white" className="transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-1"  />
                  </div>
                  <div className="mt-4 grid grid-cols-[auto_1fr] items-baseline gap-x-5 border-t border-stone pt-4">
                    <span className="font-mono text-mono text-caption">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="text-h3 font-medium text-charcoal underline decoration-transparent decoration-1 underline-offset-8 transition-[text-decoration-color] duration-300 group-hover:decoration-charcoal group-focus-visible:decoration-charcoal">
                        {p.title}
                      </h3>
                      <p className="mt-1 font-mono text-mono text-caption">
                        {content.kinds[p.kind]} · {p.summary}
                      </p>
                    </div>
                  </div>
                </AppLink>
              </li>
            ))}
            <li className="flex items-end lg:w-[24rem] lg:shrink-0 lg:pr-[10vw]">
              <AppLink href={content.cta.href} className="action">
                {content.cta.label}
                <Arrow />
              </AppLink>
            </li>
          </ul>
        </div>

        <div className="container-content mt-8 flex items-center gap-6 lg:mt-10">
          <p className="font-mono text-mono text-caption">{content.placeholderLabel}</p>
          <div className="hidden h-px flex-1 origin-left bg-oxide lg:block" data-progress style={{ transform: "scaleX(0)" }} />
          <p className="hidden font-mono text-mono text-caption lg:block">{content.dragHint}</p>
        </div>
      </div>
    </section>
  );
}
