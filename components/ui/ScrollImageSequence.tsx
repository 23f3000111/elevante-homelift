"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import type { SequenceAsset } from "@/content/types";
import { cn } from "@/lib/cn";
import { useMotionEffect } from "@/lib/motion/useMotion";

export interface ScrollImageSequenceProps {
  sequence: SequenceAsset;
  /**
   * Element whose scroll range drives the frames. The parent usually pins the
   * same element over the same range, so picture and layout stay in step.
   */
  trigger: RefObject<HTMLElement | null>;
  /** ScrollTrigger positions; defaults suit a pinned stage. */
  start?: string;
  end?: string;
  /** Called with 0..1 on every scroll update, for labels and overlays. */
  onProgress?: (progress: number) => void;
  /** Where to keep the subject when the canvas crops the frame (0..1). */
  focus?: { x: number; y: number };
  /** Frame shown when motion is reduced or before frames arrive. */
  stillFrame?: number;
  className?: string;
}

const LOAD_MARGIN = "150% 0px";
const MAX_DPR = 1.5;

/** Coarse-to-fine order so a half-loaded sequence already plays smoothly. */
function loadOrder(count: number): number[] {
  const seen = new Set<number>();
  const order: number[] = [];
  for (const step of [16, 8, 4, 2, 1]) {
    for (let i = 0; i < count; i += step) {
      if (!seen.has(i)) {
        seen.add(i);
        order.push(i);
      }
    }
  }
  return order;
}

/**
 * A film the visitor drives with the scroll wheel. Frames render to a canvas
 * with cover fitting; they load coarse-to-fine once the section is near and
 * the nearest loaded frame is drawn until the exact one arrives. With
 * reduced motion, or before any frame loads, the poster stands in.
 */
export function ScrollImageSequence({
  sequence,
  trigger,
  start = "top top",
  end = "bottom bottom",
  onProgress,
  focus = { x: 0.5, y: 0.5 },
  stillFrame = 0,
  className,
}: ScrollImageSequenceProps) {
  const host = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frames = useRef<Array<HTMLImageElement | null>>([]);
  const target = useRef(stillFrame);
  const drawn = useRef(-1);
  const raf = useRef(0);
  const [ready, setReady] = useState(false);

  const variantFor = () => (window.innerWidth < 768 ? sequence.mobile : sequence.desktop);
  const url = (i: number) => `${variantFor().dir}/${String(i).padStart(sequence.pad, "0")}.${sequence.ext}`;

  const draw = () => {
    raf.current = 0;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    // Nearest loaded frame to the target, searching outward.
    let index = -1;
    for (let d = 0; d < sequence.frames && index < 0; d++) {
      if (frames.current[target.current - d]) index = target.current - d;
      else if (frames.current[target.current + d]) index = target.current + d;
    }
    if (index < 0 || index === drawn.current) return;
    const img = frames.current[index];
    if (!img) return;
    const { width: cw, height: ch } = canvas;
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    const x = (cw - w) * focus.x;
    const y = (ch - h) * focus.y;
    ctx.drawImage(img, x, y, w, h);
    drawn.current = index;
    if (!ready) setReady(true);
  };

  const requestDraw = () => {
    if (!raf.current) raf.current = requestAnimationFrame(draw);
  };

  // Size the canvas to its box, at a capped pixel ratio.
  useEffect(() => {
    const el = host.current;
    const canvas = canvasRef.current;
    if (!el || !canvas) return;
    const ro = new ResizeObserver(([entry]) => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const { width, height } = entry.contentRect;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      drawn.current = -1;
      requestDraw();
    });
    ro.observe(el);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load frames when the section comes within reach.
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let cancelled = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const order = loadOrder(sequence.frames);
        let cursor = 0;
        const next = () => {
          if (cancelled || cursor >= order.length) return;
          const i = order[cursor++];
          const img = new Image();
          img.decoding = "async";
          img.onload = () => {
            frames.current[i] = img;
            requestDraw();
            next();
          };
          img.onerror = next;
          img.src = url(i);
        };
        // A few parallel lanes; the browser queues the rest.
        for (let lane = 0; lane < 4; lane++) next();
      },
      { rootMargin: LOAD_MARGIN },
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sequence.id]);

  // Scroll drives the target frame. Under reduced motion this never runs and
  // the still frame remains.
  useMotionEffect(
    trigger,
    ({ ScrollTrigger, scope }) => {
      const apply = (p: number) => {
        target.current = Math.round(p * (sequence.frames - 1));
        onProgress?.(p);
        requestDraw();
      };
      const st = ScrollTrigger.create({ trigger: scope, start, end, onUpdate: (self) => apply(self.progress) });
      apply(st.progress);
      return () => st.kill();
    },
    [sequence.id, start, end],
  );

  return (
    <div
      ref={host}
      className={cn("overflow-hidden bg-stone", className ?? "relative")}
      role="img"
      aria-label={sequence.alt}
      data-sequence={sequence.id}
    >
      {/* Poster underneath: identical to frame 0, so the hand-over is invisible. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={sequence.poster.src}
        alt=""
        aria-hidden
        width={sequence.poster.width}
        height={sequence.poster.height}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: `${focus.x * 100}% ${focus.y * 100}%` }}
        loading="lazy"
        decoding="async"
      />
      <canvas
        ref={canvasRef}
        className={cn("absolute inset-0 h-full w-full transition-opacity duration-300", ready ? "opacity-100" : "opacity-0")}
        aria-hidden
      />
    </div>
  );
}
