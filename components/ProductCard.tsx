"use client";

import Image from "next/image";
import Link from "next/link";
import { discount, inr, isBuyable, stars, type Product } from "@/lib/products";
import { NoImage } from "./NoImage";
import { AddButton } from "./Cart";

/**
 * Uniform aspect and a fixed row order, so cards line up no matter how long
 * the name runs. The category label is the structural device: products are a
 * set, not a sequence, so they get classified rather than numbered.
 */
export function ProductCard({
  product: p,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const off = discount(p);
  const buyable = isBuyable(p);

  return (
    <article className="group flex flex-col">
      <Link
        href={`/products/${p.handle}`}
        className="relative block aspect-16/10 overflow-hidden bg-white"
      >
        {p.images[0] ? (
          <Image
            src={p.images[0]}
            alt={p.name}
            fill
            priority={priority}
            sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 90vw"
            className="object-contain transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
        ) : (
          <NoImage />
        )}

        {/* The aperture contracts as you approach the product. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        >
          <span className="aspect-square w-[78%] rounded-full border border-ink/25 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[0.72]" />
        </span>

        <span className="t-label absolute top-3 left-3 bg-paper/90 px-2 py-1 backdrop-blur-sm">
          {p.category}
        </span>

        {off > 0 && (
          <span className="t-label absolute top-3 right-3 bg-accent px-2 py-1 text-ink">
            −{off}%
          </span>
        )}
      </Link>

      <div className="rule-t mt-4 flex flex-1 flex-col pt-4">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="t-display-tight text-lg">{p.name}</h3>
          <span className="t-label shrink-0 text-graphite">{p.series}</span>
        </div>

        <p className="mt-1.5 text-sm leading-snug text-graphite">{p.line}</p>

        {/* Ratings appear only where there are ratings. */}
        {p.reviews && (
          <p className="t-label mt-2.5 text-graphite">
            <span className="text-ink">{stars(p.reviews.stars)}</span>{" "}
            {p.reviews.stars} · {p.reviews.count} reviews
          </p>
        )}

        <div className="mt-auto flex items-baseline gap-2.5 pt-4">
          {p.price === null ? (
            <span className="t-data text-lg text-graphite">Price on request</span>
          ) : (
            <>
              <span className="t-data text-lg">{inr(p.price)}</span>
              {p.compareAt && (
                <span className="t-data text-sm text-graphite line-through">
                  {inr(p.compareAt)}
                </span>
              )}
            </>
          )}
        </div>

        {/* Not listed on the store yet, so there is nothing honest to add to a
            cart. Point at support instead of shipping a button that 404s. */}
        {buyable ? (
          <AddButton
            handle={p.handle}
            className="btn btn-line mt-3 w-full text-ink"
          />
        ) : (
          <Link href="/contact" className="btn btn-line mt-3 w-full text-ink">
            <span>Ask about this</span>
          </Link>
        )}
      </div>
    </article>
  );
}
