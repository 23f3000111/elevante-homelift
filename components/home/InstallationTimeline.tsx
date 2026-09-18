"use client";

import { useRef, useState } from "react";
import { InstallationSheet } from "@/components/diagram/InstallationSheet";
import { AppLink } from "@/components/ui/AppLink";
import { Arrow } from "@/components/ui/Arrow";
import type { HomeContent } from "@/content/types";
import { cn } from "@/lib/cn";
import { useMotion } from "@/lib/motion/useMotion";

interface InstallationTimelineProps {
  content: HomeContent["installation"];
  index: string;
}

/**
 * Seven stages as one continuous line. Scrolling advances the number, the
 * title and the drawing, which fills in a layer at a time. Every stage is a
 * button, so the timeline works by hand too.
 */
export function InstallationTimeline({ content, index }: InstallationTimelineProps) {
  const ref = useRef<HTMLElement>(null);
  const [step, setStep] = useState(1);
  const stRef = useRef<{ start: number; end: number } | null>(null);
  const count = content.steps.length;

  useMotion(ref, ({ ScrollTrigger, scope }) => {
    const st = ScrollTrigger.create({
      trigger: scope,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const s = Math.min(count, Math.floor(self.progress * count) + 1);
        setStep((prev) => (prev === s ? prev : s));
      },
      onRefresh: (self) => {
        stRef.current = { start: self.start, end: self.end };
      },
    });
    stRef.current = { start: st.start, end: st.end };
    return () => st.kill();
  });

  const choose = (s: number) => {
    setStep(s);
    const st = stRef.current;
    if (!st) return;
    const target = st.start + ((st.end - st.start) * (s - 0.5)) / count;
    if (window.__lenis) window.__lenis.scrollTo(target, { duration: 1 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  const current = content.steps[step - 1];

  return (
    <section
      ref={ref}
      id="installation"
      aria-labelledby="installation-title"
      className="scroll-track bg-white"
      style={{ ["--track" as string]: "300svh", ["--track-mobile" as string]: "260svh" }}
    >
      <div className="scroll-stage">
        <div className="container-content flex h-full flex-col pt-[calc(var(--spacing-header)+1rem)] pb-8 lg:pb-10">
          <div className="sheet items-end gap-y-4">
            <p className="col-span-12 font-mono text-mono text-caption lg:col-span-1">{index}</p>
            <h2 id="installation-title" className="col-span-12 max-w-[16ch] text-display-2 font-medium text-charcoal lg:col-span-7 lg:col-start-3">
              {content.title}
            </h2>
            <p className="col-span-12 max-w-[36ch] text-body text-charcoal-soft lg:col-span-3 lg:col-start-10">{content.body}</p>
          </div>

          <div className="sheet flex-1 items-center gap-y-8 pt-8">
            <div className="col-span-12 lg:col-span-5">
              {/* The line */}
              <ol className="relative grid grid-cols-7 gap-1 border-t border-stone pt-3" aria-label={content.title}>
                <span aria-hidden className="absolute top-[-1px] left-0 h-px bg-oxide transition-[width] duration-500 ease-[var(--ease-out-quart)]" style={{ width: `${(step / count) * 100}%` }} />
                {content.steps.map((s, i) => (
                  <li key={s.number}>
                    <button
                      type="button"
                      aria-current={i + 1 === step ? "step" : undefined}
                      aria-label={`${s.number} ${s.title}`}
                      onClick={() => choose(i + 1)}
                      className={cn("min-h-11 w-full font-mono text-mono transition-colors", i + 1 <= step ? "text-charcoal" : "text-caption hover:text-charcoal")}
                    >
                      {s.number}
                    </button>
                  </li>
                ))}
              </ol>

              {/* The stage in hand */}
              <div className="mt-8 min-h-[14rem]" aria-live="polite">
                <p aria-hidden className="text-[clamp(5rem,12vw,10rem)] leading-[0.85] font-medium tracking-[-0.05em] text-stone">
                  {current.number}
                </p>
                <h3 className="mt-4 text-display-3 font-medium text-charcoal">
                  <span className="sr-only">{current.number} </span>
                  {current.title}
                </h3>
                <p className="mt-3 max-w-[40ch] text-body-l text-charcoal-soft">{current.body}</p>
              </div>
              <AppLink href={content.cta.href} className="action mt-8">
                {content.cta.label}
                <Arrow />
              </AppLink>
            </div>
            <div className="col-span-12 lg:col-span-7 lg:pl-8">
              <InstallationSheet step={step} title={content.sheetTitle} desc={content.sheetDesc} />
              <p className="mt-3 font-mono text-mono text-caption">{content.note}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
