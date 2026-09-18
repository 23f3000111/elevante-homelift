import { image, sequence, video } from "../media";
import type { HomeContent, MechanismContent } from "../types";

/**
 * Homepage copy, in the brief's hierarchy: benefit, recognition, possibility,
 * the Elevante solution, proof. Facts come from the brief only. Where the
 * client has not yet supplied something, the copy says so.
 */

/** The scroll-driven mechanism, shared by the homepage and The Homelift page. */
export const mechanism: MechanismContent = {
  states: [
    { id: "house", label: "The house", caption: "An existing house. Two floors, and a staircase between them." },
    { id: "section", label: "In section", caption: "Seen in section: the lower floor, the upper floor, and the opening the staircase rises into." },
    { id: "staircase", label: "The staircase", caption: "The staircase stays exactly where it is, and stays in use." },
    { id: "cabin", label: "The cabin", caption: "The cabin waits in the space beneath the head of the staircase." },
    { id: "enter", label: "Enter", caption: "The door opens. You walk in, or wheel in." },
    { id: "openings", label: "The openings", caption: "As the cabin leaves, the door at the lower level closes behind it. At the upper floor, the stair opening opens to receive it." },
    { id: "travel", label: "Travel", caption: "The cabin travels vertically through the space beneath the staircase." },
    { id: "arrive", label: "Arrive", caption: "The cabin arrives at the upper floor. When it leaves again, an automatic door closes the stair opening." },
    { id: "home", label: "At home", caption: "Staircase and lift, one system, in the house you already live in." },
  ],
  statement: "A lift inside the staircase.",
  note: "Schematic visualisation. Not to scale, and not a product drawing.",
  drawingLabels: {
    upperFloor: "Upper floor",
    lowerFloor: "Lower floor",
    staircase: "Staircase",
    space: "Space beneath the staircase",
    cabin: "Cabin",
    door: "Automatic door",
  },
  drawingTitle: "Section through a house showing the Elevante Homelift",
  drawingDesc:
    "A straight staircase rises from the lower floor to the upper floor. The lift cabin sits in the space beneath the head of the staircase and travels vertically to arrive at the upper floor through the stair opening. Automatic doors close each opening while the cabin is elsewhere.",
  railLabel: "Steps of the sequence",
};

