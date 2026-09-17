import type { CSSProperties } from "react";
import { Button } from "@/components/ui/Button";
import { Caption } from "@/components/ui/Caption";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";
import { SectionIndex } from "@/components/ui/SectionIndex";
import { Section } from "@/components/ui/Section";
import { VideoLoop } from "@/components/ui/VideoLoop";
import type { HomeContent } from "@/content/types";

/**
 * Three material panels laid over one another inside one box that always
 * fits the screen. Each panel is sized by height, so its width follows the
 * source's proportions and nothing is cropped; each drifts sideways a little.
 */
const PANELS = [
  { pos: "top-[2%] right-0", h: 0.44, drift: "-0.1" }, // oak, landscape, top right
  { pos: "top-0 left-0", h: 0.68, drift: "0.08" }, // stone, upright, top left
  { pos: "bottom-0 left-[30%]", h: 0.62, drift: "0.04" }, // metal, upright, over the stone's corner
];

/** Caption row above each panel, in rem, subtracted from the panel height. */
const CAPTION_REM = 1.75;

export function DesignTeaser({ content }: { content: HomeContent["design"] }) {
  return (
    <Section id="design" labelledBy="design-title" className="overflow-x-clip">
      <Reveal className="container-content">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
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
            <div className="relative w-full" style={{ "--box": "min(68vh, 40rem)", height: "var(--box)" } as CSSProperties}>
              {content.materials.map((m, i) => {
                const panel = PANELS[i % PANELS.length];
                const ratio = m.media.width / m.media.height;
                // Explicit height and width from the box, so the source's proportions are kept exactly.
                const imgH = `calc(var(--box) * ${panel.h} - ${CAPTION_REM}rem)`;
                return (
                  <figure key={m.name} className={`absolute ${panel.pos}`} style={{ height: `calc(var(--box) * ${panel.h})`, width: `calc(${imgH} * ${ratio.toFixed(4)})` }}>
                    <div data-parallax-x={panel.drift} className="h-full">
                      <figcaption className="font-mono text-small text-charcoal uppercase tracking-[0.06em]" style={{ height: `${CAPTION_REM}rem` }}>
                        {m.name}
                      </figcaption>
                      <div data-reveal-clip className="relative w-full overflow-hidden" style={{ height: imgH }}>
                        <Picture asset={m.media} fill sizes="(min-width: 1024px) 24vw, 60vw" className="h-full w-full" />
                      </div>
                    </div>
                  </figure>
                );
              })}
            </div>
            <Caption className="mt-5">{content.materialsNote}</Caption>
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
