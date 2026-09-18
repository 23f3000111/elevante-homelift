"use client";

import { AppLink } from "@/components/ui/AppLink";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Caption } from "@/components/ui/Caption";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Container } from "@/components/ui/Section";
import { SectionIndex } from "@/components/ui/SectionIndex";
import type { HomeContent } from "@/content/types";
import { revealWithin, useMotion } from "@/lib/motion/useMotion";
import { useHorizontalTrack } from "@/lib/motion/useHorizontalTrack";

const IMG_HOVER =
  "transition-transform duration-[900ms] ease-[var(--ease-out-quart)] group-hover:-translate-y-1";

/**
 * Architecture read sideways. Every frame is the same height and every
 * picture is shown whole inside it, so a 1620px hall and a 400px detail
 * line up on the same baseline without either being cropped or stretched.
 */
export function InYourHome({
  content,
}: {
  content: HomeContent["inYourHome"];
}) {
  const ref = useRef<HTMLElement>(null);
  useHorizontalTrack(ref);
  useMotion(ref, ({ scope }) => revealWithin(scope));

  return (
    <section
      ref={ref}
      id="in-your-home"
      aria-labelledby="iyh-title"
      className="overflow-x-clip bg-warm-white py-section-sm lg:py-0"
    >
      <div
        data-stage
        className="lg:flex lg:h-[calc(100svh-4rem)] lg:flex-col lg:justify-center lg:py-6"
      >
        <Container>
          <div className="grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-8">
            <div className="lg:col-span-2">
              <SectionIndex
                index={content.index}
                label={content.indexLabel}
                size="small"
              />
            </div>
            <h2
              id="iyh-title"
              data-reveal
              className="max-w-[12ch] text-[clamp(2.25rem,4vw,3.5rem)] leading-[1] font-medium tracking-[-0.03em] text-charcoal lg:col-span-5"
            >
              {content.title}
            </h2>
            <div className="lg:col-span-4 lg:col-start-9">
              <p
                data-reveal
                className="max-w-[40ch] text-body text-charcoal-soft"
              >
                {content.body}
              </p>
              <div data-reveal className="mt-3">
                <Button href={content.cta.href} variant="quiet">
                  {content.cta.label}
                </Button>
              </div>
            </div>
          </div>
        </Container>

        <div
          data-track-wrap
          className="mt-8 pl-gutter lg:mt-8 lg:overflow-x-auto lg:overscroll-x-contain lg:pl-[max(var(--spacing-gutter),calc((100vw-90rem)/2+var(--spacing-gutter)))]"
        >
          <ul
            data-track
            className="flex flex-col gap-10 pr-gutter lg:w-max lg:flex-row lg:items-start lg:gap-8 lg:pr-32"
          >
            {content.gallery.map((item, i) => (
              <li key={item.media.id} className="shrink-0">
                <AppLink href={content.cta.href} className="group block">
                  <div
                    data-reveal-clip
                    className="h-[58vw] max-h-[22rem] sm:h-[20rem] lg:h-[clamp(15rem,42svh,23rem)]"
                  >
                    <MediaFrame
                      asset={item.media}
                      sizes="(min-width: 1024px) 60vw, 92vw"
                      imgClassName={IMG_HOVER}
                    />
                  </div>
                  <div className="mt-3 flex items-baseline gap-4 whitespace-nowrap">
                    <span className="font-mono text-small text-caption">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-body text-charcoal">
                      {item.label}
                    </span>
                    {item.caption && (
                      <Caption className="ml-6">{item.caption}</Caption>
                    )}
                  </div>
                </AppLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6 mr-gutter ml-gutter hidden h-px shrink-0 bg-stone lg:block">
          <div
            data-progress
            className="h-px origin-left scale-x-0 bg-charcoal"
          />
        </div>
      </div>
    </section>
  );
}
