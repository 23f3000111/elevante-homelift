import { MechanismScene } from "@/components/3d/MechanismScene";
import { AppLink } from "@/components/ui/AppLink";
import { Arrow } from "@/components/ui/Arrow";
import { MaskedText } from "@/components/ui/MaskedText";
import type { HomeContent } from "@/content/types";
import { HeroIntro } from "./HeroIntro";

/**
 * The opening of the site: a clean sheet, the statement in very large type,
 * and the house that draws itself as the visitor scrolls. The headline is
 * the first screen of the mechanism scene, so the two are one movement.
 */
export function Hero({ hero, mechanism }: { hero: HomeContent["hero"]; mechanism: HomeContent["mechanism"] }) {
  return (
    <MechanismScene
      id="mechanism"
      content={mechanism}
      opening={
        <HeroIntro>
          <section aria-labelledby="hero-title" className="relative flex min-h-[100svh] flex-col">
            <div className="container-content flex flex-1 flex-col pt-[calc(var(--spacing-header)+1.5rem)] pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:pb-8 lg:pb-10">
              <p data-hero-fade className="font-mono text-mono text-caption">
                {hero.label}
              </p>

              <div className="flex flex-1 flex-col justify-center py-10 lg:py-12">
                <MaskedText
                  as="h1"
                  id="hero-title"
                  text={hero.title}
                  className="block max-w-[11.5ch] text-hero font-medium text-charcoal"
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
                <p data-hero-fade className="col-span-12 mt-6 hidden items-center gap-4 font-mono text-mono text-caption lg:col-span-4 lg:mt-0 lg:flex lg:justify-end">
                  {hero.scrollCue}
                  <span aria-hidden className="block h-5 w-px bg-charcoal" />
                </p>
              </div>
            </div>
          </section>
        </HeroIntro>
      }
    />
  );
}
