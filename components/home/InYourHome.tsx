import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import type { GalleryItem, HomeContent } from "@/content/types";

const IMG_HOVER = "transition-transform duration-[900ms] ease-[var(--ease-out-quart)] group-hover:scale-[1.04] group-focus-visible:scale-[1.04]";

function Tile({ item, href, aspect, sizes }: { item: GalleryItem; href: string; aspect: string; sizes: string }) {
  return (
    <Link href={href} className="group block">
      <div data-reveal-clip className={`relative w-full overflow-hidden ${aspect}`}>
        <Picture asset={item.media} fill sizes={sizes} className="h-full w-full" imgClassName={IMG_HOVER} />
      </div>
      <span className="mt-3 block text-small text-caption transition-colors group-hover:text-charcoal">{item.label}</span>
    </Link>
  );
}

/**
 * Architecture first. Three interiors, set like a portfolio page: one wide,
 * one tall, and one paired with the text.
 */
export function InYourHome({ content }: { content: HomeContent["inYourHome"] }) {
  const [wide, tall, third] = content.gallery;
  const href = content.cta.href;
  return (
    <Section id="in-your-home" labelledBy="iyh-title">
      <Reveal className="container-content">
        <h2 id="iyh-title" data-reveal className="text-display-2 max-w-[14ch]">
          {content.title}
        </h2>

        <div className="mt-14 grid grid-cols-12 gap-x-4 gap-y-10 lg:gap-x-6">
          <div className="col-span-12 lg:col-span-8">
            <Tile item={wide} href={href} aspect="aspect-[3/2]" sizes="(min-width: 1024px) 62vw, 100vw" />
          </div>
          <div className="col-span-7 lg:col-span-4">
            <Tile item={tall} href={href} aspect="aspect-[4/5]" sizes="(min-width: 1024px) 30vw, 58vw" />
          </div>
          <div className="col-span-5 lg:col-span-3 lg:col-start-2">
            <Tile item={third} href={href} aspect="aspect-[4/5]" sizes="(min-width: 1024px) 22vw, 40vw" />
          </div>
          <div className="col-span-12 self-end lg:col-span-5 lg:col-start-7">
            <p data-reveal className="max-w-[44ch] text-body-l text-charcoal-soft">
              {content.body}
            </p>
            <div data-reveal className="mt-8">
              <Button href={content.cta.href} variant="secondary">
                {content.cta.label}
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
