import { image, video } from "../media";
import type { Project } from "../types";

/**
 * There are no completed Elevante installations yet. Each entry is a
 * reference interior or a visualisation and says so. When a real project is
 * added, set `kind: "installation"`, `placeholder: false` and replace the
 * media; nothing else changes.
 */
export const projects: Project[] = [
  {
    id: "p-01",
    slug: "stone-and-brass-hall",
    title: "Stone and brass hall",
    location: "Reference interior",
    summary: "A straight flight in dark stone and brass, a seating area beneath a timber wall.",
    media: image("stair-gold-hall"),
    kind: "reference",
    placeholder: true,
  },
  {
    id: "p-02",
    slug: "floating-oak-flight",
    title: "Floating oak flight",
    location: "Visualisation",
    summary: "Cantilevered oak treads in a double-height living room.",
    media: video("video-home-integration").poster,
    kind: "visualisation",
    placeholder: true,
  },
  {
    id: "p-03",
    slug: "spiral-from-above",
    title: "Spiral, seen from above",
    location: "Reference interior",
    summary: "A timber spiral opening onto a quiet hall.",
    media: image("stair-spiral-above"),
    kind: "reference",
    placeholder: true,
  },
  {
    id: "p-04",
    slug: "stone-wall-and-steel-doors",
    title: "Stone wall and steel doors",
    location: "Visualisation",
    summary: "Pale veined stone beside steel-framed glazed doors.",
    media: video("video-design-cabin").poster,
    kind: "visualisation",
    placeholder: true,
  },
  {
    id: "p-05",
    slug: "curved-stair-dark-timber",
    title: "Curved stair, dark timber",
    location: "Reference interior",
    summary: "A curved flight against dark timber panelling.",
    media: image("stair-dark-wood"),
    kind: "reference",
    placeholder: true,
  },
];
