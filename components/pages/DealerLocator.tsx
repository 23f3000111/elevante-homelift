"use client";

import { useState, type FormEvent } from "react";
import { Container, Section } from "@/components/ui/Section";
import type { Dealer, Market, PagesContent } from "@/content/types";

type Copy = PagesContent["findADealer"];

interface DealerLocatorProps {
  copy: Copy;
  markets: Market[];
  dealers: Dealer[];
}

const field =
  "min-h-14 w-full rounded-[var(--radius-button)] border border-charcoal/30 bg-white px-4 text-body text-charcoal placeholder:text-caption focus:border-charcoal";

/**
 * Search by country and postcode or town. Dealer records come from content
 * (later the admin), so adding a dealer needs no code. With none appointed
 * yet, the result says so and points to the request form.
 */
export function DealerLocator({ copy, markets, dealers }: DealerLocatorProps) {
  const [country, setCountry] = useState(markets[0]?.code ?? "NL");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Dealer[] | null>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim().toLowerCase();
    setResults(
      dealers.filter(
        (d) =>
          d.country === country &&
          (!q ||
            d.city.toLowerCase().includes(q) ||
            (d.postcode ?? "").toLowerCase().startsWith(q) ||
            (d.region ?? "").toLowerCase().includes(q)),
      ),
    );
  };

  const countryName = markets.find((m) => m.code === country)?.name ?? country;

  return (
    <Section tone="white" labelledBy="locator-title">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="locator-title" className="text-display-2">
              {copy.locatorTitle}
            </h2>
            <p className="mt-6 max-w-[40ch] text-body-l text-charcoal-soft">
              {copy.locatorBody}
            </p>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <form
              onSubmit={onSubmit}
              className="grid gap-4 sm:grid-cols-12"
              aria-describedby="locator-status"
            >
              <label className="sm:col-span-4">
                <span className="mb-2 block text-small font-medium text-charcoal">
                  {copy.countryLabel}
                </span>
                <select
                  className={field}
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  {markets.map((m) => (
                    <option key={m.code} value={m.code}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="sm:col-span-5">
                <span className="mb-2 block text-small font-medium text-charcoal">
                  {copy.searchLabel}
                </span>
                <input
                  className={field}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={copy.searchPlaceholder}
                  autoComplete="postal-code"
                />
              </label>
              <div className="flex items-end sm:col-span-3">
                <button
                  type="submit"
                  className="inline-flex min-h-14 w-full items-center justify-center rounded-[var(--radius-button)] bg-charcoal px-6 text-body font-medium text-warm-white transition-colors hover:bg-charcoal-soft"
                >
                  {copy.searchButton}
                </button>
              </div>
            </form>

            <div id="locator-status" aria-live="polite" className="mt-8">
              {results && results.length === 0 && (
                <p className="max-w-[52ch] border-t border-dashed border-warm-grey pt-6 text-body-l text-charcoal-soft">
                  {copy.noDealers.replace("{country}", countryName)}
                </p>
              )}
              {results && results.length > 0 && (
                <ul className="divide-y divide-stone border-t border-stone">
                  {results.map((d) => (
                    <li key={d.id} className="grid gap-2 py-6 sm:grid-cols-12">
                      <div className="sm:col-span-7">
                        <h3 className="text-h3">{d.name}</h3>
                        <p className="mt-1 text-body text-charcoal-soft">
                          {d.city}
                          {d.region ? `, ${d.region}` : ""}
                        </p>
                      </div>
                      <div className="text-body text-charcoal-soft sm:col-span-5">
                        {d.phone && <p>{d.phone}</p>}
                        {d.email && <p>{d.email}</p>}
                        {d.showroom && (
                          <p className="mt-2 font-mono text-small text-oxide">
                            Showroom demonstration
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div id="showrooms" className="mt-14 border-t border-stone pt-6">
              <h3 className="text-h3">{copy.showroomTitle}</h3>
              <p className="mt-3 max-w-[52ch] text-body text-charcoal-soft">
                {copy.showroomBody}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
