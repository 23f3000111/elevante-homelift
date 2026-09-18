import { cn } from "@/lib/cn";

/** The one arrow on the site: a thin line with an open head. */
export function Arrow({ direction = "right", className }: { direction?: "right" | "down" | "left"; className?: string }) {
  const rotate = direction === "down" ? "rotate-90" : direction === "left" ? "rotate-180" : "";
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("shrink-0", rotate, className)} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
      <path d="M3 12h17M14 5l7 7-7 7" />
    </svg>
  );
}
