import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "warm-white" | "white" | "stone";

interface SectionProps {
  id?: string;
  tone?: Tone;
  /** Vertical rhythm: `section` is the standard interval, `flush` for pinned scenes. */
  space?: "section" | "small" | "flush";
  className?: string;
  labelledBy?: string;
  children: ReactNode;
}

const tones: Record<Tone, string> = {
  "warm-white": "bg-warm-white",
  white: "bg-white",
  stone: "bg-stone",
};

const spaces = {
  section: "py-section",
  small: "py-section-sm",
  flush: "",
};

export function Section({
  id,
  tone = "warm-white",
  space = "section",
  className,
  labelledBy,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("relative", tones[tone], spaces[space], className)}
    >
      {children}
    </section>
  );
}

export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={cn("container-content", className)}>{children}</div>;
}
