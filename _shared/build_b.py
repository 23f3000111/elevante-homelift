# -*- coding: utf-8 -*-
"""
DIRECTION B "BLUEPRINT" - page builder.
Light, graphic, technical. A drawing sheet: measured grid behind
everything, crop ticks, monospace dimension labels, one red annotation
colour, and a horizontal pan through the projects.

Same information architecture and same copy as Direction A. Different
visual system and a different set of layout devices, so the two can be
compared as real alternatives rather than reskins.
"""
import pathlib, sys
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import content as C
import parts as P

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "site-b-blueprint"
SPRITE = (ROOT / "_shared" / "sprite.html").read_text(encoding="utf-8")
VER = "5"


def ico(name, size=19):
    return ('<svg class="ico" width="%d" height="%d" aria-hidden="true" focusable="false">'
            '<use href="#i-%s"></use></svg>' % (size, size, name))


def img(name, alt, sizes="100vw", cls="", eager=False):
    load = 'fetchpriority="high" decoding="async"' if eager else 'loading="lazy" decoding="async"'
    return ('<img src="assets/img/%s-1600.webp" '
            'srcset="assets/img/%s-800.webp 800w, assets/img/%s-1600.webp 1600w" '
            'sizes="%s" alt="%s" class="%s" %s>' % (name, name, name, sizes, alt, cls, load))


def head(title, desc, page):
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:type" content="website">
<meta name="theme-color" content="#FBFAF7">
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="preload" href="assets/fonts/archivo-800.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/fonts/archivo-400.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="css/fonts.css?v={VER}">
<link rel="stylesheet" href="css/main.css?v={VER}">
<link rel="stylesheet" href="css/parts.css?v={VER}">
</head>
<body data-page="{page}">
{SPRITE}
<a class="skip-link" href="#main">Skip to main content</a>
<div class="progress" aria-hidden="true"></div>
"""


def nav(page):
    links = "".join('<a href="%s"%s>%s</a>' % (h, ' aria-current="page"' if h == page else "", t)
                    for h, t in C.NAV)
    drawer = "".join('<a href="%s"%s>%s %s</a>' % (h, ' aria-current="page"' if h == page else "",
                                                   t, ico("arrow-up-right", 22))
                     for h, t in C.NAV)
    return f"""
<header class="nav">
  <div class="nav-inner">
    <a class="brand" href="index.html" aria-label="Elevante Homelift, home">Elevante <span>Homelift</span></a>
    <nav class="nav-links" aria-label="Main">{links}</nav>
    <div class="nav-cta">
      <a class="btn btn-primary" href="dealers.html">{C.DEALER_LABEL}</a>
      <button class="burger" aria-expanded="false" aria-controls="drawer" aria-label="Open menu">
        <i></i><i></i><i></i></button>
    </div>
  </div>
</header>
<div class="drawer" id="drawer" aria-hidden="true">
  {drawer}
  <a class="btn btn-primary" href="dealers.html">{C.DEALER_LABEL}</a>
</div>
<main id="main">
"""


FOOT = f"""
</main>
<footer class="foot">
  <div class="shell">
    <div class="foot-top">
      <div class="foot-brand">
        <div class="brand">Elevante <span>Homelift</span></div>
        <p>A homelift built into the staircase of an existing home, so every floor stays in use.</p>
      </div>
      <div><h4>Product</h4><ul>
        <li><a href="the-homelift.html">The Homelift</a></li>
        <li><a href="design.html">Design and finishes</a></li>
        <li><a href="in-your-home.html">In your home</a></li>
        <li><a href="projects.html">Projects</a></li>
      </ul></div>
      <div><h4>Information</h4><ul>
        <li><a href="the-homelift.html#specifications">Specifications</a></li>
        <li><a href="the-homelift.html#safety">Safety</a></li>
        <li><a href="installation.html">Installation</a></li>
        <li><a href="installation.html#faq">Questions</a></li>
      </ul></div>
      <div><h4>Contact</h4><ul>
        <li><a href="dealers.html">{C.DEALER_LABEL}</a></li>
        <li><a href="dealers.html#showroom">Visit a showroom</a></li>
        <li><a href="dealers.html#brochure">Brochure</a></li>
        <li><a href="mailto:info@elevante.example">info@elevante.example</a></li>
      </ul></div>
    </div>
    <div class="foot-bottom">
      <p>Elevante Beheer BV</p>
      <!-- Legal pages are not part of this mockup. Cookie consent for NL / UK / DE
           is a build-phase item (brief section 24). -->
      <nav aria-label="Legal"><a href="#">Privacy</a><a href="#">Cookies</a><a href="#">Terms</a></nav>
    </div>
  </div>
