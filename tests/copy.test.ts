import { describe, expect, it } from "vitest";
import { site } from "@/content/en/site";
import { home } from "@/content/en/home";
import { projects } from "@/content/en/projects";
import { testimonials } from "@/content/en/testimonials";
import { faqs } from "@/content/en/faqs";
import { dealers } from "@/content/en/dealers";
import { downloads } from "@/content/en/downloads";
import { designOptions } from "@/content/en/design-options";
import { pages } from "@/content/en/pages";
import { images, videos } from "@/content/media";

/** Brief §16: generic marketing fillers that must not appear anywhere. */
const FORBIDDEN = [
  "discover",
  "experience ultimate comfort",
  "designed with you in mind",
  "at your own pace",
  "we understand",
  "a world of possibilities",
  "seamlessly fits your lifestyle",
  "seamless",
  "peace of mind",
  "elevate your",
];

/** Words that would signal invented specifications or claims. */
const SUSPECT = [/\b\d+\s?(kg|mm|cm|m|kw|v)\b/i, /\bcertified\b/i, /\bISO\s?\d/i, /\bEN\s?81/i, /\bwarranty\b/i];

function strings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => strings(v, out));
  else if (value && typeof value === "object") Object.values(value).forEach((v) => strings(v, out));
  return out;
}

const corpus = strings([site, home, projects, testimonials, faqs, dealers, downloads, designOptions, pages]);
const alts = [...Object.values(images).map((a) => a.alt), ...Object.values(videos).map((v) => v.poster.alt)];

describe("copy rules from the brief", () => {
  it("contains none of the forbidden phrases", () => {
    for (const s of [...corpus, ...alts]) {
      for (const phrase of FORBIDDEN) {
        expect(s.toLowerCase(), `"${s}"`).not.toContain(phrase);
      }
    }
  });

  it("states no specifications, certifications or warranties", () => {
    for (const s of corpus) {
      for (const re of SUSPECT) {
        expect(re.test(s), `"${s}" matches ${re}`).toBe(false);
      }
    }
  });

  it("only ships placeholders where nothing real exists yet", () => {
    for (const t of testimonials) expect(t.placeholder, t.id).toBe(true);
    for (const d of dealers) expect(d.placeholder, d.id).toBe(true);
    for (const p of projects) expect(p.placeholder, p.id).toBe(true);
    for (const d of downloads) expect(d.placeholder, d.id).toBe(true);
  });

  it("keeps the hero message and the product headline verbatim", () => {
    expect(home.hero.title).toBe("Comfortably and safely remain living in your own home.");
    expect(home.productReveal.title).toBe("A lift inside the staircase.");
    expect(home.underTheStaircase.title).toBe("Designed around the space you already have.");
    expect(home.design.title).toBe("Designed to belong.");
  });

  it("captions every conceptual asset that stands in for the product", () => {
    expect(home.productReveal.caption.toLowerCase()).toContain("visualisation");
    expect(home.underTheStaircase.caption.toLowerCase()).toContain("visualisation");
    expect(home.design.caption.toLowerCase()).toContain("visualisation");
  });
});
