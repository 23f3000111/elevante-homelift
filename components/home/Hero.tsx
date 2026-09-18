import { Button } from "@/components/ui/Button";
import { Caption } from "@/components/ui/Caption";
import { MaskedText } from "@/components/ui/MaskedText";
import { VideoLoop } from "@/components/ui/VideoLoop";
import type { HomeContent } from "@/content/types";
import { HeroMotion } from "./HeroMotion";

/**
 * A full-screen opening: the film fills the viewport and the statement sits
 * on a warm-white plate in the lower left, large enough to be the first thing
 * read. The film fades and settles, the words rise, the plate lifts into
 * place; on scroll the scene holds while the product story slides over it.
 */
export function Hero({ content }: { content: HomeContent["hero"] }) {
  return (
    <HeroMotion>
      <section
        id="top"
        aria-labelledby="hero-title"
        className="relative flex min-h-[calc(100svh-4.5rem)] flex-col overflow-hidden bg-stone lg:min-h-[calc(100svh-5rem)]"
      >
        <div data-hero-media className="absolute inset-0">
          <div data-hero-zoom className="absolute inset-0">
            <VideoLoop video={content.video} eager className="h-full w-full" />
          </div>
        </div>

        <div
          data-hero-inner
          className="relative z-10 flex flex-1 flex-col justify-end"
        >
          <div className="container-content pt-[30svh] pb-5 lg:pt-16 lg:pb-7">
            <div
              data-hero-plate
              className="max-w-[54rem] bg-warm-white/95 p-6 backdrop-blur-[14px] backdrop-saturate-[1.1] supports-[backdrop-filter:blur(0)]:bg-warm-white/72 sm:p-8 lg:p-9 lg:pr-12"
            >
              <MaskedText
                as="h1"
                id="hero-title"
                text={content.title}
                className="block text-[clamp(2.25rem,min(5.2vw,8svh),5.25rem)] font-medium leading-[0.95] tracking-[-0.035em] text-charcoal"
              />
              <div className="mt-5 grid gap-4 lg:mt-6 lg:grid-cols-12 lg:items-end">
                <p
                  data-hero-fade
                  className="max-w-[44ch] text-body text-charcoal-soft lg:col-span-7 lg:text-body-l"
                >
                  {content.lead}
                </p>
                <div
                  data-hero-fade
                  className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end"
                >
                  <Button href={content.primary.href}>
                    {content.primary.label}
                  </Button>
                  <Button href={content.secondary.href} variant="secondary">
                    {content.secondary.label}
                  </Button>
                </div>
              </div>
            </div>
            <div
              data-hero-fade
              className="flex flex-wrap items-stretch justify-between gap-px"
            >
              <Caption className="bg-warm-white px-4 py-2.5">
                {content.caption}
              </Caption>
              <span className="hidden items-center gap-4 bg-warm-white px-4 py-2.5 font-mono text-small text-charcoal lg:flex">
                {content.scrollCue}
                <span className="block h-4 w-px bg-charcoal" />
              </span>
            </div>
          </div>
        </div>
      </section>
    </HeroMotion>
  );
}
