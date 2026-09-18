import Image from "next/image";
import type { MediaAsset } from "@/content/types";
import { withBase } from "@/lib/basePath";
import { cn } from "@/lib/cn";

interface MediaFrameProps {
  asset: MediaAsset;
  sizes: string;
  priority?: boolean;
  /** Ground behind the picture when it does not fill the frame. */
  tone?: "white" | "warm-white" | "stone";
  className?: string;
  imgClassName?: string;
}

/**
 * A picture in a frame of fixed height. The image is centred and shown in
 * full: never cropped, and never drawn larger than its own pixels, so a
 * small source simply sits in more space. Because every frame in a row is
 * the same height, mixed sources still line up.
 *
 * The parent sets the height (for example `h-[24rem]`); the frame takes its
 * width from the picture inside it.
 */
export function MediaFrame({
  asset,
  sizes,
  priority,
  tone = "white",
  className,
  imgClassName,
}: MediaFrameProps) {
  return (
    <div
      className={cn(
        "flex h-full items-center justify-center overflow-hidden",
        tone === "white" ? "bg-white" : tone === "stone" ? "bg-stone" : "bg-warm-white",
        className,
      )}
    >
      <Image
        src={withBase(asset.src)}
        alt={asset.alt}
        width={asset.width}
        height={asset.height}
        sizes={sizes}
        priority={priority}
        placeholder={asset.blurDataURL ? "blur" : "empty"}
        blurDataURL={asset.blurDataURL}
        className={cn(
          "h-auto max-h-full w-auto max-w-full object-contain",
          imgClassName,
        )}
      />
    </div>
  );
}
