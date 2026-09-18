"use client";

import { useRef } from "react";
import { SectionDrawing } from "@/components/diagram/SectionDrawing";
import { MaskedText } from "@/components/ui/MaskedText";
import type { HomeContent, MechanismContent } from "@/content/types";
import { useMotion } from "@/lib/motion/useMotion";
import { DRAWING, STOREY } from "@/lib/scene/geometry";

interface StaircaseStaysProps {
  content: HomeContent["staircaseStays"];
  drawingLabels: MechanismContent["drawingLabels"];
  index: string;
}

/**
 * Two statements in very large type, and a drawing in which only one thing
 * moves. The first line is there from the start; the second rises into
 * place as the cabin travels; the staircase never changes.
 */
export function StaircaseStays({ content, drawingLabels, index }: StaircaseStaysProps) {
  const ref = useRef<HTMLDivElement>(null);

  useMotion(ref, ({ gsap, scope, matches }) => {
    const wordsB = scope.querySelectorAll("[data-line-b] [data-mask-word]");
    const wordsA = scope.querySelectorAll("[data-line-a] [data-mask-word]");
    const body = scope.querySelector("[data-body]");
    const cabin = scope.querySelector("[data-part='cabin']");
    const upper = scope.querySelector("[data-part='door-upper']");
    const leafL = scope.querySelector("[data-part='door-lower-l']");
    const leafR = scope.querySelector("[data-part='door-lower-r']");
    const desktop = matches("(min-width: 64rem)");

    gsap.to(wordsA, {
      y: 0,
      duration: 1,
      ease: "expo.out",
      stagger: 0.04,
      scrollTrigger: { trigger: scope, start: "top 70%", once: true },
    });

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: scope, start: "top top", end: "bottom bottom", scrub: 0.5 },
    });
    const slide = 0.4 * DRAWING.scale;
    if (leafL && leafR) {
      tl.fromTo(leafL, { attr: { transform: `translate(${-slide} 0)` } }, { attr: { transform: "translate(0 0)" }, duration: 0.1 }, 0.05);
      tl.fromTo(leafR, { attr: { transform: `translate(${slide} 0)` } }, { attr: { transform: "translate(0 0)" }, duration: 0.1 }, 0.05);
    }
    if (upper) tl.fromTo(upper, { attr: { "stroke-dashoffset": 0 } }, { attr: { "stroke-dashoffset": 1 }, duration: 0.15 }, 0.2);
    if (cabin) tl.fromTo(cabin, { attr: { transform: "translate(0 0)" } }, { attr: { transform: `translate(0 ${-STOREY * DRAWING.scale})` }, duration: 0.55 }, 0.25);
    tl.to(wordsB, { y: 0, stagger: 0.02, duration: 0.25, ease: "power2.out" }, desktop ? 0.4 : 0.3);
    if (body) tl.fromTo(body, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.15 }, 0.72);
  });

  return (
    <section
      ref={ref}
      aria-labelledby="stays-title"
      className="scroll-track bg-warm-white"
      style={{ ["--track" as string]: "200svh", ["--track-mobile" as string]: "180svh" }}
    >
      <div className="scroll-stage">
        <div className="container-content flex h-full flex-col pt-[calc(var(--spacing-header)+1rem)] pb-8 lg:pb-10">
          <p className="font-mono text-mono text-caption">{index}</p>
          <div className="sheet flex-1 items-center gap-y-10">
            <div className="col-span-12 lg:col-span-7">
              <h2 id="stays-title" className="text-display-1 font-medium text-charcoal">
                <MaskedText as="span" text={content.titleA} className="block" data-line-a />
                <MaskedText as="span" text={content.titleB} className="mt-3 block text-charcoal-soft/80 lg:mt-5" data-line-b />
              </h2>
              <p data-body className="mt-10 max-w-[44ch] text-body-l text-charcoal-soft">
                {content.body}
              </p>
            </div>
            <div className="col-span-12 lg:col-span-5">
              <SectionDrawing progress={0.5} title={content.drawingTitle} desc={content.drawingDesc} labels={drawingLabels} />
              <p className="mt-3 font-mono text-mono text-caption">{content.note}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
