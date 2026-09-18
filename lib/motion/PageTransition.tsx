"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { gsap, MOTION_OK, ScrollTrigger } from "./gsap";

const STATIC = process.env.NEXT_PUBLIC_STATIC_EXPORT === "1";

/**
 * Page transitions: a warm-white sheet with an oxide edge wipes up over the
 * page, the next page loads, the sheet leaves and the page settles in. Under
 * half a second each way, so navigation never feels slow. Links stay real
 * links; with reduced motion nothing here runs and the browser navigates.
 */
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const veil = useRef<HTMLDivElement>(null);
  const covering = useRef(false);

  // Reveal the page on arrival: after a full load, and after each route change.
  useEffect(() => {
    if (!window.matchMedia(MOTION_OK).matches) return;
    const main = document.querySelector<HTMLElement>("[data-transition-in]");
    const sheet = veil.current;
    if (!main) return;
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
    // Only opacity is animated on <main>: a transform left on it would turn
    // every pinned (position: fixed) stage inside into an absolute one.
    const tl = gsap.timeline({
      onComplete: () => {
        covering.current = false;
        ScrollTrigger.refresh();
      },
    });
    if (covering.current && sheet) {
      tl.to(sheet, { yPercent: -101, duration: 0.55, ease: "expo.inOut" }, 0);
      tl.set(sheet, { yPercent: 101 });
      tl.fromTo(main, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.7, ease: "power3.out" }, 0.25);
    } else {
      tl.fromTo(main, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, ease: "power2.out" }, 0);
    }
    // Never leave a page hidden.
    const guard = window.setTimeout(() => gsap.set(main, { autoAlpha: 1 }), 1500);
    return () => window.clearTimeout(guard);
  }, [pathname]);

  // Intercept internal links and wipe before leaving.
  useEffect(() => {
    if (!window.matchMedia(MOTION_OK).matches) return;
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || a.hasAttribute("download") || a.dataset.noTransition !== undefined) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      // Same page, different hash: let the anchor scroll.
      if (url.pathname === window.location.pathname && url.hash) return;
      if (url.pathname === window.location.pathname && !url.hash) return;
      const sheet = veil.current;
      if (!sheet) return;
      e.preventDefault();
      covering.current = true;
      const href = url.pathname + url.search + url.hash;
      gsap.fromTo(
        sheet,
        { yPercent: 101 },
        {
          yPercent: 0,
          duration: 0.5,
          ease: "expo.inOut",
          onComplete: () => {
            if (STATIC) window.location.assign(href);
            else router.push(href);
          },
        },
      );
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [router]);

  return <div ref={veil} className="veil" aria-hidden />;
}
