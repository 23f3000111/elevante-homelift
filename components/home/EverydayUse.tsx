"use client";

import { useRef, useState } from "react";
import { CabinPlan } from "@/components/diagram/CabinPlan";
import { StairSection } from "@/components/diagram/StairSection";
import { Caption } from "@/components/ui/Caption";
import { Picture } from "@/components/ui/Picture";
import { Container } from "@/components/ui/Section";
import { SectionIndex } from "@/components/ui/SectionIndex";
import type { Figure, HomeContent, Situation } from "@/content/types";
import { cn } from "@/lib/cn";
import { scrollToElement } from "@/lib/motion/scroll";
import { revealWithin, useMotion } from "@/lib/motion/useMotion";

/** Every situation the brief lists gets a photograph where one exists and a drawing where none does. */
function SituationFigure({ figure }: { figure: Figure }) {
  const stair = "h-auto max-h-full w-full";
  const plan = "h-full w-auto max-w-full";
  switch (figure) {
    case "move":
      return <StairSection state="move" labels={false} className={stair} />;
    case "doors":
      return <StairSection state="enter" highlight="door-lower" labels={false} className={stair} />;
    case "stair-opening":
      return <StairSection state="move" highlight="door-upper" labels={false} className={stair} />;
    case "rollator":
      return <CabinPlan occupant="rollator" className={plan} />;
    case "wheelchair":
      return <CabinPlan occupant="wheelchair" className={plan} />;
    case "two-people":
      return <CabinPlan occupant="two-people" className={plan} />;
  }
}

function Visual({ s }: { s: Situation }) {
  if (s.media) {
    return <Picture asset={s.media} fill fit="contain" sizes="(min-width: 1024px) 52vw, 100vw" className="h-full w-full" />;
  }
  if (s.figure) {
    return (
      <div className="flex h-full w-full items-center justify-center p-6 lg:p-10">
        <SituationFigure figure={s.figure} />
      </div>
    );
  }
  return null;
}

/**
 * An editorial sequence rather than a grid: the situations run down the
 * left as large type, and the picture on the right changes with them,
 * whether you scroll past them or choose one. Every situation's text is
 * always on the page.
 */
export function EverydayUse({ content }: { content: HomeContent["everydayUse"] }) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const items = useRef<Array<HTMLLIElement | null>>([]);

  useMotion(ref, ({ ScrollTrigger, scope }) => {
    revealWithin(scope);
    const lis = Array.from(scope.querySelectorAll<HTMLElement>("[data-situation]"));
    lis.forEach((li, i) => {
      ScrollTrigger.create({
        trigger: li,
        start: "top 60%",
        end: "bottom 60%",
        onToggle: (self) => {
          if (self.isActive) setActive(i);
        },
      });
    });
  });

  const current = content.situations[active];

  return (
    <section ref={ref} id="everyday-use" aria-labelledby="eu-title" className="bg-white py-section">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <SectionIndex index={content.index} label={content.indexLabel} size="small" />
            <h2 id="eu-title" data-reveal className="mt-6 text-display-2">
              {content.title}
            </h2>
          </div>
          <p data-reveal className="max-w-[40ch] text-body-l text-charcoal-soft lg:col-span-4 lg:col-start-9">
            {content.intro}
          </p>
        </div>

        <div className="mt-10 grid lg:grid-cols-12 lg:gap-10">
          <div className="sticky top-[4.5rem] z-10 bg-white py-3 lg:top-24 lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:self-start lg:py-0">
            <div className="relative h-[62vw] max-h-[26rem] overflow-hidden bg-warm-white sm:h-[24rem] lg:h-[clamp(22rem,58svh,34rem)]">
              {content.situations.map((s, i) => (
                <div key={s.id} data-visual-item data-active={i === active ? "true" : "false"} className="absolute inset-0" aria-hidden={i !== active}>
                  <Visual s={s} />
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-baseline justify-between border-t border-stone pt-3">
              <span className="text-body font-medium text-charcoal">
                <span className="mr-3 font-mono text-small text-oxide">{String(active + 1).padStart(2, "0")}</span>
                {current.title}
              </span>
              <Caption>{current.media ? content.visualisationLabel : content.schematicLabel}</Caption>
            </div>
          </div>

          <ol className="mt-6 lg:col-span-5 lg:row-start-1 lg:mt-0">
            {content.situations.map((s, i) => (
              <li
                key={s.id}
                data-situation
                ref={(el) => {
                  items.current[i] = el;
                }}
                className={cn("border-t border-stone", i === active ? "text-charcoal" : "text-charcoal-soft")}
              >
                <button
                  type="button"
                  aria-pressed={i === active}
                  onClick={() => {
                    setActive(i);
                    const el = items.current[i];
                    if (el) scrollToElement(el, -140);
                  }}
                  className="flex min-h-14 w-full items-baseline gap-5 pt-4 pb-1 text-left"
                >
                  <span className={cn("font-mono text-small", i === active ? "text-oxide" : "text-caption")}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[clamp(1.5rem,2.4vw,2.125rem)] leading-none font-medium tracking-[-0.02em]">{s.title}</span>
                </button>
                <p className="max-w-[42ch] pb-5 pl-[3.25rem] text-body text-charcoal-soft">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-12 grid gap-5 border-t-2 border-oxide pt-6 lg:mt-16 lg:grid-cols-12">
          <h3 className="text-h3 lg:col-span-4">{content.safetyTitle}</h3>
          <p className="max-w-[56ch] text-body-l text-charcoal-soft lg:col-span-7 lg:col-start-6">{content.safety}</p>
        </div>
      </Container>
    </section>
  );
}
