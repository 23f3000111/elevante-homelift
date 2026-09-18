import { useId } from "react";
import { cn } from "@/lib/cn";
import { CABIN, DRAWING_HEIGHT, DRAWING_WIDTH, RISE, STAIR, STAIR_TOP_X, STOREY, sx, sy } from "@/lib/scene/geometry";
import { SectionDrawing, type SectionDrawingLabels } from "./SectionDrawing";

export type SafetyState = "before" | "during" | "openings";

interface SafetyFigureProps {
  state: SafetyState;
  labels: SectionDrawingLabels;
  zoneLabel: string;
  title: string;
  desc: string;
  className?: string;
}

/** Progress into the mechanism story that puts the cabin where each state needs it. */
const PROGRESS: Record<SafetyState, number> = {
  before: 0.5, // at the lower level, door open
  during: 0.68, // travelling
  openings: 1, // at the upper floor; the lower door is closed
};

/** A person in elevation: head and body, standing on a tread. */
function Figure({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} fill="none" stroke="var(--color-charcoal)" strokeWidth="2">
      <circle r="9" cy="-64" fill="var(--color-warm-white)" />
      <path d="M0 -55 v34 M0 -21 l-9 21 M0 -21 l9 21 M-12 -44 h24" strokeLinecap="round" />
    </g>
  );
}

/**
 * The section again, with the area on and around the staircase marked and a
 * person on the stairs. Three states: the lift not starting, the lift
 * stopping, and the openings closed while the cabin is elsewhere.
 */
export function SafetyFigure({ state, labels, zoneLabel, title, desc, className }: SafetyFigureProps) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const zone = [
    [STAIR.x0 - 0.7, 0],
    [STAIR.x0 - 0.7, 2.1],
    [STAIR_TOP_X - 0.2, STOREY + 0.9],
    [CABIN.xMin + CABIN.width + 0.6, STOREY + 0.9],
    [CABIN.xMin + CABIN.width + 0.6, 0],
  ]
    .map(([x, y]) => `${sx(x)},${sy(y)}`)
    .join(" ");
  const onStairs = state !== "openings";
  const treadIndex = 6;
  const fx = sx(STAIR.x0 + (treadIndex + 0.5) * STAIR.run);
  const fy = sy((treadIndex + 1) * RISE);

  return (
    <div className={cn("relative", className)} data-safety={state}>
      <SectionDrawing progress={PROGRESS[state]} labels={labels} title={title} desc={desc} highlight={state === "openings" ? "door-lower" : "cabin"} />
      <svg viewBox={`0 0 ${DRAWING_WIDTH} ${DRAWING_HEIGHT}`} aria-hidden className="drawing pointer-events-none absolute inset-0 h-full w-full">
        <polygon
          points={zone}
          fill="var(--color-oxide)"
          fillOpacity={onStairs ? 0.07 : 0.02}
          stroke="var(--color-oxide)"
          strokeWidth="1.5"
          strokeDasharray="6 6"
          style={{ transition: "fill-opacity 0.5s var(--ease-out-quart)" }}
        />
        <text id={`z-${uid}`} x={sx(STAIR.x0 - 0.55)} y={sy(2.1) - 10} fill="var(--color-oxide)" data-annotation>
          {zoneLabel}
        </text>
        {onStairs && <Figure x={fx} y={fy} />}
      </svg>
    </div>
  );
}
