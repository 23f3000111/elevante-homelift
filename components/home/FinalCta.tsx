"use client";

import { useRef } from "react";
import { AppLink } from "@/components/ui/AppLink";
import { Arrow } from "@/components/ui/Arrow";
import { MaskedText } from "@/components/ui/MaskedText";
import { VideoLoop } from "@/components/ui/VideoLoop";
import type { HomeContent } from "@/content/types";
import { useMotion } from "@/lib/motion/useMotion";

/**
 * The end of the film. The statement arrives on warm white, then the page
 * gives way to the film, full screen, with the one thing to do next.
 */
export function FinalCta({ content }: { content: HomeContent["finalCta"] }) {
  const ref = useRef<HTMLElement>(null);

  useMotion(ref, ({ gsap, scope }) => {
    const words = scope.querySelectorAll("[data-mask-word]");
    const film = scope.querySelector("[data-film]");
    const plate = scope.querySelector("[data-plate]");
    gsap.to(words, { y: 0, duration: 1.1, ease: "expo.out", stagger: 0.05, scrollTrigger: { trigger: scope, start: "top 70%", once: true } });
    if (film) {
      gsap.fromTo(
        film,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", ease: "none", scrollTrigger: { trigger: scope, start: "top top", end: "45% top", scrub: true } },
      );
    }
    if (plate) {
      gsap.fromTo(plate, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, ease: "power2.out", scrollTrigger: { trigger: scope, start: "35% top", end: "60% top", scrub: true } });
    }
  });

  return (
    <section
      ref={ref}
      id="find-a-dealer"
      aria-labelledby="cta-title"
      className="scroll-track bg-warm-white"
      style={{ ["--track" as string]: "200svh", ["--track-mobile" as string]: "170svh" }}
    >
      <div className="scroll-stage">
        <div data-cta-statement className="container-content flex flex-col justify-center pt-[var(--spacing-header)] pb-10">
          <MaskedText as="h2" id="cta-title" text={content.title} className="max-w-[11ch] text-hero font-medium text-charcoal" />
        </div>

        <div data-film className="bg-stone">
          <VideoLoop video={content.video} className="h-full w-full object-cover" />
          <div aria-hidden className="absolute inset-0 bg-charcoal/25" />
          <div className="absolute inset-0 flex items-end">
            <div className="container-content pb-8 lg:pb-12">
              <div data-plate className="max-w-[40rem] bg-warm-white p-6 sm:p-8 lg:p-10">
                <p className="text-body-l text-charcoal-soft">{content.body}</p>
                <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
                  <AppLink href={content.primary.href} className="action text-display-3">
                    {content.primary.label}
                    <Arrow />
                  </AppLink>
                </div>
                <AppLink href={content.secondary.href} className="text-link mt-6 inline-block text-body text-charcoal">
                  {content.secondary.label}
                </AppLink>
              </div>
              <p className="mt-3 inline-block bg-warm-white/90 px-3 py-2 font-mono text-mono text-caption">{content.caption}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
