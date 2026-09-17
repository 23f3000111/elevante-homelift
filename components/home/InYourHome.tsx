"use client";

import Link from "next/link";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Caption } from "@/components/ui/Caption";
import { Picture } from "@/components/ui/Picture";
import { Container } from "@/components/ui/Section";
import { SectionIndex } from "@/components/ui/SectionIndex";
import type { HomeContent } from "@/content/types";
import { cn } from "@/lib/cn";
import { revealWithin, useMotion } from "@/lib/motion/useMotion";
import { useHorizontalTrack } from "@/lib/motion/useHorizontalTrack";

const IMG_HOVER = "transition-transform duration-[900ms] ease-[var(--ease-out-quart)] group-hover:scale-[1.04] group-focus-visible:scale-[1.04]";

/**
 * Each slot sizes an image at or below its source width and lifts or drops
 * it, so the track reads as a page of architecture rather than a strip of
 * equal cards.
 */
const SLOTS = [
  { w: "lg:w-[68vw]", aspect: "aspect-[3/2]", offset: "", sizes: "(min-width: 1024px) 68vw, 100vw" },
  { w: "lg:w-[26vw] lg:max-w-[415px]", aspect: "aspect-square", offset: "lg:mb-24", sizes: "(min-width: 1024px) 26vw, 100vw" },
  { w: "lg:w-[58vw]", aspect: "aspect-video", offset: "", sizes: "(min-width: 1024px) 58vw, 100vw" },
  { w: "lg:w-[24vw] lg:max-w-[387px]", aspect: "aspect-[3/4]", offset: "lg:mb-32", sizes: "(min-width: 1024px) 24vw, 100vw" },
  { w: "lg:w-[56vw]", aspect: "aspect-video", offset: "lg:mb-10", sizes: "(min-width: 1024px) 56vw, 100vw" },
  { w: "lg:w-[26vw] lg:max-w-[399px]", aspect: "aspect-[4/5]", offset: "lg:mb-16", sizes: "(min-width: 1024px) 26vw, 100vw" },
];

export function InYourHome({ content }: { content: HomeContent["inYourHome"] }) {
  const ref = useRef<HTMLElement>(null);
  useHorizontalTrack(ref);
  useMotion(ref, ({ scope }) => revealWithin(scope));

  return (
    <section ref={ref} id="in-your-home" aria-labelledby="iyh-title" className="overflow-x-clip bg-warm-white py-section lg:py-0">
      <div data-stage className="lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-center lg:py-8">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SectionIndex index={content.index} label={content.indexLabel} />
              <h2 id="iyh-title" data-reveal className="mt-8 max-w-[14ch] text-display-2">
                {content.title}
              </h2>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <p data-reveal className="max-w-[40ch] text-body-l text-charcoal-soft">
                {content.body}
              </p>
              <div data-reveal className="mt-6">
                <Button href={content.cta.href} variant="quiet">
                  {content.cta.label}
                </Button>
              </div>
            </div>
          </div>
        </Container>

        <div
          data-track-wrap
          className="mt-12 pl-gutter lg:mt-10 lg:overflow-x-auto lg:overscroll-x-contain lg:pl-[max(var(--spacing-gutter),calc((100vw-90rem)/2+var(--spacing-gutter)))]"
        >
          <ul data-track className="flex flex-col gap-12 pr-gutter lg:w-max lg:flex-row lg:items-end lg:gap-12 lg:pr-32">
            {content.gallery.map((item, i) => {
              const slot = SLOTS[i % SLOTS.length];
              return (
                <li key={item.media.id} className={cn("w-full shrink-0", slot.w, slot.offset)}>
                  <Link href={content.cta.href} className="group block">
                    <div data-reveal-clip className={cn("relative w-full overflow-hidden", slot.aspect)}>
                      <Picture asset={item.media} fill sizes={slot.sizes} className="h-full w-full" imgClassName={IMG_HOVER} />
                    </div>
                    <div className="mt-4 flex items-baseline gap-4">
                      <span className="font-mono text-small text-caption">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-body text-charcoal">{item.label}</span>
                      {item.caption && <Caption className="ml-auto">{item.caption}</Caption>}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-10 mr-gutter hidden h-px bg-stone lg:block">
            <div data-progress className="h-px origin-left scale-x-0 bg-charcoal" />
          </div>
        </div>
      </div>
    </section>
  );
}
