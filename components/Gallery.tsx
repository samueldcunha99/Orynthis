"use client";

import Image from "next/image";
import { useState } from "react";
import { NoImage } from "./NoImage";

export function Gallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-16/10 overflow-hidden bg-white">
        {images.length === 0 ? (
          <NoImage />
        ) : (
          <Image
            src={images[active]}
            alt={`${name}, view ${active + 1} of ${images.length}`}
            fill
            priority
            sizes="(min-width:1024px) 52vw, 92vw"
            className="object-contain"
          />
        )}
      </div>

      {/* A single thumbnail is not a chooser. */}
      <div
        hidden={images.length < 2}
        className="mt-3 flex gap-3 overflow-x-auto pb-1 no-bar"
      >
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setActive(i)}
            aria-label={`View ${i + 1}`}
            aria-current={i === active}
            className={`relative h-20 w-20 shrink-0 overflow-hidden bg-white transition-opacity ${
              i === active
                ? "outline outline-2 outline-offset-[-2px] outline-ink"
                : "opacity-55 hover:opacity-100"
            }`}
          >
            <Image src={src} alt="" fill sizes="80px" className="object-contain" />
          </button>
        ))}
      </div>
    </div>
  );
}
