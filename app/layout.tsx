import type { Metadata } from "next";
import { Archivo, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/Cart";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

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
  metadataBase: new URL("https://orynthis.com"),
  title: {
    default: "Orynthis — Instruments built around moving air",
    template: "%s — Orynthis",
  },
  description:
    "Hair styling tools, smart glasses, Bluetooth speakers and kitchen appliances engineered around what they actually do, not shortcuts. Free shipping across India, one year warranty.",
  openGraph: {
    title: "Orynthis — Instruments built around moving air",
    description:
      "Coanda airflow styling, AI smart glasses, Bluetooth speakers and a double burner that runs two thermostats. Shipped across India.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
        <CartProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
