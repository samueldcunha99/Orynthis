"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MARKETPLACES } from "@/lib/products";
import { useCart } from "./Cart";
import { Wordmark } from "./Mark";

const nav = [
  { href: "/catalog", label: "Range" },
  { href: "/#technology", label: "Technology" },
  { href: "/track", label: "Track order" },
  { href: "/contact", label: "Support" },
];

export function Header() {
  const { count, setOpen } = useCart();
  const [menu, setMenu] = useState(false);
  const path = usePathname();

  return (
    <>
      {/* Top strip. Most of the volume goes through the marketplaces, so they
          sit at the very top of every page rather than buried in the footer.
          The standing facts keep the left, the places to buy keep the right. */}
      <div className="on-ink bg-ink text-paper-alt">
        <div className="shell flex min-h-11 flex-wrap items-center justify-center gap-x-4 gap-y-2 py-2 sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="t-label">Free shipping · Pan India</span>
            <span className="hidden h-3 w-px bg-hairline-dark sm:block" />
            <span className="t-label hidden text-graphite sm:block">
              1 year warranty
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="t-label hidden text-graphite sm:block">
              Also buy on
            </span>
            {MARKETPLACES.map((m) => (
              <a
                key={m.name}
                href={m.href}
                target="_blank"
                rel="noreferrer"
                title={`Orynthis on ${m.name} — ${m.label}`}
                className="btn btn-sm btn-line text-paper-alt"
              >
                <span>
                  {m.name}
                  <span className="sr-only"> (opens in a new tab)</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <header className="rule-b sticky top-0 z-40 bg-paper/85 backdrop-blur-md">
        <div className="shell flex h-16 items-center justify-between gap-6">
          <Link href="/" className="text-lg" aria-label="Orynthis — home">
            <Wordmark />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`t-label transition-colors hover:text-accent ${
                  path === n.href ? "text-accent" : "text-ink"
                }`}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <button
              onClick={() => setOpen(true)}
              aria-label={`Cart, ${count} ${count === 1 ? "item" : "items"}`}
              className="t-label transition-colors hover:text-accent"
            >
              Cart
              <span className="t-data ml-1.5 inline-block min-w-[1.4em] bg-ink px-1 py-0.5 text-center text-[0.625rem] text-paper-alt">
                {count}
              </span>
            </button>

            <button
              onClick={() => setMenu((v) => !v)}
              aria-expanded={menu}
              aria-controls="mobile-nav"
              className="t-label md:hidden"
            >
              {menu ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        {menu && (
          <nav id="mobile-nav" className="rule-t bg-paper md:hidden">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setMenu(false)}
                className="rule-b shell t-display-tight block py-4 text-2xl"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}
