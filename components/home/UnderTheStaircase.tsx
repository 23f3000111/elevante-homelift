import { Plan } from "@/components/diagram/PlanComparison";
import { Caption } from "@/components/ui/Caption";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { VideoLoop } from "@/components/ui/VideoLoop";
import type { HomeContent } from "@/content/types";

/**
 * The spatial consequence: the text stays put while the film and the plan
 * comparison pass beside it. Two plans of the same house make the point
 * without a single dimension.
 */
export function UnderTheStaircase({ content }: { content: HomeContent["underTheStaircase"] }) {
  const { comparison } = content;
  return (
    <Section id="under-the-staircase" tone="white" labelledBy="uts-title">
      <Reveal className="container-content">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <h2 id="uts-title" data-reveal className="text-display-2 max-w-[14ch]">
              {content.title}
            </h2>
            <div data-reveal-lines className="mt-8 max-w-[44ch] space-y-4 text-body-l text-charcoal-soft">
              {content.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <figure>
              <div data-reveal-clip className="aspect-video overflow-hidden bg-stone">
                <VideoLoop video={content.video} />
              </div>
              <figcaption className="mt-3">
                <Caption>{content.caption}</Caption>
              </figcaption>
            </figure>

            <div className="mt-16 border-t border-stone pt-8 lg:mt-20">
              <h3 data-reveal className="text-h3">
                {comparison.title}
              </h3>
              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                <figure data-reveal>
                  <Plan variant="conventional" />
                  <figcaption className="mt-4">
                    <span className="block text-body font-medium text-charcoal">{comparison.conventional.title}</span>
                    <span className="mt-1 block text-body text-charcoal-soft">{comparison.conventional.body}</span>
                  </figcaption>
                </figure>
                <figure data-reveal>
                  <Plan variant="elevante" />
                  <figcaption className="mt-4">
                    <span className="block text-body font-medium text-charcoal">{comparison.elevante.title}</span>
                    <span className="mt-1 block text-body text-charcoal-soft">{comparison.elevante.body}</span>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
