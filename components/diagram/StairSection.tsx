import { useId } from "react";
import { cn } from "@/lib/cn";

/**
 * The drawing at the centre of the site: a house in section, a straight
 * flight of stairs, and the cabin in the space beneath it. It is schematic
 * and says so; no dimension on it is a product dimension.
 *
 * Parts carry `data-part` so a parent can animate them with GSAP:
 *  - `data-draw` paths have pathLength=1 and can be drawn on with strokeDashoffset 1 -> 0
 *  - `cabin` is a group translated by `y` between POSES
 *  - `door-lower` / `door-upper` are lines whose strokeDashoffset 0 (closed) -> 1 (open)
 */
export type StairState = "rest" | "enter" | "move" | "arrive";
export type StairHighlight = "cabin" | "door-lower" | "door-upper" | "void";

export const STOREY = 256;

export const POSES: Record<StairState, { cabinY: number; lowerOpen: number; upperOpen: number }> = {
  rest: { cabinY: 0, lowerOpen: 0, upperOpen: 0 },
  enter: { cabinY: 0, lowerOpen: 1, upperOpen: 0 },
  move: { cabinY: -STOREY / 2, lowerOpen: 0, upperOpen: 0 },
  arrive: { cabinY: -STOREY, lowerOpen: 0, upperOpen: 1 },
};

interface StairSectionProps {
  state?: StairState;
  highlight?: StairHighlight;
  labels?: boolean;
  className?: string;
  title?: string;
  desc?: string;
}

// Geometry (viewBox units). Lower floor at y=470, upper floor at y=214.
const LOWER = 470;
const UPPER = 214;
const SLAB = 24;
const STEPS = 12;
const RUN = 34.667;
const RISE = STOREY / STEPS;

function treadPath() {
  let d = `M120 ${LOWER}`;
  for (let i = 0; i < STEPS; i++) d += ` v${-RISE} h${RUN}`;
  return d;
}

const CABIN = { x: 540, w: 104, y: 270, h: LOWER - 270 };

