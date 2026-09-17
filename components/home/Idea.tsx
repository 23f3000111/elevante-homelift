import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import type { HomeContent } from "@/content/types";

/** A single statement at display size, with one quiet photograph. */
export function Idea({ content }: { content: HomeContent["idea"] }) {
  return (
    <Section id="idea" tone="white" labelledBy="idea-title">
      <Reveal className="container-content">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="order-2 lg:order-1 lg:col-span-4">
            <div data-reveal-clip className="relative aspect-[4/5] w-full max-w-[24rem]">
              <Picture asset={content.media} fill sizes="(min-width: 1024px) 24rem, 90vw" className="h-full w-full" />
            </div>
          </div>
          <div className="order-1 lg:order-2 lg:col-span-7 lg:col-start-6">
            <h2 id="idea-title" data-reveal className="text-display-2 max-w-[16ch]">
              {content.title}
            </h2>
            <p data-reveal className="mt-8 max-w-[52ch] text-body-l text-charcoal-soft">
              {content.body}
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
