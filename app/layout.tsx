import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { getSite } from "@/lib/content";
import { fontVariables } from "@/lib/fonts";
import { LenisProvider } from "@/lib/motion/LenisProvider";
import { jsonLdScript, organizationJsonLd } from "@/lib/seo/jsonld";
import { rootMetadata } from "@/lib/seo/metadata";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  return rootMetadata(await getSite());
}

export const viewport: Viewport = {
  themeColor: "#f5f3ee",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

// Marks the document as scripted and records the motion preference before first
// paint, so motion-only hidden states never apply to a page that cannot animate.
const bootScript =
  "document.documentElement.classList.add('js');if(matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('reduce')}";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const site = await getSite();
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(organizationJsonLd(site)) }} />
      </head>
      <body suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-charcoal focus:px-4 focus:py-3 focus:text-warm-white"
        >
          Skip to content
        </a>
        <LenisProvider />
        <Header nav={site.nav} dealerCta={site.dealerCta} regionNote={site.footer.regionNote} />
        <main id="main">{children}</main>
        <Footer site={site} />
      </body>
    </html>
  );
}
