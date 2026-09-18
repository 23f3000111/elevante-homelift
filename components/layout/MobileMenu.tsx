"use client";

import { AppLink } from "@/components/ui/AppLink";
import { Picture } from "@/components/ui/Picture";
import { useEffect, useRef } from "react";
import type { SiteContent } from "@/content/types";
import { cn } from "@/lib/cn";
import { Wordmark } from "./Wordmark";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  site: SiteContent;
}

/**
 * Full-screen menu for phones and tablets: the destinations in large type,
 * each with one line saying what is there, and a picture below. A visible
 * close control, Escape to close, focus kept inside while open.
 */
export function MobileMenu({ open, onClose, site }: MobileMenuProps) {
  const panel = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusTimer = window.setTimeout(() => closeButton.current?.focus(), 80);
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panel.current) {
        const focusables = panel.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
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
      window.__lenis?.start();
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  return (
    <div
      id="mobile-menu"
      ref={panel}
      role="dialog"
      aria-modal="true"
      aria-label={site.menu.label}
      data-lenis-prevent
      className={cn(
        "fixed inset-0 z-50 flex flex-col overflow-y-auto bg-warm-white transition-[opacity,visibility] duration-400 ease-[var(--ease-out-quart)] lg:hidden",
        open ? "visible opacity-100" : "invisible opacity-0",
      )}
    >
      <div className="container-content flex h-20 shrink-0 items-center justify-between">
        <Wordmark />
        <button
          ref={closeButton}
          type="button"
          onClick={onClose}
          className="-mr-2 inline-flex min-h-12 items-center gap-3 rounded-[var(--radius-button)] px-2 text-small font-medium text-charcoal"
        >
          {site.menu.close}
          <span aria-hidden className="relative block h-6 w-6">
            <span className="absolute top-1/2 left-0 h-px w-6 -translate-y-1/2 rotate-45 bg-charcoal" />
            <span className="absolute top-1/2 left-0 h-px w-6 -translate-y-1/2 -rotate-45 bg-charcoal" />
          </span>
        </button>
      </div>

      <nav aria-label="Primary, mobile" className="container-content mt-2 flex-1">
        <ul className="border-t border-stone">
          {site.nav.map((item, i) => (
            <li
              key={item.href}
              className={cn(
                "border-b border-stone transition-[opacity,transform] duration-600 ease-[var(--ease-out-expo)]",
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
              )}
              style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}
            >
              <AppLink href={item.href} onClick={onClose} className="flex min-h-[4.5rem] flex-col justify-center py-3">
                <span className="text-[clamp(1.75rem,6.5vw,2.5rem)] leading-none font-medium tracking-[-0.03em] text-charcoal">{item.label}</span>
                {item.hint && <span className="mt-1.5 text-small text-caption">{item.hint}</span>}
              </AppLink>
            </li>
          ))}
        </ul>

        <div
          className={cn(
            "mt-8 transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)]",
            open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          )}
          style={{ transitionDelay: open ? "380ms" : "0ms" }}
        >
          <AppLink href={site.dealerCta.href} onClick={onClose} className="button w-full">
            {site.dealerCta.label}
          </AppLink>
          <div className="mt-8">
            <Picture asset={site.menu.media} sizes="100vw" />
            <p className="mt-2 font-mono text-mono text-caption">{site.menu.mediaCaption}</p>
          </div>
          <p className="mt-6 mb-10 text-small text-caption">{site.footer.regionNote}</p>
        </div>
      </nav>
    </div>
  );
}
