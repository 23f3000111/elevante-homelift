import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Media URLs carry a content-hash query (`?v=…`) so re-cropped files never
    // come back from a stale cache; allow it for everything under /media.
    localPatterns: [{ pathname: "/media/**" }],
  },
  poweredByHeader: false,
  agentRules: false,
};

export default nextConfig;
