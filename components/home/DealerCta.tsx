import { Button } from "@/components/ui/Button";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";
import type { HomeContent } from "@/content/types";

/**
 * The end of the journey returns to the house from the gallery, shown whole
 * at the full width of the page, with the invitation on a plate over its
 * lower corner.
 */
export function DealerCta({ content }: { content: HomeContent["dealerCta"] }) {
  return (
    <Reveal as="section" className="bg-stone pt-section pb-section">
      <div id="dealer" className="-mt-px" aria-hidden />
      <div className="container-content">
        <div className="relative">
          <div data-reveal-clip>
            <Picture asset={content.media} sizes="(min-width: 1440px) 1360px, 100vw" className="w-full" />
          </div>
          <div className="relative z-10 -mt-12 mr-6 ml-6 max-w-[44rem] bg-warm-white p-7 sm:-mt-20 sm:p-10 lg:absolute lg:bottom-12 lg:left-12 lg:m-0 lg:p-12">
            <h2 data-reveal className="text-[clamp(2.25rem,4.6vw,4.75rem)] leading-[0.98] font-medium tracking-[-0.03em] text-charcoal">
              {content.title}
            </h2>
            <p data-reveal className="mt-6 max-w-[44ch] text-body-l text-charcoal-soft">
              {content.body}
            </p>
            <div data-reveal className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={content.primary.href}>{content.primary.label}</Button>
              <Button href={content.secondary.href} variant="secondary">
                {content.secondary.label}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
