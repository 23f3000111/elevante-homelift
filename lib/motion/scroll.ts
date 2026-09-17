"use client";

/**
 * Scroll the page to an element, through Lenis when it is running so the two
 * never fight, and natively otherwise (including under reduced motion).
 */
export function scrollToElement(el: HTMLElement, offset = -96) {
  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(el, { offset, duration: 1.1 });
    return;
  }
  const top = el.getBoundingClientRect().top + window.scrollY + offset;
  const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top, behavior: smooth ? "smooth" : "auto" });
}
