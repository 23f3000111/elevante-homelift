import { Button } from "@/components/ui/Button";
import { Caption } from "@/components/ui/Caption";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { VideoLoop } from "@/components/ui/VideoLoop";
import type { HomeContent } from "@/content/types";

/** A teaser, not a configurator: the film, three material references, one link. */
export function DesignTeaser({ content }: { content: HomeContent["design"] }) {
  return (
    <Section id="design" labelledBy="design-title">
      <Reveal className="container-content">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <h2 id="design-title" data-reveal className="text-display-2">
              {content.title}
            </h2>
            <p data-reveal className="mt-8 max-w-[42ch] text-body-l text-charcoal-soft">
              {content.body}
            </p>
            <ul data-reveal className="mt-10 grid max-w-[30rem] grid-cols-3 gap-3">
              {content.materials.map((m) => (
                <li key={m.name}>
                  <div className="relative aspect-square overflow-hidden">
                    <Picture asset={m.media} fill sizes="10rem" className="h-full w-full" />
                  </div>
                  <span className="mt-2 block text-small text-charcoal">{m.name}</span>
                </li>
              ))}
            </ul>
            <Caption data-reveal className="mt-3 max-w-[30rem]">
              {content.materialsNote}
            </Caption>
            <div data-reveal className="mt-10">
              <Button href={content.cta.href} variant="secondary">
                {content.cta.label}
              </Button>
            </div>
          </div>
          <figure className="order-1 lg:order-2 lg:col-span-7">
            <div data-reveal-clip className="aspect-video overflow-hidden bg-stone">
              <VideoLoop video={content.video} />
            </div>
            <figcaption className="mt-3">
              <Caption>{content.caption}</Caption>
            </figcaption>
          </figure>
        </div>
      </Reveal>
    </Section>
  );
}
