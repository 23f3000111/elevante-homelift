import { cn } from "@/lib/cn";

interface WordmarkProps {
  className?: string;
  /** Drop the descriptor on the narrowest screens so the header row fits. */
  compact?: boolean;
  /** On charcoal ground. */
  light?: boolean;
}

/**
 * The brand as type until the client supplies a logo file. Replace this
 * component with an SVG when it arrives; nothing else references it.
 */
export function Wordmark({ className, compact, light }: WordmarkProps) {
  return (
    <span className={cn("inline-flex items-baseline gap-2.5 whitespace-nowrap", className)}>
      <span className={cn("text-[1.375rem] font-semibold tracking-[-0.03em]", light ? "text-warm-white" : "text-charcoal")}>Elevante</span>
      <span className={cn("font-mono text-mono", light ? "text-warm-white/60" : "text-caption", compact && "hidden sm:inline")}>Homelift</span>
    </span>
  );
}
