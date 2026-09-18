import { useId } from "react";
import { cn } from "@/lib/cn";
import {
  CABIN,
  CABIN_X_MAX,
  DOORS,
  DRAWING,
  DRAWING_HEIGHT,
  DRAWING_WIDTH,
  HOUSE,
  RISE,
  SLAB,
  STAIR,
  STAIR_TOP_X,
  STOREY,
  sx,
  sy,
  tread,
  voidPolygon,
} from "@/lib/scene/geometry";
import { poseAt, type Pose } from "@/lib/scene/pose";

import type { DrawingLabels } from "@/content/types";

export type SectionDrawingLabels = DrawingLabels;

interface SectionDrawingProps {
  /** 0..1 through the mechanism story; the drawing shows that pose statically. */
  progress?: number;
  labels?: SectionDrawingLabels;
  className?: string;
  title: string;
  desc: string;
  /** Emphasise one part in oxide. */
  highlight?: "cabin" | "void" | "door-lower" | "door-upper" | "stair";
}

const STAIRWELL_X0 = STAIR.x0 + 2.6 * STAIR.run;

/**
 * The house in section, drawn from the same geometry as the 3D scene. It is
 * server-rendered at a given pose, and every moving part carries a
 * `data-part` so a parent can drive it with GSAP: `cabin` translates in y by
 * `-travel * STOREY * DRAWING.scale`, `door-lower-l` / `door-lower-r` slide
 * in x, `door-upper` has pathLength 1 and opens with strokeDashoffset, the
 * `tread` children reveal in order, `void` fades.
 */
