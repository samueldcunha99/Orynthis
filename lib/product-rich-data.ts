export interface BoxItem {
  item: string;
  detail: string;
}

export interface ReviewItem {
  name: string;
  city: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export const BOX_CONTENTS: Record<string, BoxItem[]> = {
  "air-ultra-6-in-1": [
    { item: "AirUltra Ergonomic Handle", detail: "1000W digital motor with removable brass filter cage" },
    { item: "3x Air Curling Barrels", detail: "Clockwise & Counter-clockwise Coanda auto-wrap barrels" },
    { item: "Smoothing Paddle Brush", detail: "Ceramic-coated nylon bristles for sleek, straight passes" },
    { item: "Volumizing Oval Brush", detail: "Root lift and multi-directional body" },
    { item: "High-Velocity Blower & Nozzle", detail: "Focused directional pre-drying nozzle" },
    { item: "Styling Diffuser Assembly", detail: "Wide acoustic cup for defined natural waves" },
    { item: "Heat-Resistant Styling Glove", detail: "Double-woven protective hand wear" },
    { item: "Official Warranty Card & Guide", detail: "Serialized 1-Year Pan-India warranty registration" },
  ],
  "air-ultra-pro": [
    { item: "Air Ultra Pro Series 5 Handle", detail: "1300W digital brushless motor in matte gunmetal" },
    { item: "2x Fluted Auto-Wrap Barrels", detail: "Symmetrical left & right aerodynamic Coanda barrels" },
    { item: "Magnetic Concentrator Nozzle", detail: "High-velocity directional styling nozzle" },
    { item: "Hard Retail Travel Case", detail: "Padded custom-molded presentation carrier" },
    { item: "Heat-Resistant Styling Glove", detail: "Double-woven heat barrier glove" },
    { item: "Official Warranty Card & Manual", detail: "Serialized 1-Year Pan-India direct replacement warranty" },
  ],
  "silkcomb-cordless": [
    { item: "Silkcomb Cordless Straightener", detail: "Sky Blue portable brush with real-time digital LCD screen" },
    { item: "Type-C USB Fast Charging Cable", detail: "High-durability braided charging lead" },
    { item: "Protective Travel Pouch", detail: "Heat-resistant portable carry sleeve" },
    { item: "Official 1-Year Warranty Card", detail: "Pan-India replacement warranty registration" },
    { item: "User Manual & Styling Guide", detail: "Temperature guidelines for all hair types" },
  ],
  "air-vision-ai": [
    { item: "Air Vision AI Frame", detail: "Matte titanium-alloy chassis with dual bone-conduction transducers" },
    { item: "Polarized UV400 Lenses", detail: "Anti-glare optical gradient coating" },
    { item: "Smart Power Charging Case", detail: "USB-C fast charging hard shell case" },
    { item: "Magnetic Fast Cable", detail: "Braided high-durability power lead" },
    { item: "Microfiber Optical Cloth", detail: "Precision lint-free cleaning weave" },
  ],
  "rockbox-vintage": [
    { item: "Rockbox Vintage Acoustic Speaker", detail: "Solid timber cabinet with brushed brass knurled controls" },
    { item: "Braided USB-C Power Cable", detail: "High-amperage fast charging cable" },
    { item: "3.5mm Gold-Plated Aux Cable", detail: "Low-loss analog audio lead" },
    { item: "Quick Start Guide & Manual", detail: "Acoustic calibration instructions" },
  ],
  mojo: [
    { item: "Mojo Portable Bluetooth Speaker", detail: "IPX6 weather-resistant acoustic housing" },
    { item: "Braided USB-C Charging Cable", detail: "Tangle-free charging lead" },
    { item: "Integrated Carry Loop", detail: "Reinforced woven strap" },
  ],
  "styler-travel-case": [
    { item: "Orynthis Multi-Styler Hard Case", detail: "Molded EVA shock-resistant shell with magnetic clasp" },
    { item: "Velvet Internal Partitions", detail: "Custom organizer compartments for handle and 6 heads" },
  ],
  "infranova-3500w": [
    { item: "InfraNova 3500W Cooktop", detail: "Brushed stainless-steel body with crystal glass deck & side grab handles" },
    { item: "Heavy-Duty 1.2m Power Cord", detail: "Molded Indian 3-pin plug (16A high-current rating)" },
    { item: "Cookware Compatibility Guide", detail: "Illustrated flat-bottom utensil pairing reference" },
    { item: "Official 2-Year Warranty Card", detail: "Pan-India authorized service and replacement registration" },
    { item: "User Manual & Culinary Chart", detail: "Temperature guidelines for Stir Fry, BBQ, Hot Pot and Soup modes" },
  ],
};

export const REVIEWS_DATA: Record<string, ReviewItem[]> = {
  "air-ultra-6-in-1": [
    {
      name: "Pooja Sharma",
      city: "Mumbai",
      rating: 5,
      date: "14 Sep 2026",
      title: "Replaced my entire drawer of styling wands",
      comment:
        "The Coanda airflow really works! My hair wraps around the barrel automatically without awkwardly twisting my wrist. It never gets scorching hot like traditional irons, and my curls lasted through a full wedding reception without stiff hairspray.",
    },
    {
      name: "Ananya Deshmukh",
      city: "Bengaluru",
      rating: 5,
      date: "28 Aug 2026",
      title: "Cuts morning prep time in half",
      comment:
        "Drying and smoothing in a single pass saves me at least 25 minutes every morning. The diffuser head is fantastic on naturally wavy hair. Build quality and bronze finish feel luxury-grade.",
    },
    {
      name: "Rhea Sen",
      city: "Delhi NCR",
      rating: 5,
      date: "03 Aug 2026",
      title: "Zero burned smell, shiny and soft finish",
      comment:
        "I was tired of burning my hair ends with ceramic straighteners. With AirUltra, heat stays consistent and safe. My hair feels noticeably softer and holds its shape all day.",
    },
  ],
  "air-ultra-pro": [
    {
      name: "Dr. Malini Iyer",
      city: "Chennai",
      rating: 5,
      date: "19 Sep 2026",
      title: "Salon-grade power at 1300W",
      comment:
        "The brushless BLDC motor has serious torque. Pre-drying takes barely 4 minutes, and the auto-wrap fluted barrels form curls effortlessly. Worth every rupee compared to international competitors costing triple.",
    },
    {
      name: "Kavita Rao",
      city: "Hyderabad",
      rating: 5,
      date: "02 Sep 2026",
      title: "Magnetic snap-lock is effortless",
      comment:
        "Swapping heads mid-style with one hand is seamless. The gunmetal finish looks gorgeous on my vanity, and the included travel case keeps everything organized.",
    },
  ],
  "silkcomb-cordless": [
    {
      name: "Sneha Nair",
      city: "Bengaluru",
      rating: 5,
      date: "28 Sep 2026",
      title: "Game changer for office and travel touch-ups",
      comment:
        "No cords, charges quickly with my phone charger, and heats up in seconds. The LCD display lets me pick 180°C for my fine hair. Leaves it super shiny and frizz-free!",
    },
    {
      name: "Tanvi Verma",
      city: "Delhi",
      rating: 4,
      date: "22 Sep 2026",
      title: "Compact, safe and really convenient",
      comment:
        "Fits right into my daily tote bag. The anti-scald bristles give peace of mind when doing roots and bangs. Battery lasts through multiple styling sessions easily.",
    },
  ],
  "infranova-3500w": [
    {
      name: "Vikram Singhania",
      city: "Pune",
      rating: 5,
      date: "26 Sep 2026",
      title: "Huge upgrade over standard induction — works with my copper and aluminium kadhais!",
      comment:
        "The best part is not needing special induction-bottom pans. My traditional brass and cast iron kadhais work instantly. Boils 2 litres of water in practically no time at 3500W. Touch controls and rotary knob are very tactile and responsive.",
    },
    {
      name: "Meera Patel",
      city: "Ahmedabad",
      rating: 4,
      date: "18 Sep 2026",
      title: "Serious heating power, sleek crystal glass",
      comment:
        "Looks premium on our granite countertop with the steel handles. The glass wipes clean easily with a damp microfiber cloth after cooking. Very sturdy build that easily supports our heavy pressure cookers.",
    },
    {
      name: "Arjun Nambiar",
      city: "Kochi",
      rating: 4,
      date: "05 Sep 2026",
      title: "Great temperature control for daily cooking",
      comment:
        "Preset modes for soup and stir fry make it effortless. Fan runs quietly and keeps the base cool even during 45-minute continuous cooking sessions. 2-year warranty gives extra peace of mind.",
    },
  ],
};

export const PRODUCT_FAQS: Record<string, FaqItem[]> = {
  "infranova-3500w": [
    {
      q: "How is an infrared cooktop different from an induction cooktop?",
      a: "Traditional induction cooktops use electromagnetic coils that only heat ferrous magnetic metal pans (like magnetic stainless steel or cast iron). InfraNova uses high-energy far-infrared radiant heating, allowing it to heat ALL flat-bottom cookware including aluminium, copper, glass, ceramic, and regular stainless steel.",
    },
    {
      q: "Can I use heavy pans and pressure cookers on the crystal glass top?",
      a: "Yes. The InfraNova is constructed with high-strength tempered crystal glass and an internal reinforced chassis designed to support heavy utensils and pressure cookers up to 25 kg.",
    },
    {
      q: "Does it require a special electrical socket?",
      a: "Because the cooktop reaches a peak power of 3500W for rapid heating, it is fitted with a standard Indian 16-Amp power plug. We recommend plugging it into a dedicated 16A power socket (like those used for geysers or microwaves).",
    },
    {
      q: "How does the cooling system work after cooking?",
      a: "When you switch off the cooktop, the internal high-speed cooling fan continues to run automatically for a brief period to safely dissipate internal residual heat until temperatures normalize.",
    },
    {
      q: "How does the 2-Year Warranty work?",
      a: "The InfraNova 3500W includes a full 2-year brand warranty covering the heating elements, internal PCB circuitry, and cooling system. Simply contact our support with your order details for doorstep service support.",
    },
  ],
  "air-ultra-6-in-1": [
    {
      q: "Does Coanda auto-wrap work on short or layered hair?",
      a: "Yes. For shorter hair or face-framing layers, use 1-inch sections and bring the barrel near the tips; the aerodynamic pressure differential draws hair onto the surface smoothly.",
    },
    {
      q: "Can I use this on soaking wet hair?",
      a: "We recommend pre-drying with the blower nozzle until hair is approximately 80% dry (damp to the touch). This gives optimal shape retention and cuts styling time in half.",
    },
    {
      q: "How does the 1-Year Pan-India Warranty work?",
      a: "If any motor, heating element, or mechanical defect occurs within 12 months, email support with your order ID. We arrange doorstep pickup and send a brand-new replacement unit.",
    },
    {
      q: "Is it dual voltage for international travel?",
      a: "AirUltra 6-in-1 is calibrated for 220–240V 50/60Hz grids (standard in India, the UK, Europe, UAE, and Australia).",
    },
  ],
  "air-ultra-pro": [
    {
      q: "How does the Pro Series 5 differ from the 6-in-1?",
      a: "Air Ultra Pro features a higher-torque 1300W digital motor, specialized fluted Coanda barrels, magnetic snap-on couplings, and an included hard presentation travel carrier.",
    },
    {
      q: "What heat settings are available?",
      a: "Three measured thermal tiers (High, Medium, and Cool Shot) regulated at sub-millisecond intervals by an onboard micro-controller PCB.",
    },
    {
      q: "How often should I clean the air filter?",
      a: "We recommend wiping the bottom mesh filter cage once a month with a soft dry cloth to maintain maximum airflow velocity and prevent thermal throttling.",
    },
  ],
  "silkcomb-cordless": [
    {
      q: "Can I use the Silkcomb Cordless while it is plugged in charging?",
      a: "For user safety and long-term lithium battery longevity, the Silkcomb Cordless features a smart protection lockout and cannot be operated while connected to the charger. A full charge takes approximately 3 hours via USB Type-C.",
    },
    {
      q: "How long does the 4000 mAh battery last?",
      a: "The built-in 4000 mAh battery delivers approximately 30–45 minutes of continuous high-heat styling, which equates to 4–6 full styling or touch-up sessions on a single charge.",
    },
    {
      q: "What temperature should I select for my hair type?",
      a: "The smart LCD offers 3 tailored levels: 160°C for fine, bleached or fragile hair; 180°C for normal or wavy textures; and 200°C (up to 300°F) for thick, coarse, or stubborn curls.",
    },
    {
      q: "Will the heated bristles burn my scalp?",
      a: "No. The Silkcomb features premium ceramic-coated heating teeth capped with heat-insulated anti-scald tips that protect your scalp and fingertips during root-to-tip styling.",
    },
  ],
};
