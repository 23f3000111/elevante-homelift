"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";
import { submitRequest, type RequestState } from "@/app/find-a-dealer/actions";
import { Container, Section } from "@/components/ui/Section";
import type { Market, PagesContent } from "@/content/types";
import { cn } from "@/lib/cn";

type Copy = PagesContent["findADealer"];

const field =
  "min-h-14 w-full rounded-[var(--radius-button)] border bg-white px-4 text-body text-charcoal placeholder:text-caption focus:border-charcoal";

/**
 * A short form around useful sales information, nothing more. Errors are
 * named next to the field; the source of the lead travels with it.
 */
export function RequestForm({ copy, markets }: { copy: Copy; markets: Market[] }) {
  const [state, action, pending] = useActionState<RequestState, FormData>(submitRequest, { status: "idle", errors: {} });
  const sourceRef = useRef<HTMLInputElement>(null);

  // The lead's origin travels with it, without a re-render.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (sourceRef.current) sourceRef.current.value = params.get("src") ?? params.get("utm_source") ?? document.referrer.slice(0, 200);
  }, []);

  const err = (key: keyof RequestState["errors"]) => state.errors[key];

  return (
    <Section id="request" tone="warm-white" labelledBy="request-title">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="request-title" className="text-display-2">
              {copy.requestTitle}
            </h2>
            <p className="mt-6 max-w-[40ch] text-body-l text-charcoal-soft">{copy.requestBody}</p>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            {state.status === "ok" ? (
              <p role="status" className="border-t border-oxide pt-6 text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.25] font-medium text-charcoal">
                {copy.form.success}
              </p>
            ) : (
              <form action={action} noValidate className="grid gap-5 sm:grid-cols-2">
                {state.status === "error" && (
                  <p role="alert" className="text-body text-oxide sm:col-span-2">
                    {copy.form.error}
                  </p>
                )}
                <input ref={sourceRef} type="hidden" name="source" defaultValue="" />
                <div className="hidden" aria-hidden>
                  <label>
                    Company <input name="company" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>

                <label className="sm:col-span-1">
                  <span className="mb-2 block text-small font-medium text-charcoal">{copy.form.name}</span>
                  <input name="name" required autoComplete="name" aria-invalid={!!err("name")} className={cn(field, err("name") ? "border-oxide" : "border-charcoal/30")} />
                  {err("name") && <span className="mt-1 block text-small text-oxide">{err("name")}</span>}
                </label>
                <label className="sm:col-span-1">
                  <span className="mb-2 block text-small font-medium text-charcoal">{copy.form.email}</span>
                  <input name="email" type="email" required autoComplete="email" aria-invalid={!!err("email")} className={cn(field, err("email") ? "border-oxide" : "border-charcoal/30")} />
                  {err("email") && <span className="mt-1 block text-small text-oxide">{err("email")}</span>}
                </label>
                <label className="sm:col-span-1">
                  <span className="mb-2 block text-small font-medium text-charcoal">{copy.form.country}</span>
                  <select name="country" defaultValue={markets[0]?.code} className={cn(field, err("country") ? "border-oxide" : "border-charcoal/30")}>
                    {markets.map((m) => (
                      <option key={m.code} value={m.code}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="sm:col-span-1">
                  <span className="mb-2 block text-small font-medium text-charcoal">{copy.form.postcode}</span>
                  <input name="postcode" required autoComplete="postal-code" aria-invalid={!!err("postcode")} className={cn(field, err("postcode") ? "border-oxide" : "border-charcoal/30")} />
                  {err("postcode") && <span className="mt-1 block text-small text-oxide">{err("postcode")}</span>}
                </label>
                <label className="sm:col-span-2">
                  <span className="mb-2 block text-small font-medium text-charcoal">{copy.form.message}</span>
                  <textarea name="message" rows={4} className={cn(field, "border-charcoal/30 py-3")} />
                </label>
                <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    disabled={pending}
                    className="inline-flex min-h-14 items-center justify-center rounded-[var(--radius-button)] bg-charcoal px-7 text-body font-medium text-warm-white transition-colors hover:bg-charcoal-soft disabled:opacity-60"
                  >
                    {copy.form.submit}
                  </button>
                  <p className="max-w-[40ch] text-small text-caption">
                    {copy.form.privacy.replace("See the privacy statement.", "")}
                    <Link href="/privacy" className="underline underline-offset-4">
                      See the privacy statement.
                    </Link>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
