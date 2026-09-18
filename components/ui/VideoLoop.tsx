"use client";

import { useEffect, useRef, useState } from "react";
import type { VideoAsset } from "@/content/types";
import { withBase } from "@/lib/basePath";
import { cn } from "@/lib/cn";

interface VideoLoopProps {
  video: VideoAsset;
  className?: string;
  /** Attach sources at once (the hero); everything else waits until it is near. */
  eager?: boolean;
}

/**
 * A silent, looping film that costs nothing until it is needed. The poster
 * renders first; sources are attached only when the element comes within a
 * viewport of the screen, playback pauses when it leaves, and a visitor who
 * prefers reduced motion only ever sees the poster.
 */
export function VideoLoop({ video, className, eager = false }: VideoLoopProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setArmed(true);
          if (el.readyState >= 2) void el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: "100% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [eager]);

  return (
    <video
      ref={ref}
      className={cn("h-full w-full object-cover", className)}
      poster={withBase(video.poster.src)}
      width={video.poster.width}
      height={video.poster.height}
      muted
      loop
      playsInline
      autoPlay={armed}
      preload={eager ? "auto" : "none"}
      aria-label={video.poster.alt}
      onLoadedData={(e) => void e.currentTarget.play().catch(() => {})}
    >
      {(eager || armed) && (
        <>
          <source src={withBase(video.webm)} type="video/webm" />
          <source src={withBase(video.mp4)} type="video/mp4" />
        </>
      )}
    </video>
  );
}