export const home: HomeContent = {
  hero: {
    label: "Elevante / Homelift",
    title: "Comfortably and safely remain living in your own home.",
    primary: { label: "See how it works", href: "#mechanism-cabin" },
    secondary: { label: "Examples in homes", href: "/in-your-home" },
    scrollCue: "Scroll",
  },

  mechanism,

  planLabels: {
    staircase: "Staircase",
    cabin: "Elevante cabin",
    hall: "Hall",
    separate: "Separate lift position",
    stairlift: "Stairlift rail and seat",
    up: "Up",
  },
  cabinPlanLabels: { door: "Automatic door", cabin: "Cabin" },

  lead: {
    lines: [
      "When using the stairs becomes difficult, this does not have to mean that parts of your home can no longer be used. With the Elevante Homelift, all floors remain accessible, allowing you to continue living comfortably and safely in your own home.",
      "The Elevante Homelift is an integrated system in which the staircase and lift come together. This means the everyday use of the home can be retained even when moving between floors becomes more difficult.",
    ],
    primary: { label: "How it works", href: "/the-homelift" },
    secondary: { label: "Examples in homes", href: "/in-your-home" },
  },

  staircaseStays: {
    titleA: "The staircase doesn't move.",
    titleB: "The way you move through it does.",
    body: "A stairlift adds a visible aid to the staircase. A conventional homelift needs its own position in the house. Elevante uses the space the staircase already occupies, so the house keeps its plan and the staircase keeps its purpose.",
    drawingTitle: "Elevation of a staircase with the Elevante cabin travelling beneath it",
    drawingDesc: "The staircase is drawn once and does not change. The cabin travels from the lower floor to the upper floor beneath it.",
    note: "Schematic. Not to scale.",
  },

  comparison: {
    title: "Three ways to reach the upper floor.",
    items: [
      {
        id: "stairlift",
        name: "Stairlift",
        statement: "Visibly added to the staircase.",
        body: "The staircase stays in place, with a mobility aid mounted on it.",
      },
      {
        id: "conventional",
        name: "Conventional homelift",
        statement: "Requires separate space.",
        body: "Needs its own position in the house, and the floor space that goes with it. In many existing homes, that position is difficult or impossible to find.",
      },
      {
        id: "elevante",
        name: "Elevante Homelift",
        statement: "Integrated into the staircase.",
        body: "The cabin travels in the space underneath the staircase. The staircase remains a normal part of the house.",
      },
    ],
    note: "Schematic plans and sections. Not to scale.",
    dragHint: "Scroll to move sideways",
  },

  howItWorks: {
    title: "How it works",
    steps: [
      {
        number: "01",
        title: "Enter",
        body: "At the lower level the cabin waits beneath the head of the staircase. Its door opens and you step, or wheel, inside.",
      },
      {
        number: "02",
        title: "Move",
        body: "The cabin travels vertically. While it is away from a level, an automatic door keeps that opening closed.",
      },
      {
        number: "03",
        title: "Arrive",
        body: "At the upper floor the stair opening opens for the cabin. When the cabin leaves again, the automatic door closes it.",
      },
    ],
    note: "Schematic section. Not to scale.",
  },

  underTheStaircase: {
    title: "Designed around the space you already have.",
    body: [
      "In many existing homes there is no spare position for a conventional homelift. Elevante does not need one: the cabin uses the space underneath the staircase.",
      "That is what makes a homelift possible in houses where the available space would otherwise rule one out.",
    ],
    before: "The staircase today",
    after: "The staircase with Elevante",
    planTitle: "Plan of a hall with a straight staircase",
    planDesc: "Seen from above: a straight flight of stairs against a wall. With Elevante, the cabin occupies the footprint at the head of the flight, rather than a separate position elsewhere in the house.",
    sectionTitle: "Section through the same hall",
    sectionDesc: "The staircase in section, with the space beneath it. With Elevante, the cabin sits in that space and travels to the upper floor.",
    note: "Plan and section, schematic. Not to scale.",
    cta: { label: "How it fits in your home", href: "/in-your-home" },
  },

  inYourHome: {
    title: "Part of the house, in the way a staircase already is.",
    body: "Elevante is designed as part of the interior. Cabin, materials and finishes are chosen to suit the house, not the other way round.",
    image: image("stair-gold-hall"),
    imageLabel: "Reference interior. No Elevante installation is shown.",
    sequence: sequence("video-home-integration"),
    sequenceCaption: "Visualisation. It does not show the Elevante mechanism; a product film will replace it.",
    statement: "Every floor of the house stays in use.",
    cta: { label: "In your home", href: "/in-your-home" },
  },

  everydayUse: {
    title: "Everyday use",
    intro: "What happens, day to day.",
    situations: [
      {
        id: "enter",
        title: "Entering",
        body: "The cabin door opens automatically. You walk in from the hall, or wheel in.",
        figure: { occupant: "person", door: "open", focus: "door" },
      },
      {
        id: "move",
        title: "Moving",
        body: "The cabin travels between floors in the space beneath the staircase.",
        figure: { occupant: "person", door: "closed", focus: "cabin" },
      },
      {
        id: "doors",
        title: "Doors",
        body: "Doors open when the cabin arrives at a level and close when it leaves.",
        figure: { occupant: "person", door: "open", focus: "door" },
      },
      {
        id: "opening",
        title: "Stair opening",
        body: "At the upper floor, an automatic door closes the stair opening whenever the cabin is elsewhere.",
        figure: { occupant: "person", door: "closed", focus: "opening" },
      },
      {
        id: "rollator",
        title: "Rollator",
        body: "The cabin is designed to take a rollator, with the person using it.",
        figure: { occupant: "rollator", door: "open" },
      },
      {
        id: "wheelchair",
        title: "Wheelchair",
        body: "The cabin is designed to take a wheelchair.",
        figure: { occupant: "wheelchair", door: "open" },
      },
      {
        id: "assist",
        title: "Assistance",
        body: "There is room for a second person when assistance is needed.",
        figure: { occupant: "two-people", door: "open" },
      },
    ],
    planTitle: "Plan of the cabin",
    planDesc: "The cabin seen from above, with its door and the occupant for the chosen situation: a person, a person with a rollator, a person in a wheelchair, or two people.",
    note: "Cabin plan, schematic. Not to scale; dimensions to be published.",
  },

  safety: {
    titleA: "Every movement",
    titleB: "has a response.",
    intro: "The system detects movement on or around the staircase.",
    zoneLabel: "Movement detected here",
    behaviours: [
      {
        id: "before",
        title: "Before travel",
        body: "The lift will not start when movement is detected on or around the staircase.",
      },
      {
        id: "during",
        title: "During travel",
        body: "The lift stops immediately if movement is detected during travel.",
      },
      {
        id: "openings",
        title: "At each level",
        body: "Automatic doors protect each opening whenever the cabin is elsewhere.",
      },
    ],
    figureTitle: "Movement detection on and around the staircase",
    figureDesc: "The staircase in section with the area on and around it marked. When movement is detected there, the cabin does not start; if it is already travelling, it stops.",
    note: "Schematic. The marked area is illustrative.",
  },

  design: {
    title: "Designed to belong.",
    body: "Cabin, walls, floor and controls come in a choice of materials and finishes, so the lift reads as part of the interior rather than an addition to it.",
    boardLabel: "Material board",
    referenceLabel: "Reference material",
    finishLabel: "Elevante finish",
    materials: [
      {
        id: "oak",
        name: "Oak",
        media: video("video-home-integration").poster,
        swatch: image("material-oak"),
        note: "Timber treads and a timber-framed cabin, in a reference visualisation.",
        reference: true,
      },
      {
        id: "stone",
        name: "Stone",
        media: video("video-design-cabin").poster,
        swatch: image("material-stone"),
        video: video("video-design-cabin"),
        note: "Pale veined stone walls beside steel-framed doors, in a reference visualisation.",
        reference: true,
      },
      {
        id: "metal",
        name: "Metal",
        media: image("lift-bronze-cabin"),
        swatch: image("material-metal"),
        note: "Brushed bronze panels, in a reference interior.",
        reference: true,
      },
    ],
    materialsNote: "Reference materials, not Elevante finishes. The Elevante range is published on the Design page as it is released.",
    cta: { label: "Design options", href: "/design" },
  },

  projects: {
    title: "Made for real homes.",
    body: "Installations will appear here as the first homes are completed. Until then, these are reference interiors and visualisations: the kind of houses Elevante is designed for.",
    cta: { label: "More inspiration", href: "/inspiration" },
    kinds: { installation: "Elevante installation", visualisation: "Visualisation", reference: "Reference interior" },
    placeholderLabel: "None of these is an Elevante installation.",
    dragHint: "Scroll to move sideways",
  },

  installation: {
    title: "From first conversation to handover.",
    body: "Elevante is installed in existing homes by authorised dealers. Seven stages, planned around your house.",
    steps: [
      { number: "01", title: "Consultation", body: "A first conversation about your house, your staircase and what you need." },
      { number: "02", title: "Assessment", body: "The dealer looks at the house and the staircase to confirm what is possible." },
      { number: "03", title: "Measurement", body: "The staircase and its surroundings are measured precisely." },
      { number: "04", title: "Configuration", body: "You choose the configuration, the materials and the finishes." },
      { number: "05", title: "Preparation", body: "The house is prepared for the installation." },
      { number: "06", title: "Installation", body: "The integrated staircase and lift are installed." },
      { number: "07", title: "Handover", body: "The system is commissioned, explained and handed over to you." },
    ],
    sheetTitle: "The installation, as a drawing that fills in stage by stage",
    sheetDesc: "The house outline, then the staircase, dimension lines, material choices, the prepared space beneath the staircase, the cabin, and finally the completed system.",
    note: "Schematic. Not to scale.",
    cta: { label: "About installation", href: "/installation" },
  },

  evidence: {
    title: "Facts you can check.",
    body: "Elevante Homelift is a new product. Confidence should come from what can be shown, so this list grows as installations, certification and customer experiences become available.",
    items: [
      { title: "How it works", body: "The mechanism, explained in section and in plan.", status: "shown", href: "/the-homelift" },
      { title: "Safety behaviour", body: "Movement detection before and during travel; automatic doors at each opening.", status: "stated", href: "/the-homelift#safety" },
      { title: "Everyday use", body: "Rollator, wheelchair and assisted use.", status: "stated", href: "/the-homelift#everyday-use" },
      { title: "Installation", body: "The seven stages, and who carries them out.", status: "stated", href: "/installation" },
      { title: "Real installations", body: "Photography of completed homes.", status: "to-follow", href: "/inspiration" },
      { title: "Operating video", body: "Film of the system in use.", status: "to-follow" },
      { title: "Certification", body: "Published on the Information page when available.", status: "to-follow", href: "/information" },
      { title: "Customer experiences", body: "Specific, from the first homes.", status: "to-follow", href: "/inspiration" },
      { title: "Showrooms", body: "Dealers offering demonstrations.", status: "to-follow", href: "/find-a-dealer" },
    ],
    statusLabels: {
      shown: "On this site",
      stated: "Stated by Elevante",
      "to-follow": "To follow",
    },
  },

  finalCta: {
    title: "See Elevante in a real home.",
    body: "Authorised dealers handle assessment, quotation, installation and service, and can arrange for you to see and try the Elevante Homelift.",
    primary: { label: "Find your local dealer", href: "/find-a-dealer" },
    secondary: { label: "Request information", href: "/find-a-dealer#request" },
    video: video("video-cabin-moving"),
    caption: "Visualisation. Product film to follow.",
  },
};
