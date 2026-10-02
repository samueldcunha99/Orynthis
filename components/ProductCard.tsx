"use client";
import Image from "next/image";
import Link from "next/link";
import { discount, inr, isBuyable, type Product } from "@/lib/products";
import { NoImage } from "./NoImage";
import { AddButton } from "./Cart";
import { StoreIcon } from "./StoreIcon";

const covers: Record<string, string> = {
  "air-ultra-pro": "/images/air-ultra-pro-package.jpeg",
  "air-vision-ai": "/brand/hero-air-vision.webp",
  "silkcomb-cordless": "/images/silkcomb-cordless-01.webp",
};
const categoryLabels: Record<string, string> = { Hair: "Hair styling", Wearable: "Smart eyewear", Audio: "Everyday audio", Accessory: "Accessories" };
export function ProductCard({ product: p, priority = false }: { product: Product; priority?: boolean }) {
  const off = discount(p);
  return <article className="product-card">
    <Link href={`/products/${p.handle}`} className="product-image">
      {p.images[0] ? <Image src={covers[p.handle] ?? p.images[0]} alt={p.name} fill priority={priority} sizes="(min-width:1024px) 25vw, (min-width:640px) 45vw, 90vw" className="product-photo" /> : <NoImage />}
      {off > 0 && <span className="product-badge">Save {off}%</span>}
      <span className="product-view"><StoreIcon name="arrow" /></span>
    </Link>
    <div className="product-info">
      <div className="product-meta"><span>{categoryLabels[p.category] ?? p.category}</span>{p.reviews && <span className="product-rating"><span aria-hidden="true">★</span> {p.reviews.stars.toFixed(1)} <span className="rating-count">({p.reviews.count})</span><span className="sr-only"> out of 5 stars</span></span>}</div>
      <h3><Link href={`/products/${p.handle}`}>{p.name}</Link></h3>
      <p className="product-description">{p.line}</p>
      <div className="product-price">{p.price === null ? <span>Price on request</span> : <><strong>{inr(p.price)}</strong>{p.compareAt && p.compareAt > p.price && <del>{inr(p.compareAt)}</del>}</>}</div>
      {isBuyable(p) ? <AddButton handle={p.handle} className="product-add" label="Add to bag  +" /> : <Link href={p.available === false ? `/products/${p.handle}` : "/contact"} className="product-add">{p.available === false ? "Currently sold out" : "Enquire about this product"}<StoreIcon name="arrow" /></Link>}
    </div>
  </article>;
}