</footer>
<script src="js/lib/gsap.min.js"></script>
<script src="js/lib/ScrollTrigger.min.js"></script>
<script src="js/lib/lenis.min.js"></script>
<script src="js/main.js?v={VER}"></script>
</body>
</html>
"""


def counters():
    cells = "".join(f"""
      <div class="counter">
        <div class="counter-num"><span data-count="{n}">{n}</span>{f'<span class="suffix">{s}</span>' if s else ''}</div>
        <p class="counter-label">{lbl}</p>
      </div>""" for n, s, lbl in C.COUNTERS)
    return f'<div class="counters">{cells}</div>'


def mats(target=".dwg-figure"):
    sw = "".join(
        f'<button class="mat" data-material="{hexa}" data-material-lt="{lt}" data-material-dk="{dk}" '
        f'aria-pressed="{"true" if i == 0 else "false"}">'
        f'<i style="background:{hexa}"></i>{name}</button>'
        for i, (name, _, hexa, lt, dk, _img) in enumerate(C.MATERIALS))
    return f'<div class="mats" data-materials="{target}">{sw}</div>'


def faq_block(items):
    return "".join(f"""
      <details{' open' if i == 0 else ''}>
        <summary>{q}<span class="faq-plus" aria-hidden="true"></span></summary>
        <div class="faq-answer"><p>{a}</p></div>
      </details>""" for i, (q, a) in enumerate(items))


def titleblock(left, right):
    return f'<div class="titleblock"><span class="tb-label">{left}</span><span class="dim">{right}</span></div>'


def cta():
    return f"""
<section class="sec">
  <div class="shell">
    <div class="cta-band" data-reveal="scale">
      <div class="media-frame px-wrap">{img(C.CTA['image'], 'A hallway and staircase in a private home', '100vw', 'px')}</div>
      <div class="cta-inner">
        <h2 class="d2">{C.CTA['h2']}</h2>
        <p>{C.CTA['body']}</p>
        <div class="cta-actions">
          <a class="btn btn-on-dark" href="dealers.html">{C.DEALER_LABEL} {ico('arrow-up-right')}</a>
          <a class="btn btn-ghost-dark" href="the-homelift.html">See how it works</a>
        </div>
      </div>
    </div>
  </div>
</section>"""


def pan_projects():
    panels = "".join(f"""
      <article class="pan-panel">
        <div class="media-frame">{img(src, title, '(max-width:980px) 84vw, 40vw')}</div>
        <div class="pan-body">
          <span class="pan-n">Project {i:02d} / {len(C.PROJECTS):02d}</span>
          <h3>{title}</h3><p>{body}</p>
        </div>
      </article>""" for i, (title, body, src) in enumerate(C.PROJECTS, 1))
    intro = f"""
      <div class="pan-intro">
        <span class="eyebrow">Projects</span>
        <h2 class="d2">Houses that were finished before we arrived</h2>
        <p class="body-lg">Every installation starts from a staircase that already exists.</p>
        <a class="tlink" href="projects.html">All projects {ico('arrow-up-right', 16)}</a>
      </div>"""
    return f"""
<section data-pan>
  <div class="pan-viewport"><div class="pan-track">{intro}{panels}</div></div>
  <div class="pan-fallback" hidden>{panels}</div>
