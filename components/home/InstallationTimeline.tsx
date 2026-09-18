"use client";

import { useRef, useState } from "react";
import { InstallationSheet } from "@/components/diagram/InstallationSheet";
import { AppLink } from "@/components/ui/AppLink";
import { Arrow } from "@/components/ui/Arrow";
import { MediaFrame } from "@/components/ui/MediaFrame";
import type { HomeContent } from "@/content/types";
import { cn } from "@/lib/cn";
import { DESKTOP } from "@/lib/motion/gsap";
import { useMotion } from "@/lib/motion/useMotion";
import { useStageFlow } from "@/lib/motion/useStageFlow";

interface InstallationTimelineProps {
  content: HomeContent["installation"];
  index: string;
}

/**
 * Seven stages as one continuous line. Scrolling advances the number, the
 * title, the supporting photograph and the drawing, which fills in a layer
 * at a time. Every stage is a button, so the timeline works by hand too.
 */
export function InstallationTimeline({ content, index }: InstallationTimelineProps) {
  const ref = useRef<HTMLElement>(null);
  const [step, setStep] = useState(1);
  const stRef = useRef<{ start: number; end: number } | null>(null);
  const count = content.steps.length;
  // Below the desktop breakpoint the seven stages read as a list and the
  // drawing shows the finished system.
  const flow = useStageFlow();

  useMotion(ref, ({ ScrollTrigger, scope, matches }) => {
    if (!matches(DESKTOP)) return;
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
    if (!st || flow) return;
    const target = st.start + ((st.end - st.start) * (s - 0.5)) / count;
    if (window.__lenis) window.__lenis.scrollTo(target, { duration: 1 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  const current = content.steps[step - 1];
  // Each photograph covers the stages from its own onwards; the last one
  // that has been reached is the one shown.
  const photo = [...content.media].reverse().find((m) => m.fromStep <= step) ?? content.media[0];

  return (
    <section
      ref={ref}
      id="installation"
      aria-labelledby="installation-title"
      data-stage-flow
      className="scroll-track bg-white"
      style={{ ["--track" as string]: "300svh", ["--track-mobile" as string]: "260svh" }}
    >
      <div className="scroll-stage">
        <div className="container-content flex h-full flex-col pt-[calc(var(--spacing-header)+1rem)] pb-[max(2rem,env(safe-area-inset-bottom))] lg:pb-14">
          <div className="sheet items-end gap-y-4">
            <p className="col-span-12 font-mono text-mono text-caption lg:col-span-1">{index}</p>
            <h2 id="installation-title" className="col-span-12 max-w-[16ch] text-display-3 font-medium text-charcoal lg:col-span-7 lg:col-start-3">
              {content.title}
            </h2>
            <p className="col-span-12 max-w-[36ch] text-body text-charcoal-soft lg:col-span-3 lg:col-start-10">{content.body}</p>
          </div>

          <div className="sheet min-h-0 flex-1 items-center gap-y-8 pt-8">
            <div className="col-span-12 lg:col-span-5">
              {flow ? (
                /* Flowing: the seven stages read as a list, with the
                   photographs beside the ones they belong to. */
                <ol className="border-t border-charcoal">
                  {content.steps.map((s, i) => {
                    const shot = content.media.find((m) => m.fromStep === i + 1);
                    return (
                      <li key={s.number} className="grid grid-cols-[3.5rem_1fr] items-baseline gap-x-2 border-b border-stone py-5">
                        <span aria-hidden className="font-mono text-mono text-oxide">
                          {s.number}
                        </span>
                        <div>
                          <h3 className="text-h3 font-medium text-charcoal">
                            <span className="sr-only">{s.number} </span>
                            {s.title}
                          </h3>
                          <p className="mt-1.5 max-w-[42ch] text-body text-charcoal-soft">{s.body}</p>
                          {shot && (
                            <figure className="mt-4">
                              <div className="h-[11rem]">
                                <MediaFrame asset={shot.asset} sizes="(min-width: 40rem) 20rem, 90vw" tone="warm-white" className="w-fit" />
                              </div>
                              <figcaption className="mt-2 font-mono text-mono text-caption">{shot.caption}</figcaption>
                            </figure>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ol>
              ) : (
                <>
                  {/* The line */}
                  <ol className="relative grid grid-cols-7 gap-1 border-t border-stone pt-3" aria-label={content.title}>
                    <span
                      aria-hidden
                      className="absolute top-[-1px] left-0 h-px bg-oxide transition-[width] duration-500 ease-[var(--ease-out-quart)]"
                      style={{ width: `${(step / count) * 100}%` }}
                    />
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

                  {/* The stage in hand, beside its photograph. The numeral is
                      capped by viewport height so a short window never clips it. */}
                  <div className="mt-6 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-start lg:mt-8" aria-live="polite">
                    <div>
                      <p aria-hidden className="text-[min(9rem,11svh)] leading-[0.8] font-medium tracking-[-0.05em] text-stone">
                        {current.number}
                      </p>
                      <h3 className="mt-3 text-display-3 font-medium text-charcoal">
                        <span className="sr-only">{current.number} </span>
                        {current.title}
                      </h3>
                      <p className="mt-3 max-w-[38ch] text-body text-charcoal-soft">{current.body}</p>
                    </div>
                    <figure className="hidden w-[11rem] shrink-0 sm:block">
                      <div className="h-[9rem]">
                        <MediaFrame asset={photo.asset} sizes="11rem" tone="warm-white" className="w-full" />
                      </div>
                      <figcaption className="mt-2 font-mono text-mono text-caption">{photo.caption}</figcaption>
                    </figure>
                  </div>
                </>
              )}

              <AppLink href={content.cta.href} className="action mt-6">
                {content.cta.label}
                <Arrow />
              </AppLink>
            </div>
            <div className="col-span-12 lg:col-span-7 lg:pl-8">
              <InstallationSheet step={flow ? count : step} title={content.sheetTitle} desc={content.sheetDesc} />
              <p className="mt-3 font-mono text-mono text-caption">{content.note}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
