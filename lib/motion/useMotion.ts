"use client";

import { useEffect, useLayoutEffect, type RefObject } from "react";
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
type Setup = (ctx: MotionContext) => void | (() => void);

function start(el: HTMLElement, setup: Setup) {
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
}

export function useMotion(
  scope: RefObject<HTMLElement | null>,
  setup: Setup,
  deps: ReadonlyArray<unknown> = [],
) {
  useLayoutEffect(() => {
    const el = scope.current;
    if (!el) return;
    return start(el, setup);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * The same, but after paint. Use it when `scope` belongs to an ancestor:
 * a child's layout effect runs before the parent's ref is attached, a
 * passive effect runs after.
 */
export function useMotionEffect(
  scope: RefObject<HTMLElement | null>,
  setup: Setup,
  deps: ReadonlyArray<unknown> = [],
) {
  useEffect(() => {
    const el = scope.current;
    if (!el) return;
    return start(el, setup);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * The site's motion vocabulary, applied by attribute so sections stay
 * declarative:
 *
 *  - `data-reveal`         fades and rises once as it enters
 *  - `data-reveal-lines`   staggers its children the same way
 *  - `data-reveal-clip`    wipes open from the top; the picture itself is never scaled or cropped
 *  - `data-mask-words`     each masked word rises into place (see MaskedText)
 *  - `data-parallax="0.2"` drifts vertically against the scroll, by the given strength
 *  - `data-parallax-x="0.2"` the same, horizontally
 *
 * The CSS in globals.css holds the hidden states only when JS runs and
 * motion is allowed, so nothing here can leave content invisible.
 */
/**
 * A reveal must never leave content hidden. If ScrollTrigger throws while the
 * page is mid-refresh (it can, when the motion preference flips), the
 * elements are simply shown.
 */
function safely(
  targets: Element | Element[] | NodeListOf<Element>,
  run: () => void,
) {
  try {
    run();
  } catch {
    gsap.set(targets, { autoAlpha: 1, y: 0, clipPath: "none" });
  }
}

export function revealWithin(scope: HTMLElement) {
  scope.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
    safely(el, () =>
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          delay: Number(el.dataset.reveal) || 0,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        },
      ),
    );
  });

  scope
    .querySelectorAll<HTMLElement>("[data-reveal-lines]")
    .forEach((group) => {
      safely(Array.from(group.children), () =>
        gsap.fromTo(
          Array.from(group.children),
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.09,
            scrollTrigger: { trigger: group, start: "top 88%", once: true },
          },
        ),
      );
    });

  scope.querySelectorAll<HTMLElement>("[data-mask-words]").forEach((group) => {
    const words = group.querySelectorAll("[data-mask-word]");
    safely(words, () =>
      gsap.to(words, {
        y: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.035,
        scrollTrigger: { trigger: group, start: "top 90%", once: true },
      }),
    );
  });

  scope.querySelectorAll<HTMLElement>("[data-reveal-clip]").forEach((el) => {
    safely(el, () =>
      gsap.fromTo(
        el,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        },
      ),
    );
  });

  scope.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
    const strength = Number(el.dataset.parallax) || 0.15;
    gsap.fromTo(
      el,
      { yPercent: -strength * 30 },
      {
        yPercent: strength * 30,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement ?? el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );
  });

  scope.querySelectorAll<HTMLElement>("[data-parallax-x]").forEach((el) => {
    const strength = Number(el.dataset.parallaxX) || 0.15;
    gsap.fromTo(
      el,
      { xPercent: -strength * 30 },
      {
        xPercent: strength * 30,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement ?? el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );
  });
}
