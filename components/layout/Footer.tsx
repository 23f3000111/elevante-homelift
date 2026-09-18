import { AppLink } from "@/components/ui/AppLink";
import type { SiteContent } from "@/content/types";
import { Wordmark } from "./Wordmark";

/**
 * Editorial footer: the proposition once more, then the site in columns.
 * Country and language are shown as a fixed statement until more exist.
 */
export function Footer({ site }: { site: SiteContent }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-stone bg-warm-white">
      <div className="container-content py-section-sm">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Wordmark />
            <p className="mt-6 max-w-[38ch] text-body text-charcoal-soft">
              {site.description}
            </p>
            <p className="mt-6 max-w-[38ch] text-small text-caption">
              {site.footer.contactNote}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7 lg:gap-8">
            {site.footer.groups.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="text-small font-medium text-charcoal">
                  {group.title}
                </h2>
                <ul className="mt-4 space-y-1">
                  {group.items.map((item) => (
                    <li key={item.href + item.label}>
                      <AppLink
                        href={item.href}
                        className="inline-flex min-h-11 items-center text-small text-charcoal-soft underline-offset-4 hover:text-charcoal hover:underline"
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

        <div className="mt-14 flex flex-col gap-4 border-t border-stone pt-6 text-small text-caption sm:flex-row sm:items-center sm:justify-between">
          <p>
            <span className="text-charcoal-soft">{site.footer.regionNote}</span>
          </p>
          <p>
            © {year} {site.footer.legal}
          </p>
        </div>
      </div>
    </footer>
  );
}
