# -*- coding: utf-8 -*-
"""
DIRECTION A "ATELIER" - page builder.
Warm, material, editorial-architectural. Laid out on a 12 column sheet
with content placed off-centre and hairline rules doing the dividing.

Homepage section order follows brief section 9 exactly.
"""
import pathlib, sys
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import content as C
import parts as P

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "site-a-atelier"
SPRITE = (ROOT / "_shared" / "sprite.html").read_text(encoding="utf-8")
VER = "2"


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
<meta name="theme-color" content="#2F5D45">
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="preload" href="assets/fonts/bricolage-grotesque-700.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/fonts/instrument-sans-400.woff2" as="font" type="font/woff2" crossorigin>
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
                                                   t, ico("arrow-right", 22))
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
          <a class="btn btn-on-dark" href="dealers.html">{C.DEALER_LABEL} {ico('arrow-right')}</a>
          <a class="btn btn-ghost-dark" href="the-homelift.html">See how it works</a>
        </div>
      </div>
    </div>
  </div>
</section>"""


# ============================================================ HOME
def home():
    proj_cards = [f"""
      <a class="card card-ruled" href="projects.html">
        <span class="card-num">{i:02d}</span>
        <div class="card-media" style="margin-top:16px">{img(src, title, '(max-width:820px) 100vw, 33vw')}</div>
        <div class="card-body"><h3>{title}</h3><p>{body}</p>
          <span class="card-go">See the project {ico('arrow-right', 16)}</span></div>
      </a>""" for i, (title, body, src) in enumerate(C.PROJECTS[:3], 1)]

    steps = "".join(f"""
      <div class="tl-item" data-reveal="up">
        <div class="tl-n">{i:02d}</div><h3>{t}</h3><p>{b}</p>
      </div>""" for i, (t, b) in enumerate(C.STEPS[:4], 1))

    marquee = "".join(f"<span>{m[0]}</span>" for m in C.MATERIALS) * 2

    return head("Elevante Homelift | A lift built into your staircase",
                "The Elevante Homelift travels inside the staircase footprint of an existing "
                "house, so every floor stays in use and no room is lost.",
                "home") + nav("index.html") + f"""

<!-- HERO (brief s.9: benefit first, not technology) -->
<section class="hero">
  <div class="shell sheet">
    <div class="c-1-7">
      <h1 class="d1" data-split>{C.HERO['h1']}</h1>
      <p class="lead">{C.HERO['lead']}</p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="#how">See how it works {ico('arrow-right')}</a>
        <a class="btn btn-ghost" href="dealers.html">{C.DEALER_LABEL}</a>
      </div>
    </div>
    <div class="c-8-13" data-reveal="right">
      <div class="hero-figure px-wrap">
        {img('stair-hero-01', 'A staircase in a private house with the space beneath it in use', '(max-width:820px) 100vw, 42vw', 'px', eager=True)}
      </div>
    </div>
    <div class="c-1-13 hero-meta" data-reveal="fade">
      {''.join(f'<span>{m}</span>' for m in C.HERO['meta'])}
    </div>
  </div>
</section>

<!-- NUMBERS -->
<section class="sec-tight">
  <div class="shell" data-reveal="fade">{counters()}</div>
</section>

<!-- SYSTEM INTRODUCTION + THE SECTION DRAWING
     brief s.9: "supported by video, animation or imagery that makes the movement
     of the cabin relative to the staircase immediately understandable" -->
<section class="sec-tight" id="how">
  <div class="shell sheet">
    <div class="index-rule">01</div>
    <div class="c-2-8">
      <span class="eyebrow">{C.SYSTEM['eyebrow']}</span>
      <h2 class="d2" data-split style="margin-top:16px">{C.SYSTEM['h2']}</h2>
    </div>
    <div class="c-8-13 stack" data-reveal="up" style="align-self:end">
      <p class="body-lg">{C.SYSTEM['body'][0]}</p>
      <p class="body-lg">{C.SYSTEM['body'][1]}</p>
    </div>
  </div>
</section>
{P.section_drawing('homeSection')}

