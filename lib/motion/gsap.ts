"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * One registration point for GSAP. Every animation in the site runs inside
 * `gsap.matchMedia()` under MOTION_OK, so a visitor who prefers reduced
 * motion gets the page exactly as the server rendered it.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: "power3.out", duration: 1 });
}

export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const REDUCE = "(prefers-reduced-motion: reduce)";
export const DESKTOP = "(min-width: 64rem)";

export { gsap, ScrollTrigger };
