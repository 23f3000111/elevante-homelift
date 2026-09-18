"use client";

import { AppLink } from "@/components/ui/AppLink";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Container, Section } from "@/components/ui/Section";
import type { Market, PagesContent } from "@/content/types";
import { cn } from "@/lib/cn";
import {
  LEAD_ENDPOINT,
  sendLead,
  validateLead,
  type LeadField,
  type LeadRequest,
} from "@/lib/leads";

type Copy = PagesContent["findADealer"];

const field =
  "min-h-14 w-full rounded-[var(--radius-button)] border bg-white px-4 text-body text-charcoal placeholder:text-caption focus:border-charcoal";

type Status = "idle" | "sending" | "sent" | "unrouted" | "failed";

/**
 * A short form around useful sales information, nothing more. Validation
 * names the field it refuses; the lead's origin travels with it. With no
 * endpoint configured the form says plainly that nothing was sent, rather
 * than claiming a request reached Elevante.
 */
export function RequestForm({
  copy,
  markets,
}: {
  copy: Copy;
  markets: Market[];
}) {
  const [errors, setErrors] = useState<Partial<Record<LeadField, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const sourceRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (sourceRef.current)
      sourceRef.current.value =
        params.get("src") ??
        params.get("utm_source") ??
        document.referrer.slice(0, 200);
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    // Honeypot: real visitors never fill this field.
    if (String(data.get("company") ?? "").trim() !== "") return;

    const lead: LeadRequest = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      country: String(data.get("country") ?? ""),
      postcode: String(data.get("postcode") ?? ""),
      message: String(data.get("message") ?? "").slice(0, 2000),
      source: String(data.get("source") ?? "").slice(0, 200),
    };

    const found = validateLead(lead, markets);
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

  return (
    <Section id="request" tone="warm-white" labelledBy="request-title">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="request-title" className="text-display-2">
              {copy.requestTitle}
            </h2>
            <p className="mt-6 max-w-[40ch] text-body-l text-charcoal-soft">
              {copy.requestBody}
            </p>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            {done ? (
              <div role="status" className="border-t border-oxide pt-6">
                <p className="text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.25] font-medium text-charcoal">
                  {status === "sent" ? copy.form.success : copy.form.unrouted}
                </p>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                noValidate
                className="grid gap-5 sm:grid-cols-2"
              >
                {(Object.keys(errors).length > 0 || status === "failed") && (
                  <p
                    role="alert"
                    className="text-body text-oxide sm:col-span-2"
                  >
                    {status === "failed" ? copy.form.error : copy.form.invalid}
                  </p>
                )}
                <input
                  ref={sourceRef}
                  type="hidden"
                  name="source"
                  defaultValue=""
                />
                <div className="hidden" aria-hidden>
                  <label>
                    Company{" "}
                    <input name="company" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>

                <label className="sm:col-span-1">
                  <span className="mb-2 block text-small font-medium text-charcoal">
                    {copy.form.name}
                  </span>
                  <input
                    name="name"
                    required
                    autoComplete="name"
                    aria-invalid={!!err("name")}
                    className={cn(
                      field,
                      err("name") ? "border-oxide" : "border-charcoal/30",
                    )}
                  />
                  {err("name") && (
                    <span className="mt-1 block text-small text-oxide">
                      {err("name")}
                    </span>
                  )}
                </label>
                <label className="sm:col-span-1">
                  <span className="mb-2 block text-small font-medium text-charcoal">
                    {copy.form.email}
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    aria-invalid={!!err("email")}
                    className={cn(
                      field,
                      err("email") ? "border-oxide" : "border-charcoal/30",
                    )}
                  />
                  {err("email") && (
                    <span className="mt-1 block text-small text-oxide">
                      {err("email")}
                    </span>
                  )}
                </label>
                <label className="sm:col-span-1">
                  <span className="mb-2 block text-small font-medium text-charcoal">
                    {copy.form.country}
                  </span>
                  <select
                    name="country"
                    defaultValue={markets[0]?.code}
                    className={cn(
                      field,
                      err("country") ? "border-oxide" : "border-charcoal/30",
                    )}
                  >
                    {markets.map((m) => (
                      <option key={m.code} value={m.code}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="sm:col-span-1">
                  <span className="mb-2 block text-small font-medium text-charcoal">
                    {copy.form.postcode}
                  </span>
                  <input
                    name="postcode"
                    required
                    autoComplete="postal-code"
                    aria-invalid={!!err("postcode")}
                    className={cn(
                      field,
                      err("postcode") ? "border-oxide" : "border-charcoal/30",
                    )}
                  />
                  {err("postcode") && (
                    <span className="mt-1 block text-small text-oxide">
                      {err("postcode")}
                    </span>
                  )}
                </label>
                <label className="sm:col-span-2">
                  <span className="mb-2 block text-small font-medium text-charcoal">
                    {copy.form.message}
                  </span>
                  <textarea
                    name="message"
                    rows={4}
                    className={cn(field, "border-charcoal/30 py-3")}
                  />
                </label>
                <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex min-h-14 items-center justify-center rounded-[var(--radius-button)] bg-charcoal px-7 text-body font-medium text-warm-white transition-colors hover:bg-charcoal-soft disabled:opacity-60"
                  >
                    {copy.form.submit}
                  </button>
                  <p className="max-w-[40ch] text-small text-caption">
                    {copy.form.privacy}{" "}
                    <AppLink
                      href="/privacy"
                      className="underline underline-offset-4"
                    >
                      {copy.form.privacyLink}
                    </AppLink>
                  </p>
                </div>
                {!LEAD_ENDPOINT && (
                  <p className="text-small text-caption sm:col-span-2">
                    {copy.form.notConnected}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
