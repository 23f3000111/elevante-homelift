"use client";

import { useRef } from "react";
import { StairSection, STOREY } from "@/components/diagram/StairSection";
import { Caption } from "@/components/ui/Caption";
import { Container } from "@/components/ui/Section";
import { VideoLoop } from "@/components/ui/VideoLoop";
import type { HomeContent } from "@/content/types";
import { DESKTOP } from "@/lib/motion/gsap";
import { useMotion } from "@/lib/motion/useMotion";

/**
 * Where the visitor first understands the product. The drawing builds line
 * by line as the page scrolls, the cabin appears in the space beneath the
 * stair, its door opens, and it travels to the upper floor. On desktop the
 * scene is pinned and scrubbed; on smaller screens it plays through once
 * as it enters. The film below is atmosphere and says so.
 */
export function ProductReveal({ content }: { content: HomeContent["productReveal"] }) {
  const ref = useRef<HTMLElement>(null);

  useMotion(ref, ({ gsap, scope, matches }) => {
    const stage = scope.querySelector<HTMLElement>("[data-stage]");
    if (!stage) return;
    const draw = scope.querySelectorAll("[data-draw]");
    const voidPart = scope.querySelector('[data-part="void"]');
    const path = scope.querySelector('[data-part="path"]');
    const labels = scope.querySelector('[data-part="labels"]');
    const cabin = scope.querySelector('[data-part="cabin"]');
    const doorLower = scope.querySelector('[data-part="door-lower"]');
    const doorUpper = scope.querySelector('[data-part="door-upper"]');
    const lines = scope.querySelectorAll("[data-line]");
    const note = scope.querySelector("[data-note]");

    gsap.set(draw, { strokeDasharray: 1, strokeDashoffset: 1 });
    gsap.set([voidPart, path, labels, cabin, note], { autoAlpha: 0 });
    gsap.set(lines, { autoAlpha: 0, y: 16 });

    const desktop = matches(DESKTOP);
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: desktop
        ? { trigger: stage, start: "top top+=80", end: "+=220%", pin: true, scrub: 0.6, anticipatePin: 1 }
        : { trigger: stage, start: "top 70%", toggleActions: "play none none none" },
    });
    if (!desktop) tl.timeScale(1.4);

    tl.to(draw, { strokeDashoffset: 0, duration: 2.2, stagger: 0.12, ease: "power1.inOut" }, 0)
      .to(lines[0], { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" }, 1.0)
      .to([voidPart, path], { autoAlpha: 1, duration: 0.8 }, 1.8)
      .to(labels, { autoAlpha: 1, duration: 0.6 }, 2.4)
      .to(cabin, { autoAlpha: 1, duration: 0.6 }, 2.8)
      .to(note, { autoAlpha: 1, duration: 0.4 }, 3.0)
      .to(doorLower, { strokeDashoffset: 1, duration: 0.7 }, 3.6)
      .to(doorLower, { strokeDashoffset: 0, duration: 0.7 }, 4.8)
      .to(lines[1], { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" }, 5.0)
      .to(cabin, { y: -STOREY, duration: 3.2, ease: "power1.inOut" }, 5.6)
      .to(doorUpper, { strokeDashoffset: 1, duration: 0.7 }, 9.0)
      .to({}, { duration: 0.8 }, 9.7);
  });

  return (
    <section ref={ref} id="product" aria-labelledby="product-title" className="bg-warm-white">
      <div data-stage className="flex items-center py-14 lg:min-h-[calc(100svh-5rem)] lg:py-8">
        <Container className="w-full">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-8">
            <div className="lg:col-span-4">
              <h2 id="product-title" className="text-display-2">
                {content.title}
              </h2>
              <div className="mt-8 space-y-4">
                {content.lines.map((line) => (
                  <p key={line} data-line className="max-w-[40ch] text-body-l text-charcoal-soft">
                    {line}
                  </p>
                ))}
              </div>
            </div>
            <div className="lg:col-span-8">
              <StairSection state="rest" className="diagram-hide-labels-mobile h-auto w-full" />
              <Caption data-note className="mt-3">
                {content.diagramNote}
              </Caption>
            </div>
          </div>
        </Container>
      </div>

      <Container className="pb-section">
        <figure className="mt-4 lg:mt-10">
          <div className="aspect-video overflow-hidden bg-stone">
            <VideoLoop video={content.video} />
          </div>
          <figcaption className="mt-3">
            <Caption>{content.caption}</Caption>
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
