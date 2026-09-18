# Elevante Homelift — website front end (V2)

Next.js front end for the Elevante Homelift consumer site: a scroll-driven
architectural film for the homepage, plus The Homelift, Design, In your home,
Installation, Inspiration, Information and Find a dealer. The brief
(`Elevante Homelift - Website development brief.txt`) is the source of truth
for facts and tone.

Live previews:

| Version | Link |
|---|---|
| V2 (this repository, current) | https://23f3000111.github.io/elevante-homelift/ |
| V1 (the previous site, kept for comparison) | https://23f3000111.github.io/elevante-homelift/v1/ |

Both are published by the same workflow from the same repository: V2 from
`main`, V1 from the `v1` tag, built in a worktree with its own dependencies
so neither can affect the other.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run check      # typecheck, lint, unit tests, production build
npm run media      # rebuild public/media from "UI images" and "UI video" (needs ffmpeg on PATH)
```

Set `NEXT_PUBLIC_SITE_URL` in production so canonical URLs, the sitemap and
Open Graph data carry the real domain.

## The idea

The product cannot be photographed yet and the supplied films show a lift
beside a staircase, not beneath one. So the site draws the mechanism itself.
One schematic house (`lib/scene/geometry.ts`) feeds everything:

- **The signature scene** (`components/3d/`): a Three.js house in section,
  loaded on demand and rendered only when the scroll position changes. The
  visitor scrolls a line drawing into being, builds the staircase, seats the
  cabin beneath its head, opens and closes the landing door, opens the stair
  opening, lifts the cabin through it, and watches the drawing resolve into a
  lit model. `lib/scene/pose.ts` maps scroll progress to every moving part;
  the SVG section (`components/diagram/SectionDrawing.tsx`) reads the same
  pose, so browsers without WebGL and visitors with reduced motion get the
  same story as a drawing or as a page.
- **The drawings** (`components/diagram/`): the section, the hall in plan
  (staircase, stairlift, conventional lift, Elevante), the cabin plan with
  architect's occupant symbols, the safety figure, and the installation sheet
  that fills in a layer per stage.

Everything schematic says so on the page. No dimension on any drawing is a
product dimension.

## Where things live

| Path | Purpose |
|---|---|
| `content/types.ts` | The content contract: every model the site renders, including the CMS types (Project, Testimonial, Faq, Dealer, Country, Region, Article, Download, DesignOption, MediaAsset, LandingPage). |
| `content/en/*.ts` | English copy and structured data. Add `content/<locale>/` for another language. |
| `content/media.ts` | Media manifest: alt text and provenance per image, film and frame sequence. |
| `lib/content/` | Async, locale-aware accessors. Swap these for API calls when the admin exists; components do not change. |
| `lib/i18n.ts` | Locales, the default, and hreflang alternates. Routes stay at the root for the default locale. |
| `lib/scene/` | The schematic geometry, the scroll pose, and the progress store shared by GSAP and the renderer. |
| `lib/motion/` | GSAP registration, `useMotion`, `useHorizontalTrack`, Lenis, page transitions, `scrollToElement`. |
| `components/3d/` | The mechanism scene: canvas, house model, scene, and the pinned section with captions and rail. |
| `components/diagram/` | The SVG drawings. |
| `components/home/` | One component per homepage section; the pages reuse them. |
| `components/pages/` | Page opening, ledger, FAQ, design options, spec ledger, downloads, spreads, dealer locator, request form, next step. |
| `scripts/media.mjs` | Reproducible media pipeline: images, films, posters, and the scroll sequences. |

## Design system

Palette: warm white `#F5F3EE`, white, charcoal `#151515`, soft charcoal
`#2A2926`, stone `#DCD7CE`, warm grey `#A8A39A`, oxide `#8C4A2F`. Oxide is
reserved for meaning: the cabin, the active state, focus. Type: Schibsted
Grotesk for everything read, Geist Mono for chapter numbers, drawing
annotations and status. The scale runs from 18px body to a hero of up to
156px (`--text-hero`), all fluid. Layout: a 12-column sheet
(`.sheet`) inside a 1440px container with fluid gutters; sections are
left-aligned and offset, never centred.

## Motion language

Declared by attribute and driven by `lib/motion/useMotion.ts`:
`data-reveal`, `data-reveal-lines`, `data-reveal-clip`, `data-mask-words`
(masked type via `MaskedText`), `data-parallax`. Pinned scenes use
`.scroll-track` + `.scroll-stage` (sticky, viewport-high, `--track` sets the
length); horizontal sections use `useHorizontalTrack`. Everything runs inside
`gsap.matchMedia()` under `(prefers-reduced-motion: no-preference)`; with
reduced motion, or without JavaScript, the CSS lays the same elements out as
a page and every list is a list.

Page transitions (`lib/motion/PageTransition.tsx`) wipe a warm-white sheet
over the page, navigate, and let the next page settle in. Only opacity is
ever animated on `<main>`: a transform there would break every pinned stage.

## Replacing media

1. Drop the new file into `UI images/` or `UI video/`.
2. Point the relevant id in `scripts/media.mjs` at it (or add a new id).
3. Describe it in `content/media.ts` (alt text, provenance, note).
4. Run `npm run media`, then `npm test`.

Nothing in `components/` references a file path. When real product
photography or renders arrive, set their provenance to `product`; the
"Visualisation" and "Reference" captions come from content, not components.

## Rules enforced by tests

- No phrase from the brief's forbidden list; no numbers with units,
  certifications or warranties in copy (`tests/copy.test.ts`).
- Testimonials, dealers, projects, downloads and materials stay marked as
  placeholders or references until real ones exist.
- The mechanism's nine states, the seven everyday situations and the safety
  behaviour match the brief.
- Every drawing renders at every pose without JavaScript; the pose model tells
  the story in order and opens the stair opening before the cabin reaches it
  (`tests/diagram.test.tsx`).
- Every asset has a file, dimensions, alt text and provenance
  (`tests/media.test.ts`).

## Deploying

`main` publishes to GitHub Pages through `.github/workflows/deploy.yml`,
which runs typecheck, lint and the tests before building. The same run also
rebuilds the `v1` tag under `/v1/`, so the previous site stays reachable.
Moving the `v1` tag changes which commit that is; deleting the tag and its
two workflow steps removes the older site.

| Variable | Purpose |
|---|---|
| `STATIC_EXPORT=1` | Emits `out/` with trailing-slash routes and no image optimiser. |
| `NEXT_PUBLIC_STATIC_EXPORT=1` | Turns off router prefetch and makes page transitions do a full navigation, which a static host serves reliably. |
| `NEXT_PUBLIC_BASE_PATH` | The sub-path a project site lives under, for example `/elevante-homelift`. |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, the sitemap and Open Graph data. |
| `NEXT_PUBLIC_LEAD_ENDPOINT` | Where the information request is POSTed. Unset, the form says plainly that nothing was sent. |

On a Node host set only `NEXT_PUBLIC_SITE_URL` and run
`npm run build && npm start`.

## Still to come from the client

Product photography and renders, dimensions and technical data,
certification, the finish range, dealers, downloads, testimonials and real
installations. Each has a typed slot and a visible placeholder; nothing on
the site claims any of them exists yet.
