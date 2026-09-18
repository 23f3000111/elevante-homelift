import { Reveal } from "@/components/ui/Reveal";
import type { Faq as FaqItem } from "@/content/types";

/**
 * Questions and answers as native disclosure elements: keyboard operable,
 * readable without JavaScript, large enough to use on a phone.
 */
export function Faq({ title, items, id = "faq" }: { title: string; items: FaqItem[]; id?: string }) {
  return (
    <Reveal as="section" id={id} className="bg-warm-white py-section" aria-labelledby={`${id}-title`}>
      <div className="container-content">
        <div className="sheet gap-y-10">
          <h2 id={`${id}-title`} data-reveal className="col-span-12 max-w-[12ch] text-display-2 font-medium text-charcoal lg:col-span-4">
            {title}
          </h2>
          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            {items.map((item) => (
              <details key={item.id} data-reveal className="group border-t border-stone last:border-b">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-h3 font-medium text-charcoal [&::-webkit-details-marker]:hidden">
                  <span>{item.question}</span>
                  <span aria-hidden className="relative block h-6 w-6 shrink-0">
                    <span className="absolute top-1/2 left-0 h-px w-6 -translate-y-1/2 bg-charcoal" />
                    <span className="absolute top-0 left-1/2 h-6 w-px -translate-x-1/2 bg-charcoal transition-transform duration-300 group-open:scale-y-0" />
                  </span>
                </summary>
                <p className="max-w-[60ch] pb-8 text-body-l text-charcoal-soft">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
