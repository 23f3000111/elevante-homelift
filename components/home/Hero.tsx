import { MechanismScene } from "@/components/3d/MechanismScene";
import { AppLink } from "@/components/ui/AppLink";
import { Arrow } from "@/components/ui/Arrow";
import { MaskedText } from "@/components/ui/MaskedText";
import { VideoLoop } from "@/components/ui/VideoLoop";
import type { HomeContent } from "@/content/types";
import { HeroIntro } from "./HeroIntro";

/**
 * The opening of the site: the statement in very large type on the left, a
 * film held in a tall panel on the right, and the house that draws itself
 * as the visitor scrolls. The headline is the first screen of the mechanism
 * scene, so the two are one movement; the panel leaves with it.
 */
export function Hero({ hero, mechanism }: { hero: HomeContent["hero"]; mechanism: HomeContent["mechanism"] }) {
  return (
    <MechanismScene
      id="mechanism"
      content={mechanism}
      opening={
        <HeroIntro>
          <section aria-labelledby="hero-title" className="relative flex min-h-[100svh] flex-col">
            {/* The film fills the screen and dissolves into the page where
                the statement sits, so the type never loses its ground. */}
            <div data-hero-bg aria-hidden className="absolute inset-0 overflow-hidden bg-warm-white">
              <VideoLoop video={hero.video} eager className="h-full w-full object-cover" />
            </div>

            <div className="relative container-content flex flex-1 flex-col pt-[calc(var(--spacing-header)+1rem)] pb-[max(2rem,env(safe-area-inset-bottom))] sm:pb-10 lg:pb-12">
              <p data-hero-fade className="font-mono text-mono text-caption">
                {hero.label}
              </p>
              <p data-hero-fade className="sr-only">{hero.caption}</p>

              <div className="sheet flex-1 items-center gap-y-8 py-8 lg:py-10">
                <MaskedText
                  as="h1"
                  id="hero-title"
                  text={hero.title}
                  /* Capped by the viewport height as well as its width, so a
                     short window never pushes the statement off the screen. */
                  className="col-span-12 max-w-[11.5ch] text-[min(var(--text-hero),13.5svh)] leading-[0.92] font-medium tracking-[-0.04em] text-charcoal lg:col-span-8"
                />
              </div>

              <div className="sheet items-end">
                <div data-hero-fade className="col-span-12 flex flex-wrap gap-x-10 gap-y-3 lg:col-span-8">
                  <a href={hero.primary.href} data-hero-primary className="action">
                    {hero.primary.label}
                    <Arrow direction="down" />
                  </a>
                  <AppLink href={hero.secondary.href} className="action">
                    {hero.secondary.label}
                    <Arrow />
                  </AppLink>
                </div>
                <p data-hero-fade className="col-span-12 mt-6 hidden lg:col-span-4 lg:mt-0 lg:flex lg:justify-end">
                  <span className="inline-flex items-center gap-4 bg-warm-white/85 px-3 py-2 font-mono text-mono text-caption">
                    {hero.scrollCue}
                    <span aria-hidden className="block h-5 w-px bg-charcoal" />
                  </span>
                </p>
              </div>
            </div>
          </section>
        </HeroIntro>
      }
    />
  );
}
