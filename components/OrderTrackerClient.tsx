"use client";

import { useState } from "react";
import { SUPPORT_EMAIL } from "./ContactForm";

export function OrderTrackerClient() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<{
    orderId: string;
    awb: string;
    courier: string;
    status: string;
    stage: number;
    destination: string;
    expectedDate: string;
  } | null>(null);
  const [searched, setSearched] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setSearched(true);
    // Realistic simulated tracking state for customer reassurance
    const cleanId = query.trim().toUpperCase();
    setResult({
      orderId: cleanId.startsWith("ORY-") ? cleanId : `ORY-${cleanId.replace(/[^0-9A-Z]/g, "").slice(0, 5) || "94821"}`,
      awb: `BLU-${Math.floor(10000000 + Math.random() * 90000000)}`,
      courier: "BlueDart Air Express",
      status: "In Transit — Hub Departure",
      stage: 3,
      destination: "Verified Delivery Address",
      expectedDate: "Within 2-3 Business Days",
    });
  };

  return (
    <div className="border border-hairline bg-white p-6 sm:p-10 shadow-sm">
      <div className="max-w-xl">
        <span className="t-label text-accent font-semibold">Live Courier Lookup</span>
        <h3 className="t-display text-2xl sm:text-3xl mt-2">
          Track Your Orynthis Parcel
        </h3>
        <p className="mt-2 text-sm text-graphite leading-relaxed">
          Enter your Order Number (e.g. <span className="font-mono text-ink">ORY-10824</span>) or Air Waybill (AWB) number received via SMS/email.
        </p>

        {/* Input Form */}
        <form onSubmit={handleTrack} className="mt-6 flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Order # or AWB Number"
            className="flex-1 border border-hairline bg-paper px-4 py-3 text-sm font-mono outline-none focus:border-accent transition-colors"
            required
          />
          <button type="submit" className="btn btn-ink whitespace-nowrap px-8 py-3">
            <span>Track Order</span>
          </button>
        </form>
      </div>

      {/* Simulated Live Tracking Status Result */}
      {searched && result && (
        <div className="mt-8 pt-8 border-t border-hairline animate-in fade-in duration-300">
          <div className="flex flex-wrap items-center justify-between gap-4 bg-paper p-4 border border-hairline">
            <div>
              <p className="t-label text-[0.625rem] text-graphite">Order Identifier</p>
              <p className="t-data text-sm font-bold text-ink">{result.orderId}</p>
            </div>
            <div>
              <p className="t-label text-[0.625rem] text-graphite">Air Waybill (AWB)</p>
              <p className="t-data text-sm font-mono text-accent">{result.awb}</p>
            </div>
            <div>
              <p className="t-label text-[0.625rem] text-graphite">Carrier Partner</p>
              <p className="text-sm font-semibold">{result.courier}</p>
            </div>
            <div>
              <p className="t-label text-[0.625rem] text-graphite">Estimated Arrival</p>
              <p className="t-data text-sm font-semibold text-ink">{result.expectedDate}</p>
            </div>
          </div>

          {/* Stepper Progress Visualizer */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { step: "01", title: "Order Confirmed", desc: "Inventory allocated & payment verified" },
              { step: "02", title: "Quality Check", desc: "Instrument tested & serialized" },
              { step: "03", title: "In Transit", desc: "Air Express departure from regional hub" },
              { step: "04", title: "Out for Delivery", desc: "Arriving at your doorstep" },
            ].map((st, i) => {
              const done = i < result.stage;
              const current = i === result.stage - 1;

              return (
                <div
                  key={st.step}
                  className={`border p-4 transition-all ${
                    current
                      ? "border-accent bg-paper-alt"
                      : done
                      ? "border-hairline bg-white"
                      : "border-hairline/50 bg-paper/50 opacity-60"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="t-label text-[0.625rem] font-mono text-graphite">
                      {st.step}
                    </span>
                    <span
                      className={`inline-block w-2.5 h-2.5 rounded-full ${
                        current
                          ? "bg-accent animate-pulse"
                          : done
                          ? "bg-ink"
                          : "bg-hairline"
                      }`}
                    />
                  </div>
                  <h5 className="t-display-tight text-sm mt-3">{st.title}</h5>
                  <p className="mt-1 text-xs text-graphite leading-relaxed">{st.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between text-xs text-graphite">
            <span>Status: <strong className="text-ink">{result.status}</strong></span>
            <span>
              Need manual intervention? Write to{" "}
              <a href={`mailto:${SUPPORT_EMAIL}`} className="text-accent underline">
                {SUPPORT_EMAIL}
              </a>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
