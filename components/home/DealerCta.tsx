import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import type { HomeContent } from "@/content/types";

/** The next step, on stone so it reads as the end of the journey. */
export function DealerCta({ content }: { content: HomeContent["dealerCta"] }) {
  return (
    <Section id="dealer" tone="stone" labelledBy="dealer-title">
      <Reveal className="container-content">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 id="dealer-title" data-reveal className="text-display-2 max-w-[13ch]">
              {content.title}
            </h2>
            <p data-reveal className="mt-8 max-w-[46ch] text-body-l text-charcoal-soft">
              {content.body}
            </p>
          </div>
          <div data-reveal className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col">
            <Button href={content.primary.href}>{content.primary.label}</Button>
            <Button href={content.secondary.href} variant="secondary" className="border-charcoal/40">
              {content.secondary.label}
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