</section>"""




def phero(page, eyebrow, h1, lead):
    """Inner-page header. Text on the left, an overlapping image cluster on the
    right, then a full-bleed band. Replaces the text-on-empty-white version."""
    eb = f'<span class="eyebrow">{eyebrow}</span>' if eyebrow else ""
    return f"""
<section class="phero">
  <div class="shell sheet-grid">
    <div class="c-1-6">
      {eb}
      <h1 class="d1" data-split style="margin-top:14px">{h1}</h1>
      <p class="lead">{lead}</p>
    </div>
    <div class="c-7-13" data-reveal="right">{P.hero_cluster(C.HERO_CLUSTERS[page])}</div>
  </div>
</section>
<section class="sec-tight" style="padding-top:clamp(20px,3vw,40px)">
  {P.image_band(C.BANDS[page])}
</section>"""

# ============================================================ HOME
def home():
    steps = "".join(f"""
      <a class="step" href="installation.html" data-reveal="up">
        <div class="step-n">STEP {i:02d}</div><h3>{t}</h3><p>{b}</p>
      </a>""" for i, (t, b) in enumerate(C.STEPS[:4], 1))

    return head("Elevante Homelift | A lift built into your staircase",
                "The Elevante Homelift travels inside the staircase footprint of an existing "
                "house, so every floor stays in use and no room is lost.",
                "home") + nav("index.html") + f"""

<section class="hero">
  <div class="shell sheet-grid">
    <div class="c-1-7">
      <h1 class="d1" data-split>{C.HERO['h1_short']}</h1>
      <p class="lead">{C.HERO['lead']}</p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="#how">See how it works {ico('arrow-up-right')}</a>
        <a class="btn btn-ghost" href="dealers.html">{C.DEALER_LABEL}</a>
      </div>
    </div>
    <div class="c-8-13" data-reveal="right">
      <div class="media-frame ar-34 px-wrap ticked">
        {img('stair-hero-01', 'A staircase in a private house with the space beneath it in use', '(max-width:820px) 100vw, 40vw', 'px', eager=True)}
      </div>
    </div>
    <div class="c-1-13 hero-meta" data-reveal="fade">
      {''.join(f'<span>{m}</span>' for m in C.HERO['meta'])}
    </div>
  </div>
</section>

<section class="sec-tight" style="padding-top:clamp(18px,3vw,36px)">
  {P.image_band(C.BANDS['home'], 'Houses in the Netherlands, the United Kingdom and Germany')}
</section>

<section class="sec-tight">
  <div class="shell" data-reveal="fade">{counters()}</div>
</section>

<section class="sec-tight" id="how">
  <div class="shell">
    {titleblock('Drawing 01', 'Section / cabin travel')}
    <div class="sheet-grid" style="margin-top:clamp(28px,4vw,52px)">
      <div class="c-1-7"><h2 class="d2" data-split>{C.SYSTEM['h2']}</h2></div>
      <div class="c-8-13 stack" data-reveal="up" style="align-self:end">
        <p class="body-lg">{C.SYSTEM['body'][0]}</p>
        <p class="body-lg">{C.SYSTEM['body'][1]}</p>
      </div>
    </div>
  </div>
</section>
{P.section_drawing('homeSection')}

<section class="sec band-mist">
  <div class="shell">
    {titleblock('Drawing 02', 'Plan / floor area')}
    <div class="sheet-grid" style="margin-top:clamp(28px,4vw,52px)">
      <div class="c-1-7 stack" data-reveal="up">
        <h2 class="d2">{C.INTEGRATION['h2']}</h2>
        <p class="body-lg">{C.INTEGRATION['body'][0]}</p>
        <p class="body-lg">{C.INTEGRATION['body'][1]}</p>
        <a class="tlink" href="in-your-home.html">How it fits your house {ico('arrow-up-right', 16)}</a>
      </div>
      <div class="c-1-13" style="margin-top:clamp(26px,4vw,50px)">{P.plan_compare()}</div>
    </div>
  </div>
</section>

