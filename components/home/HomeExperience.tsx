"use client";

import { useRef } from "react";
import { AppLink } from "@/components/ui/AppLink";
import { Arrow } from "@/components/ui/Arrow";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollImageSequence } from "@/components/ui/ScrollImageSequence";
import type { HomeContent } from "@/content/types";
import { useMotion } from "@/lib/motion/useMotion";

/**
 * Elevante as part of a home. A photograph as wide as the page, shown
 * whole, drifting slightly against the scroll; then a film the visitor
 * scrubs, with one statement over it. Both say what they are.
 */
export function HomeExperience({ content, index }: { content: HomeContent["inYourHome"]; index: string }) {
  const track = useRef<HTMLDivElement>(null);

  useMotion(track, ({ gsap, scope }) => {
    const line = scope.querySelector("[data-stage-line]");
    if (!line) return;
    gsap.fromTo(
      line,
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, ease: "power2.out", scrollTrigger: { trigger: scope, start: "top top", end: "40% top", scrub: true } },
    );
  });

  return (
    <section id="in-your-home" aria-labelledby="home-title" className="bg-warm-white">
      <Reveal className="container-content pt-section">
        <div className="sheet items-end gap-y-8">
          <p className="col-span-12 font-mono text-mono text-caption lg:col-span-1" data-reveal>
            {index}
          </p>
          <h2 id="home-title" className="col-span-12 max-w-[14ch] text-display-1 font-medium text-charcoal lg:col-span-9 lg:col-start-3" data-reveal>
            {content.title}
          </h2>
        </div>
        <figure className="mt-14 lg:mt-20" data-reveal-clip>
          <div data-parallax="0.1">
            <Picture asset={content.image} sizes="100vw" className="mx-auto" />
          </div>
          <figcaption className="mt-3 font-mono text-mono text-caption">{content.imageLabel}</figcaption>
        </figure>
        <div className="sheet mt-16 gap-y-6 lg:mt-24">
          <p className="col-span-12 max-w-[40ch] text-body-l text-charcoal-soft lg:col-span-6 lg:col-start-3" data-reveal>
            {content.body}
          </p>
          <div className="col-span-12 lg:col-span-3 lg:col-start-10 lg:justify-self-end" data-reveal>
            <AppLink href={content.cta.href} className="action">
              {content.cta.label}
              <Arrow />
            </AppLink>
          </div>
        </div>
      </Reveal>

      <div
        ref={track}
        className="scroll-track mt-section"
        style={{ ["--track" as string]: "200svh", ["--track-mobile" as string]: "170svh" }}
      >
        <div className="scroll-stage bg-stone">
          <ScrollImageSequence sequence={content.sequence} trigger={track} className="absolute inset-0" focus={{ x: 0.5, y: 0.55 }} />
          <div className="absolute inset-0 flex flex-col justify-between">
            <div className="container-content pt-[calc(var(--spacing-header)+1.5rem)]">
              <p data-stage-line className="inline-block max-w-[14ch] bg-warm-white/88 px-5 py-4 text-display-2 font-medium text-charcoal backdrop-blur-md lg:px-7 lg:py-6">
                {content.statement}
              </p>
            </div>
            <div className="container-content pb-6 lg:pb-8">
              <p className="inline-block bg-warm-white/90 px-3 py-2 font-mono text-mono text-caption">{content.sequenceCaption}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
