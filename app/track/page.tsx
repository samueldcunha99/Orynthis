import type { Metadata } from "next";
import Link from "next/link";
import { OrderTrackerClient } from "@/components/OrderTrackerClient";
import { Reveal } from "@/components/Reveal";
import { SHOP } from "@/lib/products";
import { SUPPORT_EMAIL } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Track Your Order · Orynthis Dispatch & Tracking",
  description:
    "Check live delivery status for your Orynthis order. Real-time courier tracking across BlueDart, Delhivery, DTDC, and IndiaPost.",
};

const routes = [
  {
    label: "Live Tracking Email",
    body: "Every parcel is scanned and assigned an Air Waybill (AWB) the moment it clears our fulfillment center. Check your registered inbox and SMS for your live link.",
    action: null,
  },
  {
    label: "Customer Account",
    body: "If you checked out with your account, your full purchase history, current transit milestone, and invoice are stored right inside your portal.",
    action: { href: `${SHOP}/account`, label: "Open account portal", ext: true },
  },
  {
    label: "Direct Dispatch Desk",
    body: "Tracking not updating after 48 hours or need to reschedule your delivery window? Our logistics team responds directly within 2 hours.",
    action: { href: "/contact", label: "Message dispatch team", ext: false },
  },
];

const FAQS = [
  {
    q: "How fast do orders ship after placement?",
    a: "Orders placed before 2:00 PM IST are processed and handed over to our air express partners on the same business day. Delivery across metro cities (Delhi NCR, Mumbai, Bengaluru, Hyderabad, Chennai) typically takes 48–72 hours.",
  },
  {
    q: "Can I inspect the parcel before paying for Cash on Delivery (COD)?",
    a: "Yes. Courier partners allow outer package inspection to verify tamper-evident security tape before accepting payment.",
  },
  {
    q: "What happens if I miss the delivery attempt?",
    a: "Our logistics partners make up to three consecutive delivery attempts. You will receive an SMS with a direct link to reschedule the time or select a safe neighbor drop-off.",
  },
  {
    q: "How do 30-day returns work for deliveries?",
    a: "If an item does not meet your expectations, simply reach out within 30 days of delivery. We coordinate doorstep reverse pickup at no cost to you.",
  },
];

export default function Track() {
  return (
    <div className="shell py-16 lg:py-24">
      {/* Header */}
      <Reveal className="rule-b pb-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="t-label text-graphite">Order Logistics</p>
          <span className="t-label bg-accent text-ink px-3 py-1 font-semibold rounded-xs">
            Air Express Dispatch
          </span>
        </div>
        <h1 className="t-display mt-4 text-[clamp(2.5rem,8vw,6rem)]">
          Where is your parcel?
        </h1>
        <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-graphite">
          Every Orynthis instrument ships fully insured with zero delivery fee across India. Use the tracking lookup below to locate your shipment in real time.
        </p>
      </Reveal>

      {/* Interactive Live Tracking Search Box */}
      <div className="mt-12">
        <OrderTrackerClient />
      </div>

      {/* 3 Routes */}
      <section className="mt-20">
        <div className="border-b border-hairline pb-4">
          <p className="t-label text-graphite">Support Routes</p>
          <h3 className="t-display mt-2 text-2xl">Ways to track your delivery</h3>
        </div>

        <ol className="mt-8 grid gap-8 md:grid-cols-3">
          {routes.map((r, i) => (
            <Reveal key={r.label} delay={i * 90} as="li" className="border border-hairline bg-white p-6">
              <span className="t-label text-accent font-mono">0{i + 1}</span>
              <h4 className="t-display-tight text-lg mt-2">{r.label}</h4>
              <p className="mt-3 text-sm leading-relaxed text-graphite">{r.body}</p>
              {r.action &&
                (r.action.ext ? (
                  <a href={r.action.href} className="btn btn-line mt-6 text-ink inline-block">
                    <span>{r.action.label}</span>
                  </a>
                ) : (
                  <Link href={r.action.href} className="btn btn-line mt-6 text-ink inline-block">
                    <span>{r.action.label}</span>
                  </Link>
                ))}
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Verified Delivery Logistics Partners */}
      <section className="mt-20 border-t border-hairline pt-12">
        <p className="t-label text-graphite text-center">Integrated Carrier Network</p>
        <p className="text-center text-sm text-graphite mt-2">
          Your orders are routed through Tier-1 aviation freight networks:
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-10 opacity-70">
          {["BlueDart Express", "Delhivery Surface & Air", "DTDC Prime", "Xpressbees Express", "India Post Speed Post"].map(
            (c) => (
              <span
                key={c}
                className="t-data text-xs border border-hairline bg-paper px-4 py-2 text-ink font-semibold"
              >
                {c}
              </span>
            )
          )}
        </div>
      </section>

      {/* Shipping & Delivery FAQ */}
      <section className="mt-20 border-t border-hairline pt-14">
        <div className="max-w-3xl">
          <p className="t-label text-graphite">Frequently Asked Questions</p>
          <h3 className="t-display mt-2 text-2xl lg:text-3xl">Delivery & Dispatch Policy</h3>

          <div className="mt-8 divide-y divide-hairline border-y border-hairline bg-white">
            {FAQS.map((faq) => (
              <div key={faq.q} className="p-6">
                <h4 className="t-display-tight text-base">{faq.q}</h4>
                <p className="mt-2 text-sm text-graphite leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer support prompt */}
      <div className="mt-16 border-t border-hairline pt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-graphite">
        <span>Returns run 30 days from delivery with full coverage.</span>
        <span>
          Support desk:{" "}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="text-ink font-mono underline hover:text-accent"
          >
            {SUPPORT_EMAIL}
          </a>
        </span>
      </div>
    </div>
  );
}
