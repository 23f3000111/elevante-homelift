"use client";

import { useRef } from "react";
import { AppLink } from "@/components/ui/AppLink";
import { Arrow } from "@/components/ui/Arrow";
import { MediaFrame } from "@/components/ui/MediaFrame";
import type { HomeContent } from "@/content/types";
import { useMotion } from "@/lib/motion/useMotion";

/**
 * The benefit, stated once. A compact band: the statement on warm white
 * against the drawing sheet, and an interior held in a stone panel that
 * runs off the right edge of the page. The panel drifts against the scroll.
 */
export function Lead({ content, index }: { content: HomeContent["lead"]; index: string }) {
  const ref = useRef<HTMLElement>(null);

  useMotion(ref, ({ gsap, scope }) => {
    const panel = scope.querySelector("[data-lead-panel]");
    const lines = scope.querySelectorAll("[data-lead-line]");
    if (panel) {
      gsap.fromTo(
        panel,
        { yPercent: -4 },
        { yPercent: 4, ease: "none", scrollTrigger: { trigger: scope, start: "top bottom", end: "bottom top", scrub: true } },
      );
    }
    gsap.fromTo(
      lines,
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.12, scrollTrigger: { trigger: scope, start: "top 70%", once: true } },
    );
  });

  return (
    <section ref={ref} aria-label="What Elevante solves" className="relative isolate overflow-hidden bg-warm-white py-section-sm">
      {/* The drawing sheet continues behind this band. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 container-content">
        <div className="sheet h-full">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="h-full border-l border-stone/60 last:border-r" />
          ))}
        </div>
      </div>

      <div className="relative container-content">
        <div className="sheet items-center gap-y-10">
          <div className="col-span-12 lg:col-span-6">
            <p data-lead-line className="font-mono text-mono text-caption">
              {index}
            </p>
            {/* A paragraph, not a statement: set to be read, not declaimed. */}
            <p data-lead-line className="mt-5 max-w-[38ch] text-[clamp(1.25rem,1.05rem+0.7vw,1.75rem)] leading-[1.32] font-medium tracking-[-0.015em] text-charcoal">
              {content.lines[0]}
            </p>
            {content.lines.slice(1).map((line) => (
              <p key={line} data-lead-line className="mt-5 max-w-[46ch] text-body text-charcoal-soft">
                {line}
              </p>
            ))}
            <div data-lead-line className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
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

          {/* The panel runs off the right edge of the page. */}
          <figure className="col-span-12 lg:col-span-6">
            <div className="relative -mr-gutter bg-stone p-6 lg:-mr-[max(var(--spacing-gutter),calc((100vw-90rem)/2+var(--spacing-gutter)))] lg:p-8">
              <div data-lead-panel className="h-[26svh] min-h-[12rem] lg:h-[32svh]">
                <MediaFrame asset={content.media} sizes="(min-width: 64rem) 46vw, 100vw" tone="stone" className="w-fit" />
              </div>
            </div>
            <figcaption className="mt-3 font-mono text-mono text-caption">{content.caption}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
