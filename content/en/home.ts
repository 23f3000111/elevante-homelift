import { image, sequence, video } from "../media";
import type { HomeContent } from "../types";

/**
 * Homepage copy, in the brief's hierarchy: benefit, recognition, possibility,
 * the Elevante solution, proof. Facts come from the brief only. Where the
 * client has not yet supplied something, the copy says so.
 */
export const home: HomeContent = {
  hero: {
    title: "Comfortably and safely remain living in your own home.",
    lead: "When using the stairs becomes difficult, this does not have to mean that parts of your home can no longer be used. With the Elevante Homelift, all floors remain accessible.",
    primary: { label: "See how it works", href: "#product" },
    secondary: { label: "View examples", href: "#in-your-home" },
    video: video("video-design-cabin"),
    caption: "Visualisation. Product film to follow.",
    scrollCue: "Scroll",
  },

  productReveal: {
    index: "01",
    indexLabel: "The product",
    title: "A lift inside the staircase.",
    lines: [
      "The Elevante Homelift is an integrated system in which the staircase and lift come together.",
      "The cabin travels in the space underneath the staircase. The staircase itself stays in place, and in use.",
    ],
    sequence: sequence("video-cabin-moving"),
    caption: "Visualisation. Product film to follow.",
    diagramNote: "Schematic. Not to scale.",
    states: ["Cabin at the lower level", "Cabin travelling", "Cabin at the upper floor"],
    frameLabel: "Frame",
  },

  idea: {
    index: "02",
    indexLabel: "The idea",
    title: "The staircase stays. The way you move through it changes.",
    body: "A stairlift adds a visible aid to the staircase. A conventional homelift needs its own position in the house. Elevante uses the space the staircase already occupies, so the house keeps its plan and the staircase keeps its purpose.",
    media: image("stair-spiral-above"),
  },

  howItWorks: {
    index: "03",
    indexLabel: "How it works",
    title: "How it works",
    intro: "Three stages, each of them visible in the house.",
    diagramNote: "Schematic section. Not to scale.",
    steps: [
      {
        number: "01",
        title: "Enter",
        body: "At the lower level the cabin waits in the space beneath the staircase. Its door opens and you step, or wheel, inside.",
      },
      {
        number: "02",
        title: "Move",
        body: "The cabin travels vertically beneath the flight. While it is away from a level, an automatic door keeps that opening closed.",
      },
      {
        number: "03",
        title: "Arrive",
        body: "At the upper floor an automatic door closes the stair opening whenever the cabin is elsewhere. When the cabin arrives, the door opens onto the landing.",
      },
    ],
  },

  underTheStaircase: {
    index: "04",
    indexLabel: "The space",
    title: "Designed around the space you already have.",
    body: [
      "In many existing homes there is no spare position for a conventional homelift. Elevante does not need one: the cabin uses the space underneath the staircase.",
      "That is what makes a homelift possible in houses where the available space would otherwise rule one out.",
    ],
    sequence: sequence("video-home-integration"),
    caption: "Visualisation. Product film to follow.",
    overlay: { staircase: "Staircase", cabin: "Cabin", space: "Space beneath the staircase" },
    comparison: {
      title: "The same house, in plan",
      conventional: {
        title: "Conventional homelift",
        body: "Needs a separate position in the house.",
      },
      elevante: {
        title: "Elevante Homelift",
        body: "The cabin uses the space underneath the staircase.",
      },
    },
  },

  inYourHome: {
    index: "05",
    indexLabel: "In your home",
    title: "A lift that belongs in your home.",
    body: "Elevante is designed as part of the interior, in the way a staircase already is. Cabin, materials and finishes are chosen to suit the house.",
    cta: { label: "See how it fits", href: "/in-your-home" },
    gallery: [
      { media: image("stair-gold-hall"), label: "Entrance hall, stone and brass" },
      { media: image("stair-oak-screen"), label: "Curved stair behind an oak screen" },
      { media: video("video-home-integration").poster, label: "Cabin beside floating oak stairs", caption: "Visualisation" },
      { media: image("stair-dark-wood"), label: "Curved stair, dark timber" },
      { media: video("video-design-cabin").poster, label: "Steel-framed doors in a stone wall", caption: "Visualisation" },
      { media: image("stair-spiral-above"), label: "Spiral, seen from above" },
    ],
  },

  everydayUse: {
    index: "06",
    indexLabel: "Everyday use",
    title: "Everyday use",
    intro: "What happens, day to day. Choose a situation, or scroll.",
    visualisationLabel: "Visualisation",
    schematicLabel: "Schematic",
    situations: [
      {
        id: "enter",
        title: "Enter",
        body: "The cabin door opens automatically. You walk in, or wheel in, from the hall.",
        media: image("lift-couple"),
      },
      {
        id: "move",
        title: "Move",
        body: "The cabin travels beneath the staircase from one floor to the next.",
        figure: "move",
      },
      {
        id: "doors",
        title: "Doors",
        body: "Doors open when the cabin arrives and close when it leaves.",
        figure: "doors",
      },
      {
        id: "opening",
        title: "Stair opening",
        body: "At the upper floor, an automatic door closes the stair opening whenever the cabin is elsewhere.",
        figure: "stair-opening",
      },
      {
        id: "rollator",
        title: "Rollator",
        body: "The cabin is designed to take a rollator, with the person using it.",
        figure: "rollator",
      },
      {
        id: "wheelchair",
        title: "Wheelchair",
        body: "The cabin is designed to take a wheelchair.",
        media: image("lift-wheelchair"),
      },
      {
        id: "assist",
        title: "Assistance",
        body: "There is room for a second person when assistance is needed.",
        figure: "two-people",
      },
    ],
    safetyTitle: "Movement detection",
    safety:
      "The system detects movement on or around the staircase. The lift will not start when movement is detected, and stops immediately if movement is detected during travel.",
  },

  design: {
    index: "07",
    indexLabel: "Design",
    title: "Designed to belong.",
    body: "Cabin, walls, floor and controls are available in a choice of materials and finishes, so the lift reads as part of the interior rather than an addition to it.",
    video: video("video-design-cabin"),
    caption: "Visualisation. Product film to follow.",
    materialsNote: "Material references. The Elevante range will be published on the Design page.",
    materials: [
      { name: "Oak", media: image("material-oak") },
      { name: "Stone", media: image("material-stone") },
      { name: "Metal", media: image("material-metal") },
    ],
    cta: { label: "See design options", href: "/design" },
  },

  projects: {
    index: "08",
    indexLabel: "Projects",
    title: "Made for real homes.",
    body: "Installations will appear here as the first homes are completed. Until then, these interiors show the kind of houses Elevante is designed for.",
    cta: { label: "More inspiration", href: "/inspiration" },
    placeholderLabel: "Reference interior, not an Elevante installation",
    locationPlaceholder: "Location to follow",
    visualisationLabel: "Visualisation",
  },

  installation: {
    index: "09",
    indexLabel: "Installation",
    title: "From first conversation to handover.",
    body: "Elevante is installed in existing homes by authorised dealers. The process is planned around your house.",
    steps: [
      { number: "01", title: "Consultation", body: "A first conversation about your house, your staircase and what you need." },
      { number: "02", title: "Assessment", body: "The dealer looks at the house and the staircase to confirm what is possible." },
      { number: "03", title: "Measurement", body: "The staircase and its surroundings are measured precisely." },
      { number: "04", title: "Configuration", body: "You choose the configuration, the materials and the finishes." },
      { number: "05", title: "Preparation", body: "The house is prepared for the installation." },
      { number: "06", title: "Installation", body: "The integrated staircase and lift are installed." },
      { number: "07", title: "Handover", body: "The system is commissioned, explained and handed over to you." },
    ],
    media: [image("consultation"), image("survey-measuring"), image("installation-drawing")],
    cta: { label: "About installation", href: "/installation" },
  },

  trust: {
    index: "10",
    indexLabel: "Facts",
    title: "Facts you can check.",
    body: "Elevante Homelift is a new product. Confidence should come from what can be shown, so this section grows as installations, certification and customer experiences become available.",
    items: [
      {
        title: "Movement detection",
        body: "The lift will not start when movement is detected on or around the staircase, and stops immediately if movement is detected during travel.",
        highlight: true,
      },
      {
        title: "The staircase remains in use",
        body: "The staircase stays a normal part of the house. Everyone in the household uses it as before.",
      },
      {
        title: "Closed openings",
        body: "Automatic doors close the opening at each level whenever the cabin is elsewhere.",
      },
      {
        title: "Developed in the Netherlands",
        body: "Elevante Homelift is developed by Elevante Beheer BV for existing private homes, first in the Netherlands, then the UK and Germany.",
      },
      {
        title: "Certification",
        body: "Certification information will be published here when it is available.",
        placeholder: true,
      },
      {
        title: "See it in a showroom",
        body: "Authorised dealers will offer demonstrations. Locations will be listed as dealers are appointed.",
        placeholder: true,
      },
    ],
  },

  dealerCta: {
    title: "See Elevante in a real home.",
    body: "Authorised dealers handle the assessment, quotation, installation and service. The best way to judge Elevante is to see it and try it.",
    primary: { label: "Find a dealer", href: "/find-a-dealer" },
    secondary: { label: "Request information", href: "/find-a-dealer#request" },
    media: image("stair-gold-hall"),
  },
};
