# -*- coding: utf-8 -*-
"""
All Elevante copy and data, in one place, shared by both directions.

Written against brief section 16 (tone of voice): clear, concise, factual,
calm, confident, respectful. No "discover", no "experience ultimate comfort",
no manufactured empathy, nothing patronising about age. Where the lift takes a
wheelchair, the copy says it takes a wheelchair.

No em-dashes or en-dashes anywhere. audit.py enforces it.
"""

BRAND = "Elevante"
DEALER_LABEL = "Find an installer"          # one label per intent, everywhere

# brief s.8: direct access to the principal areas, nav kept compact
NAV = [
    ("the-homelift.html", "The Homelift"),
    ("design.html", "Design"),
    ("in-your-home.html", "In your home"),
    ("installation.html", "Installation"),
    ("projects.html", "Projects"),
]

# brief s.9: the hero establishes the customer benefit, not the technology
HERO = {
    "h1": "Comfortably and safely remain living in your own home",
    "h1_short": "Every floor stays in use",
    "lead": "When the stairs become difficult, that does not have to close off "
            "part of your house. Elevante builds the lift into your existing staircase.",
    "meta": ["Netherlands, United Kingdom, Germany",
             "Installed in existing houses",
             "Fitted by authorised installers"],
}

# Facts from the brief, not invented achievements. Elevante has no
# installation history yet, so a "500 homes" counter would be a lie.
COUNTERS = [
    ("2", "", "People fit in the cabin, so someone can travel with you when that helps."),
    ("3", "", "Launch markets. The Netherlands first, then the United Kingdom and Germany."),
    ("7", "", "Steps from first enquiry to handover, set out in full on the installation page."),
    ("0", "m&#178;", "Extra floor space. The cabin uses the void the staircase already has."),
]

# brief s.9 "Product / System Introduction"
SYSTEM = {
    "eyebrow": "The system",
    "h2": "A staircase and a lift, designed as one",
    "body": [
        "Elevante is not a lift placed beside your stairs. The cabin travels "
        "vertically inside the staircase footprint, behind the flight, between "
        "the ground floor and the first floor.",
        "The staircase stays in place and stays in use. Automatic doors close "
        "the openings at both levels whenever the cabin is somewhere else.",
    ],
}

# brief s.9 "Integration into the Home": the spatial consequence
INTEGRATION = {
    "eyebrow": "In your home",
    "h2": "It does not take a room away from you",
    "body": [
        "In most existing houses there is no obvious position for a conventional "
        "homelift. Finding one usually means giving up part of a room, and that is "
        "the reason many people stop looking.",
        "Elevante works the other way round. The travel path is the volume the "
        "staircase already occupies, so the plan of the house does not change.",
    ],
}

# brief s.9 "Everyday Use": show what happens, avoid lifestyle claims
EVERYDAY = {
    "eyebrow": "Everyday use",
    "h2": "What using it actually looks like",
    "body": "Four situations the cabin is designed around. Each one is a question "
            "people ask at the survey.",
}

SAFETY = {
    "h2": "Safety is part of the mechanism, not an accessory",
    "body": [
        "The system detects movement on and around the staircase. If movement is "
        "detected the lift will not start, and if movement begins while the cabin "
        "is travelling it stops.",
        "The doors follow the same logic. The opening at the upper floor is closed "
        "whenever the cabin is not there, and the lower opening closes as the cabin rises.",
    ],
}

# brief s.18: the homepage introduces design, the Design page goes deeper
MATERIALS = [
    ("Oak",        "Brushed and oiled",  "#C89A62", "#E2C29A", "#A97B45", "material-wood-01"),
    ("Walnut",     "Natural matt",       "#7A5537", "#A07A56", "#5C3E28", "material-wood-02"),
    ("Chalk",      "Lime plaster",       "#D9D2C4", "#EDE8DC", "#B8AF9D", "material-detail-02"),
    ("Anthracite", "Honed stone",        "#4A4C4E", "#6E7174", "#303234", "material-detail-01"),
    ("Ribbed",     "Painted timber",     "#B9BEB6", "#D6D9D2", "#93998F", "material-detail-04"),
]

DESIGN_AREAS = [
    ("The cabin", "Wall panels, floor, ceiling and the finish of the controls are "
                  "specified together rather than picked from a list.", "interior-room-01"),
    ("The staircase", "Treads, risers and balustrade are matched to the cabin so the "
                      "two read as one piece of joinery.", "stair-detail-02"),
    ("The openings", "Door faces can follow the wall finish, so the closed position is "
                     "quiet rather than conspicuous.", "material-detail-01"),
    ("The controls", "Large, clearly marked, and positioned where they can be reached "
                     "from a seated position.", "material-detail-04"),
]

