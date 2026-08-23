import type { MetadataRoute } from "next";
import { SITE, products } from "@/lib/products";

/* Every route the site actually has. Product pages are generated from the
   same array the pages themselves render, so adding a product adds its URL. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE, priority: 1 },
    { url: `${SITE}/catalog`, priority: 0.9 },
    ...products.map((p) => ({
      url: `${SITE}/products/${p.handle}`,
      priority: 0.8,
    })),
    { url: `${SITE}/track`, priority: 0.4 },
    { url: `${SITE}/contact`, priority: 0.4 },
  ];
}
