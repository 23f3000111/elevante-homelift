/**
 * Content models. These are the contract between the site and whatever
 * supplies its content: today static modules under `content/<locale>`, later
 * the Elevante admin API. Components only ever see these shapes, so the
 * admin can replace any of it without a redesign.
 */

import type { Locale } from "@/lib/i18n";
export type { Locale };

/**
 * Where an asset came from. Anything that is not `product` must never be
 * presented as the Elevante product itself; components add a visible caption
 * when such an asset stands in for it.
 *
 *  - product        photograph or render of the Elevante Homelift, approved
 *  - visualisation  concept rendering that does not show the real mechanism
 *  - ai             generated imagery, used for mood only
 *  - stock          licensed photograph of a reference interior
 *  - reference      a material or interior reference, not an Elevante option
 *  - placeholder    stands in until the real asset arrives
 */
export type Provenance = "product" | "visualisation" | "ai" | "stock" | "reference" | "placeholder";

export interface MediaAsset {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  type?: "image";
  blurDataURL?: string;
  provenance: Provenance;
  /** Caption shown with the asset, e.g. "Visualisation". */
  caption?: string;
  /** Optional art-directed sources. */
  mobileSrc?: string;
  desktopSrc?: string;
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
  dir: string;
  width: number;
  height: number;
}

/** A film cut into frames so the scroll position can drive it. */
export interface SequenceAsset {
  id: string;
  frames: number;
  pad: number;
  ext: string;
  desktop: SequenceVariant;
  mobile: SequenceVariant;
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
  /** One line under the label in the full-screen menu. */
  hint?: string;
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
  menu: {
    open: string;
    close: string;
    label: string;
    /** The image previewed in the full-screen menu. */
    media: MediaAsset;
    mediaCaption: string;
  };
  footer: {
    statement: string;
    groups: FooterGroup[];
    regionNote: string;
    contactNote: string;
    legal: string;
  };
  skipLink: string;
}

export interface Step {
  number: string;
  title: string;
  body: string;
}

/** Occupant symbols the cabin plan can draw. */
export type Occupant = "person" | "rollator" | "wheelchair" | "two-people";

/** What the everyday-use drawing shows for a situation. */
export interface SituationFigure {
  occupant: Occupant;
  door: "closed" | "open";
  /** Which part of the drawing to emphasise. */
  focus?: "door" | "opening" | "cabin";
}

export interface Situation {
  id: string;
  title: string;
  body: string;
  figure: SituationFigure;
}

export interface Material {
  id: string;
  name: string;
  /** The scene: shown whole, at its own proportions; never cropped. */
  media: MediaAsset;
  /** A close crop of the material itself. */
  swatch: MediaAsset;
  /** When present, the film plays in place of the still. */
  video?: VideoAsset;
  /** One line about what the reference shows. */
  note: string;
  /** Always a reference until the Elevante range is published. */
  reference: boolean;
}

export interface MechanismStateContent {
  id: string;
  label: string;
  caption: string;
}

export interface DrawingLabels {
  upperFloor: string;
  lowerFloor: string;
  staircase: string;
  space: string;
  cabin: string;
  door: string;
}

export interface PlanLabels {
  staircase: string;
  cabin: string;
  hall: string;
  separate: string;
  stairlift: string;
  up: string;
}

export interface CabinPlanLabels {
  door: string;
  cabin: string;
}

export interface MechanismContent {
  states: MechanismStateContent[];
  statement: string;
  note: string;
  drawingLabels: DrawingLabels;
  drawingTitle: string;
  drawingDesc: string;
  railLabel: string;
}

export type EvidenceStatus = "shown" | "stated" | "to-follow";

export interface EvidenceItem {
  title: string;
  body: string;
  status: EvidenceStatus;
  href?: string;
}

export interface ComparisonItem {
  id: "stairlift" | "conventional" | "elevante";
  name: string;
  statement: string;
  body: string;
}

