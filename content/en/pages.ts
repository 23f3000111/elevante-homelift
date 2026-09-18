import { image, video } from "../media";
import type { PageIntroContent, PagesContent } from "../types";
import { mechanism } from "./home";

/**
 * Secondary pages. Each opens with a statement and a lead in the brief's
 * voice, carries its own visual system, and says plainly what is still to
 * be published.
 */
export const pagesContent: PagesContent = {
  theHomelift: {
    opening: {
      eyebrow: "The Homelift",
      title: "The staircase and the lift, as one system.",
      lead: "The Elevante Homelift is designed together with the staircase. The cabin travels in the space underneath it, arrives at the upper floor, and leaves the staircase exactly as it was: a normal part of the house.",
    },
    mechanism,
    blocks: [
      {
        title: "What it is",
        paragraphs: [
          "An integrated system in which the staircase and lift are designed to work together. The lift cabin travels in the space underneath the staircase.",
          "This makes a homelift possible in existing houses where the available space would otherwise make a conventional lift difficult to accommodate.",
        ],
      },
      {
        title: "What stays the same",
        paragraphs: [
          "The staircase remains a normal, usable part of the house for everyone in the household.",
          "When the lift is not at a level, that opening is protected by an automatic door. At the upper floor, an automatic door closes the stair opening when the cabin is elsewhere; at the lower level the opening is closed in the same way when the cabin moves upwards.",
        ],
      },
      {
        title: "Who it is for",
        paragraphs: [
          "Owners of existing multi-storey private homes who want to continue living comfortably and safely in their own home, and who value their house and its interior. The cabin is designed for everyday requirements, including use with a rollator, a wheelchair, or another person providing assistance.",
        ],
      },
    ],
    faqTitle: "Questions homeowners ask",
  },

  design: {
    opening: {
      eyebrow: "Design",
      title: "Part of the interior, not an addition to it.",
      lead: "Cabin, staircase, materials, finishes, flooring, controls and details are chosen so the system belongs to the house it is installed in. The full range is published here as it is released.",
      video: video("video-design-cabin"),
      caption: "Visualisation. Product photography to follow.",
    },
    areas: [
      {
        title: "Cabin",
        paragraphs: ["The cabin's appearance: its frame, its glazing, its proportions. Options will be published when the range is released."],
      },
      {
        title: "Staircase",
        paragraphs: ["The cabin and the staircase are decided together, so the two read as one piece of joinery rather than a lift beside a stair."],
      },
      {
        title: "Materials and finishes",
        paragraphs: ["Walls, side finishes, flooring, colours and metalwork in a choice of materials suited to different interiors, from period houses to new builds."],
      },
      {
        title: "Controls and details",
        paragraphs: ["Controls, handrails, lighting and door details follow the same restraint as the rest of the cabin."],
      },
    ],
    optionsTitle: "Design options",
    optionsNote: "Each group lists the Elevante range when it is released. Until then, the materials shown are references, not product finishes.",
    groupLabels: {
      cabin: "Cabin",
      staircase: "Staircase",
      materials: "Materials",
      finishes: "Finishes",
      flooring: "Flooring",
      controls: "Controls and details",
    },
    configuratorNote: "The options are structured so that a configurator can be added later without rebuilding the page.",
  },

  inYourHome: {
    opening: {
      eyebrow: "In your home",
      title: "Made for the house you already live in.",
      lead: "Elevante is for existing homes. It uses the space underneath the staircase, so a lift becomes possible where a separate lift position would not fit.",
      media: image("stair-gold-hall"),
      caption: "Reference interior. No Elevante installation is shown.",
    },
    blocks: [
      {
        title: "Existing houses",
        paragraphs: [
          "In many existing homes there is no spare position for a conventional homelift, and a stairlift adds a visible aid to the staircase. Elevante takes a third route: the cabin travels within the space the staircase already occupies.",
        ],
      },
      {
        title: "Architectural integration",
        paragraphs: [
          "The lift is designed as part of the interior, in the way a staircase already is. Cabin, materials and finishes are chosen to suit the house.",
        ],
      },
    ],
    configurationsTitle: "Configurations",
    configurationsNote: "The applicable staircase and cabin configurations, with drawings, will be published here and on the Information page. Your dealer confirms what is possible in your house during the assessment.",
    configurations: [
      { id: "cfg-straight", name: "Straight flight", body: "The configuration drawn throughout this site: a straight staircase with the cabin beneath its head.", placeholder: false },
      { id: "cfg-other", name: "Further configurations", body: "Other staircase types and cabin arrangements will be listed as they are confirmed.", placeholder: true },
    ],
    examplesTitle: "Examples",
    examplesNote: "Installation examples will appear here as the first homes are completed. The interiors shown are reference interiors and visualisations.",
  },

  installation: {
    opening: {
      eyebrow: "Installation",
      title: "What installing Elevante means for your house.",
      lead: "Seven stages, from the first conversation to handover, all handled by an authorised dealer. The detail is practical, not construction methodology.",
      media: image("consultation"),
      caption: "Visualisation.",
    },
    blocks: [
      {
        title: "Who does the work",
        paragraphs: [
          "Authorised local dealers handle the site assessment, quotation, installation and subsequent service. Elevante remains the source for the product, the design and the proposition.",
        ],
      },
      {
        title: "Before installation",
        paragraphs: [
          "The dealer assesses the house and the staircase, measures precisely, and agrees the configuration, materials and finishes with you before anything is ordered.",
        ],
      },
      {
        title: "Installation and handover",
        paragraphs: [
          "The house is prepared, the integrated staircase and lift are installed, and the system is commissioned, explained and handed over to you.",
        ],
      },
    ],
    serviceTitle: "Service and maintenance",
    serviceBody: "Service and maintenance are arranged through your dealer.",
    servicePlaceholder: "Details of the service programme will be published here as they are confirmed.",
  },

  inspiration: {
    opening: {
      eyebrow: "Inspiration",
      title: "Homes, staircases, and the space beneath them.",
      lead: "Photography, examples and, in time, customer experiences. Everything shown before the first installations is a reference interior or a visualisation, and is labelled as such.",
    },
    kinds: {
      installation: "Elevante installation",
      visualisation: "Visualisation",
      reference: "Reference interior",
    },
    testimonialsTitle: "Customer experiences",
    testimonialsNote: "Real experiences from the first installations will be published here. Nothing is invented in the meantime.",
  },

  information: {
    opening: {
      eyebrow: "Information",
      title: "The facts, as they are released.",
      lead: "Technical specifications, downloads and answers for homeowners, family members, architects and contractors. Each item below shows its current status.",
    },
    specsTitle: "Technical information",
    specsNote: "Elevante publishes each item here once it is confirmed. No figure appears before then.",
    statusLabel: "Status",
    specs: [
      { topic: "Dimensions", status: "To be published", placeholder: true },
      { topic: "Load and capacity", status: "To be published", placeholder: true },
      { topic: "Travel", status: "To be published", placeholder: true },
      { topic: "Doors", status: "Automatic doors close each opening whenever the cabin is elsewhere.", placeholder: false },
      { topic: "Power requirements", status: "To be published", placeholder: true },
      { topic: "Applicable configurations", status: "To be published", placeholder: true },
      { topic: "Drawings", status: "To be published", placeholder: true },
      { topic: "Installation requirements", status: "To be published", placeholder: true },
      {
        topic: "Safety systems",
        status: "Movement detection on or around the staircase: the lift will not start when movement is detected and stops immediately if movement is detected during travel.",
        placeholder: false,
      },
      { topic: "Certification", status: "To be published", placeholder: true },
    ],
    downloadsTitle: "Downloads",
    downloadsNote: "Brochures, product, technical and installation information and drawings will be available here.",
    downloadKinds: {
      brochure: "Brochure",
      product: "Product information",
      technical: "Technical information",
      installation: "Installation information",
      drawing: "Drawings",
    },
    faqTitle: "Questions and answers",
    professionalsTitle: "For architects and contractors",
    professionalsBody: "Drawings, installation requirements and technical documentation for professionals will be published on this page alongside the consumer information, so the same facts serve everyone involved in a decision.",
  },

  findADealer: {
    opening: {
      eyebrow: "Find a dealer",
      title: "See it, try it, talk to someone who installs it.",
      lead: "Authorised dealers handle assessment, quotation, installation and service, and can arrange for you to see and try an Elevante Homelift.",
    },
    locatorTitle: "Dealers near you",
    locatorBody: "Choose your country, then a region or a postcode or town. Dealers are listed as they are appointed, starting with the Netherlands, then the United Kingdom and Germany.",
    countryLabel: "Country",
    regionLabel: "Region",
    anyRegion: "Any region",
    searchLabel: "Postcode or town",
    searchPlaceholder: "For example 1012 or Utrecht",
    searchButton: "Search",
    resultsLabel: "Dealers",
    noDealers: "No dealers are listed yet for this search in {country}. Leave your details below and Elevante will contact you when a dealer is appointed near you.",
    inactiveCountry: "Dealers are not yet appointed in {country}. Leave your details below and Elevante will contact you.",
    showroomLabel: "Showroom",
    demoLabel: "Demonstration available",
    serviceAreaLabel: "Service area",
    showroomTitle: "Showrooms and demonstrations",
    showroomBody: "Dealers offering showroom demonstrations are marked in the results. Seeing and trying the lift is the best way to judge it.",
    requestTitle: "Request information",
    requestBody: "Tell us where you live and what you would like to know. Your request goes to Elevante and, once appointed, to the authorised dealer for your area.",
    form: {
      name: "Your name",
      email: "Email address",
      phone: "Telephone (optional)",
      country: "Country",
      postcode: "Postcode",
      interest: "What would you like?",
      interests: [
        { value: "information", label: "Information about Elevante" },
        { value: "demo", label: "To see and try the Elevante Homelift" },
        { value: "assessment", label: "An assessment of my house" },
        { value: "professional", label: "Information as an architect, adviser or contractor" },
      ],
      message: "Anything else we should know? (optional)",
      submit: "Send request",
      sending: "Sending",
      success: "Thank you. Your request has been received.",
      unrouted: "This preview is not connected to Elevante's systems yet, so nothing was sent. Your details stayed in this browser.",
      invalid: "Please check the highlighted fields.",
      error: "The request could not be sent. Please try again, or contact a dealer directly.",
      errors: {
        name: "Please enter your name.",
        email: "Please enter a valid email address.",
        country: "Please choose a country.",
        postcode: "Please enter your postcode.",
        interest: "Please choose what you would like.",
      },
      privacy: "Your details are used only to answer this request.",
      privacyLink: "See the privacy statement.",
      notConnected: "Lead routing to Elevante and its dealers is the next integration; this form does not send yet.",
    },
  },
};

/** Intro copy for the legal routes, which are built out separately. */
export const legalPages: Record<string, PageIntroContent> = {
  privacy: {
    title: "Privacy",
    body: "How Elevante handles personal information.",
    note: "The privacy statement will be published here.",
  },
  cookies: {
    title: "Cookies",
    body: "Which cookies this site uses and why.",
    note: "The cookie statement will be published here.",
  },
  terms: {
    title: "Terms",
    body: "Terms of use for this website.",
    note: "The terms will be published here.",
  },
};
