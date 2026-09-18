import type { Market } from "@/content/types";

/**
 * Where an information request goes. Until Elevante's CRM or dealer routing
 * exists, no endpoint is configured and the form says so rather than
 * claiming a message was sent.
 */
export const LEAD_ENDPOINT = process.env.NEXT_PUBLIC_LEAD_ENDPOINT ?? "";

export interface LeadRequest {
  name: string;
  email: string;
  country: string;
  postcode: string;
  message: string;
  /** Where the visitor came from, for marketing analysis. */
  source: string;
}

export type LeadField = "name" | "email" | "country" | "postcode";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLead(lead: LeadRequest, markets: Market[]): Partial<Record<LeadField, string>> {
  const errors: Partial<Record<LeadField, string>> = {};
  if (lead.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!EMAIL.test(lead.email.trim())) errors.email = "Please enter a valid email address.";
  if (!markets.some((m) => m.code === lead.country)) errors.country = "Please choose a country.";
  if (lead.postcode.trim().length < 3) errors.postcode = "Please enter your postcode.";
  return errors;
}

/** Sends the request if an endpoint is configured. Returns whether it was sent. */
export async function sendLead(lead: LeadRequest): Promise<boolean> {
  if (!LEAD_ENDPOINT) return false;
  const res = await fetch(LEAD_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...lead, receivedAt: new Date().toISOString() }),
  });
  if (!res.ok) throw new Error(`Lead endpoint responded ${res.status}`);
  return true;
}
