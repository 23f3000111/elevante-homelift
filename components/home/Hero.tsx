import { Button } from "@/components/ui/Button";
import { MaskedText } from "@/components/ui/MaskedText";
import { Picture } from "@/components/ui/Picture";
import type { HomeContent } from "@/content/types";
import { HeroMotion } from "./HeroMotion";

/**
 * A full-height opening. The house fills the right of the screen; the
 * statement sits on a warm-white plate that cuts into it, and the lead and
 * actions wait at the foot of the page. The words rise into place, the
 * photograph is uncovered from the right, and on scroll the whole scene
 * holds still while the product story slides over it.
 */
export function Hero({ content }: { content: HomeContent["hero"] }) {
  return (
    <HeroMotion>
      <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden bg-warm-white lg:min-h-[100svh]">
        <div data-hero-inner className="relative z-10 flex flex-col lg:min-h-[100svh]">
          <div className="container-content pt-24 lg:pt-28">
            <div className="bg-warm-white lg:w-[62vw] lg:max-w-[58rem] lg:pr-16 lg:pb-10">
              <MaskedText
                as="h1"
                id="hero-title"
                text={content.title}
                className="block text-[clamp(2.9rem,7.6vw,7.75rem)] font-medium leading-[0.92] tracking-[-0.035em] text-charcoal"
              />
            </div>
          </div>

          <div className="container-content mt-10 lg:mt-auto lg:pb-20">
            <div className="lg:w-[40vw] lg:max-w-[34rem]">
              <p data-hero-fade className="max-w-[40ch] text-body-l text-charcoal-soft">
                {content.lead}
              </p>
              <div data-hero-fade className="mt-8 flex flex-wrap gap-4">
                <Button href={content.primary.href}>{content.primary.label}</Button>
                <Button href={content.secondary.href} variant="secondary">
                  {content.secondary.label}
                </Button>
              </div>
            </div>
          </div>

          <div
            data-hero-fade
            className="pointer-events-none absolute right-gutter bottom-8 hidden items-center gap-3 font-mono text-small text-warm-white lg:flex"
          >
            <span>{content.scrollCue}</span>
            <span className="block h-12 w-px bg-warm-white" />
          </div>
        </div>

        <div
          data-hero-media
          className="relative mt-10 aspect-[4/5] w-full lg:absolute lg:inset-y-0 lg:right-0 lg:left-[42vw] lg:mt-0 lg:aspect-auto lg:w-auto"
        >
          <div data-hero-zoom className="absolute inset-0">
            <Picture asset={content.media} fill priority sizes="(min-width: 1024px) 58vw, 100vw" className="h-full w-full" />
          </div>
        </div>
      </section>
    </HeroMotion>
  );
}
