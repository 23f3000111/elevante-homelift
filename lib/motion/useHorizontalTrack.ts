"use client";

import type { RefObject } from "react";
import { DESKTOP } from "./gsap";
import { useMotion } from "./useMotion";

/**
 * Turns vertical scroll into horizontal movement on wide screens. The
 * section needs `[data-stage]` (what gets pinned), `[data-track-wrap]`
 * (natively scrollable when motion is off) and `[data-track]` (the row),
 * plus an optional `[data-progress]` line. On phones, or with reduced
 * motion, nothing runs and the CSS layout stands on its own.
 */
export function useHorizontalTrack(scope: RefObject<HTMLElement | null>) {
  useMotion(scope, ({ gsap, scope: el, matches }) => {
    if (!matches(DESKTOP)) return;
    const stage = el.querySelector<HTMLElement>("[data-stage]");
    const wrap = el.querySelector<HTMLElement>("[data-track-wrap]");
    const track = el.querySelector<HTMLElement>("[data-track]");
    const progress = el.querySelector<HTMLElement>("[data-progress]");
    if (!stage || !wrap || !track) return;

    wrap.style.overflowX = "visible";
    // How far the row must move for its right edge to reach the viewport's,
    // measured without the transform so refreshes stay accurate.
    const distance = () => Math.max(0, track.offsetLeft + track.scrollWidth - window.innerWidth + 24);

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: stage,
        start: "top top",
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
    tl.to(track, { x: () => -distance() }, 0);
    if (progress) tl.fromTo(progress, { scaleX: 0 }, { scaleX: 1 }, 0);

    return () => {
      wrap.style.overflowX = "";
    };
  });
}
