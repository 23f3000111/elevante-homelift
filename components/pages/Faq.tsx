import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import type { Faq as FaqItem } from "@/content/types";

/**
 * Questions and answers as native disclosure elements: keyboard operable,
 * readable without JavaScript, large enough to use on a phone.
 */
export function Faq({ title, items }: { title: string; items: FaqItem[] }) {
  return (
    <Section tone="warm-white" labelledBy="faq-title">
      <Reveal className="container-content">
        <div className="grid gap-10 lg:grid-cols-12">
          <h2
            id="faq-title"
            data-reveal
            className="text-display-2 lg:col-span-4"
          >
            {title}
          </h2>
          <div className="lg:col-span-7 lg:col-start-6">
            {items.map((item) => (
              <details
                key={item.id}
                data-reveal
                className="group border-t border-stone last:border-b"
              >
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-5 text-[1.375rem] leading-tight font-medium text-charcoal [&::-webkit-details-marker]:hidden">
                  <span>{item.question}</span>
                  <span aria-hidden className="relative block h-6 w-6 shrink-0">
                    <span className="absolute top-1/2 left-0 h-0.5 w-6 -translate-y-1/2 bg-charcoal" />
                    <span className="absolute top-0 left-1/2 h-6 w-0.5 -translate-x-1/2 bg-charcoal transition-transform duration-300 group-open:scale-y-0" />
                  </span>
                </summary>
                <p className="max-w-[60ch] pb-7 text-body-l text-charcoal-soft">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