<!-- INTEGRATION: the spatial consequence, drawn (brief s.9) -->
<section class="sec band-mist">
  <div class="shell sheet">
    <div class="index-rule">02</div>
    <div class="c-2-8 stack" data-reveal="up">
      <span class="eyebrow">{C.INTEGRATION['eyebrow']}</span>
      <h2 class="d2">{C.INTEGRATION['h2']}</h2>
      <p class="body-lg">{C.INTEGRATION['body'][0]}</p>
      <p class="body-lg">{C.INTEGRATION['body'][1]}</p>
      <a class="tlink" href="in-your-home.html">How it fits your house {ico('arrow-right', 16)}</a>
    </div>
    <div class="c-1-13" style="margin-top:clamp(28px,4vw,56px)">{P.plan_compare()}</div>
  </div>
</section>

<!-- EVERYDAY USE (brief s.9: show what happens) -->
<section class="sec">
  <div class="shell sheet">
    <div class="index-rule">03</div>
    <div class="c-2-8 stack" data-reveal="up">
      <span class="eyebrow">{C.EVERYDAY['eyebrow']}</span>
      <h2 class="d2">{C.EVERYDAY['h2']}</h2>
      <p class="body-lg">{C.EVERYDAY['body']}</p>
    </div>
    <div class="c-1-13" style="margin-top:clamp(28px,4vw,52px)" data-reveal="up">{P.cabin_scene()}</div>
  </div>
</section>

<!-- TESTIMONIAL
     PLACEHOLDER. Brief s.9 asks for real customer experiences once installations
     exist. Replace the quote, the name and the portrait before launch. -->
<section class="sec band-dark">
  <div class="shell sheet">
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

<div class="marquee" aria-hidden="true"><div class="marquee-track">{marquee}</div></div>

<!-- DESIGN TEASER (brief s.9 and s.18: introduce, do not configure) -->
<section class="sec">
  <div class="shell sheet">
    <div class="index-rule">04</div>
    <div class="c-2-8 stack" data-reveal="up">
      <span class="eyebrow">Design</span>
      <h2 class="d2">Choose the finish and the drawing changes</h2>
      <p class="body-lg">Cabin, staircase, wall finishes and flooring are specified together.
      Pick a material to see it on the cabin in the section above.</p>
      {mats()}
      <a class="tlink" href="design.html">All finishes and combinations {ico('arrow-right', 16)}</a>
    </div>
    <div class="c-8-13" data-reveal="right">
      <div class="media-frame ar-34 px-wrap">{img('material-wood-01', 'Oak, brushed and oiled', '(max-width:820px) 100vw, 40vw', 'px')}</div>
      <p class="figcap">Physical samples are brought to the survey</p>
    </div>
  </div>
</section>

<!-- PROJECTS -->
<section class="sec band-mist">
  <div class="shell">
    <div class="shead-row">
      <h2 class="d2">Installed in houses that were already finished</h2>
      <a class="tlink" href="projects.html">All projects {ico('arrow-right', 16)}</a>
    </div>
    <div class="sheet" data-stagger>
      <div class="c-1-5">{proj_cards[0]}</div>
      <div class="c-5-13" style="display:grid;grid-template-columns:1fr 1fr;gap:clamp(16px,2vw,28px)">
        {proj_cards[1]}{proj_cards[2]}
      </div>
    </div>
  </div>
</section>

<!-- INSTALLATION -->
<section class="sec">
  <div class="shell sheet">
    <div class="index-rule">05</div>
    <div class="c-2-8 stack" data-reveal="up">
      <h2 class="d2">Seven steps, and you know what each one involves</h2>
      <p class="body-lg">Elevante is fitted into a house that is already finished and lived in.
      The survey establishes what is possible before anything is ordered.</p>
      <a class="btn btn-ghost" href="installation.html">The full process {ico('arrow-right')}</a>
    </div>
    <div class="c-1-13" style="margin-top:clamp(24px,3vw,44px)"><div class="tl">{steps}</div></div>
  </div>
</section>

<!-- FAQ -->
<section class="sec band-mist" id="faq">
  <div class="shell sheet">
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
        <dl style="display:grid;gap:14px">{''.join(f'<div><dt class="figcap" style="margin:0">{k}</dt><dd style="font-size:1.125rem;font-weight:600;margin-top:3px">{v}</dd></div>' for k, v in rows)}</dl>
      </div>""" for g, rows in C.SPECS)

    return head("The Homelift | Elevante",
                "How the Elevante Homelift works: the cabin, the staircase, the automatic "
                "doors and the safety system.",
                "homelift") + nav("the-homelift.html") + f"""
<section class="phero">
  <div class="shell sheet">
    <div class="c-1-9">
      <span class="eyebrow">The system</span>
      <h1 class="d1" data-split style="margin-top:16px">A lift that travels inside the staircase</h1>
      <p class="lead">{C.SYSTEM['body'][0]}</p>
    </div>
  </div>
