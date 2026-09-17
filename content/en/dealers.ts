import type { Dealer } from "../types";

/**
 * No dealers have been appointed yet. The locator is built to list dealers
 * per country, region, city and postcode once Elevante adds them.
 */
export const dealers: Dealer[] = [];

/** Launch markets, in order, from the brief. */
export const markets = [
  { code: "NL", name: "Netherlands" },
  { code: "GB", name: "United Kingdom" },
  { code: "DE", name: "Germany" },
];
