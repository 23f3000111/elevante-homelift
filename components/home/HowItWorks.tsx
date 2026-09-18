"use client";

import { useRef, useState } from "react";
import { StairSection, STOREY } from "@/components/diagram/StairSection";
import { Caption } from "@/components/ui/Caption";
import { Container } from "@/components/ui/Section";
import { SectionIndex } from "@/components/ui/SectionIndex";
import type { HomeContent } from "@/content/types";
import { cn } from "@/lib/cn";
import { revealWithin, useMotion } from "@/lib/motion/useMotion";

/**
 * Enter, move, arrive. The drawing stays in view and the scroll position
 * runs it continuously: the lower door opens and closes, the cabin climbs,
 * the upper door opens. The stage numerals drift at their own rate behind
 * the text, so type and drawing move independently. Without JavaScript the
 * drawing shows the first stage and every stage is fully legible.
 */
export function HowItWorks({
  content,
}: {
  content: HomeContent["howItWorks"];
}) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useMotion(ref, ({ gsap, ScrollTrigger, scope }) => {
    revealWithin(scope);
    const cabin = scope.querySelector('[data-part="cabin"]');
    const doorLower = scope.querySelector('[data-part="door-lower"]');
    const doorUpper = scope.querySelector('[data-part="door-upper"]');
    const list = scope.querySelector("[data-steps]");
    const steps = Array.from(
      scope.querySelectorAll<HTMLElement>("[data-step]"),
    );
    if (!cabin || !doorLower || !doorUpper || !list) return;

    gsap.set(doorLower, { strokeDashoffset: 0 });
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: list,
        start: "top 70%",
        end: "bottom 50%",
        scrub: 0.5,
      },
    });
    tl.to(doorLower, { strokeDashoffset: 1, duration: 0.08 }, 0.03)
      .to(doorLower, { strokeDashoffset: 0, duration: 0.08 }, 0.24)
      .to(cabin, { y: -STOREY, duration: 0.5, ease: "power1.inOut" }, 0.32)
      .to(doorUpper, { strokeDashoffset: 1, duration: 0.08 }, 0.9);

    steps.forEach((step, i) => {
      ScrollTrigger.create({
        trigger: step,
        start: "top 65%",
        end: "bottom 65%",
        onToggle: (self) => {
          if (self.isActive) setActive(i);
        },
      });
    });
  });

  const current = content.steps[active];

  return (
    <section
      ref={ref}
      id="how-it-works"
      aria-labelledby="hiw-title"
      className="overflow-x-clip bg-warm-white py-section"
    >
      <Container>
        <div className="grid lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-5">
            <SectionIndex
              index={content.index}
              label={content.indexLabel}
              size="small"
            />
            <h2 id="hiw-title" data-reveal className="mt-6 text-display-2">
              {content.title}
            </h2>
            <p
              data-reveal
              className="mt-5 max-w-[40ch] text-body-l text-charcoal-soft"
            >
              {content.intro}
            </p>
          </div>

          <div className="sticky top-[4.5rem] z-10 mt-6 bg-warm-white py-3 lg:top-28 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:self-start lg:py-0">
            <StairSection
              state="enter"
              className="diagram-hide-labels-mobile h-auto w-full"
            />
            <div className="mt-3 hidden items-baseline justify-between border-t border-stone pt-3 lg:flex">
              <span className="text-body font-medium text-charcoal">
                <span className="mr-3 font-mono text-small text-oxide">
                  {current.number}
                </span>
                {current.title}
              </span>
              <Caption>{content.diagramNote}</Caption>
            </div>
          </div>

          <ol data-steps className="mt-4 lg:col-span-5 lg:row-start-2 lg:mt-10">
            {content.steps.map((step, i) => (
              <li
                key={step.number}
                data-step
                className="relative flex min-h-[32vh] flex-col justify-center border-t border-stone py-8 lg:min-h-[34vh]"
              >
                <span
                  aria-hidden
                  data-parallax="0.4"
                  className="pointer-events-none absolute top-1 -left-1 text-[clamp(4.5rem,9vw,8rem)] leading-none font-medium tracking-[-0.06em] text-stone select-none"
                >
                  {step.number}
                </span>
                <div className="relative">
                  <span
                    className={cn(
                      "font-mono text-small",
                      i === active ? "text-oxide" : "text-caption",
                    )}
                  >
                    <span className="sr-only">Stage </span>
                    {step.number}
                  </span>
                  <h3 className="mt-2 text-[clamp(1.875rem,3.2vw,3rem)] leading-[1.02] font-medium tracking-[-0.025em] text-charcoal">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-[38ch] text-body-l text-charcoal-soft">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
