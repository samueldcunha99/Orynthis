import type { Metadata } from "next";
import { Archivo, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/Cart";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE } from "@/lib/products";
import { getProducts } from "@/lib/shopify";

/* Display: Archivo, loaded with its width axis so it can be pushed wide.
   Expansion is the type doing what the products do — moving air outward. */
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

/* Body: Instrument Sans — humanist enough to read long, quiet next to Archivo. */
const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

/* Utility: mono carries data — prices, specs, labels. Instrument readouts. */
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Orynthis — Beautifully engineered. Every day.",
    template: "%s — Orynthis",
  },
  /* Kept under ~155 characters: past that Google truncates mid-sentence and
     the last clause never reaches anyone. */
  description:
    "Hair stylers, smart glasses, Bluetooth speakers and kitchen appliances built around what they actually do. Free shipping across India, one year warranty.",
  openGraph: {
    title: "Orynthis — Beautifully engineered. Every day.",
    description:
      "Coanda airflow styling, AI smart glasses, Bluetooth speakers and a double burner that runs two thermostats. Shipped across India.",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  /* One Storefront round trip per request, shared by every client component
     under the tree. React caches it, so the pages below pay nothing to read
     the same catalogue again. */
  const catalog = await getProducts();

  return (
    <html
      lang="en"
      className={`${archivo.variable} ${instrument.variable} ${jetbrains.variable}`}
    >
      <body>
        <a
          href="#main"
          className="t-label sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper-alt"
        >
          Skip to content
        </a>
        <CartProvider catalog={catalog}>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
