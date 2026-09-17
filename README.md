# Elevante Homelift — website front end

Next.js front end for the Elevante Homelift consumer site. The homepage is
built; the routes the navigation points to exist as intro pages. The brief
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
| `content/en/*.ts` | English copy and structured data (home, site, projects, FAQs, dealers, downloads, design options, page intros). |
| `content/media.ts` | Media manifest: alt text and provenance per asset. |
| `content/media.generated.json` | Output of the media pipeline (paths, sizes, blur placeholders). |
| `lib/content/` | Async accessors. Swap these for API calls when the admin exists; components do not change. |
| `scripts/media.mjs` | Reproducible image and video pipeline. |
| `components/diagram/` | The stair section, cabin plans and plan comparison drawings. |
| `components/home/` | One component per homepage section. |
| `lib/motion/` | GSAP registration, `useMotion`, Lenis smooth scroll. |

## Replacing media

1. Drop the new file into `UI images/` or `UI video/`.
2. Point the relevant id in `scripts/media.mjs` at it (or add a new id).
3. Describe it in `content/media.ts` (alt text, provenance, note).
4. Run `npm run media`, then `npm test`.

Nothing in `components/` references a file path. When real product
photography arrives, set its provenance to `product`; the "Visualisation"
captions are driven by content, not by components.

## Rules enforced by tests

- No phrase from the brief's forbidden list (`tests/copy.test.ts`).
- No numbers with units, certifications or warranties in copy.
- Testimonials, dealers, projects and downloads must carry `placeholder: true` until real ones exist.
- Every asset has a file, dimensions, alt text and provenance (`tests/media.test.ts`).
- The drawings expose their parts and render every static pose (`tests/diagram.test.tsx`).

## Motion

All animation runs inside `gsap.matchMedia()` under
`(prefers-reduced-motion: no-preference)`. With reduced motion the page is
static, fully readable, and the installation track scrolls natively.
