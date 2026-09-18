"use client";

import { useRef } from "react";
import { SectionDrawing } from "@/components/diagram/SectionDrawing";
import type { HomeContent, MechanismContent } from "@/content/types";
import { cn } from "@/lib/cn";
import { useMotion } from "@/lib/motion/useMotion";
import { DRAWING, STOREY } from "@/lib/scene/geometry";

interface HowItWorksProps {
  content: HomeContent["howItWorks"];
  drawingLabels: MechanismContent["drawingLabels"];
  index: string;
}

/**
 * Enter, move, arrive: three stages, one drawing. The stage in hand is set
 * in full; the others recede. The drawing's door opens, the cabin rises,
 * the stair opening receives it, all driven by the scroll position.
 */
export function HowItWorks({ content, drawingLabels, index }: HowItWorksProps) {
  const ref = useRef<HTMLElement>(null);

  useMotion(ref, ({ gsap, scope }) => {
    const steps = Array.from(scope.querySelectorAll<HTMLElement>("[data-step]"));
    const cabin = scope.querySelector("[data-part='cabin']");
    const upper = scope.querySelector("[data-part='door-upper']");
    const leafL = scope.querySelector("[data-part='door-lower-l']");
    const leafR = scope.querySelector("[data-part='door-lower-r']");
    const slide = 0.4 * DRAWING.scale;

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: scope,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          const active = self.progress < 0.33 ? 0 : self.progress < 0.7 ? 1 : 2;
          steps.forEach((s, i) => s.setAttribute("data-active", i === active ? "true" : "false"));
        },
      },
    });
    // 01 Enter: the door parts.
    if (leafL && leafR) {
      tl.fromTo(leafL, { attr: { transform: "translate(0 0)" } }, { attr: { transform: `translate(${-slide} 0)` }, duration: 0.12 }, 0.04);
      tl.fromTo(leafR, { attr: { transform: "translate(0 0)" } }, { attr: { transform: `translate(${slide} 0)` }, duration: 0.12 }, 0.04);
      // 02 Move: the door closes, the stair opening opens, the cabin rises.
      tl.to(leafL, { attr: { transform: "translate(0 0)" }, duration: 0.08 }, 0.3);
      tl.to(leafR, { attr: { transform: "translate(0 0)" }, duration: 0.08 }, 0.3);
    }
    if (upper) tl.fromTo(upper, { attr: { "stroke-dashoffset": 0 } }, { attr: { "stroke-dashoffset": 1 }, duration: 0.1 }, 0.36);
    if (cabin) tl.fromTo(cabin, { attr: { transform: "translate(0 0)" } }, { attr: { transform: `translate(0 ${-STOREY * DRAWING.scale})` }, duration: 0.45 }, 0.4);
    // 03 Arrive: nothing else moves; the cabin has become the landing.
    tl.to({}, { duration: 0.15 }, 0.85);
  });

  return (
    <section
      ref={ref}
      id="how-it-works"
      aria-labelledby="how-title"
      className="scroll-track bg-warm-white"
      style={{ ["--track" as string]: "220svh", ["--track-mobile" as string]: "200svh" }}
    >
      <div className="scroll-stage">
        <div className="container-content flex h-full flex-col pt-[calc(var(--spacing-header)+1rem)] pb-8 lg:pb-10">
          <div className="flex items-baseline gap-6">
            <p className="font-mono text-mono text-caption">{index}</p>
            <h2 id="how-title" className="text-h3 font-medium text-charcoal">
              {content.title}
            </h2>
          </div>
          <div className="sheet flex-1 items-center gap-y-8 pt-8">
            <ol className="col-span-12 grid gap-6 lg:col-span-5 lg:gap-10">
              {content.steps.map((step, i) => (
                <li
                  key={step.number}
                  data-step
                  data-active={i === 0 ? "true" : "false"}
                  className={cn(
                    "grid grid-cols-[auto_1fr] items-baseline gap-x-6 border-t border-stone pt-5 transition-opacity duration-500",
                    "data-[active=false]:opacity-40",
                  )}
                >
                  <span aria-hidden className="font-mono text-mono text-oxide">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="text-display-3 font-medium text-charcoal">
                      <span className="sr-only">{step.number} </span>
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-[40ch] text-body text-charcoal-soft">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="col-span-12 lg:col-span-7 lg:pl-8">
              <SectionDrawing progress={0.5} labels={drawingLabels} title={content.title} desc={content.steps.map((s) => s.body).join(" ")} />
              <p className="mt-3 font-mono text-mono text-caption">{content.note}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
