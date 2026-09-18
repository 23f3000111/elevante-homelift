import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import type { Testimonial } from "@/content/types";

/** Customer experiences, or an honest note until there are any. */
export function Testimonials({
  title,
  note,
  items,
}: {
  title: string;
  note: string;
  items: Testimonial[];
}) {
  const real = items.filter((t) => !t.placeholder);
  return (
    <Section tone="warm-white" labelledBy="testimonials-title">
      <Reveal className="container-content">
        <div className="grid gap-10 lg:grid-cols-12">
          <h2
            id="testimonials-title"
            data-reveal
            className="text-display-2 lg:col-span-4"
          >
            {title}
          </h2>
          <div className="lg:col-span-7 lg:col-start-6">
            {real.length === 0 ? (
              <p
                data-reveal
                className="max-w-[48ch] border-t border-dashed border-warm-grey pt-6 text-body-l text-caption"
              >
                {note}
              </p>
            ) : (
              <ul className="space-y-10">
                {real.map((t) => (
                  <li
                    key={t.id}
                    data-reveal
                    className="border-t border-stone pt-6"
                  >
                    <blockquote className="max-w-[48ch] text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.25] font-medium text-charcoal">
                      {t.quote}
                    </blockquote>
                    <p className="mt-4 text-small text-caption">
                      {t.name}, {t.location}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
