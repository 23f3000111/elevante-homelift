import { Reveal } from "@/components/ui/Reveal";
import type { Download, SpecRow } from "@/content/types";
import { cn } from "@/lib/cn";

interface SpecLedgerProps {
  title: string;
  note: string;
  statusLabel: string;
  rows: SpecRow[];
}

/** Every technical topic the brief lists, each with its honest status. */
export function SpecLedger({ title, note, statusLabel, rows }: SpecLedgerProps) {
  return (
    <Reveal as="section" id="technical" className="bg-white py-section" aria-labelledby="specs-title">
      <div className="container-content">
        <div className="sheet gap-y-10">
          <div className="col-span-12 lg:col-span-4">
            <h2 id="specs-title" data-reveal className="max-w-[12ch] text-display-2 font-medium text-charcoal">
              {title}
            </h2>
            <p data-reveal className="mt-6 max-w-[36ch] text-small text-caption">
              {note}
            </p>
          </div>
          <dl className="col-span-12 border-t border-charcoal lg:col-span-7 lg:col-start-6">
            {rows.map((row, i) => (
              <div key={row.topic} data-reveal className={cn("grid gap-2 border-b py-5 sm:grid-cols-12 sm:gap-6", row.placeholder ? "border-dashed border-warm-grey" : "border-stone")}>
                <dt className="flex items-baseline gap-4 sm:col-span-5">
                  <span className="font-mono text-mono text-caption">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-body-l font-medium text-charcoal">{row.topic}</span>
                </dt>
                <dd className={cn("sm:col-span-7", row.placeholder ? "font-mono text-mono text-caption" : "text-body text-charcoal-soft")}>
                  {row.placeholder && <span className="sr-only">{statusLabel}: </span>}
                  {row.status}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Reveal>
  );
}

interface DownloadsProps {
  title: string;
  note: string;
  kinds: Record<Download["kind"], string>;
  items: Download[];
  pendingLabel: string;
  downloadLabel: string;
}

/** The download area. An item without a file says so instead of linking nowhere. */
export function Downloads({ title, note, kinds, items, pendingLabel, downloadLabel }: DownloadsProps) {
  return (
    <Reveal as="section" id="downloads" className="bg-warm-white py-section" aria-labelledby="downloads-title">
      <div className="container-content">
        <div className="sheet gap-y-10">
          <div className="col-span-12 lg:col-span-4">
            <h2 id="downloads-title" data-reveal className="text-display-2 font-medium text-charcoal">
              {title}
            </h2>
            <p data-reveal className="mt-6 max-w-[36ch] text-small text-caption">
              {note}
            </p>
          </div>
          <ul className="col-span-12 border-t border-charcoal lg:col-span-7 lg:col-start-6">
            {items.map((d) => (
              <li key={d.id} data-reveal className={cn("grid min-h-16 grid-cols-[1fr_auto] items-center gap-6 border-b py-4", d.placeholder ? "border-dashed border-warm-grey" : "border-stone")}>
                <span>
                  <span className="block text-body-l text-charcoal">{d.title}</span>
                  <span className="block font-mono text-mono text-caption">
                    {kinds[d.kind]}
                    {d.meta ? ` · ${d.meta}` : ""}
                  </span>
                </span>
                {d.href && !d.placeholder ? (
                  <a href={d.href} className="text-link text-body font-medium text-charcoal" download>
                    {downloadLabel}
                  </a>
                ) : (
                  <span className="font-mono text-mono text-caption">{pendingLabel}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}
