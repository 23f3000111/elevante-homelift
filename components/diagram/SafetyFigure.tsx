import { useId } from "react";
import { cn } from "@/lib/cn";
import { CABIN, DRAWING_HEIGHT, DRAWING_WIDTH, STAIR, STAIR_TOP_X, STOREY, sx, sy } from "@/lib/scene/geometry";
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
  // The marked area is what carries the meaning; it is drawn strongly while
  // the detection matters and quietly once the openings are closed.
  const marked = state !== "openings";

  return (
    <div className={cn("relative", className)} data-safety={state}>
      <SectionDrawing progress={PROGRESS[state]} labels={labels} title={title} desc={desc} highlight={state === "openings" ? "door-lower" : "cabin"} />
      <svg viewBox={`0 0 ${DRAWING_WIDTH} ${DRAWING_HEIGHT}`} aria-hidden className="drawing pointer-events-none absolute inset-0 h-full w-full">
        <polygon
          points={zone}
          fill="var(--color-oxide)"
          fillOpacity={marked ? 0.08 : 0.02}
          stroke="var(--color-oxide)"
          strokeWidth="1.5"
          strokeDasharray="6 6"
          style={{ transition: "fill-opacity 0.5s var(--ease-out-quart)" }}
        />
        <text id={`z-${uid}`} x={sx(STAIR.x0 - 0.55)} y={sy(2.1) - 10} fill="var(--color-oxide)" data-annotation>
          {zoneLabel}
        </text>
      </svg>
    </div>
  );
}
