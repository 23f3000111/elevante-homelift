"use client";

import { useRef } from "react";
import { MaskedText } from "@/components/ui/MaskedText";
import { Picture } from "@/components/ui/Picture";
import { VideoLoop } from "@/components/ui/VideoLoop";
import type { PageOpeningContent } from "@/content/types";
import { useMotion } from "@/lib/motion/useMotion";

/**
 * The opening of every secondary page: the section's name in mono, the
 * statement in very large type, the lead, and where there is one, a
 * picture as wide as the page or a film. One load moment: the words rise.
 */
export function PageOpening({ content, index }: { content: PageOpeningContent; index: string }) {
  const ref = useRef<HTMLElement>(null);

  useMotion(ref, ({ gsap, scope }) => {
    const words = scope.querySelectorAll("[data-mask-word]");
    const fades = scope.querySelectorAll("[data-hero-fade]");
    const media = scope.querySelector("[data-opening-media]");
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.to(words, { y: 0, duration: 1.1, stagger: 0.04 }, 0.1);
    tl.fromTo(fades, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.1 }, 0.55);
    if (media) tl.fromTo(media, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 1.4 }, 0.5);
  });

  return (
    <section ref={ref} aria-labelledby="page-title" className="bg-warm-white pt-[calc(var(--spacing-header)+2rem)] lg:pt-[calc(var(--spacing-header)+3.5rem)]">
      <div className="container-content">
        <p data-hero-fade className="font-mono text-mono text-caption">
          {index} / {content.eyebrow}
        </p>
        <div className="sheet mt-8 gap-y-8 lg:mt-12">
          <MaskedText as="h1" id="page-title" text={content.title} className="col-span-12 max-w-[12ch] text-display-1 font-medium text-charcoal lg:col-span-9" />
          <p data-hero-fade className="col-span-12 max-w-[44ch] text-body-l text-charcoal-soft lg:col-span-5 lg:col-start-8 lg:mt-4">
            {content.lead}
          </p>
        </div>
      </div>

      {(content.media || content.video) && (
        <figure className="mt-14 lg:mt-20">
          <div data-opening-media>
            {content.video ? (
              <div className="h-[70svh] min-h-[22rem] w-full bg-stone">
                <VideoLoop video={content.video} eager className="h-full w-full object-cover" />
              </div>
            ) : content.media ? (
              <div className="container-content">
                <Picture asset={content.media} sizes="100vw" priority className="mx-auto" />
              </div>
            ) : null}
          </div>
          {content.caption && (
            <figcaption className="container-content mt-3 font-mono text-mono text-caption">{content.caption}</figcaption>
          )}
        </figure>
      )}
    </section>
  );
}