</section>

{P.section_drawing('productSection')}

<section class="sec-tight">
  <div class="shell" data-reveal="fade">{counters()}</div>
</section>

<section class="sec" id="safety">
  <div class="shell sheet">
    <div class="c-1-6 stack" data-reveal="left">
      <h2 class="d2">{C.SAFETY['h2']}</h2>
      <p class="body-lg">{C.SAFETY['body'][0]}</p>
      <p class="body-lg">{C.SAFETY['body'][1]}</p>
    </div>
    <div class="c-8-13" data-reveal="right">
      <div class="media-frame ar-34 px-wrap">{img('stair-light-01', 'Daylight over a staircase in a private home', '(max-width:820px) 100vw, 40vw', 'px')}</div>
    </div>
  </div>
</section>

<section class="sec band-mist">
  <div class="shell sheet">
    <div class="c-1-13 shead" data-reveal="up">
      <h2 class="d2">Everyday use</h2>
      <p class="body-lg">{C.EVERYDAY['body']}</p>
    </div>
    <div class="c-1-13">{P.cabin_scene('productCabin')}</div>
  </div>
</section>

<section class="sec" id="specifications">
  <div class="shell">
    <div class="shead" data-reveal="up" style="max-width:56ch">
      <h2 class="d2">The system in specifics</h2>
      <p class="body-lg">Full dimensions, load, travel, power requirements, drawings and
      certification are issued by your installer with the quotation.</p>
    </div>
    <div class="sheet">{specs}</div>
  </div>
</section>

{cta()}
""" + FOOT


# ============================================================ IN YOUR HOME
def in_your_home():
    return head("In your home | Elevante Homelift",
                "How the Elevante Homelift fits into an existing house without taking a room away.",
                "inyourhome") + nav("in-your-home.html") + f"""
<section class="phero">
  <div class="shell sheet">
    <div class="c-1-9">
      <span class="eyebrow">{C.INTEGRATION['eyebrow']}</span>
      <h1 class="d1" data-split style="margin-top:16px">{C.INTEGRATION['h2']}</h1>
      <p class="lead">{C.INTEGRATION['body'][0]}</p>
    </div>
  </div>
</section>

<section class="sec-tight">
  <div class="shell">{P.plan_compare('iyhPlans')}</div>
</section>

<section class="sec band-mist">
  <div class="shell sheet">
    <div class="c-1-6 stack" data-reveal="left">
      <h2 class="d2">Why a conventional homelift is usually refused</h2>
      <p class="body-lg">It is rarely that it does not work. It is that the only place to put it
      is the corner of a living room, or a bedroom that someone is still using.</p>
      <p class="body-lg">{C.INTEGRATION['body'][1]}</p>
    </div>
    <div class="c-8-13" data-reveal="right">
      <div class="media-frame ar-43 px-wrap">{img('interior-living-01', 'A living room in an existing house', '(max-width:820px) 100vw, 40vw', 'px')}</div>
      <p class="figcap">The room you would otherwise give up</p>
    </div>
  </div>
</section>

{P.section_drawing('iyhSection')}

<section class="sec">
  <div class="shell sheet">
    <div class="c-1-13 shead" data-reveal="up">
      <h2 class="d2">What the survey establishes</h2>
      <p class="body-lg">Every house is different. These are the things the installer measures
      before anything is ordered.</p>
    </div>
    <div class="c-1-13"><div class="tl">
      {''.join(f'<div class="tl-item" data-reveal="up"><div class="tl-n">{i:02d}</div><h3>{t}</h3><p>{b}</p></div>' for i, (t, b) in enumerate([
        ("The staircase itself", "Its rise, its going, and how much of the footprint is usable once the cabin is in it."),
        ("The floors above and below", "What the opening at the upper floor can be, and what the slab allows."),
        ("Getting to the stairs", "The hall, the doorways and the turning space on both floors, because the journey does not start at the cabin."),
        ("Power and services", "What has to be run, and where it can be run without opening up the whole house."),
      ], 1))}
    </div></div>
  </div>
</section>