export interface HomeContent {
  hero: {
    label: string;
    title: string;
    primary: Cta;
    secondary: Cta;
    scrollCue: string;
    /** The film held in the hero's panel. */
    video: VideoAsset;
    caption: string;
  };
  mechanism: MechanismContent;
  /** Annotations shared by the plan drawings. */
  planLabels: PlanLabels;
  cabinPlanLabels: CabinPlanLabels;
  lead: {
    lines: string[];
    primary: Cta;
    secondary: Cta;
    /** The interior held in the panel beside the statement. */
    media: MediaAsset;
    caption: string;
  };
  staircaseStays: {
    titleA: string;
    titleB: string;
    body: string;
    drawingTitle: string;
    drawingDesc: string;
    note: string;
  };
  comparison: {
    title: string;
    items: ComparisonItem[];
    note: string;
    dragHint: string;
  };
  howItWorks: {
    title: string;
    steps: Step[];
    note: string;
  };
  underTheStaircase: {
    title: string;
    body: string[];
    before: string;
    after: string;
    planTitle: string;
    planDesc: string;
    sectionTitle: string;
    sectionDesc: string;
    note: string;
    cta: Cta;
  };
  inYourHome: {
    title: string;
    body: string;
    image: MediaAsset;
    imageLabel: string;
    /** A second, smaller interior beside the closing statement. */
    detail: MediaAsset;
    detailLabel: string;
    statement: string;
    sequence: SequenceAsset;
    sequenceCaption: string;
    /** The line held over the film. */
    filmStatement: string;
    cta: Cta;
  };
  everydayUse: {
    title: string;
    intro: string;
    situations: Situation[];
    planTitle: string;
    planDesc: string;
    note: string;
  };
  safety: {
    titleA: string;
    titleB: string;
    intro: string;
    /** Short label on the marked area of the drawing. */
    zoneLabel: string;
    behaviours: Array<{ id: string; title: string; body: string }>;
    figureTitle: string;
    figureDesc: string;
    note: string;
  };
  design: {
    title: string;
    body: string;
    materials: Material[];
    materialsNote: string;
    boardLabel: string;
    referenceLabel: string;
    finishLabel: string;
    cta: Cta;
  };
  projects: {
    title: string;
    body: string;
    cta: Cta;
    /** What each kind of entry is called in the gallery. */
    kinds: Record<ProjectKind, string>;
    /** One line under the gallery while no installation exists. */
    placeholderLabel: string;
    dragHint: string;
  };
  installation: {
    title: string;
    body: string;
    steps: Step[];
    /** A photograph per run of stages, shown from `fromStep` onwards. */
    media: Array<{ fromStep: number; asset: MediaAsset; caption: string }>;
    sheetTitle: string;
    sheetDesc: string;
    note: string;
    cta: Cta;
  };
  evidence: {
    title: string;
    body: string;
    items: EvidenceItem[];
    statusLabels: Record<EvidenceStatus, string>;
  };
  finalCta: {
    title: string;
    body: string;
    primary: Cta;
    secondary: Cta;
    video: VideoAsset;
    caption: string;
  };
}

/* ------------------------------------------------------------------ */
/* Recurring content types, managed by the admin.                       */
/* ------------------------------------------------------------------ */

export type ProjectKind = "installation" | "visualisation" | "reference";

export interface Project {
  id: string;
  slug: string;
  title: string;
  /** Country or region, or a note that the location is to follow. */
  location: string;
  summary: string;
  media: MediaAsset;
  kind: ProjectKind;
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
  /** Where the answer belongs; the same FAQ feeds several pages. */
  topics: Array<"product" | "design" | "home" | "installation" | "information" | "dealer">;
}

export interface Country {
  code: string;
  name: string;
  /** Locale used for this market when translations exist. */
  locale: Locale;
  /** Whether dealers can be listed here yet. */
  active: boolean;
}

export interface Region {
  id: string;
  countryCode: string;
  name: string;
}

export interface Dealer {
  id: string;
  name: string;
  countryCode: string;
  regionId?: string;
  city: string;
  postcode?: string;
  address?: string;
  contactName?: string;
  phone?: string;
  email?: string;
  website?: string;
  showroom: boolean;
  demoAvailable: boolean;
  /** Postcode prefixes or towns the dealer serves. */
  serviceArea: string[];
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
  /** e.g. "PDF, 2 MB" once the file exists. */
  meta?: string;
  placeholder: boolean;
}

