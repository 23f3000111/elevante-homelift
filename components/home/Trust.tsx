import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import type { HomeContent } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * Evidence, not icons. Facts from the brief sit on solid rules; what is
 * still to come sits on dashed ones and says when it will arrive.
 */
export function Trust({ content }: { content: HomeContent["trust"] }) {
  return (
    <Section id="trust" tone="white" labelledBy="trust-title">
      <Reveal className="container-content">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="trust-title" data-reveal className="text-display-2 max-w-[12ch]">
              {content.title}
            </h2>
            <p data-reveal className="mt-8 max-w-[40ch] text-body-l text-charcoal-soft">
              {content.body}
            </p>
          </div>
          <dl className="grid gap-x-8 sm:grid-cols-2 lg:col-span-7">
            {content.items.map((item) => (
              <div
                key={item.title}
                data-reveal
                className={cn("border-t py-6", item.placeholder ? "border-dashed border-warm-grey" : "border-stone")}
              >
                <dt className={cn("text-h3", item.placeholder && "text-caption")}>{item.title}</dt>
                <dd className={cn("mt-3 text-body", item.placeholder ? "text-caption" : "text-charcoal-soft")}>{item.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </Section>
  );
}
