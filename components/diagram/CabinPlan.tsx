import { useId } from "react";
import type { Figure } from "@/content/types";
import { cn } from "@/lib/cn";

type Occupant = Extract<Figure, "wheelchair" | "rollator" | "two-people"> | "person";

interface CabinPlanProps {
  occupant: Occupant;
  className?: string;
}

const DESC: Record<Occupant, string> = {
  person: "Plan of the cabin with one person standing inside.",
  rollator: "Plan of the cabin with a person and a rollator inside.",
  wheelchair: "Plan of the cabin with a person in a wheelchair inside.",
  "two-people": "Plan of the cabin with two people standing side by side.",
};

/** A person seen from above: head and shoulders. */
function Person({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <ellipse cx={x} cy={y + 4} rx="34" ry="13" fill="var(--color-warm-grey)" />
      <circle cx={x} cy={y - 6} r="13" fill="var(--color-charcoal-soft)" />
    </g>
  );
}

/**
 * The cabin in plan, schematic, with the everyday situations the brief lists.
 * No dimension is implied; the outline is a proportion, not a size.
 */
export function CabinPlan({ occupant, className }: CabinPlanProps) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  return (
    <svg viewBox="0 0 320 340" role="img" aria-labelledby={`t-${uid}`} className={cn("stair-diagram plan", className ?? "h-auto w-full")}>
      <title id={`t-${uid}`}>{DESC[occupant]}</title>
      {/* cabin outline */}
      <rect x="60" y="30" width="200" height="280" fill="var(--color-white)" stroke="var(--color-charcoal-soft)" strokeWidth="1.5" />
      <rect x="70" y="40" width="180" height="260" fill="none" stroke="var(--color-stone)" strokeWidth="1" />
      {/* automatic door on the entrance side */}
      <line x1="110" y1="310" x2="210" y2="310" stroke="var(--color-oxide)" strokeWidth="5" />
      <text x="160" y="332" textAnchor="middle">Door</text>

      {occupant === "person" && <Person x={160} y={175} />}

      {occupant === "two-people" && (
        <>
          <Person x={116} y={175} />
          <Person x={204} y={175} />
        </>
      )}

      {occupant === "rollator" && (
        <>
          <Person x={160} y={150} />
          <g fill="none" stroke="var(--color-charcoal-soft)" strokeWidth="2">
            <rect x="118" y="196" width="84" height="56" rx="6" />
            <line x1="118" y1="196" x2="202" y2="196" strokeWidth="4" />
            {[
              [124, 202],
              [196, 202],
              [124, 246],
              [196, 246],
            ].map(([cx, cy]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="5" fill="var(--color-warm-white)" />
            ))}
          </g>
        </>
      )}

      {occupant === "wheelchair" && (
        <>
          <g fill="none" stroke="var(--color-charcoal-soft)" strokeWidth="2">
            <rect x="112" y="118" width="96" height="120" rx="8" />
            <rect x="100" y="140" width="10" height="90" rx="5" fill="var(--color-warm-white)" />
            <rect x="210" y="140" width="10" height="90" rx="5" fill="var(--color-warm-white)" />
            <line x1="112" y1="118" x2="208" y2="118" strokeWidth="5" />
          </g>
          <Person x={160} y={168} />
        </>
      )}
    </svg>
  );
}
