import { AppLink } from "@/components/ui/AppLink";
import { Arrow } from "@/components/ui/Arrow";
import { Reveal } from "@/components/ui/Reveal";
import type { HomeContent } from "@/content/types";

/**
 * The close of every secondary page: the same statement as the homepage's
 * last section, without the film. One large action, one quiet one.
 */
export function NextStep({ content }: { content: HomeContent["finalCta"] }) {
  return (
    <Reveal as="section" className="border-t border-stone bg-warm-white py-section" aria-labelledby="next-title">
      <div className="container-content">
        <div className="sheet gap-y-10">
          <h2 id="next-title" data-reveal className="col-span-12 max-w-[11ch] text-display-1 font-medium text-charcoal lg:col-span-8">
            {content.title}
          </h2>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9 lg:self-end" data-reveal>
            <p className="max-w-[36ch] text-body text-charcoal-soft">{content.body}</p>
            <AppLink href={content.primary.href} className="action mt-8 text-display-3">
              {content.primary.label}
              <Arrow />
            </AppLink>
            <AppLink href={content.secondary.href} className="text-link mt-6 inline-block text-body text-charcoal">
              {content.secondary.label}
            </AppLink>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
