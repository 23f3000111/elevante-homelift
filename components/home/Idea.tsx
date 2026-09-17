import { MaskedText } from "@/components/ui/MaskedText";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";
import { SectionIndex } from "@/components/ui/SectionIndex";
import { Section } from "@/components/ui/Section";
import type { HomeContent } from "@/content/types";

/**
 * One statement at display size. The photograph rises into the headline's
 * space and drifts against the scroll, so the two layers move apart.
 */
export function Idea({ content }: { content: HomeContent["idea"] }) {
  return (
    <Section id="idea" tone="white" labelledBy="idea-title" className="overflow-x-clip">
      <Reveal className="container-content">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <SectionIndex index={content.index} label={content.indexLabel} />
          </div>
          <div className="lg:col-span-9 lg:col-start-4">
            <MaskedText
              as="h2"
              id="idea-title"
              text={content.title}
              className="block max-w-[15ch] text-[clamp(2.5rem,5.6vw,6rem)] font-medium leading-[0.98] tracking-[-0.03em] text-charcoal"
            />
            <div className="mt-14 grid items-start gap-10 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-4">
                <div data-reveal-clip className="w-full max-w-[24rem]">
                  <div data-parallax="0.3">
                    <Picture asset={content.media} sizes="(min-width: 1024px) 24rem, 90vw" />
                  </div>
                </div>
              </div>
              <p data-reveal className="max-w-[46ch] text-body-l text-charcoal-soft lg:col-span-6 lg:col-start-6 lg:pt-8">
                {content.body}
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
