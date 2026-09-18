import Link from "next/link";
import type { ComponentProps } from "react";

/**
 * Every internal link on the site. On a fully static build the router's
 * prefetch payloads are not served under the names it asks for, so the
 * prefetch is turned off there and navigation falls back to a normal page
 * load. On a Node host the default prefetch stays.
 */
const PREFETCH =
  process.env.NEXT_PUBLIC_STATIC_EXPORT === "1" ? false : undefined;

export function AppLink(props: ComponentProps<typeof Link>) {
  return <Link prefetch={PREFETCH} {...props} />;
}
