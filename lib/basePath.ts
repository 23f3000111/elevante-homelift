/**
 * The sub-path the site is served from, empty on a root domain. A GitHub
 * Pages project site is served from `/<repo>/`.
 *
 * `next/link` applies this on its own. `next/image` applies it only when the
 * optimiser is in play; the static export turns the optimiser off, so image
 * sources and every raw URL (video sources, the frames of a scroll sequence)
 * are prefixed here instead. `BASE_PATH` is only ever set for that static
 * build, so on a Node host both of these are the identity.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBase(path: string): string {
  if (!BASE_PATH || !path.startsWith("/")) return path;
  return `${BASE_PATH}${path}`;
}
