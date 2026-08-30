/**
 * Compares the fallback prices in lib/products.ts against what Shopify
 * actually charges, and exits non-zero on any drift.
 *
 * The fallbacks only render when Shopify is unreachable, which is exactly
 * when nobody is watching — so a stale one is a wrong price shown at the
 * worst possible moment. This is also the check that would have caught the
 * 6-in-1 sitting at a price it had not been sold for in months.
 *
 *   node --env-file=.env.local scripts/price-drift.mjs
 */
import { products } from "../lib/products.ts";

const { SHOPIFY_STORE_DOMAIN: DOMAIN, SHOPIFY_API_VERSION: VERSION } = process.env;
const TOKEN =
  process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN || process.env.SHOPIFY_STOREFRONT_TOKEN;

if (!TOKEN) {
  console.error("No Storefront token in the environment — nothing to compare against.");
  process.exit(2);
}

const res = await fetch(`https://${DOMAIN}/api/${VERSION}/graphql.json`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    ...(process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN
      ? { "Shopify-Storefront-Private-Token": TOKEN }
      : { "X-Shopify-Storefront-Access-Token": TOKEN }),
  },
  body: JSON.stringify({
    query: `query{products(first:100){nodes{handle variants(first:1){nodes{price{amount} compareAtPrice{amount}}}}}}`,
  }),
});

const json = await res.json();
if (!res.ok || json.errors?.length) {
  console.error(`Storefront API failed: ${res.status} ${json.errors?.[0]?.message ?? ""}`);
  process.exit(2);
}

const live = new Map(
  json.data.products.nodes.map((n) => {
    const v = n.variants.nodes[0];
    const num = (m) => (m ? Number(m.amount) : null);
    return [n.handle, { price: num(v?.price), compareAt: num(v?.compareAtPrice) }];
  }),
);

let drift = 0;
let unmapped = 0;

for (const p of products) {
  if (!p.shopifyHandle) {
    console.log(`—  ${p.handle.padEnd(20)} not on Shopify, editorial price stands`);
    continue;
  }
  const l = live.get(p.shopifyHandle);
  if (!l) {
    console.log(`?  ${p.handle.padEnd(20)} shopifyHandle matches nothing in the admin`);
    unmapped++;
    continue;
  }
  const bad = [];
  if (p.price !== l.price) bad.push(`price ${p.price} -> ${l.price}`);
  if ((p.compareAt ?? null) !== l.compareAt) bad.push(`compareAt ${p.compareAt} -> ${l.compareAt}`);
  if (bad.length) {
    console.log(`✗  ${p.handle.padEnd(20)} ${bad.join(", ")}`);
    drift++;
  } else {
    console.log(`✓  ${p.handle.padEnd(20)} ${p.price} / was ${p.compareAt ?? "-"}`);
  }
}

/* The other direction: a product that exists on Shopify and that nothing here
   claims. This is the reminder to set shopifyHandle when Rockbox, Mojo and the
   travel case get listed — without it they would quietly keep rendering
   editorial prices and no add-to-cart, which looks like nothing is wrong. */
const claimed = new Set(products.map((p) => p.shopifyHandle).filter(Boolean));
const orphans = [...live.keys()].filter((h) => !claimed.has(h));

if (orphans.length) {
  console.log("");
  console.log(`${orphans.length} Shopify product(s) not mapped to anything here:`);
  for (const h of orphans) {
    const l = live.get(h);
    console.log(`   ${h}`);
    console.log("     add this to the matching product in lib/products.ts:");
    console.log(`       shopifyHandle: "${h}",   // ${l.price} / was ${l.compareAt ?? "-"}`);
  }
}

console.log("");
if (drift || unmapped) {
  console.log(`${drift} price(s) drifted, ${unmapped} handle(s) unmatched.`);
  process.exit(1);
}
console.log(
  orphans.length
    ? "Mapped fallbacks all match, but the products above are not wired up yet."
    : "All mapped fallbacks match Shopify.",
);
