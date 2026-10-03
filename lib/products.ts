export type Spec = { label: string; value: string };

export type Product = {
  handle: string;
  name: string;
  series: string;
  category: "Hair" | "Wearable" | "Kitchen" | "Audio" | "Accessory";
  /** One line. What the thing is, in the buyer's words, not the spec sheet's. */
  line: string;
  /** Fallback price, used only until Shopify answers — see lib/shopify.ts.
      null until the product is priced on the store, which renders
      "price on request". */
  price: number | null;
  compareAt: number | null;
  /** Shopify variant id. null means not listed yet, so it cannot be checked
      out. Overwritten by the live variant id once the Storefront API is
      wired, so a re-published product does not need a code change. */
  variantId: string | null;
  /** The handle this product has ON SHOPIFY, which is not the handle it has
      here. Shopify's are the long keyword strings the marketplace listings
      were written for; ours are short because they are URLs people read.
      This is the join key for the live merge — absent means the product is
      not on Shopify at all and stays entirely editorial. */
  shopifyHandle?: string;
  /** Live stock, from Shopify. Absent means nobody has asked Shopify yet, and
      an unknown stock level is treated as in stock — the checkout is the one
      that gets the final say either way. */
  available?: boolean;
  images: string[];
  /** The claim the product is actually built on. */
  thesis: string;
  body: string;
  features: { title: string; text: string }[];
  specs: Spec[];
  reviews: { count: number; stars: number } | null;
};

