# Elevante Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A production-quality Next.js homepage for Elevante Homelift, built from the current assets, with every asset and every line of copy supplied through a typed content layer that a future CMS can replace.

**Architecture:** App Router with server components for structure and small client islands for motion. Content lives in `content/` and reaches components only through `lib/content/` accessors. A committed media script produces `public/media/` and a generated manifest; a hand-written manifest adds alt text and provenance. Motion is GSAP + ScrollTrigger inside `gsap.matchMedia`, on top of Lenis.

**Tech Stack:** Next.js 16.3, React 19, TypeScript 5.9, Tailwind CSS 4.3, GSAP 3.15, Lenis 1.3, sharp 0.35, ffmpeg (system), vitest.

**Spec:** `docs/superpowers/specs/2026-09-17-elevante-homepage-design.md`

## Global Constraints

- Light theme only. Palette tokens exactly: `#F5F3EE #FFFFFF #151515 #2A2926 #DCD7CE #A8A39A #6F6A61 #8C4A2F`.
- Body text 18 px, nothing below 16 px, `#A8A39A` never used for text under 24 px.
- Fonts: Schibsted Grotesk + Geist Mono only, self-hosted through `next/font`.
- No Framer Motion, no UI kit, no icon library.
- All animation registered inside `gsap.matchMedia()` with `(prefers-reduced-motion: no-preference)`.
- Components never import from `content/` directly; they receive props from `lib/content/` accessors called in `app/page.tsx`.
- Every `MediaAsset` carries `provenance`; AI and stock assets shown in product context get a visible "Visualisation" caption.
- Forbidden phrases (brief §16): discover, experience ultimate comfort, designed with you in mind, at your own pace, we understand, a world of possibilities, seamlessly fits your lifestyle. A unit test enforces this.
- No invented dimensions, capacities, certifications, testimonials or dealers. Placeholders carry `placeholder: true` and render as placeholders.
- Commit after each task with the attribution trailer.

---

### Task 1: Scaffold and design tokens

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `.gitignore`, `app/layout.tsx`, `app/page.tsx` (temporary), `app/globals.css`, `lib/fonts.ts`
- Test: `npm run typecheck && npm run lint && npm run build`

**Interfaces:**
- Produces: CSS custom properties `--color-warm-white … --color-oxide`, `--font-sans`, `--font-mono`, utility classes from Tailwind `@theme`; type scale classes `.text-display-1 .text-display-2 .text-h3 .text-body-l .text-body .text-label`.

- [x] Scaffold with `create-next-app` into a temp directory (TypeScript, Tailwind, ESLint, App Router, no src dir, alias `@/*`), copy config files into the repo root, pin `typescript` to 5.9.
- [x] Add scripts: `dev`, `build`, `start`, `lint` (`eslint .`), `typecheck` (`tsc --noEmit`), `test` (`vitest run`), `media` (`node scripts/media.mjs`).
- [x] `lib/fonts.ts`: `Schibsted_Grotesk` from `next/font/google` (weights 400 500 600 700, `variable: '--font-sans'`), `GeistMono` from `geist/font/mono`.
- [x] `app/globals.css`: `@import "tailwindcss"`, `@theme` with the eight colours, fonts, fluid type scale, spacing tokens; base rules (`html { overflow-x: clip }`, `html:not(.lenis) { scroll-behavior: smooth }`, Lenis classes, focus-visible ring in oxide, `::selection`).
- [x] Verify: `npm run typecheck && npm run lint && npm run build` pass. Commit.

### Task 2: Media pipeline and manifest

**Files:**
- Create: `scripts/media.mjs`, `content/media.generated.json` (output), `content/media.ts`, `content/types.ts`
- Test: `tests/media.test.ts`

**Interfaces:**
- Produces: `type Provenance = 'product' | 'ai' | 'stock' | 'placeholder'`; `interface MediaAsset { id; src; width; height; alt; provenance; note?; blurDataURL? }`; `interface VideoAsset { id; mp4; webm; poster: MediaAsset; provenance; note? }`; `media.images: Record<ImageId, MediaAsset>`; `media.videos: Record<VideoId, VideoAsset>`.