export function StairSection({
  state = "rest",
  highlight,
  labels = true,
  className,
  title = "Section through a house showing the Elevante Homelift",
  desc = "A straight staircase rises from the lower floor to the upper floor. The lift cabin sits in the space beneath the staircase and travels vertically to arrive at the upper floor. Automatic doors close each opening while the cabin is elsewhere.",
}: StairSectionProps) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const hatch = `hatch-${uid}`;
  const titleId = `title-${uid}`;
  const descId = `desc-${uid}`;
  const pose = POSES[state];
  const hi = (part: StairHighlight) => highlight === part;

  return (
    <svg
      viewBox="0 0 800 500"
      role="img"
      aria-labelledby={`${titleId} ${descId}`}
      className={cn("stair-diagram", className ?? "h-auto w-full")}
      data-state={state}
    >
      <title id={titleId}>{title}</title>
      <desc id={descId}>{desc}</desc>
      <defs>
        <pattern id={hatch} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="8" stroke="var(--color-warm-grey)" strokeWidth="1" />
        </pattern>
      </defs>

      {/* The space beneath the staircase */}
      <g data-part="void">
        <path
          d={`M190 ${LOWER} L606 ${UPPER} L644 ${UPPER} L644 ${LOWER} Z`}
          fill={hi("void") ? "var(--color-oxide)" : `url(#${hatch})`}
          fillOpacity={hi("void") ? 0.14 : 1}
          stroke="none"
        />
      </g>

      {/* House: walls, ceiling, floors */}
      <g data-part="floors" fill="none" stroke="var(--color-charcoal-soft)" strokeWidth="1.5" strokeLinecap="square">
        <path data-draw d="M40 10 V470" pathLength={1} />
        <path data-draw d="M760 10 V470" pathLength={1} />
        <path data-draw d="M40 10 H760" pathLength={1} stroke="var(--color-stone)" />
        <path data-draw d={`M40 ${LOWER} H760`} pathLength={1} strokeWidth="2.5" />
        {/* upper floor slab, left and right of the stair opening */}
        <path data-draw d={`M40 ${UPPER} H200 V${UPPER + SLAB} H40`} pathLength={1} fill="var(--color-stone)" />
        <path data-draw d={`M644 ${UPPER} H760 V${UPPER + SLAB} H644 Z`} pathLength={1} fill="var(--color-stone)" />
      </g>

      {/* Travel path */}
      <line data-part="path" x1="592" y1="16" x2="592" y2={LOWER} stroke="var(--color-warm-grey)" strokeWidth="1" strokeDasharray="3 7" />

      {/* Staircase: treads and underside */}
      <g data-part="stair" fill="none" stroke="var(--color-charcoal)" strokeWidth="2" strokeLinejoin="round">
        <path data-draw d={treadPath()} pathLength={1} />
        <path data-draw d={`M190 ${LOWER} L606 ${UPPER}`} pathLength={1} strokeWidth="1.5" stroke="var(--color-charcoal-soft)" />
      </g>

      {/* Automatic doors: lower opening (vertical) and stair opening at the upper floor (horizontal) */}
      <line
        data-part="door-lower"
        x1={CABIN.x}
        y1={CABIN.y + 10}
        x2={CABIN.x}
        y2={LOWER - 10}
        pathLength={1}
        strokeDasharray="1"
        strokeDashoffset={pose.lowerOpen}
        stroke={hi("door-lower") ? "var(--color-oxide)" : "var(--color-charcoal)"}
        strokeWidth={hi("door-lower") ? 5 : 4}
        strokeLinecap="butt"
      />
      <line
        data-part="door-upper"
        x1={CABIN.x}
        y1={UPPER}
        x2={CABIN.x + CABIN.w}
        y2={UPPER}
        pathLength={1}
        strokeDasharray="1"
        strokeDashoffset={pose.upperOpen}
        stroke={hi("door-upper") ? "var(--color-oxide)" : "var(--color-charcoal)"}
        strokeWidth={hi("door-upper") ? 5 : 4}
        strokeLinecap="butt"
      />

      {/* Cabin */}
      <g data-part="cabin" transform={`translate(0 ${pose.cabinY})`}>
        <rect
          x={CABIN.x}
          y={CABIN.y}
          width={CABIN.w}
          height={CABIN.h}
          fill="var(--color-oxide)"
          fillOpacity={hi("cabin") ? 0.18 : 0.1}
          stroke="var(--color-oxide)"
          strokeWidth="2.5"
        />
        <rect x={CABIN.x + 10} y={CABIN.y + 10} width={CABIN.w - 20} height={CABIN.h - 20} fill="none" stroke="var(--color-oxide)" strokeWidth="1" strokeOpacity="0.5" />
        {labels && (
          <text x={CABIN.x + CABIN.w / 2} y={CABIN.y + CABIN.h / 2 + 5} textAnchor="middle" fill="var(--color-oxide)">
            Cabin
          </text>
        )}
      </g>

      {labels && (
        <g data-part="labels" style={{ paintOrder: "stroke", stroke: "var(--color-warm-white)", strokeWidth: 5, strokeLinejoin: "round" }}>
          <text x="52" y={UPPER - 9}>Upper floor</text>
          <text x="52" y={LOWER - 9}>Lower floor</text>
          <text x="296" y="326">Staircase</text>
          <text x="430" y="428" textAnchor="middle">
            Space beneath
          </text>
          <text x="430" y="446" textAnchor="middle">
            the staircase
          </text>
          <text x="592" y={UPPER - 10} textAnchor="middle">
            Automatic door
          </text>
          <text x={CABIN.x - 10} y="404" textAnchor="end">
            Automatic door
          </text>
        </g>
      )}
    </svg>
  );
}