<section class="sec">
  <div class="shell">
    {titleblock('Drawing 03', 'Plan / cabin occupancy')}
    <div class="sheet-grid" style="margin-top:clamp(28px,4vw,52px)">
      <div class="c-1-7 stack" data-reveal="up">
        <h2 class="d2">{C.EVERYDAY['h2']}</h2>
        <p class="body-lg">{C.EVERYDAY['body']}</p>
      </div>
      <div class="c-1-13" style="margin-top:clamp(26px,4vw,46px)" data-reveal="up">{P.cabin_scene()}</div>
    </div>
  </div>
</section>

{P.image_marquee(C.MARQUEE_IMAGES)}

{pan_projects()}

<section class="sec-tight">
  <div class="shell">{P.mosaic(C.MOSAIC)}</div>
</section>

<section class="sec">
  <div class="shell sheet-grid">
    <div class="c-1-7 stack" data-reveal="left">
      <h2 class="d2">Choose the finish and the drawing changes</h2>
      <p class="body-lg">Cabin, staircase, wall finishes and flooring are specified together.
      Pick a material to see it on the cabin in the section above.</p>
      {mats()}
      <a class="tlink" href="design.html">All finishes and combinations {ico('arrow-up-right', 16)}</a>
    </div>
    <div class="c-8-13" data-reveal="right">
      <div class="media-frame ar-34 px-wrap ticked">{img('material-wood-01', 'Oak, brushed and oiled', '(max-width:820px) 100vw, 40vw', 'px')}</div>
      <p class="figcap">Physical samples are brought to the survey</p>
    </div>
  </div>
</section>

<section class="sec band-mist">
  <div class="shell">
    <div class="shead-row">
      <h2 class="d2">Seven steps, and you know what each one involves</h2>
      <a class="tlink" href="installation.html">The full process {ico('arrow-up-right', 16)}</a>
    </div>
    <div class="steps">{steps}</div>
  </div>
</section>

<!-- TESTIMONIAL
     PLACEHOLDER. Brief s.9 asks for real customer experiences once installations
     exist. Replace the quote, the name and the portrait before launch. -->
<section class="sec band-accent">
  <div class="shell sheet-grid">
    <div class="c-1-5" data-reveal="left">
      <div class="media-frame ar-34">{img(C.TESTIMONIAL['portrait'], 'Portrait of a homeowner at home', '(max-width:820px) 100vw, 34vw')}</div>
    </div>
    <div class="c-6-13" data-reveal="right" style="align-self:center">
      <figure class="quote">
        <blockquote>{C.TESTIMONIAL['quote']}</blockquote>
        <figcaption><b>{C.TESTIMONIAL['name']}</b>{C.TESTIMONIAL['role']}</figcaption>
      </figure>
    </div>
  </div>
</section>

<section class="sec" id="faq">
  <div class="shell sheet-grid">
    <div class="c-1-5" data-reveal="left"><h2 class="d2">Questions people ask first</h2></div>
    <div class="c-6-13" data-reveal="right"><div class="faq">{faq_block(C.FAQ)}</div></div>
  </div>
</section>

{cta()}
""" + FOOT


# ============================================================ THE HOMELIFT
def homelift():
    specs = "".join(f"""
      <div class="c-1-5" data-reveal="up" style="border-top:2px solid var(--ink);padding-top:18px">
        <h3 class="d4" style="margin-bottom:16px">{g}</h3>
        <dl style="display:grid;gap:14px">{''.join(f'<div><dt class="figcap" style="margin:0">{k}</dt><dd style="font-size:1.125rem;font-weight:700;margin-top:3px">{v}</dd></div>' for k, v in rows)}</dl>
      </div>""" for g, rows in C.SPECS)
    return head("The Homelift | Elevante",
                "How the Elevante Homelift works: the cabin, the staircase, the automatic "
                "doors and the safety system.",
                "homelift") + nav("the-homelift.html") + f"""
{phero('homelift', 'The system', 'A lift inside the staircase', f"{C.SYSTEM['body'][0]}")}

{P.section_drawing('productSection')}

<section class="sec-tight">
  <div class="shell" data-reveal="fade">{counters()}</div>
</section>

