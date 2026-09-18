import { image, video } from "../media";
import type { Project } from "../types";

/**
 * There are no completed Elevante installations yet. Each entry is a
 * reference interior or a visualisation, and `kind` says which on the page.
 * `location` is empty because none of these is in a known house; a real
 * project sets `kind: "installation"`, `placeholder: false`, its location
 * and its media. Nothing else changes.
 */
export const projects: Project[] = [
  {
    id: "p-01",
    slug: "stone-and-brass-hall",
    title: "Stone and brass hall",
    location: "",
    summary: "A straight flight in dark stone and brass, a seating area beneath a timber wall.",
    media: image("stair-gold-hall"),
    kind: "reference",
    placeholder: true,
  },
  {
    id: "p-02",
    slug: "floating-oak-flight",
    title: "Floating oak flight",
    location: "",
    summary: "Cantilevered oak treads in a double-height living room.",
    media: video("video-home-integration").poster,
    kind: "visualisation",
    placeholder: true,
  },
  {
    id: "p-03",
    slug: "spiral-from-above",
    title: "Spiral, seen from above",
    location: "",
    summary: "A timber spiral opening onto a quiet hall.",
    media: image("stair-spiral-above"),
    kind: "reference",
    placeholder: true,
  },
  {
    id: "p-04",
    slug: "stone-wall-and-steel-doors",
    title: "Stone wall and steel doors",
    location: "",
    summary: "Pale veined stone beside steel-framed glazed doors.",
    media: video("video-design-cabin").poster,
    kind: "visualisation",
    placeholder: true,
  },
  {
    id: "p-05",
    slug: "curved-stair-dark-timber",
    title: "Curved stair, dark timber",
    location: "",
    summary: "A curved flight against dark timber panelling.",
    media: image("stair-dark-wood"),
    kind: "reference",
    placeholder: true,
  },
];
