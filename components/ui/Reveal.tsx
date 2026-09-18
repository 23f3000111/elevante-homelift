"use client";

import { useRef, type HTMLAttributes, type ReactNode } from "react";
import { revealWithin, useMotion } from "@/lib/motion/useMotion";

interface RevealProps extends HTMLAttributes<HTMLElement> {
  as?: "div" | "section" | "article";
  children: ReactNode;
}

/**
 * A scope for the generic entrance. Mark descendants with `data-reveal`,
 * `data-reveal-lines` or `data-reveal-clip`; this component animates them
 * once as they enter the viewport. Children stay server-rendered.
 */
export function Reveal({ as = "div", children, ...rest }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  useMotion(ref, ({ scope }) => revealWithin(scope));
  if (as === "section") {
    return (
      <section ref={ref} {...rest}>
        {children}
      </section>
    );
  }
  if (as === "article") {
    return (
      <article ref={ref} {...rest}>
        {children}
      </article>
    );
  }
  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  );
}
