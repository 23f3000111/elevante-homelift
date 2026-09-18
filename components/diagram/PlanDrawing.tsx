import { useId } from "react";
import { cn } from "@/lib/cn";
import { CABIN, CABIN_X_MAX, HOUSE, STAIR, STAIR_TOP_X } from "@/lib/scene/geometry";

import type { PlanLabels } from "@/content/types";

export type PlanVariant = "staircase" | "stairlift" | "conventional" | "elevante";
export type { PlanLabels };

interface PlanDrawingProps {
  variant: PlanVariant;
  labels?: PlanLabels;
  title: string;
  desc: string;
  className?: string;
  /** Keep the cabin group in the DOM at zero opacity so a parent can fade it in. */
  cabinHidden?: boolean;
}

const S = 88;
const M = 0.45;
const W = (HOUSE.xMax - HOUSE.xMin + M * 2) * S;
const H = (HOUSE.zMax - HOUSE.zMin + M * 2) * S;
const px = (x: number) => (x - HOUSE.xMin + M) * S;
const pz = (z: number) => (z - HOUSE.zMin + M) * S;

/**
 * The hall seen from above, from the same geometry as the section. Four
 * variants: the staircase alone; with a stairlift rail on it; with a
 * conventional lift in its own position; and with the Elevante cabin at the
 * head of the flight. Only the footprint changes, which is the point.
 */
