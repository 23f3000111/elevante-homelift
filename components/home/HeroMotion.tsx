"use client";

import { useRef, type ReactNode } from "react";
import { useMotion } from "@/lib/motion/useMotion";

/**
 * The one page-load sequence on the site: the headline rises word by word
 * while the house is uncovered from the top down and settles into place.
 * Runs once on mount; under reduced motion nothing here executes and the
 * CSS hidden states never apply.
 */
export function HeroMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useMotion(ref, ({ gsap, scope }) => {
    const words = scope.querySelectorAll("[data-hero-word]");
    const fades = scope.querySelectorAll("[data-hero-fade]");
    const media = scope.querySelector("[data-hero-media]");
    const img = media?.querySelector("img");

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.to(words, { y: 0, duration: 1.1, stagger: 0.045 }, 0.1)
      .to(fades, { autoAlpha: 1, duration: 0.9, stagger: 0.12 }, 0.7);
    if (media) tl.to(media, { clipPath: "inset(0 0 0% 0)", duration: 1.5 }, 0.25);
    if (img) tl.to(img, { scale: 1, duration: 2, ease: "power2.out" }, 0.25);
  });

  return <div ref={ref}>{children}</div>;
}
