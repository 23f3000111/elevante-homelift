"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Picture } from "@/components/ui/Picture";
import { Container } from "@/components/ui/Section";
import { SectionIndex } from "@/components/ui/SectionIndex";
import type { HomeContent, MediaAsset, Step } from "@/content/types";
import { revealWithin, useMotion } from "@/lib/motion/useMotion";
import { useHorizontalTrack } from "@/lib/motion/useHorizontalTrack";

type Panel = { kind: "step"; step: Step } | { kind: "image"; media: MediaAsset; height: string };

/** Interleave the three photographs between the seven stages; images are sized by height so the row fits the screen. */
function panels(steps: Step[], media: MediaAsset[]): Panel[] {
  const out: Panel[] = [];
  const heights = ["lg:h-[92%]", "lg:h-[70%]", "lg:h-[52%]"];
  steps.forEach((step, i) => {
    out.push({ kind: "step", step });
    const at = [0, 2, 4].indexOf(i);
    if (at >= 0 && media[at]) out.push({ kind: "image", media: media[at], height: heights[at] });
  });
  return out;
}

/**
 * Seven stages read left to right on a wide screen inside a stage that fits
 * the viewport, pinned while the track slides past; on a phone they run
 * down the page. The process is the content, so the numbering is meaningful.
 */
export function Installation({ content }: { content: HomeContent["installation"] }) {
  const ref = useRef<HTMLElement>(null);
  useHorizontalTrack(ref);
  useMotion(ref, ({ scope }) => revealWithin(scope));
  const items = panels(content.steps, content.media);

  return (
    <section ref={ref} id="installation" aria-labelledby="inst-title" className="overflow-x-clip bg-warm-white py-section lg:py-0">
      <div data-stage className="lg:flex lg:h-[calc(100svh-4rem)] lg:flex-col lg:py-6">
        <Container>
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
            <div className="lg:col-span-2">
              <SectionIndex index={content.index} label={content.indexLabel} size="small" />
            </div>
            <h2 id="inst-title" data-reveal className="max-w-[14ch] text-[clamp(2.25rem,4vw,3.75rem)] leading-[1] font-medium tracking-[-0.03em] text-charcoal lg:col-span-5">
              {content.title}
            </h2>
            <div className="lg:col-span-4 lg:col-start-9">
              <p data-reveal className="max-w-[40ch] text-body text-charcoal-soft">
                {content.body}
              </p>
              <div data-reveal className="mt-4">
                <Button href={content.cta.href} variant="quiet">
                  {content.cta.label}
                </Button>
              </div>
            </div>
          </div>
        </Container>

        <div
          data-track-wrap
          className="mt-10 pl-gutter lg:mt-6 lg:min-h-0 lg:flex-1 lg:overflow-x-auto lg:overscroll-x-contain lg:pl-[max(var(--spacing-gutter),calc((100vw-90rem)/2+var(--spacing-gutter)))]"
        >
          <ol data-track className="flex flex-col gap-10 pr-gutter lg:h-full lg:w-max lg:flex-row lg:items-end lg:gap-12 lg:pr-32">
            {items.map((item) =>
              item.kind === "step" ? (
                <li key={item.step.number} className="border-t border-stone pt-4 lg:h-full lg:w-[20rem] lg:shrink-0 xl:w-[22rem]">
                  <span aria-hidden className="block text-[clamp(3rem,6vw,5rem)] leading-none font-medium tracking-[-0.05em] text-stone">
                    {item.step.number}
                  </span>
                  <h3 className="mt-4 text-[clamp(1.5rem,2.2vw,2rem)] leading-[1.05] font-medium tracking-[-0.02em] text-charcoal">
                    <span className="sr-only">{item.step.number} </span>
                    {item.step.title}
                  </h3>
                  <p className="mt-3 max-w-[32ch] text-body text-charcoal-soft">{item.step.body}</p>
                </li>
              ) : (
                <li key={item.media.id} className={`lg:shrink-0 ${item.height}`}>
                  <div data-reveal-clip className="relative aspect-[4/5] w-full max-w-[26rem] overflow-hidden lg:h-full lg:w-auto lg:max-w-none" style={{ maxWidth: item.media.width }}>
                    <Picture asset={item.media} fill sizes="(min-width: 1024px) 30vw, 90vw" className="h-full w-full" />
                  </div>
                </li>
              ),
            )}
          </ol>
        </div>
        <div className="mt-6 mr-gutter ml-gutter hidden h-px shrink-0 bg-stone lg:block">
          <div data-progress className="h-px origin-left scale-x-0 bg-charcoal" />
        </div>
      </div>
    </section>
  );
}
