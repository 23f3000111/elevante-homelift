import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import {
  CABIN,
  CABIN_X_MAX,
  CABIN_Z_MAX,
  DOORS,
  HOUSE,
  RISE,
  SLAB,
  STAIR,
  STAIR_TOP_X,
  STOREY,
  tread,
} from "@/lib/scene/geometry";

/** A box by its extents; the scene builds both a mesh and its edge lines from it. */
export interface Box {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  z0: number;
  z1: number;
}

export function boxCenter(b: Box): [number, number, number] {
  return [(b.x0 + b.x1) / 2, (b.y0 + b.y1) / 2, (b.z0 + b.z1) / 2];
}
export function boxSize(b: Box): [number, number, number] {
  return [b.x1 - b.x0, b.y1 - b.y0, b.z1 - b.z0];
}

/** Where headroom over the flight runs out, the upper floor stops and the stairwell begins. */
const STAIRWELL_X0 = STAIR.x0 + 2.6 * STAIR.run;
const WALL = 0.14;

/** The house: ground slab, upper floor with the stairwell cut out, back and left walls. */
export const HOUSE_BOXES: Box[] = [
  // ground
  { x0: HOUSE.xMin, x1: HOUSE.xMax, y0: -SLAB, y1: 0, z0: HOUSE.zMin, z1: HOUSE.zMax },
  // back wall
  { x0: HOUSE.xMin, x1: HOUSE.xMax, y0: 0, y1: STOREY + HOUSE.upperRoom, z0: HOUSE.zMin - WALL, z1: HOUSE.zMin },
  // left wall
  { x0: HOUSE.xMin - WALL, x1: HOUSE.xMin, y0: 0, y1: STOREY + HOUSE.upperRoom, z0: HOUSE.zMin - WALL, z1: HOUSE.zMax },
  // upper floor, left of the stairwell
  { x0: HOUSE.xMin, x1: STAIRWELL_X0, y0: STOREY - SLAB, y1: STOREY, z0: HOUSE.zMin, z1: HOUSE.zMax },
  // upper floor, right of the cabin
  { x0: CABIN_X_MAX, x1: HOUSE.xMax, y0: STOREY - SLAB, y1: STOREY, z0: HOUSE.zMin, z1: HOUSE.zMax },
  // upper floor, behind the stairwell
  { x0: STAIRWELL_X0, x1: CABIN_X_MAX, y0: STOREY - SLAB, y1: STOREY, z0: HOUSE.zMin, z1: -STAIR.halfWidth },
  // upper floor, in front of the stairwell
  { x0: STAIRWELL_X0, x1: CABIN_X_MAX, y0: STOREY - SLAB, y1: STOREY, z0: STAIR.halfWidth, z1: HOUSE.zMax },
];

export const TREAD_THICKNESS = 0.05;

export const TREAD_BOXES: Box[] = Array.from({ length: STAIR.risers }, (_, i) => {
  const t = tread(i);
  return {
    x0: t.x,
    x1: t.x + t.run + 0.03,
    y0: t.y - TREAD_THICKNESS,
    y1: t.y,
    z0: -STAIR.halfWidth,
    z1: STAIR.halfWidth,
  };
});

/** The soffit beneath the flight, as a rotated slab from the first nose to the top. */
export function soffitTransform() {
  const x0 = STAIR.x0 + STAIR.run;
  const y0 = 0;
  const x1 = STAIR_TOP_X;
  const y1 = STOREY - RISE - TREAD_THICKNESS;
  const dx = x1 - x0;
  const dy = y1 - y0;
  return {
    length: Math.hypot(dx, dy),
    angle: Math.atan2(dy, dx),
    center: [(x0 + x1) / 2, (y0 + y1) / 2 - 0.02, 0] as [number, number, number],
    width: STAIR.halfWidth * 2,
  };
}

/** The triangular prism of space beneath the flight. */
export function voidGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(STAIR.x0 + STAIR.run, 0);
  shape.lineTo(STAIR_TOP_X, STOREY - RISE - TREAD_THICKNESS - 0.05);
  shape.lineTo(STAIR_TOP_X, 0);
  shape.closePath();
  const g = new THREE.ExtrudeGeometry(shape, { depth: STAIR.halfWidth * 2 - 0.02, bevelEnabled: false });
  g.translate(0, 0, -STAIR.halfWidth + 0.01);
  return g;
}

/** Cabin frame members, in cabin-local coordinates (x from 0, y from 0, z from 0). */
const F = CABIN.frame;
const W = CABIN.width;
const D = CABIN.depth;
const H = CABIN.height;

