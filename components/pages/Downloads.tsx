import { Caption } from "@/components/ui/Caption";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import type { Download } from "@/content/types";

/** The download area. An item without a file says so instead of linking nowhere. */
export function Downloads({
  title,
  note,
  items,
}: {
  title: string;
  note: string;
  items: Download[];
}) {
  return (
    <Section tone="warm-white" labelledBy="downloads-title">
      <Reveal className="container-content">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="downloads-title" data-reveal className="text-display-2">
              {title}
            </h2>
            <Caption data-reveal className="mt-6 max-w-[36ch]">
              {note}
            </Caption>
          </div>
          <ul className="lg:col-span-7 lg:col-start-6">
            {items.map((d) => (
              <li
                key={d.id}
                data-reveal
                className="flex min-h-16 items-center justify-between gap-6 border-t border-dashed border-warm-grey py-4 last:border-b"
              >
                <span className="text-body text-charcoal">{d.title}</span>
                {d.href && !d.placeholder ? (
                  <a
                    href={d.href}
                    className="text-body font-medium text-charcoal underline decoration-stone underline-offset-8 hover:decoration-charcoal"
                  >
                    Download
                  </a>
                ) : (
                  <span className="font-mono text-small text-caption">
                    To be published
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
