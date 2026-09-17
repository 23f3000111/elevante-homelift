# Elevante Homelift — Homepage front end: design spec

Date: 2026-09-17. Status: approved by the client lead (chat, same day).

## 1. Purpose

Build the Elevante Homelift homepage as a custom Next.js front end. The brief
(`Elevante Homelift - Website development brief.txt`) is the source of truth for
positioning, hierarchy, tone and facts. This build replaces the WordPress
requirement with a component-based architecture whose content layer can later be
swapped for a custom admin/CMS API without touching components.

Success is the brief's section 28: a first-time visitor can answer, quickly,
what Elevante solves, what is different, how it works in their house, whether it
suits their circumstances, and what to do next, while the site reads as a
premium residential design brand, not a mobility-equipment supplier.

## 2. Asset audit (what we actually have)

Videos: three 8 s AI-generated clips (Veo mark bottom-right), 1280×720, 24 fps,
with an audio track. None shows a cabin travelling *underneath* a staircase.

| Homepage section | Source file | Content |
|---|---|---|
| 03 Product reveal | `Homelift_moving_beneath…` | glass/oak cabin beside a spiral stair, rising through a floor opening |
| 06 Under the staircase | `Homelift_installed_beneath…` | cabin beside a floating oak stair in a warm living room |
| 09 Design | `Showcasing_residential…` | conventional lift, steel doors opening onto a wood interior, controls |

Images: 19 files. Two are full-width quality (gold staircase 1620 px,
consultation 1500 px). Seventeen are 335–740 px. Three carry third-party branding
and are excluded: the "material detail" file (Cibes advert), "modern staircase
detail" (Design Bridge watermark), "luxury staircase vertical" (Meta AI tag,
usable only cropped). No image shows the Elevante concept; every lift pictured
is a competitor's conventional lift. There is no rollator, door, or
stair-closure photograph.

Consequence: sections 03, 05 and 06 are carried by a drawn, scroll-driven
section diagram (SVG + GSAP) of a staircase with the cabin moving in the void
beneath it. Video sits beside it as the cinematic layer. Every AI or stock asset
is flagged in the media manifest and captioned as a visualisation where it is
shown as if it were the product.

## 3. Design system

**Colour.** Warm White `#F5F3EE` (page), White `#FFFFFF` (panels), Charcoal
`#151515` (display), Soft Charcoal `#2A2926` (body), Stone `#DCD7CE` (rules,
surfaces), Warm Grey `#A8A39A` (rules and large index numerals only; 2.3:1 on
warm white, so never for text under 24 px), Caption `#6F6A61` (4.8:1). Accent
Oxide `#8C4A2F` (6.0:1) used only where it carries meaning: the cabin in the
diagram, the active navigation item, focus rings. No gradients, no drop
shadows, 0 radius on media, 2 px on buttons.

**Type.** Schibsted Grotesk (display, headings, body) and Geist Mono (index
numbers, diagram labels, sparingly). Self-hosted via `next/font`. Body 18 px,
nothing below 16 px. Fluid scale (clamp): display-1 44→120 px / 0.95;
display-2 36→72 px / 1.0; h3 24→32 px / 1.15; body-l 20 px / 1.6; body 18 px /
1.6; label 14 px uppercase +0.08 em (decorative only).

**Layout.** 12-column fluid grid, 1440 px content max, gutters
`clamp(1.25rem, 4vw, 4rem)`, section rhythm `clamp(5rem, 12vw, 11rem)`.
Buttons 56 px tall, 18 px label, primary = charcoal fill, secondary = 1 px
stone border. Touch targets at least 48 px.

**Motion.** GSAP 3 + ScrollTrigger, Lenis smooth scroll (`lerp` not
`duration`; `overflow-x: clip` on root; `scroll-behavior` scoped to
`html:not(.lenis)`; Lenis CSS present). Eases `power3.out`, 0.8–1.2 s,
clip-path and 24 px reveals, parallax at most 8 %. Every animation is registered
inside `gsap.matchMedia()` with a `(prefers-reduced-motion: no-preference)`
condition; reduced motion gets a fully static, fully readable page. Motion
reveals content; motion never gates it.

