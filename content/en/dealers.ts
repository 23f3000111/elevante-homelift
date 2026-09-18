import type { Country, Dealer, Region } from "../types";

/**
 * Launch markets, in order, from the brief. A country becomes `active` when
 * dealers can be listed there; until then the locator says so and offers
 * the request form instead.
 */
export const countries: Country[] = [
  { code: "NL", name: "Netherlands", locale: "en", active: true },
  { code: "GB", name: "United Kingdom", locale: "en", active: true },
  { code: "DE", name: "Germany", locale: "en", active: true },
];

/** Regions are optional per country; they narrow a search and route leads. */
export const regions: Region[] = [
  { id: "nl-north", countryCode: "NL", name: "North" },
  { id: "nl-east", countryCode: "NL", name: "East" },
  { id: "nl-west", countryCode: "NL", name: "West" },
  { id: "nl-south", countryCode: "NL", name: "South" },
  { id: "gb-england", countryCode: "GB", name: "England" },
  { id: "gb-scotland", countryCode: "GB", name: "Scotland" },
  { id: "gb-wales", countryCode: "GB", name: "Wales" },
  { id: "gb-ni", countryCode: "GB", name: "Northern Ireland" },
  { id: "de-north", countryCode: "DE", name: "North" },
  { id: "de-west", countryCode: "DE", name: "West" },
  { id: "de-south", countryCode: "DE", name: "South" },
  { id: "de-east", countryCode: "DE", name: "East" },
];

/**
 * No dealers have been appointed yet. The locator lists dealers per
 * country, region, city and postcode once Elevante adds them here (or in
 * the admin); every field the brief asks for is on the record.
 */
export const dealers: Dealer[] = [];
