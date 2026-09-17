import { Button } from "@/components/ui/Button";
import { Caption } from "@/components/ui/Caption";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";
import { SectionIndex } from "@/components/ui/SectionIndex";
import { Section } from "@/components/ui/Section";
import { VideoLoop } from "@/components/ui/VideoLoop";
import type { HomeContent, Material } from "@/content/types";

/**
 * A material reference shown whole: the still or the film at its own
 * proportions, never wider than its source, never cropped.
 */
function MaterialFigure({ material, sizes, className }: { material: Material; sizes: string; className?: string }) {
  const { media, video } = material;
  return (
    <figure data-reveal className={className}>
      <figcaption className="mb-2 flex items-baseline justify-between gap-4 font-mono text-small text-charcoal uppercase tracking-[0.06em]">
        <span>{material.name}</span>
        {material.caption && <span className="normal-case tracking-normal text-caption">{material.caption}</span>}
      </figcaption>
      <div style={{ maxWidth: media.width }}>
        {video ? (
          <div className="w-full bg-stone" style={{ aspectRatio: `${media.width} / ${media.height}` }}>
            <VideoLoop video={video} />
          </div>
        ) : (
          <Picture asset={media} sizes={sizes} />
        )}
      </div>
    </figure>
  );
}

/**
 * Three references laid out as an editorial spread: the oak room large
 * beside the statement, the stone scene as the film below it, the bronze
 * cabin upright at the side. Each is complete; nothing is cut.
 */
export function DesignTeaser({ content }: { content: HomeContent["design"] }) {
  const [oak, stone, metal] = content.materials;
  return (
    <Section id="design" labelledBy="design-title" className="overflow-x-clip">
      <Reveal className="container-content">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-4">
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
          {oak && <MaterialFigure material={oak} sizes="(min-width: 1024px) 62vw, 100vw" className="lg:col-span-8" />}
        </div>

        <div className="mt-12 grid grid-cols-12 items-start gap-x-6 gap-y-12 lg:mt-16">
          {stone && <MaterialFigure material={stone} sizes="(min-width: 1024px) 56vw, 100vw" className="col-span-12 lg:col-span-7 lg:col-start-2" />}
          {metal && <MaterialFigure material={metal} sizes="(min-width: 1024px) 24vw, 70vw" className="col-span-9 lg:col-span-3 lg:col-start-10 lg:mt-24" />}
        </div>

        <Caption className="mt-8 lg:ml-[calc(100%/12+0.5rem)]">{content.materialsNote}</Caption>
      </Reveal>
    </Section>
  );
}
