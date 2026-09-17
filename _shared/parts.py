# -*- coding: utf-8 -*-
"""
Shared drawn components for both Elevante directions.

These exist because the brief asks for them by name:
  s.9  "Preferably supported by video, animation or imagery that makes the
        movement of the cabin relative to the staircase immediately
        understandable."
  s.9  "A section drawing, animation or before/after view may communicate
        this more effectively than text."
  s.14 "Animation or 3D visualisation may be useful where photography cannot
        adequately explain the integrated movement of staircase and cabin."

Photography cannot show a cabin inside a staircase. These drawings can.
Everything is themed through CSS custom properties, so the same geometry
renders in Direction A's material palette and Direction B's drawing palette.
"""


# ---------------------------------------------------------------- 1. SECTION
def section_drawing(ident="sectionScene"):
    """Scroll-driven section through a house. The cabin rises inside the
    staircase footprint, behind the flight; the openings close themselves."""
    treads = "".join(
        '<rect x="%d" y="%d" width="26" height="24"/>' % (566 + i * 18, 636 - i * 25)
        for i in range(12)
    )
    return f"""
<div class="dwg-scene" id="{ident}">
  <div class="dwg-stage">
    <figure class="dwg-figure">
      <svg class="dwg" viewBox="0 0 1000 730" role="img" aria-labelledby="{ident}-t {ident}-d">
        <title id="{ident}-t">Section through a house showing the Elevante Homelift</title>
        <desc id="{ident}-d">The cabin travels vertically inside the staircase footprint,
        behind the stair flight, between the ground floor and the first floor. The staircase
        stays in place. An automatic door closes the opening at the upper floor whenever the
        cabin is elsewhere, and the lower opening closes as the cabin rises.</desc>

        <defs>
          <pattern id="{ident}-h" width="9" height="9" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="9" class="dwg-hatchline"/>
          </pattern>
          <clipPath id="{ident}-well"><rect x="566" y="128" width="220" height="534"/></clipPath>
          <clipPath id="{ident}-open"><rect x="560" y="330" width="240" height="30"/></clipPath>
        </defs>

        <path class="dwg-wall" d="M70 660 V70 H930 V660"/>
        <line class="dwg-ground" x1="40" y1="660" x2="960" y2="660"/>
        <rect x="40" y="660" width="920" height="24" fill="url(#{ident}-h)"/>

        <rect class="dwg-zone" x="566" y="128" width="220" height="532" rx="2"/>

        <rect class="dwg-slab" x="70" y="336" width="490" height="20"/>
        <rect class="dwg-slab" x="800" y="336" width="130" height="20"/>

        <g class="dwg-furn" aria-hidden="true">
          <rect x="140" y="150" width="120" height="110"/><line x1="200" y1="150" x2="200" y2="260"/>
          <rect x="140" y="470" width="86" height="190"/>
          <path d="M330 660 v-58 h150 v58"/><path d="M330 614 h150"/>
          <rect x="852" y="228" width="60" height="108"/>
        </g>

        <g clip-path="url(#{ident}-well)">
          <g class="dwg-cabin-g" data-cabin>
            <rect class="dwg-cabin" x="596" y="452" width="164" height="206" rx="3"/>
            <rect class="dwg-cabin-in" x="608" y="464" width="140" height="150" rx="2"/>
            <rect class="dwg-ctrl" x="738" y="492" width="11" height="34" rx="3"/>
            <g class="dwg-person">
              <circle cx="654" cy="500" r="12"/>
              <path d="M642 517 q12 -6 24 0 l-3 48 h-18 z"/>
              <rect x="645" y="565" width="7" height="44" rx="3"/>
              <rect x="656" y="565" width="7" height="44" rx="3"/>
            </g>
          </g>
        </g>

        <g clip-path="url(#{ident}-open)">
          <rect class="dwg-door" data-upper-door x="560" y="336" width="240" height="20"/>
        </g>
        <rect class="dwg-door" data-lower-door x="566" y="640" width="220" height="20" opacity="0"/>

        <g class="dwg-stair">
          <path class="dwg-stringer" d="M566 660 L786 356 L786 384 L588 660 Z"/>
          <g class="dwg-tread">{treads}</g>
          <path class="dwg-rail" d="M572 590 L792 292"/>
          <path class="dwg-rail" d="M572 590 V648 M792 292 V350"/>
        </g>

        <g class="dwg-note" data-note="stair" opacity="0">
          <path class="dwg-leader" d="M300 640 H600"/><circle class="dwg-dot" cx="600" cy="640" r="3"/>
          <text x="160" y="636">Stairs stay in use</text>
        </g>
        <g class="dwg-note" data-note="void" opacity="0">
          <path class="dwg-leader" d="M300 520 H560"/><circle class="dwg-dot" cx="560" cy="520" r="3"/>
          <text x="108" y="516">Inside the staircase footprint</text>
        </g>
        <g class="dwg-note" data-note="door" opacity="0">
          <path class="dwg-leader" d="M884 300 H812 V332"/><circle class="dwg-dot" cx="812" cy="332" r="3"/>
          <text x="838" y="292">Opening closed</text>
        </g>
      </svg>

      <figcaption class="dwg-cap">
        <span class="dwg-readout" data-readout>Ground floor</span>
        <span class="dwg-disclaimer">Indicative section. Approved drawings are issued with the quotation.</span>
      </figcaption>
    </figure>
  </div>
</div>
"""


