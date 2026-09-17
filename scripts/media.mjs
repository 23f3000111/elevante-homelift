/**
 * Media pipeline. Reads the client-supplied sources in `UI images/` and
 * `UI video/`, writes optimised files to `public/media/` and a manifest to
 * `content/media.generated.json`. Hand-written meaning (alt text, provenance,
 * notes) lives in `content/media.ts`, keyed by the ids defined here.
 *
 * Images are never upscaled. Videos lose their audio track and a centred
 * crop removes the generator watermark. Run with `npm run media`.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(fileURLToPath(new URL(".", import.meta.url)), "..");
const IMG_SRC = path.join(ROOT, "UI images");
const VID_SRC = path.join(ROOT, "UI video");
const IMG_OUT = path.join(ROOT, "public", "media", "img");
const VID_OUT = path.join(ROOT, "public", "media", "video");
const MANIFEST = path.join(ROOT, "content", "media.generated.json");

/** id -> { file, crop? } ; crop is in source pixels. */
const IMAGES = {
  "stair-gold-hall": { file: "modern residential staircase vertical interior.webp" },
  consultation: { file: "architectural survey home interior.webp" },
  "stair-spiral-above": { file: "architectural staircase detail minimal interior.jpg" },
  "stair-floating-glass-lift": { file: "contemporary home staircase living room architecture.jpg" },
  "stair-curved-led": { file: "high end residential staircase interior.jpg" },
  "stair-dark-wood": {
    file: "luxury contemporary European home staircase interior architectural photography.jpg",
  },
  "stair-oak-screen": {
    file: "luxury staircase interior vertical architectural photography.jpg",
    crop: { left: 0, top: 0, width: 415, height: 415 }, // drops the generator tag
  },
  "lift-round-glass-hall": { file: "modern house staircase interior architectural photography.jpg" },
  "lift-couple": { file: "older couple modern home interior architecture.jpg" },
  "lift-wheelchair": { file: "older homeowner wheelchair modern home interior.jpg" },
  "lift-family": { file: "older person rollator modern home interior.webp" },
  "lift-bronze-cabin": { file: "luxury home elevator interior design.jpg" },
  "lift-deco-cabin": { file: "residential elevator cabin luxury interior.jpg" },
  "lift-glass-shaft": { file: "architectural staircase open plan luxury home.jpg" },
  "survey-measuring": { file: "architect measuring residential staircase.jpg" },
  "installation-collage": {
    file: "architectural installation interior renovation professional.jpg",
  },
  "installation-drawing": {
    file: "architectural installation interior renovation professional.jpg",
    crop: { left: 277, top: 0, width: 277, height: 277 },
  },
  "loft-wide": { file: "staircase architecture residential interior wide angle.jpg" },
  "material-metal": {
    file: "luxury home elevator interior design.jpg",
    crop: { left: 40, top: 220, width: 240, height: 320 },
  },
};

/** Sources that must not ship, with the reason. */
const EXCLUDED = {
  "luxury interior material detail wood stone metal.jpg":
    "third-party product advertisement carrying brand marks",
  "modern staircase architectural detail photography.jpg": "third-party watermark",
};

/** id -> filename prefix (the supplied names contain an ellipsis character). */
const VIDEOS = {
  "video-cabin-moving": "Homelift_moving_beneath",
  "video-home-integration": "Homelift_installed_beneath",
  "video-design-cabin": "Showcasing_residential_homelift",
};
const VIDEO_CROP = "1180:664"; // centred; removes the generator mark at bottom-right

/** Crops taken from video posters after they exist. */
const DERIVED = {
  "material-oak": { poster: "video-home-integration", crop: { left: 130, top: 300, width: 280, height: 220 } },
  "material-stone": { poster: "video-design-cabin", crop: { left: 860, top: 40, width: 300, height: 340 } },
};

const kb = (p) => Math.round(statSync(p).size / 1024);

