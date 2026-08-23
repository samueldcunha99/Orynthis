import Image from "next/image";
import Link from "next/link";
import { CoandaDiagram, HeatScale } from "@/components/CoandaDiagram";
import { HeroRotator } from "@/components/HeroRotator";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { MARKETPLACES } from "@/lib/products";
import { getProducts } from "@/lib/shopify";


export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <HeroRotator />

      {/* ── Trusted partners ──────────────────────────────────────────
          Most of the volume goes through the marketplaces, so they get a
          band of their own directly under the hero. The logos keep their
          own white grounds — both marks are drawn for white and neither
          brand permits recolouring. */}
      <section className="rule-t bg-paper-alt">
        <div className="shell py-14 lg:py-16">
          <Reveal>
            <h2 className="t-display text-center text-[clamp(1.75rem,4.5vw,2.75rem)]">
              Our trusted partners
            </h2>
            <p className="mt-4 text-center text-graphite">
              Every instrument is sold and shipped through both.
            </p>
          </Reveal>

          <Reveal
            delay={120}
            className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10"
          >
            {MARKETPLACES.map((m) => (
              <a
                key={m.name}
                href={m.href}
                target="_blank"
                rel="noreferrer"
                title={`Orynthis on ${m.name} — ${m.label}`}
                className="group flex h-28 w-60 items-center justify-center border border-hairline bg-white px-8 transition-colors hover:border-accent sm:h-32 sm:w-72"
              >
                <Image
                  src={`/brand/${m.name.toLowerCase()}.webp`}
                  alt={`Buy Orynthis on ${m.name}`}
                  width={232}
                  height={72}
                  className="h-auto w-full max-w-[10rem] object-contain transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] sm:max-w-[11rem]"
                />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── The range ─────────────────────────────────────────────────── */}
      <section className="shell py-20 lg:py-28">
        <Reveal className="rule-b flex flex-wrap items-end justify-between gap-6 pb-8">
          <div>
            <p className="t-label text-graphite">
              The range · {products.length} products
            </p>
            <h2 className="t-display mt-4 text-[clamp(2.25rem,6.5vw,4.5rem)]">
              Everything we make
            </h2>
          </div>
          <p className="max-w-[38ch] text-sm text-graphite">
            A short range on purpose. Each one earns its place by doing a job
            that otherwise takes two or three separate appliances.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-x-8 gap-y-16 sm:grid-cols-2">
          {products.map((p, i) => (
            <Reveal key={p.handle} delay={i * 90}>
              <ProductCard product={p} priority={i < 2} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Brand band ────────────────────────────────────────────────
          The whole range in one frame. Cropped from the store's own group
          shot to drop the "Elevates Your Lifestyle" caption and watermark
          — see public/brand/range-group.webp. The claim underneath is
          consolidation, which every product here can actually back up. */}
      <section className="rule-t">
        <Reveal className="relative aspect-16/10 max-h-[70svh] w-full sm:aspect-[1536/700]">
          <Image
            src="/brand/range-group.webp"
            alt="The Orynthis range together: smart glasses, styling barrels and volumising brushes"
            fill
            sizes="100vw"
            className="object-cover object-[45%_center]"
          />
        </Reveal>

        <div className="shell grid gap-8 py-16 lg:grid-cols-2 lg:items-end lg:py-20">
          <Reveal>
            <p className="t-label text-graphite">The whole range</p>
            <h2 className="t-display mt-4 text-[clamp(2.25rem,6.5vw,4.5rem)]">
              One tool where three used to be
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-[46ch] text-lg leading-relaxed text-graphite">
              A styler that replaces a drawer of them. Glasses that are also a
              camera and a pair of headphones. A burner running two pots on
              separate dials. The range is short because each thing does the
              work of several.
            </p>
            <Link href="/catalog" className="btn btn-ink mt-8">
              <span>See the range</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Technology ────────────────────────────────────────────────── */}
      <section id="technology" className="scroll-mt-24 bg-paper-alt">
        <div className="shell py-20 lg:py-28">
          <Reveal className="rule-b pb-8">
            <p className="t-label text-graphite">Technology · Air styling range</p>
            <h2 className="t-display mt-4 max-w-[16ch] text-[clamp(2.25rem,6.5vw,4.5rem)]">
              Heat is the shortcut
            </h2>
            <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-graphite">
              Anything will set a curl if you make it hot enough. The harder
              route is to move enough air, fast enough, in the right shape.
            </p>
          </Reveal>

          <Reveal className="mt-14 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="border border-hairline bg-paper p-4 sm:p-8">
              <CoandaDiagram className="h-auto w-full" />
            </div>

            <div>
              <h3 className="t-display-tight text-2xl">The Coanda effect</h3>
              <p className="mt-4 leading-relaxed text-graphite">
                A fast jet of air passing a curved surface will follow that
                curve rather than travel straight on. Drop a hair section into
                that stream and it gets carried around the barrel and held
                there by the pressure difference.
              </p>
              <p className="mt-4 leading-relaxed text-graphite">
                The shape sets while the air does the holding, which is why the
                barrel never has to reach the temperature a curling iron does.
              </p>

              <dl className="rule-t mt-8 grid gap-x-8 gap-y-5 pt-8 sm:grid-cols-2">
                {[
                  ["Brushless drive", "Airflow stays constant under load"],
                  ["Pulse-width heating", "Output holds where you set it"],
                  ["Dual thermal cut-off", "Two independent safety circuits"],
                  ["Magnetic attachments", "Swap heads mid-style, one hand"],
                ].map(([t, d]) => (
                  <div key={t}>
                    <dt className="t-label">{t}</dt>
                    <dd className="mt-1.5 text-sm text-graphite">{d}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <Reveal className="rule-t mt-16 grid gap-10 pt-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <h3 className="t-display-tight text-2xl">Three real temperatures</h3>
              <p className="mt-4 max-w-[40ch] leading-relaxed text-graphite">
                Not low, medium and high. Three measured settings, chosen for
                three different jobs, held steady by the controller rather than
                drifting as the element warms.
              </p>
            </div>
            <HeatScale />
          </Reveal>
        </div>
      </section>

      {/* ── Buying with us ────────────────────────────────────────────── */}
      <section className="shell py-20 lg:py-24">
        <Reveal>
          <p className="t-label text-graphite">Buying with us</p>
        </Reveal>
        <div className="rule-t mt-6 grid sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Free shipping", "Delivered anywhere in India at no extra cost."],
            ["One year warranty", "Every instrument, covered from the day it arrives."],
            ["Cash on delivery", "Pay when it reaches you, if you would rather."],
            ["Also on Amazon & Flipkart", "Buy wherever your account already lives."],
          ].map(([t, d], i) => (
            <Reveal
              key={t}
              delay={i * 80}
              className={`rule-b py-8 lg:border-b-0 ${
                i > 0 ? "lg:border-l lg:border-hairline lg:pl-6" : "lg:pr-6"
              }`}
            >
              <h3 className="t-display-tight text-base">{t}</h3>
              <p className="mt-2 max-w-[30ch] text-sm text-graphite">{d}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
