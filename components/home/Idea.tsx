import { MaskedText } from "@/components/ui/MaskedText";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionIndex } from "@/components/ui/SectionIndex";
import { Section } from "@/components/ui/Section";
import type { HomeContent } from "@/content/types";

/**
 * One statement at display size, set against the spiral seen from above.
 * The picture drifts slowly against the scroll so the two layers separate,
 * and the three comparisons underneath say what changes and what does not.
 */
const COMPARISON = [
  {
    term: "A stairlift",
    detail: "Leaves the staircase in place and adds a visible aid to it.",
  },
  {
    term: "A conventional homelift",
    detail: "Needs its own position in the house.",
  },
  {
    term: "Elevante",
    detail: "Uses the space the staircase already occupies.",
  },
];

export function Idea({ content }: { content: HomeContent["idea"] }) {
  return (
    <Section
      id="idea"
      tone="white"
      labelledBy="idea-title"
      className="overflow-x-clip"
    >
      <Reveal className="container-content">
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <SectionIndex
              index={content.index}
              label={content.indexLabel}
              size="small"
            />
            <MaskedText
              as="h2"
              id="idea-title"
              text={content.title}
              className="mt-6 block max-w-[15ch] text-[clamp(2.5rem,5.2vw,5.25rem)] font-medium leading-[0.98] tracking-[-0.03em] text-charcoal"
            />
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <div
              data-reveal-clip
              className="h-[70vw] max-h-[26rem] sm:h-[24rem]"
            >
              <div data-parallax="0.22" className="h-full">
                <MediaFrame
                  asset={content.media}
                  sizes="(min-width: 1024px) 30vw, 90vw"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-8 border-t border-stone pt-8 lg:mt-14 lg:grid-cols-12 lg:gap-8">
          <p
            data-reveal
            className="max-w-[46ch] text-body-l text-charcoal-soft lg:col-span-5"
          >
            {content.body}
          </p>
          <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
            {COMPARISON.map((row, i) => (
              <div
                key={row.term}
                data-reveal
                className="border-t border-stone pt-4"
              >
                <dt className="flex items-baseline gap-3 text-body font-medium text-charcoal">
                  <span className="font-mono text-small text-caption">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {row.term}
                </dt>
                <dd className="mt-2 text-body text-charcoal-soft">
                  {row.detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </Section>
  );
}
