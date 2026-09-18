"use client";

import { AppLink } from "@/components/ui/AppLink";
import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Country, PagesContent } from "@/content/types";
import { cn } from "@/lib/cn";
import { LEAD_ENDPOINT, sendLead, validateLead, type LeadField, type LeadRequest } from "@/lib/leads";

type Copy = PagesContent["findADealer"];

type Status = "idle" | "sending" | "sent" | "unrouted" | "failed";

/**
 * A short form around useful sales information, nothing more. Validation
 * names the field it refuses; the lead's origin and page travel with it.
 * With no endpoint configured the form says plainly that nothing was sent,
 * rather than claiming a request reached Elevante.
 */
export function RequestForm({ copy, countries }: { copy: Copy; countries: Country[] }) {
  const [errors, setErrors] = useState<Partial<Record<LeadField, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const sourceRef = useRef<HTMLInputElement>(null);
  const pageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (sourceRef.current) sourceRef.current.value = params.get("src") ?? params.get("utm_source") ?? document.referrer.slice(0, 200);
    if (pageRef.current) pageRef.current.value = window.location.pathname;
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    // Honeypot: real visitors never fill this field.
    if (String(data.get("company") ?? "").trim() !== "") return;

    const lead: LeadRequest = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? "").slice(0, 40),
      country: String(data.get("country") ?? ""),
      postcode: String(data.get("postcode") ?? ""),
      interest: String(data.get("interest") ?? ""),
      message: String(data.get("message") ?? "").slice(0, 2000),
      source: String(data.get("source") ?? "").slice(0, 200),
      page: String(data.get("page") ?? "").slice(0, 200),
    };

    const found = validateLead(
      lead,
      countries,
      copy.form.interests.map((i) => i.value),
      copy.form.errors,
    );
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("sending");
    try {
      const sent = await sendLead(lead);
      setStatus(sent ? "sent" : "unrouted");
    } catch {
      setStatus("failed");
    }
  };

  const err = (key: LeadField) => errors[key];
  const done = status === "sent" || status === "unrouted";
  const label = (text: string) => <span className="mb-2 block text-small font-medium text-charcoal">{text}</span>;
  const error = (key: LeadField) => err(key) && <span className="mt-1 block text-small text-oxide">{err(key)}</span>;

  return (
    <section id="request" aria-labelledby="request-title" className="bg-warm-white py-section">
      <div className="container-content">
        <div className="sheet gap-y-10">
          <div className="col-span-12 lg:col-span-4">
            <h2 id="request-title" className="max-w-[10ch] text-display-2 font-medium text-charcoal">
              {copy.requestTitle}
            </h2>
            <p className="mt-6 max-w-[38ch] text-body-l text-charcoal-soft">{copy.requestBody}</p>
          </div>

          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            {done ? (
              <div role="status" className="border-t border-oxide pt-6">
                <p className="max-w-[30ch] text-display-3 font-medium text-charcoal">{status === "sent" ? copy.form.success : copy.form.unrouted}</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="grid gap-6 sm:grid-cols-2">
                {(Object.keys(errors).length > 0 || status === "failed") && (
                  <p role="alert" className="text-body text-oxide sm:col-span-2">
                    {status === "failed" ? copy.form.error : copy.form.invalid}
                  </p>
                )}
                <input ref={sourceRef} type="hidden" name="source" defaultValue="" />
                <input ref={pageRef} type="hidden" name="page" defaultValue="" />
                <div className="hidden" aria-hidden>
                  <label>
                    Company <input name="company" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>

                <label>
                  {label(copy.form.name)}
                  <input name="name" required autoComplete="name" aria-invalid={!!err("name")} className="field" />
                  {error("name")}
                </label>
                <label>
                  {label(copy.form.email)}
                  <input name="email" type="email" required autoComplete="email" aria-invalid={!!err("email")} className="field" />
                  {error("email")}
                </label>
                <label>
                  {label(copy.form.phone)}
                  <input name="phone" type="tel" autoComplete="tel" className="field" />
                </label>
                <label>
                  {label(copy.form.country)}
                  <select name="country" defaultValue={countries[0]?.code} aria-invalid={!!err("country")} className="field">
                    {countries.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  {error("country")}
                </label>
                <label>
                  {label(copy.form.postcode)}
                  <input name="postcode" required autoComplete="postal-code" aria-invalid={!!err("postcode")} className="field" />
                  {error("postcode")}
                </label>
                <label>
                  {label(copy.form.interest)}
                  <select name="interest" defaultValue={copy.form.interests[0]?.value} aria-invalid={!!err("interest")} className="field">
                    {copy.form.interests.map((i) => (
                      <option key={i.value} value={i.value}>
                        {i.label}
                      </option>
                    ))}
                  </select>
                  {error("interest")}
                </label>
                <label className="sm:col-span-2">
                  {label(copy.form.message)}
                  <textarea name="message" rows={4} className={cn("field", "py-3")} />
                </label>
                <div className="flex flex-col gap-5 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                  <button type="submit" disabled={status === "sending"} className="button disabled:opacity-60">
                    {status === "sending" ? copy.form.sending : copy.form.submit}
                  </button>
                  <p className="max-w-[40ch] text-small text-caption">
                    {copy.form.privacy}{" "}
                    <AppLink href="/privacy" className="text-link">
                      {copy.form.privacyLink}
                    </AppLink>
                  </p>
                </div>
                {!LEAD_ENDPOINT && <p className="font-mono text-mono text-caption sm:col-span-2">{copy.form.notConnected}</p>}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
