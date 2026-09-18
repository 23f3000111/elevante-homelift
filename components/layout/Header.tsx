"use client";

import { AppLink } from "@/components/ui/AppLink";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { SiteContent } from "@/content/types";
import { cn } from "@/lib/cn";
import { MobileMenu } from "./MobileMenu";
import { Wordmark } from "./Wordmark";

/**
 * A fixed bar over the page. It is transparent on the opening screen and
 * gains a warm-white ground and a hairline once the page has scrolled, so
 * the boundary appears only when there is something to separate. Every
 * destination is visible on wide screens; phones get a full-screen menu.
 */
export function Header({ site }: { site: SiteContent }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The menu is a sibling of the header, not a child: the header's backdrop
  // filter would otherwise become the menu's containing block.
  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow] duration-500 ease-[var(--ease-out-quart)]",
          scrolled
            ? "bg-warm-white/92 shadow-[0_1px_0_0_var(--color-stone)] backdrop-blur-md"
            : "bg-transparent shadow-[0_1px_0_0_transparent]",
        )}
      >
        <div
          className={cn(
            "container-content flex items-center justify-between gap-6 transition-[height] duration-500 ease-[var(--ease-out-quart)]",
            scrolled ? "h-16" : "h-20",
          )}
        >
          <AppLink
            href="/"
            className="-ml-1 flex min-h-12 items-center px-1"
            aria-label={`${site.name}, home`}
          >
            <Wordmark compact />
          </AppLink>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-7 xl:gap-9">
              {site.nav.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <AppLink
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative inline-flex min-h-12 items-center text-[1.0625rem] font-medium whitespace-nowrap text-charcoal",
                        "after:absolute after:inset-x-0 after:bottom-2 after:h-px after:origin-left after:scale-x-0 after:bg-charcoal after:transition-transform after:duration-400 after:ease-[var(--ease-out-quart)]",
                        "hover:after:scale-x-100 focus-visible:after:scale-x-100",
                        active && "after:scale-x-100 after:bg-oxide",
                      )}
                    >
                      {item.label}
                    </AppLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <AppLink
              href={site.dealerCta.href}
              className="button min-h-12 px-5 text-small"
            >
              {site.dealerCta.label}
            </AppLink>
            <button
              type="button"
              className="inline-flex min-h-12 min-w-12 items-center justify-center gap-2 rounded-[var(--radius-button)] px-2 text-small font-medium text-charcoal lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
            >
              <span className="sr-only sm:not-sr-only">{site.menu.open}</span>
              <span aria-hidden className="flex w-6 flex-col gap-[6px]">
                <span className="h-px w-6 bg-charcoal" />
                <span className="h-px w-6 bg-charcoal" />
              </span>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} site={site} />
    </>
  );
}
