"use client";

import { useSyncExternalStore } from "react";

/**
 * Whether a pinned stage should collapse into an ordinary flowing section.
 * A pinned stage is exactly one screen tall, and a phone screen cannot hold
 * one without clipping, so below the desktop breakpoint — and whenever the
 * visitor prefers reduced motion — the section flows and every item in it is
 * shown at once instead of being revealed by scrolling.
 *
 * The matching CSS unpins `[data-stage-flow]` under the same conditions.
 */
const QUERY = "(max-width: 63.99rem), (prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export function useStageFlow(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    // The server renders the pinned layout; the CSS keeps it correct until
    // this resolves on the client.
    () => false,
  );
}
