import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { STORE } from "@/lib/products";
import { SUPPORT_EMAIL } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Track an order",
  description:
    "Find your Orynthis tracking link, check order status in your account, or ask support where a parcel is.",
};

/* Three routes to the same answer, ordered by how fast each one works. */
const routes = [
  {
    label: "Your shipping email",
    body: "Every order gets a tracking link the moment the parcel leaves us. Search your inbox for Orynthis, and check spam while you are there.",
    action: null,
  },
  {
    label: "Your account",
    body: "If you ordered while signed in, every order and its current status sits in your account.",
    action: { href: `${STORE}/account`, label: "Open your account", ext: true },
  },
  {
    label: "Ask us",
    body: "No email, no account, or the tracking has not moved in a few days. Send the order number and we will chase it.",
    action: { href: "/contact", label: "Contact support", ext: false },
  },
];

export default function Track() {
  return (
    <div className="shell py-16 lg:py-24">
      <Reveal className="rule-b pb-10">
        <p className="t-label text-graphite">Orders</p>
        <h1 className="t-display mt-4 text-[clamp(2.5rem,8vw,6rem)]">
          Where is it
        </h1>
        <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-graphite">
          Orders ship free across India and usually move within two working
          days. Here is how to see exactly where yours is.
        </p>
      </Reveal>

      <ol className="mt-12 grid gap-10 md:grid-cols-3">
        {routes.map((r, i) => (
          <Reveal key={r.label} delay={i * 100} as="li" className="rule-t pt-6">
            <h2 className="t-display-tight text-xl">{r.label}</h2>
            <p className="mt-3 leading-relaxed text-graphite">{r.body}</p>
            {r.action &&
              (r.action.ext ? (
                <a href={r.action.href} className="btn btn-line mt-6 text-ink">
                  <span>{r.action.label}</span>
                </a>
              ) : (
                <Link href={r.action.href} className="btn btn-line mt-6 text-ink">
                  <span>{r.action.label}</span>
                </Link>
              ))}
          </Reveal>
        ))}
      </ol>

      <Reveal className="rule-t mt-16 pt-8">
        <p className="text-sm text-graphite">
          Returns run 30 days from delivery. Start one by writing to{" "}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="text-ink underline decoration-hairline underline-offset-4 transition-colors hover:text-accent"
          >
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
      </Reveal>
    </div>
  );
}
