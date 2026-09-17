"use client";

import { useRef, type ReactNode } from "react";
import { DESKTOP } from "@/lib/motion/gsap";
import { revealWithin, useMotion } from "@/lib/motion/useMotion";

/**
 * The page-load sequence and the hand-over to the product story. Runs once
 * on mount; under reduced motion nothing here executes and the CSS hidden
 * states never apply.
 */
export function HeroMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useMotion(ref, ({ gsap, ScrollTrigger, scope, matches }) => {
    revealWithin(scope);
    const section = scope.querySelector("section");
    const media = scope.querySelector("[data-hero-media]");
    const zoom = scope.querySelector("[data-hero-zoom]");
    const plate = scope.querySelector("[data-hero-plate]");
    const inner = scope.querySelector("[data-hero-inner]");
    const fades = scope.querySelectorAll("[data-hero-fade]");

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    if (media) tl.to(media, { autoAlpha: 1, duration: 1.4, ease: "power2.out" }, 0);
    if (zoom) tl.to(zoom, { scale: 1, duration: 2.6, ease: "power2.out" }, 0);
    if (plate) tl.to(plate, { autoAlpha: 1, y: 0, duration: 1.3 }, 0.35);
    tl.to(fades, { autoAlpha: 1, duration: 0.9, stagger: 0.12 }, 1.0);

    // Desktop: hold the scene while the next section slides over it.
    if (section && matches(DESKTOP)) {
      ScrollTrigger.create({ trigger: section, start: "top top", end: "bottom top", pin: true, pinSpacing: false });
      const scrub = { trigger: section, start: "top top", end: "bottom top", scrub: true };
      if (inner) gsap.to(inner, { autoAlpha: 0, y: -60, ease: "none", scrollTrigger: scrub });
      if (zoom) gsap.to(zoom, { scale: 1.08, ease: "none", scrollTrigger: scrub });
    }
  });

  return <div ref={ref}>{children}</div>;
}
