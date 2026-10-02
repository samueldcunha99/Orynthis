import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddButton } from "@/components/Cart";
import { Gallery } from "@/components/Gallery";
import { Product3DViewer } from "@/components/Product3DViewer";
import { ActionStyleFilm } from "@/components/ActionStyleFilm";
import { HeatScale } from "@/components/CoandaDiagram";
import { ProductCard } from "@/components/ProductCard";
import { ProductScrollStory } from "@/components/ProductScrollStory";
import { Reveal } from "@/components/Reveal";
import { BOX_CONTENTS, REVIEWS_DATA, PRODUCT_FAQS } from "@/lib/product-rich-data";
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

      <div className="shell product-detail py-10 lg:py-14">
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
                <AddButton handle={p.handle} className="shop-button mt-6 w-full" label="Add to bag" />
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

            {p.handle === "air-ultra-6-in-1" && (
              <a
                href="#scroll-story"
                className="t-label mt-6 inline-flex w-full items-center justify-center gap-2.5 border border-hairline bg-paper-alt px-4 py-3 text-ink transition-colors hover:border-accent hover:bg-white"
              >
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                <span>Explore Interactive Exploded Story ↓</span>
              </a>
            )}

            {(p.handle === "air-ultra-pro" || p.handle === "silkcomb-cordless") && (
              <a
                href="#action-film"
                className="t-label mt-6 inline-flex w-full items-center justify-center gap-2.5 border border-hairline bg-paper-alt px-4 py-3 text-ink transition-colors hover:border-accent hover:bg-white"
              >
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                <span>Watch In-Action Styling Film ↓</span>
              </a>
            )}

            {p.model3d && (
              <a
                href="#model-3d"
                className="t-label mt-6 inline-flex w-full items-center justify-center gap-2.5 border border-hairline bg-paper-alt px-4 py-3 text-ink transition-colors hover:border-accent hover:bg-white"
              >
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                <span>Interactive 3D Hardware Studio (Rotate 360°) ↓</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ── Interactive Scrollytelling Architecture Story (AirUltra 6-in-1) ── */}
      {p.handle === "air-ultra-6-in-1" && (
        <div id="scroll-story" className="rule-t scroll-mt-16">
          <ProductScrollStory />
        </div>
      )}

      {/* ── In-Action Styling Film (AirUltra 6-in-1 & Air Ultra Pro) ── */}
      {(p.handle === "air-ultra-6-in-1" || p.handle === "air-ultra-pro" || p.handle === "silkcomb-cordless") && (
        <div id="action-film" className="rule-t scroll-mt-16">
          <ActionStyleFilm handle={p.handle} />
        </div>
      )}

      {/* ── Interactive 3D Model Explorer (InfraNova & 3D Products) ── */}
      {p.model3d && (
        <div id="model-3d" className="rule-t scroll-mt-16 bg-[#f7f6f2] py-14 lg:py-20 border-b border-hairline">
          <div className="shell">
            <Reveal className="mb-8">
              <span className="t-label text-accent font-semibold">360° Realtime Hardware Studio</span>
              <h2 className="t-display text-2xl lg:text-4xl mt-2">Inspect the design in 3D</h2>
              <p className="mt-2 text-graphite text-sm max-w-2xl">
                Precision-rendered 3D CAD model. Click, drag and zoom to examine the crystal glass deck, brushed steel grab rails, and front digital rotary controls from every angle.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <Product3DViewer
                src={p.model3d}
                poster={p.images[0]}
                title={p.name}
              />
            </Reveal>
          </div>
        </div>
      )}

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

          {/* Universal Cookware Compatibility showcase for InfraNova */}
          {p.handle === "infranova-3500w" && (
            <Reveal className="rule-t mt-14 pt-12">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <div>
                  <span className="t-label text-accent font-semibold">Universal Cookware Freedom</span>
                  <h2 className="t-display text-xl lg:text-3xl mt-1">Works with all flat-bottom cookware</h2>
                </div>
                <p className="t-label text-xs text-graphite max-w-md">
                  InfraNova uses radiant far-infrared heating instead of electromagnetic induction, eliminating cookware restrictions.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {[
                  { name: "Stainless Steel", desc: "Kadhais, saucepans & milk pans" },
                  { name: "Cast Iron", desc: "Skillets, dutch ovens & tawas" },
                  { name: "Aluminium Capable", desc: "Pressure cookers & handis" },
                  { name: "Copper Capable", desc: "Traditional brass & copper pots" },
                  { name: "Enamel & Ceramic", desc: "Glazed pans & heatproof glass" },
                ].map((item) => (
                  <div key={item.name} className="border border-hairline bg-white p-4 shadow-xs">
                    <span className="text-accent text-xs font-mono">✓ COMPATIBLE</span>
                    <h4 className="t-display-tight text-sm mt-2 text-ink">{item.name}</h4>
                    <p className="text-[0.6875rem] text-graphite mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

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

      {/* ── What's in the Box ─────────────────────────────────────────── */}
      {BOX_CONTENTS[p.handle] && (
        <section className="bg-paper-alt border-t border-hairline py-16 lg:py-24">
          <div className="shell">
            <Reveal className="rule-b pb-6">
              <span className="t-label text-accent font-semibold">Packaging & Kit</span>
              <h2 className="t-display text-2xl lg:text-4xl mt-2">What arrives in the box</h2>
              <p className="mt-2 text-graphite text-sm">
                Every component serialized, individually seated, and protected for transit.
              </p>
            </Reveal>

            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {BOX_CONTENTS[p.handle].map((item, i) => (
                <div key={item.item} className="border border-hairline bg-white p-5 shadow-xs">
                  <span className="t-label text-[0.625rem] text-accent font-mono">
                    PART 0{i + 1}
                  </span>
                  <h4 className="t-display-tight text-sm mt-2">{item.item}</h4>
                  <p className="mt-1 text-xs text-graphite leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Verified Customer Reviews & Testimonials ──────────────────── */}
      {REVIEWS_DATA[p.handle] && (
        <section className="shell py-16 lg:py-24 border-t border-hairline">
          <Reveal className="rule-b pb-8 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="t-label text-accent font-semibold">Customer Experiences</p>
              <h2 className="t-display text-2xl lg:text-4xl mt-2">Verified Owner Reviews</h2>
            </div>
            <div className="flex items-center gap-4 bg-white border border-hairline px-6 py-3">
              <span className="t-data text-3xl font-bold text-ink">4.9</span>
              <div>
                <div className="text-accent text-sm">★★★★★</div>
                <p className="t-label text-[0.625rem] text-graphite mt-0.5">
                  Based on verified Indian orders
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {REVIEWS_DATA[p.handle].map((rev) => (
              <div key={rev.name} className="border border-hairline bg-white p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-accent font-mono">{"★".repeat(rev.rating)}</span>
                    <span className="t-data text-graphite text-[0.6875rem]">{rev.date}</span>
                  </div>
                  <h4 className="t-display-tight text-base mt-3">{rev.title}</h4>
                  <p className="mt-3 text-xs text-graphite leading-relaxed">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-hairline flex items-center justify-between text-xs">
                  <span className="font-semibold text-ink">{rev.name}</span>
                  <span className="t-label text-[0.625rem] text-accent">✓ Verified Buyer · {rev.city}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Product Specific FAQs ─────────────────────────────────────── */}
      {PRODUCT_FAQS[p.handle] && (
        <section className="bg-paper-alt border-t border-hairline py-16 lg:py-24">
          <div className="shell max-w-4xl">
            <Reveal className="rule-b pb-6">
              <span className="t-label text-graphite">Frequently Asked</span>
              <h2 className="t-display text-2xl lg:text-3xl mt-2">Questions about {p.name}</h2>
            </Reveal>

            <div className="mt-8 divide-y divide-hairline border-y border-hairline bg-white">
              {PRODUCT_FAQS[p.handle].map((faq) => (
                <div key={faq.q} className="p-6">
                  <h4 className="t-display-tight text-base">{faq.q}</h4>
                  <p className="mt-2 text-sm text-graphite leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