# brief s.19
STEPS = [
    ("First enquiry", "You tell us where you live and roughly what the house is like. "
                      "We put you in touch with the authorised installer for your area."),
    ("Survey of the house", "The installer visits, measures the staircase and the floors "
                            "above and below it, and establishes what the house allows."),
    ("Configuration and finishes", "Cabin, staircase, finishes and controls are chosen, "
                                   "with physical samples rather than photographs."),
    ("Quotation", "A fixed price for the lift, the work, and making good afterwards. You "
                  "know what the installation affects before you commit."),
    ("Preparation", "Any building work identified in the survey is carried out first, so "
                    "the installation itself is short."),
    ("Installation", "The lift and the staircase are installed together. The installer "
                     "tells you in advance how long the house is affected."),
    ("Commissioning and handover", "The system is tested, you are shown how to use it, "
                                   "and the service arrangement starts."),
]

PROJECTS = [
    ("A 1930s townhouse in Haarlem", "Three floors, a narrow hall, and a staircase that had to stay exactly where it was.", "interior-living-01"),
    ("A converted farmhouse in Gelderland", "An open stair with a double-height void above it, and existing oak that had to be matched.", "stair-spiral-01"),
    ("A canal apartment in Utrecht", "A listed facade, a protected stairwell, and a client who wanted the lift to disappear.", "interior-living-04"),
    ("A post-war semi in Eindhoven", "A standard stair in a standard plan, which is the case the system was designed around.", "interior-room-03"),
    ("A coastal house in Zeeland", "An exposed stairwell, salt air, and a brief that put daylight above everything else.", "stair-light-01"),
    ("A village house in Limburg", "Two short flights instead of one long one, and a landing that could not be lost.", "interior-room-01"),
]

FAQ = [
    ("Does the staircase still work normally?",
     "Yes. The stairs stay in place and anyone in the house can keep using them. The cabin "
     "travels inside the staircase footprint, so the two do not compete for the same floor area."),
    ("How much extra floor space does Elevante need?",
     "None in the usual sense. The travel path is the volume the staircase already occupies. "
     "That is the point of the system: in most existing houses there is no spare corner for a "
     "conventional homelift."),
    ("Can it take a wheelchair?",
     "Yes. The cabin accommodates a wheelchair, and it accommodates a rollator. There is also "
     "room for a second person, so travelling with assistance is normal use rather than an exception."),
    ("What happens if someone is on the stairs?",
     "The system detects movement on and around the staircase. The lift will not start while "
     "movement is detected, and it stops immediately if movement begins during travel."),
    ("Who installs it, and who do I call afterwards?",
     "Installation and service are handled by an authorised installer in your area. They carry "
     "out the survey, quote the work, install the lift, and look after it afterwards."),
]

INSTALL_FAQ = [
    ("How long is the house disrupted?",
     "The installer gives you the number of days at quotation stage, once the survey has "
     "established what preparation the house needs. Preparation is done before the lift arrives, "
     "so the installation itself is short."),
    ("Do I need building consent?",
     "That depends on the house and the country. Your installer raises it at the survey, because "
     "it is easier to establish before a configuration is chosen than afterwards."),
    ("What happens to the old staircase?",
     "It is replaced as part of the installation. The staircase and the lift are one system, so "
     "the stairs are built to work with the cabin travelling inside their footprint."),
    ("Who services it afterwards?",
     "The installer who fitted it. Service and maintenance are arranged locally, with the same "
     "people who know your house."),
]

SPECS = [
    ("Capacity", [("Cabin occupants", "Two"),
                  ("Mobility aids", "Rollator and wheelchair"),
                  ("Assistance", "Room for a second person")]),
    ("Movement", [("Travel path", "Inside the staircase footprint"),
                  ("Doors", "Automatic, both levels"),
                  ("Staircase", "Retained and in use")]),
    ("Safety",   [("Detection", "Movement on and around the stairs"),
                  ("On detection", "Will not start; stops if travelling"),
                  ("Openings", "Closed whenever the cabin is elsewhere")]),
]

DEALERS = [
    ("Van Doorn Wooninstallaties", "Haarlem", "nl", "Spaarnwouderstraat 118<br>2011 AH Haarlem", True),
    ("Berkhout Trap en Lift", "Utrecht", "nl", "Oudegracht 291<br>3511 PA Utrecht", True),
    ("De Wit Interieurbouw", "Eindhoven", "nl", "Kleine Berg 42<br>5611 JV Eindhoven", False),
    ("Noordhuis Techniek", "Groningen", "nl", "Herestraat 64<br>9711 LM Groningen", False),
    ("Hallam Lift Services", "Sheffield", "uk", "42 Devonshire Street<br>Sheffield S3 7SJ", True),
    ("Thameside Access", "Richmond", "uk", "18 Hill Rise<br>Richmond TW10 6UA", False),
    ("Aufzugbau Rheinland", "Cologne", "de", "Venloer Strasse 241<br>50823 Koln", True),
    ("Lift und Raum Hamburg", "Hamburg", "de", "Eppendorfer Weg 95<br>20259 Hamburg", False),
    ("Sudwest Hebetechnik", "Stuttgart", "de", "Marienstrasse 17<br>70178 Stuttgart", False),
]