## 4. Architecture

Next.js (App Router) · TypeScript · Tailwind CSS v4 · GSAP + ScrollTrigger ·
Lenis · sharp + ffmpeg (build-time media script). No Framer Motion.

```
app/                     routes, layout, globals.css, sitemap.ts, robots.ts
  page.tsx               homepage: composes section components from content
  (stubs) design/ in-your-home/ installation/ inspiration/ information/ find-a-dealer/
components/
  ui/                    Button, Container, Section, Eyebrow, Heading, Picture, VideoLoop, Reveal
  layout/                Header, MobileMenu, Footer
  diagram/               StairSection (SVG), state helpers
  home/                  one component per homepage section
content/
  types.ts               Project, Testimonial, Faq, Dealer, Article, Download, DesignOption, MediaAsset
  media.ts               manifest: src, width, height, alt, provenance ('product'|'ai'|'stock'|'placeholder')
  en/                    site.ts, home.ts, projects.ts, testimonials.ts, faqs.ts, dealers.ts, articles.ts, downloads.ts, design-options.ts
lib/
  content/               async accessors (getProjects(locale) …), the future API boundary
  motion/                gsap registration, useReveal, LenisProvider
  seo/                   metadata helpers, JSON-LD
public/media/            processed images (webp/avif, native size, never upscaled) and video (mp4/webm, posters)
scripts/media.mjs        reproducible pipeline: rename, convert, posters, blur placeholders, strip audio, crop Veo mark
```

Components never import media paths or copy directly; they receive them from
content accessors. Replacing an asset means editing `content/media.ts` and
re-running the media script.

## 5. Homepage sections

1. Header: compact bar, six links + Find a dealer, full-screen mobile menu, warm-white on scroll.
2. Hero: type-led, asymmetric; headline left, tall offset media panel right (poster → video loop); CTAs "See how it works" and "View examples".
3. Product reveal: pinned; diagram builds on scroll, cabin descends beneath the treads; "A lift inside the staircase." Video 1 alongside.
4. The idea: two-line display statement; spiral-from-above image, clip-path reveal.
5. How it works: Enter / Move / Arrive as diagram states, scrubbed by scroll, one factual sentence each from the brief.
6. Under the staircase: sticky text left, video 2 right, then a plan comparison (conventional lift vs Elevante) showing no extra floor area.
7. In your home: portfolio grid of six staircase interiors, varied ratios, hover scale, numbered.
8. Everyday use: six situations from the brief; photographs where they exist, diagram states where they don't.
9. Design: video 3, three material crops (oak, stone, metal) from supplied images, link to Design page.
10. Projects: editorial gallery from structured data, each entry flagged placeholder.
11. Installation: seven steps, horizontal scroll on desktop, vertical on mobile.
12. Trust: evidence only: movement-detection safety fact, process, marked certification placeholder, showroom availability.
13. Dealer CTA: "See Elevante in a real home."; Find a dealer / Request information.
14. Footer: navigation, dealer, contact, legal, country/language placeholder.

## 6. Non-functional

Performance targets: LCP < 2.5 s on mobile 4G, CLS < 0.05, INP < 200 ms,
homepage JS < 180 KB gzipped, videos load only near the viewport, at most 5 font
files. Accessibility: semantic landmarks, keyboard-complete navigation, visible
focus, alt text from the manifest, no hover-only information, reduced motion.
SEO: per-route metadata, OpenGraph, sitemap, robots, Organization + Product
JSON-LD (facts from the brief only).

## 7. Content rules enforced in code

No invented specifications, certifications or testimonials. Placeholders are
explicit (`placeholder: true`) and rendered as such. Forbidden phrases from
brief §16 do not appear. Copy states what happens ("an automatic door closes
the stair opening") rather than how the visitor feels.
