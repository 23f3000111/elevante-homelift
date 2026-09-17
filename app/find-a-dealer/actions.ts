"use server";

/**
 * Receives an information request. Validation happens here, on the server.
 * Routing to Elevante's CRM and to the dealer for the area is the next
 * integration; until then a received request is logged on the server so
 * nothing is silently lost.
 */
export interface RequestState {
  status: "idle" | "ok" | "error";
  errors: Partial<Record<"name" | "email" | "country" | "postcode", string>>;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitRequest(_prev: RequestState, formData: FormData): Promise<RequestState> {
  // Honeypot: real visitors never fill this field.
  if (String(formData.get("company") ?? "").trim() !== "") return { status: "ok", errors: {} };

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const country = String(formData.get("country") ?? "").trim();
  const postcode = String(formData.get("postcode") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim().slice(0, 2000);
  const source = String(formData.get("source") ?? "").trim().slice(0, 200);

  const errors: RequestState["errors"] = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL.test(email)) errors.email = "Please enter a valid email address.";
  if (!country) errors.country = "Please choose a country.";
  if (postcode.length < 3) errors.postcode = "Please enter your postcode.";
  if (Object.keys(errors).length > 0) return { status: "error", errors };

  console.info("[elevante] information request", { name, email, country, postcode, message, source, receivedAt: new Date().toISOString() });
  return { status: "ok", errors: {} };
}