async function blurDataURL(input) {
  const buf = await sharp(input).resize(20).webp({ quality: 40 }).toBuffer();
  return `data:image/webp;base64,${buf.toString("base64")}`;
}

async function writeImage(id, input, crop) {
  const out = path.join(IMG_OUT, `${id}.webp`);
  let pipeline = sharp(input).rotate();
  if (crop) pipeline = pipeline.extract(crop);
  const info = await pipeline.webp({ quality: 82, effort: 5 }).toFile(out);
  const blur = await blurDataURL(out);
  console.log(`img  ${id.padEnd(28)} ${String(info.width).padStart(4)}x${String(info.height).padEnd(5)} ${kb(out)} KB`);
  return { src: `/media/img/${id}.webp`, width: info.width, height: info.height, blurDataURL: blur };
}

function ffmpeg(args) {
  execFileSync("ffmpeg", ["-hide_banner", "-loglevel", "error", ...args], { stdio: "inherit" });
}

function findVideo(prefix) {
  const hit = readdirSync(VID_SRC).find((f) => f.startsWith(prefix));
  if (!hit) throw new Error(`No video starting with "${prefix}" in ${VID_SRC}`);
  return path.join(VID_SRC, hit);
}

async function writeVideo(id, prefix) {
  const input = findVideo(prefix);
  const mp4 = path.join(VID_OUT, `${id}.mp4`);
  const webm = path.join(VID_OUT, `${id}.webm`);
  const png = path.join(VID_OUT, `${id}-poster.png`);
  ffmpeg(["-y", "-i", input, "-vf", `crop=${VIDEO_CROP},format=yuv420p`, "-an", "-c:v", "libx264", "-crf", "24", "-preset", "slow", "-movflags", "+faststart", mp4]);
  ffmpeg(["-y", "-i", input, "-vf", `crop=${VIDEO_CROP}`, "-an", "-c:v", "libvpx-vp9", "-crf", "34", "-b:v", "0", "-row-mt", "1", "-deadline", "good", "-cpu-used", "2", webm]);
  ffmpeg(["-y", "-ss", "0.5", "-i", input, "-vf", `crop=${VIDEO_CROP}`, "-frames:v", "1", png]);
  const poster = await writeImage(`${id}-poster`, png);
  console.log(`vid  ${id.padEnd(28)} mp4 ${kb(mp4)} KB  webm ${kb(webm)} KB`);
  return { mp4: `/media/video/${id}.mp4`, webm: `/media/video/${id}.webm`, poster, posterPng: png };
}

async function main() {
  for (const dir of [IMG_OUT, VID_OUT]) {
    rmSync(dir, { recursive: true, force: true });
    mkdirSync(dir, { recursive: true });
  }
  const manifest = { generatedAt: new Date().toISOString(), images: {}, videos: {}, excluded: EXCLUDED };

  for (const [id, spec] of Object.entries(IMAGES)) {
    const input = path.join(IMG_SRC, spec.file);
    if (!existsSync(input)) throw new Error(`Missing source ${spec.file}`);
    if (EXCLUDED[spec.file]) throw new Error(`${spec.file} is excluded: ${EXCLUDED[spec.file]}`);
    manifest.images[id] = await writeImage(id, input, spec.crop);
  }

  const posters = {};
  for (const [id, prefix] of Object.entries(VIDEOS)) {
    const v = await writeVideo(id, prefix);
    posters[id] = v.posterPng;
    manifest.videos[id] = { mp4: v.mp4, webm: v.webm, poster: v.poster };
  }

  for (const [id, spec] of Object.entries(DERIVED)) {
    manifest.images[id] = await writeImage(id, posters[spec.poster], spec.crop);
  }
  for (const png of Object.values(posters)) rmSync(png);

  writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`\nWrote ${path.relative(ROOT, MANIFEST)} with ${Object.keys(manifest.images).length} images and ${Object.keys(manifest.videos).length} videos.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
