import type { Download } from "../types";

/** The download area the brief asks for, with every item still to be supplied. */
export const downloads: Download[] = [
  { id: "dl-brochure", title: "Elevante Homelift brochure", kind: "brochure", placeholder: true },
  { id: "dl-product", title: "Product information", kind: "product", placeholder: true },
  { id: "dl-technical", title: "Technical information", kind: "technical", placeholder: true },
  { id: "dl-installation", title: "Installation information", kind: "installation", placeholder: true },
  { id: "dl-drawings", title: "Drawings", kind: "drawing", placeholder: true },
];
