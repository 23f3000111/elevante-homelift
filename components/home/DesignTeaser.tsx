import { Button } from "@/components/ui/Button";
import { Caption } from "@/components/ui/Caption";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionIndex } from "@/components/ui/SectionIndex";
import { Section } from "@/components/ui/Section";
import { VideoLoop } from "@/components/ui/VideoLoop";
import type { HomeContent, Material } from "@/content/types";

/**
 * A material reference in a frame of fixed height, shown whole: never
 * cropped, never drawn larger than its own pixels. Every frame in the row
 * is the same height, so mixed sources line up.
 */
function MaterialFigure({ material, sizes }: { material: Material; sizes: string }) {
  const { media, video } = material;
  return (
    <figure data-reveal className="flex flex-col">
      <figcaption className="mb-2 flex h-11 items-baseline justify-between gap-4 border-t border-stone pt-3 font-mono text-small tracking-[0.06em] text-charcoal uppercase">
        <span>{material.name}</span>
        {material.caption && <span className="tracking-normal text-caption normal-case">{material.caption}</span>}
      </figcaption>
      <div className="h-[58vw] max-h-[22rem] sm:h-[20rem] lg:h-[clamp(14rem,36svh,20rem)]">
        {video ? (
          <div className="flex h-full items-center justify-center overflow-hidden bg-white">
            <div className="h-full max-h-full w-auto max-w-full" style={{ aspectRatio: `${media.width} / ${media.height}` }}>
              <VideoLoop video={video} />
            </div>
          </div>
        ) : (
          <MediaFrame asset={media} sizes={sizes} />
        )}
      </div>
    </figure>
  );
}

/**
 * The design teaser: the statement, then the three references side by side
 * on one baseline. Each is complete; nothing is cut.
 */
export function DesignTeaser({ content }: { content: HomeContent["design"] }) {
  return (
    <Section id="design" labelledBy="design-title" className="overflow-x-clip">
      <Reveal className="container-content">
        <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <SectionIndex index={content.index} label={content.indexLabel} size="small" />
            <h2 id="design-title" data-reveal className="mt-6 text-display-2">
              {content.title}
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p data-reveal className="max-w-[42ch] text-body-l text-charcoal-soft">
              {content.body}
            </p>
            <div data-reveal className="mt-6">
              <Button href={content.cta.href} variant="secondary">
                {content.cta.label}
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {content.materials.map((m) => (
            <MaterialFigure key={m.name} material={m} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw" />
          ))}
        </div>

        <Caption className="mt-6">{content.materialsNote}</Caption>
      </Reveal>
    </Section>
  );
}
