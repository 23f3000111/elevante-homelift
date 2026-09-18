"use client";

import { Canvas } from "@react-three/fiber";
import type { ProgressStore } from "@/lib/scene/progress";
import { HouseScene } from "./HouseScene";

interface MechanismCanvasProps {
  progress: ProgressStore;
  quality: "full" | "lite";
  onReady?: () => void;
}

/**
 * The WebGL canvas for the house section. Loaded on demand (see
 * `MechanismScene`), renders only when the scroll position changes, and
 * keeps the device pixel ratio capped so phones are not asked to draw more
 * than they can.
 */
export function MechanismCanvas({ progress, quality, onReady }: MechanismCanvasProps) {
  return (
    <Canvas
      frameloop="demand"
      flat
      shadows={quality === "full" ? "soft" : false}
      dpr={quality === "full" ? [1, 1.5] : [1, 1.25]}
      camera={{ fov: 28, near: 0.5, far: 80, position: [0, 2.4, 16] }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power", stencil: false }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        onReady?.();
      }}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      aria-hidden
    >
      <HouseScene progress={progress} quality={quality} />
    </Canvas>
  );
}

export default MechanismCanvas;
