import Link from "next/link";
import { products, STORE } from "@/lib/products";
import { Mark } from "./Mark";

const policies = [
  { href: `${STORE}/policies/privacy-policy`, label: "Privacy policy" },
  { href: `${STORE}/policies/refund-policy`, label: "Refund policy" },
  { href: `${STORE}/policies/terms-of-service`, label: "Terms of service" },
];

export function Footer() {
  return (
    <footer className="on-ink bg-ink text-paper-alt">
      <div className="shell">
        {/* Newsletter — one field, one job, honest about what arrives. */}
        <div className="rule-b grid gap-8 py-16 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <h2 className="t-display text-[clamp(2rem,6vw,3.75rem)]">
              Get there first
            </h2>
            <p className="mt-3 max-w-[42ch] text-sm text-graphite">
              New instruments and restocks, sent when there is something to send.
              No countdown timers.
            </p>
          </div>

          <form
            action={`${STORE}#footer-newsletter`}
            method="post"
            className="flex w-full max-w-md items-center gap-0 border-b border-hairline-dark focus-within:border-accent"
          >
            <label htmlFor="footer-email" className="sr-only">
              Email address
            </label>
            <input
              id="footer-email"
              name="contact[email]"
              type="email"
              required
              placeholder="you@email.com"
              className="t-data flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-graphite"
            />
            <button type="submit" className="t-label px-2 py-3 hover:text-accent">
              Sign up
            </button>
          </form>
        </div>

        {/* Link columns */}
        <div className="rule-b grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="t-label text-graphite">The range</p>
            <ul className="mt-4 space-y-2.5">
              {products.map((p) => (
                <li key={p.handle}>
                  <Link
                    href={`/products/${p.handle}`}
                    className="text-sm transition-colors hover:text-accent"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="t-label text-graphite">Support</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/track" className="transition-colors hover:text-accent">
                  Track an order
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-accent">
                  Contact us
                </Link>
              </li>
              <li>
                <Link href="/#technology" className="transition-colors hover:text-accent">
                  How Coanda styling works
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="t-label text-graphite">Policies</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {policies.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition-colors hover:text-accent">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="t-label text-graphite">Also available on</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>Amazon India</li>
              <li>Flipkart</li>
            </ul>
            <p className="mt-6 text-sm text-graphite">
              Ships across India. Cash on delivery available.
            </p>
          </div>
        </div>

        {/* The mark at scale — the last thing you see. */}
        <div className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Mark className="h-8 w-8 shrink-0" />
            <span
              className="t-display text-[clamp(1.75rem,7vw,4rem)] leading-none"
              style={{ letterSpacing: "0.04em" }}
            >
              Orynthis
            </span>
          </div>
          <p className="t-label text-graphite">
            © {new Date().getFullYear()} Orynthis
          </p>
        </div>
      </div>
    </footer>
  );
}
