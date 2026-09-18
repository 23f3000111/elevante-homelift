import { AppLink } from "@/components/ui/AppLink";
import { Arrow } from "@/components/ui/Arrow";
import type { Cta, PageIntroContent } from "@/content/types";

interface PageIntroProps {
  intro: PageIntroContent;
  dealerCta: Cta;
}

/**
 * The legal pages until their text arrives: a statement of what will be
 * here, and the two useful next steps.
 */
export function PageIntro({ intro, dealerCta }: PageIntroProps) {
  return (
    <section aria-labelledby="page-title" className="bg-warm-white pt-[calc(var(--spacing-header)+3rem)] pb-section">
      <div className="container-content">
        <div className="sheet gap-y-10">
          <div className="col-span-12 lg:col-span-7">
            <h1 id="page-title" className="text-display-1 font-medium text-charcoal">
              {intro.title}
            </h1>
            <p className="mt-8 max-w-[48ch] text-body-l text-charcoal-soft">{intro.body}</p>
          </div>
          <aside className="col-span-12 lg:col-span-4 lg:col-start-9">
            <p className="border-t border-dashed border-warm-grey pt-5 font-mono text-mono text-caption">{intro.note}</p>
            <div className="mt-8 flex flex-col gap-4">
              <AppLink href={dealerCta.href} className="action">
                {dealerCta.label}
                <Arrow />
              </AppLink>
              <AppLink href="/" className="text-link inline-block text-body text-charcoal">
                Back to the homepage
              </AppLink>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