export const products: Product[] = [
  {
    handle: "air-ultra-pro",
    name: "Air Ultra Pro",
    series: "Series 5",
    category: "Hair",
    line: "Five attachments. One column of moving air.",
    price: 7499,
    compareAt: 15000,
    variantId: "58513360814161",
    shopifyHandle:
      "air-ultra-pro-series-5-in-1-hair-styling-system-with-bldc-digital-motor-curl-dry-smooth-and-volumize-heat-protective-airflow-home-styling-tool-for-women-and-girls",
    /* The 2026 brand set only. The old marketplace files are dropped: they
       are screenshot-quality composites with the seller's own captions
       burned in and cropped through — -01 had a line of text sliced off at
       the top. m09 leads because it is the one clean device shot. */
    images: [
      "/images/air-ultra-pro-m09.jpeg",
      "/images/air-ultra-pro-m01.jpeg",
      "/images/air-ultra-pro-m02.jpeg",
      "/images/air-ultra-pro-m03.jpeg",
      "/images/air-ultra-pro-m04.jpeg",
      "/images/air-ultra-pro-m05.jpeg",
      "/images/air-ultra-pro-m06.jpeg",
      "/images/air-ultra-pro-m07.jpeg",
      "/images/air-ultra-pro-m08.jpeg",
    ],
    thesis: "Curls formed by airflow, not by a hot plate pressed against your hair.",
    body:
      "A BLDC digital motor drives fast, stable air through five magnetic attachments. Coanda airflow pulls hair onto the barrel and wraps it there, so the shape comes from air pressure rather than scorching heat. Quieter, gentler on the cuticle, and it holds.",
    features: [
      {
        title: "BLDC digital motor",
        text: "Brushless drive holds airflow steady as the load changes, runs quieter than a brushed motor, and lasts longer under daily use.",
      },
      {
        title: "Coanda airflow",
        text: "A fast air stream clings to the barrel surface and draws hair along with it. The curl forms in the airflow, so you can style at a lower temperature.",
      },
      {
        title: "Dual thermal protection",
        text: "Pulse-width heating control plus a second independent cut-off. Heat output stays where you set it instead of drifting mid-style.",
      },
    ],
    specs: [
      { label: "Power", value: "1300 W" },
      { label: "Motor", value: "BLDC digital, brushless" },
      { label: "Attachments", value: "5, magnetic" },
      { label: "Heat modes", value: "High / Medium / Cold" },
      { label: "Speeds", value: "Fast / Medium / Mild" },
      { label: "Cable", value: "Rotating, anti-tangle" },
      { label: "Warranty", value: "1 year" },
    ],
    reviews: { count: 19, stars: 5 },
  },
  {
    handle: "air-ultra-6-in-1",
    name: "AirUltra 6-in-1",
    series: "Multi-Styler",
    category: "Hair",
    line: "Six attachments, ionic airflow, one handle.",
    price: 3999,
    compareAt: 11999,
    variantId: "58473003024465",
    shopifyHandle:
      "6-in-1-multi-styler-hair-styling-tools-interchangeable-volumizer-secador-de-cabelo-hot-air-brush-blow-brush-hair-dryer",
    /* Brand set only, same reasoning as the Pro. m08 and m07 lead — they are
       the two clean white shots of the handle with every attachment laid
       out, which is what a card thumbnail needs to be legible. */
    images: [
      "/images/air-ultra-6-in-1-m08.jpeg",
      "/images/air-ultra-6-in-1-m07.jpeg",
      "/images/air-ultra-6-in-1-m01.jpeg",
      "/images/air-ultra-6-in-1-m02.jpeg",
      "/images/air-ultra-6-in-1-m03.jpeg",
      "/images/air-ultra-6-in-1-m04.jpeg",
      "/images/air-ultra-6-in-1-m05.jpeg",
      "/images/air-ultra-6-in-1-m06.jpeg",
      "/images/air-ultra-6-in-1-m09.jpeg",
      "/images/air-ultra-6-in-1-m10.jpeg",
      "/images/air-ultra-6-in-1-m11.jpeg",
      "/images/air-ultra-6-in-1-m12.jpeg",
      "/images/air-ultra-6-in-1-m13.jpeg",
      "/images/air-ultra-6-in-1-m14.jpeg",
      "/images/air-ultra-6-in-1-m15.jpeg",
    ],
    thesis: "The whole drawer of styling tools, reduced to one handle and six heads.",
    body:
      "Six heads off one 1000 W handle: a curling wand and a hot air brush for shape, a paddle brush that straightens, a round brush that lifts, and a dryer with its own nozzle and diffuser. Heads pull off and push on, so the tool changes job mid-style instead of being put down. Ionic airflow runs behind all of it, which is what keeps the finish flat rather than frizzed.",
    features: [
      {
        title: "Ionic technology",
        text: "Ions counter the static that lifts the cuticle, so hair leaves the handle smooth and reflective rather than charged and fluffy.",
      },
      {
        title: "Detachable head system",
        text: "Six heads share one mount and swap without tools, so straightening, curling, volumising and drying all happen in a single pass at the mirror.",
      },
      {
        title: "Three heat settings",
        text: "Heat and speed adjust separately, so fine hair gets a gentler pass and thick hair gets the power to actually finish.",
      },
    ],
    // Straight from the ORYNTHIS Amazon listing. Airflow speed and per-setting
    // temperatures are not published there — do not restate them until the
    // spec sheet confirms them.
    specs: [
      { label: "Power", value: "1000 W" },
      { label: "Attachments", value: "6, interchangeable" },
      { label: "Heat settings", value: "3, with adjustable speed" },
      { label: "Technology", value: "Ionic" },
      { label: "Material", value: "ABS, ceramic coating, nylon bristles" },
      { label: "Power source", value: "Corded, 220–240 V" },
      { label: "Warranty", value: "1 year" },
    ],
    reviews: { count: 53, stars: 3.6 },
  },
  {
    handle: "air-vision-ai",
    name: "Air Vision AI",
    series: "Smart Glasses",
    category: "Wearable",
    line: "An 8MP camera, open-ear audio, and an assistant that answers.",
    price: 7999,
    compareAt: 12000,
    variantId: "58472968978513",
    shopifyHandle:
      "air-vision-ai-smart-glasses-with-8mp-hd-camera-for-hands-free-photo-and-video-ai-voice-assistant-object-recognition-bluetooth-5-3-dual-mic-noise-reduction-smart-wearable-for-daily-use",
    images: [
      "/images/air-vision-ai-01.webp",
      "/images/air-vision-ai-02.webp",
      "/images/air-vision-ai-03.webp",
      "/images/air-vision-ai-04.webp",
      "/images/air-vision-ai-05.webp",
    ],
    thesis: "Record it and ask about it without reaching for a phone.",
    body:
      "One touch records what you are looking at, from where you are looking at it. Speak to the assistant for a translation, a landmark, or what is on the shelf in front of you. Open-ear drivers leave your ears uncovered, so traffic and conversation still get through.",
    features: [
      {
        title: "First-person capture",
        text: "An 8MP camera at eye level records the moment as you saw it, with both hands still free to be in it.",
      },
      {
        title: "Voice-activated assistant",
        text: "Ask out loud for a live translation, an object identified, or a landmark explained. The answer comes back through the arms.",
      },
      {
        title: "Open-ear Hi-Fi audio",
        text: "Sound reaches you without sealing your ears shut. Dual-mic ENC strips wind and street noise out of calls.",
      },
    ],
    specs: [
      { label: "Camera", value: "8 MP HD" },
      { label: "Bluetooth", value: "5.3" },
      { label: "Microphones", value: "Dual, ENC noise reduction" },
      { label: "Playback", value: "Up to 12 hours" },
      { label: "Lenses", value: "Detachable" },
      { label: "Warranty", value: "1 year" },
    ],
    reviews: null,
  },
  {
    handle: "rockbox-vintage",
    // Sold as Rockbox Vintage; the spec sheet and the listing copy both still
    // call the unit M18, which is the model number behind the retail name.
    name: "Rockbox Vintage",
    series: "M18 · Bluetooth Speaker",
    category: "Audio",
    line: "Bass and treble on their own dials, no app in the way.",
    price: 3799,
    compareAt: 7999,
    variantId: null,
    images: ["/images/rockbox-vintage-01.webp"],
    thesis: "Three knobs on the top plate, and nothing to install.",
    body:
      "A two-way crossover splits the signal so the tweeter and the woofer each do one job instead of one driver doing both badly. Bass, volume and treble get their own dials, so tuning it means turning something rather than hunting through an app. Bluetooth 5.3, USB and AUX all go in, and the battery runs it away from a socket.",
    features: [
      {
        title: "Knobs, not menus",
        text: "Bass, volume and treble sit on the top plate as separate dials. Nothing to install, nothing to pair with, no remote to lose.",
      },
      {
        title: "Two-way crossover",
        text: "The signal is split before it reaches the drivers, so highs and lows are handled separately rather than fighting for one cone.",
      },
      {
        title: "Off the socket when it needs to be",
        text: "The built-in battery runs it for three to five hours and recharges over DC 5V. A built-in microphone handles calls and karaoke.",
      },
    ],
    specs: [
      { label: "Output power", value: "10–30 W (30 W maximum)" },
      { label: "Drivers", value: "Two-way, with crossover" },
      { label: "Audio mode", value: "Stereo" },
      { label: "Bluetooth", value: "5.3" },
      { label: "Other inputs", value: "USB, AUX 3.5 mm" },
      { label: "Placement", value: "Shelf mount" },
      { label: "Controls", value: "Bass, volume, treble dials" },
      { label: "Battery", value: "1000–2000 mAh" },
      { label: "Playtime", value: "3–5 hours" },
      { label: "Charging", value: "1–3 hours, DC 5V" },
      { label: "Microphone", value: "Built in" },
      { label: "Cabinet", value: "ABS" },
      { label: "Warranty", value: "1 year" },
    ],
    reviews: null,
  },
  {
    handle: "mojo",
    name: "Mojo",
    series: "Portable Speaker",
    category: "Audio",
    line: "Ten watts, eight hours, and it fits in one hand.",
    price: 2499,
    compareAt: 4999,
    variantId: null,
    // Black leads, cream second — the two colourways share one listing
    // because they share every spec.
    images: [
      "/images/mojo-01.webp",
      "/images/mojo-02.webp",
      "/images/mojo-03.webp",
      "/images/mojo-04.webp",
      "/images/mojo-05.webp",
      "/images/mojo-06.webp",
      "/images/mojo-07.webp",
      "/images/mojo-08.webp",
    ],
    thesis: "The one you actually take with you, because it fits in a hand.",
    body:
      "The Rockbox stays on a shelf. This one clips to a backpack strap. Ten centimetres square and four deep, a single dynamic driver pushing 10 W, and eight hours between charges — long enough that it comes back with you rather than needing a socket halfway through the day. It comes in black and brass, and in cream, and the two are the same speaker.",
    features: [
      {
        title: "Eight hours, USB-C",
        text: "A full day of playback on one charge, topped up from the same cable as your phone. No proprietary brick to keep track of.",
      },
      {
        title: "Ten centimetres square",
        text: "10 × 10 × 4.3 cm and around 360 g, with a loop on the corner. It travels clipped to a bag rather than taking up room inside one.",
      },
      {
        title: "Hands-free calling",
        text: "A built-in microphone takes calls without reaching for the phone, and the corner strap loop clips it to a bag while it does.",
      },
    ],
    // From the ORYNTHIS listings. Two things there disagree with themselves:
    // the cream colourway's spec table claims 30 W stereo, which is the
    // Rockbox's figure pasted across, and one bullet claims 17 hours against
    // "up to 8" in both titles. The conservative figure is used in each case.
    // Hands-free calling comes from the brand's own product imagery rather
    // than the listing bullets. No IP rating is published — do not add one.
    specs: [
      { label: "Output power", value: "10 W maximum" },
      { label: "Driver", value: "Single dynamic" },
      { label: "Audio mode", value: "Mono" },
      { label: "Frequency response", value: "From 75 Hz" },
      { label: "Bluetooth", value: "Range up to 10 m" },
      { label: "Playtime", value: "Up to 8 hours" },
      { label: "Charging", value: "USB-C" },
      { label: "Size", value: "10 × 10 × 4.3 cm, approx. 360 g" },
      { label: "Colourways", value: "Black and brass, cream" },
      { label: "In the box", value: "Speaker, USB-C cable, manual" },
      { label: "Warranty", value: "1 year" },
    ],
    reviews: null,
  },
  {
    handle: "styler-travel-case",
    // The marketplace listing sells it on Dyson Airwrap compatibility. That
    // is their trademark, so on our own storefront it is described by what it
    // holds — a styler and its heads — not by whose styler.
    name: "Travel Case",
    series: "Styler Storage",
    category: "Accessory",
    line: "A handle, a hook, and room for every head.",
    price: 999,
    compareAt: 2999,
    variantId: null,
    images: [
      "/images/styler-travel-case-01.webp",
      "/images/styler-travel-case-02.webp",
    ],
    thesis: "Somewhere for the attachments to live that is not the box they came in.",
    body:
      "A styler comes with more heads than anywhere sensible to keep them. This is a padded fabric case sized for the handle and its attachments, with a divided base so barrels and brushes are not loose against each other, a zipped mesh lid pocket for cables and clips, and a hook so the whole thing hangs on the back of a door instead of taking a shelf.",
    features: [
      {
        title: "Divided base",
        text: "Sections sized for the handle, the barrels and the brushes, so nothing rattles loose in transit or gets scratched against the next thing.",
      },
      {
        title: "Hanging hook",
        text: "Folds out to hang in a wardrobe, a bathroom or a dressing area, which keeps the counter clear and the attachments together.",
      },
      {
        title: "Fabric, not bulk",
        text: "Structured enough to hold shape in a suitcase, light enough that packing it costs nothing in allowance.",
      },
    ],
    specs: [
      { label: "Material", value: "Fabric, padded" },
      { label: "Closure", value: "Zip, full length" },
      { label: "Interior", value: "Divided base, zipped mesh lid pocket" },
      { label: "Carry", value: "Top handle and hanging hook" },
      { label: "Colour", value: "Blue" },
      { label: "Care", value: "Wipe with a dry or damp cloth, do not machine wash" },
    ],
    reviews: { count: 1, stars: 3 },
  },
];

