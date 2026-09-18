"use client";

import { useRef } from "react";
import { AppLink } from "@/components/ui/AppLink";
import { Arrow } from "@/components/ui/Arrow";
import { VideoLoop } from "@/components/ui/VideoLoop";
import type { HomeContent } from "@/content/types";
import { useMotion } from "@/lib/motion/useMotion";

/**
 * The benefit, over the film. The plate is warm white at 80% with a blur
 * behind it, so the interior reads through the type without the type
 * losing contrast. The film drifts slowly against the scroll; under
 * reduced motion its poster stands still and the plate is solid.
 */
export function Lead({ content, index }: { content: HomeContent["lead"]; index: string }) {
  const ref = useRef<HTMLElement>(null);

  useMotion(ref, ({ gsap, scope }) => {
    const film = scope.querySelector("[data-lead-film]");
    const plate = scope.querySelector("[data-lead-plate]");
    if (film) {
      gsap.fromTo(
        film,
        { yPercent: -6, scale: 1.08 },
        { yPercent: 6, scale: 1.08, ease: "none", scrollTrigger: { trigger: scope, start: "top bottom", end: "bottom top", scrub: true } },
      );
    }
    if (plate) {
      gsap.fromTo(
        plate,
        { autoAlpha: 0, y: 32 },
        { autoAlpha: 1, y: 0, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: scope, start: "top 65%", once: true } },
      );
    }
  });

  return (
    <section ref={ref} aria-label="What Elevante solves" className="relative isolate overflow-hidden bg-stone">
      <div aria-hidden className="absolute inset-0">
        <div data-lead-film className="h-full w-full">
          <VideoLoop video={content.video} className="h-full w-full object-cover" />
        </div>
      </div>

      <div className="relative container-content py-section">
        <div className="sheet">
          <div data-lead-plate className="col-span-12 bg-warm-white/80 p-6 backdrop-blur-xl backdrop-saturate-[1.1] supports-[not(backdrop-filter:blur(0))]:bg-warm-white sm:p-10 lg:col-span-9 lg:p-14">
            <p className="font-mono text-mono text-caption">{index}</p>
            <p className="mt-6 max-w-[26ch] text-display-3 font-medium text-charcoal">{content.lines[0]}</p>
            {content.lines.slice(1).map((line) => (
              <p key={line} className="mt-8 max-w-[52ch] text-body-l text-charcoal-soft">
                {line}
              </p>
            ))}
            <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
              <AppLink href={content.primary.href} className="action">
                {content.primary.label}
                <Arrow />
              </AppLink>
              <AppLink href={content.secondary.href} className="action">
                {content.secondary.label}
                <Arrow />
              </AppLink>
            </div>
          </div>
          <p className="col-span-12 mt-4 font-mono text-mono text-charcoal-soft lg:col-span-3 lg:col-start-10 lg:mt-0 lg:self-end lg:pl-6">
            <span className="inline-block bg-warm-white/85 px-2.5 py-1.5">{content.caption}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
