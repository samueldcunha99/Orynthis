import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "The range",
  description:
    "Every Orynthis instrument: multi-stylers built on Coanda airflow, AI smart glasses, portable and shelf Bluetooth speakers, and a double burner that runs two thermostats.",
};

export default function Catalog() {
  return (
    <div className="shell py-16 lg:py-24">
      <Reveal className="rule-b pb-8">
        <p className="t-label text-graphite">
          The range · {products.length} products
        </p>
        <h1 className="t-display mt-4 text-[clamp(2.5rem,8vw,6rem)]">
          The full range
        </h1>
        <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-graphite">
          A short catalogue on purpose. The instruments each replace a shelf of
          single-purpose appliances, and what is left is what they need to
          travel. We would rather make a handful of things properly than forty
          badly.
        </p>
      </Reveal>

      {/* Wider cards than the home page — this is the considered view. */}
      <div className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2">
        {products.map((p, i) => (
          <Reveal key={p.handle} delay={i * 90}>
            <ProductCard product={p} priority={i < 2} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
