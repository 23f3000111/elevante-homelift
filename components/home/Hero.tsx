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
      <section id="top" aria-labelledby="hero-title" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-stone">
        <div data-hero-media className="absolute inset-0">
          <div data-hero-zoom className="absolute inset-0">
            <VideoLoop video={content.video} eager className="h-full w-full" />
          </div>
        </div>

        <div data-hero-inner className="relative z-10 flex flex-1 flex-col justify-end">
          <div className="container-content pt-[46svh] pb-6 lg:pt-28 lg:pb-8">
            <div data-hero-plate className="max-w-[56rem] bg-warm-white p-6 sm:p-8 lg:p-10 lg:pr-14">
              <MaskedText
                as="h1"
                id="hero-title"
                text={content.title}
                className="block text-[clamp(2.4rem,min(5.8vw,9.2svh),6rem)] font-medium leading-[0.94] tracking-[-0.035em] text-charcoal"
              />
              <div className="mt-6 grid gap-5 lg:mt-7 lg:grid-cols-12 lg:items-end">
                <p data-hero-fade className="max-w-[44ch] text-body text-charcoal-soft lg:col-span-7 lg:text-body-l">
                  {content.lead}
                </p>
                <div data-hero-fade className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
                  <Button href={content.primary.href}>{content.primary.label}</Button>
                  <Button href={content.secondary.href} variant="secondary">
                    {content.secondary.label}
                  </Button>
                </div>
              </div>
            </div>
            <div data-hero-fade className="mt-3 flex items-center justify-between gap-6">
              <Caption className="bg-warm-white/95 px-3 py-1.5">{content.caption}</Caption>
              <span className="hidden items-center gap-3 font-mono text-small text-charcoal lg:flex">
                <span className="bg-warm-white/95 px-3 py-1.5">{content.scrollCue}</span>
                <span className="block h-12 w-px bg-charcoal" />
              </span>
            </div>
          </div>
        </div>
      </section>
    </HeroMotion>
  );
}