<section class="sec" id="safety">
  <div class="shell">
    {titleblock('Safety', 'Movement detection / automatic doors')}
    <div class="sheet-grid" style="margin-top:clamp(28px,4vw,52px)">
      <div class="c-1-6 stack" data-reveal="left">
        <h2 class="d2">{C.SAFETY['h2']}</h2>
        <p class="body-lg">{C.SAFETY['body'][0]}</p>
        <p class="body-lg">{C.SAFETY['body'][1]}</p>
      </div>
      <div class="c-8-13" data-reveal="right">
        <div class="media-frame ar-34 px-wrap ticked">{img('stair-light-01', 'Daylight over a staircase in a private home', '(max-width:820px) 100vw, 40vw', 'px')}</div>
      </div>
    </div>
  </div>
</section>

<section class="sec band-mist">
  <div class="shell">
    {titleblock('Drawing 03', 'Plan / cabin occupancy')}
    <div style="margin-top:clamp(28px,4vw,52px)">{P.cabin_scene('productCabin')}</div>
  </div>
</section>

<section class="sec" id="specifications">
  <div class="shell">
    <div class="shead" data-reveal="up" style="max-width:56ch">
      <h2 class="d2">The system in specifics</h2>
      <p class="body-lg">Full dimensions, load, travel, power requirements, drawings and
      certification are issued by your installer with the quotation.</p>
    </div>
    <div class="sheet-grid">{specs}</div>
  </div>
</section>

{cta()}
""" + FOOT


# ============================================================ IN YOUR HOME
def in_your_home():
    survey = [
        ("The staircase itself", "Its rise, its going, and how much of the footprint is usable once the cabin is in it."),
        ("The floors above and below", "What the opening at the upper floor can be, and what the slab allows."),
        ("Getting to the stairs", "The hall, the doorways and the turning space on both floors, because the journey does not start at the cabin."),
        ("Power and services", "What has to be run, and where it can be run without opening up the whole house."),
    ]
    items = "".join(f"""
      <div class="step" data-reveal="up"><div class="step-n">CHECK {i:02d}</div>
      <h3>{t}</h3><p>{b}</p></div>""" for i, (t, b) in enumerate(survey, 1))
    return head("In your home | Elevante Homelift",
                "How the Elevante Homelift fits into an existing house without taking a room away.",
                "inyourhome") + nav("in-your-home.html") + f"""
{phero('inyourhome', C.INTEGRATION['eyebrow'], f"{C.INTEGRATION['h2']}", f"{C.INTEGRATION['body'][0]}")}

<section class="sec-tight">
  <div class="shell">
    {titleblock('Drawing 02', 'Plan / floor area')}
    <div style="margin-top:clamp(28px,4vw,52px)">{P.plan_compare('iyhPlans')}</div>
  </div>
</section>

<section class="sec band-mist">
  <div class="shell sheet-grid">
    <div class="c-1-6 stack" data-reveal="left">
      <h2 class="d2">Why a conventional homelift is usually refused</h2>
      <p class="body-lg">It is rarely that it does not work. It is that the only place to put it
      is the corner of a living room, or a bedroom that someone is still using.</p>
      <p class="body-lg">{C.INTEGRATION['body'][1]}</p>
    </div>
    <div class="c-8-13" data-reveal="right">
      <div class="media-frame ar-43 px-wrap ticked">{img('interior-living-01', 'A living room in an existing house', '(max-width:820px) 100vw, 40vw', 'px')}</div>
      <p class="figcap">The room you would otherwise give up</p>
    </div>
  </div>
</section>

{P.section_drawing('iyhSection')}

<section class="sec">
  <div class="shell">
    <div class="shead" data-reveal="up" style="max-width:54ch">
      <h2 class="d2">What the survey establishes</h2>
      <p class="body-lg">Every house is different. These are the things the installer measures
      before anything is ordered.</p>
    </div>
    <div class="steps">{items}</div>
  </div>
</section>

