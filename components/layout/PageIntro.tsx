import type { Cta, PageIntroContent } from "@/content/types";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";

interface PageIntroProps {
  intro: PageIntroContent;
  dealerCta: Cta;
}

/**
 * The opening of every secondary page. Until each page is built out it
 * states plainly what will be here and offers the two useful next steps.
 */
export function PageIntro({ intro, dealerCta }: PageIntroProps) {
  return (
    <Section space="section" labelledBy="page-title">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h1 id="page-title" className="text-display-2">
              {intro.title}
            </h1>
            <p className="mt-8 max-w-[52ch] text-body-l text-charcoal-soft">
              {intro.body}
            </p>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="border-t border-stone pt-5">
              <p className="text-small text-caption">{intro.note}</p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button href={dealerCta.href}>{dealerCta.label}</Button>
              <Button href="/" variant="secondary">
                Back to the homepage
              </Button>
            </div>
          </aside>
        </div>
      </Container>
    </Section>
  );
}
