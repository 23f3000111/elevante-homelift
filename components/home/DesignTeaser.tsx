import { Button } from "@/components/ui/Button";
import { Caption } from "@/components/ui/Caption";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";
import { SectionIndex } from "@/components/ui/SectionIndex";
import { Section } from "@/components/ui/Section";
import { VideoLoop } from "@/components/ui/VideoLoop";
import type { HomeContent } from "@/content/types";

/** Three material panels laid over one another, each drifting sideways at its own rate. */
const PANELS = [
  { pos: "right-0 top-[8%] w-[52%]", drift: "-0.2", sizes: "(min-width: 1024px) 30vw, 55vw" },
  { pos: "left-0 top-0 w-[36%]", drift: "0.25", sizes: "(min-width: 1024px) 20vw, 40vw" },
  { pos: "left-[30%] bottom-0 w-[32%]", drift: "0.12", sizes: "(min-width: 1024px) 18vw, 35vw" },
];

export function DesignTeaser({ content }: { content: HomeContent["design"] }) {
  return (
    <Section id="design" labelledBy="design-title" className="overflow-x-clip">
      <Reveal className="container-content">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionIndex index={content.index} label={content.indexLabel} />
            <h2 id="design-title" data-reveal className="mt-8 text-display-2">
              {content.title}
            </h2>
            <p data-reveal className="mt-8 max-w-[40ch] text-body-l text-charcoal-soft">
              {content.body}
            </p>
            <div data-reveal className="mt-10">
              <Button href={content.cta.href} variant="secondary">
                {content.cta.label}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative aspect-[4/5] w-full sm:aspect-square">
              {content.materials.map((m, i) => {
                const panel = PANELS[i % PANELS.length];
                return (
                  <figure key={m.name} className={`absolute ${panel.pos}`} style={{ maxWidth: m.media.width }}>
                    <div data-parallax-x={panel.drift} className="relative">
                      <figcaption className="mb-2 font-mono text-small text-charcoal uppercase tracking-[0.06em]">{m.name}</figcaption>
                      <div data-reveal-clip className="relative overflow-hidden" style={{ aspectRatio: `${m.media.width} / ${m.media.height}` }}>
                        <Picture asset={m.media} fill sizes={panel.sizes} className="h-full w-full" />
                      </div>
                    </div>
                  </figure>
                );
              })}
            </div>
            <Caption className="mt-6">{content.materialsNote}</Caption>
          </div>
        </div>

        <figure className="mt-16 lg:mt-24 lg:ml-[25%]">
          <div data-reveal-clip className="aspect-video overflow-hidden bg-stone">
            <VideoLoop video={content.video} />
          </div>
          <figcaption className="mt-3">
            <Caption>{content.caption}</Caption>
          </figcaption>
        </figure>
      </Reveal>
    </Section>
  );
}
