import type { NextConfig } from "next";

/**
 * `NEXT_PUBLIC_BASE_PATH` lets the site live under a sub-path, which is how
 * GitHub Pages serves a project site. `STATIC_EXPORT` switches on the fully
 * static build used for that host; a Node host needs neither.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const isStatic = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  // A static host resolves `/design/` to `design/index.html`; the trailing
  // slash keeps every route unambiguous there.
  ...(isStatic ? { output: "export" as const, trailingSlash: true } : {}),
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  images: {
    formats: ["image/avif", "image/webp"],
    // Media URLs carry a content-hash query (`?v=…`) so re-cropped files never
    // come back from a stale cache; allow it for everything under /media.
    localPatterns: [{ pathname: "/media/**" }],
    // A static host has no image optimiser. The pipeline already writes webp
    // at the size each picture is shown, so nothing is oversized.
    unoptimized: isStatic,
  },
  poweredByHeader: false,
  agentRules: false,
};

export default nextConfig;
