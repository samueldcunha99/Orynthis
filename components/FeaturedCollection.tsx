"use client";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { ProductCard } from "./ProductCard";
const filters = [{ id: "all", label: "Our favourites" }, { id: "Hair", label: "Hair styling" }, { id: "Kitchen", label: "Kitchen" }, { id: "Wearable", label: "Smart eyewear" }, { id: "Audio", label: "Audio" }, { id: "Accessory", label: "Accessories" }];
export function FeaturedCollection({ products }: { products: Product[] }) {
  const [active, setActive] = useState("all");
  const shown = active === "all" ? products.slice(0, 4) : products.filter(p => p.category === active);
  return <>
    <div className="collection-tabs" aria-label="Filter featured products">{filters.filter(f => f.id === "all" || products.some(p => p.category === f.id)).map(f => <button key={f.id} aria-pressed={active === f.id} onClick={() => setActive(f.id)}>{f.label}</button>)}</div>
    <div className="store-product-grid" aria-live="polite">{shown.map(p => <ProductCard key={p.handle} product={p} />)}</div>
  </>;
}
