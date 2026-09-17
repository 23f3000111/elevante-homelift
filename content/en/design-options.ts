import { image } from "../media";
import type { DesignOption } from "../types";

/**
 * The brief says the product offers choices in finishes, materials and cabin
 * design, and that the detail will be supplied separately. These entries name
 * the groups only; the actual range is still to come.
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
    id: "do-oak",
    group: "materials",
    name: "Timber",
    description: "Material reference. The Elevante timber finishes will be listed here.",
    media: image("material-oak"),
    placeholder: true,
  },
  {
    id: "do-stone",
    group: "materials",
    name: "Stone",
    description: "Material reference. The Elevante stone finishes will be listed here.",
    media: image("material-stone"),
    placeholder: true,
  },
  {
    id: "do-metal",
    group: "finishes",
    name: "Metal",
    description: "Material reference. The Elevante metal finishes will be listed here.",
    media: image("material-metal"),
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
