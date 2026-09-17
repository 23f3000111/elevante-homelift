/**
 * Content models. These are the contract between the site and whatever
 * supplies its content: today static modules under `content/en`, later the
 * Elevante admin API. Components only ever see these shapes.
 */

export type Locale = "en";

/**
 * Where an asset came from. Anything that is not `product` must never be
 * presented as the Elevante product itself; components add a visible caption
 * when such an asset stands in for it.
 */
export type Provenance = "product" | "ai" | "stock" | "placeholder";

export interface MediaAsset {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  blurDataURL?: string;
  provenance: Provenance;
  /** Internal note on origin or limits. Never rendered. */
  note?: string;
}

export interface VideoAsset {
  id: string;
  mp4: string;
  webm: string;
  poster: MediaAsset;
  provenance: Provenance;
  note?: string;
}

export interface Cta {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface FooterGroup {
  title: string;
  items: NavItem[];
}

export interface SiteContent {
  name: string;
  legalName: string;
  description: string;
  nav: NavItem[];
  dealerCta: Cta;
  footer: {
    groups: FooterGroup[];
    regionNote: string;
    contactNote: string;
    legal: string;
  };
}

export interface Step {
  number: string;
  title: string;
  body: string;
}

/** Schematic figures the diagram components can draw. */
export type Figure = "move" | "doors" | "stair-opening" | "wheelchair" | "rollator" | "two-people";

export interface Situation {
  id: string;
  title: string;
  body: string;
  media?: MediaAsset;
  figure?: Figure;
}

export interface TrustItem {
  title: string;
  body: string;
  placeholder?: boolean;
}

export interface GalleryItem {
  media: MediaAsset;
  label: string;
}

export interface Material {
  name: string;
  media: MediaAsset;
}

export interface HomeContent {
  hero: {
    title: string;
    lead: string;
    primary: Cta;
    secondary: Cta;
    media: MediaAsset;
  };
  productReveal: {
    title: string;
    lines: string[];
    video: VideoAsset;
    caption: string;
    diagramNote: string;
  };
  idea: {
    title: string;
    body: string;
    media: MediaAsset;
  };
  howItWorks: {
    title: string;
    intro: string;
    steps: Step[];
    diagramNote: string;
  };
  underTheStaircase: {
    title: string;
    body: string[];
    video: VideoAsset;
    caption: string;
    comparison: {
      title: string;
      conventional: { title: string; body: string };
      elevante: { title: string; body: string };
    };
  };
  inYourHome: {
    title: string;
    body: string;
    cta: Cta;
    gallery: GalleryItem[];
  };
  everydayUse: {
    title: string;
    intro: string;
    situations: Situation[];
    visualisationLabel: string;
    safetyTitle: string;
    safety: string;
  };
  design: {
    title: string;
    body: string;
    video: VideoAsset;
    caption: string;
    materialsNote: string;
    materials: Material[];
    cta: Cta;
  };
  projects: {
    title: string;
    body: string;
    cta: Cta;
    placeholderLabel: string;
    visualisationLabel: string;
  };
  installation: {
    title: string;
    body: string;
    steps: Step[];
    media: MediaAsset[];
    cta: Cta;
  };
  trust: {
    title: string;
    body: string;
    items: TrustItem[];
  };
  dealerCta: {
    title: string;
    body: string;
    primary: Cta;
    secondary: Cta;
  };
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  location: string;
  summary: string;
  media: MediaAsset;
  /** Presentation hint for the editorial grid. */
  ratio: "portrait" | "landscape" | "square";
  /** True until a real Elevante installation replaces the reference interior. */
  placeholder: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  location: string;
  placeholder: boolean;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export interface Dealer {
  id: string;
  name: string;
  country: string;
  city: string;
  region?: string;
  postcode?: string;
  phone?: string;
  email?: string;
  showroom: boolean;
  placeholder: boolean;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  placeholder: boolean;
}

export interface Download {
  id: string;
  title: string;
  kind: "brochure" | "product" | "technical" | "installation" | "drawing";
  href?: string;
  placeholder: boolean;
}

export interface DesignOption {
  id: string;
  group: "cabin" | "materials" | "finishes" | "flooring" | "controls";
  name: string;
  description: string;
  media?: MediaAsset;
  placeholder: boolean;
}

export interface PageIntroContent {
  title: string;
  body: string;
  note: string;
}