export type DesignGroup = "cabin" | "staircase" | "materials" | "finishes" | "flooring" | "controls";

export interface DesignOption {
  id: string;
  group: DesignGroup;
  name: string;
  description: string;
  media?: MediaAsset;
  placeholder: boolean;
}

export interface LandingPage {
  id: string;
  slug: string;
  locale: Locale;
  countryCode?: string;
  regionId?: string;
  title: string;
  description: string;
  /** Sections composed from the site's own blocks, by id. */
  blocks: string[];
  noindex: boolean;
  placeholder: boolean;
}

/* ------------------------------------------------------------------ */
/* Secondary pages.                                                     */
/* ------------------------------------------------------------------ */

export interface PageIntroContent {
  title: string;
  body: string;
  note: string;
}

/** What fills the sheet beside a page's statement: a drawing or a picture. */
export interface PageAside {
  drawing?: "section" | "plan";
  media?: MediaAsset;
  caption: string;
  /** Title and description for a drawing, read by screen readers. */
  title: string;
  desc: string;
}

export interface PageOpeningContent {
  eyebrow: string;
  title: string;
  lead: string;
  /** Fills the column beside the statement. */
  aside?: PageAside;
  /** A large picture or film under the statement. */
  media?: MediaAsset;
  video?: VideoAsset;
  caption?: string;
}

export interface TextBlock {
  title: string;
  paragraphs: string[];
}

export interface SpecRow {
  topic: string;
  status: string;
  placeholder: boolean;
}

export interface ConfigurationItem {
  id: string;
  name: string;
  body: string;
  placeholder: boolean;
}

export interface PagesContent {
  theHomelift: {
    opening: PageOpeningContent;
    mechanism: MechanismContent;
    blocks: TextBlock[];
    faqTitle: string;
  };
  design: {
    opening: PageOpeningContent;
    areas: TextBlock[];
    optionsTitle: string;
    optionsNote: string;
    groupLabels: Record<DesignGroup, string>;
    configuratorNote: string;
  };
  inYourHome: {
    opening: PageOpeningContent;
    blocks: TextBlock[];
    configurationsTitle: string;
    configurationsNote: string;
    configurations: ConfigurationItem[];
    examplesTitle: string;
    examplesNote: string;
  };
  installation: {
    opening: PageOpeningContent;
    blocks: TextBlock[];
    serviceTitle: string;
    serviceBody: string;
    servicePlaceholder: string;
  };
  inspiration: {
    opening: PageOpeningContent;
    kinds: Record<ProjectKind, string>;
    testimonialsTitle: string;
    testimonialsNote: string;
  };
  information: {
    opening: PageOpeningContent;
    specsTitle: string;
    specsNote: string;
    specs: SpecRow[];
    statusLabel: string;
    downloadsTitle: string;
    downloadsNote: string;
    downloadKinds: Record<Download["kind"], string>;
    /** The action on a download that exists, and the note on one that does not. */
    downloadLabel: string;
    pendingLabel: string;
    faqTitle: string;
    professionalsTitle: string;
    professionalsBody: string;
  };
  findADealer: {
    opening: PageOpeningContent;
    locatorTitle: string;
    locatorBody: string;
    countryLabel: string;
    regionLabel: string;
    anyRegion: string;
    searchLabel: string;
    searchPlaceholder: string;
    searchButton: string;
    resultsLabel: string;
    noDealers: string;
    inactiveCountry: string;
    showroomLabel: string;
    demoLabel: string;
    serviceAreaLabel: string;
    showroomTitle: string;
    showroomBody: string;
    requestTitle: string;
    requestBody: string;
    form: {
      name: string;
      email: string;
      phone: string;
      country: string;
      postcode: string;
      interest: string;
      interests: Array<{ value: string; label: string }>;
      message: string;
      submit: string;
      sending: string;
      success: string;
      unrouted: string;
      invalid: string;
      error: string;
      /** One line per field the form can refuse. */
      errors: { name: string; email: string; country: string; postcode: string; interest: string };
      privacy: string;
      privacyLink: string;
      notConnected: string;
    };
  };
}
