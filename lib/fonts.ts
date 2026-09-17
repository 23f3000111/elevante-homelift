import { Schibsted_Grotesk } from "next/font/google";
import { GeistMono } from "geist/font/mono";

/**
 * Two families only. Schibsted Grotesk carries display, headings and body;
 * Geist Mono is reserved for drawing annotations and step numerals.
 */
export const sans = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted",
  display: "swap",
});

export const mono = GeistMono;

export const fontVariables = `${sans.variable} ${mono.variable}`;
