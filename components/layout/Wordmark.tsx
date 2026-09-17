import { cn } from "@/lib/cn";

interface WordmarkProps {
  className?: string;
  /** Drop the descriptor on the narrowest screens so the header row fits. */
  compact?: boolean;
}

/**
 * The brand as type until the client supplies a logo file. Replace this
 * component with an SVG when it arrives; nothing else references it.
 */
export function Wordmark({ className, compact }: WordmarkProps) {
  return (
    <span className={cn("inline-flex items-baseline gap-2 whitespace-nowrap", className)}>
      <span className="text-[1.375rem] font-semibold tracking-[-0.02em] text-charcoal">Elevante</span>
      <span className={cn("text-small text-caption", compact && "hidden sm:inline")}>Homelift</span>
    </span>
  );
}
