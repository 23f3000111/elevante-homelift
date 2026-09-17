import { Button } from "@/components/ui/Button";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";
import type { HomeContent } from "@/content/types";

/**
 * The end of the journey returns to the house from the opening, now full
 * width and drifting slowly behind the invitation.
 */
export function DealerCta({ content }: { content: HomeContent["dealerCta"] }) {
  return (
    <Reveal as="section" className="relative overflow-hidden bg-stone">
      <div id="dealer" className="absolute -top-px" aria-hidden />
      <div className="absolute inset-0">
        <div data-parallax="0.3" className="absolute -inset-y-[15%] inset-x-0">
          <Picture asset={content.media} fill sizes="100vw" className="h-full w-full" />
        </div>
      </div>
      <div className="relative container-content flex min-h-[86svh] items-end py-section">
        <div className="max-w-[44rem] bg-warm-white p-7 sm:p-10 lg:p-14">
          <h2 data-reveal className="text-[clamp(2.5rem,5.4vw,5.5rem)] leading-[0.96] font-medium tracking-[-0.03em] text-charcoal">
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
    </Reveal>
  );
}
