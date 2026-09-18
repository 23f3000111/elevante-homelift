/**
 * The scroll-driven story of the mechanism, as a pure function of progress
 * (0..1 through the pinned scene). The Three.js scene, the SVG fallback and
 * the captions all read the same pose, so they cannot drift apart.
 *
 * Copy for each state lives in content; this module only knows the ranges.
 */

export const STATE_RANGES: ReadonlyArray<readonly [number, number]> = [
  [0.0, 0.08], // 0 headline
  [0.08, 0.2], // 1 the house draws in
  [0.2, 0.32], // 2 the staircase builds
  [0.32, 0.42], // 3 the cabin appears beneath the head of the flight
  [0.42, 0.52], // 4 the lower door opens
  [0.52, 0.58], // 5 the door closes; the openings are protected
  [0.58, 0.78], // 6 the cabin travels
  [0.78, 0.88], // 7 arrival at the upper floor
  [0.88, 1.0], // 8 the drawing resolves into a home
];

export const STATE_COUNT = STATE_RANGES.length;

export interface Pose {
  /** Which state is active, 0..8. */
  state: number;
  /** 1 while the opening headline is on screen, 0 once it has gone. */
  headline: number;
  /** 0..1 fraction of the house lines drawn. */
  house: number;
  /** 0..1 fraction of the treads built. */
  stair: number;
  /** 0..1 cabin visibility. */
  cabin: number;
  /** 0..1 tint on the space beneath the staircase. */
  voidTint: number;
  /** 0 closed .. 1 open. */
  lowerDoor: number;
  upperDoor: number;
  /** 0 at the lower level .. 1 at the upper floor. */
  travel: number;
  /** 0 line drawing .. 1 residential render. */
  resolve: number;
  /** 0..1 camera orbit from elevation to three-quarter view. */
  camera: number;
  /** 0..1 the camera pulls back and the house moves aside for the statement. */
  settle: number;
  /** 0..1 the closing statement. */
  statement: number;
}

export function clamp01(v: number) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

/** Linear 0..1 across [a, b]. */
export function ramp(p: number, a: number, b: number) {
  return clamp01((p - a) / (b - a));
}

/** Eased 0..1 across [a, b]. */
export function ease(p: number, a: number, b: number) {
  const t = ramp(p, a, b);
  return t * t * (3 - 2 * t);
}

export function stateAt(p: number): number {
  for (let i = STATE_RANGES.length - 1; i >= 0; i--) {
    if (p >= STATE_RANGES[i][0]) return i;
  }
  return 0;
}

export function poseAt(progress: number): Pose {
  const p = clamp01(progress);
  const r = STATE_RANGES;
  const lowerOpens = ease(p, r[4][0], r[4][0] + (r[4][1] - r[4][0]) * 0.6);
  const lowerCloses = ease(p, r[5][0], r[5][1]);
  // The upper door opens while the cabin is still below, so the cabin
  // never meets a closed panel.
  const upperOpens = ease(p, r[5][0] + (r[5][1] - r[5][0]) * 0.3, r[5][1]);
  return {
    state: stateAt(p),
    headline: 1 - ease(p, 0, r[0][1]),
    house: ease(p, r[1][0], r[1][1]),
    stair: ramp(p, r[2][0], r[2][1]),
    cabin: ease(p, r[3][0], r[3][0] + (r[3][1] - r[3][0]) * 0.6),
    voidTint: ease(p, r[3][0] + (r[3][1] - r[3][0]) * 0.3, r[3][1]) * (1 - ease(p, r[8][0], r[8][1]) * 0.7),
    lowerDoor: lowerOpens * (1 - lowerCloses),
    upperDoor: upperOpens,
    travel: ease(p, r[6][0], r[6][1]),
    resolve: ease(p, r[8][0], r[8][0] + (r[8][1] - r[8][0]) * 0.7),
    camera: ease(p, r[2][0], r[7][1]),
    settle: ease(p, r[8][0], r[8][1]),
    statement: ease(p, r[8][0] + (r[8][1] - r[8][0]) * 0.3, r[8][1]),
  };
}

/** The static pose used with reduced motion and before WebGL is available. */
export const RESOLVED_POSE: Pose = poseAt(1);
