# Elevante Homelift - two design directions

Two complete front-end mockups of the consumer website described in
`Elevante Homelift - Website development brief.txt`. Both light. Same
information architecture, same copy, same content model. Two genuinely
different visual systems.

```
python -m http.server 8777
```

Then `http://127.0.0.1:8777/site-a-atelier/` or `/site-b-blueprint/`.

---

## The idea both sites are built on

The brief asks three separate times (section 9 twice, section 14) for
**animation or a section drawing** to explain how the cabin moves in the
staircase, because photography cannot show it. That mechanism is the entire
reason Elevante exists, and it is the thing no competitor can copy.

So the centrepiece of both sites is a **drawn section through a house that you
operate by scrolling**. The upper landing door slides aside, the cabin rises
inside the staircase footprint behind the stair flight, the lower opening
closes behind it, and the door closes again once the cabin has arrived. The
stair treads are filled with the page colour so they occlude the cabin, which
is what tells you the cabin is travelling *behind* the stairs rather than in
front of them.

Around it sit three more drawn components, each answering a specific part of
the brief:

| Component | What it does | Brief |
|---|---|---|
| **Section drawing** | Scroll-driven. The cabin travels, the doors operate, annotations appear. | s.9, s.14 |
| **Plan comparison** | Two floor plans side by side: a conventional homelift marked "ROOM LOST", against Elevante inside the stair footprint. | s.1, s.2 |
| **Cabin scene** | Four tabs: on your own, with a rollator, with a wheelchair, with someone helping. Each redraws the cabin in plan. | s.9 "Everyday Use" |
| **Material switcher** | Picking a finish recolours the cabin in the section drawing, live. | s.18 "Design" |

None of these is decoration. Each one replaces a paragraph of text with
something you can look at.

---

## The two directions

|  | **A. Atelier** | **B. Blueprint** |
|---|---|---|
| Folder | `site-a-atelier/` | `site-b-blueprint/` |
| Idea | A set of architect's sheets. Warm, material, editorial. | A drawing sheet. Graphic, technical, marked up. |
| Ground | Paper `#F2EFE9` | Near-white `#FBFAF7` with a measured grid |
| Accent | Forest green `#2F5D45` | Vermilion `#C03A14`, used like annotation ink |
| Display type | Bricolage Grotesque | Archivo 900 |
| Body / labels | Instrument Sans | Archivo + Space Mono dimensions |
| Corners | 3px, nearly square | 0px, hard |
| Structure | 12 column sheet, content placed off-centre, numbered margin index, hairline rules | Title blocks, crop ticks, offset shadow cards, hard 2px borders |
| Signature motion | Sticky sheet sections, split-line headlines, parallax | Horizontal pan through the projects, sticky stacking cards |

Seven pages each: home, the homelift, in your home, design, installation,
projects, find an installer.

---

## What changed from the first attempt

The first pair of sites was generic, and the animation was thin. Both fair.

- **The brief's central point was missing.** There was no drawing of the
  mechanism at all, just stock photos of staircases with captions. That has
  been replaced by the four drawn components above.
- **"In your home" is now a real page**, as brief section 8 asks. It was
  missing entirely.
- **Layouts were rebuilt**, not restyled: a 12 column sheet with off-centre
  placement in A, a drawing-sheet system in B. No three-equal-cards rows, no
  boxed card grids.
- **Type was replaced.** Outfit and generic Archivo became Bricolage Grotesque
  and Archivo 900 with Space Mono annotations.
- **Direction B is no longer dark.** It is now the light, graphic,
  technical counterpart rather than a dark-tech theme.

---

## Filling the page

An earlier pass left inner-page headers as a headline on an empty white field,
with two thirds of the grid unused. Four image components now carry those areas:

| Component | Where | What it fixes |
|---|---|---|
| **Hero cluster** | Every inner-page header | Three overlapping frames at different sizes fill the half of the header that was blank. |
| **Full-bleed band** | Under every header, and under the homepage hero | Four frames edge to edge, breaking the page margin. |
| **Mosaic** | Both homepages | One tall, one wide, two square and one full-width cell. Sized to fill its grid exactly, with no empty tail. |
| **Image marquee** | Both homepages | A continuous strip of photographs, replacing the word marquee. |

Direction B also gains a **full-width vermilion band** for the testimonial, so
one saturated block of colour carries the brand on an otherwise pale sheet.
Measured at 5.45:1 contrast, which passes AA at every size used.

Photography went from 39 files to **65**, with **47 in use** per site across the
seven pages, up from 26. Section padding was tightened throughout, since the
generous vertical rhythm was reading as dead air rather than space.

One trap worth recording: the full-bleed components originally used
`width: 100vw; margin-left: calc(50% - 50vw)`. `vw` includes the scrollbar, so
every page gained exactly 8px of horizontal scroll. They now render outside
`.shell`, where 100% is already edge to edge and excludes the scrollbar.

---

## Motion, and the brief's accessibility requirement