export const byHandle = (h: string) => products.find((p) => p.handle === h);

export const inr = (n: number) =>
  "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

/** Five glyphs always, so 3.6 reads as a rating out of 5 rather than as
    "three" — `"★".repeat(3.6)` silently truncates. Only ★ and ☆, since the
    Latin font subsets have no half-star glyph to fall back on. The exact
    figure goes next to it, which is what the half-star would have said. */
export const stars = (n: number) =>
  "★".repeat(Math.round(n)) + "☆".repeat(5 - Math.round(n));

export const discount = (p: Product) =>
  p.compareAt && p.price ? Math.round((1 - p.price / p.compareAt) * 100) : 0;

/** A product can only be bought once it has a price and a Shopify variant,
    and only while Shopify still says it is in stock. Every buy path goes
    through here — card, product page, cart — so the sold-out case is handled
    once rather than at each button. */
export const isBuyable = (p: Product): boolean =>
  p.price !== null && p.variantId !== null && p.available !== false;

/**
 * Two origins, because going headless splits them.
 *
 * SITE is this front end — canonical URLs, the sitemap, schema.org. SHOP is
 * Shopify, which still owns checkout, customer accounts and the policy pages.
 * Today they are the same host, so SHOP defaults to SITE and nothing changes.
 * When orynthis.com is repointed at Vercel and Shopify moves to a subdomain,
 * setting NEXT_PUBLIC_SHOP_URL is the whole migration for this file.
 */
