"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { byHandle, checkoutUrl, inr, products } from "@/lib/products";

type Line = { handle: string; qty: number };

type CartApi = {
  lines: Line[];
  count: number;
  subtotal: number;
  add: (handle: string, qty?: number) => void;
  setQty: (handle: string, qty: number) => void;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const Ctx = createContext<CartApi | null>(null);
const KEY = "orynthis.cart";

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside <CartProvider>");
  return c;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [open, setOpen] = useState(false);

  // Hydrate from storage after mount. It has to be an effect: the server has no
  // localStorage, so reading it during render would desync the markup. The
  // set-state-in-effect rule does not cover this SSR-hydration case.
  // localStorage also throws in some private modes — a missing cart is not a crash.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setLines(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {}
  }, [lines]);

  // Escape closes the drawer; body scroll locks while it is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const add = (handle: string, qty = 1) => {
    setLines((prev) => {
      const hit = prev.find((l) => l.handle === handle);
      return hit
        ? prev.map((l) => (l.handle === handle ? { ...l, qty: l.qty + qty } : l))
        : [...prev, { handle, qty }];
    });
    setOpen(true);
  };

  const setQty = (handle: string, qty: number) =>
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.handle !== handle)
        : prev.map((l) => (l.handle === handle ? { ...l, qty } : l)),
    );

  const count = lines.reduce((n, l) => n + l.qty, 0);
  const subtotal = lines.reduce(
    (n, l) => n + (byHandle(l.handle)?.price ?? 0) * l.qty,
    0,
  );

  return (
    <Ctx.Provider value={{ lines, count, subtotal, add, setQty, open, setOpen }}>
      {children}
      <Drawer />
    </Ctx.Provider>
  );
}

function Drawer() {
  const { lines, subtotal, setQty, open, setOpen } = useCart();

  const href = checkoutUrl(
    lines.flatMap((l) => {
      const p = byHandle(l.handle);
      // Unlisted products have no variant, so they cannot be part of a checkout.
      return p?.variantId ? [{ variantId: p.variantId, qty: l.qty }] : [];
    }),
  );

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        aria-hidden={!open}
        className={`fixed inset-0 z-50 bg-ink/45 transition-opacity duration-400 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        aria-label="Cart"
        aria-hidden={!open}
        // aria-hidden hides it from screen readers, but the drawer is only
        // translated off-screen — without inert its buttons stay tabbable.
        inert={!open}
        className={`on-ink fixed top-0 right-0 z-50 flex h-dvh w-full max-w-[27rem] flex-col bg-ink text-paper-alt transition-transform duration-500 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
      >
        <header className="rule-b flex items-center justify-between px-6 py-5">
          <span className="t-label">
            Cart <span className="text-graphite">/ {lines.length}</span>
          </span>
          <button
            onClick={() => setOpen(false)}
            className="t-label text-graphite transition-colors hover:text-paper-alt"
          >
            Close
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
            <p className="t-display-tight text-xl">Nothing here yet</p>
            <p className="max-w-[22ch] text-sm text-graphite">
              A short range of instruments, built to be used daily. Start there.
            </p>
            <Link
              href="/catalog"
              onClick={() => setOpen(false)}
              className="btn btn-line text-paper-alt"
            >
              <span>Browse the range</span>
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto">
              {lines.map((l) => {
                const p = byHandle(l.handle);
                if (!p) return null;
                return (
                  <li key={l.handle} className="rule-b flex gap-4 px-6 py-5">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden bg-paper-alt">
                      {p.images[0] && (
                        <Image
                          src={p.images[0]}
                          alt=""
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="t-display-tight text-[0.95rem]">{p.name}</p>
                      <p className="t-label mt-1 text-graphite">{p.series}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <Qty value={l.qty} onChange={(v) => setQty(l.handle, v)} />
                        <span className="t-data text-sm">
                          {inr((p.price ?? 0) * l.qty)}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <footer className="rule-t px-6 py-5">
              <div className="flex items-baseline justify-between">
                <span className="t-label text-graphite">Subtotal</span>
                <span className="t-data text-xl">{inr(subtotal)}</span>
              </div>
              <p className="t-label mt-2 text-graphite">
                Free shipping · Pan India
              </p>
              <a href={href} className="btn btn-accent mt-5 w-full">
                <span>Checkout</span>
              </a>
              <p className="mt-3 text-center text-[0.6875rem] text-graphite">
                Payment is handled by Shopify on orynthis.com
              </p>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}

function Qty({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center border border-hairline-dark">
      <button
        onClick={() => onChange(value - 1)}
        aria-label="Remove one"
        className="px-2.5 py-1 text-graphite transition-colors hover:text-paper-alt"
      >
        −
      </button>
      <span className="t-data w-7 text-center text-xs">{value}</span>
      <button
        onClick={() => onChange(value + 1)}
        aria-label="Add one"
        className="px-2.5 py-1 text-graphite transition-colors hover:text-paper-alt"
      >
        +
      </button>
    </div>
  );
}

/** Add-to-cart button, used on cards and on the product page. */
export function AddButton({
  handle,
  className = "btn btn-ink w-full",
  label = "Add to cart",
}: {
  handle: string;
  className?: string;
  label?: string;
}) {
  const { add } = useCart();
  const name = products.find((p) => p.handle === handle)?.name ?? "item";
  return (
    <button
      onClick={() => add(handle)}
      className={className}
      aria-label={`Add ${name} to cart`}
    >
      <span>{label}</span>
    </button>
  );
}