{cta()}
""" + FOOT


# ============================================================ DESIGN
def design():
    areas = "".join(f"""
      <a class="card" href="dealers.html">
        <div class="card-media">{img(src, title, '(max-width:820px) 100vw, 45vw')}</div>
        <div class="card-body"><span class="card-num">{i:02d}</span><h3>{title}</h3><p>{body}</p>
          <span class="card-go">Discuss with an installer {ico('arrow-up-right', 16)}</span></div>
      </a>""" for i, (title, body, src) in enumerate(C.DESIGN_AREAS, 1))
    samples = "".join(f"""
      <div><div class="media-frame ar-11">{img(src, f'{name}, {meta}', '(max-width:820px) 45vw, 18vw')}</div>
      <p class="figcap">{name} / {meta}</p></div>""" for name, meta, _h, _l, _d, src in C.MATERIALS)
    return head("Design and finishes | Elevante Homelift",
                "Cabin, staircase, materials and finishes for the Elevante Homelift, "
                "specified to match an existing interior.",
                "design") + nav("design.html") + f"""
{phero('design', 'Design', 'Specified to match the house', 'Cabin, staircase, wall finishes and flooring are chosen together, so the result reads as part of the interior rather than equipment added to it.')}

<section class="sec-tight">
  <div class="shell">
    {titleblock('Finish selector', 'Applied to drawing 01')}
    <div class="sheet-grid" style="margin-top:clamp(24px,3vw,40px)">
      <div class="c-1-7 stack" data-reveal="left">
        <h2 class="d3">Try a finish</h2>
        <p class="body-lg">The drawing below is the same section used throughout the site.
        Changing the material changes the cabin, so you see the choice on the product.</p>
        {mats()}
      </div>
      <div class="c-8-13" data-reveal="right" style="align-self:end">
        <p class="figcap">Five finishes shown. Your installer brings the full range as
        physical samples, because a photograph of oak is not oak.</p>
      </div>
    </div>
  </div>
</section>

{P.section_drawing('designSection')}

<section class="sec band-mist">
  <div class="shell">
    <div class="shead" data-reveal="up" style="max-width:52ch">
      <h2 class="d2">Four things get specified</h2>
      <p class="body-lg">Each is a decision your installer takes with you during the survey,
      once the house has been measured.</p>
    </div>
    <div class="sheet-grid" data-stagger style="grid-template-columns:repeat(2,1fr)">{areas}</div>
  </div>
</section>

<section class="sec">
  <div class="shell">
    <div class="shead" data-reveal="up"><h2 class="d2">Materials</h2></div>
    <div class="mat-grid" data-stagger>{samples}</div>
  </div>
</section>

{cta()}
""" + FOOT


# ============================================================ INSTALLATION
def installation():
    steps = "".join(f"""
      <div class="step" data-reveal="up"><div class="step-n">STEP {i:02d}</div>
      <h3>{t}</h3><p>{b}</p></div>""" for i, (t, b) in enumerate(C.STEPS, 1))
    return head("Installation | Elevante Homelift",
                "What installing an Elevante Homelift involves, from first enquiry through "
                "survey and installation to handover and service.",
                "installation") + nav("installation.html") + f"""
{phero('installation', 'Installation', 'Fitted into a house already lived in', 'Elevante goes into finished houses, not building sites. The survey establishes what is possible before anything is ordered.')}

<section class="sec">
  <div class="shell">
    {titleblock('Process', 'Enquiry to handover / 7 steps')}
    <div class="steps" style="margin-top:clamp(28px,4vw,52px)">{steps}</div>
  </div>
</section>

<section class="sec band-mist">
  <div class="shell sheet-grid">
    <div class="c-1-6 stack" data-reveal="left">
      <h2 class="d2">The survey decides everything that follows</h2>
      <p class="body-lg">Most of what people want to know is answered at the survey: whether the
      house allows it, what it costs, how long it takes and what it affects.</p>
      <p class="body-lg">Nothing is ordered until that visit has happened, and the installer who
      surveys the house is the one who installs the lift and services it afterwards.</p>
      <a class="btn btn-primary" href="dealers.html">{C.DEALER_LABEL} {ico('arrow-up-right')}</a>
    </div>
    <div class="c-8-13" data-reveal="right">
      <div class="media-frame ar-43 px-wrap ticked">{img('people-couple-05', 'An installer going through the survey with a homeowner', '(max-width:820px) 100vw, 40vw', 'px')}</div>
    </div>
  </div>
