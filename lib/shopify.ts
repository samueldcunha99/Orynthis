import { cache } from "react";
import { products as editorial, type Product } from "./products";

/**
 * Shopify is the backend; this file is the only place that talks to it.
 *
 * The split is deliberate. Shopify owns the things that change without a
 * deploy — price, sale price, stock, variant id. The copy in lib/products.ts
 * owns the things a merchant admin has nowhere to put: the thesis, the body,
 * the feature write-ups, the hero headlines. Merging the two here means a
 * price change in the admin shows up on the site within the revalidate
 * window, and nobody has to touch the editorial writing to make that happen.
 *
 * With no token set, every merge is a no-op and the site renders exactly the
 * hardcoded figures it did before. That is the intended fallback, not a bug:
 * it keeps the storefront up when Shopify is down, and it means this file can
 * land before the credentials do.
 */

/* Read lazily, never at module scope. Cloudflare Workers do not populate env
   until a request is in flight, so a top-level process.env read there is
   undefined — which would fall through to the editorial prices and look
   entirely healthy while serving stale numbers. The one failure mode this
   whole file exists to prevent. */
const env = () => ({
  domain: process.env.SHOPIFY_STORE_DOMAIN ?? "orynthis.myshopify.com",
  version: process.env.SHOPIFY_API_VERSION ?? "2025-10",
  /* Either kind of Storefront token works, and they take different headers.
     Private is the better fit — every call here is server-side, and it is
     rate-limited per app rather than per IP, which matters because Workers
     share outbound IPs. Public is accepted so an existing token is not
     wasted. */
  privateToken: process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN,
  publicToken: process.env.SHOPIFY_STOREFRONT_TOKEN,
});

/** How long a price may be stale, in seconds. */
const TTL = 300;

const QUERY = `
  query Catalog {
    products(first: 100) {
      nodes {
        handle
        availableForSale
        variants(first: 1) {
          nodes {
            id
            availableForSale
            price { amount }
            compareAtPrice { amount }
          }
        }
      }
    }
  }
`;

type Node = {
  handle: string;
  availableForSale: boolean;
  variants: {
    nodes: {
      id: string;
      availableForSale: boolean;
      price: { amount: string } | null;
      compareAtPrice: { amount: string } | null;
    }[];
  };
};

/** What Shopify is allowed to override. Everything else stays editorial. */
export type Commerce = {
  price: number | null;
  compareAt: number | null;
  variantId: string | null;
  available: boolean;
};

/** Money arrives as a decimal string ("7499.00"). Anything unparseable is
    treated as absent rather than as zero — a free product is worse than a
    product that falls back to its editorial price. */
const money = (m: { amount: string } | null): number | null => {
  const n = m ? Number(m.amount) : NaN;
  return Number.isFinite(n) && n > 0 ? n : null;
};

/** Storefront ids are GIDs — gid://shopify/ProductVariant/123. Cart
    permalinks want the bare number off the end. */
const numericId = (gid: string): string | null =>
  /^\d+$/.test(gid.split("/").pop() ?? "") ? gid.split("/").pop()! : null;

async function fetchCommerce(): Promise<Map<string, Commerce>> {
  const out = new Map<string, Commerce>();
  const { domain, version, privateToken, publicToken } = env();
  if (!privateToken && !publicToken) return out;

  const res = await fetch(`https://${domain}/api/${version}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(privateToken
        ? { "Shopify-Storefront-Private-Token": privateToken }
        : { "X-Shopify-Storefront-Access-Token": publicToken! }),
    },
    body: JSON.stringify({ query: QUERY }),
    next: { revalidate: TTL, tags: ["catalog"] },
  });

  if (!res.ok) throw new Error(`Storefront API ${res.status}`);

  const json = (await res.json()) as {
    data?: { products?: { nodes: Node[] } };
    errors?: { message: string }[];
  };
  // A GraphQL error is a 200 with an errors array, so status alone is not
  // enough to know the response is usable.
  if (json.errors?.length) throw new Error(json.errors[0].message);

  for (const n of json.data?.products?.nodes ?? []) {
    const v = n.variants.nodes[0];
    if (!v) continue;
    out.set(n.handle, {
      price: money(v.price),
      compareAt: money(v.compareAtPrice),
      variantId: numericId(v.id),
      available: n.availableForSale && v.availableForSale,
    });
  }
  return out;
}

/**
 * The catalog as the site should render it. Cached per request, so a page
 * that reads it three times still costs one round trip.
 *
 * A Shopify outage must not take the storefront down with it, so a failed
 * fetch falls back to the editorial figures and says so in the log.
 */
export const getProducts = cache(async (): Promise<Product[]> => {
  let live = new Map<string, Commerce>();
  try {
    live = await fetchCommerce();
  } catch (err) {
    console.error("[shopify] falling back to editorial prices:", err);
  }

  // A product we expected to find and did not is worth saying out loud. This
  // is how the join silently did nothing the first time it ran: Shopify's
  // handles are the long keyword ones, ours are short, and nothing matched.
  const missing = editorial
    .filter((p) => p.shopifyHandle && live.size > 0 && !live.has(p.shopifyHandle))
    .map((p) => p.handle);
  if (missing.length) {
    console.warn(
      `[shopify] no live match for ${missing.join(", ")} — check shopifyHandle ` +
        `in lib/products.ts against the product's handle in the admin`,
    );
  }

  return editorial.map((p) => {
    const c = p.shopifyHandle ? live.get(p.shopifyHandle) : undefined;
    // No mapping, or no match: the product is not sold through Shopify, so
    // the editorial figures stand and stock is nobody's business.
    if (!c) return { ...p, available: true };
    return {
      ...p,
      // A live product with no price is not on sale yet; keep the editorial
      // figure rather than blanking the card.
      price: c.price ?? p.price,
      compareAt: c.compareAt,
      variantId: c.variantId ?? p.variantId,
      available: c.available,
    };
  });
});

/** Single product by handle, off the same cached fetch. */
export const getProduct = async (handle: string): Promise<Product | undefined> =>
  (await getProducts()).find((p) => p.handle === handle);
