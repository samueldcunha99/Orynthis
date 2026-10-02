import type { NextConfig } from "next";

/* Every image ships from /public now, so no remote hosts to allow. */
const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      /* www and the apex are both attached to the Worker, so without this
         they serve identical content on two hostnames — duplicate content,
         and split ranking signals between them. The apex is canonical
         (SITE in lib/products.ts, and what the sitemap emits), so www folds
         into it permanently. */
      /* Two rules, not one. `/:path*` also matches the empty path, and on
         the root the placeholder is left unsubstituted — www.orynthis.com
         then redirects to the literal /:path*, which 404s. `/:path+`
         requires at least one segment, so the root gets its own rule. */
      {
        source: "/",
        has: [{ type: "host", value: "www.orynthis.com" }],
        destination: "https://orynthis.com/",
        permanent: true,
      },
      {
        source: "/:path+",
        has: [{ type: "host", value: "www.orynthis.com" }],
        destination: "https://orynthis.com/:path+",
        permanent: true,
      },
      /* EasyCook was discontinued and replaced by a different product. Its
         page was live and in the sitemap, so the URL goes to the range
         rather than 404ing anyone who already has the link. */
      {
        source: "/products/easycook-2000w",
        destination: "/catalog",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
