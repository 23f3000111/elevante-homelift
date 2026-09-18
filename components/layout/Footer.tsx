import { AppLink } from "@/components/ui/AppLink";
import type { SiteContent } from "@/content/types";
import { Wordmark } from "./Wordmark";

/**
 * The end of the film: the proposition once more, very large, then the
 * site in columns. Country and language are a fixed statement until more
 * exist.
 */
export function Footer({ site }: { site: SiteContent }) {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-charcoal text-warm-white">
      <div className="container-content pt-section-sm pb-10">
        <p className="max-w-[16ch] text-display-2 font-medium text-warm-white">{site.footer.statement}</p>

        <div className="mt-16 grid gap-12 border-t border-warm-white/15 pt-10 lg:mt-24 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Wordmark light />
            <p className="mt-6 max-w-[36ch] text-body text-warm-white/80">{site.description}</p>
            <p className="mt-6 max-w-[36ch] text-small text-warm-white/55">{site.footer.contactNote}</p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7 lg:gap-8">
            {site.footer.groups.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="font-mono text-mono text-warm-white/55">{group.title}</h2>
                <ul className="mt-4 space-y-1">
                  {group.items.map((item) => (
                    <li key={item.href + item.label}>
                      <AppLink
                        href={item.href}
                        className="inline-flex min-h-11 items-center text-small text-warm-white/85 underline-offset-4 hover:text-warm-white hover:underline"
                      >
                        {item.label}
                      </AppLink>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-warm-white/15 pt-6 font-mono text-mono text-warm-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>{site.footer.regionNote}</p>
          <p>
            © {year} {site.footer.legal}
          </p>
        </div>
      </div>
    </footer>
  );
}
