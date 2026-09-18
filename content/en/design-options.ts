import { image, video } from "../media";
import type { DesignOption } from "../types";

/**
 * The brief says the product offers choices in finishes, materials and cabin
 * design, and that the detail will be supplied separately. These entries
 * name the groups only; the actual range is still to come.
 */
export const designOptions: DesignOption[] = [
  {
    id: "do-cabin",
    group: "cabin",
    name: "Cabin appearance",
    description: "Cabin design options will be published when the range is released.",
    placeholder: true,
  },
  {
    id: "do-stair",
    group: "staircase",
    name: "Staircase design",
    description: "How the staircase and cabin are designed together will be shown here.",
    placeholder: true,
  },
  {
    id: "do-oak",
    group: "materials",
    name: "Timber",
    description: "Material reference. The Elevante timber finishes will be listed here.",
    media: video("video-home-integration").poster,
    placeholder: true,
  },
  {
    id: "do-stone",
    group: "materials",
    name: "Stone",
    description: "Material reference. The Elevante stone finishes will be listed here.",
    media: video("video-design-cabin").poster,
    placeholder: true,
  },
  {
    id: "do-metal",
    group: "finishes",
    name: "Metal",
    description: "Material reference. The Elevante metal finishes will be listed here.",
    media: image("lift-bronze-cabin"),
    placeholder: true,
  },
  {
    id: "do-walls",
    group: "finishes",
    name: "Wall and side finishes",
    description: "Wall and side finish options will be published when the range is released.",
    placeholder: true,
  },
  {
    id: "do-floor",
    group: "flooring",
    name: "Cabin flooring",
    description: "Flooring options will be published when the range is released.",
    placeholder: true,
  },
  {
    id: "do-controls",
    group: "controls",
    name: "Controls and details",
    description: "Controls and detail options will be published when the range is released.",
    placeholder: true,
  },
];
