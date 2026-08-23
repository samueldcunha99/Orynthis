import type { MetadataRoute } from "next";
import { STORE, products } from "@/lib/products";

/* Every route the site actually has. Product pages are generated from the
   same array the pages themselves render, so adding a product adds its URL. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: STORE, priority: 1 },
    { url: `${STORE}/catalog`, priority: 0.9 },
    ...products.map((p) => ({
      url: `${STORE}/products/${p.handle}`,
      priority: 0.8,
    })),
    { url: `${STORE}/track`, priority: 0.4 },
    { url: `${STORE}/contact`, priority: 0.4 },
  ];
}
