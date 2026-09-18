"use client";

import { useRef, useState } from "react";
import { SafetyFigure, type SafetyState } from "@/components/diagram/SafetyFigure";
import type { HomeContent, MechanismContent } from "@/content/types";
import { cn } from "@/lib/cn";
import { useMotion } from "@/lib/motion/useMotion";

interface SafetyProps {
  content: HomeContent["safety"];
  drawingLabels: MechanismContent["drawingLabels"];
  index: string;
}

const STATES: SafetyState[] = ["before", "during", "openings"];

/**
 * The documented safety behaviour, and nothing more: movement detected
 * before travel, movement detected during travel, the openings closed
 * while the cabin is elsewhere. One drawing, three states, scroll-driven
 * and also switchable by hand.
 */
export function Safety({ content, drawingLabels, index }: SafetyProps) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const stRef = useRef<{ start: number; end: number } | null>(null);
  const count = content.behaviours.length;

  useMotion(ref, ({ ScrollTrigger, scope }) => {
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
    return () => st.kill();
  });

  const choose = (i: number) => {
    setActive(i);
    const st = stRef.current;
    if (!st) return;
    const target = st.start + ((st.end - st.start) * (i + 0.5)) / count;
    if (window.__lenis) window.__lenis.scrollTo(target, { duration: 1 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      id="safety"
      aria-labelledby="safety-title"
      className="scroll-track bg-warm-white"
      style={{ ["--track" as string]: "220svh", ["--track-mobile" as string]: "200svh" }}
    >
      <div className="scroll-stage">
        <div className="container-content flex h-full flex-col pt-[calc(var(--spacing-header)+1rem)] pb-8 lg:pb-10">
          <p className="font-mono text-mono text-caption">{index}</p>
          <div className="sheet flex-1 items-center gap-y-8 pt-4">
            <div className="col-span-12 lg:col-span-5">
              <h2 id="safety-title" className="text-display-2 font-medium text-charcoal">
                <span className="block">{content.titleA}</span>
                <span className="block text-charcoal-soft/80">{content.titleB}</span>
              </h2>
              <p className="mt-6 max-w-[40ch] text-body-l text-charcoal-soft">{content.intro}</p>
              <ol className="mt-6 grid gap-1">
                {content.behaviours.map((b, i) => (
                  <li key={b.id}>
                    <button
                      type="button"
                      aria-pressed={i === active}
                      onClick={() => choose(i)}
                      className={cn(
                        "grid w-full grid-cols-[3.5rem_1fr] items-baseline gap-x-2 border-t border-stone py-3.5 text-left transition-opacity duration-400",
                        i === active ? "opacity-100" : "opacity-45 hover:opacity-80",
                      )}
                    >
                      <span aria-hidden className={cn("font-mono text-mono", i === active ? "text-oxide" : "text-caption")}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>
                        <span className="block text-h3 font-medium text-charcoal">{b.title}</span>
                        <span className="mt-1 block max-w-[38ch] text-body text-charcoal-soft">{b.body}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
            <div className="col-span-12 lg:col-span-7 lg:pl-8">
              <SafetyFigure
                state={STATES[active]}
                labels={drawingLabels}
                zoneLabel={content.zoneLabel}
                title={content.figureTitle}
                desc={content.figureDesc}
              />
              <p className="mt-3 font-mono text-mono text-caption">{content.note}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
