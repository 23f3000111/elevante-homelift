import { image } from "../media";
import type { SiteContent } from "../types";

export const site: SiteContent = {
  name: "Elevante Homelift",
  legalName: "Elevante Beheer BV",
  description:
    "A homelift whose cabin travels in the space underneath the staircase, so that every floor of an existing home stays in use.",
  nav: [
    { label: "The Homelift", href: "/the-homelift", hint: "What it is and how it works" },
    { label: "Design", href: "/design", hint: "Cabin, staircase, materials, finishes" },
    { label: "In your home", href: "/in-your-home", hint: "Existing houses, the space beneath the stairs" },
    { label: "Installation", href: "/installation", hint: "Seven stages, from consultation to handover" },
    { label: "Inspiration", href: "/inspiration", hint: "Interiors, projects, experiences" },
    { label: "Information", href: "/information", hint: "Technical facts, downloads, questions" },
  ],
  dealerCta: { label: "Find a dealer", href: "/find-a-dealer" },
  menu: {
    open: "Menu",
    close: "Close",
    label: "Menu",
    media: image("stair-gold-hall"),
    mediaCaption: "Reference interior",
  },
  footer: {
    statement: "Comfortably and safely remain living in your own home.",
    groups: [
      {
        title: "Elevante",
        items: [
          { label: "The Homelift", href: "/the-homelift" },
          { label: "Design", href: "/design" },
          { label: "In your home", href: "/in-your-home" },
          { label: "Installation", href: "/installation" },
          { label: "Inspiration", href: "/inspiration" },
          { label: "Information", href: "/information" },
        ],
      },
      {
        title: "Dealers",
        items: [
          { label: "Find a dealer", href: "/find-a-dealer" },
          { label: "Request information", href: "/find-a-dealer#request" },
          { label: "Showrooms", href: "/find-a-dealer#showrooms" },
        ],
      },
      {
        title: "Legal",
        items: [
          { label: "Privacy", href: "/privacy" },
          { label: "Cookies", href: "/cookies" },
          { label: "Terms", href: "/terms" },
        ],
      },
    ],
    regionNote: "Netherlands, in English. Further countries and languages will follow.",
    contactNote: "Contact details for Elevante and its dealers will be published here.",
    legal: "Elevante Beheer BV. Elevante Homelift is a registered trade name.",
  },
  skipLink: "Skip to content",
};
