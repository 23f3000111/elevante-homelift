import type { PageIntroContent } from "../types";

/**
 * Intro copy for the routes the navigation points to. Each page exists so
 * that no link is dead; the full pages are built next.
 */
export const pages: Record<string, PageIntroContent> = {
  "the-homelift": {
    title: "The Homelift",
    body: "How the integrated staircase and lift work, stage by stage, and what that means in an existing house.",
    note: "This page is being prepared. The homepage explains the system in outline.",
  },
  design: {
    title: "Design",
    body: "Cabin, staircase, materials, colours, finishes, flooring, controls and the combinations that suit different interiors.",
    note: "The Elevante range of finishes and materials will be published here when it is released.",
  },
  "in-your-home": {
    title: "In your home",
    body: "How Elevante is incorporated into existing houses, and examples of installations and configurations.",
    note: "Installation examples will follow the first completed homes.",
  },
  installation: {
    title: "Installation",
    body: "From the first conversation to handover: assessment, measurement, configuration, preparation, installation, commissioning, and service.",
    note: "This page is being prepared. The homepage sets out the seven stages.",
  },
  inspiration: {
    title: "Inspiration",
    body: "Photography, examples and, in time, customer experiences.",
    note: "Projects and customer stories will be added as installations are completed.",
  },
  information: {
    title: "Information",
    body: "Technical specifications, downloads, questions and answers, and detailed information for homeowners, family members, architects and contractors.",
    note: "Dimensions, capacities, drawings and certification will be published here as they are released.",
  },
  "find-a-dealer": {
    title: "Find a dealer",
    body: "Authorised dealers handle assessment, quotation, installation and service, and can arrange for you to see and try an Elevante Homelift.",
    note: "Dealers for the Netherlands, the United Kingdom and Germany will be listed here as they are appointed.",
  },
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