# ------------------------------------------------------------- 2. CABIN SCENE
CABIN_STATES = [
    ("alone", "On your own",
     "The cabin arrives level with the floor. No step up, no threshold to cross."),
    ("rollator", "With a rollator",
     "The rollator goes in with you. It does not have to be folded or left behind."),
    ("wheelchair", "With a wheelchair",
     "The cabin takes a wheelchair, and you do not need to turn it around inside."),
    ("assisted", "With someone helping",
     "There is room for a second person, so a partner, family member or carer travels with you."),
]


FLOOR_Y = 300   # the cabin floor inside the 520x380 viewBox


def _figure(x, scale=1.0, cls=""):
    """A standing person, drawn upward from their own baseline, then placed
    on the cabin floor. Without the FLOOR_Y offset they render off-canvas."""
    return f"""<g class="cab-person {cls}" transform="translate({x},{FLOOR_Y}) scale({scale})">
      <circle cx="0" cy="-152" r="17"/>
      <path d="M-18 -128 q18 -9 36 0 l-5 66 h-26 z"/>
      <rect x="-14" y="-62" width="10" height="62" rx="4"/>
      <rect x="4" y="-62" width="10" height="62" rx="4"/>
    </g>"""


def cabin_scene(ident="cabinScene"):
    tabs = "".join(
        '<button class="cab-tab" role="tab" data-cab-tab="%s" aria-selected="%s" '
        'aria-controls="%s-panel" id="%s-tab-%s">%s</button>'
        % (key, "true" if i == 0 else "false", ident, ident, key, label)
        for i, (key, label, _) in enumerate(CABIN_STATES)
    )
    notes = "".join(
        '<p class="cab-note" data-cab-note="%s"%s>%s</p>' % (key, "" if i == 0 else " hidden", body)
        for i, (key, _, body) in enumerate(CABIN_STATES)
    )
    return f"""
<div class="cab" id="{ident}">
  <div class="cab-tabs" role="tablist" aria-label="Who is travelling">{tabs}</div>

  <div class="cab-stagewrap" id="{ident}-panel" role="tabpanel" tabindex="0"
       aria-labelledby="{ident}-tab-alone">
    <svg class="cab-svg" viewBox="0 0 520 380" role="img" aria-label="Plan of the cabin showing how much room there is inside">
      <!-- cabin shell, drawn in plan -->
      <rect class="cab-shell" x="60" y="40" width="400" height="300" rx="4"/>
      <rect class="cab-floor" x="74" y="54" width="372" height="272" rx="2"/>
      <!-- door opening on the near side -->
      <path class="cab-door" d="M150 340 H370"/>
      <text class="cab-dim" x="260" y="366" text-anchor="middle">DOOR</text>
      <rect class="cab-panel" x="418" y="150" width="16" height="70" rx="4"/>

      <g data-cab-state="alone">{_figure(260)}</g>

      <g data-cab-state="rollator" hidden>
        {_figure(210)}
        <g class="cab-aid">
          <rect x="272" y="196" width="86" height="12" rx="6"/>
          <rect x="276" y="208" width="8" height="58" rx="4"/>
          <rect x="346" y="208" width="8" height="58" rx="4"/>
          <circle cx="280" cy="274" r="9"/><circle cx="350" cy="274" r="9"/>
        </g>
      </g>

      <g data-cab-state="wheelchair" hidden>
        <g class="cab-aid">
          <circle cx="212" cy="250" r="46" class="cab-wheel"/>
          <circle cx="212" cy="250" r="14"/>
          <rect x="196" y="150" width="96" height="14" rx="7"/>
          <rect x="278" y="150" width="14" height="104" rx="7"/>
          <circle cx="300" cy="280" r="16"/>
        </g>
        <g class="cab-person" transform="translate(232,284)">
          <circle cx="0" cy="-152" r="17"/>
          <path d="M-18 -128 q18 -9 36 0 l-4 54 h-28 z"/>
          <rect x="-16" y="-74" width="58" height="12" rx="6"/>
        </g>
      </g>

      <g data-cab-state="assisted" hidden>
        {_figure(196)}
        {_figure(322, 0.97, "cab-person-2")}
      </g>
    </svg>

    <div class="cab-notes">{notes}</div>
  </div>
</div>
"""


