"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { revealWithin, useMotion } from "@/lib/motion/useMotion";

interface RevealProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/**
 * A scope for the generic entrance. Mark descendants with `data-reveal`,
 * `data-reveal-lines` or `data-reveal-clip`; this component animates them
 * once as they enter the viewport. Children stay server-rendered.
 */
export function Reveal({ as: Tag = "div", className, children }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  useMotion(ref, ({ scope }) => revealWithin(scope));
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
