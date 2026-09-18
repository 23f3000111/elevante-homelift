import Image from "next/image";
import type { MediaAsset } from "@/content/types";
import { withBase } from "@/lib/basePath";
import { cn } from "@/lib/cn";

interface PictureProps {
  asset: MediaAsset;
  /** The `sizes` attribute; required so the browser never fetches more than it shows. */
  sizes: string;
  priority?: boolean;
  /**
   * Fill the parent (which must be positioned and sized). `contain` keeps the
   * whole picture visible inside the box; `cover` is for backgrounds only.
   */
  fill?: boolean;
  fit?: "cover" | "contain";
  className?: string;
  imgClassName?: string;
}

/**
 * The only way images reach the page. Takes a manifest asset, so alt text,
 * dimensions and blur placeholder always travel with the file. By default a
 * picture renders whole at its own proportions, as wide as its container and
 * never wider than its source; the pipeline never upscales, and neither does
 * this component.
 */
export function Picture({
  asset,
  sizes,
  priority,
  fill,
  fit = "cover",
  className,
  imgClassName,
}: PictureProps) {
  const common = {
    src: withBase(asset.src),
    sizes,
    priority,
    placeholder: asset.blurDataURL ? ("blur" as const) : ("empty" as const),
    blurDataURL: asset.blurDataURL,
  };
  if (fill) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image
          {...common}
          alt={asset.alt}
          fill
          className={cn(
            fit === "contain" ? "object-contain" : "object-cover",
            imgClassName,
          )}
        />
      </div>
    );
  }
  return (
    <div className={className} style={{ maxWidth: asset.width }}>
      <Image
        {...common}
        alt={asset.alt}
        width={asset.width}
        height={asset.height}
        className={cn("h-auto w-full", imgClassName)}
      />
    </div>
  );
}
