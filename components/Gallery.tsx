import Image from "next/image";
import { dimsOf } from "@/lib/image-dims";
import { NoImage } from "./NoImage";

/**
 * A stack, not a carousel.
 *
 * The brand's photography is campaign work — infographics that explain the
 * attachments, the airflow, the before and after. That is content, and content
 * wants reading, so it is laid out down the column at full width rather than
 * hidden behind a rail of 80px thumbnails nobody can make out. The buy column
 * beside it is sticky, so the price and the button stay put while this scrolls.
 *
 * Each image renders at its own aspect ratio, taken from lib/image-dims.ts.
 * Forcing them all into one frame letterboxes the 2.4:1 campaign banners
 * inside bands of dead white.
 *
 * No client state, so no "use client" — the previous version needed it only
 * to track which thumbnail was selected.
 */
export function Gallery({ images, name }: { images: string[]; name: string }) {
  if (images.length === 0) {
    return (
      <div className="relative aspect-16/10 min-w-0 overflow-hidden bg-white">
        <NoImage />
      </div>
    );
  }

  return (
    // min-w-0 is load-bearing: this is a CSS grid column, and grid items
    // default to min-width:auto — without it the widest image sets the column
    // width and drags the page past the viewport.
    <div className="min-w-0 space-y-3">
      {images.map((src, i) => {
        const [w, h] = dimsOf(src);
        return (
          <Image
            key={src}
            src={src}
            /* The lead image names the product. The rest are marketing
               graphics whose wording is already on the page as real text —
               the thesis, the feature write-ups, the spec table — so
               announcing them again would just be noise in a screen reader. */
            alt={i === 0 ? `${name}, product photograph` : ""}
            width={w}
            height={h}
            priority={i === 0}
            sizes="(min-width:1024px) 52vw, 92vw"
            className="h-auto w-full bg-white"
          />
        );
      })}
    </div>
  );
}