export function SectionDrawing({
  progress = 1,
  labels,
  className,
  title,
  desc,
  highlight,
}: SectionDrawingProps) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const pose: Pose = poseAt(progress);
  const hatch = `hatch-${uid}`;
  const titleId = `t-${uid}`;
  const descId = `d-${uid}`;
  const S = DRAWING.scale;
  const hi = (part: NonNullable<SectionDrawingProps["highlight"]>) => highlight === part;

  const cabinY = -pose.travel * STOREY * S;
  const leafSlide = 0.4 * S * pose.lowerDoor;
  const leafW = 0.45 * S;
  const leafX0 = sx(CABIN.xMin + CABIN.width / 2 - 0.45);
  const voidPts = voidPolygon()
    .map(([x, y]) => `${sx(x)},${sy(y)}`)
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${DRAWING_WIDTH} ${DRAWING_HEIGHT}`}
      role="img"
      aria-labelledby={`${titleId} ${descId}`}
      className={cn("drawing h-auto w-full", className)}
      data-drawing="section"
    >
      <title id={titleId}>{title}</title>
      <desc id={descId}>{desc}</desc>
      <defs>
        <pattern id={hatch} width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="9" stroke="var(--color-warm-grey)" strokeWidth="1" />
        </pattern>
      </defs>

      {/* Space beneath the staircase */}
      <polygon
        data-part="void"
        points={voidPts}
        fill={hi("void") ? "var(--color-oxide)" : `url(#${hatch})`}
        fillOpacity={hi("void") ? 0.16 : 1}
        style={{ opacity: Math.max(pose.voidTint, hi("void") ? 1 : 0.55) }}
      />

      {/* House */}
      <g data-part="house" fill="none" stroke="var(--color-charcoal)" strokeWidth="1.75" strokeLinecap="square">
        {/* ground slab */}
        <rect x={sx(HOUSE.xMin)} y={sy(0)} width={(HOUSE.xMax - HOUSE.xMin) * S} height={SLAB * S} fill="var(--color-stone)" />
        {/* left wall and back-wall top line */}
        <path d={`M${sx(HOUSE.xMin)} ${sy(0)} V${sy(STOREY + DRAWING.upperRoom)} H${sx(HOUSE.xMax)}`} stroke="var(--color-warm-grey)" />
        {/* upper floor, left of the stairwell */}
        <rect x={sx(HOUSE.xMin)} y={sy(STOREY)} width={(STAIRWELL_X0 - HOUSE.xMin) * S} height={SLAB * S} fill="var(--color-stone)" />
        {/* upper floor, right of the cabin */}
        <rect x={sx(CABIN_X_MAX)} y={sy(STOREY)} width={(HOUSE.xMax - CABIN_X_MAX) * S} height={SLAB * S} fill="var(--color-stone)" />
        {/* the floor continues behind the stairwell, drawn light */}
        <line x1={sx(STAIRWELL_X0)} y1={sy(STOREY)} x2={sx(CABIN_X_MAX)} y2={sy(STOREY)} stroke="var(--color-stone)" strokeWidth="1" strokeDasharray="4 6" />
      </g>

      {/* Staircase */}
      <g data-part="stair" fill="var(--color-charcoal-soft)" stroke="none">
        {Array.from({ length: STAIR.risers }, (_, i) => {
          const t = tread(i);
          const shown = pose.stair * STAIR.risers > i;
          return (
            <rect
              key={i}
              data-part="tread"
              x={sx(t.x)}
              y={sy(t.y)}
              width={(t.run + 0.03) * S}
              height={0.05 * S}
              fill={hi("stair") ? "var(--color-oxide)" : "var(--color-charcoal-soft)"}
              style={{ opacity: shown ? 1 : 0 }}
            />
          );
        })}
        {/* soffit */}
        <line
          data-part="soffit"
          x1={sx(STAIR.x0 + STAIR.run)}
          y1={sy(0)}
          x2={sx(STAIR_TOP_X)}
          y2={sy(STOREY - RISE - 0.05)}
          stroke={hi("stair") ? "var(--color-oxide)" : "var(--color-charcoal-soft)"}
          strokeWidth="1.5"
          style={{ opacity: pose.stair > 0.9 ? 1 : 0 }}
        />
      </g>

      {/* Travel line */}
      <line
        data-part="path"
        x1={sx(CABIN.xMin + CABIN.width / 2)}
        y1={sy(STOREY + DRAWING.upperRoom - 0.3)}
        x2={sx(CABIN.xMin + CABIN.width / 2)}
        y2={sy(0)}
        stroke="var(--color-warm-grey)"
        strokeWidth="1"
        strokeDasharray="3 7"
        style={{ opacity: pose.cabin }}
      />

      {/* Upper automatic door over the stair opening */}
      <line
        data-part="door-upper"
        x1={sx(STAIR_TOP_X)}
        y1={sy(STOREY) + 2}
        x2={sx(CABIN_X_MAX)}
        y2={sy(STOREY) + 2}
        pathLength={1}
        strokeDasharray="1"
        strokeDashoffset={pose.upperDoor}
        stroke={hi("door-upper") ? "var(--color-oxide)" : "var(--color-charcoal)"}
        strokeWidth={5}
        style={{ opacity: pose.cabin }}
      />

      {/* Cabin */}
      <g data-part="cabin" transform={`translate(0 ${cabinY})`} style={{ opacity: pose.cabin }}>
        <rect
          x={sx(CABIN.xMin)}
          y={sy(CABIN.height)}
          width={CABIN.width * S}
          height={CABIN.height * S}
          fill="var(--color-oxide)"
          fillOpacity={hi("cabin") ? 0.16 : 0.08}
          stroke="var(--color-oxide)"
          strokeWidth="2.25"
        />
        <rect
          x={sx(CABIN.xMin) + 8}
          y={sy(CABIN.height) + 8}
          width={CABIN.width * S - 16}
          height={CABIN.height * S - 16}
          fill="none"
          stroke="var(--color-oxide)"
          strokeWidth="1"
          strokeOpacity="0.5"
        />
        {labels && (
          <text x={sx(CABIN.xMin + CABIN.width / 2)} y={sy(CABIN.height) - 10} textAnchor="middle" fill="var(--color-oxide)" data-annotation>
            {labels.cabin}
          </text>
        )}
      </g>

      {/* The lower landing door, fixed to the house: two leaves that part sideways */}
        <g data-part="door-lower">
          <rect
            data-part="door-lower-l"
            x={leafX0}
            y={sy(DOORS.lowerHeight)}
            width={leafW}
            height={(DOORS.lowerHeight - 0.07) * S}
            fill="var(--color-warm-white)"
            stroke={hi("door-lower") ? "var(--color-oxide)" : "var(--color-charcoal)"}
            strokeWidth="2"
            transform={`translate(${-leafSlide} 0)`}
          />
          <rect
            data-part="door-lower-r"
            x={leafX0 + leafW}
            y={sy(DOORS.lowerHeight)}
            width={leafW}
            height={(DOORS.lowerHeight - 0.07) * S}
            fill="var(--color-warm-white)"
            stroke={hi("door-lower") ? "var(--color-oxide)" : "var(--color-charcoal)"}
            strokeWidth="2"
            transform={`translate(${leafSlide} 0)`}
          />
        </g>

      {labels && (
        <g data-part="labels" data-annotation style={{ paintOrder: "stroke", stroke: "var(--color-warm-white)", strokeWidth: 5, strokeLinejoin: "round" }}>
          <text x={sx(HOUSE.xMin) + 12} y={sy(STOREY) - 10}>
            {labels.upperFloor}
          </text>
          <text x={sx(HOUSE.xMin) + 12} y={sy(0) - 10}>
            {labels.lowerFloor}
          </text>
          <text x={sx(STAIR.x0 + 5.5 * STAIR.run)} y={sy(6 * RISE) - 26} textAnchor="middle">
            {labels.staircase}
          </text>
          <text x={sx(STAIR.x0 + 8.4 * STAIR.run)} y={sy(0) - 34} textAnchor="middle">
            {labels.space}
          </text>
          <text x={sx(CABIN.xMin + CABIN.width / 2)} y={sy(STOREY) - 14} textAnchor="middle">
            {labels.door}
          </text>
          <text x={sx(CABIN_X_MAX) + 10} y={sy(1.05)} textAnchor="start">
            {labels.door}
          </text>
        </g>
      )}
    </svg>
  );
}

export { STOREY, DRAWING };
