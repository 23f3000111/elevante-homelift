"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Smooth scrolling for visitors who allow motion. Lenis drives the scroll
 * position; GSAP's ticker drives Lenis; ScrollTrigger listens to Lenis.
 * Visitors with reduced motion keep the browser's native scrolling.
 */
export function LenisProvider() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.12,
      wheelMultiplier: 1,
      anchors: { offset: -88 },
    });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Layout settles once web fonts arrive; measure again then.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return null;
}
