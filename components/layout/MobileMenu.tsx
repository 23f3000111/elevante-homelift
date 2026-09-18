"use client";

import { AppLink } from "@/components/ui/AppLink";
import { useEffect, useRef } from "react";
import type { Cta, NavItem } from "@/content/types";
import { cn } from "@/lib/cn";
import { Wordmark } from "./Wordmark";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  nav: NavItem[];
  dealerCta: Cta;
  regionNote: string;
}

/**
 * Full-screen menu for phones and tablets: one column of large targets, a
 * visible close control, Escape to close, focus kept inside while open.
 */
export function MobileMenu({
  open,
  onClose,
  nav,
  dealerCta,
  regionNote,
}: MobileMenuProps) {
  const panel = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    // The panel becomes visible on the next frame; focus once it can take it.
    const focusTimer = window.setTimeout(
      () => closeButton.current?.focus(),
      60,
    );
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panel.current) {
        const focusables = panel.current.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled])",
        );
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  return (
    <div
      id="mobile-menu"
      ref={panel}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      data-lenis-prevent
      className={cn(
        "fixed inset-0 z-50 flex flex-col overflow-y-auto bg-warm-white transition-[opacity,visibility] duration-300 ease-[var(--ease-out-quart)] lg:hidden",
        open ? "visible opacity-100" : "invisible opacity-0",
      )}
    >
      <div className="container-content flex h-18 shrink-0 items-center justify-between">
        <Wordmark />
        <button
          ref={closeButton}
          type="button"
          onClick={onClose}
          className="-mr-2 inline-flex min-h-12 items-center gap-2 rounded-[var(--radius-button)] px-2 text-small font-medium text-charcoal"
        >
          Close
          <span aria-hidden className="relative block h-6 w-6">
            <span className="absolute top-1/2 left-0 h-0.5 w-6 -translate-y-1/2 rotate-45 bg-charcoal" />
            <span className="absolute top-1/2 left-0 h-0.5 w-6 -translate-y-1/2 -rotate-45 bg-charcoal" />
          </span>
        </button>
      </div>

      <nav
        aria-label="Primary, mobile"
        className="container-content mt-4 flex-1"
      >
        <ul className="divide-y divide-stone border-y border-stone">
          {nav.map((item, i) => (
            <li
              key={item.href}
              className={cn(
                "transition-[opacity,transform] duration-500 ease-[var(--ease-out-quart)]",
                open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
              )}
              style={{ transitionDelay: open ? `${60 + i * 40}ms` : "0ms" }}
            >
              <AppLink
                href={item.href}
                onClick={onClose}
                className="flex min-h-16 items-center text-[1.75rem] font-medium tracking-[-0.02em] text-charcoal"
              >
                {item.label}
              </AppLink>
            </li>
          ))}
        </ul>
        <AppLink
          href={dealerCta.href}
          onClick={onClose}
          className="mt-8 inline-flex min-h-14 w-full items-center justify-center rounded-[var(--radius-button)] bg-charcoal px-7 text-body font-medium text-warm-white"
        >
          {dealerCta.label}
        </AppLink>
        <p className="mt-8 mb-10 text-small text-caption">{regionNote}</p>
      </nav>
    </div>
  );
}
