import { Button } from "@/components/ui/Button";
import { Picture } from "@/components/ui/Picture";
import { Container, Section } from "@/components/ui/Section";
import type { HomeContent } from "@/content/types";
import { HeroMotion } from "./HeroMotion";

/**
 * The benefit first, as type. The house sits beside it and bleeds off the
 * right edge on wide screens; on a phone it follows the words.
 */
export function Hero({ content }: { content: HomeContent["hero"] }) {
  const words = content.title.split(" ");
  return (
    <Section id="top" space="flush" labelledBy="hero-title" className="pt-8 lg:pt-14">
      <HeroMotion>
        <Container>
          <div className="grid items-end gap-x-8 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-7 lg:pb-20">
              <h1 id="hero-title" className="text-display-1 max-w-[15ch]">
                {words.map((word, i) => (
                  <span key={`${word}-${i}`} className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-top">
                    <span data-hero-word className="inline-block">
                      {word}
                    </span>
                    {i < words.length - 1 ? " " : ""}
                  </span>
                ))}
              </h1>
              <p data-hero-fade className="mt-8 max-w-[44ch] text-body-l text-charcoal-soft">
                {content.lead}
              </p>
              <div data-hero-fade className="mt-10 flex flex-wrap gap-4">
                <Button href={content.primary.href}>{content.primary.label}</Button>
                <Button href={content.secondary.href} variant="secondary">
                  {content.secondary.label}
                </Button>
              </div>
            </div>
            <div className="lg:col-span-5 lg:-mr-gutter">
              <div data-hero-media className="relative aspect-[4/3] w-full lg:aspect-[4/5]">
                <Picture
                  asset={content.media}
                  fill
                  priority
                  sizes="(min-width: 1024px) 44vw, 100vw"
                  className="h-full w-full"
                  imgClassName="will-change-transform"
                />
              </div>
            </div>
          </div>
        </Container>
        <div className="container-content mt-14 lg:mt-20">
          <div className="rule" />
        </div>
      </HeroMotion>
    </Section>
  );
}
