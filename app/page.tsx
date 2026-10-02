import Image from "next/image";
import Link from "next/link";
import { FeaturedCollection } from "@/components/FeaturedCollection";
import { StoreIcon, type IconName } from "@/components/StoreIcon";
import { MARKETPLACES, inr } from "@/lib/products";
import { getProducts } from "@/lib/shopify";

const benefits: { icon: IconName; title: string; text: string }[] = [
  { icon: "truck", title: "On its way, on us", text: "Free shipping across India" },
  { icon: "shield", title: "Made to be relied on", text: "1-year product warranty" },
  { icon: "bag", title: "Shop with confidence", text: "Secure Shopify checkout" },
  { icon: "headphones", title: "A little help, whenever", text: "Dedicated customer support" },
];
export default async function Home() {
  const products = await getProducts();
  const heroProduct = products.find(p => p.handle === "air-ultra-pro");
  return <div className="storefront">
    <section className="store-hero">
      <div className="hero-copy">
        <p className="eyebrow"><span className="eyebrow-line" /> BEAUTIFULLY ENGINEERED. EVERY DAY.</p>
        <h1>Good hair.<br />Great days.<br /><em>Effortlessly.</em></h1>
        <p className="hero-description">Meet your new everyday essential. Salon-inspired styling, powered by air. Designed around you.</p>
        <div className="hero-actions"><Link href="/products/air-ultra-pro" className="shop-button">Discover Air Ultra Pro <StoreIcon name="arrow" /></Link><Link href="/catalog?category=Hair" className="text-link">Explore hair styling</Link></div>
        <div className="hero-footnote"><StoreIcon name="shield" /><span>1-year warranty</span><i /><span>Free delivery, always</span></div>
      </div>
      <div className="hero-visual">
        <Image src="/images/air-ultra-pro-package.jpeg" alt="Orynthis Air Ultra Pro multi-styler system with 6 attachments and package" fill priority sizes="(max-width: 760px) 100vw, 55vw" className="hero-photo" />
        <span className="hero-image-label">YOUR EVERYDAY, UPGRADED.</span>
        <Link className="hero-product-label" href="/products/air-ultra-pro"><div><span>MEET THE AIR ULTRA PRO</span><strong>One tool. Endless possibilities.</strong><small>{heroProduct?.price != null ? `Discover it at ${inr(heroProduct.price)}` : "Discover the styling collection"}</small></div><span className="round-arrow"><StoreIcon name="arrow" /></span></Link>
        <div className="hero-caption"><span>01 / THE ART OF EVERYDAY</span><span>ORYNTHIS®</span></div>
      </div>
    </section>
    <section className="benefit-strip" aria-label="Shopping benefits"><div className="shell benefit-grid">{benefits.map(b => <div className="benefit" key={b.title}><StoreIcon name={b.icon} /><div><strong>{b.title}</strong><span>{b.text}</span></div></div>)}</div></section>
    <section className="shell collection-section" id="collection">
      <div className="section-heading"><div><p className="eyebrow">CONSIDERED DESIGN. EVERYDAY DELIGHT.</p><h2>Small upgrades. <em>Big difference.</em></h2></div><Link href="/catalog" className="text-link">Shop the collection <StoreIcon name="arrow" /></Link></div>
      <FeaturedCollection products={products} />
    </section>
    <section className="shell category-section">
      <div className="section-heading"><div><p className="eyebrow">FIND YOUR EVERYDAY</p><h2>A little more <em>you.</em></h2></div><p>For your routine. Your soundtrack. Your point of view.</p></div>
      <div className="category-grid">
        <Link className="category-tile category-hair" href="/catalog?category=Hair"><Image src="/brand/hero-air-ultra-6-in-1.webp" alt="Orynthis multi-styler in use" fill sizes="(max-width:760px) 100vw, 40vw" /><div><span>01 / HAIR STYLING</span><h3>Your good hair era.</h3><p>Dry. Curl. Smooth. Make it yours.</p><span className="category-cta">Find your styler <StoreIcon name="arrow" /></span></div></Link>
        <Link className="category-tile category-kitchen" href="/catalog?category=Kitchen"><Image src="/brand/hero-infranova-3500w.webp" alt="InfraNova 3500W Electric Infrared Cooktop" fill sizes="(max-width:760px) 100vw, 25vw" /><div><span>02 / KITCHEN RANGE</span><h3>Power meets any pan.</h3><p>3500W infrared heating for all cookware.</p><span className="category-cta">Meet InfraNova <StoreIcon name="arrow" /></span></div></Link>
        <Link className="category-tile category-eyewear" href="/catalog?category=Wearable"><Image src="/brand/hero-air-vision.webp" alt="Air Vision AI smart glasses" fill sizes="(max-width:760px) 100vw, 25vw" /><div><span>03 / SMART EYEWEAR</span><h3>A fresh perspective.</h3><span className="category-cta">Meet Air Vision <StoreIcon name="arrow" /></span></div></Link>
        <Link className="category-tile category-audio" href="/catalog?category=Audio"><Image src="/images/rockbox-vintage-01.webp" alt="Rockbox Vintage speaker with brass controls" fill sizes="(max-width:760px) 100vw, 25vw" /><div><span>04 / EVERYDAY AUDIO</span><h3>Set the mood.</h3><span className="category-cta">Find your sound <StoreIcon name="arrow" /></span></div></Link>
      </div>
    </section>
    <section id="technology" className="engineering-section">
      <div className="shell engineering-grid">
        <div className="engineering-visual"><Image src="/story/air-ultra-6-in-1/frames/frame_060.webp" alt="An exploded view of the AirUltra 6-in-1 motor and styling attachments" fill sizes="(max-width:760px) 100vw, 50vw" /><Link href="/story/air-ultra-6-in-1" className="engineering-explore"><StoreIcon name="play" /> Explore the interactive story <StoreIcon name="arrow" /></Link></div>
        <div className="engineering-copy"><p className="eyebrow">THE ORYNTHIS DIFFERENCE</p><h2>A little science.<br /><em>A lot of possibility.</em></h2><p>Great design makes the complicated feel simple. Our air stylers bring drying, curling and smoothing together in one thoughtfully designed tool.</p><div className="engineering-details"><div><strong>Air-powered styling</strong><span>Coanda airflow helps wrap and shape your hair.</span></div><div><strong>One handle. More possibilities.</strong><span>Interchangeable attachments for your changing routine.</span></div></div><Link href="/products/air-ultra-6-in-1" className="text-link">Get to know the AirUltra <StoreIcon name="arrow" /></Link></div>
      </div>
    </section>
    <section className="shell film-section"><div className="film-copy"><p className="eyebrow">A MOMENT FOR YOURSELF</p><h2>Your routine.<br /><em>Reimagined.</em></h2><p>From your first morning meeting to your last evening plan. See the AirUltra in action.</p><Link href="/products/air-ultra-6-in-1#action-film" className="shop-button"><StoreIcon name="play" /> Watch the styling film</Link></div><Link className="film-visual" href="/products/air-ultra-6-in-1#action-film" aria-label="Watch the AirUltra styling film"><Image src="/videos/air-ultra-action-film-poster.webp" alt="See how to style with AirUltra" fill sizes="(max-width:760px) 100vw, 55vw" /><span className="film-play"><StoreIcon name="play" /></span></Link></section>
    <section className="marketplace-strip shell"><div><p className="eyebrow">YOUR BRAND. YOUR WAY TO SHOP.</p><h2>Also at your favourite stores.</h2></div><div className="marketplace-logos">{MARKETPLACES.map(m => <a key={m.name} href={m.href} target="_blank" rel="noreferrer" aria-label={`Shop Orynthis on ${m.name} (opens in a new tab)`}><Image src={`/brand/${m.name.toLowerCase()}.webp`} alt={m.name} width={116} height={42} className="object-contain" /><span aria-hidden="true">↗</span></a>)}</div></section>
  </div>;
}
