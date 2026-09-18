"use client";

import { useRef, useState } from "react";
import { CabinPlan, type CabinPlanLabels } from "@/components/diagram/CabinPlan";
import type { HomeContent } from "@/content/types";
import { cn } from "@/lib/cn";
import { DESKTOP } from "@/lib/motion/gsap";
import { useMotion } from "@/lib/motion/useMotion";
import { useStageFlow } from "@/lib/motion/useStageFlow";

interface EverydayUseProps {
  content: HomeContent["everydayUse"];
  planLabels: CabinPlanLabels;
  index: string;
}

/**
 * Seven situations, one cabin. Scrolling moves through them; the cabin plan
 * redraws for each: door open or closed, a person, a rollator, a
 * wheelchair, two people. Every situation is also a button, so the list is
 * usable without scrolling and without motion.
 */
export function EverydayUse({ content, planLabels, index }: EverydayUseProps) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const count = content.situations.length;
  const stRef = useRef<{ start: number; end: number } | null>(null);
  // Below the desktop breakpoint the section flows and every situation is
  // shown; the drawing follows whichever one is tapped.
  const flow = useStageFlow();

  useMotion(ref, ({ ScrollTrigger, scope, matches }) => {
    if (!matches(DESKTOP)) return;
    const st = ScrollTrigger.create({
      trigger: scope,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const i = Math.min(count - 1, Math.floor(self.progress * count));
        setActive((prev) => (prev === i ? prev : i));
      },
      onRefresh: (self) => {
        stRef.current = { start: self.start, end: self.end };
      },
    });
    stRef.current = { start: st.start, end: st.end };
    return () => {
      st.kill();
      stRef.current = null;
    };
  });

  const choose = (i: number) => {
    setActive(i);
    const st = stRef.current;
    if (!st || flow) return;
    const target = st.start + ((st.end - st.start) * (i + 0.5)) / count;
    if (window.__lenis) window.__lenis.scrollTo(target, { duration: 1 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  const situation = content.situations[active];

  return (
    <section
      ref={ref}
      id="everyday-use"
      aria-labelledby="everyday-title"
      data-stage-flow
      className="scroll-track bg-white"
      style={{ ["--track" as string]: "280svh", ["--track-mobile" as string]: "240svh" }}
    >
      <div className="scroll-stage">
        <div className="container-content flex h-full flex-col pt-[calc(var(--spacing-header)+1rem)] pb-[max(2rem,env(safe-area-inset-bottom))] lg:pb-14">
          <div className="flex items-baseline gap-6">
            <p className="font-mono text-mono text-caption">{index}</p>
            <h2 id="everyday-title" className="text-h3 font-medium text-charcoal">
              {content.title}
            </h2>
            <p className="hidden text-body text-caption sm:block">{content.intro}</p>
          </div>

          <div className="sheet min-h-0 flex-1 items-center gap-y-8 pt-6 lg:pt-8">
            <div className="col-span-12 order-2 lg:order-1 lg:col-span-5">
              <ol className="grid gap-1">
                {content.situations.map((s, i) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      aria-pressed={i === active}
                      onClick={() => choose(i)}
                      className={cn(
                        "grid w-full grid-cols-[3.5rem_1fr] items-baseline gap-x-2 border-t border-stone py-2.5 text-left transition-opacity duration-400",
                        flow || i === active ? "opacity-100" : "opacity-60 hover:opacity-85",
                      )}
                    >
                      <span aria-hidden className={cn("font-mono text-mono", i === active ? "text-oxide" : "text-caption")}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>
                        <span className="block text-h3 font-medium text-charcoal">{s.title}</span>
                        <span data-situation-body className={cn("mt-1 block max-w-[38ch] text-body text-charcoal-soft", flow || i === active ? "" : "hidden")}>
                          {s.body}
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
            <div className="col-span-12 order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
              <div className="mx-auto max-w-[26rem] lg:max-w-none" aria-live="polite">
                <CabinPlan
                  className="drawing-small"
                  occupant={situation.figure.occupant}
                  door={situation.figure.door}
                  focus={situation.figure.focus}
                  labels={planLabels}
                  title={`${content.planTitle}: ${situation.title}`}
                  desc={`${content.planDesc} ${situation.body}`}
                />
              </div>
              <p className="mt-3 text-center font-mono text-mono text-caption lg:text-right">{content.note}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