export const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://orynthis.com";
export const SHOP = process.env.NEXT_PUBLIC_SHOP_URL ?? SITE;

/** Where most of the volume actually goes.
    The Amazon URL is the brand store with its click-attribution parameters
    stripped: `store_ref=bl_ast_dp_brandlogo_sto` means "brand logo clicked
    from a detail page", which is not what happened when someone arrives from
    here, and leaving it in would misreport the source in Amazon's own
    analytics.
    Flipkart has no brand store, so that link is the one listing they have. */
export const MARKETPLACES = [
  {
    name: "Amazon",
    label: "the full range",
    href: "https://www.amazon.in/stores/ORYNTHIS/page/BA447BB3-47C8-4AD1-8EA5-1AA28717A445",
  },
  {
    name: "Flipkart",
    label: "Air Ultra Pro 6-in-1",
    href: "https://www.flipkart.com/orynthis-air-ultra-pro-6-in-1-multi-styler-bldc-digital-motor-cosmetic-bag-electric-hair-styler/p/itm4bb87dd8e823b",
  },
];

/** Shopify cart permalink — sends a real basket to the real checkout. */
export const checkoutUrl = (items: { variantId: string; qty: number }[]) =>
  `${SHOP}/cart/${items.map((i) => `${i.variantId}:${i.qty}`).join(",")}`;

