"use client";

import { useEffect, useRef, useState } from "react";
import { AppLink } from "@/components/ui/AppLink";
import { Arrow } from "@/components/ui/Arrow";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { VideoLoop } from "@/components/ui/VideoLoop";
import type { HomeContent } from "@/content/types";
import { cn } from "@/lib/cn";
import { gsap, MOTION_OK } from "@/lib/motion/gsap";

interface MaterialLabProps {
  content: HomeContent["design"];
  index: string;
}

/**
 * A material board rather than a row of cards: the material names in large
 * type down the left, one large scene and its close crop on the right.
 * Choosing a material crosses the scene over and shifts the type. Every
 * entry says it is a reference, because the Elevante range is not
 * published yet.
 */
export function MaterialLab({ content, index }: MaterialLabProps) {
  const [active, setActive] = useState(0);
  const scenes = useRef<Array<HTMLDivElement | null>>([]);
  const swatches = useRef<Array<HTMLDivElement | null>>([]);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (!window.matchMedia(MOTION_OK).matches) return;
    const ctx = gsap.context(() => {
      scenes.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, { autoAlpha: i === active ? 1 : 0, scale: i === active ? 1 : 1.03, duration: 0.9, ease: "power3.out" });
      });
      swatches.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, { autoAlpha: i === active ? 1 : 0, y: i === active ? 0 : 12, duration: 0.7, ease: "power3.out" });
      });
      if (nameRef.current) gsap.fromTo(nameRef.current, { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, ease: "expo.out" });
    });
    return () => ctx.revert();
  }, [active]);

  const material = content.materials[active];

  return (
    <section id="design" aria-labelledby="design-title" className="bg-stone py-section">
      <div className="container-content">
        <div className="sheet items-end gap-y-6">
          <p className="col-span-12 font-mono text-mono text-caption lg:col-span-1">{index}</p>
          <h2 id="design-title" className="col-span-12 text-display-1 font-medium text-charcoal lg:col-span-7 lg:col-start-3">
            {content.title}
          </h2>
          <p className="col-span-12 max-w-[36ch] text-body-l text-charcoal-soft lg:col-span-3 lg:col-start-10">{content.body}</p>
        </div>

        <div className="sheet mt-14 gap-y-10 lg:mt-20">
          {/* The board */}
          <div className="col-span-12 lg:col-span-4 lg:col-start-1">
            <p className="font-mono text-mono text-caption">{content.boardLabel}</p>
            <ul className="mt-4 border-t border-charcoal/20" role="list">
              {content.materials.map((m, i) => (
                <li key={m.id} className="border-b border-charcoal/20">
                  <button
                    type="button"
                    aria-pressed={i === active}
                    onClick={() => setActive(i)}
                    className={cn(
                      "flex min-h-16 w-full items-center justify-between gap-6 py-3 text-left text-[clamp(2rem,4.5vw,3.75rem)] leading-none font-medium tracking-[-0.03em] transition-[color,padding] duration-400 ease-[var(--ease-out-quart)]",
                      i === active ? "pl-4 text-charcoal" : "text-charcoal/60 hover:text-charcoal/80",
                    )}
                  >
                    {m.name}
                    <span aria-hidden className={cn("h-px w-10 transition-colors", i === active ? "bg-oxide" : "bg-transparent")} />
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-[34ch] text-small text-caption">{content.materialsNote}</p>
            <AppLink href={content.cta.href} className="action mt-10">
              {content.cta.label}
              <Arrow />
            </AppLink>
          </div>

          {/* The scene and its close crop */}
          <div className="col-span-12 lg:col-span-8">
            <div className="relative h-[52svh] min-h-[20rem] w-full overflow-hidden bg-white lg:h-[64svh]">
              {content.materials.map((m, i) => (
                <div
                  key={m.id}
                  ref={(el) => {
                    scenes.current[i] = el;
                  }}
                  className="absolute inset-0"
                  style={{ opacity: i === active ? 1 : 0, visibility: i === active ? "visible" : "hidden" }}
                  aria-hidden={i !== active}
                >
                  {m.video ? (
                    <VideoLoop video={m.video} className="h-full w-full object-cover" />
                  ) : (
                    <MediaFrame asset={m.media} sizes="(min-width: 64rem) 60vw, 100vw" tone="white" className="h-full w-full" />
                  )}
                </div>
              ))}
              {/* the swatch, matted at the corner */}
              <div className="absolute right-4 bottom-4 h-[7.5rem] w-[6rem] bg-warm-white p-1.5 shadow-none lg:right-6 lg:bottom-6 lg:h-[10rem] lg:w-[8rem]">
                {content.materials.map((m, i) => (
                  <div
                    key={m.id}
                    ref={(el) => {
                      swatches.current[i] = el;
                    }}
                    className="absolute inset-1.5"
                    style={{ opacity: i === active ? 1 : 0, visibility: i === active ? "visible" : "hidden" }}
                    aria-hidden={i !== active}
                  >
                    <MediaFrame asset={m.swatch} sizes="8rem" tone="warm-white" className="h-full w-full" />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_auto] sm:items-baseline">
              <p ref={nameRef} className="text-h3 font-medium text-charcoal">
                {material.name}
                <span className="ml-3 font-mono text-mono text-caption">{material.reference ? content.referenceLabel : content.finishLabel}</span>
              </p>
              <p className="max-w-[44ch] text-small text-caption sm:text-right">{material.note}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