</section>

<section class="sec" id="faq">
  <div class="shell sheet-grid">
    <div class="c-1-5" data-reveal="left"><h2 class="d2">Practical questions</h2></div>
    <div class="c-6-13" data-reveal="right"><div class="faq">{faq_block(C.INSTALL_FAQ)}</div></div>
  </div>
</section>

{cta()}
""" + FOOT


# ============================================================ PROJECTS
def projects():
    stack = "".join(f"""
      <div class="stack-card" style="top:{92 + i * 16}px">
        <a class="stack-card-inner" href="dealers.html">
          <div class="media-frame">{img(src, title, '(max-width:980px) 100vw, 50vw')}</div>
          <div class="stack-body">
            <span class="stack-n">Project {i + 1:02d} / {len(C.PROJECTS):02d}</span>
            <h3>{title}</h3><p>{body}</p>
            <span class="card-go">Talk to this installer {ico('arrow-up-right', 16)}</span>
          </div>
        </a>
      </div>""" for i, (title, body, src) in enumerate(C.PROJECTS))
    return head("Projects | Elevante Homelift",
                "Elevante Homelift installations in existing private houses.",
                "projects") + nav("projects.html") + f"""
{phero('projects', 'Projects', 'Houses finished before we arrived', 'Every installation starts from a staircase that already exists. These are the situations the system is built for.')}

<!-- PLACEHOLDER PROJECTS. Replace with real installations as they complete.
     Brief s.22 asks for these to be a CMS content type. -->
<section class="sec-tight">
  <div class="shell"><div class="stack-cards">{stack}</div></div>
</section>

<section class="sec band-mist">
  <div class="shell sheet-grid">
    <div class="c-1-6 stack" data-reveal="left">
      <h2 class="d2">What these houses have in common</h2>
      <p class="body-lg">None of them had a spare position for a conventional homelift. In each
      case the alternative was giving up part of a room, or putting a stairlift on a staircase
      the owners did not want to change.</p>
    </div>
    <div class="c-8-13" data-reveal="right">
      <div class="media-frame ar-43 px-wrap ticked">{img('interior-living-05', 'A living room in an existing house', '(max-width:820px) 100vw, 40vw', 'px')}</div>
    </div>
  </div>
</section>

{cta()}
""" + FOOT


# ============================================================ DEALERS
def dealers():
    cards = "".join(f"""
      <a class="dealer" href="#enquiry" data-country="{cc}" data-search="{name} {city} {cc}">
        <h3>{name}</h3><div class="dealer-city">{city}</div>
        <address>{addr}</address>
        {f'<span class="dealer-tag">{ico("check", 15)} Showroom</span>' if demo else ''}
      </a>""" for name, city, cc, addr, demo in C.DEALERS)
    return head("Find an installer | Elevante Homelift",
                "Authorised Elevante installers in the Netherlands, the United Kingdom and "
                "Germany. Several have a working Elevante you can travel in.",
                "dealers") + nav("dealers.html") + f"""
{phero('dealers', '', f'{C.DEALER_LABEL}', 'Authorised installers survey the house, quote the work, install the lift and service it afterwards. Several have a working Elevante in their showroom.')}