# brief s.9: real customer experiences go in once installations exist.
# PLACEHOLDER, marked in the page source.
TESTIMONIAL = {
    "quote": "We wanted the house to stay the way it was. That is the part they got right.",
    "name": "Marijke Doornbos",
    "role": "Homeowner, Haarlem",
    "portrait": "people-portrait-01",
}

CTA = {
    "h2": "See an Elevante before you decide",
    "body": "Authorised installers handle the survey, the quotation and the installation. "
            "Several have a working Elevante you can travel in.",
    "image": "stair-arch-01",
}


# ---------------------------------------------------------------- IMAGE SETS
# Chosen so each page has its own faces and rooms rather than repeating one
# hero shot. Every page gets a cluster in the header and a full-bleed band,
# which is what stops the sheet reading as empty.

HERO_CLUSTERS = {
    "home":        [("stair-hero-01", "A staircase with the space beneath it in use"),
                    ("life-01", "A couple laughing together in their living room"),
                    ("room-04", "A curved staircase in a private house")],
    "homelift":    [("stair-modern-01", "A wooden staircase in a sunlit house"),
                    ("life-06", "Two homeowners at home together"),
                    ("room-01", "A bright landing with a handrail")],
    "inyourhome":  [("room-05", "A double-height hallway and staircase"),
                    ("life-03", "A couple on the sofa in their living room"),
                    ("room-13", "A landing looking down into the living space")],
    "design":      [("material-wood-01", "Oak, brushed and oiled"),
                    ("room-14", "A corner of a living room with plants"),
                    ("stair-detail-02", "A wooden staircase seen from above")],
    "installation":[("material-detail-03", "A joiner working timber for a staircase"),
                    ("people-couple-05", "An installer going through the survey with a homeowner"),
                    ("room-11", "A room prepared before installation")],
    "projects":    [("interior-living-01", "A living room in an existing house"),
                    ("life-07", "A couple dancing in their living room"),
                    ("stair-spiral-01", "A wooden staircase with plants")],
    "dealers":     [("stair-arch-01", "A hallway and staircase in a private home"),
                    ("life-10", "Two people greeting each other at home"),
                    ("room-06", "A living room with large windows")],
}

BANDS = {
    "home":        [("life-02", "A couple in their living room"), ("room-02", "A staircase above an open living space"),
                    ("life-05", "Music at home"), ("room-07", "A living room with plants and a teal sofa")],
    "homelift":    [("stair-detail-01", "Sunlight on a staircase"), ("room-03", "A warm interior with timber and plants"),
                    ("stair-light-01", "Daylight over a staircase"), ("life-08", "Reading together at home")],
    "inyourhome":  [("room-08", "A dining area in an existing house"), ("interior-living-03", "A living room with a blue sofa"),
                    ("room-12", "An armchair by a window"), ("life-04", "A couple at home on the sofa")],
    "design":      [("material-wood-02", "Walnut, natural matt"), ("material-detail-01", "Anthracite, honed stone"),
                    ("material-detail-02", "Chalk, lime plaster"), ("material-detail-04", "Ribbed painted timber")],
    "installation":[("stair-dark-01", "Panelling beside a staircase"), ("material-detail-03", "Timber being worked"),
                    ("room-16", "A room cleared for installation"), ("stair-arch-01", "A finished hallway")],
    "projects":    [("interior-living-04", "A dark slatted wall in a living room"), ("interior-room-03", "A modern living room"),
                    ("interior-kitchen-01", "A kitchen in an existing house"), ("room-10", "A dining area beside a kitchen")],
    "dealers":     [("room-02", "A staircase above an open living space"), ("life-09", "Two people at home with a laptop"),
                    ("interior-room-04", "A living room with a plant"), ("room-13", "A landing above the living space")],
}

MOSAIC = [
    ("life-01", "A couple laughing in their living room", "Everyday use"),
    ("room-05", "A double-height hallway and staircase", "The stairwell"),
    ("material-wood-01", "Oak, brushed and oiled", "Materials"),
    ("life-07", "A couple dancing at home", "Staying put"),
    ("stair-detail-02", "A wooden staircase from above", "The staircase"),
]

MARQUEE_IMAGES = [
    ("room-02", "A staircase above an open living space"),
    ("life-03", "A couple on the sofa"),
    ("stair-modern-01", "A wooden staircase in a sunlit house"),
    ("room-07", "A living room with plants"),
    ("life-06", "Two homeowners at home"),
    ("material-wood-01", "Oak, brushed and oiled"),
    ("room-13", "A landing above the living space"),
    ("life-05", "Music at home"),
    ("stair-detail-01", "Sunlight on a staircase"),
    ("room-08", "A dining area"),
]
