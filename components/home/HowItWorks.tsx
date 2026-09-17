"use client";

import { useRef } from "react";
import { POSES, StairSection, type StairState } from "@/components/diagram/StairSection";
import { Caption } from "@/components/ui/Caption";
import { Container } from "@/components/ui/Section";
import type { HomeContent } from "@/content/types";
import { useMotion } from "@/lib/motion/useMotion";

const STATES: StairState[] = ["enter", "move", "arrive"];

/**
 * Enter, move, arrive. The drawing stays in view and takes the pose of
 * whichever stage is in front of the reader. Without JavaScript the drawing
 * shows the first stage and every stage's text is fully legible.
 */
export function HowItWorks({ content }: { content: HomeContent["howItWorks"] }) {
  const ref = useRef<HTMLElement>(null);

  useMotion(ref, ({ gsap, ScrollTrigger, scope }) => {
    const cabin = scope.querySelector('[data-part="cabin"]');
    const doorLower = scope.querySelector('[data-part="door-lower"]');
    const doorUpper = scope.querySelector('[data-part="door-upper"]');
    const steps = Array.from(scope.querySelectorAll<HTMLElement>("[data-step]"));
    if (!cabin || !doorLower || !doorUpper) return;

    const apply = (index: number) => {
      const pose = POSES[STATES[index]];
      gsap.to(cabin, { y: pose.cabinY, duration: 1.2, ease: "power2.inOut", overwrite: "auto" });
      gsap.to(doorLower, { strokeDashoffset: pose.lowerOpen, duration: 0.6, overwrite: "auto" });
      gsap.to(doorUpper, { strokeDashoffset: pose.upperOpen, duration: 0.6, overwrite: "auto" });
      steps.forEach((step, i) => (step.dataset.active = String(i === index)));
    };

    steps.forEach((step, i) => {
      ScrollTrigger.create({
        trigger: step,
        start: "top 62%",
        end: "bottom 62%",
        onEnter: () => apply(i),
        onEnterBack: () => apply(i),
      });
    });

    return () => steps.forEach((step) => delete step.dataset.active);
  });

  return (
    <section ref={ref} id="how-it-works" aria-labelledby="hiw-title" className="bg-warm-white py-section">
      <Container>
        <div className="grid lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-5">
            <h2 id="hiw-title" className="text-display-2">
              {content.title}
            </h2>
            <p className="mt-6 max-w-[40ch] text-body-l text-charcoal-soft">{content.intro}</p>
          </div>

          <div className="sticky top-[4.5rem] z-10 mt-8 bg-warm-white py-3 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1 lg:top-28 lg:mt-0 lg:self-start lg:py-0">
            <StairSection state="enter" className="diagram-hide-labels-mobile h-auto w-full" />
            <Caption className="mt-3 hidden lg:block">{content.diagramNote}</Caption>
          </div>

          <ol className="mt-6 lg:col-span-5 lg:row-start-2 lg:mt-16">
            {content.steps.map((step) => (
              <li
                key={step.number}
                data-step
                className="flex min-h-[40vh] flex-col justify-center border-t border-stone py-10 lg:min-h-[54vh]"
              >
                <span className="font-mono text-small text-caption">{step.number}</span>
                <h3 className="mt-3 text-h3">{step.title}</h3>
                <p className="mt-4 max-w-[38ch] text-body text-charcoal-soft">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
