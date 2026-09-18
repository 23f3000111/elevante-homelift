"use client";

import { useCallback, useRef, type CSSProperties } from "react";
import { StairSection, STOREY } from "@/components/diagram/StairSection";
import { Caption } from "@/components/ui/Caption";
import { ScrollImageSequence } from "@/components/ui/ScrollImageSequence";
import { SectionIndex } from "@/components/ui/SectionIndex";
import type { HomeContent } from "@/content/types";
import { gsap } from "@/lib/motion/gsap";
import { revealWithin, useMotion } from "@/lib/motion/useMotion";

/** Cabin travel mapped onto the film: still, then rising, then arrived. */
function travel(p: number) {
  const t = Math.min(1, Math.max(0, (p - 0.3) / 0.55));
  return t * t * (3 - 2 * t);
}

/**
 * The signature scene. The film fills the screen and the scroll wheel runs
 * it forwards and backwards; the number, the statement and the technical
 * labels are layered over it, and a small schematic keeps the cabin's
 * position honest. Reduced motion shows the first frame with all the copy.
 */
export function ProductReveal({
  content,
}: {
  content: HomeContent["productReveal"];
}) {
  const ref = useRef<HTMLElement>(null);
  const stateEl = useRef<HTMLSpanElement>(null);
  const frameEl = useRef<HTMLSpanElement>(null);
  const barEl = useRef<HTMLDivElement>(null);
  const insetEl = useRef<HTMLDivElement>(null);
  const last = content.sequence.frames - 1;

  const onProgress = useCallback(
    (p: number) => {
      const phase = p < 0.3 ? 0 : p < 0.85 ? 1 : 2;
      if (stateEl.current) stateEl.current.textContent = content.states[phase];
      if (frameEl.current)
        frameEl.current.textContent = String(Math.round(p * last)).padStart(
          3,
          "0",
        );
      if (barEl.current) barEl.current.style.transform = `scaleX(${p})`;
      const cabin = insetEl.current?.querySelector('[data-part="cabin"]');
      if (cabin) gsap.set(cabin, { y: -STOREY * travel(p) });
      const lower = insetEl.current?.querySelector('[data-part="door-lower"]');
      const upper = insetEl.current?.querySelector('[data-part="door-upper"]');
      if (lower)
        gsap.set(lower, { strokeDashoffset: p > 0.08 && p < 0.28 ? 1 : 0 });
      if (upper) gsap.set(upper, { strokeDashoffset: p > 0.88 ? 1 : 0 });
    },
    [content.states, last],
  );

  useMotion(ref, ({ gsap, scope }) => {
    revealWithin(scope);
    const lines = scope.querySelectorAll("[data-stage-line]");
    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      scrollTrigger: {
        trigger: scope,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.4,
      },
    });
    tl.to(lines[0], { autoAlpha: 1, duration: 0.12 }, 0.08)
      .to(lines[1], { autoAlpha: 1, duration: 0.12 }, 0.42)
      .to({}, { duration: 0.46 });
    const num = scope.querySelector("[data-num]");
    if (num) {
      gsap.fromTo(
        num,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: scope, start: "top 55%", once: true },
        },
      );
    }
  });

  return (
    <section
      ref={ref}
      id="product"
      aria-labelledby="product-title"
      className="relative z-20 bg-warm-white"
    >
      <div
        className="scroll-track"
        style={{ "--track": "420svh" } as CSSProperties}
      >
        <div className="scroll-stage">
          <ScrollImageSequence
            sequence={content.sequence}
            trigger={ref}
            start="top top"
            end="bottom bottom"
            onProgress={onProgress}
            focus={{ x: 0.5, y: 0.55 }}
            className="absolute inset-0"
          />

          <div data-num className="absolute top-24 left-gutter z-10 lg:top-28">
            <SectionIndex
              index={content.index}
              label={content.indexLabel}
              tone="light"
              size="huge"
            />
          </div>

          <div className="absolute inset-x-0 bottom-0 z-10 bg-warm-white p-6 sm:p-8 lg:inset-x-auto lg:bottom-14 lg:left-gutter lg:max-w-[38rem] lg:p-10">
            <h2 id="product-title" className="text-display-2 max-w-[12ch]">
              {content.title}
            </h2>
            <div className="mt-6 space-y-3">
              {content.lines.map((line) => (
                <p
                  key={line}
                  data-stage-line
                  className="max-w-[40ch] text-body text-charcoal-soft"
                >
                  {line}
                </p>
              ))}
            </div>
            <Caption className="mt-5">{content.caption}</Caption>
          </div>

          <div
            ref={insetEl}
            className="absolute top-28 right-gutter z-10 hidden w-[17rem] lg:block"
          >
            <div className="bg-warm-white p-3">
              <StairSection
                state="rest"
                labels={false}
                className="h-auto w-full"
              />
              <Caption className="mt-2">{content.diagramNote}</Caption>
            </div>
          </div>

          <div className="absolute right-gutter bottom-14 z-10 hidden bg-charcoal px-4 py-3 font-mono text-small text-warm-white lg:block">
            <span ref={stateEl}>{content.states[0]}</span>
            <span className="mx-3 text-warm-grey">|</span>
            <span>{content.frameLabel}</span> <span ref={frameEl}>000</span>
            <span className="text-warm-grey">
              {" "}
              / {String(last).padStart(3, "0")}
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-10 h-[3px] bg-charcoal/15">
            <div
              ref={barEl}
              className="h-full origin-left scale-x-0 bg-charcoal"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