# ---------------------------------------------------------- 3. PLAN COMPARISON
def plan_compare(ident="planCompare"):
    """The brief's central commercial argument, drawn: a conventional homelift
    needs a position of its own, Elevante does not (brief s.1 and s.2)."""
    return f"""
<div class="plans" id="{ident}">
  <figure class="plan" data-plan="conventional">
    <svg class="plan-svg" viewBox="0 0 400 320" role="img"
         aria-label="Plan of a ground floor where a conventional homelift takes floor space from the living room">
      <rect class="plan-outline" x="20" y="20" width="360" height="280"/>
      <line class="plan-wall" x1="240" y1="20" x2="240" y2="300"/>
      <g class="plan-stair">
        <rect x="252" y="36" width="112" height="180"/>
        <path d="M252 60 H364 M252 84 H364 M252 108 H364 M252 132 H364 M252 156 H364 M252 180 H364"/>
      </g>
      <g class="plan-lost" data-plan-lost>
        <rect x="40" y="188" width="104" height="96"/>
        <path d="M40 188 L144 284 M144 188 L40 284"/>
      </g>
      <text class="plan-lbl" x="44" y="176">Room lost</text>
      <text class="plan-lbl plan-lbl-mute" x="258" y="248">Stairs</text>
    </svg>
    <figcaption>A conventional homelift needs a position of its own. In an existing house that usually means giving up part of a room.</figcaption>
  </figure>

  <figure class="plan plan-ours" data-plan="elevante">
    <svg class="plan-svg" viewBox="0 0 400 320" role="img"
         aria-label="Plan of the same floor with Elevante inside the existing staircase footprint, losing no floor space">
      <rect class="plan-outline" x="20" y="20" width="360" height="280"/>
      <line class="plan-wall" x1="240" y1="20" x2="240" y2="300"/>
      <g class="plan-stair">
        <rect x="252" y="36" width="112" height="180"/>
        <path d="M252 60 H364 M252 84 H364 M252 108 H364 M252 132 H364 M252 156 H364 M252 180 H364"/>
      </g>
      <rect class="plan-cabin" data-plan-cabin x="256" y="40" width="104" height="104" rx="2"/>
      <text class="plan-lbl" x="258" y="248">Stairs and lift</text>
    </svg>
    <figcaption>Elevante travels inside the staircase footprint. The plan of the house does not change.</figcaption>
  </figure>
</div>
"""