export const CABIN_FRAME_BOXES: Box[] = [
  // floor and roof plates
  { x0: 0, x1: W, y0: 0, y1: 0.07, z0: 0, z1: D },
  { x0: 0, x1: W, y0: H - 0.06, y1: H, z0: 0, z1: D },
  // four posts
  { x0: 0, x1: F, y0: 0, y1: H, z0: 0, z1: F },
  { x0: W - F, x1: W, y0: 0, y1: H, z0: 0, z1: F },
  { x0: 0, x1: F, y0: 0, y1: H, z0: D - F, z1: D },
  { x0: W - F, x1: W, y0: 0, y1: H, z0: D - F, z1: D },
];

/** Glass panels: back, left, right. The front carries the door leaves. */
export const CABIN_GLASS_BOXES: Box[] = [
  { x0: F, x1: W - F, y0: 0.07, y1: H - 0.06, z0: 0.005, z1: 0.02 },
  { x0: 0.005, x1: 0.02, y0: 0.07, y1: H - 0.06, z0: F, z1: D - F },
  { x0: W - 0.02, x1: W - 0.005, y0: 0.07, y1: H - 0.06, z0: F, z1: D - F },
];

/**
 * The lower landing door belongs to the house, not the cabin: two leaves in
 * front of the shaft position that part sideways, and close again when the
 * cabin has left. World coordinates.
 */
const LEAF = 0.45;
const LEAF_X0 = CABIN.xMin + W / 2 - LEAF;
const DOOR_Z = CABIN_Z_MAX + 0.04;
export const LOWER_DOOR_LEAVES: Box[] = [
  { x0: LEAF_X0, x1: CABIN.xMin + W / 2, y0: 0.02, y1: DOORS.lowerHeight, z0: DOOR_Z, z1: DOOR_Z + 0.025 },
  { x0: CABIN.xMin + W / 2, x1: CABIN.xMin + W / 2 + LEAF, y0: 0.02, y1: DOORS.lowerHeight, z0: DOOR_Z, z1: DOOR_Z + 0.025 },
];
export const LOWER_DOOR_SLIDE = 0.4;
/** The frame around the lower opening: two posts and a lintel, fixed to the house. */
const POST = 0.06;
export const LOWER_FRAME_BOXES: Box[] = [
  { x0: CABIN.xMin - POST, x1: CABIN.xMin, y0: 0, y1: STOREY - SLAB, z0: DOOR_Z - 0.03, z1: DOOR_Z + 0.06 },
  { x0: CABIN_X_MAX, x1: CABIN_X_MAX + POST, y0: 0, y1: STOREY - SLAB, z0: DOOR_Z - 0.03, z1: DOOR_Z + 0.06 },
  { x0: CABIN.xMin - POST, x1: CABIN_X_MAX + POST, y0: H, y1: H + 0.05, z0: DOOR_Z - 0.03, z1: DOOR_Z + 0.06 },
];
/** The cabin's own front face: a fixed glass panel either side of its open middle. */
export const CABIN_FRONT_FIXED: Box[] = [
  { x0: F, x1: W / 2 - LEAF, y0: 0.07, y1: H - 0.06, z0: D - 0.02, z1: D - 0.005 },
  { x0: W / 2 + LEAF, x1: W - F, y0: 0.07, y1: H - 0.06, z0: D - 0.02, z1: D - 0.005 },
];

/** The upper door: two panels over the stair opening, parting front and back. */
export const UPPER_DOOR_PANELS: Box[] = [
  { x0: STAIR_TOP_X, x1: CABIN_X_MAX, y0: STOREY - DOORS.panelThickness, y1: STOREY, z0: CABIN.zMin, z1: CABIN.zMin + D / 2 },
  { x0: STAIR_TOP_X, x1: CABIN_X_MAX, y0: STOREY - DOORS.panelThickness, y1: STOREY, z0: CABIN.zMin + D / 2, z1: CABIN_Z_MAX },
];
export const UPPER_DOOR_SLIDE = D / 2;

/** Edge lines of the soffit slab, rotated to the pitch of the flight. */
export function soffitEdges(): THREE.BufferGeometry {
  const t = soffitTransform();
  const g = new THREE.EdgesGeometry(new THREE.BoxGeometry(t.length, 0.05, t.width), 1);
  g.rotateZ(t.angle);
  g.translate(t.center[0], t.center[1], t.center[2]);
  return g;
}

/** Merged edge lines for a list of boxes, in order, so drawRange can reveal them progressively. */
export function edgesFor(boxes: Box[]): THREE.BufferGeometry {
  const parts = boxes.map((b) => {
    const [w, h, d] = boxSize(b);
    const [x, y, z] = boxCenter(b);
    const g = new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, d), 1);
    g.translate(x, y, z);
    return g;
  });
  const merged = mergeGeometries(parts, false);
  parts.forEach((p) => p.dispose());
  return merged ?? new THREE.BufferGeometry();
}
