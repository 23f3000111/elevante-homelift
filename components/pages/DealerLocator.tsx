"use client";

import { useMemo, useState, type FormEvent } from "react";
import type { Country, Dealer, PagesContent, Region } from "@/content/types";
import { cn } from "@/lib/cn";

type Copy = PagesContent["findADealer"];

interface DealerLocatorProps {
  copy: Copy;
  countries: Country[];
  regions: Region[];
  dealers: Dealer[];
}

/** Matches a dealer to a free-text query on postcode, town, region or service area. */
export function matchDealer(d: Dealer, q: string, regionName?: string): boolean {
  if (!q) return true;
  const needle = q.toLowerCase();
  return (
    d.city.toLowerCase().includes(needle) ||
    (d.postcode ?? "").toLowerCase().startsWith(needle) ||
    (regionName ?? "").toLowerCase().includes(needle) ||
    d.serviceArea.some((a) => a.toLowerCase().startsWith(needle))
  );
}

/**
 * Search by country, region, and postcode or town. Dealer records come
 * from content (later the admin), so adding a dealer needs no code. With
 * none appointed yet, the result says so and points to the request form.
 */
export function DealerLocator({ copy, countries, regions, dealers }: DealerLocatorProps) {
  const [country, setCountry] = useState(countries[0]?.code ?? "NL");
  const [region, setRegion] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Dealer[] | null>(null);

  const countryRegions = useMemo(() => regions.filter((r) => r.countryCode === country), [regions, country]);
  const current = countries.find((c) => c.code === country);
  const regionName = (id?: string) => regions.find((r) => r.id === id)?.name;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    setResults(
      dealers.filter((d) => d.countryCode === country && (!region || d.regionId === region) && matchDealer(d, q, regionName(d.regionId))),
    );
  };

  return (
    <section id="locator" aria-labelledby="locator-title" className="bg-white py-section">
      <div className="container-content">
        <div className="sheet gap-y-10">
          <div className="col-span-12 lg:col-span-4">
            <h2 id="locator-title" className="max-w-[10ch] text-display-2 font-medium text-charcoal">
              {copy.locatorTitle}
            </h2>
            <p className="mt-6 max-w-[38ch] text-body-l text-charcoal-soft">{copy.locatorBody}</p>
          </div>

          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-12" aria-describedby="locator-status">
              <label className="sm:col-span-4">
                <span className="mb-2 block text-small font-medium text-charcoal">{copy.countryLabel}</span>
                <select
                  className="field"
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                    setRegion("");
                    setResults(null);
                  }}
                >
                  {countries.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="sm:col-span-4">
                <span className="mb-2 block text-small font-medium text-charcoal">{copy.regionLabel}</span>
                <select className="field" value={region} onChange={(e) => setRegion(e.target.value)}>
                  <option value="">{copy.anyRegion}</option>
                  {countryRegions.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="sm:col-span-4">
                <span className="mb-2 block text-small font-medium text-charcoal">{copy.searchLabel}</span>
                <input className="field" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={copy.searchPlaceholder} autoComplete="postal-code" />
              </label>
              <div className="sm:col-span-12">
                <button type="submit" className="button w-full sm:w-auto">
                  {copy.searchButton}
                </button>
              </div>
            </form>

            <div id="locator-status" aria-live="polite" className="mt-10">
              {results && current && !current.active && (
                <p className="max-w-[52ch] border-t border-dashed border-warm-grey pt-6 text-body-l text-charcoal-soft">{copy.inactiveCountry.replace("{country}", current.name)}</p>
              )}
              {results && current?.active && results.length === 0 && (
                <p className="max-w-[52ch] border-t border-dashed border-warm-grey pt-6 text-body-l text-charcoal-soft">{copy.noDealers.replace("{country}", current.name)}</p>
              )}
              {results && results.length > 0 && (
                <ul className="border-t border-charcoal" aria-label={copy.resultsLabel}>
                  {results.map((d) => (
                    <li key={d.id} className="grid gap-3 border-b border-stone py-6 sm:grid-cols-12 sm:gap-6">
                      <div className="sm:col-span-7">
                        <h3 className="text-h3 font-medium text-charcoal">{d.name}</h3>
                        <p className="mt-1 text-body text-charcoal-soft">
                          {[d.address, d.postcode, d.city, regionName(d.regionId)].filter(Boolean).join(", ")}
                        </p>
                        {d.serviceArea.length > 0 && (
                          <p className="mt-2 font-mono text-mono text-caption">
                            {copy.serviceAreaLabel}: {d.serviceArea.join(", ")}
                          </p>
                        )}
                      </div>
                      <div className="text-body text-charcoal-soft sm:col-span-5">
                        {d.contactName && <p>{d.contactName}</p>}
                        {d.phone && (
                          <p>
                            <a href={`tel:${d.phone.replace(/\s/g, "")}`} className="text-link">
                              {d.phone}
                            </a>
                          </p>
                        )}
                        {d.email && (
                          <p>
                            <a href={`mailto:${d.email}`} className="text-link">
                              {d.email}
                            </a>
                          </p>
                        )}
                        {d.website && (
                          <p>
                            <a href={d.website} className="text-link" rel="noopener">
                              {d.website.replace(/^https?:\/\//, "")}
                            </a>
                          </p>
                        )}
                        <p className={cn("mt-3 font-mono text-mono", d.showroom || d.demoAvailable ? "text-oxide" : "text-caption")}>
                          {[d.showroom && copy.showroomLabel, d.demoAvailable && copy.demoLabel].filter(Boolean).join(" · ")}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div id="showrooms" className="mt-14 border-t border-stone pt-6">
              <h3 className="text-h3 font-medium text-charcoal">{copy.showroomTitle}</h3>
              <p className="mt-3 max-w-[52ch] text-body text-charcoal-soft">{copy.showroomBody}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
