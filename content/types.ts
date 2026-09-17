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

export interface SequenceVariant {
  /** Public directory holding the frames, e.g. `/media/seq/video-cabin-moving/d`. */
  dir: string;
  width: number;
  height: number;
}

/**
 * A film cut into frames so the scroll position can drive it. Two sizes:
 * the full crop for desktops and a lighter set for phones.
 */
export interface SequenceAsset {
  id: string;
  frames: number;
  pad: number;
  ext: string;
  desktop: SequenceVariant;
  mobile: SequenceVariant;
  /** Frame 0 at desktop size, with a blur placeholder. */
  poster: MediaAsset;
  alt: string;
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

/** The running number every story section carries, e.g. "03" and "How it works". */
export interface SectionIndexContent {
  index: string;
  indexLabel: string;
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
  /** The single fact to set in the accent colour. */
  highlight?: boolean;
}

export interface GalleryItem {
  media: MediaAsset;
  label: string;
  /** Shown under the image when the asset is not a photograph of the product. */
  caption?: string;
}

export interface Material {
  name: string;
  /** Shown whole, at its own proportions; never cropped. */
  media: MediaAsset;
  /** When present, the film plays in place of the still. */
  video?: VideoAsset;
  caption?: string;
}

export interface HomeContent {
  hero: {
    title: string;
    lead: string;
    primary: Cta;
    secondary: Cta;
    /** The film behind the opening; its poster stands in under reduced motion. */
    video: VideoAsset;
    caption: string;
    scrollCue: string;
  };
  productReveal: SectionIndexContent & {
    title: string;
    lines: string[];
    sequence: SequenceAsset;
    caption: string;
    diagramNote: string;
    /** Labels for the three phases of the film, by scroll progress. */
    states: [string, string, string];
    frameLabel: string;
  };
  idea: SectionIndexContent & {
    title: string;
    body: string;
    media: MediaAsset;
  };
  howItWorks: SectionIndexContent & {
    title: string;
    intro: string;
    steps: Step[];
    diagramNote: string;
  };
  underTheStaircase: SectionIndexContent & {
    title: string;
    body: string[];
    sequence: SequenceAsset;
    caption: string;
    overlay: { staircase: string; cabin: string; space: string };
    comparison: {
      title: string;
      conventional: { title: string; body: string };
      elevante: { title: string; body: string };
    };
  };
  inYourHome: SectionIndexContent & {
    title: string;
    body: string;
    cta: Cta;
    gallery: GalleryItem[];
  };
  everydayUse: SectionIndexContent & {
    title: string;
    intro: string;
    situations: Situation[];
    visualisationLabel: string;
    schematicLabel: string;
    safetyTitle: string;
    safety: string;
  };
  design: SectionIndexContent & {
    title: string;
    body: string;
    video: VideoAsset;
    caption: string;
    materialsNote: string;
    materials: Material[];
    cta: Cta;
  };
  projects: SectionIndexContent & {
    title: string;
    body: string;
    cta: Cta;
    placeholderLabel: string;
    locationPlaceholder: string;
    visualisationLabel: string;
  };
  installation: SectionIndexContent & {
    title: string;
    body: string;
    steps: Step[];
    media: MediaAsset[];
    cta: Cta;
  };
  trust: SectionIndexContent & {
    title: string;
    body: string;
    items: TrustItem[];
  };
  dealerCta: {
    title: string;
    body: string;
    primary: Cta;
    secondary: Cta;
    media: MediaAsset;
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

export interface Market {
  code: string;
  name: string;
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

/** A page opening: a statement, a lead, and optionally a large image. */
export interface PageHeroContent {
  index?: string;
  eyebrow?: string;
  title: string;
  lead: string;
  media?: MediaAsset;
  caption?: string;
}

/** A titled block of short paragraphs used on secondary pages. */
export interface TextBlock {
  title: string;
  paragraphs: string[];
}

/** A ledger row on the Information page: a topic and its current status. */
export interface SpecRow {
  topic: string;
  status: string;
  placeholder: boolean;
}

export interface PagesContent {
  theHomelift: {
    hero: PageHeroContent;
    sequenceTitle: string;
    sequenceLines: string[];
    blocks: TextBlock[];
    faqTitle: string;
  };
  design: {
    hero: PageHeroContent;
    blocks: TextBlock[];
    optionsTitle: string;
    optionsNote: string;
  };
  inYourHome: {
    hero: PageHeroContent;
    blocks: TextBlock[];
  };
  installation: {
    hero: PageHeroContent;
    blocks: TextBlock[];
  };
  inspiration: {
    hero: PageHeroContent;
    testimonialsTitle: string;
    testimonialsNote: string;
  };
  information: {
    hero: PageHeroContent;
    specsTitle: string;
    specsNote: string;
    specs: SpecRow[];
    downloadsTitle: string;
    downloadsNote: string;
    faqTitle: string;
  };
  findADealer: {
    hero: PageHeroContent;
    locatorTitle: string;
    locatorBody: string;
    countryLabel: string;
    searchLabel: string;
    searchPlaceholder: string;
    searchButton: string;
    noDealers: string;
    showroomTitle: string;
    showroomBody: string;
    requestTitle: string;
    requestBody: string;
    form: {
      name: string;
      email: string;
      country: string;
      postcode: string;
      message: string;
      submit: string;
      success: string;
      error: string;
      privacy: string;
    };
  };
}
