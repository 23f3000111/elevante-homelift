import { AppLink } from "@/components/ui/AppLink";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "quiet";

interface ButtonProps {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

const base =
  "inline-flex min-h-14 items-center justify-center gap-3 rounded-[var(--radius-button)] px-7 text-body font-medium leading-none transition-[background-color,color,border-color,transform] duration-300 ease-[var(--ease-out-quart)] active:translate-y-px";

const variants: Record<Variant, string> = {
  primary: "bg-charcoal text-warm-white hover:bg-charcoal-soft",
  secondary:
    "border border-charcoal/30 bg-transparent text-charcoal hover:border-charcoal hover:bg-white",
  quiet:
    "min-h-12 px-0 text-charcoal underline decoration-stone decoration-2 underline-offset-8 hover:decoration-charcoal",
};

/**
 * Every call to action is a real link. Buttons are 56px tall with 18px text so
 * they stay obvious on a phone and for older visitors.
 */
export function Button({
  href,
  variant = "primary",
  className,
  children,
}: ButtonProps) {
  return (
    <AppLink href={href} className={cn(base, variants[variant], className)}>
      {children}
    </AppLink>
  );
}
