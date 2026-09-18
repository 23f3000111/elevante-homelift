import { useId } from "react";
import type { CabinPlanLabels, Occupant } from "@/content/types";
import { cn } from "@/lib/cn";
import { CABIN } from "@/lib/scene/geometry";

export type { CabinPlanLabels };

interface CabinPlanProps {
  occupant: Occupant;
  door: "open" | "closed";
  focus?: "door" | "opening" | "cabin";
  labels?: CabinPlanLabels;
  title: string;
  desc: string;
  className?: string;
}

const S = 200;
const M = 0.4;
const W = (CABIN.width + M * 2) * S;
const H = (CABIN.depth + M * 2) * S;
const cx = (x: number) => (x + M) * S;
const cy = (z: number) => (z + M) * S;

/** A person seen from above: head and shoulders, as on an architect's plan. */
function Person({ x, y, tone = "var(--color-charcoal)" }: { x: number; y: number; tone?: string }) {
  return (
    <g transform={`translate(${x} ${y})`} fill="none" stroke={tone} strokeWidth="2">
      <ellipse rx="32" ry="13" fill="var(--color-white)" />
      <circle r="11" cy="-3" fill="var(--color-white)" />
    </g>
  );
}

function Rollator({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} fill="none" stroke="var(--color-charcoal)" strokeWidth="2">
      <path d="M-30 0 v42 M30 0 v42 M-30 42 h60" />
      <path d="M-30 0 h60" strokeWidth="3" />
      <circle cx="-30" cy="0" r="4" fill="var(--color-white)" />
      <circle cx="30" cy="0" r="4" fill="var(--color-white)" />
      <circle cx="-30" cy="42" r="4" fill="var(--color-white)" />
      <circle cx="30" cy="42" r="4" fill="var(--color-white)" />
    </g>
  );
}

function Wheelchair({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} fill="none" stroke="var(--color-charcoal)" strokeWidth="2">
      {/* seat */}
      <rect x="-30" y="-6" width="60" height="44" rx="4" fill="var(--color-white)" />
      {/* large wheels either side */}
      <rect x="-44" y="-10" width="9" height="56" rx="4" fill="var(--color-white)" />
      <rect x="35" y="-10" width="9" height="56" rx="4" fill="var(--color-white)" />
      {/* footrests */}
      <path d="M-20 38 v14 h12 M20 38 v14 h-12" />
    </g>
  );
}

/**
 * The cabin from above with its door on the hall side and the occupant for
 * the situation being described. The symbols are the ones an architect
 * draws: no photograph of a stranger stands in for the visitor.
 */
export function CabinPlan({ occupant, door, focus, labels, title, desc, className }: CabinPlanProps) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const doorY = cy(CABIN.depth);
  const doorHalf = 0.42 * S;
  const mid = cx(CABIN.width / 2);
  const slide = door === "open" ? 0.36 * S : 0;
  const doorTone = focus === "door" ? "var(--color-oxide)" : "var(--color-charcoal)";
  const cabinTone = focus === "cabin" || focus === "opening" ? "var(--color-oxide)" : "var(--color-charcoal)";
  const centreX = cx(CABIN.width / 2);
  const centreY = cy(CABIN.depth / 2);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-labelledby={`t-${uid} d-${uid}`}
      className={cn("drawing h-auto w-full", className)}
      data-drawing="cabin-plan"
      data-occupant={occupant}
      data-door={door}
    >
      <title id={`t-${uid}`}>{title}</title>
      <desc id={`d-${uid}`}>{desc}</desc>

      {/* Cabin outline */}
      <rect x={cx(0)} y={cy(0)} width={CABIN.width * S} height={CABIN.depth * S} fill="var(--color-white)" stroke={cabinTone} strokeWidth="3" />
      <rect x={cx(0) + 10} y={cy(0) + 10} width={CABIN.width * S - 20} height={CABIN.depth * S - 20} fill="none" stroke={cabinTone} strokeWidth="1" strokeOpacity="0.45" />

      {/* Door opening: the wall is cut, the leaves part */}
      <line x1={mid - doorHalf} y1={doorY} x2={mid + doorHalf} y2={doorY} stroke="var(--color-white)" strokeWidth="6" />
      <g data-part="door">
        <line x1={mid - doorHalf - slide} y1={doorY} x2={mid - slide} y2={doorY} stroke={doorTone} strokeWidth="5" />
        <line x1={mid + slide} y1={doorY} x2={mid + doorHalf + slide} y2={doorY} stroke={doorTone} strokeWidth="5" />
        {door === "open" && (
          <path d={`M${mid - doorHalf + 8} ${doorY + 40} L${mid} ${doorY + 22} L${mid + doorHalf - 8} ${doorY + 40}`} fill="none" stroke={doorTone} strokeWidth="1" strokeDasharray="3 4" />
        )}
      </g>

      {/* Occupants */}
      {occupant === "person" && <Person x={centreX} y={centreY + 4} />}
      {occupant === "rollator" && (
        <>
          <Person x={centreX} y={centreY - 34} />
          <Rollator x={centreX} y={centreY + 6} />
        </>
      )}
      {occupant === "wheelchair" && (
        <>
          <Wheelchair x={centreX} y={centreY - 14} />
          <Person x={centreX} y={centreY - 30} />
        </>
      )}
      {occupant === "two-people" && (
        <>
          <Person x={centreX - 60} y={centreY + 4} />
          <Person x={centreX + 60} y={centreY + 4} tone="var(--color-charcoal-soft)" />
        </>
      )}

      {labels && (
        <g data-annotation>
          <text x={cx(0)} y={cy(0) - 12}>
            {labels.cabin}
          </text>
          <text x={mid} y={doorY + 62} textAnchor="middle" fill={doorTone}>
            {labels.door}
          </text>
        </g>
      )}
    </svg>
  );
}
