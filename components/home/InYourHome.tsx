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
 * On wide screens every image is sized by height inside a stage that fits
 * the viewport, so its width follows the source's proportions and the
 * whole row is always on screen. Large sources stand tall, small ones sit
 * lower, and nothing is rendered above its pixel width.
 */
const SLOTS = [
  { h: "lg:h-[92%]", aspect: "aspect-[3/2]", sizes: "(min-width: 1024px) 60vw, 100vw" },
  { h: "lg:h-[52%]", aspect: "aspect-square", sizes: "(min-width: 1024px) 24vw, 100vw" },
  { h: "lg:h-[82%]", aspect: "aspect-video", sizes: "(min-width: 1024px) 60vw, 100vw" },
  { h: "lg:h-[60%]", aspect: "aspect-[3/4]", sizes: "(min-width: 1024px) 22vw, 100vw" },
  { h: "lg:h-[78%]", aspect: "aspect-video", sizes: "(min-width: 1024px) 56vw, 100vw" },
  { h: "lg:h-[64%]", aspect: "aspect-[4/5]", sizes: "(min-width: 1024px) 22vw, 100vw" },
];

export function InYourHome({ content }: { content: HomeContent["inYourHome"] }) {
  const ref = useRef<HTMLElement>(null);
  useHorizontalTrack(ref);
  useMotion(ref, ({ scope }) => revealWithin(scope));

  return (
    <section ref={ref} id="in-your-home" aria-labelledby="iyh-title" className="overflow-x-clip bg-warm-white py-section lg:py-0">
      <div data-stage className="lg:flex lg:h-[calc(100svh-4rem)] lg:flex-col lg:py-6">
        <Container>
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
            <div className="lg:col-span-2">
              <SectionIndex index={content.index} label={content.indexLabel} size="small" />
            </div>
            <h2 id="iyh-title" data-reveal className="max-w-[12ch] text-[clamp(2.25rem,4vw,3.75rem)] leading-[1] font-medium tracking-[-0.03em] text-charcoal lg:col-span-5">
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
          <ul data-track className="flex flex-col gap-12 pr-gutter lg:h-full lg:w-max lg:flex-row lg:items-end lg:gap-10 lg:pr-32">
            {content.gallery.map((item, i) => {
              const slot = SLOTS[i % SLOTS.length];
              return (
                <li key={item.media.id} className={cn("w-full shrink-0 lg:flex lg:w-auto lg:flex-col", slot.h)}>
                  <Link href={content.cta.href} className="group flex h-full flex-col">
                    <div data-reveal-clip className={cn("relative w-full overflow-hidden lg:min-h-0 lg:w-auto lg:flex-1", slot.aspect)} style={{ maxWidth: item.media.width }}>
                      <Picture asset={item.media} fill sizes={slot.sizes} className="h-full w-full" imgClassName={IMG_HOVER} />
                    </div>
                    <div className="mt-3 flex h-8 shrink-0 items-baseline gap-4 whitespace-nowrap">
                      <span className="font-mono text-small text-caption">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-body text-charcoal">{item.label}</span>
                      {item.caption && <Caption className="ml-auto">{item.caption}</Caption>}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="mt-6 mr-gutter ml-gutter hidden h-px shrink-0 bg-stone lg:block">
          <div data-progress className="h-px origin-left scale-x-0 bg-charcoal" />
        </div>
      </div>
    </section>
  );
}
