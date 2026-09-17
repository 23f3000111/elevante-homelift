import { Caption } from "@/components/ui/Caption";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import type { DesignOption } from "@/content/types";
import { cn } from "@/lib/cn";

const GROUP_LABEL: Record<DesignOption["group"], string> = {
  cabin: "Cabin",
  materials: "Materials",
  finishes: "Finishes",
  flooring: "Flooring",
  controls: "Controls",
};

/** The groups the Design page will fill. Placeholders are dashed and say so. */
export function DesignOptions({ title, note, options }: { title: string; note: string; options: DesignOption[] }) {
  return (
    <Section tone="white" labelledBy="options-title">
      <Reveal className="container-content">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 id="options-title" data-reveal className="text-display-2 lg:col-span-6">
            {title}
          </h2>
          <Caption data-reveal className="max-w-[44ch] lg:col-span-5 lg:col-start-8">
            {note}
          </Caption>
        </div>
        <ul className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {options.map((o) => (
            <li key={o.id} data-reveal className={cn("border-t pt-5", o.placeholder ? "border-dashed border-warm-grey" : "border-stone")}>
              <span className="font-mono text-small text-caption">{GROUP_LABEL[o.group]}</span>
              {o.media ? (
                <div className="mt-4" style={{ maxWidth: o.media.width }}>
                  <Picture asset={o.media} sizes="(min-width: 1024px) 30vw, 100vw" />
                </div>
              ) : (
                <div className="mt-4 flex aspect-[4/3] items-end bg-warm-white p-4">
                  <span className="font-mono text-small text-caption">To be published</span>
                </div>
              )}
              <h3 className="mt-5 text-h3">{o.name}</h3>
              <p className="mt-2 text-body text-charcoal-soft">{o.description}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
