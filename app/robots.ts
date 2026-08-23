import type { MetadataRoute } from "next";
import { STORE } from "@/lib/products";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${STORE}/sitemap.xml`,
  };
}
