"use client";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { StoreIcon } from "./StoreIcon";

const categories = [{ id: "all", label: "Shop all" }, { id: "Hair", label: "Hair styling" }, { id: "Kitchen", label: "Kitchen" }, { id: "Wearable", label: "Smart eyewear" }, { id: "Audio", label: "Audio" }, { id: "Accessory", label: "Accessories" }];
export function CatalogView({ products, initialCategory = "all", initialQuery = "" }: { products: Product[]; initialCategory?: string; initialQuery?: string }) {
  const [category, setCategory] = useState(categories.some(c => c.id === initialCategory) ? initialCategory : "all");
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState("featured");
  const filtered = products.filter(p => (category === "all" || p.category === category) && `${p.name} ${p.series} ${p.category} ${p.line}`.toLowerCase().includes(query.trim().toLowerCase()));
  if (sort === "price-low") filtered.sort((a,b) => (a.price ?? Infinity) - (b.price ?? Infinity));
  if (sort === "price-high") filtered.sort((a,b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));
  if (sort === "name") filtered.sort((a,b) => a.name.localeCompare(b.name));
  return <>
    <div className="catalog-controls">
      <div className="collection-tabs" aria-label="Filter products">{categories.filter(c => c.id === "all" || products.some(p => p.category === c.id)).map(c => <button key={c.id} aria-pressed={category === c.id} onClick={() => setCategory(c.id)}>{c.label}</button>)}</div>
      <label className="sr-only" htmlFor="catalog-sort">Sort products</label><select id="catalog-sort" value={sort} onChange={e => setSort(e.target.value)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Name: A to Z</option></select>
    </div>
    <div className="catalog-toolbar"><p role="status">{filtered.length} {filtered.length === 1 ? "product" : "products"}{query && ` matching “${query}”`}</p><div className="catalog-search"><StoreIcon name="search" /><label htmlFor="catalog-query" className="sr-only">Search the collection</label><input id="catalog-query" type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Find your everyday essential" /></div></div>
    {filtered.length ? <div className="store-product-grid catalog-grid">{filtered.map((p,i) => <ProductCard key={p.handle} product={p} priority={i < 3} />)}</div> : <div className="empty-results"><h2>No products found</h2><p>Try another search or explore the full collection.</p><button className="shop-button" onClick={() => { setQuery(""); setCategory("all"); }}>Show all products <StoreIcon name="arrow" /></button></div>}
  </>;
}
