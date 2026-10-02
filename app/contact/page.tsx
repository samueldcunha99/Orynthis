import type { Metadata } from "next";
import { ContactForm, SUPPORT_EMAIL } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Support & Inquiries · Orynthis Customer Care",
  description:
    "Get dedicated support for your Orynthis instruments. Reach our engineering team for warranty claims, order tracking, and product guidance.",
};

const SUPPORT_CHANNELS = [
  {
    title: "Direct Support Inbox",
    value: SUPPORT_EMAIL,
    href: `mailto:${SUPPORT_EMAIL}`,
    meta: "Average response < 2 hours during business hours",
    icon: "✉️",
  },
  {
    title: "Warranty & Replacement",
    value: "One-Year Direct Cover",
    meta: "Direct swap for manufacturing or motor issues",
    icon: "🛡️",
  },
  {
    title: "Free Returns & Exchanges",
    value: "30-Day Window",
    meta: "Doorstep reverse pickup across all Indian pin codes",
    icon: "🔄",
  },
  {
    title: "Pan-India Shipping Desk",
    value: "Air Express Fulfillment",
    meta: "Tracking updates via SMS and WhatsApp",
    icon: "📦",
  },
];

const CONTACT_FAQS = [
  {
    q: "How do I claim my 1-Year Orynthis Warranty?",
    a: "Every instrument sold through our store, Amazon, or Flipkart is covered automatically. Simply email us with your order ID and a brief 10-second video of the issue. We arrange pickup and send a replacement unit directly to your doorstep.",
  },
  {
    q: "Can I return the product if it doesn't suit my hair texture?",
    a: "Yes. You have 30 days from the delivery date to test the instrument. If you are not completely satisfied, email us to initiate an exchange or full refund.",
  },
  {
    q: "How do I clean and maintain the air intake filter?",
    a: "Twist off the lower perforated brass filter cage counter-clockwise once a month. Use a soft dry brush or lint-free cloth to sweep away collected airborne dust, then snap it back into place.",
  },
  {
    q: "Are the attachments universal across the range?",
    a: "AirUltra 6-in-1 uses a quick-release radial push collar, while Air Ultra Pro Series 5 uses a precision magnetic snap ring. Attachments are designed specifically for their motor airflow dynamics.",
  },
];

export default function Contact() {
  return (
    <div className="shell py-16 lg:py-24">
      {/* Header */}
      <Reveal className="rule-b pb-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="t-label text-graphite">Customer Support & Care</p>
          <span className="t-label bg-accent text-ink px-3 py-1 font-semibold rounded-xs">
            Direct Engineering Desk
          </span>
        </div>
        <h1 className="t-display mt-4 text-[clamp(2.5rem,8vw,6rem)]">
          Talk with our team
        </h1>
        <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-graphite">
          One dedicated desk staffed by people who design and test these instruments. Whether you need styling advice, order tracking, or a warranty swap, we resolve it without automated phone trees.
        </p>
      </Reveal>

      {/* Support Channels Grid */}
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SUPPORT_CHANNELS.map((ch) => (
          <div key={ch.title} className="border border-hairline bg-white p-6 shadow-sm">
            <span className="text-2xl">{ch.icon}</span>
            <h4 className="t-label text-graphite text-[0.6875rem] mt-3">{ch.title}</h4>
            {ch.href ? (
              <a
                href={ch.href}
                className="t-display-tight text-base font-bold text-ink hover:text-accent transition-colors block mt-1 break-all"
              >
                {ch.value}
              </a>
            ) : (
              <p className="t-display-tight text-base font-bold text-ink mt-1">
                {ch.value}
              </p>
            )}
            <p className="mt-2 text-xs text-graphite leading-relaxed">{ch.meta}</p>
          </div>
        ))}
      </div>

      {/* Main Interactive Contact Section */}
      <div className="mt-16 grid gap-14 lg:grid-cols-[0.85fr_1.15fr] border-t border-hairline pt-12">
        <Reveal>
          <div className="bg-paper-alt border border-hairline p-8">
            <span className="t-label text-accent font-semibold">Service Commitments</span>
            <h3 className="t-display text-2xl mt-2">What you can count on</h3>

            <dl className="mt-6 space-y-6">
              <div className="border-t border-hairline pt-4">
                <dt className="t-label text-ink">Zero Round-Trip Policy</dt>
                <dd className="mt-1 text-sm text-graphite leading-relaxed">
                  Provide your order number and invoice up front and we dispatch replacements or approve returns immediately on first review.
                </dd>
              </div>

              <div className="border-t border-hairline pt-4">
                <dt className="t-label text-ink">Pan-India Reverse Pickup</dt>
                <dd className="mt-1 text-sm text-graphite leading-relaxed">
                  No post office visits required. Our courier arrives at your address with pre-printed return labels.
                </dd>
              </div>

              <div className="border-t border-hairline pt-4">
                <dt className="t-label text-ink">Marketplace Order Assistance</dt>
                <dd className="mt-1 text-sm text-graphite leading-relaxed">
                  Purchased via Amazon or Flipkart? We honor manufacturer warranties directly regardless of where you checked out.
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="border border-hairline bg-white p-8 shadow-sm">
            <div className="mb-6">
              <span className="t-label text-accent font-semibold">Direct Message</span>
              <h3 className="t-display text-2xl mt-1">Send us an inquiry</h3>
              <p className="text-xs text-graphite mt-1">
                We respond directly to your email address within 2 hours.
              </p>
            </div>
            <ContactForm />
          </div>
        </Reveal>
      </div>

      {/* Frequently Asked Questions */}
      <section className="mt-24 border-t border-hairline pt-16">
        <div className="max-w-3xl">
          <p className="t-label text-graphite">Help Center</p>
          <h3 className="t-display mt-2 text-2xl lg:text-3xl">
            Frequently Asked Questions
          </h3>

          <div className="mt-8 divide-y divide-hairline border-y border-hairline bg-white">
            {CONTACT_FAQS.map((faq) => (
              <div key={faq.q} className="p-6">
                <h4 className="t-display-tight text-base">{faq.q}</h4>
                <p className="mt-2 text-sm text-graphite leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
