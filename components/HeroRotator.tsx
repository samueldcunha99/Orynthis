"use client";

import Image from "next/image";
import Link from "next/link";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { byHandle, discount, heroSlides, inr } from "@/lib/products";
import { useProduct } from "./Cart";

// Dwell per slide. The progress marker reads this too (--dwell), so changing
// it here moves the bar and the slide together.
const DWELL = 4000;

export function HeroRotator() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [still, setStill] = useState(false); // prefers-reduced-motion
  const region = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  // Set while WE are scrolling the rail, so the scrollend it fires is not
  // mistaken for the visitor sliding it and bounced back into setI.
  const selfScroll = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setStill(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Advance on its own, but never while someone is reading or tabbing through
  // it, and never when the visitor has asked for less motion.
  useEffect(() => {
    if (paused || still) return;
    const t = setTimeout(() => setI((n) => (n + 1) % heroSlides.length), DWELL);
    return () => clearTimeout(t);
  }, [i, paused, still]);

  // Whichever product is showing keeps its thumbnail on screen, however the
  // slide was chosen — tap, auto-advance, or a slide of the rail itself.
  useEffect(() => {
    const r = rail.current;
    const el = r?.children[i] as HTMLElement | undefined;
    if (!r || !el) return;
    const max = r.scrollWidth - r.clientWidth;
    const left = Math.min(
      max,
      Math.max(0, el.offsetLeft - (r.clientWidth - el.offsetWidth) / 2),
    );
    if (Math.abs(left - r.scrollLeft) < 2) return; // nothing to move
    selfScroll.current = true;
    r.scrollTo({ left, behavior: still ? "auto" : "smooth" });
  }, [i, still]);

  // Sliding the rail picks the product under the middle of it. Read on
  // scrollend rather than on scroll, so the hero swaps once the rail settles
  // instead of flickering through everything it passed.
  const onSettle = (r: HTMLDivElement) => {
    if (selfScroll.current) {
      selfScroll.current = false;
      return;
    }
    const max = r.scrollWidth - r.clientWidth;
    if (max <= 0) return;
    // The first and last thumbnail can never reach the middle, so the ends of
    // the rail are read as the ends of the range.
    if (r.scrollLeft <= 1) return setI(0);
    if (r.scrollLeft >= max - 1) return setI(heroSlides.length - 1);

    const mid = r.scrollLeft + r.clientWidth / 2;
    const kids = [...r.children] as HTMLElement[];
    const off = (el: HTMLElement) =>
      Math.abs(el.offsetLeft + el.offsetWidth / 2 - mid);
    setI(kids.reduce((best, el, n) => (off(el) < off(kids[best]) ? n : best), 0));
  };

  const slide = heroSlides[i];
  // Editorial copy is local; price and stock come from Shopify through the
  // cart provider. byHandle is the fallback for the first paint and for a
  // product Shopify has not answered for.
  const product = useProduct(slide.handle) ?? byHandle(slide.handle)!;
  const off = discount(product);
  const running = !paused && !still;

  return (
    <section
      className="relative overflow-hidden bg-paper"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false);
      }}
    >
      <div
        ref={region}
        aria-live="polite"
        aria-atomic="false"
        className="shell relative grid gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-28"
      >
        {/* Copy. Keyed on the slide so each one fades in rather than snapping. */}
        <div key={slide.handle} className="fade-in">
          <p className="t-label text-graphite">
            Orynthis · {product.series}
          </p>

          <h1 className="t-display mt-6 text-[clamp(2.75rem,8.4vw,7rem)]">
            {slide.headline[0]}
            <br />
            {slide.headline[1]}
          </h1>

          <p className="mt-7 max-w-[46ch] text-lg leading-relaxed text-graphite">
            {slide.copy}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link href={`/products/${product.handle}`} className="btn btn-accent">
              <span>
                {product.name}
                {product.price !== null && ` · ${inr(product.price)}`}
              </span>
            </Link>
            <Link
              href={product.category === "Hair" ? "/#technology" : "/catalog"}
              className="btn btn-line text-ink"
            >
              <span>
                {product.category === "Hair"
                  ? "See how it works"
                  : "Browse the range"}
              </span>
            </Link>
          </div>

          <p className="t-label mt-5 text-graphite">
            {product.compareAt
              ? `Was ${inr(product.compareAt)} · save ${off}%`
              : "Free shipping · Pan India"}
          </p>
        </div>

        {/* All slides stay mounted and crossfade, so the panel never collapses
            between images. Every asset is pre-cropped to the same ratio. */}
        <figure className="relative mx-auto w-full max-w-[560px]">
          <div className="relative aspect-[87/61] overflow-hidden bg-white ring-1 ring-hairline">
            {heroSlides.map((s, n) => (
              <Image
                key={s.handle}
                src={s.image}
                alt={
                  n === i
                    ? `${byHandle(s.handle)!.name}, ${byHandle(s.handle)!.series}`
                    : ""
                }
                aria-hidden={n !== i}
                fill
                priority={n === 0}
                sizes="(min-width:1024px) 560px, 92vw"
                className={`object-contain transition-opacity duration-700 ${
                  n === i ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
          <figcaption className="t-label mt-3 flex flex-col gap-1 text-graphite sm:flex-row sm:justify-between">
            <span>
              {product.name} · {product.series}
            </span>
            <span>{product.category}</span>
          </figcaption>
        </figure>
      </div>

      {/* Switcher doubles as a preview of the whole range: every product gets a
          thumbnail, and the rail slides on touch because seven of them will
          not fit a phone. Snapping is CSS; only the read-back is JS. */}
      <div className="shell relative">
        <div
          ref={rail}
          role="tablist"
          aria-label="Featured product"
          onScrollEnd={(e) => onSettle(e.currentTarget)}
          className="rule-t no-bar flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
        >
          {heroSlides.map((s, n) => {
            const p = byHandle(s.handle)!;
            const active = n === i;
            return (
              <button
                key={s.handle}
                role="tab"
                aria-selected={active}
                onClick={() => setI(n)}
                /* Widths are fractions, not a hardcoded column count. This read
                   lg:w-[calc(100%/7)] until the range changed size, and a
                   product being removed left a seventh of the rail empty.
                   flex-1 divides by however many slides there are. */
                className="group relative w-1/3 shrink-0 snap-center border-l border-hairline px-3 py-5 text-left first:border-l-0 sm:w-1/5 sm:px-4 lg:w-auto lg:flex-1 lg:shrink"
              >
                <span
                  className={`relative block aspect-87/61 w-full overflow-hidden bg-white ring-1 transition-all duration-500 ${
                    active
                      ? "ring-accent"
                      : "opacity-55 ring-hairline group-hover:opacity-100"
                  }`}
                >
                  <Image
                    src={s.thumb ?? s.image}
                    alt=""
                    fill
                    sizes="(min-width:1024px) 190px, 33vw"
                    className="object-contain"
                  />
                </span>

                <span
                  className={`t-label mt-3 block transition-colors ${
                    active ? "text-accent-text" : "text-graphite group-hover:text-ink"
                  }`}
                >
                  {p.category}
                </span>
                <span
                  className={`t-display-tight mt-1.5 block text-sm transition-colors sm:text-base ${
                    active ? "text-ink" : "text-graphite group-hover:text-ink"
                  }`}
                >
                  {p.name}
                </span>

                {/* Progress doubles as the "this one is showing" marker. */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px overflow-hidden"
                >
                  {active && (
                    <span
                      key={`${i}-${running}`}
                      style={{ "--dwell": `${DWELL}ms` } as CSSProperties}
                      className={`block h-px origin-left bg-accent ${
                        running ? "progress" : "scale-x-100"
                      }`}
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* Specs belong to whichever product is on screen. */}
        <dl
          key={slide.handle}
          className="fade-in rule-t grid grid-cols-2 lg:grid-cols-4"
        >
          {slide.stats.map((r, n) => (
            <div
              key={r.k}
              className={`border-hairline py-7 lg:py-8 ${
                n % 2 === 1 ? "border-l pl-6" : ""
              } ${n === 2 ? "lg:border-l lg:pl-6" : ""} ${
                n < 2 ? "border-b lg:border-b-0" : ""
              }`}
            >
              <dd className="t-data text-[2rem] leading-none">
                {r.v}
                <span className="ml-1 text-base text-graphite">{r.u}</span>
              </dd>
              <dt className="t-label mt-2.5 text-graphite">{r.k}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