export function PlanDrawing({ variant, labels, title, desc, className, cabinHidden }: PlanDrawingProps) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const hatch = `hatch-${uid}`;
  const treads = Array.from({ length: STAIR.risers }, (_, i) => STAIR.x0 + i * STAIR.run);
  const showCabin = variant === "elevante";
  const ann = labels;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-labelledby={`t-${uid} d-${uid}`}
      className={cn("drawing drawing-small h-auto w-full", className)}
      data-drawing="plan"
      data-variant={variant}
    >
      <title id={`t-${uid}`}>{title}</title>
      <desc id={`d-${uid}`}>{desc}</desc>
      <defs>
        <pattern id={hatch} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="8" stroke="var(--color-warm-grey)" strokeWidth="1" />
        </pattern>
      </defs>

      {/* Hall */}
      <rect x={px(HOUSE.xMin)} y={pz(HOUSE.zMin)} width={(HOUSE.xMax - HOUSE.xMin) * S} height={(HOUSE.zMax - HOUSE.zMin) * S} fill="var(--color-white)" stroke="var(--color-charcoal)" strokeWidth="2.5" />
      {/* the wall the flight rises against */}
      <line x1={px(HOUSE.xMin)} y1={pz(HOUSE.zMin)} x2={px(HOUSE.xMax)} y2={pz(HOUSE.zMin)} stroke="var(--color-charcoal)" strokeWidth="6" />

      {/* Flight */}
      <g data-part="stair" stroke="var(--color-charcoal)" strokeWidth="1.5" fill="none">
        <rect x={px(STAIR.x0)} y={pz(-STAIR.halfWidth)} width={(STAIR_TOP_X - STAIR.x0) * S} height={STAIR.halfWidth * 2 * S} fill="var(--color-warm-white)" />
        {treads.map((x) => (
          <line key={x} x1={px(x)} y1={pz(-STAIR.halfWidth)} x2={px(x)} y2={pz(STAIR.halfWidth)} stroke="var(--color-charcoal-soft)" strokeWidth="1" />
        ))}
        {/* direction of climb */}
        <line x1={px(STAIR.x0 + 0.15)} y1={pz(0)} x2={px(STAIR_TOP_X - 0.25)} y2={pz(0)} stroke="var(--color-caption)" strokeWidth="1" strokeDasharray="2 4" />
        <path d={`M${px(STAIR_TOP_X - 0.45)} ${pz(-0.12)} L${px(STAIR_TOP_X - 0.25)} ${pz(0)} L${px(STAIR_TOP_X - 0.45)} ${pz(0.12)}`} stroke="var(--color-caption)" strokeWidth="1" />
      </g>

      {/* Stairlift: a rail along the flight and a seat at its foot */}
      {variant === "stairlift" && (
        <g data-part="stairlift" fill="none" stroke="var(--color-charcoal)">
          <line x1={px(STAIR.x0 - 0.5)} y1={pz(STAIR.halfWidth - 0.14)} x2={px(STAIR_TOP_X + 0.1)} y2={pz(STAIR.halfWidth - 0.14)} strokeWidth="4" />
          <rect x={px(STAIR.x0 - 0.5)} y={pz(STAIR.halfWidth - 0.5)} width={0.42 * S} height={0.42 * S} fill="var(--color-warm-white)" strokeWidth="1.5" />
          <line x1={px(STAIR.x0 - 0.5)} y1={pz(STAIR.halfWidth - 0.5)} x2={px(STAIR.x0 - 0.5)} y2={pz(STAIR.halfWidth - 0.08)} strokeWidth="3" />
          {ann && (
            <text x={px(STAIR.x0 + 1.2)} y={pz(STAIR.halfWidth + 0.34)} stroke="none" data-annotation>
              {ann.stairlift}
            </text>
          )}
        </g>
      )}

      {/* Conventional lift: its own position, and the floor space that goes with it */}
      {variant === "conventional" && (
        <g data-part="separate" stroke="var(--color-charcoal)" strokeWidth="1.5">
          <rect x={px(1.55)} y={pz(-0.05)} width={1.5 * S} height={1.35 * S} fill={`url(#${hatch})`} />
          <rect x={px(1.55)} y={pz(-0.05)} width={1.5 * S} height={1.35 * S} fill="none" strokeWidth="2" />
          <line x1={px(1.55 + 0.3)} y1={pz(1.3)} x2={px(1.55 + 1.2)} y2={pz(1.3)} stroke="var(--color-charcoal)" strokeWidth="4" />
          {ann && (
            <text x={px(2.3)} y={pz(-0.18)} textAnchor="middle" stroke="none" data-annotation>
              {ann.separate}
            </text>
          )}
        </g>
      )}

      {/* Elevante: the cabin footprint at the head of the flight */}
      <g data-part="cabin" style={{ opacity: showCabin && !cabinHidden ? 1 : 0 }}>
        <rect x={px(CABIN.xMin)} y={pz(CABIN.zMin)} width={CABIN.width * S} height={CABIN.depth * S} fill="var(--color-oxide)" fillOpacity="0.12" stroke="var(--color-oxide)" strokeWidth="2.25" />
        <rect x={px(CABIN.xMin) + 6} y={pz(CABIN.zMin) + 6} width={CABIN.width * S - 12} height={CABIN.depth * S - 12} fill="none" stroke="var(--color-oxide)" strokeWidth="1" strokeOpacity="0.5" />
        {/* door on the hall side */}
        <line x1={px(CABIN.xMin + 0.28)} y1={pz(CABIN.zMin + CABIN.depth)} x2={px(CABIN_X_MAX - 0.28)} y2={pz(CABIN.zMin + CABIN.depth)} stroke="var(--color-oxide)" strokeWidth="5" />
        {ann && (
          <text x={px(CABIN.xMin + CABIN.width / 2)} y={pz(CABIN.zMin + CABIN.depth) + 22} textAnchor="middle" fill="var(--color-oxide)" data-annotation>
            {ann.cabin}
          </text>
        )}
      </g>

      {ann && (
        <g data-annotation>
          <text x={px(STAIR.x0 + 1.4)} y={pz(-STAIR.halfWidth) - 10}>
            {ann.staircase}
          </text>
          <text x={px(HOUSE.xMin) + 12} y={pz(HOUSE.zMax) - 12}>
            {ann.hall}
          </text>
        </g>
      )}
    </svg>
  );
}
