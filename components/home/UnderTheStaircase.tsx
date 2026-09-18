"use client";

import { useRef, useState } from "react";
import { PlanDrawing, type PlanLabels } from "@/components/diagram/PlanDrawing";
import { SectionDrawing } from "@/components/diagram/SectionDrawing";
import { AppLink } from "@/components/ui/AppLink";
import { Arrow } from "@/components/ui/Arrow";
import type { HomeContent, MechanismContent } from "@/content/types";
import { cn } from "@/lib/cn";
import { useMotion } from "@/lib/motion/useMotion";

interface UnderTheStaircaseProps {
  content: HomeContent["underTheStaircase"];
  drawingLabels: MechanismContent["drawingLabels"];
  planLabels: PlanLabels;
  index: string;
}

/**
 * The spatial argument, in plan and in section: the same hall before and
 * with Elevante. The drawings switch when the section comes into view, and
 * two large buttons let the visitor switch them back and forth.
 */
export function UnderTheStaircase({ content, drawingLabels, planLabels, index }: UnderTheStaircaseProps) {
  const ref = useRef<HTMLElement>(null);
  const [after, setAfter] = useState(false);

  // Coming into view switches to "with Elevante" once; the visitor takes over from there.
  useMotion(ref, ({ ScrollTrigger, scope }) => {
    const st = ScrollTrigger.create({
      trigger: scope.querySelector("[data-drawings]") ?? scope,
      start: "top 55%",
      once: true,
      onEnter: () => window.setTimeout(() => setAfter(true), 500),
    });
    return () => st.kill();
  });

  return (
    <section ref={ref} id="under-the-staircase" aria-labelledby="space-title" className="bg-warm-white py-section">
      <div className="container-content">
        <div className="sheet gap-y-12">
          <div className="col-span-12 lg:col-span-5">
            <div className="lg:sticky lg:top-[calc(var(--spacing-header)+2rem)]">
              <p className="font-mono text-mono text-caption">{index}</p>
              <h2 id="space-title" className="mt-6 max-w-[14ch] text-display-2 font-medium text-charcoal">
                {content.title}
              </h2>
              <div className="mt-10 max-w-[44ch] space-y-5 text-body-l text-charcoal-soft">
                {content.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>

              <div className="mt-12 grid grid-cols-2 border border-charcoal" role="group" aria-label={`${content.before} / ${content.after}`}>
                {[
                  { label: content.before, value: false },
                  { label: content.after, value: true },
                ].map((o) => (
                  <button
                    key={o.label}
                    type="button"
                    aria-pressed={after === o.value}
                    onClick={() => setAfter(o.value)}
                    className={cn(
                      "min-h-14 px-4 text-body font-medium transition-colors duration-300",
                      after === o.value ? "bg-charcoal text-warm-white" : "bg-transparent text-charcoal hover:bg-white",
                    )}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
              <AppLink href={content.cta.href} className="action mt-10">
                {content.cta.label}
                <Arrow />
              </AppLink>
            </div>
          </div>

          <div data-drawings className="col-span-12 grid gap-12 lg:col-span-7 lg:gap-16">
            <figure>
              <PlanDrawing variant="elevante" cabinHidden={!after} labels={planLabels} title={content.planTitle} desc={content.planDesc} />
              <figcaption className="mt-3 flex items-center justify-between gap-6 font-mono text-mono text-caption">
                <span>{after ? content.after : content.before}</span>
                <span>{content.planTitle}</span>
              </figcaption>
            </figure>
            <figure>
              <SectionDrawing progress={after ? 0.42 : 0.32} labels={drawingLabels} title={content.sectionTitle} desc={content.sectionDesc} highlight={after ? "cabin" : "void"} />
              <figcaption className="mt-3 flex items-center justify-between gap-6 font-mono text-mono text-caption">
                <span>{content.sectionTitle}</span>
                <span>{content.note}</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
