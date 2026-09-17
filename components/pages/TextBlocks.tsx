import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import type { TextBlock } from "@/content/types";

/** Short titled paragraphs in a ledger: title on the left, text on the right. */
export function TextBlocks({ blocks, tone = "white" }: { blocks: TextBlock[]; tone?: "white" | "warm-white" }) {
  return (
    <Section tone={tone}>
      <Reveal className="container-content">
        <dl>
          {blocks.map((block) => (
            <div key={block.title} data-reveal className="grid gap-4 border-t border-stone py-10 lg:grid-cols-12 lg:gap-10">
              <dt className="text-h3 lg:col-span-4">{block.title}</dt>
              <dd className="space-y-4 lg:col-span-7 lg:col-start-6">
                {block.paragraphs.map((p) => (
                  <p key={p} className="max-w-[56ch] text-body-l text-charcoal-soft">
                    {p}
                  </p>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}
