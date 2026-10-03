import type { Metadata } from "next";
import { ContactForm, SUPPORT_EMAIL } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Questions about an order, a product or a return. Email orynthis@gmail.com or send a message from this page.",
};

export default function Contact() {
  return (
    <div className="shell py-16 lg:py-24">
      <Reveal className="rule-b pb-10">
        <p className="t-label text-graphite">Support</p>
        <h1 className="t-display mt-4 text-[clamp(2.5rem,8vw,6rem)]">
          Talk to us
        </h1>
        <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-graphite">
          One inbox, read by people who know the products. Tell us your order
          number if you have one and we can skip a round trip.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <dl className="space-y-9">
            <div className="rule-t pt-5">
              <dt className="t-label text-graphite">Email</dt>
              <dd className="mt-2">
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="t-display-tight text-xl break-all transition-colors hover:text-accent"
                >
                  {SUPPORT_EMAIL}
                </a>
              </dd>
            </div>

            <div className="rule-t pt-5">
              <dt className="t-label text-graphite">Returns</dt>
              <dd className="mt-2 leading-relaxed">
                30 days from delivery. Item unused, in its original packaging,
                with proof of purchase. Email us to start one.
              </dd>
            </div>

            <div className="rule-t pt-5">
              <dt className="t-label text-graphite">Warranty</dt>
              <dd className="mt-2 leading-relaxed">
                One year on every instrument, from the day it arrives.
              </dd>
            </div>

            <div className="rule-t pt-5">
              <dt className="t-label text-graphite">Shipping</dt>
              <dd className="mt-2 leading-relaxed">
                Free across India. Cash on delivery available at checkout.
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={120}>
          <ContactForm />
        </Reveal>
      </div>
    </div>
  );
}