<section class="sec-tight" id="showroom">
  <div class="shell">
    <!-- PLACEHOLDER DEALER RECORDS. Brief s.10 and s.22: these become a CMS content
         type so Elevante can add and edit installers without a developer. -->
    <form class="finder" data-dealer-filter>
      <div class="field">
        <label for="loc">Town or postcode</label>
        <input id="loc" name="location" type="text" placeholder="Haarlem, Sheffield, Koln" autocomplete="address-level2">
        <span class="field-help">Type to filter the list below.</span>
      </div>
      <div class="field">
        <label for="country">Country</label>
        <select id="country" name="country">
          <option value="all">All countries</option>
          <option value="nl">Netherlands</option>
          <option value="uk">United Kingdom</option>
          <option value="de">Germany</option>
        </select>
      </div>
      <button class="btn btn-primary" type="submit">{ico('magnifying-glass')} Search</button>
    </form>
    <p style="margin:28px 0 18px" class="dim" data-dealer-count>9 authorised installers</p>
    <div class="dealer-grid" data-dealer-list data-stagger>{cards}</div>
    <div class="empty-state" data-dealer-empty hidden>
      <h3 class="d4">No installer matches that search</h3>
      <p>Try a nearby town, or clear the filters to see all nine. If there is no installer in
      your area yet, send the form below and we will tell you when one is appointed.</p>
    </div>
  </div>
</section>

<section class="sec band-mist" id="enquiry">
  <div class="shell sheet-grid">
    <div class="c-1-5 stack" data-reveal="left">
      <h2 class="d2">Ask an installer to get in touch</h2>
      <p class="body-lg">We pass your details to the authorised installer for your area. They
      arrange the survey, and everything after that is between you and them.</p>
      <p class="body-lg">If you would rather see the lift first, say so in the message and they
      will arrange a showroom visit.</p>
    </div>
    <div class="c-6-13" data-reveal="right">
      <form class="stack" data-contact-form novalidate>
        <div class="field"><label for="f-name">Your name</label>
          <input id="f-name" name="name" type="text" required autocomplete="name">
          <span class="field-error">Please enter your name.</span></div>
        <div class="field"><label for="f-email">Email address</label>
          <input id="f-email" name="email" type="email" required autocomplete="email">
          <span class="field-error">Please enter an email address we can reply to.</span></div>
        <div class="field"><label for="f-post">Postcode</label>
          <input id="f-post" name="postcode" type="text" required autocomplete="postal-code">
          <span class="field-help">So we can route this to the right installer.</span>
          <span class="field-error">Please enter your postcode.</span></div>
        <div class="field"><label for="f-msg">Anything useful about the house</label>
          <textarea id="f-msg" name="message" rows="4" placeholder="Number of floors, where the staircase sits, whether a wheelchair or rollator is used."></textarea></div>
        <button class="btn btn-primary" type="submit">Send to my installer {ico('arrow-up-right')}</button>
        <p class="form-status" role="status" aria-live="polite" hidden></p>
      </form>
    </div>
  </div>
</section>

<section class="sec" id="brochure">
  <div class="shell sheet-grid">
    <div class="c-1-6" data-reveal="left">
      <div class="media-frame ar-43 px-wrap ticked">{img('interior-room-04', 'A living room in a private home', '(max-width:820px) 100vw, 45vw', 'px')}</div>
    </div>
    <div class="c-8-13 stack" data-reveal="right" style="align-self:center">
      <h2 class="d3">Take the details away with you</h2>
      <p class="body-lg">The brochure covers dimensions, configurations, finishes and what the
      installation involves. It is the document to give an architect or a family member who is
      helping you decide.</p>
      <a class="btn btn-ghost" href="#brochure">{ico('download')} Download the brochure</a>
    </div>
  </div>
</section>
""" + FOOT


PAGES = {
    "index.html": home,
    "the-homelift.html": homelift,
    "in-your-home.html": in_your_home,
    "design.html": design,
    "installation.html": installation,
    "projects.html": projects,
    "dealers.html": dealers,
}

if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    bad = []
    for fn, f in PAGES.items():
        html = f()
        for ch, why in (("—", "em-dash"), ("–", "en-dash")):
            if ch in html:
                bad.append(f"{fn}: {why}")
        (OUT / fn).write_text(html, encoding="utf-8")
        print(f"  {fn:22} {len(html):>7,} bytes")
    if bad:
        print("\nFAIL:", *bad, sep="\n  ")
        sys.exit(1)
    print("\nDirection B built. Zero em-dashes / en-dashes.")
