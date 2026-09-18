import { useId } from "react";
import { cn } from "@/lib/cn";
import {
  CABIN,
  CABIN_X_MAX,
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

interface InstallationSheetProps {
  /** 1..7: which stage the sheet has reached. Layers beyond it are faint. */
  step: number;
  title: string;
  desc: string;
  className?: string;
}

const STAIRWELL_X0 = STAIR.x0 + 2.6 * STAIR.run;

function DimensionLine({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  const horizontal = y1 === y2;
  const tick = 6;
  return (
    <g stroke="var(--color-caption)" strokeWidth="1" fill="none">
      <line x1={x1} y1={y1} x2={x2} y2={y2} />
      {horizontal ? (
        <>
          <line x1={x1} y1={y1 - tick} x2={x1} y2={y1 + tick} />
          <line x1={x2} y1={y2 - tick} x2={x2} y2={y2 + tick} />
        </>
      ) : (
        <>
          <line x1={x1 - tick} y1={y1} x2={x1 + tick} y2={y1} />
          <line x1={x2 - tick} y1={y2} x2={x2 + tick} y2={y2} />
        </>
      )}
    </g>
  );
}

/**
 * One drawing that fills in stage by stage: the house, the staircase, the
 * dimension lines, the material choices, the prepared space, the cabin, and
 * the completed system. Dimension lines carry no figures; none have been
 * published.
 */
export function InstallationSheet({ step, title, desc, className }: InstallationSheetProps) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const S = DRAWING.scale;
  const layer = (n: number) => ({ "data-layer": n, style: { opacity: step >= n ? 1 : 0, transition: "opacity 0.6s var(--ease-out-quart)" } });
  const voidPts = voidPolygon()
    .map(([x, y]) => `${sx(x)},${sy(y)}`)
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${DRAWING_WIDTH} ${DRAWING_HEIGHT}`}
      role="img"
      aria-labelledby={`t-${uid} d-${uid}`}
      className={cn("drawing h-auto w-full", className)}
      data-drawing="sheet"
      data-step={step}
    >
      <title id={`t-${uid}`}>{title}</title>
      <desc id={`d-${uid}`}>{desc}</desc>
      <defs>
        <pattern id={`h-${uid}`} width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="9" stroke="var(--color-warm-grey)" strokeWidth="1" />
        </pattern>
      </defs>

      {/* 01 Consultation: the house, as it is */}
      <g {...layer(1)} fill="none" stroke="var(--color-charcoal)" strokeWidth="1.5" strokeLinecap="square">
        <rect x={sx(HOUSE.xMin)} y={sy(0)} width={(HOUSE.xMax - HOUSE.xMin) * S} height={SLAB * S} fill="var(--color-stone)" />
        <path d={`M${sx(HOUSE.xMin)} ${sy(0)} V${sy(STOREY + DRAWING.upperRoom)} H${sx(HOUSE.xMax)}`} stroke="var(--color-warm-grey)" />
        <rect x={sx(HOUSE.xMin)} y={sy(STOREY)} width={(STAIRWELL_X0 - HOUSE.xMin) * S} height={SLAB * S} fill="var(--color-stone)" />
        <rect x={sx(CABIN_X_MAX)} y={sy(STOREY)} width={(HOUSE.xMax - CABIN_X_MAX) * S} height={SLAB * S} fill="var(--color-stone)" />
      </g>

      {/* 02 Assessment: the staircase */}
      <g {...layer(2)} fill="var(--color-charcoal-soft)">
        {Array.from({ length: STAIR.risers }, (_, i) => {
          const t = tread(i);
          return <rect key={i} x={sx(t.x)} y={sy(t.y)} width={(t.run + 0.03) * S} height={0.05 * S} />;
        })}
        <line x1={sx(STAIR.x0 + STAIR.run)} y1={sy(0)} x2={sx(STAIR_TOP_X)} y2={sy(STOREY - RISE - 0.05)} stroke="var(--color-charcoal-soft)" strokeWidth="1.5" />
      </g>

      {/* 03 Measurement: dimension lines, without figures */}
      <g {...layer(3)}>
        <DimensionLine x1={sx(STAIR.x0)} y1={sy(-0.7)} x2={sx(STAIR_TOP_X)} y2={sy(-0.7)} />
        <DimensionLine x1={sx(CABIN.xMin)} y1={sy(-0.7)} x2={sx(CABIN_X_MAX)} y2={sy(-0.7)} />
        <DimensionLine x1={sx(CABIN_X_MAX + 0.55)} y1={sy(0)} x2={sx(CABIN_X_MAX + 0.55)} y2={sy(STOREY)} />
        <DimensionLine x1={sx(STAIR.x0 - 0.5)} y1={sy(0)} x2={sx(STAIR.x0 - 0.5)} y2={sy(STOREY - SLAB)} />
      </g>

      {/* 04 Configuration: material choices beside the drawing */}
      <g {...layer(4)}>
        {["var(--color-stone)", "var(--color-charcoal-soft)", "var(--color-oxide)"].map((fill, i) => (
          <rect key={fill} x={sx(HOUSE.xMax) - 3 * 34 + i * 34} y={sy(STOREY + DRAWING.upperRoom) + 18} width="26" height="26" fill={fill} stroke="var(--color-charcoal)" strokeWidth="1" />
        ))}
      </g>

      {/* 05 Preparation: the space beneath the staircase */}
      <g {...layer(5)}>
        <polygon points={voidPts} fill={`url(#h-${uid})`} />
        <polygon points={voidPts} fill="none" stroke="var(--color-oxide)" strokeWidth="1.5" strokeDasharray="5 5" />
      </g>

      {/* 06 Installation: the cabin */}
      <g {...layer(6)}>
        <rect x={sx(CABIN.xMin)} y={sy(CABIN.height)} width={CABIN.width * S} height={CABIN.height * S} fill="var(--color-oxide)" fillOpacity="0.1" stroke="var(--color-oxide)" strokeWidth="2.25" />
        <line x1={sx(STAIR_TOP_X)} y1={sy(STOREY) + 2} x2={sx(CABIN_X_MAX)} y2={sy(STOREY) + 2} stroke="var(--color-charcoal)" strokeWidth="5" />
      </g>

      {/* 07 Handover: the system, complete */}
      <g {...layer(7)}>
        <line x1={sx(CABIN.xMin + CABIN.width / 2)} y1={sy(STOREY + DRAWING.upperRoom - 0.3)} x2={sx(CABIN.xMin + CABIN.width / 2)} y2={sy(0)} stroke="var(--color-oxide)" strokeWidth="1" strokeDasharray="3 7" />
        <rect x={sx(HOUSE.xMin) - 14} y={sy(STOREY + DRAWING.upperRoom) - 14} width={(HOUSE.xMax - HOUSE.xMin) * S + 28} height={(STOREY + DRAWING.upperRoom + SLAB) * S + 28} fill="none" stroke="var(--color-oxide)" strokeWidth="1" />
      </g>
    </svg>
  );
}
