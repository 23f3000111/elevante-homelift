import { AppLink } from "@/components/ui/AppLink";
import { Arrow } from "@/components/ui/Arrow";
import { Reveal } from "@/components/ui/Reveal";
import type { HomeContent } from "@/content/types";

/**
 * Whitespace after the film: the benefit in two paragraphs, set large, off
 * the left edge, with room around them. The two actions the brief asks for
 * follow.
 */
export function Lead({ content, index }: { content: HomeContent["lead"]; index: string }) {
  return (
    <Reveal as="section" className="bg-warm-white py-section" aria-label="What Elevante solves">
      <div className="container-content">
        <div className="sheet">
          <p className="col-span-12 font-mono text-mono text-caption lg:col-span-1" data-reveal>
            {index}
          </p>
          <div className="col-span-12 lg:col-span-8 lg:col-start-3">
            <div data-reveal-lines>
              <p className="max-w-[26ch] text-display-3 font-medium text-charcoal">{content.lines[0]}</p>
              {content.lines.slice(1).map((line) => (
                <p key={line} className="mt-10 max-w-[52ch] text-body-l text-charcoal-soft">
                  {line}
                </p>
              ))}
            </div>
            <div className="mt-14 flex flex-wrap gap-x-10 gap-y-4" data-reveal>
              <AppLink href={content.primary.href} className="action">
                {content.primary.label}
                <Arrow />
              </AppLink>
              <AppLink href={content.secondary.href} className="action">
                {content.secondary.label}
                <Arrow />
              </AppLink>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
