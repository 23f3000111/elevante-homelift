"use client";

import { useRef } from "react";
import { PlanDrawing, type PlanLabels } from "@/components/diagram/PlanDrawing";
import type { HomeContent } from "@/content/types";
import { cn } from "@/lib/cn";
import { useHorizontalTrack } from "@/lib/motion/useHorizontalTrack";

interface ComparisonProps {
  content: HomeContent["comparison"];
  planLabels: PlanLabels;
  index: string;
}

/**
 * Three plans of the same hall, side by side, moving past as the page
 * scrolls: a stairlift on the staircase, a conventional lift in its own
 * position, and Elevante in the space the staircase already has. The
 * language is the brief's; the footprint does the arguing.
 */
export function Comparison({ content, planLabels, index }: ComparisonProps) {
  const ref = useRef<HTMLElement>(null);
  useHorizontalTrack(ref);

  return (
    <section ref={ref} aria-labelledby="comparison-title" className="bg-white">
      <div data-stage className="flex min-h-[100svh] flex-col justify-center pt-[calc(var(--spacing-header)+1rem)] pb-[max(2.5rem,env(safe-area-inset-bottom))] lg:pb-14">
        <div className="container-content">
          <div className="sheet items-end gap-y-6">
            <p className="col-span-12 font-mono text-mono text-caption lg:col-span-1">{index}</p>
            <h2 id="comparison-title" className="col-span-12 max-w-[22ch] text-display-3 font-medium text-charcoal lg:col-span-8 lg:col-start-3">
              {content.title}
            </h2>
            <p className="col-span-12 hidden font-mono text-mono text-caption lg:col-span-3 lg:col-start-10 lg:block lg:text-right">{content.dragHint}</p>
          </div>
        </div>

        <div data-track-wrap className="mt-10 lg:mt-12 lg:overflow-x-auto">
          <div data-track className="grid gap-10 px-gutter lg:ml-[max(0px,calc((100vw-90rem)/2))] lg:flex lg:w-max lg:gap-16 lg:pr-[8vw]">
            {content.items.map((item, i) => (
              <article
                key={item.id}
                className={cn("grid content-start gap-5 lg:w-[min(42vw,38rem)] lg:shrink-0", i === content.items.length - 1 && "lg:pr-8")}
                data-item={item.id}
              >
                <div className={cn("fit-h h-[min(18rem,30svh)] border-t pt-5", item.id === "elevante" ? "border-oxide" : "border-stone")}>
                  <PlanDrawing
                    variant={item.id}
                    labels={planLabels}
                    title={`${item.name}: plan`}
                    desc={`${item.statement} ${item.body}`}
                  />
                </div>
                <div className="grid gap-x-8 gap-y-2 lg:grid-cols-[1fr_1fr] lg:items-baseline">
                  <div>
                    <p className="font-mono text-mono text-caption">
                      {String(i + 1).padStart(2, "0")} / {item.name}
                    </p>
                    <h3 className={cn("mt-2 text-h3 font-medium", item.id === "elevante" ? "text-oxide" : "text-charcoal")}>{item.statement}</h3>
                  </div>
                  <p className="max-w-[40ch] text-body text-charcoal-soft">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="container-content mt-10 flex items-center justify-between gap-6 lg:mt-14">
          <p className="font-mono text-mono text-caption">{content.note}</p>
          <div className="hidden h-px flex-1 origin-left bg-oxide lg:block" data-progress style={{ transform: "scaleX(0)" }} />
        </div>
      </div>
    </section>
  );
}
