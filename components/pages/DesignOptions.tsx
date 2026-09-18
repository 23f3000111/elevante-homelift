import { MediaFrame } from "@/components/ui/MediaFrame";
import { Reveal } from "@/components/ui/Reveal";
import type { DesignGroup, DesignOption } from "@/content/types";
import { cn } from "@/lib/cn";

interface DesignOptionsProps {
  title: string;
  note: string;
  configuratorNote: string;
  groupLabels: Record<DesignGroup, string>;
  options: DesignOption[];
}

const ORDER: DesignGroup[] = ["cabin", "staircase", "materials", "finishes", "flooring", "controls"];

/**
 * The design options as a specification, group by group. Each group is a
 * row of the ledger; each option a line in it, with its reference picture
 * where one exists. Placeholders are dashed and say so. The structure is
 * the one a configurator would read from later.
 */
export function DesignOptions({ title, note, configuratorNote, groupLabels, options }: DesignOptionsProps) {
  return (
    <Reveal as="section" id="options" className="bg-white py-section" aria-labelledby="options-title">
      <div className="container-content">
        <div className="sheet items-end gap-y-6">
          <h2 id="options-title" data-reveal className="col-span-12 text-display-2 font-medium text-charcoal lg:col-span-6">
            {title}
          </h2>
          <p data-reveal className="col-span-12 max-w-[44ch] text-small text-caption lg:col-span-5 lg:col-start-8">
            {note}
          </p>
        </div>

        <div className="mt-14 border-t border-charcoal lg:mt-20">
          {ORDER.map((group) => {
            const items = options.filter((o) => o.group === group);
            if (items.length === 0) return null;
            return (
              <div key={group} className="sheet gap-y-6 border-b border-stone py-8 lg:py-10" data-reveal>
                <h3 className="col-span-12 text-display-3 font-medium text-charcoal lg:col-span-4">{groupLabels[group]}</h3>
                <ul className="col-span-12 grid gap-8 sm:grid-cols-2 lg:col-span-8">
                  {items.map((o) => (
                    <li key={o.id} className={cn("border-t pt-4", o.placeholder ? "border-dashed border-warm-grey" : "border-stone")}>
                      {o.media && (
                        <div className="mb-4 h-[14rem]">
                          <MediaFrame asset={o.media} sizes="(min-width: 64rem) 30vw, 100vw" tone="warm-white" />
                        </div>
                      )}
                      <p className="text-h3 font-medium text-charcoal">{o.name}</p>
                      <p className="mt-2 max-w-[40ch] text-body text-charcoal-soft">{o.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        <p className="mt-8 max-w-[60ch] font-mono text-mono text-caption" data-reveal>
          {configuratorNote}
        </p>
      </div>
    </Reveal>
  );
}
