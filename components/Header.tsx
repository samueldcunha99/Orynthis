"use client";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "./Cart";
import { Wordmark } from "./Mark";
import { StoreIcon } from "./StoreIcon";

const nav = [
  { href: "/catalog", label: "Shop all" },
  { href: "/catalog?category=Hair", label: "Hair styling" },
  { href: "/catalog?category=Kitchen", label: "Kitchen" },
  { href: "/catalog?category=Wearable", label: "Smart eyewear" },
  { href: "/catalog?category=Audio", label: "Audio" },
  { href: "/#technology", label: "The Orynthis difference" },
];
export function Header() {
  const { count, setOpen } = useCart();
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  return <>
    <div className="announcement"><div className="shell announcement-inner"><span>Thoughtfully designed. Made for your everyday.</span><span><StoreIcon name="truck" /> Free shipping across India</span><Link href="/track">Track your order ↗</Link></div></div>
    <header className="store-header">
      <div className="shell store-nav">
        <Link href="/" aria-label="Orynthis home" onClick={() => { setMenu(false); setSearch(false); }} className="store-wordmark"><Wordmark /></Link>
        <nav aria-label="Main navigation" className="desktop-nav">{nav.map(n => <Link key={n.href} href={n.href}>{n.label}</Link>)}</nav>
        <div className="nav-actions">
          <button className="icon-button" aria-label={search ? "Close search" : "Search products"} aria-expanded={search} aria-controls="store-search" onClick={() => { setSearch(!search); setMenu(false); }}><StoreIcon name={search ? "close" : "search"} /></button>
          <button className="bag-button" onClick={() => setOpen(true)} aria-label={`Shopping bag, ${count} items`}><StoreIcon name="bag" /><span className="bag-label">Bag</span><span className="bag-count">{count}</span></button>
          <button className="icon-button mobile-menu-button" aria-label={menu ? "Close menu" : "Open menu"} aria-expanded={menu} aria-controls="mobile-nav" onClick={() => { setMenu(!menu); setSearch(false); }}><StoreIcon name={menu ? "close" : "menu"} /></button>
        </div>
      </div>
      {search && <form id="store-search" action="/catalog" className="shell header-search"><StoreIcon name="search" /><label className="sr-only" htmlFor="site-search">Search products</label><input id="site-search" name="q" type="search" placeholder="Search stylers, smart glasses, speakers…" autoFocus /><button type="submit" className="shop-button">Search <StoreIcon name="arrow" /></button></form>}
      {menu && <nav id="mobile-nav" aria-label="Mobile navigation" className="mobile-nav">{[...nav, {href: "/contact", label: "Contact & support"}, {href: "/track", label: "Track your order"}].map(n => <Link key={n.href} href={n.href} onClick={() => setMenu(false)}>{n.label}<StoreIcon name="arrow" /></Link>)}</nav>}
    </header>
  </>;
}
