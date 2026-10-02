import type { Metadata } from "next";
import { CatalogView } from "@/components/CatalogView";
import { getProducts } from "@/lib/shopify";
export const metadata: Metadata = {
  title: "Shop the collection",
  description: "Discover Orynthis hair stylers, smart eyewear, speakers and accessories. Thoughtfully designed essentials for your everyday.",
};
export default async function Catalog({ searchParams }: { searchParams: Promise<{ category?: string | string[]; q?: string | string[] }> }) {
  const [products, params] = await Promise.all([getProducts(), searchParams]);
  const category = typeof params.category === "string" ? params.category : "all";
  const query = typeof params.q === "string" ? params.q : "";
  return <div className="shell">
    <div className="catalog-intro"><p className="eyebrow">THE ORYNTHIS COLLECTION</p><h1>Everyday essentials.<br /><em>Extraordinary by design.</em></h1><p>Better hair days. Your favourite soundtrack. A fresh perspective. Find the little upgrade that feels like you.</p></div>
    <CatalogView key={`${category}:${query}`} products={products} initialCategory={category} initialQuery={query} />
  </div>;
}