- [x] `scripts/media.mjs`: reads `UI images/` and `UI video/`, writes `public/media/img/<id>.webp` (quality 82, native size, optional crop), 20 px blur placeholder as base64, `public/media/video/<id>.mp4` (h264 crf 24, `-an`, crop 1200:676 centred to remove the Veo mark), `.webm` (vp9 crf 33), poster from frame 12 as webp; writes `content/media.generated.json` `{ images: {id:{src,width,height,blurDataURL}}, videos: {id:{mp4,webm,poster:{...}}} }`.
- [x] Exclusions in the script with a reason string: `luxury interior material detail…` (third-party branding), `modern staircase architectural detail…` (watermark). Crops: `stair-oak-screen` (drop 7 % right/bottom to remove AI tag), `material-oak`, `material-stone` (from video-design poster), `material-metal` (from bronze cabin), `installation-drawing` (top-right quadrant of the collage).
- [x] `content/media.ts`: import the generated JSON, merge with hand-written `alt`, `provenance`, `note` per id; export `media`.
- [x] `tests/media.test.ts`: every manifest entry's file exists under `public/`, has width/height > 0, non-empty alt, a provenance value; every video has a poster.
- [x] Run `npm run media`, then `npm test`. Commit (sources, script, generated JSON, outputs).

### Task 3: Content models and English content

**Files:**
- Create: `content/en/site.ts`, `content/en/home.ts`, `content/en/projects.ts`, `content/en/testimonials.ts`, `content/en/faqs.ts`, `content/en/dealers.ts`, `content/en/articles.ts`, `content/en/downloads.ts`, `content/en/design-options.ts`, `lib/content/index.ts`
- Test: `tests/copy.test.ts`

**Interfaces:**
- Produces: `getSite(locale)`, `getHome(locale)`, `getProjects(locale)`, `getTestimonials(locale)`, `getFaqs(locale)`, `getDealers(locale)`, `getArticles(locale)`, `getDownloads(locale)`, `getDesignOptions(locale)`; all `async`, `locale: Locale = 'en'`. `HomeContent` has one typed block per section (`hero`, `productReveal`, `idea`, `howItWorks`, `underTheStaircase`, `inYourHome`, `everydayUse`, `design`, `projects`, `installation`, `trust`, `dealerCta`).
- [x] Write types in `content/types.ts` (extend Task 2 file): `Locale`, `NavItem`, `SiteContent`, `HomeContent`, `Project`, `Testimonial`, `Faq`, `Dealer`, `Article`, `Download`, `DesignOption`, `Step`, `Situation`, `TrustItem`.
- [x] Write copy from the brief's hierarchy. Placeholders (`testimonials`, `dealers`, `downloads`, certification) carry `placeholder: true` and honest text.
- [x] `tests/copy.test.ts`: walks every string in `content/en/*` and fails on any forbidden phrase (case-insensitive); asserts no testimonial/dealer without `placeholder: true`.
- [x] `npm test`. Commit.

### Task 4: UI primitives and motion runtime

**Files:**
- Create: `components/ui/Button.tsx`, `Container.tsx`, `Section.tsx`, `Eyebrow.tsx`, `Picture.tsx`, `VideoLoop.tsx`, `Reveal.tsx`, `ProvenanceNote.tsx`; `lib/motion/gsap.ts`, `lib/motion/LenisProvider.tsx`, `lib/motion/useReveal.ts`, `lib/cn.ts`

**Interfaces:**
- `Button({ href, variant: 'primary'|'secondary'|'link', children })` renders `<a>` (next/link) with 56 px height.
- `Picture({ asset: MediaAsset, sizes, priority?, className, fit? })` wraps `next/image` with blur placeholder and fills its parent when `fill` is implied by className.
- `VideoLoop({ video: VideoAsset, className })` client component: renders `<video muted loop playsinline preload="none" poster>` with sources injected only when within 200 % of the viewport (IntersectionObserver); pauses when out of view; static poster under reduced motion.
- `Reveal({ as, children, delay?, className })` client component: uses `useReveal` to fade/translate on enter; no-op under reduced motion.
- `LenisProvider` client component mounted once in `layout.tsx`: creates Lenis (`lerp: 0.12`), wires `ScrollTrigger.update`, `gsap.ticker`.
- [x] Implement; verify `npm run typecheck && npm run lint`. Commit.

### Task 5: Header, mobile menu, footer, layout, stub routes, SEO

**Files:**
- Create: `components/layout/Header.tsx`, `MobileMenu.tsx`, `Footer.tsx`, `components/layout/PageIntro.tsx`; `app/(pages)/the-homelift/page.tsx`, `design/page.tsx`, `in-your-home/page.tsx`, `installation/page.tsx`, `inspiration/page.tsx`, `information/page.tsx`, `find-a-dealer/page.tsx`; `app/sitemap.ts`, `app/robots.ts`, `lib/seo/metadata.ts`, `lib/seo/jsonld.ts`
- Modify: `app/layout.tsx`
- [x] Header: sticky, transparent over hero then warm-white with a 1 px stone border after 24 px scroll; 6 links + primary button; `aria-current` on the active route; hamburger opens a full-screen menu with 56 px rows, close button, Escape and focus trap.
- [x] Footer: four columns (Navigation, Dealer, Contact, Legal) + country/language placeholder select (disabled, labelled "More countries and languages to follow").
- [x] Stub pages use `PageIntro` and per-route metadata from `lib/seo/metadata.ts`.
- [x] `layout.tsx`: fonts, `LenisProvider`, skip link, JSON-LD Organization.
- [x] Verify all seven routes return 200 in `next build` output. Commit.

