"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { SectionDrawing } from "@/components/diagram/SectionDrawing";
import type { MechanismContent } from "@/content/types";
import { cn } from "@/lib/cn";
import { DESKTOP } from "@/lib/motion/gsap";
import { useMotion } from "@/lib/motion/useMotion";
import { poseAt, STATE_COUNT, STATE_RANGES } from "@/lib/scene/pose";
import { createProgress } from "@/lib/scene/progress";

const MechanismCanvas = dynamic(() => import("./MechanismCanvas"), { ssr: false });

interface MechanismSceneProps {
  id?: string;
  content: MechanismContent;
  /** The opening screen: the hero headline. Fades as the drawing begins. */
  opening?: ReactNode;
  /** Height of the scroll track on wide and narrow screens. */
  track?: { desktop: string; mobile: string };
  className?: string;
  /** Render the statement as the section heading (when there is no opening headline). */
  statementAsHeading?: boolean;
}

function webglAvailable(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

type Mode = "static" | "svg" | "webgl";
type Quality = "full" | "lite";

/**
 * How to render, decided once on the client. The server renders "static";
 * with reduced motion the client keeps it; otherwise WebGL if there is any,
 * the SVG fallback if not.
 */
let capability: { mode: Mode; quality: Quality } | null = null;
function detect() {
  if (capability) return capability;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const gl = !reduce && webglAvailable();
  const mode: Mode = reduce ? "static" : gl ? "webgl" : "svg";
  const wide = window.matchMedia(DESKTOP).matches;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const cores = navigator.hardwareConcurrency ?? 4;
  const quality: Quality = gl && wide && !coarse && cores >= 4 ? "full" : "lite";
  capability = { mode, quality };
  return capability;
}
const noSubscribe = () => () => {};

/**
 * The signature scene: a house in section that the visitor draws, furnishes
 * and operates by scrolling. WebGL renders it when it can; the SVG section
 * carries the same pose otherwise. Without JavaScript, or with reduced
 * motion, the CSS lays the same elements out as a page: headline, drawing at
 * its resolved state, the captions as a list.
 */
export function MechanismScene({
  id,
  content,
  opening,
  track = { desktop: "480svh", mobile: "400svh" },
  className,
  statementAsHeading = false,
}: MechanismSceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useMemo(() => createProgress(0), []);
  const mode = useSyncExternalStore(noSubscribe, () => detect().mode, () => "static" as Mode);
  const quality = useSyncExternalStore(noSubscribe, () => detect().quality, () => "lite" as Quality);
  const [near, setNear] = useState(false);
  const [svgProgress, setSvgProgress] = useState(0);

  // Load the WebGL bundle only when the scene is close.
  useEffect(() => {
    const el = ref.current;
    if (!el || mode !== "webgl") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "60% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mode]);

  // The SVG fallback re-renders from the store, throttled to a frame.
  useEffect(() => {
    if (mode !== "svg") return;
    let raf = 0;
    const unsub = progress.subscribe((v) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setSvgProgress(v);
      });
    });
    return () => {
      unsub();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [mode, progress]);

  // Scroll drives the store; the store drives the overlays directly.
  useMotion(ref, ({ ScrollTrigger, gsap, scope }) => {
    const openingEl = scope.querySelector<HTMLElement>("[data-m-opening]");
    const statementEl = scope.querySelector<HTMLElement>("[data-m-statement]");
    const noteEl = scope.querySelector<HTMLElement>("[data-m-note]");
    const captions = Array.from(scope.querySelectorAll<HTMLElement>("[data-m-caption]"));
    const ticks = Array.from(scope.querySelectorAll<HTMLElement>("[data-tick]"));
    const rail = scope.querySelector<HTMLElement>("[data-rail-fill]");
    const setOpeningY = openingEl ? gsap.quickSetter(openingEl, "y", "px") : null;
    const setOpeningA = openingEl ? gsap.quickSetter(openingEl, "opacity") : null;
    const setStatementY = statementEl ? gsap.quickSetter(statementEl, "y", "px") : null;
    const setStatementA = statementEl ? gsap.quickSetter(statementEl, "opacity") : null;
    let lastState = -1;

    const render = (p: number) => {
      const pose = poseAt(p);
      if (openingEl && setOpeningY && setOpeningA) {
        setOpeningY(-(1 - pose.headline) * 90);
        setOpeningA(pose.headline);
        openingEl.style.pointerEvents = pose.headline > 0.2 ? "" : "none";
      }
      if (setStatementY && setStatementA) {
        setStatementY((1 - pose.statement) * 40);
        setStatementA(pose.statement);
      }
      if (noteEl) noteEl.style.opacity = String(Math.min(1, pose.house * 2));
      if (rail) rail.style.transform = `scaleY(${p})`;
      if (pose.state !== lastState) {
        lastState = pose.state;
        captions.forEach((c, i) => c.setAttribute("data-active", i === pose.state ? "true" : "false"));
        ticks.forEach((t, i) => t.setAttribute("aria-current", i === pose.state ? "step" : "false"));
      }
    };

    const st = ScrollTrigger.create({
      trigger: scope,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        progress.set(self.progress);
        render(self.progress);
      },
    });
    progress.set(st.progress);
    render(st.progress);

    // Jump to a state from the rail.
    const onTick = (e: Event) => {
      const i = Number((e.currentTarget as HTMLElement).dataset.tick ?? 0);
      const [a, b] = STATE_RANGES[i];
      const target = st.start + (st.end - st.start) * (a + (b - a) * 0.55);
      if (window.__lenis) window.__lenis.scrollTo(target, { duration: 1.2 });
      else window.scrollTo({ top: target, behavior: "smooth" });
    };
    ticks.forEach((t) => t.addEventListener("click", onTick));
    return () => {
      ticks.forEach((t) => t.removeEventListener("click", onTick));
      st.kill();
    };
  });

  const states = content.states.slice(0, STATE_COUNT);
  const StatementTag = statementAsHeading ? "h2" : "p";

  return (
    <div
      ref={ref}
      id={id}
      className={cn("scroll-track", className)}
      style={{ ["--track" as string]: track.desktop, ["--track-mobile" as string]: track.mobile }}
      data-mechanism
      data-mode={mode}
    >
      <div className="scroll-stage bg-warm-white">
        {/* Drawing sheet: a quiet 12-column grid behind everything. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 container-content">
          <div className="sheet h-full">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className="h-full border-l border-stone/60 last:border-r" />
            ))}
          </div>
        </div>

        {/* The opening screen */}
        {opening && (
          <div data-m-opening className="z-10">
            {opening}
          </div>
        )}

        {/* The scene */}
        <div data-m-scene>
          {mode === "webgl" && near ? (
            <MechanismCanvas progress={progress} quality={quality} />
          ) : (
            <div
              data-m-drawing
              className={cn(
                "mx-auto w-[min(92vw,68rem)] transition-opacity duration-700",
                mode === "webgl" ? "opacity-0" : "opacity-100",
              )}
            >
              <SectionDrawing
                progress={mode === "svg" ? svgProgress : 1}
                labels={content.drawingLabels}
                title={content.drawingTitle}
                desc={content.drawingDesc}
              />
            </div>
          )}
        </div>

        {/* The closing statement */}
        <div data-m-statement className="z-10">
          <div className="container-content py-8 lg:py-0">
            <StatementTag className="max-w-[12ch] text-display-1 font-medium text-charcoal">{content.statement}</StatementTag>
          </div>
        </div>

        {/* Captions: one per state. As a list without motion; as overlays with it. */}
        <div data-m-captions className="z-10">
          <div className="container-content pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:pb-8 lg:pb-10">
            <div className="sheet items-end">
              <ol data-m-caption-list className="col-span-12 lg:col-span-6">
                {states.map((s, i) => (
                  <li key={s.id} data-m-caption={i} data-active={i === 0 ? "true" : "false"} className="max-w-[34rem]">
                    <span className="block font-mono text-mono text-caption">
                      {String(i).padStart(2, "0")} / {s.label}
                    </span>
                    <span className="mt-2 block text-body-l text-charcoal">{s.caption}</span>
                  </li>
                ))}
              </ol>
              <p data-m-note className="col-span-12 mt-6 font-mono text-mono text-caption lg:col-span-4 lg:col-start-9 lg:mt-0 lg:text-right">
                {content.note}
              </p>
            </div>
          </div>
        </div>

        {/* The rail: where you are in the sequence, and a way to jump. */}
        <nav data-m-rail aria-label={content.railLabel} className="absolute top-1/2 right-[max(0.75rem,calc((100vw-90rem)/2+0.5rem))] z-20 -translate-y-1/2">
          <div className="relative flex flex-col items-end gap-[0.9rem]">
            <span aria-hidden className="absolute top-0 right-[5px] bottom-0 w-px bg-stone" />
            <span aria-hidden data-rail-fill className="absolute top-0 right-[5px] bottom-0 w-px origin-top scale-y-0 bg-oxide" />
            {states.map((s, i) => (
              <button
                key={s.id}
                type="button"
                data-tick={i}
                aria-current={i === 0 ? "step" : "false"}
                className="group flex min-h-6 items-center gap-3 font-mono text-mono text-caption transition-colors aria-[current=step]:text-charcoal"
              >
                <span className="translate-x-1 opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 group-aria-[current=step]:translate-x-0 group-aria-[current=step]:opacity-100">
                  {s.label}
                </span>
                <span aria-hidden className="block h-[3px] w-[11px] bg-stone transition-colors group-aria-[current=step]:bg-oxide" />
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
