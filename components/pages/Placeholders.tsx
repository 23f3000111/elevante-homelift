import { Reveal } from "@/components/ui/Reveal";
import type { ConfigurationItem, Testimonial } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * Customer experiences. With none yet, the section is a single honest
 * line; when they arrive, each is set as a quotation with a name and place.
 */
export function Testimonials({ title, note, items }: { title: string; note: string; items: Testimonial[] }) {
  return (
    <Reveal as="section" id="experiences" className="bg-white py-section" aria-labelledby="testimonials-title">
      <div className="container-content">
        <div className="sheet gap-y-8">
          <h2 id="testimonials-title" data-reveal className="col-span-12 max-w-[12ch] text-display-2 font-medium text-charcoal lg:col-span-4">
            {title}
          </h2>
          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            {items.length === 0 ? (
              <p data-reveal className="max-w-[48ch] border-t border-dashed border-warm-grey pt-6 text-body-l text-charcoal-soft">
                {note}
              </p>
            ) : (
              <ul className="border-t border-charcoal">
                {items.map((t) => (
                  <li key={t.id} data-reveal className="border-b border-stone py-8">
                    <blockquote className="max-w-[40ch] text-display-3 font-medium text-charcoal">{t.quote}</blockquote>
                    <p className="mt-4 font-mono text-mono text-caption">
                      {t.name}, {t.location}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/** The configurations a house can take, with the ones still to come marked. */
export function Configurations({ title, note, items }: { title: string; note: string; items: ConfigurationItem[] }) {
  return (
    <Reveal as="section" id="configurations" className="bg-white py-section" aria-labelledby="configurations-title">
      <div className="container-content">
        <div className="sheet gap-y-8">
          <div className="col-span-12 lg:col-span-4">
            <h2 id="configurations-title" data-reveal className="max-w-[12ch] text-display-2 font-medium text-charcoal">
              {title}
            </h2>
            <p data-reveal className="mt-6 max-w-[36ch] text-small text-caption">
              {note}
            </p>
          </div>
          <ul className="col-span-12 border-t border-charcoal lg:col-span-7 lg:col-start-6">
            {items.map((c) => (
              <li key={c.id} data-reveal className={cn("grid gap-2 border-b py-6 sm:grid-cols-12 sm:gap-6", c.placeholder ? "border-dashed border-warm-grey" : "border-stone")}>
                <p className={cn("text-h3 font-medium sm:col-span-5", c.placeholder ? "text-caption" : "text-charcoal")}>{c.name}</p>
                <p className="text-body text-charcoal-soft sm:col-span-7">{c.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}

/** A short statement with a placeholder note beneath it, for what is arranged but not yet published. */
export function Statement({ id, title, body, note }: { id?: string; title: string; body: string; note?: string }) {
  return (
    <Reveal as="section" id={id} className="bg-warm-white py-section" aria-labelledby={`${id ?? "statement"}-title`}>
      <div className="container-content">
        <div className="sheet gap-y-8">
          <h2 id={`${id ?? "statement"}-title`} data-reveal className="col-span-12 max-w-[12ch] text-display-2 font-medium text-charcoal lg:col-span-4">
            {title}
          </h2>
          <div className="col-span-12 lg:col-span-7 lg:col-start-6" data-reveal>
            <p className="max-w-[48ch] text-body-l text-charcoal-soft">{body}</p>
            {note && <p className="mt-6 max-w-[48ch] border-t border-dashed border-warm-grey pt-5 font-mono text-mono text-caption">{note}</p>}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
