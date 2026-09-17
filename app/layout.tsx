import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Elevante Homelift",
  description:
    "A homelift whose cabin travels in the space underneath the staircase. Comfortably and safely remain living in your own home.",
};

export const viewport: Viewport = {
  themeColor: "#f5f3ee",
  colorScheme: "light",
};

// Marks the document as scripted and records the motion preference before first
// paint, so motion-only hidden states never apply to a page that cannot animate.
const bootScript =
  "document.documentElement.classList.add('js');if(matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('reduce')}";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
