"use client";

import { useRef, type ReactNode } from "react";
import { useMotion } from "@/lib/motion/useMotion";
import { STATE_RANGES } from "@/lib/scene/pose";

/**
 * The one page-load sequence on the site: the headline's words rise into
 * place, then the label and the links. Also turns "See how it works" into a
 * scroll to the point in the sequence where the cabin appears.
 */
export function HeroIntro({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useMotion(ref, ({ gsap, scope }) => {
    const words = scope.querySelectorAll("[data-mask-word]");
    const fades = scope.querySelectorAll("[data-hero-fade]");
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.to(words, { y: 0, duration: 1.2, stagger: 0.045 }, 0.15);
    tl.fromTo(fades, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1 }, 0.7);

    const primary = scope.querySelector<HTMLAnchorElement>("[data-hero-primary]");
    const track = scope.closest<HTMLElement>("[data-mechanism]");
    const onClick = (e: MouseEvent) => {
      if (!track) return;
      e.preventDefault();
      const rect = track.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const range = rect.height - window.innerHeight;
      const [a, b] = STATE_RANGES[3];
      const target = top + range * (a + (b - a) * 0.6);
      if (window.__lenis) window.__lenis.scrollTo(target, { duration: 1.6 });
      else window.scrollTo({ top: target, behavior: "smooth" });
    };
    primary?.addEventListener("click", onClick);
    return () => primary?.removeEventListener("click", onClick);
  });

  return <div ref={ref}>{children}</div>;
}
