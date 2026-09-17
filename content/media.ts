import generated from "./media.generated.json";
import type { MediaAsset, Provenance, VideoAsset } from "./types";

/**
 * The media manifest. `media.generated.json` is produced by `npm run media`
 * (sizes, paths, blur placeholders); the meaning of each asset is written here.
 *
 * Provenance is the honest record of what each file is. Nothing here is a
 * photograph of the Elevante product. Replace an asset by dropping a new source
 * into `UI images/` or `UI video/`, updating `scripts/media.mjs`, and editing
 * the entry below. No component changes are needed.
 */

export type ImageId = keyof typeof generated.images;
export type VideoId = keyof typeof generated.videos;

interface Meta {
  alt: string;
  provenance: Provenance;
  note?: string;
}

const imageMeta: Record<ImageId, Meta> = {
  "stair-gold-hall": {
    alt: "Entrance hall of a contemporary house with a straight staircase in dark stone and brass, a seating area beneath a timber-clad wall.",
    provenance: "stock",
    note: "Reference interior. No lift shown.",
  },
  consultation: {
    alt: "Two homeowners at a table with drawings and material samples while an adviser points at a floor plan on a screen.",
    provenance: "ai",
    note: "Consultation scene, generated. Use for process, not product.",
  },
  "stair-spiral-above": {
    alt: "A curved staircase seen from above, its timber treads spiralling down to a hall with a single chair and a plant.",
    provenance: "stock",
    note: "Reference interior. Small source (399 px); keep under 500 px wide.",
  },
  "stair-floating-glass-lift": {
    alt: "Floating stone treads beside a glass lift enclosure in a white hall.",
    provenance: "stock",
    note: "Conventional lift beside a stair, not Elevante. Small source (396 px).",
  },
  "stair-curved-led": {
    alt: "A curved staircase with lit treads in a pale hall, an armchair and a small tree beside it.",
    provenance: "ai",
    note: "Rendered interior with a conventional lift door at left. Small source (547 px).",
  },
  "stair-dark-wood": {
    alt: "A curved staircase against dark timber panelling, with a bonsai and pendant lights.",
    provenance: "ai",
    note: "Rendered interior. Small source (387 px).",
  },
  "stair-oak-screen": {
    alt: "A timber staircase behind a screen of vertical oak slats, morning light across the floor.",
    provenance: "ai",
    note: "Rendered interior, generator tag cropped away. Small source (415 px).",
  },
  "lift-round-glass-hall": {
    alt: "A hall with walnut joinery and a round glass lift beside a timber staircase.",
    provenance: "stock",
    note: "Third-party conventional lift. Not Elevante.",
  },
  "lift-couple": {
    alt: "A couple in their hallway; one steps out of a small glass home lift while the other holds the door.",
    provenance: "ai",
    note: "Generated. Conventional round lift, not Elevante. Use with a visualisation caption.",
  },
  "lift-wheelchair": {
    alt: "A person in a wheelchair in a living room, facing a round glass home lift beside a curved staircase.",
    provenance: "ai",
    note: "Generated. Conventional lift, not Elevante. Use with a visualisation caption.",
  },
  "lift-family": {
    alt: "A family in a living room; an older woman stands in the open door of a small home lift.",
    provenance: "stock",
    note: "Third-party product photograph. Contains no rollator despite the source filename. Not used on the homepage.",
  },
  "lift-bronze-cabin": {
    alt: "The open door of a lift cabin finished in brushed bronze, with a marble floor.",
    provenance: "stock",
    note: "Hotel lift. Material reference only.",
  },
  "lift-deco-cabin": {
    alt: "A lift cabin with decorative brass panels and a patterned stone floor.",
    provenance: "stock",
    note: "Off-brand interior. Not used on the homepage.",
  },
  "lift-glass-shaft": {
    alt: "A glass lift shaft rising two storeys beside a timber staircase.",
    provenance: "stock",
    note: "Conventional shaft lift with visible machinery. Not used on the homepage.",
  },
  "survey-measuring": {
    alt: "A surveyor stretches a tape measure up a stud wall inside a house under renovation.",
    provenance: "stock",
    note: "Building site. Small source (450 px).",
  },
  "installation-collage": {
    alt: "Four views of tradespeople checking drawings inside houses under renovation.",
    provenance: "stock",
    note: "Collage; prefer the single crop `installation-drawing`.",
  },
  "installation-drawing": {
    alt: "A tradesperson marks up a plan drawing on a table in a period living room.",
    provenance: "stock",
    note: "Crop of the collage. Very small (277 px); keep under 300 px wide.",
  },
  "loft-wide": {
    alt: "A double-height apartment with a curved white staircase and a wall of windows.",
    provenance: "ai",
    note: "Off-brand interior. Not used on the homepage.",
  },
  "material-metal": {
    alt: "Brushed bronze panels, close up.",
    provenance: "stock",
    note: "Crop of the hotel lift. Material reference only.",
  },
  "material-oak": {
    alt: "Oak stair treads, close up.",
    provenance: "ai",
    note: "Crop of a video frame. Material reference only.",
  },
  "material-stone": {
    alt: "Pale veined stone wall, close up.",
    provenance: "ai",
    note: "Crop of a video frame. Material reference only.",
  },
};

const videoMeta: Record<VideoId, Meta> = {
  "video-cabin-moving": {
    alt: "A glass and timber cabin rises beside a curved staircase and passes through the floor above.",
    provenance: "ai",
    note: "Generated visualisation. Shows a cabin next to, not beneath, the stair. Replace with product video when available.",
  },
  "video-home-integration": {
    alt: "A cabin rises beside floating oak stairs in a living room.",
    provenance: "ai",
    note: "Generated visualisation. Replace with product video when available.",
  },
  "video-design-cabin": {
    alt: "Steel-framed glass lift doors open onto a timber cabin beside a stone wall.",
    provenance: "ai",
    note: "Generated visualisation. Materials reference only.",
  },
};

interface GeneratedImage {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
}

function buildImage(id: string, g: GeneratedImage, m: Meta): MediaAsset {
  return { id, src: g.src, width: g.width, height: g.height, blurDataURL: g.blurDataURL, ...m };
}

export const images = Object.fromEntries(
  (Object.keys(generated.images) as ImageId[]).map((id) => [
    id,
    buildImage(id, generated.images[id], imageMeta[id]),
  ]),
) as Record<ImageId, MediaAsset>;

export const videos = Object.fromEntries(
  (Object.keys(generated.videos) as VideoId[]).map((id) => {
    const g = generated.videos[id];
    const m = videoMeta[id];
    const v: VideoAsset = {
      id,
      mp4: g.mp4,
      webm: g.webm,
      // The poster is the first frame of the film, so it shares its description.
      poster: buildImage(`${id}-poster`, g.poster, { alt: m.alt, provenance: m.provenance }),
      provenance: m.provenance,
      note: m.note,
    };
    return [id, v];
  }),
) as Record<VideoId, VideoAsset>;

export const image = (id: ImageId): MediaAsset => images[id];
export const video = (id: VideoId): VideoAsset => videos[id];

/** Sources deliberately left out of the build, with the reason. */
export const excluded: Record<string, string> = generated.excluded;
