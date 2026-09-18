import { Caption } from "@/components/ui/Caption";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import type { SpecRow } from "@/content/types";
import { cn } from "@/lib/cn";

/** Every technical topic the brief lists, each with its honest status. */
export function SpecLedger({
  title,
  note,
  rows,
}: {
  title: string;
  note: string;
  rows: SpecRow[];
}) {
  return (
    <Section tone="white" labelledBy="specs-title">
      <Reveal className="container-content">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="specs-title" data-reveal className="text-display-2">
              {title}
            </h2>
            <Caption data-reveal className="mt-6 max-w-[36ch]">
              {note}
            </Caption>
          </div>
          <dl className="lg:col-span-7 lg:col-start-6">
            {rows.map((row, i) => (
              <div
                key={row.topic}
                data-reveal
                className={cn(
                  "grid gap-2 border-t py-5 sm:grid-cols-12 sm:gap-6",
                  row.placeholder
                    ? "border-dashed border-warm-grey"
                    : "border-stone",
                )}
              >
                <dt className="flex items-baseline gap-4 sm:col-span-5">
                  <span className="font-mono text-small text-caption">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-body font-medium text-charcoal">
                    {row.topic}
                  </span>
                </dt>
                <dd
                  className={cn(
                    "text-body sm:col-span-7",
                    row.placeholder
                      ? "font-mono text-small text-caption"
                      : "text-charcoal-soft",
                  )}
                >
                  {row.status}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </Section>
  );
}
