"use client";

import { useRef } from "react";
import { PlanDrawing } from "@/components/diagram/PlanDrawing";
import { SectionDrawing } from "@/components/diagram/SectionDrawing";
import { MaskedText } from "@/components/ui/MaskedText";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Picture } from "@/components/ui/Picture";
import { VideoLoop } from "@/components/ui/VideoLoop";
import type { PageOpeningContent } from "@/content/types";
import { useMotion } from "@/lib/motion/useMotion";

/**
 * The opening of every secondary page: the section's name in mono, the
 * statement in very large type, the lead, and an aside that says what the
 * page is about — a drawing or a picture — so the sheet beside the
 * statement is never blank. One load moment: the words rise.
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

  const aside = content.aside;

  return (
    <section ref={ref} aria-labelledby="page-title" className="relative isolate overflow-hidden bg-warm-white pt-[calc(var(--spacing-header)+2rem)] lg:pt-[calc(var(--spacing-header)+3rem)]">
      {/* The drawing sheet, as on the homepage. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 container-content">
        <div className="sheet h-full">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="h-full border-l border-stone/60 last:border-r" />
          ))}
        </div>
      </div>

      <div className="relative container-content">
        <p data-hero-fade className="font-mono text-mono text-caption">
          {index} / {content.eyebrow}
        </p>
        <div className="sheet mt-8 gap-y-8 lg:mt-10">
          <MaskedText as="h1" id="page-title" text={content.title} className="col-span-12 max-w-[12ch] text-display-1 font-medium text-charcoal lg:col-span-7" />
          <div className="col-span-12 lg:col-span-4 lg:col-start-9 lg:self-end">
            <p data-hero-fade className="max-w-[44ch] text-body-l text-charcoal-soft">
              {content.lead}
            </p>
            {aside && (
              <figure data-hero-fade className="mt-8">
                {aside.drawing === "section" ? (
                  <SectionDrawing progress={1} title={aside.title} desc={aside.desc} />
                ) : aside.drawing === "plan" ? (
                  <PlanDrawing variant="elevante" title={aside.title} desc={aside.desc} />
                ) : aside.media ? (
                  <div className="h-[16rem]">
                    <MediaFrame asset={aside.media} sizes="(min-width: 64rem) 30vw, 100vw" tone="white" className="w-fit" />
                  </div>
                ) : null}
                <figcaption className="mt-2.5 font-mono text-mono text-caption">{aside.caption}</figcaption>
              </figure>
            )}
          </div>
        </div>
      </div>

      {!content.media && !content.video && (
        <div className="relative container-content mt-14 lg:mt-20">
          <div data-hero-fade className="rule" />
        </div>
      )}

      {(content.media || content.video) && (
        <figure className="relative mt-14 lg:mt-20">
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
          {content.caption && <figcaption className="container-content mt-3 font-mono text-mono text-caption">{content.caption}</figcaption>}
        </figure>
      )}
    </section>
  );
}
