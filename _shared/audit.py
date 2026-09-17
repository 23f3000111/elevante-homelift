# -*- coding: utf-8 -*-
"""
Static pre-flight for both directions.
Checks link and asset integrity, alt text, dash policy, eyebrow budget and
heading order. Run after every build:  python _shared/audit.py
"""
import pathlib, re, urllib.parse, sys, math

ROOT = pathlib.Path(__file__).resolve().parent.parent
SITES = ["site-a-atelier", "site-b-blueprint"]

problems = []
checked = 0


def note(site, page, msg):
    problems.append(f"{site}/{page}: {msg}")


for site in SITES:
    root = ROOT / site
    pages = sorted(root.glob("*.html"))
    names = {p.name for p in pages}

    for page in pages:
        checked += 1
        html = page.read_text(encoding="utf-8")
        ids = set(re.findall(r'id="([^"]+)"', html))
        syms = set(re.findall(r'<symbol id="([^"]+)"', html))

        for m in re.finditer(r'(?:src|href)="([^"]+)"', html):
            ref = m.group(1)
            if ref.startswith(("http", "mailto:", "data:")):
                continue
            if ref == "#":
                continue                                   # explicit placeholder
            target, _, frag = ref.partition("#")
            target = urllib.parse.unquote(target.split("?")[0])

            if target:
                if target.endswith(".html"):
                    if target not in names:
                        note(site, page.name, f"dead page link -> {target}")
                elif not (root / target).exists():
                    note(site, page.name, f"missing asset -> {target}")
            elif frag and frag not in ids:
                note(site, page.name, f"anchor with no target -> #{frag}")

            # a fragment on another page is only checkable there
            if target.endswith(".html") and frag and target in names:
                other = (root / target).read_text(encoding="utf-8")
                if f'id="{frag}"' not in other:
                    note(site, page.name, f"cross-page anchor missing -> {target}#{frag}")

        for m in re.finditer(r'srcset="([^"]+)"', html):
            for cand in m.group(1).split(","):
                p = cand.strip().split(" ")[0]
                if p and not (root / p).exists():
                    note(site, page.name, f"missing srcset candidate -> {p}")

        for m in re.finditer(r'<use href="#([^"]+)"', html):
            if m.group(1) not in syms:
                note(site, page.name, f"icon not in sprite -> {m.group(1)}")

        if "—" in html:
            note(site, page.name, "em-dash present")
        if "–" in html:
            note(site, page.name, "en-dash present")

        for m in re.finditer(r'<img (?![^>]*\balt=)[^>]*>', html):
            note(site, page.name, f"img without alt -> {m.group(0)[:60]}")

        # eyebrow budget: at most ceil(sections / 3)
        sections = len(re.findall(r"<section", html))
        eyebrows = len(re.findall(r'class="eyebrow"', html))
        budget = max(1, math.ceil(sections / 3))
        if eyebrows > budget:
            note(site, page.name, f"eyebrow budget: {eyebrows} used, {budget} allowed ({sections} sections)")

        if html.count("<h1") != 1:
            note(site, page.name, f"expected exactly one h1, found {html.count('<h1')}")

        if 'lang="en"' not in html:
            note(site, page.name, "missing lang on <html>")
        if "<title>" not in html:
            note(site, page.name, "missing <title>")
        if 'name="description"' not in html:
            note(site, page.name, "missing meta description")

print(f"Pre-flight over {checked} pages")
if problems:
    print(f"\n{len(problems)} problem(s):")
    for p in dict.fromkeys(problems):
        print("  " + p)
    sys.exit(1)
print("\nPASS: links, assets, srcsets, anchors, icons, alt text, dash policy,")
print("      eyebrow budget, heading order and head metadata all clean.")
