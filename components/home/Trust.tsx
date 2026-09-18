import { Reveal } from "@/components/ui/Reveal";
import { SectionIndex } from "@/components/ui/SectionIndex";
import { Section } from "@/components/ui/Section";
import type { HomeContent } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * A ledger of evidence. The one safety fact is set in the accent colour;
 * what is still to come sits on dashed rules and says when it will arrive.
 */
export function Trust({ content }: { content: HomeContent["trust"] }) {
  return (
    <Section id="trust" tone="white" labelledBy="trust-title">
      <Reveal className="container-content">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionIndex index={content.index} label={content.indexLabel} />
            <h2
              id="trust-title"
              data-reveal
              className="mt-8 max-w-[12ch] text-display-2"
            >
              {content.title}
            </h2>
            <p
              data-reveal
              className="mt-8 max-w-[40ch] text-body-l text-charcoal-soft"
            >
              {content.body}
            </p>
          </div>
          <dl className="lg:col-span-7">
            {content.items.map((item, i) => (
              <div
                key={item.title}
                data-reveal
                className={cn(
                  "grid gap-3 border-t py-7 sm:grid-cols-12 sm:gap-6",
                  item.placeholder
                    ? "border-dashed border-warm-grey"
                    : item.highlight
                      ? "border-oxide"
                      : "border-stone",
                )}
              >
                <span
                  className={cn(
                    "font-mono text-small sm:col-span-1",
                    item.highlight ? "text-oxide" : "text-caption",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <dt
                  className={cn(
                    "text-h3 sm:col-span-4",
                    item.placeholder
                      ? "text-caption"
                      : item.highlight
                        ? "text-oxide"
                        : "text-charcoal",
                  )}
                >
                  {item.title}
                </dt>
                <dd
                  className={cn(
                    "text-body sm:col-span-7",
                    item.placeholder ? "text-caption" : "text-charcoal-soft",
                  )}
                >
                  {item.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </Section>
  );
}
