import { MediaFrame } from "@/components/ui/MediaFrame";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";
import type { Project, ProjectKind } from "@/content/types";
import { cn } from "@/lib/cn";

interface ProjectSpreadsProps {
  projects: Project[];
  kinds: Record<ProjectKind, string>;
}

/**
 * The inspiration gallery as magazine spreads: each project takes a full
 * row, the picture large and whole, the metadata small and to one side,
 * alternating sides down the page. Wide pictures span the sheet; small
 * ones sit matted in a frame so they are never enlarged past their pixels.
 */
export function ProjectSpreads({ projects, kinds }: ProjectSpreadsProps) {
  return (
    <Reveal as="section" className="bg-warm-white py-section" aria-label="Projects">
      <div className="container-content space-y-section-sm">
        {projects.map((p, i) => {
          const wide = p.media.width >= 1100;
          const left = i % 2 === 0;
          return (
            <article key={p.id} id={p.slug} className="sheet gap-y-6" data-reveal>
              <figure className={cn("col-span-12", wide ? "" : left ? "lg:col-span-7" : "lg:col-span-7 lg:col-start-6")}>
                {wide ? (
                  <Picture asset={p.media} sizes="100vw" className="mx-auto" />
                ) : (
                  <div className="h-[56svh] min-h-[18rem]">
                    {/* The mat hugs a small picture rather than stranding it in a large box. */}
                    <MediaFrame asset={p.media} sizes="(min-width: 64rem) 55vw, 100vw" tone="white" className={cn("w-fit", left ? "" : "ml-auto")} />
                  </div>
                )}
              </figure>
              <div className={cn("col-span-12 lg:col-span-4", wide ? "lg:col-start-9" : left ? "lg:col-start-9 lg:self-end" : "lg:col-start-1 lg:row-start-1 lg:self-end")}>
                <p className="font-mono text-mono text-caption">
                  {String(i + 1).padStart(2, "0")} / {kinds[p.kind]}
                </p>
                <h2 className="mt-3 text-display-3 font-medium text-charcoal">{p.title}</h2>
                {p.location && <p className="mt-2 font-mono text-mono text-caption">{p.location}</p>}
                <p className="mt-4 max-w-[36ch] text-body text-charcoal-soft">{p.summary}</p>
              </div>
            </article>
          );
        })}
      </div>
    </Reveal>
  );
}