/**
 * Hero rotation. One slide per product, each led by what that product actually
 * does rather than by a discount. The first four images are locally cropped to
 * 1.425 (see public/brand/) because every catalogue photo for those has
 * marketing text burned into it — these windows are the parts that do not. The
 * rest reuse the catalogue shot, so the hero frame contains rather than crops.
 *
 * Order is the order of the thumbnail rail under the hero.
 */
export type HeroSlide = {
  handle: string;
  headline: [string, string];
  copy: string;
  image: string;
  /** Thumbnail for the switcher rail, when the hero image does not survive
      being shrunk to 160px. The campaign graphics are the case in point:
      they carry the argument at full size and read as noise at thumbnail
      size, next to five clean product shots. Defaults to `image`. */
  thumb?: string;
  stats: { v: string; u: string; k: string }[];
};

export const heroSlides: HeroSlide[] = [
  {
    handle: "air-ultra-pro",
    headline: ["Air does", "the work"],
    copy: "Fast air clings to the barrel, catches the hair and wraps it there. The curl is formed by pressure, not by a hot plate held against your head.",
    // 2026 brand set. 1.500 against the hero frame's 1.426, so it fills
    // the panel with only a hairline of letterbox.
    image: "/images/air-ultra-pro-m01.jpeg",
    thumb: "/brand/hero-air-ultra-pro.webp",
    stats: [
      { v: "1300", u: "W", k: "BLDC motor" },
      { v: "5", u: "heads", k: "Magnetic" },
      { v: "3", u: "modes", k: "Heat control" },
      { v: "1", u: "year", k: "Warranty" },
    ],
  },
  {
    handle: "air-vision-ai",
    headline: ["Eyes up,", "hands free"],
    copy: "An 8MP camera at eye level records what you are actually looking at. Ask the assistant out loud and the answer comes back through the arms.",
    image: "/brand/hero-air-vision.webp",
    stats: [
      { v: "8", u: "MP", k: "Eye-level camera" },
      { v: "12", u: "hrs", k: "Playback" },
      { v: "5.3", u: "BT", k: "Dual-mic ENC" },
      { v: "1", u: "year", k: "Warranty" },
    ],
  },
  {
    handle: "air-ultra-6-in-1",
    headline: ["Six tools,", "one handle"],
    copy: "Auto-wrap barrels coil a section on their own. A round brush builds volume, a flat one pulls it straight, and a 1000 W core moves the air behind both.",
    image: "/images/air-ultra-6-in-1-m09.jpeg",
    thumb: "/brand/hero-air-ultra-6-in-1.webp",
    stats: [
      { v: "12.5", u: "m/s", k: "Airflow" },
      { v: "1000", u: "W", k: "Dryer core" },
      { v: "6", u: "heads", k: "Interchangeable" },
      { v: "3", u: "levels", k: "Measured heat" },
    ],
  },
  {
    handle: "rockbox-vintage",
    headline: ["Three knobs,", "no app"],
    copy: "Bass, volume and treble sit on the top plate as separate dials. A two-way crossover splits the signal first, so the tweeter and the woofer each do one job instead of one cone doing both badly.",
    image: "/images/rockbox-vintage-01.webp",
    stats: [
      { v: "30", u: "W", k: "Maximum output" },
      { v: "2", u: "way", k: "Driver crossover" },
      { v: "5", u: "hrs", k: "Off the socket" },
      { v: "3", u: "dials", k: "Bass, volume, treble" },
    ],
  },
  {
    handle: "mojo",
    headline: ["Ten watts,", "one hand"],
    copy: "Ten centimetres square and 360 grams, with a loop on the corner. Eight hours between charges, topped up from the same cable as your phone.",
    image: "/images/mojo-01.webp",
    stats: [
      { v: "10", u: "W", k: "Output power" },
      { v: "8", u: "hrs", k: "Playtime" },
      { v: "360", u: "g", k: "Carry weight" },
      { v: "10", u: "cm", k: "Square footprint" },
    ],
  },
  {
    handle: "styler-travel-case",
    headline: ["Every head,", "one case"],
    copy: "A divided base sized for the handle, the barrels and the brushes. A zipped mesh pocket takes the cables, and a fold-out hook hangs the whole thing off a door instead of a shelf.",
    image: "/images/styler-travel-case-01.webp",
    stats: [
      { v: "3", u: "zones", k: "Divided base" },
      { v: "1", u: "pocket", k: "Zipped mesh lid" },
      { v: "1", u: "hook", k: "Folds out to hang" },
      { v: "67", u: "%", k: "Off list price" },
    ],
  },
];
