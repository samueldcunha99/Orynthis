import type { Metadata } from "next";
import Link from "next/link";
import { ActionStyleFilm } from "@/components/ActionStyleFilm";
import { ProductScrollStory } from "@/components/ProductScrollStory";
import { byHandle, inr } from "@/lib/products";
import { AddButton } from "@/components/Cart";

export const metadata: Metadata = {
  title: "AirUltra 6-in-1 Engineering Story · Orynthis",
  description:
    "An interactive 3D exploded scroll breakdown of the Orynthis AirUltra 6-in-1 Multi-Styler: BLDC motor, pulse-width PCB, and interchangeable modular heads.",
};

export default function AirUltraStoryPage() {
  const product = byHandle("air-ultra-6-in-1");

  return (
    <main className="min-h-screen bg-paper">
      {/* Intro hero banner */}
      <header className="shell pt-12 pb-10 border-b border-hairline">
        <nav className="t-label mb-6 text-graphite">
          <Link href="/catalog" className="transition-colors hover:text-accent">
            The range
          </Link>
          <span className="mx-2">/</span>
          <Link
            href="/products/air-ultra-6-in-1"
            className="transition-colors hover:text-accent"
          >
            AirUltra 6-in-1
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink">Scroll Story</span>
        </nav>

        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="t-label text-accent font-semibold tracking-widest">
              Aerodynamic Architecture
            </p>
            <h1 className="t-display mt-2 text-[clamp(2.5rem,7vw,5rem)]">
              Anatomy of AirUltra
            </h1>
            <p className="mt-4 max-w-[50ch] text-lg text-graphite leading-relaxed">
              Scroll down to dismantle the 1000W chassis into its individual
              subsystems: turbine, thermal control, and all six quick-lock heads.
            </p>
          </div>

          {product && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="border border-hairline bg-white px-5 py-3">
                <p className="t-label text-[0.625rem] text-graphite">Special Price</p>
                <p className="t-data text-xl font-bold text-ink">
                  {inr(product.price ?? 3999)}
                </p>
              </div>
              <AddButton
                handle="air-ultra-6-in-1"
                className="btn btn-ink whitespace-nowrap"
              />
            </div>
          )}
        </div>
      </header>

      {/* Interactive Canvas Scrollytelling Story */}
      <ProductScrollStory />

      {/* In-Action Lifestyle & Styling Film */}
      <ActionStyleFilm />

      {/* Post-story wrap-up */}
      <section className="shell py-20 lg:py-28 border-t border-hairline bg-paper-alt">
        <div className="max-w-3xl mx-auto text-center">
          <p className="t-label text-accent font-semibold">The complete instrument</p>
          <h2 className="t-display mt-4 text-[clamp(2rem,5vw,3.5rem)]">
            Ready to upgrade your morning routine?
          </h2>
          <p className="mt-6 text-graphite text-lg leading-relaxed">
            Everything shown in this exploded view arrives in a single presentation box with all six attachments, protective heat glove, and 1-year pan-India warranty.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <AddButton
              handle="air-ultra-6-in-1"
              className="btn btn-ink px-8 py-3.5 text-base"
            />
            <Link
              href="/products/air-ultra-6-in-1"
              className="btn border border-hairline bg-white hover:border-accent px-6 py-3.5"
            >
              <span>Full Specifications</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