{cta()}
""" + FOOT


# ============================================================ DESIGN
def design():
    area_cards = [f"""
      <a class="card card-ruled" href="dealers.html">
        <span class="card-num">{i:02d}</span>
        <div class="card-media" style="margin-top:16px">{img(src, title, '(max-width:820px) 100vw, 45vw')}</div>
        <div class="card-body"><h3>{title}</h3><p>{body}</p>
          <span class="card-go">Discuss with an installer {ico('arrow-right', 16)}</span></div>
      </a>""" for i, (title, body, src) in enumerate(C.DESIGN_AREAS, 1)]

    samples = "".join(f"""
      <div>
        <div class="media-frame ar-11">{img(src, f'{name}, {meta}', '(max-width:820px) 45vw, 18vw')}</div>
        <p class="figcap">{name} / {meta}</p>
      </div>""" for name, meta, _h, _l, _d, src in C.MATERIALS)

    return head("Design and finishes | Elevante Homelift",
                "Cabin, staircase, materials and finishes for the Elevante Homelift, "
                "specified to match an existing interior.",
                "design") + nav("design.html") + f"""
<section class="phero">
  <div class="shell sheet">
    <div class="c-1-9">
      <span class="eyebrow">Design</span>
      <h1 class="d1" data-split style="margin-top:16px">Specified to match the house it goes into</h1>
      <p class="lead">Cabin, staircase, wall finishes and flooring are chosen together, so the
      result reads as part of the interior rather than equipment added to it.</p>
    </div>
  </div>
</section>

<section class="sec-tight">
  <div class="shell sheet">
    <div class="c-1-6 stack" data-reveal="left">
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
</section>

{P.section_drawing('designSection')}

<section class="sec band-mist">
  <div class="shell">
    <div class="shead" data-reveal="up" style="max-width:52ch">
      <h2 class="d2">Four things get specified</h2>
      <p class="body-lg">Each is a decision your installer takes with you during the survey,
      once the house has been measured.</p>
    </div>
    <div class="sheet" data-stagger>
      <div class="c-1-6" style="display:grid;gap:clamp(26px,3vw,44px)">{area_cards[0]}{area_cards[1]}</div>
      <div class="c-8-13" style="display:grid;gap:clamp(26px,3vw,44px);padding-top:clamp(30px,6vw,90px)">{area_cards[2]}{area_cards[3]}</div>
    </div>
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
      <div class="tl-item" data-reveal="up"><div class="tl-n">{i:02d}</div><h3>{t}</h3><p>{b}</p></div>
      """ for i, (t, b) in enumerate(C.STEPS, 1))
    return head("Installation | Elevante Homelift",
                "What installing an Elevante Homelift involves, from first enquiry through "
                "survey and installation to handover and service.",
                "installation") + nav("installation.html") + f"""
<section class="phero">
  <div class="shell sheet">
    <div class="c-1-9">
      <span class="eyebrow">Installation</span>
      <h1 class="d1" data-split style="margin-top:16px">Fitted into a house that is already lived in</h1>
      <p class="lead">Elevante goes into finished houses, not building sites. The survey
      establishes what is possible before anything is ordered.</p>
    </div>
    <div class="c-1-13" data-reveal="scale" style="margin-top:clamp(30px,5vw,60px)">
      <div class="media-frame ar-219 px-wrap">{img('material-detail-03', 'A joiner working timber for a staircase', '100vw', 'px', eager=True)}</div>
    </div>
  </div>
</section>

<section class="sec">
  <div class="shell">
    <div class="shead" data-reveal="up"><h2 class="d2">Seven steps from enquiry to handover</h2></div>
    <div class="tl">{steps}</div>
  </div>
</section>

<section class="sec band-mist">
  <div class="shell sheet">
    <div class="c-1-6 stack" data-reveal="left">
      <h2 class="d2">The survey decides everything that follows</h2>
      <p class="body-lg">Most of what people want to know is answered at the survey: whether the
      house allows it, what it costs, how long it takes and what it affects.</p>
      <p class="body-lg">Nothing is ordered until that visit has happened, and the installer who
      surveys the house is the one who installs the lift and services it afterwards.</p>
      <a class="btn btn-primary" href="dealers.html">{C.DEALER_LABEL} {ico('arrow-right')}</a>
    </div>
    <div class="c-8-13" data-reveal="right">
      <div class="media-frame ar-43 px-wrap">{img('people-couple-05', 'An installer going through the survey with a homeowner', '(max-width:820px) 100vw, 40vw', 'px')}</div>
    </div>
  </div>
</section>

