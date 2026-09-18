/**
 * The schematic house every drawing on the site is built from: a two-storey
 * section, a straight flight of stairs, and the cabin in the space beneath
 * the head of the staircase. The Three.js scene and the SVG drawings both
 * read these numbers, so the two never disagree.
 *
 * Units are notional metres. Nothing here is a product dimension; every
 * rendering of it says so.
 */

export const STOREY = 2.8;
export const SLAB = 0.24;

/** The section slice: x runs left to right, y up, z towards the viewer. */
export const HOUSE = {
  xMin: -3.9,
  xMax: 3.3,
  zMin: -1.4,
  zMax: 1.4,
  /** Height of the back wall above the upper floor. */
  upperRoom: 2.0,
};

export const STAIR = {
  risers: 13,
  run: 0.275,
  x0: -3.45,
  /** Half-width of the flight in z. */
  halfWidth: 0.56,
};
export const RISE = STOREY / STAIR.risers;
/** Where the top tread ends and the stair opening begins. */
export const STAIR_TOP_X = STAIR.x0 + STAIR.risers * STAIR.run;

/** The cabin waits beneath the head of the staircase and rises through the opening. */
export const CABIN = {
  xMin: STAIR_TOP_X,
  width: 1.45,
  zMin: -STAIR.halfWidth,
  depth: STAIR.halfWidth * 2,
  height: 2.2,
  /** Wall thickness of the frame members. */
  frame: 0.045,
};
export const CABIN_X_MAX = CABIN.xMin + CABIN.width;
export const CABIN_Z_MAX = CABIN.zMin + CABIN.depth;

/** The lower door is on the front face of the cabin; the upper door closes the stair opening. */
export const DOORS = {
  lowerWidth: 0.95,
  lowerHeight: CABIN.height - 0.12,
  /** Each upper panel covers half the opening and slides outwards. */
  upperPanel: CABIN.width / 2,
  panelThickness: 0.05,
};

/** Tread i (0-based) as a box: x from, run, top height. */
export function tread(i: number) {
  return {
    x: STAIR.x0 + i * STAIR.run,
    y: (i + 1) * RISE,
    run: STAIR.run,
  };
}

/** Section outline of the space beneath the flight, as x/y points. */
export function voidPolygon(): Array<[number, number]> {
  return [
    [STAIR.x0 + STAIR.run, 0],
    [STAIR_TOP_X, STOREY - RISE],
    [STAIR_TOP_X, 0],
  ];
}

/** The 2D drawing frame: the section, with a margin, in viewBox units. */
export const DRAWING = {
  scale: 100,
  margin: 0.45,
  /** The drawing shows less of the upper room than the model. */
  upperRoom: 1.5,
};
export function sx(x: number) {
  return (x - HOUSE.xMin + DRAWING.margin) * DRAWING.scale;
}
export function sy(y: number) {
  return (STOREY + DRAWING.upperRoom + DRAWING.margin - y) * DRAWING.scale;
}
export const DRAWING_WIDTH = (HOUSE.xMax - HOUSE.xMin + DRAWING.margin * 2) * DRAWING.scale;
export const DRAWING_HEIGHT = (STOREY + DRAWING.upperRoom + DRAWING.margin * 2) * DRAWING.scale;
