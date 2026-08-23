import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddButton } from "@/components/Cart";
import { Gallery } from "@/components/Gallery";
import { HeatScale } from "@/components/CoandaDiagram";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import {
  SITE,
  byHandle,
  discount,
  inr,
  isBuyable,
  products,
  stars,
} from "@/lib/products";
import { getProduct, getProducts } from "@/lib/shopify";

type Props = { params: Promise<{ handle: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = byHandle((await params).handle);
  if (!p) return {};
  return {
    title: `${p.name} ${p.series}`,
    description: p.thesis,
    openGraph: {
      // Spread, not [p.images[0]] — that yields [undefined] on a product with
      // no photography and emits a broken tag.
      images: p.images.slice(0, 1),
      title: p.name,
      description: p.thesis,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  // Live: price, sale price, variant and stock all come from Shopify here,
  // so this page is what the checkout will actually charge.
  const p = await getProduct((await params).handle);
  if (!p) notFound();

  const off = discount(p);
  const buyable = isBuyable(p);
  const others = (await getProducts()).filter((x) => x.handle !== p.handle);

  /* Product schema. `offers` is emitted only where the product can actually
     be bought here — advertising a purchasable price the site cannot take
     money for is what earns a manual action, not a rich result. */
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.thesis,
    category: p.category,
    brand: { "@type": "Brand", name: "Orynthis" },
    image: p.images.map((src) => `${SITE}${src}`),
    ...(p.price !== null &&
      p.variantId !== null && {
        offers: {
          "@type": "Offer",
          price: p.price,
          priceCurrency: "INR",
          // Listed but sold out is still an offer, and saying so beats
          // dropping the block — Google reads a missing offer as no price at
          // all, where OutOfStock keeps the listing and marks it honestly.
          availability:
            p.available === false
              ? "https://schema.org/OutOfStock"
              : "https://schema.org/InStock",
          url: `${SITE}/products/${p.handle}`,
        },
      }),
    ...(p.reviews && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: p.reviews.stars,
        reviewCount: p.reviews.count,
      },
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="shell py-10 lg:py-14">
        <nav className="t-label mb-8 text-graphite">
          <Link href="/catalog" className="transition-colors hover:text-accent">
            The range
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{p.name}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Gallery images={p.images} name={p.name} />

          {/* Buy column sticks while the gallery scrolls past it. */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="t-label text-graphite">
              {p.category} · {p.series}
            </p>

            <h1 className="t-display mt-4 text-[clamp(2.25rem,7vw,4rem)]">
              {p.name}
            </h1>

            <p className="mt-4 text-lg leading-relaxed text-graphite">
              {p.thesis}
            </p>

            {p.reviews && (
              <p className="t-label mt-4 text-graphite">
                <span className="text-ink">{stars(p.reviews.stars)}</span>{" "}
                {p.reviews.stars} · {p.reviews.count} reviews
              </p>
            )}

            <div className="rule-t mt-8 flex flex-wrap items-baseline gap-3 pt-8">
              {p.price === null ? (
                <span className="t-data text-3xl text-graphite">
                  Price on request
                </span>
              ) : (
                <>
                  <span className="t-data text-3xl">{inr(p.price)}</span>
                  {p.compareAt && (
                    <>
                      <span className="t-data text-graphite line-through">
                        {inr(p.compareAt)}
                      </span>
                      <span className="t-label bg-accent px-2 py-1 text-ink">
                        Save {off}%
                      </span>
                    </>
                  )}
                </>
              )}
            </div>

            {/* Nothing to add to a cart until the SKU is listed on the store. */}
            {buyable ? (
              <>
                <AddButton handle={p.handle} className="btn btn-ink mt-6 w-full" />
                <p className="t-label mt-4 text-graphite">
                  Free shipping · Pan India · 1 year warranty
                </p>
              </>
            ) : (
              <>
                <Link href="/contact" className="btn btn-ink mt-6 w-full">
                  <span>Ask about this product</span>
                </Link>
                <p className="t-label mt-4 text-graphite">
                  Not on the store yet · email us for price and availability
                </p>
              </>
            )}

            <p className="mt-6 leading-relaxed">{p.body}</p>
          </div>
        </div>
      </div>

      {/* What it does, and why that is hard. */}
      <section className="bg-paper-alt">
        <div className="shell py-16 lg:py-24">
          <Reveal className="rule-b pb-6">
            <p className="t-label text-graphite">How it works</p>
          </Reveal>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {p.features.map((f, i) => (
              <Reveal key={f.title} delay={i * 90} className="rule-t pt-6">
                <h2 className="t-display-tight text-xl">{f.title}</h2>
                <p className="mt-3 leading-relaxed text-graphite">{f.text}</p>
              </Reveal>
            ))}
          </div>

          {/* The heat scale belongs only to the product that has one. */}
          {p.handle === "air-ultra-6-in-1" && (
            <Reveal className="rule-t mt-14 grid gap-8 pt-12 lg:grid-cols-[0.8fr_1.2fr]">
              <h2 className="t-display-tight text-xl">Measured heat levels</h2>
              <HeatScale />
            </Reveal>
          )}
        </div>
      </section>

      {/* Specifications */}
      <section className="shell py-16 lg:py-24">
        <Reveal className="rule-b pb-6">
          <p className="t-label text-graphite">Specifications</p>
        </Reveal>
        <Reveal>
          <dl className="mt-2">
            {p.specs.map((s) => (
              <div
                key={s.label}
                className="rule-b grid grid-cols-[minmax(9rem,0.5fr)_1fr] gap-4 py-4"
              >
                <dt className="t-label text-graphite">{s.label}</dt>
                <dd className="t-data text-sm">{s.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* Rest of the range */}
      <section className="shell pb-20 lg:pb-28">
        <Reveal className="rule-b pb-6">
          <p className="t-label text-graphite">Rest of the range</p>
        </Reveal>
        <div className="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((o, i) => (
            <Reveal key={o.handle} delay={i * 90}>
              <ProductCard product={o} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
