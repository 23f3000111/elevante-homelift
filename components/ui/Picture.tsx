import Image from "next/image";
import type { MediaAsset } from "@/content/types";
import { cn } from "@/lib/cn";

interface PictureProps {
  asset: MediaAsset;
  /** The `sizes` attribute; required so the browser never fetches more than it shows. */
  sizes: string;
  priority?: boolean;
  /** Fill the parent (which must be positioned and sized) instead of using intrinsic size. */
  fill?: boolean;
  className?: string;
  imgClassName?: string;
}

/**
 * The only way images reach the page. Takes a manifest asset, so alt text,
 * dimensions and blur placeholder always travel with the file. Sources are
 * never upscaled by the pipeline; keep rendered widths at or below `asset.width`.
 */
export function Picture({ asset, sizes, priority, fill, className, imgClassName }: PictureProps) {
  const common = {
    src: asset.src,
    alt: asset.alt,
    sizes,
    priority,
    placeholder: asset.blurDataURL ? ("blur" as const) : ("empty" as const),
    blurDataURL: asset.blurDataURL,
    className: cn("object-cover", imgClassName),
  };
  if (fill) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image {...common} fill />
      </div>
    );
  }
  return (
    <div className={cn("overflow-hidden", className)}>
      <Image {...common} width={asset.width} height={asset.height} className={cn("h-auto w-full", imgClassName)} />
    </div>
  );
}
