"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Picture } from "@/components/ui/Picture";
import { Container } from "@/components/ui/Section";
import { SectionIndex } from "@/components/ui/SectionIndex";
import type { HomeContent, MediaAsset, Step } from "@/content/types";
import { revealWithin, useMotion } from "@/lib/motion/useMotion";
import { useHorizontalTrack } from "@/lib/motion/useHorizontalTrack";

type Panel = { kind: "step"; step: Step } | { kind: "image"; media: MediaAsset; width: string };

/** Interleave the three photographs between the seven stages, each at or below its source width. */
function panels(steps: Step[], media: MediaAsset[]): Panel[] {
  const out: Panel[] = [];
  const widths = ["max-w-[40rem] lg:w-[38vw]", "max-w-[22rem] lg:w-[20rem]", "max-w-[16rem] lg:w-[15rem]"];
  steps.forEach((step, i) => {
    out.push({ kind: "step", step });
    const at = [0, 2, 4].indexOf(i);
    if (at >= 0 && media[at]) out.push({ kind: "image", media: media[at], width: widths[at] });
  });
  return out;
}

/**
 * Seven stages read left to right on a wide screen, pinned while the track
 * slides past; on a phone they run down the page. The process is the
 * content, so the numbering is meaningful here.
 */
export function Installation({ content }: { content: HomeContent["installation"] }) {
  const ref = useRef<HTMLElement>(null);
  useHorizontalTrack(ref);
  useMotion(ref, ({ scope }) => revealWithin(scope));
  const items = panels(content.steps, content.media);

  return (
    <section ref={ref} id="installation" aria-labelledby="inst-title" className="overflow-x-clip bg-warm-white py-section lg:py-0">
      <div data-stage className="lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-center lg:py-8">
        <Container>
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SectionIndex index={content.index} label={content.indexLabel} />
              <h2 id="inst-title" data-reveal className="mt-8 max-w-[14ch] text-display-2">
                {content.title}
              </h2>
            </div>
            <p data-reveal className="max-w-[40ch] text-body-l text-charcoal-soft lg:col-span-4 lg:col-start-9">
              {content.body}
            </p>
          </div>
        </Container>

        <div
          data-track-wrap
          className="mt-12 pl-gutter lg:mt-10 lg:overflow-x-auto lg:overscroll-x-contain lg:pl-[max(var(--spacing-gutter),calc((100vw-90rem)/2+var(--spacing-gutter)))]"
        >
          <ol data-track className="flex flex-col gap-10 pr-gutter lg:w-max lg:flex-row lg:items-start lg:gap-14 lg:pr-32">
            {items.map((item) =>
              item.kind === "step" ? (
                <li key={item.step.number} className="border-t border-stone pt-5 lg:w-[22rem] lg:shrink-0 xl:w-[24rem]">
                  <span aria-hidden className="block text-[clamp(3.5rem,7vw,6rem)] leading-none font-medium tracking-[-0.05em] text-stone">
                    {item.step.number}
                  </span>
                  <h3 className="mt-5 text-[clamp(1.75rem,2.6vw,2.5rem)] leading-[1.05] font-medium tracking-[-0.02em] text-charcoal">
                    <span className="sr-only">{item.step.number} </span>
                    {item.step.title}
                  </h3>
                  <p className="mt-3 max-w-[34ch] text-body text-charcoal-soft">{item.step.body}</p>
                </li>
              ) : (
                <li key={item.media.id} className={`lg:shrink-0 ${item.width}`}>
                  <div data-reveal-clip className="relative aspect-[4/5] w-full overflow-hidden">
                    <Picture asset={item.media} fill sizes="(min-width: 1024px) 38vw, 90vw" className="h-full w-full" />
                  </div>
                </li>
              ),
            )}
          </ol>
          <div className="mt-10 mr-gutter hidden h-px bg-stone lg:block">
            <div data-progress className="h-px origin-left scale-x-0 bg-charcoal" />
          </div>
        </div>

        <Container>
          <div className="mt-12 lg:mt-8">
            <Button href={content.cta.href} variant="secondary">
              {content.cta.label}
            </Button>
          </div>
        </Container>
      </div>
    </section>
  );
}
