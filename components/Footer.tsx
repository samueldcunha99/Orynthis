import Link from "next/link";
import { MARKETPLACES, products, SHOP } from "@/lib/products";
import { Wordmark } from "./Mark";
import { StoreIcon } from "./StoreIcon";
export function Footer() {
  return <footer className="store-footer"><div className="shell">
    <div className="footer-main">
      <div className="footer-brand"><Link href="/" className="store-wordmark" aria-label="Orynthis home"><Wordmark /></Link><p>Thoughtfully designed essentials that bring a little more possibility to your everyday.</p><Link className="footer-help" href="/contact">Here to help you choose <StoreIcon name="arrow" /></Link></div>
      <div className="footer-column"><h3>Discover</h3><ul>{products.map(p => <li key={p.handle}><Link href={`/products/${p.handle}`}>{p.name}</Link></li>)}</ul></div>
      <div className="footer-column"><h3>We’re here for you</h3><ul><li><Link href="/contact">Contact & support</Link></li><li><Link href="/track">Track your order</Link></li><li><Link href="/#technology">The Orynthis difference</Link></li><li><Link href="/story/air-ultra-6-in-1">Explore AirUltra</Link></li><li><a href={`${SHOP}/policies/refund-policy`}>Returns & refunds</a></li></ul></div>
      <div className="footer-column"><h3>Shop your way</h3><ul>{MARKETPLACES.map(m => <li key={m.name}><a href={m.href} target="_blank" rel="noreferrer">{m.name} ↗<span className="sr-only"> (opens in a new tab)</span></a></li>)}<li>Free delivery across India</li><li>1-year product warranty</li></ul></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Orynthis. All rights reserved.</span><div className="flex flex-wrap gap-6"><a href={`${SHOP}/policies/privacy-policy`}>Privacy policy</a><a href={`${SHOP}/policies/terms-of-service`}>Terms of service</a><span>India · INR ₹</span></div></div>
  </div></footer>;
}