### Task 6: Stair section diagram (SVG)

**Files:**
- Create: `components/diagram/StairSection.tsx`, `components/diagram/PlanComparison.tsx`, `components/diagram/CabinPlan.tsx`, `components/diagram/diagram.css`
- Test: `tests/diagram.test.tsx` (renders, contains `<title>` and `Schematic, not to scale` label, exposes `data-part` hooks)

**Interfaces:**
- `StairSection({ state?: 'enter'|'move'|'arrive', id?, className, interactive?: boolean })`: viewBox `0 0 800 560`; groups with `data-part="floors" | "stair" | "cabin" | "door-lower" | "door-upper" | "path" | "labels"`. Cabin `transform` positions: lower `translate(0,0)`, upper `translate(0,-236)`. `state` sets a static pose (for reduced motion and mini uses); with `interactive` the parent animates via GSAP using the `data-part` hooks.
- `PlanComparison()`: two plan views (Conventional homelift / Elevante) side by side.
- `CabinPlan({ occupant: 'person'|'rollator'|'wheelchair'|'two-people' })`: cabin outline with schematic occupant footprints; no dimensions.
- [x] Implement; every SVG has `role="img"`, `<title>`, `<desc>`. Commit.

### Task 7: Homepage sections 02–06 (hero, product reveal, idea, how it works, under the staircase)

**Files:**
- Create: `components/home/Hero.tsx`, `ProductReveal.tsx`, `Idea.tsx`, `HowItWorks.tsx`, `UnderTheStaircase.tsx`
- Modify: `app/page.tsx`
- [x] Hero: server component; 12-col grid; headline `text-display-1`; media panel 5 cols, `aspect-[4/5]`, `Picture priority` with `stair-gold-hall`; on load a client `HeroMotion` scales the image 1.06→1 and reveals the lines.
- [x] ProductReveal: client; pinned for 2.5 viewports; timeline draws floors and stair (stroke-dashoffset), moves cabin down, opens lower door, reveals headline words; video-cabin-moving beside it with "Visualisation" caption.
- [x] Idea: statement + `stair-spiral-above` in a 5-col frame with clip-path reveal.
- [x] HowItWorks: three steps in a sticky layout; `StairSection` scrubbed between states as each step enters; each step has number, name, one factual sentence.
- [x] UnderTheStaircase: sticky text left, `VideoLoop` right, then `PlanComparison`.
- [x] Verify: dev server renders; reduced motion shows all copy and the diagram in its `arrive` state. Commit.

### Task 8: Homepage sections 07–14 (in your home, everyday use, design, projects, installation, trust, dealer CTA)

**Files:**
- Create: `components/home/InYourHome.tsx`, `EverydayUse.tsx`, `DesignTeaser.tsx`, `Projects.tsx`, `Installation.tsx`, `Trust.tsx`, `DealerCta.tsx`
- Modify: `app/page.tsx`
- [x] InYourHome: asymmetric 12-col gallery, six tiles, hover scale 1.04, numbered `01–06`, whole tile is a link to `/in-your-home`.
- [x] EverydayUse: six situations; two with photos (couple, wheelchair) and four with `CabinPlan`/`StairSection` states; each is a card with a 2-line factual description.
- [x] DesignTeaser: `VideoLoop` video-design-cabin + three material crops + link to `/design`.
- [x] Projects: from `getProjects`; each entry is a link card labelled "Reference interior" while `placeholder`.
- [x] Installation: seven steps; desktop horizontal pinned scroll, mobile vertical list; three images.
- [x] Trust: four evidence items + certification placeholder + showroom placeholder.
- [x] DealerCta: headline + two buttons, on stone background.
- [x] Commit.

### Task 9: Verification pass

- [x] `npm run typecheck && npm run lint && npm test && npm run build` all pass.
- [x] Playwright (MCP): screenshots at 1440, 1024, 390; no horizontal scroll at 390; no console errors; nav links resolve; `prefers-reduced-motion: reduce` renders all headings visible without scrolling animations; Lenis wheel test: 2400 px of wheel input moves `scrollY` by ~2400 px.
- [x] Record results in the final report. Commit.
