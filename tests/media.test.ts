import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import path from "node:path";
import { excluded, images, sequences, videos } from "@/content/media";

const PUBLIC = path.resolve(__dirname, "..", "public");
/** Image URLs carry a cache-busting query; the file lives at the path before it. */
const file = (src: string) => path.join(PUBLIC, src.split("?")[0]);
const PROVENANCE = ["product", "ai", "stock", "placeholder"];

describe("media manifest", () => {
  it("has a file, dimensions, alt text and provenance for every image", () => {
    for (const asset of Object.values(images)) {
      expect(existsSync(file(asset.src)), `${asset.id} file`).toBe(true);
      expect(asset.width, `${asset.id} width`).toBeGreaterThan(0);
      expect(asset.height, `${asset.id} height`).toBeGreaterThan(0);
      expect(asset.alt.trim().length, `${asset.id} alt`).toBeGreaterThan(10);
      expect(PROVENANCE, `${asset.id} provenance`).toContain(asset.provenance);
      expect(asset.blurDataURL, `${asset.id} blur`).toMatch(/^data:image\/webp;base64,/);
    }
  });

  it("has mp4, webm and a poster for every video", () => {
    for (const v of Object.values(videos)) {
      expect(existsSync(path.join(PUBLIC, v.mp4)), `${v.id} mp4`).toBe(true);
      expect(existsSync(path.join(PUBLIC, v.webm)), `${v.id} webm`).toBe(true);
      expect(v.poster.width).toBeGreaterThan(0);
      expect(v.poster.alt.trim().length).toBeGreaterThan(10);
      expect(PROVENANCE).toContain(v.provenance);
    }
  });

  it("has every frame of every sequence at both sizes, plus a poster", () => {
    for (const seq of Object.values(sequences)) {
      expect(seq.frames, `${seq.id} frames`).toBeGreaterThan(24);
      for (const variant of [seq.desktop, seq.mobile]) {
        expect(variant.width).toBeGreaterThan(0);
        for (let i = 0; i < seq.frames; i++) {
          const file = path.join(PUBLIC, variant.dir, `${String(i).padStart(seq.pad, "0")}.${seq.ext}`);
          expect(existsSync(file), file).toBe(true);
        }
      }
      expect(seq.poster.width).toBe(seq.desktop.width);
      expect(seq.alt.trim().length).toBeGreaterThan(10);
    }
  });

  it("never claims an asset is product photography until one exists", () => {
    // Guard against an accidental flip while all imagery is still conceptual.
    for (const asset of [...Object.values(images), ...Object.values(videos)]) {
      expect(asset.provenance, asset.id).not.toBe("product");
    }
  });

  it("records why excluded sources were left out", () => {
    for (const [file, reason] of Object.entries(excluded)) {
      expect(reason.length, file).toBeGreaterThan(5);
      expect(existsSync(path.join(PUBLIC, "media", "img", file))).toBe(false);
    }
  });
});
