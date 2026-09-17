import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * A quiet line under media or a drawing. Used for provenance ("Visualisation")
 * and for the drawing's "not to scale" note, never for decoration.
 */
export function Caption({ className, children }: { className?: string; children: ReactNode }) {
  return <p className={cn("text-small text-caption", className)}>{children}</p>;
}
