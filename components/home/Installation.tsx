"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Picture } from "@/components/ui/Picture";
import { Container } from "@/components/ui/Section";
import type { HomeContent, MediaAsset, Step } from "@/content/types";
import { DESKTOP } from "@/lib/motion/gsap";
import { useMotion } from "@/lib/motion/useMotion";

type Panel = { kind: "step"; step: Step } | { kind: "image"; media: MediaAsset; width: string };

/** Interleave the three photographs between the seven stages. */
function panels(steps: Step[], media: MediaAsset[]): Panel[] {
  const out: Panel[] = [];
  // Rendered widths stay at or below each source's pixel width.
  const widths = ["max-w-[26rem] lg:w-[22rem]", "max-w-[22rem] lg:w-[18rem]", "max-w-[16rem] lg:w-[14rem]"];
  steps.forEach((step, i) => {
    out.push({ kind: "step", step });
    const at = [0, 2, 4].indexOf(i);
    if (at >= 0 && media[at]) out.push({ kind: "image", media: media[at], width: widths[at] });
  });
  return out;
}

/**
 * Seven stages read left to right on a wide screen, pinned while the track
 * slides past; on a phone they simply run down the page. The process is
 * the content, so numbering is meaningful here.
 */
export function Installation({ content }: { content: HomeContent["installation"] }) {
  const ref = useRef<HTMLElement>(null);

  useMotion(ref, ({ gsap, scope, matches }) => {
    if (!matches(DESKTOP)) return;
    const stage = scope.querySelector<HTMLElement>("[data-stage]");
    const wrap = scope.querySelector<HTMLElement>("[data-track-wrap]");
    const track = scope.querySelector<HTMLElement>("[data-track]");
    const progress = scope.querySelector<HTMLElement>("[data-progress]");
    if (!stage || !wrap || !track) return;

    // Without motion the track scrolls natively; with motion the page scroll drives it.
    wrap.style.overflowX = "visible";

    const distance = () => Math.max(0, track.scrollWidth + track.getBoundingClientRect().left - window.innerWidth + 48);

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: stage,
        start: "top top+=80",
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
    tl.to(track, { x: () => -distance() }, 0);
    if (progress) tl.fromTo(progress, { scaleX: 0 }, { scaleX: 1 }, 0);

    return () => {
      wrap.style.overflowX = "";
    };
  });

  const items = panels(content.steps, content.media);

  return (
    <section ref={ref} id="installation" aria-labelledby="inst-title" className="overflow-x-clip bg-warm-white py-section lg:py-0">
      <div data-stage className="lg:flex lg:min-h-[calc(100svh-5rem)] lg:flex-col lg:justify-center lg:py-10">
        <Container>
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <h2 id="inst-title" className="text-display-2 max-w-[14ch] lg:col-span-6">
              {content.title}
            </h2>
            <p className="max-w-[40ch] text-body-l text-charcoal-soft lg:col-span-5 lg:col-start-8">{content.body}</p>
          </div>
        </Container>

        <div
          data-track-wrap
          className="mt-12 pl-gutter lg:mt-14 lg:overflow-x-auto lg:overscroll-x-contain lg:pl-[max(var(--spacing-gutter),calc((100vw-90rem)/2+var(--spacing-gutter)))]"
        >
          <ol data-track className="flex flex-col gap-10 pr-gutter lg:w-max lg:flex-row lg:items-start lg:gap-14 lg:pr-24">
            {items.map((item) =>
              item.kind === "step" ? (
                <li key={item.step.number} className="border-t border-stone pt-5 lg:w-[22rem] lg:shrink-0 xl:w-[24rem]">
                  <span className="font-mono text-h3 text-caption">{item.step.number}</span>
                  <h3 className="mt-4 text-h3">{item.step.title}</h3>
                  <p className="mt-3 max-w-[36ch] text-body text-charcoal-soft">{item.step.body}</p>
                </li>
              ) : (
                <li key={item.media.id} className={`lg:max-w-none lg:shrink-0 ${item.width}`}>
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <Picture asset={item.media} fill sizes="(min-width: 1024px) 22rem, 90vw" className="h-full w-full" />
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
          <div className="mt-12 lg:mt-10">
            <Button href={content.cta.href} variant="secondary">
              {content.cta.label}
            </Button>
          </div>
        </Container>
      </div>
    </section>
  );
}
