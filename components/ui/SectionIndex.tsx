import { cn } from "@/lib/cn";

interface SectionIndexProps {
  index: string;
  label: string;
  /** `stone` sits on light ground; `light` sits on photography. */
  tone?: "stone" | "light" | "oxide";
  size?: "small" | "large" | "huge";
  className?: string;
}

/**
 * The running number of the story. The numeral is set very large and
 * quiet, the label small and legible; screen readers get "01, The product".
 */
export function SectionIndex({
  index,
  label,
  tone = "stone",
  size = "large",
  className,
}: SectionIndexProps) {
  const colour =
    tone === "light"
      ? "text-warm-white"
      : tone === "oxide"
        ? "text-oxide"
        : "text-stone";
  const scale =
    size === "huge"
      ? "text-[clamp(6rem,16vw,15rem)]"
      : size === "small"
        ? "text-[clamp(3.5rem,6vw,5.5rem)]"
        : "text-[clamp(5rem,12vw,11rem)]";
  return (
    <div className={cn("select-none", className)}>
      <span
        aria-hidden
        className={cn(
          "block leading-[0.8] font-medium tracking-[-0.06em]",
          scale,
          colour,
        )}
      >
        {index}
      </span>
      <span
        className={cn(
          "mt-3 block font-mono text-small",
          tone === "light" ? "text-warm-white" : "text-caption",
        )}
      >
        <span className="sr-only">{index}, </span>
        {label}
      </span>
    </div>
  );
}
