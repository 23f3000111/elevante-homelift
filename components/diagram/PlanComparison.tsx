import { useId } from "react";
import { cn } from "@/lib/cn";

interface PlanProps {
  variant: "conventional" | "elevante";
  className?: string;
}

/**
 * The same house in plan, twice. A conventional homelift needs a second
 * footprint somewhere in the room; Elevante's cabin lies within the
 * staircase's own footprint. Schematic; nothing here is to scale.
 */
export function Plan({ variant, className }: PlanProps) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const hatch = `plan-hatch-${uid}`;
  const treads = Array.from({ length: 11 }, (_, i) => 56 + i * 13.5);
  return (
    <svg
      viewBox="0 0 360 260"
      role="img"
      aria-labelledby={`t-${uid}`}
      className={cn("stair-diagram plan", className ?? "h-auto w-full")}
    >
      <title id={`t-${uid}`}>
        {variant === "conventional"
          ? "Plan of a house with a staircase and a separate lift shaft taking extra floor area."
          : "Plan of the same house where the lift cabin lies within the footprint of the staircase."}
      </title>
      <defs>
        <pattern id={hatch} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="7" stroke="var(--color-warm-grey)" strokeWidth="1" />
        </pattern>
      </defs>

      {/* room */}
      <rect x="20" y="20" width="320" height="220" fill="var(--color-white)" stroke="var(--color-charcoal-soft)" strokeWidth="2" />
      {/* staircase in plan */}
      <g stroke="var(--color-charcoal)" strokeWidth="1.5" fill="none">
        <rect x="40" y="40" width="60" height="160" />
        {treads.map((y) => (
          <line key={y} x1="40" y1={y} x2="100" y2={y} strokeWidth="1" />
        ))}
        <path d="M70 196 V52 M64 60 L70 52 L76 60" strokeWidth="1" stroke="var(--color-caption)" />
      </g>
      <text x="112" y="52">Staircase</text>

      {variant === "conventional" ? (
        <g>
          <rect x="230" y="140" width="80" height="80" fill={`url(#${hatch})`} stroke="var(--color-charcoal)" strokeWidth="1.5" />
          <text x="270" y="185" textAnchor="middle" style={{ paintOrder: "stroke", stroke: "var(--color-white)", strokeWidth: 5 }}>
            Lift
          </text>
          <text x="310" y="130" textAnchor="end">Separate position</text>
        </g>
      ) : (
        <g>
          <rect x="47" y="110" width="46" height="82" fill="var(--color-oxide)" fillOpacity="0.14" stroke="var(--color-oxide)" strokeWidth="2" strokeDasharray="4 3" />
          <text x="112" y="160" fill="var(--color-oxide)">
            Cabin, beneath
          </text>
          <text x="112" y="178" fill="var(--color-oxide)">
            the staircase
          </text>
        </g>
      )}
    </svg>
  );
}
