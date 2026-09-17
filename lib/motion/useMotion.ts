"use client";

import { useLayoutEffect, type RefObject } from "react";
import { gsap, MOTION_OK, ScrollTrigger } from "./gsap";

export interface MotionContext {
  gsap: typeof gsap;
  ScrollTrigger: typeof ScrollTrigger;
  scope: HTMLElement;
  /** True when the viewport matches the given media query (for layout-specific timelines). */
  matches: (query: string) => boolean;
}

/**
 * Runs `setup` inside a GSAP context scoped to `scope`, only when the visitor
 * allows motion. Everything created in `setup` is reverted on unmount, so
 * sections can animate freely without leaking ScrollTriggers.
 */
export function useMotion(
  scope: RefObject<HTMLElement | null>,
  setup: (ctx: MotionContext) => void | (() => void),
  deps: ReadonlyArray<unknown> = [],
) {
  useLayoutEffect(() => {
    const el = scope.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      let cleanup: void | (() => void);
      const ctx = gsap.context(() => {
        cleanup = setup({
          gsap,
          ScrollTrigger,
          scope: el,
          matches: (q) => window.matchMedia(q).matches,
        });
      }, el);
      return () => {
        cleanup?.();
        ctx.revert();
      };
    });
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * The site's one generic entrance: elements marked `data-reveal` fade and
 * rise once as they enter; `data-reveal-lines` staggers its children;
 * `data-reveal-clip` wipes upward. The CSS in globals.css holds the hidden
 * state only when JS runs and motion is allowed.
 */
export function revealWithin(scope: HTMLElement) {
  const singles = scope.querySelectorAll<HTMLElement>("[data-reveal]");
  singles.forEach((el) => {
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 24 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1.1,
        ease: "power3.out",
        delay: Number(el.dataset.reveal) || 0,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      },
    );
  });

  scope.querySelectorAll<HTMLElement>("[data-reveal-lines]").forEach((group) => {
    gsap.fromTo(
      Array.from(group.children),
      { autoAlpha: 0, y: 24 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.09,
        scrollTrigger: { trigger: group, start: "top 88%", once: true },
      },
    );
  });

  scope.querySelectorAll<HTMLElement>("[data-reveal-clip]").forEach((el) => {
    gsap.fromTo(
      el,
      { clipPath: "inset(0 0 100% 0)" },
      {
        clipPath: "inset(0 0 0% 0)",
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      },
    );
  });
}
