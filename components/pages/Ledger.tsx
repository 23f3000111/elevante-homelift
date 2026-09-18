import { Reveal } from "@/components/ui/Reveal";
import type { TextBlock } from "@/content/types";
import { cn } from "@/lib/cn";

interface LedgerProps {
  blocks: TextBlock[];
  /** A heading for the whole ledger; each block also has its own. */
  title?: string;
  tone?: "warm-white" | "white";
  id?: string;
}

/**
 * Short blocks of copy as an editorial ledger: each title set large on the
 * left, its paragraphs to the right, a rule between. No cards.
 */
export function Ledger({ blocks, title, tone = "warm-white", id }: LedgerProps) {
  return (
    <Reveal as="section" id={id} className={cn("py-section", tone === "white" ? "bg-white" : "bg-warm-white")} aria-label={title}>
      <div className="container-content">
        {title && (
          <h2 className="mb-12 text-display-2 font-medium text-charcoal lg:mb-16" data-reveal>
            {title}
          </h2>
        )}
        <dl className="border-t border-charcoal">
          {blocks.map((block) => (
            <div key={block.title} className="sheet gap-y-4 border-b border-stone py-8 lg:py-12" data-reveal>
              <dt className="col-span-12 text-display-3 font-medium text-charcoal lg:col-span-5">{block.title}</dt>
              <dd className="col-span-12 space-y-5 text-body-l text-charcoal-soft lg:col-span-6 lg:col-start-7">
                {block.paragraphs.map((p) => (
                  <p key={p} className="max-w-[52ch]">
                    {p}
                  </p>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Reveal>
  );
}
