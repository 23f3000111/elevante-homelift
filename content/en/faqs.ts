import type { Faq } from "../types";

/** Answers are limited to what the brief states. Topics decide which pages show each one. */
export const faqs: Faq[] = [
  {
    id: "faq-what",
    question: "What is the Elevante Homelift?",
    answer:
      "An integrated system in which the staircase and lift are designed to work together. The lift cabin travels in the space underneath the staircase, so a homelift becomes possible in existing houses where a conventional lift would be difficult to accommodate.",
    topics: ["product", "information"],
  },
  {
    id: "faq-stairs",
    question: "Does the staircase stay?",
    answer: "Yes. The staircase remains a normal, usable part of the house.",
    topics: ["product", "home", "information"],
  },
  {
    id: "faq-doors",
    question: "What happens to the openings when the cabin is elsewhere?",
    answer:
      "They are protected by automatic doors. At the upper floor an automatic door closes the stair opening when the cabin is elsewhere; at the lower level the opening is closed in the same way when the cabin moves upwards.",
    topics: ["product", "information"],
  },
  {
    id: "faq-wheelchair",
    question: "Can it be used with a rollator or wheelchair?",
    answer:
      "The cabin is designed for everyday requirements, including use with a rollator, a wheelchair, or another person providing assistance.",
    topics: ["product", "information"],
  },
  {
    id: "faq-safety",
    question: "What if someone is on the stairs?",
    answer:
      "The system detects movement on or around the staircase. The lift will not start when movement is detected and stops immediately if movement is detected during travel.",
    topics: ["product", "information"],
  },
  {
    id: "faq-existing",
    question: "Is it for existing houses?",
    answer:
      "Yes. Elevante is developed for existing private homes. Because the cabin uses the space underneath the staircase, it can be installed where a separate lift position would be difficult or impossible to find.",
    topics: ["home", "installation", "information"],
  },
  {
    id: "faq-who",
    question: "Who installs it?",
    answer: "Authorised local dealers handle the site assessment, quotation, installation and subsequent service.",
    topics: ["installation", "dealer", "information"],
  },
  {
    id: "faq-design",
    question: "Can the cabin match my interior?",
    answer:
      "The product offers choices in finishes, materials and cabin design, so that Elevante becomes part of the interior rather than an added mobility device. The range is published on the Design page as it is released.",
    topics: ["design", "information"],
  },
  {
    id: "faq-specs",
    question: "Where are the dimensions and technical specifications?",
    answer:
      "Detailed dimensions, configurations, finishes, technical specifications and certification information will be published on the Information page as they are released.",
    topics: ["information", "home"],
  },
  {
    id: "faq-try",
    question: "Can I see and try one?",
    answer: "Dealers offering showroom demonstrations will be listed in the dealer locator as they are appointed.",
    topics: ["dealer", "information"],
  },
];