<section class="sec" id="faq">
  <div class="shell sheet">
    <div class="c-1-5" data-reveal="left"><h2 class="d2">Practical questions</h2></div>
    <div class="c-6-13" data-reveal="right"><div class="faq">{faq_block(C.INSTALL_FAQ)}</div></div>
  </div>
</section>

{cta()}
""" + FOOT


# ============================================================ PROJECTS
def projects():
    cards = "".join(f"""
      <a class="card card-ruled" href="dealers.html">
        <span class="card-num">{i:02d}</span>
        <div class="card-media" style="margin-top:16px">{img(src, title, '(max-width:820px) 100vw, 33vw')}</div>
        <div class="card-body"><h3>{title}</h3><p>{body}</p>
          <span class="card-go">Talk to this installer {ico('arrow-right', 16)}</span></div>
      </a>""" for i, (title, body, src) in enumerate(C.PROJECTS, 1))
    return head("Projects | Elevante Homelift",
                "Elevante Homelift installations in existing private houses.",
                "projects") + nav("projects.html") + f"""
<section class="phero">
  <div class="shell sheet">
    <div class="c-1-9">
      <span class="eyebrow">Projects</span>
      <h1 class="d1" data-split style="margin-top:16px">Houses that were finished before we arrived</h1>
      <p class="lead">Every installation starts from a staircase that already exists. These are
      the situations the system is built for.</p>
    </div>
  </div>
</section>

<!-- PLACEHOLDER PROJECTS. Replace with real installations as they complete.
     Brief s.22 asks for these to be a CMS content type. -->
<section class="sec-tight">
  <div class="shell">
    <div class="sheet" data-stagger style="grid-template-columns:repeat(3,1fr)">{cards}</div>
  </div>
</section>

<section class="sec band-mist">
  <div class="shell sheet">
    <div class="c-1-6 stack" data-reveal="left">
      <h2 class="d2">What these houses have in common</h2>
      <p class="body-lg">None of them had a spare position for a conventional homelift. In each
      case the alternative was giving up part of a room, or putting a stairlift on a staircase
      the owners did not want to change.</p>
    </div>
    <div class="c-8-13" data-reveal="right">
      <div class="media-frame ar-43 px-wrap">{img('interior-living-05', 'A living room in an existing house', '(max-width:820px) 100vw, 40vw', 'px')}</div>
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
        {f'<span class="dealer-tag">{ico("check", 15)} Showroom, by appointment</span>' if demo else ''}
      </a>""" for name, city, cc, addr, demo in C.DEALERS)
    return head("Find an installer | Elevante Homelift",
                "Authorised Elevante installers in the Netherlands, the United Kingdom and "
                "Germany. Several have a working Elevante you can travel in.",
                "dealers") + nav("dealers.html") + f"""
<section class="phero">
  <div class="shell sheet">
    <div class="c-1-9">
      <h1 class="d1" data-split>{C.DEALER_LABEL}</h1>
      <p class="lead">Authorised installers survey the house, quote the work, install the lift
      and service it afterwards. Several have a working Elevante in their showroom.</p>
    </div>
  </div>
</section>

<section class="sec-tight" id="showroom">
  <div class="shell">
    <!-- PLACEHOLDER DEALER RECORDS. Brief s.10 and s.22: these become a CMS content
         type so Elevante can add and edit installers without a developer, and so
         lead routing follows the record. -->
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
    <p style="margin:30px 0 20px;font-weight:600" data-dealer-count>9 authorised installers</p>
    <div class="dealer-grid" data-dealer-list data-stagger>{cards}</div>
    <div class="empty-state" data-dealer-empty hidden>
      <h3 class="d4">No installer matches that search</h3>
      <p>Try a nearby town, or clear the filters to see all nine. If there is no installer in
      your area yet, send the form below and we will tell you when one is appointed.</p>
    </div>
  </div>
</section>

<section class="sec band-mist" id="enquiry">
  <div class="shell sheet">
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
        <button class="btn btn-primary" type="submit">Send to my installer {ico('arrow-right')}</button>
        <p class="form-status" role="status" aria-live="polite" hidden></p>
      </form>
    </div>
  </div>
</section>

<section class="sec" id="brochure">
  <div class="shell sheet">
    <div class="c-1-6" data-reveal="left">
      <div class="media-frame ar-43 px-wrap">{img('interior-room-04', 'A living room in a private home', '(max-width:820px) 100vw, 45vw', 'px')}</div>
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
    print("\nDirection A built. Zero em-dashes / en-dashes.")
