import { AppLink } from "@/components/ui/AppLink";
import { Reveal } from "@/components/ui/Reveal";
import type { HomeContent } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * Trust as a ledger, not a row of icons: what can be shown today, what
 * Elevante states, and what is still to follow. Rows with something to
 * show are links.
 */
export function Evidence({ content, index }: { content: HomeContent["evidence"]; index: string }) {
  return (
    <Reveal as="section" className="bg-warm-white py-section" aria-labelledby="evidence-title">
      <div className="container-content">
        <div className="sheet gap-y-10">
          <div className="col-span-12 lg:col-span-4">
            <p className="font-mono text-mono text-caption" data-reveal>
              {index}
            </p>
            <h2 id="evidence-title" className="mt-6 max-w-[10ch] text-display-2 font-medium text-charcoal" data-reveal>
              {content.title}
            </h2>
            <p className="mt-8 max-w-[38ch] text-body text-charcoal-soft" data-reveal>
              {content.body}
            </p>
          </div>
          <ul className="col-span-12 border-t border-charcoal lg:col-span-7 lg:col-start-6" data-reveal-lines>
            {content.items.map((item) => {
              const pending = item.status === "to-follow";
              const inner = (
                <>
                  <span className="grid gap-1">
                    <span className={cn("text-h3 font-medium", pending ? "text-caption" : "text-charcoal")}>{item.title}</span>
                    <span className="text-body text-charcoal-soft">{item.body}</span>
                  </span>
                  <span className={cn("font-mono text-mono whitespace-nowrap", pending ? "text-warm-grey" : "text-oxide")}>{content.statusLabels[item.status]}</span>
                </>
              );
              return (
                <li key={item.title} className="border-b border-stone">
                  {item.href ? (
                    <AppLink href={item.href} className="grid grid-cols-[1fr_auto] items-baseline gap-6 py-5 transition-colors hover:bg-white">
                      {inner}
                    </AppLink>
                  ) : (
                    <div className="grid grid-cols-[1fr_auto] items-baseline gap-6 py-5">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}
