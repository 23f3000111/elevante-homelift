import { image } from "../media";
import type { Project } from "../types";

/**
 * There are no completed Elevante installations yet. Each entry is a
 * reference interior and says so. When a real project is added, set
 * `placeholder: false` and replace the media.
 */
export const projects: Project[] = [
  {
    id: "p-01",
    slug: "floating-treads-white-hall",
    title: "Floating treads in a white hall",
    location: "Reference interior",
    summary: "Cantilevered stone treads beside a glazed enclosure.",
    media: image("stair-floating-glass-lift"),
    ratio: "portrait",
    placeholder: true,
  },
  {
    id: "p-02",
    slug: "spiral-from-above",
    title: "Spiral, seen from above",
    location: "Reference interior",
    summary: "A timber spiral opening onto a quiet hall.",
    media: image("stair-spiral-above"),
    ratio: "portrait",
    placeholder: true,
  },
  {
    id: "p-03",
    slug: "curved-stair-lit-treads",
    title: "Curved stair with lit treads",
    location: "Reference interior",
    summary: "A pale hall with a curved flight and a lift door set into the wall.",
    media: image("stair-curved-led"),
    ratio: "landscape",
    placeholder: true,
  },
  {
    id: "p-04",
    slug: "walnut-hall",
    title: "Walnut hall",
    location: "Reference interior",
    summary: "Walnut joinery and a timber flight in an open hall.",
    media: image("lift-round-glass-hall"),
    ratio: "landscape",
    placeholder: true,
  },
];
