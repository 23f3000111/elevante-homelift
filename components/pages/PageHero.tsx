import { Caption } from "@/components/ui/Caption";
import { MaskedText } from "@/components/ui/MaskedText";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";
import { SectionIndex } from "@/components/ui/SectionIndex";
import type { PageHeroContent } from "@/content/types";

/**
 * How every secondary page opens: its number, a statement at display size,
 * a lead, and where there is a picture worth the width, a wide panel that
 * drifts against the scroll as it is uncovered.
 */
export function PageHero({ content }: { content: PageHeroContent }) {
  return (
    <Reveal as="section" className="overflow-x-clip bg-warm-white pt-24 pb-section-sm lg:pt-32">
      <div className="container-content">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-3">{content.index && <SectionIndex index={content.index} label={content.eyebrow ?? ""} />}</div>
          <div className="lg:col-span-9 lg:col-start-4">
            <MaskedText
              as="h1"
              id="page-title"
              text={content.title}
              className="block max-w-[14ch] text-[clamp(2.75rem,6.4vw,6.5rem)] font-medium leading-[0.95] tracking-[-0.035em] text-charcoal"
            />
            <p data-reveal className="mt-8 max-w-[52ch] text-body-l text-charcoal-soft">
              {content.lead}
            </p>
          </div>
        </div>

        {content.media && (
          <figure className="mt-14 lg:mt-20 lg:ml-[25%] lg:-mr-gutter">
            <div data-reveal-clip className="w-full">
              <div data-parallax="0.15">
                <Picture asset={content.media} priority sizes="(min-width: 1024px) 75vw, 100vw" className="w-full" />
              </div>
            </div>
            {content.caption && (
              <figcaption className="mt-3">
                <Caption>{content.caption}</Caption>
              </figcaption>
            )}
          </figure>
        )}
      </div>
    </Reveal>
  );
}
