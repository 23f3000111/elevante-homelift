"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Cta, NavItem } from "@/content/types";
import { cn } from "@/lib/cn";
import { MobileMenu } from "./MobileMenu";
import { Wordmark } from "./Wordmark";

interface HeaderProps {
  nav: NavItem[];
  dealerCta: Cta;
  regionNote: string;
}

/**
 * A compact bar that stays put. It sits on warm white from the start (the hero
 * is warm white too) and gains a hairline once the page has scrolled, so the
 * boundary appears only when there is something to separate.
 */
export function Header({ nav, dealerCta, regionNote }: HeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-warm-white transition-[box-shadow] duration-500",
        scrolled ? "shadow-[0_1px_0_0_var(--color-stone)]" : "shadow-[0_1px_0_0_transparent]",
      )}
    >
      <div
        className={cn(
          "container-content flex items-center justify-between gap-6 transition-[height] duration-500 ease-[var(--ease-out-quart)]",
          scrolled ? "h-16" : "h-18 lg:h-20",
        )}
      >
        <Link href="/" className="-ml-1 flex min-h-12 items-center px-1" aria-label="Elevante Homelift, home">
          <Wordmark compact />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-6 xl:gap-9">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-flex min-h-12 items-center text-small font-medium whitespace-nowrap text-charcoal xl:text-[1.0625rem]",
                      "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-oxide after:transition-transform after:duration-300 after:ease-[var(--ease-out-quart)]",
                      "hover:after:scale-x-100 focus-visible:after:scale-x-100",
                      active && "after:scale-x-100",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href={dealerCta.href}
            className="inline-flex min-h-12 items-center rounded-[var(--radius-button)] bg-charcoal px-4 text-small font-medium leading-none whitespace-nowrap text-warm-white transition-colors duration-300 hover:bg-charcoal-soft sm:px-5"
          >
            {dealerCta.label}
          </Link>
          <button
            type="button"
            className="inline-flex min-h-12 min-w-12 items-center justify-center gap-2 rounded-[var(--radius-button)] px-2 text-small font-medium text-charcoal lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            <span className="sr-only sm:not-sr-only">Menu</span>
            <span aria-hidden className="flex w-6 flex-col gap-[5px]">
              <span className="h-0.5 w-6 bg-charcoal" />
              <span className="h-0.5 w-6 bg-charcoal" />
            </span>
          </button>
        </div>
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} nav={nav} dealerCta={dealerCta} regionNote={regionNote} />
    </header>
  );
}
