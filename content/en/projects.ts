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
    slug: "entrance-hall-stone-and-brass",
    title: "Entrance hall, stone and brass",
    location: "Reference interior",
    summary: "A straight flight in an open entrance hall, with seating beneath the upper landing.",
    media: image("stair-gold-hall"),
    ratio: "landscape",
    placeholder: true,
  },
  {
    id: "p-02",
    slug: "curved-stair-oak-screen",
    title: "Curved stair behind an oak screen",
    location: "Reference interior",
    summary: "Vertical slats separate the stair from the living space without closing it off.",
    media: image("stair-oak-screen"),
    ratio: "square",
    placeholder: true,
  },
  {
    id: "p-03",
    slug: "floating-treads-white-hall",
    title: "Floating treads in a white hall",
    location: "Reference interior",
    summary: "Cantilevered stone treads beside a glazed enclosure.",
    media: image("stair-floating-glass-lift"),
    ratio: "portrait",
    placeholder: true,
  },
  {
    id: "p-04",
    slug: "spiral-from-above",
    title: "Spiral, seen from above",
    location: "Reference interior",
    summary: "A timber spiral opening onto a quiet hall.",
    media: image("stair-spiral-above"),
    ratio: "portrait",
    placeholder: true,
  },
  {
    id: "p-05",
    slug: "curved-stair-lit-treads",
    title: "Curved stair with lit treads",
    location: "Reference interior",
    summary: "A pale hall with a curved flight and a lift door set into the wall.",
    media: image("stair-curved-led"),
    ratio: "landscape",
    placeholder: true,
  },
];
