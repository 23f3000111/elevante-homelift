# Elevante Homelift — website front end

Next.js front end for the Elevante Homelift consumer site: the homepage as a
scroll-driven story, plus The Homelift, Design, In your home, Installation,
Inspiration, Information and Find a dealer. The brief
(`Elevante Homelift - Website development brief.txt`) is the source of truth
for facts and tone; the design spec and plan live in `docs/superpowers/`.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run check      # typecheck, lint, unit tests, production build
npm run media      # rebuild public/media from "UI images" and "UI video" (needs ffmpeg on PATH)
```

Set `NEXT_PUBLIC_SITE_URL` in production so canonical URLs, the sitemap and
Open Graph data carry the real domain.

## Where things live

| Path | Purpose |
|---|---|
| `content/types.ts` | The content contract: every model the site renders. |
| `content/en/*.ts` | English copy and structured data (home, pages, site, projects, FAQs, dealers, downloads, design options). |
| `content/media.ts` | Media manifest: alt text and provenance per image, film and frame sequence. |
| `content/media.generated.json` | Output of the media pipeline (paths, sizes, blur placeholders, frame counts). |
| `lib/content/` | Async accessors. Swap these for API calls when the admin exists; components do not change. |
| `scripts/media.mjs` | Reproducible pipeline: images, films, posters, and the scroll sequences (72 frames at 1180 px and 640 px). |
| `components/ui/ScrollImageSequence.tsx` | Canvas that plays a frame sequence with the scroll position. |
| `components/diagram/` | The stair section, cabin plans and plan comparison drawings. |
| `components/home/` | One component per homepage section; the pages reuse them. |
| `components/pages/` | Page opening, text ledgers, FAQ, design options, spec ledger, downloads, dealer locator, request form. |
| `lib/motion/` | GSAP registration, `useMotion` / `useMotionEffect`, `useHorizontalTrack`, Lenis, `scrollToElement`. |
| `app/find-a-dealer/actions.ts` | Server action that validates information requests. Routing to CRM and dealers is the next integration. |

## Motion language

Declared by attribute and driven by `lib/motion/useMotion.ts`:
`data-reveal`, `data-reveal-lines`, `data-reveal-clip` (wipe + settle),
`data-mask-words` (masked type via `MaskedText`), `data-parallax`,
`data-parallax-x`. Cinematic scenes use `.scroll-track` + `.scroll-stage`
(sticky, viewport-high); horizontal sections use `useHorizontalTrack`.
Everything runs inside `gsap.matchMedia()` under
`(prefers-reduced-motion: no-preference)`; with reduced motion the page is
static, every stage is one screen tall, and tracks scroll natively.

## Replacing media

1. Drop the new file into `UI images/` or `UI video/`.
2. Point the relevant id in `scripts/media.mjs` at it (or add a new id).
3. Describe it in `content/media.ts` (alt text, provenance, note).
4. Run `npm run media`, then `npm test`.

Nothing in `components/` references a file path. When real product
photography or renders arrive, set their provenance to `product`; the
"Visualisation" captions come from content, not components.

## Rules enforced by tests

- No phrase from the brief's forbidden list (`tests/copy.test.ts`).
- No numbers with units, certifications or warranties in copy.
- Testimonials, dealers, projects and downloads must carry `placeholder: true` until real ones exist.
- Every asset has a file, dimensions, alt text and provenance; every sequence has every frame at both sizes (`tests/media.test.ts`).
- The drawings expose their parts and render every static pose (`tests/diagram.test.tsx`).
