import type { Country } from "@/content/types";

/**
 * Where an information request goes. Until Elevante's CRM or dealer routing
 * exists, no endpoint is configured and the form says so rather than
 * claiming a message was sent. The payload carries everything routing
 * needs: country, postcode, interest and the lead's source.
 */
export const LEAD_ENDPOINT = process.env.NEXT_PUBLIC_LEAD_ENDPOINT ?? "";

export interface LeadRequest {
  name: string;
  email: string;
  phone: string;
  country: string;
  postcode: string;
  interest: string;
  message: string;
  /** Where the visitor came from, for marketing analysis. */
  source: string;
  /** The page the request was made from. */
  page: string;
}

export type LeadField = "name" | "email" | "country" | "postcode" | "interest";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface LeadMessages {
  name: string;
  email: string;
  country: string;
  postcode: string;
  interest: string;
}

export function validateLead(lead: LeadRequest, countries: Country[], interests: string[], messages: LeadMessages): Partial<Record<LeadField, string>> {
  const errors: Partial<Record<LeadField, string>> = {};
  if (lead.name.trim().length < 2) errors.name = messages.name;
  if (!EMAIL.test(lead.email.trim())) errors.email = messages.email;
  if (!countries.some((c) => c.code === lead.country)) errors.country = messages.country;
  if (lead.postcode.trim().length < 3) errors.postcode = messages.postcode;
  if (!interests.includes(lead.interest)) errors.interest = messages.interest;
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