Brief section 15 asks for no complex animation because the audience is 60-75+.
You asked for heavy animation. The rule used throughout:

**Motion reveals content. Motion never gates content.**

- Nothing is behind a hover. The cabin scene uses real tabs with arrow-key
  support; the material switcher uses real buttons with `aria-pressed`.
- `prefers-reduced-motion` collapses everything. Verified: the section drawing
  stops being a scroll toy and becomes a static diagram of the arrived state,
  with the caption still explaining the movement in words.
- Every interactive target is 44px or more. Body text is 18px everywhere,
  including phones.
- With JavaScript off, every page renders complete.

If it needs to be calmer, the dials are `--ease` and the durations in
`css/main.css`, and `SMOOTH_SCROLL` at the top of `js/main.js`.

---

## Scrolling

Scrolling was broken in an earlier build and is fixed. Four compounding faults:
`scroll-behavior: smooth` fighting Lenis, Lenis's required stylesheet missing
entirely, `body { overflow-x: hidden }` silently turning `<body>` into a scroll
container, and duration-based damping that lagged the wheel. Measured before:
2400px of wheel input moved the page 200px, then lurched. After: 2400px in,
2400px out, tracking linearly.

To turn smooth scrolling off entirely, set `SMOOTH_SCROLL = false` at the top
of `js/main.js` in either site. Nothing else changes.

---

## Structure

```
site-a-atelier/            site-b-blueprint/
  7 html pages               (same 7 pages)
  css/main.css             the direction's design system
  css/parts.css            the shared drawn components
  css/fonts.css            self-hosted @font-face
  js/main.js               the motion engine
  js/lib/                  gsap, ScrollTrigger, lenis (local, no CDN)
  assets/img/              responsive WebP at 800w and 1600w
  assets/video/            compressed mp4 + posters
  assets/fonts/            woff2, latin subset

_shared/
  content.py               ALL copy and data, shared by both sites
  parts.py                 the four drawn components
  engine.js                the motion engine, deployed to both
  parts.css                component styles, deployed to both
  build_a.py  build_b.py   page generators
  audit.py                 pre-flight, run after every build
  section-lab.html         standalone test rig for the section drawing
  downloads/               original full-size photography and video
```

Copy lives in `content.py` once, so the two directions cannot drift apart.
Rebuild with:

```
python _shared/build_a.py
python _shared/build_b.py
python _shared/audit.py
```

`audit.py` checks every internal link, asset, srcset candidate, anchor target
and icon reference, alt text on every image, the em-dash ban, the eyebrow
budget, heading order and head metadata. It passes clean on all 14 pages.

---

## Verified

- 14 pages: zero console errors, zero broken images, nav on one line under
  80px, exactly one `h1` each.
- No horizontal scroll: 14 pages across 6 viewport widths from 360px to 1920px.
- All tap targets 44px or more at 390px; body text 18px.
- WCAG AA on every text and background pair.
- Reduced motion collapses correctly on both sites.
- The section drawing, the cabin tabs and the material switcher all verified
  working under automation, not just by eye.

---

## What is placeholder

Every item is marked with an HTML comment in the source.

1. **All product photography.** No Elevante photographs exist yet, so every
   photo is a stock stand-in. Nothing shown is an actual Elevante cabin. This
   is why the drawings matter: they are the only honest way to show the
   product today.
2. **The section drawing is indicative.** It is captioned as such on every
   page. It shows the principle correctly; Elevante must supply approved
   technical drawings for the real site.
3. **The testimonial.** Invented, per brief section 9, until real ones exist.
4. **The six projects** and **nine installers.** Invented. The filter and the
   lead form work as demonstrations but connect to nothing.
5. **Legal pages.** `href="#"` placeholders. Cookie consent for NL, UK and DE
   is a build-phase item.

### The counters

They state four facts from the brief, not achievements: **2** people in the
cabin, **3** launch markets, **7** steps from enquiry to handover, **0 m²** of
extra floor space. Elevante has no installations yet, so a "500 homes" counter
would be untrue. If you want conventional achievement counters, they need real
figures.

---

## Notes for the WordPress build

- Every repeating item is already a list in `content.py`, which maps onto a
  custom post type: projects, installers, use cases, materials, FAQ entries,
  process steps, specifications.
- Sections are self-contained and reusable, so they become blocks or ACF
  flexible-content layouts. No section depends on the one above it.
- The design system is tokens plus components, which maps onto `theme.json`.
- The four drawn components are self-contained SVG plus one JS module. They
  port to WordPress as a single block each, with the material palette exposed
  as block settings.
- Nav, footer and CTA are generated once and shared, as they should be in WP.

## Copy

Written against brief section 16: clear, concise, factual, calm. No
"discover", no "experience ultimate comfort", no manufactured empathy, nothing
patronising about age. Where the lift takes a wheelchair, the copy says it
takes a wheelchair. Zero em-dashes and en-dashes across all 14 pages, enforced
by `audit.py`.
