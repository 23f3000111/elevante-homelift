"use client";

import { useRef, type CSSProperties } from "react";
import { Plan } from "@/components/diagram/PlanComparison";
import { Caption } from "@/components/ui/Caption";
import { ScrollImageSequence } from "@/components/ui/ScrollImageSequence";
import { SectionIndex } from "@/components/ui/SectionIndex";
import { Container } from "@/components/ui/Section";
import type { HomeContent } from "@/content/types";
import { revealWithin, useMotion } from "@/lib/motion/useMotion";

/** Guide points in the film's own coordinates (1180 x 664), drawn over the canvas with the same cover fit. */
const GUIDES = [
  {
    key: "staircase",
    dot: [372, 328],
    path: "M372 328 V240 H440",
    label: [452, 246],
    anchor: "start",
  },
  {
    key: "cabin",
    dot: [600, 300],
    path: "M600 300 H470",
    label: [458, 306],
    anchor: "end",
  },
  {
    key: "space",
    dot: [420, 592],
    path: "M420 592 H520",
    label: [532, 598],
    anchor: "start",
  },
] as const;

/**
 * The spatial consequence, as a second cinematic scene: the film runs with
 * the scroll while thin guide lines draw on to name the staircase, the
 * cabin and the space beneath. The statement holds on a plate that cuts
 * into the picture. Below, the same house is compared in plan.
 */
export function UnderTheStaircase({
  content,
}: {
  content: HomeContent["underTheStaircase"];
}) {
  const ref = useRef<HTMLElement>(null);
  const labels = {
    staircase: content.overlay.staircase,
    cabin: content.overlay.cabin,
    space: content.overlay.space,
  };

  useMotion(ref, ({ gsap, scope }) => {
    revealWithin(scope);
    const lines = scope.querySelectorAll("[data-stage-line]");
    const guides = scope.querySelectorAll<SVGGElement>("[data-guide]");
    gsap.set(guides, { autoAlpha: 0 });
    guides.forEach((g) =>
      gsap.set(g.querySelector("path"), {
        strokeDasharray: 1,
        strokeDashoffset: 1,
      }),
    );

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      scrollTrigger: {
        trigger: scope.querySelector(".scroll-track"),
        start: "top top",
        end: "bottom bottom",
        scrub: 0.4,
      },
    });
    tl.to(lines[0], { autoAlpha: 1, duration: 0.1 }, 0.05).to(
      lines[1],
      { autoAlpha: 1, duration: 0.1 },
      0.5,
    );
    guides.forEach((g, i) => {
      const at = 0.12 + i * 0.28;
      tl.to(g, { autoAlpha: 1, duration: 0.04 }, at).to(
        g.querySelector("path"),
        { strokeDashoffset: 0, duration: 0.14, ease: "none" },
        at,
      );
    });
    tl.to({}, { duration: 0.1 }, 0.9);
  });

  return (
    <section
      ref={ref}
      id="under-the-staircase"
      aria-labelledby="uts-title"
      className="relative bg-white"
    >
      <div
        className="scroll-track"
        style={{ "--track": "340svh" } as CSSProperties}
      >
        <div className="scroll-stage flex flex-col lg:block">
          <div className="relative h-[52svh] w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-auto lg:w-[64vw]">
            <ScrollImageSequence
              sequence={content.sequence}
              trigger={ref}
              start="top top"
              end="bottom bottom"
              className="absolute inset-0"
            />
            <svg
              viewBox="0 0 1180 664"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden
              className="stair-diagram pointer-events-none absolute inset-0 h-full w-full"
            >
              {GUIDES.map((g) => (
                <g key={g.key} data-guide>
                  <circle
                    cx={g.dot[0]}
                    cy={g.dot[1]}
                    r="7"
                    fill="var(--color-oxide)"
                    stroke="var(--color-warm-white)"
                    strokeWidth="3"
                  />
                  <path
                    d={g.path}
                    pathLength={1}
                    fill="none"
                    stroke="var(--color-charcoal)"
                    strokeWidth="1.5"
                  />
                  <text
                    x={g.label[0]}
                    y={g.label[1]}
                    textAnchor={g.anchor}
                    className="hidden lg:block"
                    style={{
                      fontSize: 20,
                      fill: "var(--color-charcoal)",
                      paintOrder: "stroke",
                      stroke: "var(--color-warm-white)",
                      strokeWidth: 8,
                      strokeLinejoin: "round",
                    }}
                  >
                    {labels[g.key]}
                  </text>
                </g>
              ))}
            </svg>
            <div className="absolute top-24 left-gutter z-10 lg:top-28">
              <SectionIndex
                index={content.index}
                label={content.indexLabel}
                tone="light"
              />
            </div>
          </div>

          <div className="relative flex-1 bg-warm-white p-6 sm:p-8 lg:absolute lg:top-1/2 lg:right-0 lg:w-[42vw] lg:-translate-y-1/2 lg:p-12 lg:pl-14">
            <h2 id="uts-title" className="text-display-2 max-w-[13ch]">
              {content.title}
            </h2>
            <div className="mt-6 max-w-[40ch] space-y-4 text-body-l text-charcoal-soft">
              {content.body.map((p) => (
                <p key={p} data-stage-line>
                  {p}
                </p>
              ))}
            </div>
            <Caption className="mt-6">{content.caption}</Caption>
          </div>
        </div>
      </div>

      <Container className="py-section">
        <div className="grid gap-10 lg:grid-cols-12">
          <h3 data-reveal className="text-h3 lg:col-span-4">
            {content.comparison.title}
          </h3>
          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-8">
            <figure data-reveal>
              <Plan variant="conventional" />
              <figcaption className="mt-4">
                <span className="block text-body font-medium text-charcoal">
                  {content.comparison.conventional.title}
                </span>
                <span className="mt-1 block text-body text-charcoal-soft">
                  {content.comparison.conventional.body}
                </span>
              </figcaption>
            </figure>
            <figure data-reveal>
              <Plan variant="elevante" />
              <figcaption className="mt-4">
                <span className="block text-body font-medium text-charcoal">
                  {content.comparison.elevante.title}
                </span>
                <span className="mt-1 block text-body text-charcoal-soft">
                  {content.comparison.elevante.body}
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </Container>
    </section>
  );
}
