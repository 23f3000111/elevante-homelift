import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import type { HomeContent, Project } from "@/content/types";

const IMG_HOVER = "transition-transform duration-[900ms] ease-[var(--ease-out-quart)] group-hover:scale-[1.04] group-focus-visible:scale-[1.04]";

/** Placement per position in the list: the grid stays asymmetric as projects are added. */
const SLOTS = [
  { cell: "col-span-6 lg:col-span-4 lg:col-start-1", aspect: "aspect-[3/4]", sizes: "(min-width: 1024px) 30vw, 48vw" },
  { cell: "col-span-6 lg:col-span-3 lg:col-start-6 lg:mt-24", aspect: "aspect-[4/5]", sizes: "(min-width: 1024px) 22vw, 48vw" },
  { cell: "col-span-12 lg:col-span-4 lg:col-start-9 lg:mt-12", aspect: "aspect-[3/2]", sizes: "(min-width: 1024px) 30vw, 100vw" },
  { cell: "col-span-12 lg:col-span-6 lg:col-start-4", aspect: "aspect-[3/2]", sizes: "(min-width: 1024px) 46vw, 100vw" },
  { cell: "col-span-6 lg:col-span-4 lg:col-start-1", aspect: "aspect-[4/5]", sizes: "(min-width: 1024px) 30vw, 48vw" },
  { cell: "col-span-6 lg:col-span-5 lg:col-start-7 lg:mt-20", aspect: "aspect-[3/2]", sizes: "(min-width: 1024px) 38vw, 48vw" },
];

interface ProjectsProps {
  content: HomeContent["projects"];
  projects: Project[];
}

/**
 * The gallery the CMS will fill. Entries come from structured data; while
 * each is a reference interior rather than an installation, it says so.
 */
export function Projects({ content, projects }: ProjectsProps) {
  return (
    <Section id="projects" tone="white" labelledBy="projects-title">
      <Reveal className="container-content">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 id="projects-title" data-reveal className="text-display-2 lg:col-span-6">
            {content.title}
          </h2>
          <p data-reveal className="max-w-[44ch] text-body-l text-charcoal-soft lg:col-span-5 lg:col-start-8">
            {content.body}
          </p>
        </div>

        <ol className="mt-14 grid grid-cols-12 gap-x-4 gap-y-12 lg:gap-x-6">
          {projects.map((project, i) => {
            const slot = SLOTS[i % SLOTS.length];
            return (
              <li key={project.id} className={slot.cell}>
                <Link href={content.cta.href} className="group block">
                  <div data-reveal-clip className={`relative w-full overflow-hidden ${slot.aspect}`}>
                    <Picture asset={project.media} fill sizes={slot.sizes} className="h-full w-full" imgClassName={IMG_HOVER} />
                  </div>
                  <div className="mt-4 flex items-baseline gap-4">
                    <span className="font-mono text-small text-caption">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="text-h3">{project.title}</h3>
                      <p className="mt-1 text-small text-caption">{project.placeholder ? content.placeholderLabel : project.location}</p>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>

        <div data-reveal className="mt-14">
          <Button href={content.cta.href} variant="secondary">
            {content.cta.label}
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
