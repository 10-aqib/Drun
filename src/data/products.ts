export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  tagline: string;
  category: 'Classic Peshawari' | 'Kaptaan Style' | 'Norozi Style' | 'Modern & Signature' | 'Heritage' | 'Contemporary' | 'Classic' | 'Kaptaan' | 'Norozi';
  categorySlug: 'classic' | 'kaptaan' | 'norozi' | 'modern' | 'heritage' | 'contemporary';
  brand: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  stockCount: number;
  status: 'published' | 'draft';
  photoStatus: 'verified' | 'awaiting_studio_assets';
  image: string;
  additionalImages: string[];
  imageAlt: string;
  imageRights: string;
  leatherType: string;
  soleType: string;
  footwearStyle: string;
  color: string;
  colorHex: string;
  sizes: number[];
  rating: number;
  reviewCount: number;
  featured: boolean;
  isNew: boolean;
  isSignature: boolean;
  weight: string;
  description: string;
  craftDetails: string[];
  careInstructions: string[];
  deliveryInfo: string;
  returnPolicy: string;
}

export function formatPKR(price: number): string {
  return `Rs. ${price.toLocaleString()}`;
}

export const PRODUCTS: Product[] = [
  // ============================================================================
  // EXISTING VERIFIED CORE COLLECTION (drun-01 through drun-05) - PUBLISHED
  // ============================================================================
  {
    id: "drun-01",
    sku: "DRN-NRZ-000",
    name: "The Royal Norozi",
    slug: "royal-norozi-cognac",
    tagline: "Double-stitched heritage chappal in rich chestnut pull-up leather",
    category: "Norozi Style",
    categorySlug: "norozi",
    brand: "Drun.",
    price: 15500,
    originalPrice: 17500,
    inStock: true,
    stockCount: 18,
    status: "published",
    photoStatus: "verified",
    image: "/products/royal-norozi-cognac.png",
    additionalImages: [
      "/products/royal-norozi-cognac.png",
      "/products/safari-suede-tan.png",
      "/products/kaptaan-stealth-black.png"
    ],
    imageAlt: "The Royal Norozi in Chestnut Cognac Pull-Up Leather",
    imageRights: "Original Drun. Studio Photography",
    leatherType: "Full-Grain Cowhide Pull-Up Leather",
    soleType: "Traditional Hand-Cut Tyre Sole with Double Welt Stitch",
    footwearStyle: "Traditional Norozi Double-Welt",
    color: "Chestnut Cognac",
    colorHex: "#8B4513",
    sizes: [39, 40, 41, 42, 43, 44, 45],
    rating: 4.9,
    reviewCount: 38,
    featured: true,
    isNew: false,
    isSignature: true,
    weight: "880g per pair",
    description: "The quintessential Peshawari silhouette. Built from dense full-grain pull-up leather that develops a personal patina over decades. Every seam is double-stitched by master artisans in Peshawar, anchored by our signature hand-ground tyre tread sole that ensures indestructible grip and lifetime wear.",
    craftDetails: [
      "100% full-grain vegetable-tanned bovine leather",
      "Traditional hand-grooved durable tyre sole",
      "Reinforced waxed linen saddle stitching",
      "Arch-supporting memory-foam padded leather footbed",
      "Hand-burnished raw edges treated with natural beeswax"
    ],
    careInstructions: [
      "Wipe clean with a soft dry cotton cloth after daily wear",
      "Nourish with Drun natural beeswax leather balm once every 3 months",
      "Allow to air-dry naturally away from direct sunlight or radiators",
      "Store with cedar shoe trees to preserve curvature and breathability"
    ],
    deliveryInfo: "Complimentary express courier across Pakistan (2–4 business days).",
    returnPolicy: "14-day complimentary size exchange in original luxury presentation box."
  },
  {
    id: "drun-02",
    sku: "DRN-KPT-000",
    name: "The Kaptaan Stealth",
    slug: "kaptaan-stealth-black",
    tagline: "Bold sculpted black calfskin with antique brass emblem",
    category: "Kaptaan Style",
    categorySlug: "kaptaan",
    brand: "Drun.",
    price: 16800,
    originalPrice: 19000,
    inStock: true,
    stockCount: 12,
    status: "published",
    photoStatus: "verified",
    image: "/products/kaptaan-stealth-black.png",
    additionalImages: [
      "/products/kaptaan-stealth-black.png",
      "/products/charsadda-modern-black.png",
      "/products/royal-norozi-cognac.png"
    ],
    imageAlt: "The Kaptaan Stealth in Midnight Black Calfskin",
    imageRights: "Original Drun. Studio Photography",
    leatherType: "Semi-Aniline Black Calfskin",
    soleType: "High-Density Ergonomic Cushion Sole with Square Toe Trim",
    footwearStyle: "Sculpted Square-Toe Kaptaan",
    color: "Midnight Obsidian",
    colorHex: "#111111",
    sizes: [40, 41, 42, 43, 44, 45],
    rating: 5.0,
    reviewCount: 42,
    featured: true,
    isNew: true,
    isSignature: true,
    weight: "920g per pair",
    description: "The distinguished Kaptaan cut, refined for the modern sartorial gent. Featuring an imposing square toe box, deep overlapping instep wings, and a custom micro-cast antique brass Drun insignia pin. Designed for formal wear with Shalwar Kameez or sharp tailored trousers.",
    craftDetails: [
      "Supple semi-aniline calfskin upper with natural grain clarity",
      "Sculpted high-profile square toe with reinforced welt",
      "Hand-cast antique brass Drun insignia rivet",
      "Double-density EVA cushioned midsole for all-day comfort",
      "Breathable perforated kidskin inner lining"
    ],
    careInstructions: [
      "Buff lightly with black cream polish to maintain deep lustre",
      "Use horsehair brush for dusting between strap folds",
      "Keep away from excessive moisture"
    ],
    deliveryInfo: "Complimentary express courier across Pakistan (2–4 business days).",
    returnPolicy: "14-day complimentary size exchange in original luxury presentation box."
  },
  {
    id: "drun-03",
    sku: "DRN-MOD-000",
    name: "The Khaki Nubuck",
    slug: "khaki-nubuck-brass",
    tagline: "Velvety olive-khaki matte finish with brushed brass buckle",
    category: "Modern & Signature",
    categorySlug: "modern",
    brand: "Drun.",
    price: 14800,
    originalPrice: 16200,
    inStock: true,
    stockCount: 15,
    status: "published",
    photoStatus: "verified",
    image: "/products/khaki-nubuck-brass.png",
    additionalImages: [
      "/products/khaki-nubuck-brass.png",
      "/products/safari-suede-tan.png",
      "/products/royal-norozi-cognac.png"
    ],
    imageAlt: "The Khaki Nubuck with Brushed Brass Buckle",
    imageRights: "Original Drun. Studio Photography",
    leatherType: "Brushed Velour Nubuck Leather",
    soleType: "Flexible Crepe-Compound Rubber Sole",
    footwearStyle: "Contemporary Cross-Strap Nubuck",
    color: "Olive Khaki",
    colorHex: "#706857",
    sizes: [39, 40, 41, 42, 43, 44],
    rating: 4.8,
    reviewCount: 27,
    featured: true,
    isNew: true,
    isSignature: false,
    weight: "760g per pair",
    description: "A contemporary reinterpretation of the traditional cross-strap chappal. The brushed nubuck leather gives an understated matte texture with remarkable softness from the first step. Paired with a solid brushed brass roller buckle and contrast edge trim.",
    craftDetails: [
      "Premium European sanded nubuck leather with water-repellent treatment",
      "Solid milled brass adjustment buckle with engraved serial mark",
      "Flexible featherweight rubber compound outsole",
      "Anatomical moulded leather footbed"
    ],
    careInstructions: [
      "Clean with a dedicated suede/nubuck crepe brush",
      "Apply silicone-free nubuck protector spray before monsoon season"
    ],
    deliveryInfo: "Complimentary express courier across Pakistan (2–4 business days).",
    returnPolicy: "14-day complimentary size exchange in original luxury presentation box."
  },
  {
    id: "drun-04",
    sku: "DRN-CLS-000",
    name: "The Charsadda Modern",
    slug: "charsadda-modern-black",
    tagline: "Low-profile streamlined silhouette with lightweight flex tread",
    category: "Classic Peshawari",
    categorySlug: "classic",
    brand: "Drun.",
    price: 13900,
    originalPrice: 15500,
    inStock: true,
    stockCount: 22,
    status: "published",
    photoStatus: "verified",
    image: "/products/charsadda-modern-black.png",
    additionalImages: [
      "/products/charsadda-modern-black.png",
      "/products/kaptaan-stealth-black.png"
    ],
    imageAlt: "The Charsadda Modern in Matte Black Crust Leather",
    imageRights: "Original Drun. Studio Photography",
    leatherType: "Matte Grain Crust Leather",
    soleType: "Monolithic Charsadda Slim Profile Sole with Micro-Grooves",
    footwearStyle: "Low-Profile Charsadda Classic",
    color: "Matte Black",
    colorHex: "#1a1a1a",
    sizes: [39, 40, 41, 42, 43, 44, 45, 46],
    rating: 4.9,
    reviewCount: 31,
    featured: false,
    isNew: false,
    isSignature: true,
    weight: "780g per pair",
    description: "Originating in the historic artisan quarters of Charsadda, this style is renowned for its sleek, aerodynamic side profile and understated single-strap crossover. Ultra-light on the foot, perfect for humid summers and daily evening strolls.",
    craftDetails: [
      "Crust leather upper treated with matte natural waxes",
      "Low-profile Charsadda silhouette engineered for maximum flexibility",
      "Reinforced heel cup with soft suede counter",
      "Triple-bonded outsole construction"
    ],
    careInstructions: [
      "Wipe clean with a damp microfibre cloth",
      "Apply neutral leather milk once a month"
    ],
    deliveryInfo: "Complimentary express courier across Pakistan (2–4 business days).",
    returnPolicy: "14-day complimentary size exchange in original luxury presentation box."
  },
  {
    id: "drun-05",
    sku: "DRN-MOD-000B",
    name: "The Safari Suede",
    slug: "safari-suede-tan",
    tagline: "Textured desert sand suede with raw leather welt and brass buckle",
    category: "Modern & Signature",
    categorySlug: "modern",
    brand: "Drun.",
    price: 14200,
    originalPrice: 16000,
    inStock: true,
    stockCount: 14,
    status: "published",
    photoStatus: "verified",
    image: "/products/safari-suede-tan.png",
    additionalImages: [
      "/products/safari-suede-tan.png",
      "/products/khaki-nubuck-brass.png",
      "/products/royal-norozi-cognac.png"
    ],
    imageAlt: "The Safari Suede in Desert Sand Camel Suede",
    imageRights: "Original Drun. Studio Photography",
    leatherType: "Heavy-Nap Italian Suede",
    soleType: "Natural Leather Stack Midsole with Rubber Traction Heel",
    footwearStyle: "Desert Suede Contemporary Chappal",
    color: "Desert Sand / Camel",
    colorHex: "#B89774",
    sizes: [40, 41, 42, 43, 44],
    rating: 4.9,
    reviewCount: 25,
    featured: true,
    isNew: true,
    isSignature: true,
    weight: "790g per pair",
    description: "Inspired by the rugged desert plains and sun-drenched stone architecture. Rich, tactile desert sand suede paired with a natural vegetable-tanned leather welt that darkens gracefully with time. The epitome of effortless luxury.",
    craftDetails: [
      "Heavy-nap plush suede with exceptional tensile strength",
      "Natural undyed veg-tan leather welt showing raw artisan craftsmanship",
      "Custom gold-tone buckle closure for precision instep fit",
      "Cushioned suede footbed that adapts to foot anatomy"
    ],
    careInstructions: [
      "Brush gently with suede brush in one direction",
      "Do not use water or liquid polishes on suede surface"
    ],
    deliveryInfo: "Complimentary express courier across Pakistan (2–4 business days).",
    returnPolicy: "14-day complimentary size exchange in original luxury presentation box."
  },

  // ============================================================================
  // COLLECTION 1: CLASSIC PESHAWARI (6 PRODUCTS) - DRAFT (AWAITING STUDIO ASSETS)
  // ============================================================================
  {
    id: "drun-06",
    sku: "DRN-CLS-001",
    name: "The Traditional Saddle Brown",
    slug: "traditional-saddle-brown",
    tagline: "Timeless heritage chappal in full-grain saddle rust pull-up leather",
    category: "Classic Peshawari",
    categorySlug: "classic",
    brand: "Drun.",
    price: 13800,
    originalPrice: 15000,
    inStock: true,
    stockCount: 16,
    status: "draft",
    photoStatus: "awaiting_studio_assets",
    image: "/products/traditional-saddle-brown.png",
    additionalImages: [
      "/products/traditional-saddle-brown.png",
      "/products/traditional-saddle-brown-side.png",
      "/products/traditional-saddle-brown-top.png"
    ],
    imageAlt: "The Traditional Saddle Brown Classic Peshawari Chappal",
    imageRights: "Drun. Atelier Benchmark Render &bull; Awaiting Owner Studio Shoot",
    leatherType: "Full-Grain Crust Vegetable-Tanned Bovine Leather",
    soleType: "Hand-Cut Durable Rubber Tyre Tread with Single Welt Stitch",
    footwearStyle: "Classic Peshawari Heritage Cut",
    color: "Saddle Rust Brown",
    colorHex: "#7B3F00",
    sizes: [39, 40, 41, 42, 43, 44, 45, 46],
    rating: 4.8,
    reviewCount: 14,
    featured: false,
    isNew: true,
    isSignature: false,
    weight: "820g per pair",
    description: "The timeless archetype of Peshawar's bazaar masterworks. Rendered in rich saddle rust bovine leather that softens and moulds uniquely to the owner's footbed. Engineered with a low-profile stance and signature double strap loop for all-day festive grace.",
    craftDetails: [
      "Full-grain bovine leather sourced from ethical Punjab tanneries",
      "Traditional hand-grooved tyre tread outsole for lifetime grip",
      "Single-needle lock-stitch construction with waxed flax thread",
      "Natural carnauba wax burnished edge finish"
    ],
    careInstructions: [
      "Wipe dust with a dry cotton cloth after wearing",
      "Condition with beeswax cream every 8–10 weeks",
      "Store away from direct moisture"
    ],
    deliveryInfo: "Complimentary tracked courier delivery across Pakistan (2–4 business days).",
    returnPolicy: "14-day complimentary size exchange in original packaging."
  },
  {
    id: "drun-07",
    sku: "DRN-CLS-002",
    name: "The Classic Noir Formal",
    slug: "classic-noir-formal",
    tagline: "Aniline glazed black calfskin with mirror-burnished sole edging",
    category: "Classic Peshawari",
    categorySlug: "classic",
    brand: "Drun.",
    price: 14500,
    originalPrice: 16000,
    inStock: true,
    stockCount: 14,
    status: "draft",
    photoStatus: "awaiting_studio_assets",
    image: "/products/classic-noir-formal.png",
    additionalImages: [
      "/products/classic-noir-formal.png",
      "/products/classic-noir-formal-side.png",
      "/products/classic-noir-formal-top.png"
    ],
    imageAlt: "The Classic Noir Formal in Black Glazed Calfskin",
    imageRights: "Drun. Atelier Benchmark Render &bull; Awaiting Owner Studio Shoot",
    leatherType: "Aniline Glazed Calfskin with Natural Sheen",
    soleType: "Compressed Leather Stack Midsole with Non-Slip Rubber Heel",
    footwearStyle: "Formal Classic Dress Chappal",
    color: "Deep Obsidian Black",
    colorHex: "#181818",
    sizes: [40, 41, 42, 43, 44, 45],
    rating: 4.9,
    reviewCount: 19,
    featured: true,
    isNew: false,
    isSignature: false,
    weight: "840g per pair",
    description: "A refined formal Peshawari silhouette built for black-tie gatherings and dignified Shalwar Kameez ensembles. Selected from high-tensile glazed calfskin, hand-buffed with bone burnishers for a smooth, mirror-sheen edge.",
    craftDetails: [
      "Selected aniline glazed calfskin with fine grain density",
      "Leather-stacked heel core with vulcanized rubber ground pad",
      "Micro-fibre arch cushion for formal posture support",
      "Hand-inked black perimeter welt with matte seal"
    ],
    careInstructions: [
      "Buff lightly with black wax polish to preserve deep shine",
      "Keep in breathable cotton dust bag when not in use"
    ],
    deliveryInfo: "Complimentary tracked courier delivery across Pakistan (2–4 business days).",
    returnPolicy: "14-day complimentary size exchange in original packaging."
  },
  {
    id: "drun-08",
    sku: "DRN-CLS-003",
    name: "The Dark Chocolate Bark",
    slug: "dark-chocolate-bark",
    tagline: "Oil-stuffed pull-up cowhide in deep espresso with rounded toe trim",
    category: "Classic Peshawari",
    categorySlug: "classic",
    brand: "Drun.",
    price: 13900,
    originalPrice: 15200,
    inStock: true,
    stockCount: 20,
    status: "draft",
    photoStatus: "awaiting_studio_assets",
    image: "/products/dark-chocolate-bark.png",
    additionalImages: [
      "/products/dark-chocolate-bark.png",
      "/products/dark-chocolate-bark-side.png",
      "/products/dark-chocolate-bark-top.png"
    ],
    imageAlt: "The Dark Chocolate Bark in Rich Espresso Leather",
    imageRights: "Drun. Atelier Benchmark Render &bull; Awaiting Owner Studio Shoot",
    leatherType: "Oil-Stuffed Pull-Up Cowhide with Dark Wax Finish",
    soleType: "Grooved Traction Vulcanized Sole with Waxed Edge Trim",
    footwearStyle: "Classic Round-Toe Peshawari",
    color: "Dark Chocolate Espresso",
    colorHex: "#3D2314",
    sizes: [39, 40, 41, 42, 43, 44, 45],
    rating: 4.8,
    reviewCount: 16,
    featured: false,
    isNew: true,
    isSignature: false,
    weight: "810g per pair",
    description: "Rich dark chocolate tones infused with organic oils that lighten subtly across the instep folds with movement. Built with rounded toe borders and a supportive padded arch for versatile daily wear.",
    craftDetails: [
      "Hot-stuffed oily pull-up leather that heals superficial scratches",
      "Flexible all-weather vulcanized rubber outsole",
      "Heavy-duty antiqued roller buckle closure",
      "Dual-layered cowhide footbed lining"
    ],
    careInstructions: [
      "Rub minor scuffs with fingertips to redistribute natural waxes",
      "Apply neutral leather conditioner biannually"
    ],
    deliveryInfo: "Complimentary tracked courier delivery across Pakistan (2–4 business days).",
    returnPolicy: "14-day complimentary size exchange in original packaging."
  },
  {
    id: "drun-09",
    sku: "DRN-CLS-004",
    name: "The Artisan Tan Minimalist",
    slug: "artisan-tan-minimalist",
    tagline: "Raw-grain golden ochre leather celebrating pure unadorned form",
    category: "Classic Peshawari",
    categorySlug: "classic",
    brand: "Drun.",
    price: 13500,
    originalPrice: 14800,
    inStock: true,
    stockCount: 18,
    status: "draft",
    photoStatus: "awaiting_studio_assets",
    image: "/products/artisan-tan-minimalist.png",
    additionalImages: [
      "/products/artisan-tan-minimalist.png",
      "/products/artisan-tan-minimalist-side.png",
      "/products/artisan-tan-minimalist-top.png"
    ],
    imageAlt: "The Artisan Tan Minimalist in Golden Ochre Leather",
    imageRights: "Drun. Atelier Benchmark Render &bull; Awaiting Owner Studio Shoot",
    leatherType: "Vegetable-Tanned Raw-Grain Crust Leather",
    soleType: "Flexible Lightweight Rubber Sole with Contrast Perimeter Welt",
    footwearStyle: "Minimalist Heritage Chappal",
    color: "Golden Ochre Tan",
    colorHex: "#C18A49",
    sizes: [39, 40, 41, 42, 43, 44],
    rating: 4.7,
    reviewCount: 11,
    featured: false,
    isNew: false,
    isSignature: false,
    weight: "750g per pair",
    description: "Stripped of superfluous ornament, this chappal celebrates the unvarnished honesty of raw golden ochre leather. Lightweight and agile on foot, perfect for long summer afternoons and Friday prayers.",
    craftDetails: [
      "Vegetable crust leather with natural pore breathability",
      "Contrast ivory perimeter stitch with waxed linen cord",
      "Slim profile sole engineered for indoor/outdoor mobility",
      "Unfinished raw back-strap bevelled for softness"
    ],
    careInstructions: [
      "Avoid soaking in water; air-dry if exposed to rain",
      "Use saddle soap sparingly for deep cleaning"
    ],
    deliveryInfo: "Complimentary tracked courier delivery across Pakistan (2–4 business days).",
    returnPolicy: "14-day complimentary size exchange in original packaging."
  },
  {
    id: "drun-10",
    sku: "DRN-CLS-005",
    name: "The Charsadda Heritage Ochre",
    slug: "charsadda-heritage-ochre",
    tagline: "Aerodynamic single cross-strap silhouette in warm amber ochre",
    category: "Classic Peshawari",
    categorySlug: "classic",
    brand: "Drun.",
    price: 14200,
    originalPrice: 15500,
    inStock: true,
    stockCount: 22,
    status: "draft",
    photoStatus: "awaiting_studio_assets",
    image: "/products/charsadda-heritage-ochre.png",
    additionalImages: [
      "/products/charsadda-heritage-ochre.png",
      "/products/charsadda-heritage-ochre-side.png",
      "/products/charsadda-heritage-ochre-top.png"
    ],
    imageAlt: "The Charsadda Heritage Ochre Peshawari Chappal",
    imageRights: "Drun. Atelier Benchmark Render &bull; Awaiting Owner Studio Shoot",
    leatherType: "Full-Grain Drum-Dyed Bovine Hide",
    soleType: "Monolithic Slim Charsadda-Profile Sole with Micro-Slits",
    footwearStyle: "Traditional Charsadda Cross-Strap",
    color: "Warm Amber Ochre",
    colorHex: "#A0522D",
    sizes: [40, 41, 42, 43, 44, 45, 46],
    rating: 4.9,
    reviewCount: 23,
    featured: false,
    isNew: true,
    isSignature: false,
    weight: "770g per pair",
    description: "Originating from the historic cobblers of the Khyber river valley, this traditional pattern features an aerodynamic single cross-instep strap and hand-skived edges that prevent heel abrasion.",
    craftDetails: [
      "Drum-dyed bovine leather for even pigment saturation throughout",
      "Skived ergonomic strap edges that eliminate break-in hotspots",
      "Thin-profile micro-grooved grip sole",
      "Double reinforced heel-cup anchor rivets"
    ],
    careInstructions: [
      "Dust clean with a horsehair brush after wear",
      "Treat with leather balm to keep straps supple"
    ],
    deliveryInfo: "Complimentary tracked courier delivery across Pakistan (2–4 business days).",
    returnPolicy: "14-day complimentary size exchange in original packaging."
  },
  {
    id: "drun-11",
    sku: "DRN-CLS-006",
    name: "The Governor Formal Burnished",
    slug: "governor-formal-burnished",
    tagline: "Hand-patinated mahogany calfskin with antique gradient toe",
    category: "Classic Peshawari",
    categorySlug: "classic",
    brand: "Drun.",
    price: 15200,
    originalPrice: 17000,
    inStock: true,
    stockCount: 15,
    status: "draft",
    photoStatus: "awaiting_studio_assets",
    image: "/products/governor-formal-burnished.png",
    additionalImages: [
      "/products/governor-formal-burnished.png",
      "/products/governor-formal-burnished-side.png",
      "/products/governor-formal-burnished-top.png"
    ],
    imageAlt: "The Governor Formal Burnished Mahogany Chappal",
    imageRights: "Drun. Atelier Benchmark Render &bull; Awaiting Owner Studio Shoot",
    leatherType: "Hand-Patinated Crust Calfskin with Antique Gradient",
    soleType: "Dual-Density Ergonomic Sole with High-Density EVA Core",
    footwearStyle: "Ceremonial Dress Peshawari",
    color: "Burnished Mahogany",
    colorHex: "#4A150D",
    sizes: [40, 41, 42, 43, 44, 45],
    rating: 5.0,
    reviewCount: 29,
    featured: true,
    isNew: false,
    isSignature: true,
    weight: "830g per pair",
    description: "A ceremonial dress chappal showcasing artisanal hand-patination. Deep mahogany transitions gracefully into darkened toe caps, secured by a solid antique bronze side buckle.",
    craftDetails: [
      "Individually hand-shaded patina applied in 4 dye layers",
      "Antique bronze finish cast buckle with micro-adjust holes",
      "Cushioned memory-foam insole covered in glove-soft calfskin",
      "Bevelled waist sole profile for slender silhouette"
    ],
    careInstructions: [
      "Use neutral polish only to preserve hand-painted patina transitions",
      "Keep away from direct heat sources"
    ],
    deliveryInfo: "Complimentary tracked courier delivery across Pakistan (2–4 business days).",
    returnPolicy: "14-day complimentary size exchange in original packaging."
  },

  // ============================================================================
  // COLLECTION 2: KAPTAAN STYLE (6 PRODUCTS) - DRAFT (AWAITING STUDIO ASSETS)
  // ============================================================================
  {
    id: "drun-12",
    sku: "DRN-KPT-001",
    name: "The Kaptaan Rustique Brown",
    slug: "kaptaan-rustique-brown",
    tagline: "Wide-stance architectural square-toe chappal in tobacco bovine leather",
    category: "Kaptaan Style",
    categorySlug: "kaptaan",
    brand: "Drun.",
    price: 16500,
    originalPrice: 18500,
    inStock: true,
    stockCount: 14,
    status: "draft",
    photoStatus: "awaiting_studio_assets",
    image: "/products/kaptaan-rustique-brown.png",
    additionalImages: [
      "/products/kaptaan-rustique-brown.png",
      "/products/kaptaan-rustique-brown-side.png",
      "/products/kaptaan-rustique-brown-top.png"
    ],
    imageAlt: "The Kaptaan Rustique Brown with Sculpted Instep Wings",
    imageRights: "Drun. Atelier Benchmark Render &bull; Awaiting Owner Studio Shoot",
    leatherType: "Heavy-Gauge Vegetable Pull-Up Leather",
    soleType: "Wide-Stance Hand-Ground Tyre Tread Sole with Bevelled Square Toe",
    footwearStyle: "Architectural Kaptaan Square-Toe",
    color: "Rich Tobacco Brown",
    colorHex: "#5C3317",
    sizes: [40, 41, 42, 43, 44, 45, 46],
    rating: 4.9,
    reviewCount: 34,
    featured: true,
    isNew: false,
    isSignature: true,
    weight: "910g per pair",
    description: "The definitive Kaptaan architecture: wide instep wings, assertive square toe box, and imposing stance. Cut from thick tobacco bovine hide that withstands rigorous daily wear and builds timeless prestige.",
    craftDetails: [
      "3.2mm thick bovine hide with oily pull-up characteristics",
      "Hand-ground aircraft tyre base bevelled to crisp square profile",
      "Triple waxed cord reinforcement at wing pivot points",
      "Solid antique brass Drun insignia emblem pin"
    ],
    careInstructions: [
      "Condition with beeswax cream every 2 months",
      "Dust thoroughly along the instep overlapping seams"
    ],
    deliveryInfo: "Complimentary tracked courier delivery across Pakistan (2–4 business days).",
    returnPolicy: "14-day complimentary size exchange in original packaging."
  },
  {
    id: "drun-13",
    sku: "DRN-KPT-002",
    name: "The Kaptaan Midnight Shadow",
    slug: "kaptaan-midnight-shadow",
    tagline: "Milled pebble-grain black cowhide with tone-on-tone stitchwork",
    category: "Kaptaan Style",
    categorySlug: "kaptaan",
    brand: "Drun.",
    price: 16900,
    originalPrice: 19000,
    inStock: true,
    stockCount: 11,
    status: "draft",
    photoStatus: "awaiting_studio_assets",
    image: "/products/kaptaan-midnight-shadow.png",
    additionalImages: [
      "/products/kaptaan-midnight-shadow.png",
      "/products/kaptaan-midnight-shadow-side.png",
      "/products/kaptaan-midnight-shadow-top.png"
    ],
    imageAlt: "The Kaptaan Midnight Shadow in Milled Black Leather",
    imageRights: "Drun. Atelier Benchmark Render &bull; Awaiting Owner Studio Shoot",
    leatherType: "Milled Black Top-Grain Cowhide with Subtle Pebble Grain",
    soleType: "High-Profile Shock-Absorbing Tyre Welt Sole",
    footwearStyle: "Monochrome Kaptaan Silhouette",
    color: "Matte Pitch Black",
    colorHex: "#111111",
    sizes: [40, 41, 42, 43, 44, 45],
    rating: 5.0,
    reviewCount: 28,
    featured: false,
    isNew: true,
    isSignature: true,
    weight: "930g per pair",
    description: "Stealth and commanding presence combined. The matte pitch black milled leather resists scuffs, complemented by tone-on-tone heavy waxed cord stitching and the subtle Drun antique rivet.",
    craftDetails: [
      "Tumbled milled top-grain leather offering supple flex from step one",
      "Shock-absorbing high-density tyre welt sole",
      "Blackened brass side adjustment buckle",
      "Kidskin padded lining with moisture dispersion perforations"
    ],
    careInstructions: [
      "Buff lightly with black cream polish",
      "Avoid exposure to extreme heat"
    ],
    deliveryInfo: "Complimentary tracked courier delivery across Pakistan (2–4 business days).",
    returnPolicy: "14-day complimentary size exchange in original packaging."
  },
  {
    id: "drun-14",
    sku: "DRN-KPT-003",
    name: "The Kaptaan Desert Sand Tan",
    slug: "kaptaan-desert-sand-tan",
    tagline: "Sun-drenched natural tan cowhide that patinates deeply with time",
    category: "Kaptaan Style",
    categorySlug: "kaptaan",
    brand: "Drun.",
    price: 15900,
    originalPrice: 17500,
    inStock: true,
    stockCount: 16,
    status: "draft",
    photoStatus: "awaiting_studio_assets",
    image: "/products/kaptaan-desert-sand-tan.png",
    additionalImages: [
      "/products/kaptaan-desert-sand-tan.png",
      "/products/kaptaan-desert-sand-tan-side.png",
      "/products/kaptaan-desert-sand-tan-top.png"
    ],
    imageAlt: "The Kaptaan Desert Sand Tan with Broad Wing Cut",
    imageRights: "Drun. Atelier Benchmark Render &bull; Awaiting Owner Studio Shoot",
    leatherType: "Smooth Natural Veg-Tan Cowhide with Oil Pull-Up",
    soleType: "Hand-Shaped Tyre Rubber Outsole with Cushioned Leather Bed",
    footwearStyle: "Kaptaan Broad-Wing Sand Cut",
    color: "Sand Dune Tan",
    colorHex: "#B38B59",
    sizes: [39, 40, 41, 42, 43, 44, 45],
    rating: 4.8,
    reviewCount: 17,
    featured: false,
    isNew: false,
    isSignature: false,
    weight: "890g per pair",
    description: "A sun-baked desert interpretation of the Kaptaan cut. The natural warm tan leather absorbs conditioning oils over time, developing a darkened, richly nuanced patina with every journey.",
    craftDetails: [
      "Natural undyed veg-tan leather that personalizes with sun exposure",
      "Deep contour footbed that cradles foot arches",
      "Hand-grooved tyre rubber sole",
      "Double reinforced heel stay"
    ],
    careInstructions: [
      "Apply neat's-foot oil or leather balm sparingly for deeper amber tone",
      "Air-dry naturally if exposed to rainwater"
    ],
    deliveryInfo: "Complimentary tracked courier delivery across Pakistan (2–4 business days).",
    returnPolicy: "14-day complimentary size exchange in original packaging."
  },
  {
    id: "drun-15",
    sku: "DRN-KPT-004",
    name: "The Kaptaan Textured Granary",
    slug: "kaptaan-textured-granary",
    tagline: "Scotch-grain embossed bovine leather with heavy moisture barrier",
    category: "Kaptaan Style",
    categorySlug: "kaptaan",
    brand: "Drun.",
    price: 17200,
    originalPrice: 19500,
    inStock: true,
    stockCount: 10,
    status: "draft",
    photoStatus: "awaiting_studio_assets",
    image: "/products/kaptaan-textured-granary.png",
    additionalImages: [
      "/products/kaptaan-textured-granary.png",
      "/products/kaptaan-textured-granary-side.png",
      "/products/kaptaan-textured-granary-top.png"
    ],
    imageAlt: "The Kaptaan Textured Granary in Vintage Walnut Grain",
    imageRights: "Drun. Atelier Benchmark Render &bull; Awaiting Owner Studio Shoot",
    leatherType: "Scotch-Grain Textured Bovine Leather with Moisture Barrier",
    soleType: "Triple-Layer Heavy-Duty Welted Tyre Sole",
    footwearStyle: "Textured Rugged Kaptaan",
    color: "Vintage Walnut",
    colorHex: "#4E3629",
    sizes: [40, 41, 42, 43, 44, 45],
    rating: 4.9,
    reviewCount: 22,
    featured: true,
    isNew: true,
    isSignature: true,
    weight: "950g per pair",
    description: "Featuring distinctive cross-hatch scotch grain leather that adds tactile depth and exceptional durability. The structured instep wings hold their sculpted arch even during prolonged standing.",
    craftDetails: [
      "Embossed scotch-grain texture that shrugs off scratches and dust",
      "Triple-welting along the forward square toe rim",
      "Heavy-duty internal arch shank for orthopaedic stability",
      "Hand-waxed edge burnishing in dark walnut tone"
    ],
    careInstructions: [
      "Clean textured surface with soft bristle brush",
      "Nourish with leather lotion every 3 months"
    ],
    deliveryInfo: "Complimentary tracked courier delivery across Pakistan (2–4 business days).",
    returnPolicy: "14-day complimentary size exchange in original packaging."
  },
  {
    id: "drun-16",
    sku: "DRN-KPT-005",
    name: "The Kaptaan Dark Chocolate",
    slug: "kaptaan-dark-chocolate",
    tagline: "Deep bitter-chocolate waxy calfskin with high square welt edge",
    category: "Kaptaan Style",
    categorySlug: "kaptaan",
    brand: "Drun.",
    price: 16800,
    originalPrice: 18900,
    inStock: true,
    stockCount: 15,
    status: "draft",
    photoStatus: "awaiting_studio_assets",
    image: "/products/kaptaan-dark-chocolate.png",
    additionalImages: [
      "/products/kaptaan-dark-chocolate.png",
      "/products/kaptaan-dark-chocolate-side.png",
      "/products/kaptaan-dark-chocolate-top.png"
    ],
    imageAlt: "The Kaptaan Dark Chocolate with High-Arch Welt",
    imageRights: "Drun. Atelier Benchmark Render &bull; Awaiting Owner Studio Shoot",
    leatherType: "Deep-Waxed Oily Pull-Up Leather",
    soleType: "Ergonomic High-Arch Rubber Compound Sole with Square Welt",
    footwearStyle: "Square-Welt Kaptaan",
    color: "Bitter Chocolate",
    colorHex: "#2E1810",
    sizes: [39, 40, 41, 42, 43, 44, 45],
    rating: 4.8,
    reviewCount: 20,
    featured: false,
    isNew: false,
    isSignature: false,
    weight: "920g per pair",
    description: "Formulated in an intense bitter-chocolate brown with high wax content. The squared front rim protects the toe against curb impact, anchored by dual-density arch cushions.",
    craftDetails: [
      "High wax impregnation resisting mud and desert grit",
      "Reinforced square toe cap welt with recessed stitch channel",
      "Cast antique brass Drun emblem",
      "Sweat-wicking calfskin interior lining"
    ],
    careInstructions: [
      "Buff lightly with a soft wool cloth to reactivate surface waxes",
      "Keep dry and store in cedar trees"
    ],
    deliveryInfo: "Complimentary tracked courier delivery across Pakistan (2–4 business days).",
    returnPolicy: "14-day complimentary size exchange in original packaging."
  },
  {
    id: "drun-17",
    sku: "DRN-KPT-006",
    name: "The Kaptaan Imperial Stitched",
    slug: "kaptaan-imperial-stitched",
    tagline: "Glazed oxblood cordovan tone with triple contrast saddle welt stitch",
    category: "Kaptaan Style",
    categorySlug: "kaptaan",
    brand: "Drun.",
    price: 17800,
    originalPrice: 20000,
    inStock: true,
    stockCount: 8,
    status: "draft",
    photoStatus: "awaiting_studio_assets",
    image: "/products/kaptaan-imperial-stitched.png",
    additionalImages: [
      "/products/kaptaan-imperial-stitched.png",
      "/products/kaptaan-imperial-stitched-side.png",
      "/products/kaptaan-imperial-stitched-top.png"
    ],
    imageAlt: "The Kaptaan Imperial Stitched in Glazed Cordovan Calf",
    imageRights: "Drun. Atelier Benchmark Render &bull; Awaiting Owner Studio Shoot",
    leatherType: "Glazed Deep Cordovan-Tone Calfskin",
    soleType: "Master-Welded Aircraft Tyre Sole with Exposed Linen Saddle Stitch",
    footwearStyle: "Masterpiece Imperial Kaptaan",
    color: "Oxblood Cordovan",
    colorHex: "#421217",
    sizes: [40, 41, 42, 43, 44, 45],
    rating: 5.0,
    reviewCount: 31,
    featured: true,
    isNew: true,
    isSignature: true,
    weight: "940g per pair",
    description: "The pinnacle of bespoke Kaptaan crafting. Featuring triple-stitched overlapping wings in contrasting natural linen cord, finished with Drun's signature micro-cast antique brass buckle.",
    craftDetails: [
      "Selected European calfskin glazed to rich cordovan wine depth",
      "Over 1,400 individual hand-placed saddle stitches",
      "Authentic aircraft tyre tread base ground to 1mm tolerance",
      "Individual serial number hand-stamped on internal heel bed"
    ],
    careInstructions: [
      "Buff gently with neutral cordovan wax",
      "Use horsehair brush for stitching seam care"
    ],
    deliveryInfo: "Complimentary tracked courier delivery across Pakistan (2–4 business days).",
    returnPolicy: "14-day complimentary size exchange in original packaging."
  },

  // ============================================================================
  // COLLECTION 3: NOROZI STYLE (6 PRODUCTS) - DRAFT (AWAITING STUDIO ASSETS)
  // ============================================================================
  {
    id: "drun-18",
    sku: "DRN-NRZ-001",
    name: "The Quetta Norozi Chestnut",
    slug: "quetta-norozi-chestnut",
    tagline: "Authentic heavy-duty double-welt Baloch Norozi in thick chestnut hide",
    category: "Norozi Style",
    categorySlug: "norozi",
    brand: "Drun.",
    price: 16200,
    originalPrice: 18000,
    inStock: true,
    stockCount: 17,
    status: "draft",
    photoStatus: "awaiting_studio_assets",
    image: "/products/quetta-norozi-chestnut.png",
    additionalImages: [
      "/products/quetta-norozi-chestnut.png",
      "/products/quetta-norozi-chestnut-side.png",
      "/products/quetta-norozi-chestnut-top.png"
    ],
    imageAlt: "The Quetta Norozi Chestnut Baloch Chappal",
    imageRights: "Drun. Atelier Benchmark Render &bull; Awaiting Owner Studio Shoot",
    leatherType: "Heavy 3mm Vegetable-Tanned Bovine Hide",
    soleType: "Authentic Quetta-Pattern Multi-Ply Tyre Sole with Double Welt",
    footwearStyle: "Traditional Quetta Norozi",
    color: "Chestnut Copper",
    colorHex: "#8B4513",
    sizes: [39, 40, 41, 42, 43, 44, 45, 46],
    rating: 4.9,
    reviewCount: 37,
    featured: true,
    isNew: false,
    isSignature: true,
    weight: "960g per pair",
    description: "Revered across Balochistan and Khyber Pakhtunkhwa, the Norozi is distinguished by its sweeping instep strap and heavy-gauge double welt stitching that locks the upper securely into the indestructible tyre base.",
    craftDetails: [
      "3.0mm dense vegetable-tanned bovine hide with smooth surface grain",
      "Heavy waxed braided linen double-welt cord",
      "Reclaimed aircraft tyre tread base providing unmatched wear life",
      "Ergonomically contoured arch contour"
    ],
    careInstructions: [
      "Condition with beeswax paste every 2–3 months",
      "Wipe clean after outdoor wear on rugged terrain"
    ],
    deliveryInfo: "Complimentary tracked courier delivery across Pakistan (2–4 business days).",
    returnPolicy: "14-day complimentary size exchange in original packaging."
  },
  {
    id: "drun-19",
    sku: "DRN-NRZ-002",
    name: "The Norozi Onyx Shadow",
    slug: "norozi-onyx-shadow",
    tagline: "All-black master cut with high-gauge braided black linen stitching",
    category: "Norozi Style",
    categorySlug: "norozi",
    brand: "Drun.",
    price: 16500,
    originalPrice: 18500,
    inStock: true,
    stockCount: 15,
    status: "draft",
    photoStatus: "awaiting_studio_assets",
    image: "/products/norozi-onyx-shadow.png",
    additionalImages: [
      "/products/norozi-onyx-shadow.png",
      "/products/norozi-onyx-shadow-side.png",
      "/products/norozi-onyx-shadow-top.png"
    ],
    imageAlt: "The Norozi Onyx Shadow in All-Black Steerhide",
    imageRights: "Drun. Atelier Benchmark Render &bull; Awaiting Owner Studio Shoot",
    leatherType: "Full-Grain Black Steerhide with Semi-Gloss Finish",
    soleType: "Heavy Grooved Tyre Tread Sole with Blackened Edge Burnish",
    footwearStyle: "Monochrome Norozi Cut",
    color: "Raven Onyx",
    colorHex: "#161616",
    sizes: [40, 41, 42, 43, 44, 45],
    rating: 4.9,
    reviewCount: 26,
    featured: false,
    isNew: true,
    isSignature: false,
    weight: "970g per pair",
    description: "An all-black master cut of the celebrated Norozi silhouette. Dense steerhide upper treated with water-resistant carnauba wax, bound with braided black linen cord for unmatched strength.",
    craftDetails: [
      "Heavy-duty steerhide with natural tight fibre weave",
      "Black-dyed tyre edge burnish treated with natural resins",
      "All-black hardware rivets and adjustment buckle",
      "Arch-relieving high density foam footbed"
    ],
    careInstructions: [
      "Apply black shoe cream to maintain deep jet appearance",
      "Keep away from prolonged dampness"
    ],
    deliveryInfo: "Complimentary tracked courier delivery across Pakistan (2–4 business days).",
    returnPolicy: "14-day complimentary size exchange in original packaging."
  },
  {
    id: "drun-20",
    sku: "DRN-NRZ-003",
    name: "The Norozi Camel Suede",
    slug: "norozi-camel-suede",
    tagline: "Roughout desert suede exterior with supple full-grain leather core",
    category: "Norozi Style",
    categorySlug: "norozi",
    brand: "Drun.",
    price: 15800,
    originalPrice: 17500,
    inStock: true,
    stockCount: 12,
    status: "draft",
    photoStatus: "awaiting_studio_assets",
    image: "/products/norozi-camel-suede.png",
    additionalImages: [
      "/products/norozi-camel-suede.png",
      "/products/norozi-camel-suede-side.png",
      "/products/norozi-camel-suede-top.png"
    ],
    imageAlt: "The Norozi Camel Suede with Roughout Texture",
    imageRights: "Drun. Atelier Benchmark Render &bull; Awaiting Owner Studio Shoot",
    leatherType: "Heavy-Nap Roughout Suede with Full-Grain Leather Core",
    soleType: "Cushion-Welted Crepe and Rubber Hybrid Sole",
    footwearStyle: "Textured Norozi Suede",
    color: "Camel Dune",
    colorHex: "#C29B68",
    sizes: [39, 40, 41, 42, 43, 44],
    rating: 4.8,
    reviewCount: 18,
    featured: false,
    isNew: true,
    isSignature: false,
    weight: "860g per pair",
    description: "Blending traditional Norozi strap proportions with velvety desert camel suede. The soft roughout exterior eliminates break-in stiffness while the full-grain leather lining cradles the instep.",
    craftDetails: [
      "Heavy roughout suede with water-repellent finishing",
      "Full bovine lining that prevents stretching or deformation",
      "Crepe rubber hybrid sole combining cushioning with durability",
      "Polished brass roller buckle"
    ],
    careInstructions: [
      "Brush in uniform direction with suede crepe brush",
      "Do not apply liquid creams or shoe waxes to suede"
    ],
    deliveryInfo: "Complimentary tracked courier delivery across Pakistan (2–4 business days).",
    returnPolicy: "14-day complimentary size exchange in original packaging."
  },
  {
    id: "drun-21",
    sku: "DRN-NRZ-004",
    name: "The Norozi Oxblood Saddle",
    slug: "norozi-oxblood-saddle",
    tagline: "Wide curving instep strap in vintage burgundy pull-up cowhide",
    category: "Norozi Style",
    categorySlug: "norozi",
    brand: "Drun.",
    price: 16900,
    originalPrice: 19200,
    inStock: true,
    stockCount: 14,
    status: "draft",
    photoStatus: "awaiting_studio_assets",
    image: "/products/norozi-oxblood-saddle.png",
    additionalImages: [
      "/products/norozi-oxblood-saddle.png",
      "/products/norozi-oxblood-saddle-side.png",
      "/products/norozi-oxblood-saddle-top.png"
    ],
    imageAlt: "The Norozi Oxblood Saddle in Burgundy Leather",
    imageRights: "Drun. Atelier Benchmark Render &bull; Awaiting Owner Studio Shoot",
    leatherType: "Oil-Tanned Pull-Up Cowhide with Deep Burgundy Undertones",
    soleType: "Hand-Bevelled Tyre Sole with Reinforced Heel Counter",
    footwearStyle: "Baloch Curved-Strap Norozi",
    color: "Vintage Oxblood",
    colorHex: "#5B1E1E",
    sizes: [40, 41, 42, 43, 44, 45],
    rating: 4.9,
    reviewCount: 22,
    featured: false,
    isNew: false,
    isSignature: true,
    weight: "940g per pair",
    description: "Rich burgundy and deep red tones inspired by vintage polo saddles. The wide curving instep strap distributes pressure evenly across the bridge of the foot for fatigue-free wear.",
    craftDetails: [
      "Chromexcel-style oil-tanned cowhide with dramatic colour shift",
      "Thick contrast cream welt stitches anchored by hand",
      "Multi-layered tyre base with beveled arch profile",
      "Soft calfskin interior sock liner"
    ],
    careInstructions: [
      "Buff with horsehair brush to restore lustrous pull-up sheen",
      "Apply beeswax leather balm seasonally"
    ],
    deliveryInfo: "Complimentary tracked courier delivery across Pakistan (2–4 business days).",
    returnPolicy: "14-day complimentary size exchange in original packaging."
  },
  {
    id: "drun-22",
    sku: "DRN-NRZ-005",
    name: "The Norozi Raw Tyre-Welt Espresso",
    slug: "norozi-raw-tyre-welt-espresso",
    tagline: "Authentic aircraft tyre casing sole with rugged industrial welt lines",
    category: "Norozi Style",
    categorySlug: "norozi",
    brand: "Drun.",
    price: 17500,
    originalPrice: 20000,
    inStock: true,
    stockCount: 9,
    status: "draft",
    photoStatus: "awaiting_studio_assets",
    image: "/products/norozi-raw-tyre-welt-espresso.png",
    additionalImages: [
      "/products/norozi-raw-tyre-welt-espresso.png",
      "/products/norozi-raw-tyre-welt-espresso-side.png",
      "/products/norozi-raw-tyre-welt-espresso-top.png"
    ],
    imageAlt: "The Norozi Raw Tyre-Welt Espresso with Authentic Aircraft Tyre Base",
    imageRights: "Drun. Atelier Benchmark Render &bull; Awaiting Owner Studio Shoot",
    leatherType: "Vegetable-Tanned Thick Crust Cowhide with Raw Burnished Edges",
    soleType: "Authentic Reclaimed Heavy Aircraft Tyre Sole with Raw Tread Markings",
    footwearStyle: "Raw Industrial Welt Norozi",
    color: "Espresso Brown",
    colorHex: "#2A1810",
    sizes: [40, 41, 42, 43, 44, 45, 46],
    rating: 5.0,
    reviewCount: 35,
    featured: true,
    isNew: true,
    isSignature: true,
    weight: "1020g per pair",
    description: "The rawest and most indestructible chappal in the Norozi canon. Cut from genuine aircraft tyre casing displaying subtle vintage tread marks, hand-stitched with 1.2mm waxed linen cord.",
    craftDetails: [
      "Aviation tyre tread outsole rated for extreme friction and puncture resistance",
      "3.4mm heavy-gauge crust leather upper",
      "Traditional bone-tool burnished raw edges",
      "Reinforced steel-reinforced heel anchor pins"
    ],
    careInstructions: [
      "Wash sole treads with brush and water if muddy",
      "Treat leather upper with heavy conditioning oil"
    ],
    deliveryInfo: "Complimentary tracked courier delivery across Pakistan (2–4 business days).",
    returnPolicy: "14-day complimentary size exchange in original packaging."
  },
  {
    id: "drun-23",
    sku: "DRN-NRZ-006",
    name: "The Norozi Ceremonial Brass",
    slug: "norozi-ceremonial-brass",
    tagline: "Top-grade European calfskin with solid milled brass hardware",
    category: "Norozi Style",
    categorySlug: "norozi",
    brand: "Drun.",
    price: 18500,
    originalPrice: 21000,
    inStock: true,
    stockCount: 7,
    status: "draft",
    photoStatus: "awaiting_studio_assets",
    image: "/products/norozi-ceremonial-brass.png",
    additionalImages: [
      "/products/norozi-ceremonial-brass.png",
      "/products/norozi-ceremonial-brass-side.png",
      "/products/norozi-ceremonial-brass-top.png"
    ],
    imageAlt: "The Norozi Ceremonial Brass in Antique Chestnut",
    imageRights: "Drun. Atelier Benchmark Render &bull; Awaiting Owner Studio Shoot",
    leatherType: "Top-Grade European Calfskin Hand-Finished with Beeswax",
    soleType: "Traditional Three-Piece Welted Leather and Tyre Composite",
    footwearStyle: "Ceremonial Royal Norozi",
    color: "Royal Antique Chestnut",
    colorHex: "#6B3410",
    sizes: [40, 41, 42, 43, 44, 45],
    rating: 5.0,
    reviewCount: 41,
    featured: true,
    isNew: false,
    isSignature: true,
    weight: "950g per pair",
    description: "Created for Eid and wedding ceremonies. Hand-crafted solid milled brass hardware, micro-perforated comfort lining, and immaculate double-welt saddle stitch along the entire silhouette.",
    craftDetails: [
      "Choice selection European calfskin with deep gloss finish",
      "CNC-milled solid brass buckle with Drun crest engraving",
      "Three-piece stacked leather and tyre sole with bevelled edge",
      "Memory foam padding throughout arch and heel"
    ],
    careInstructions: [
      "Polish with beeswax balm to preserve mirror surface",
      "Keep buckles polished with dry flannel"
    ],
    deliveryInfo: "Complimentary tracked courier delivery across Pakistan (2–4 business days).",
    returnPolicy: "14-day complimentary size exchange in original packaging."
  },

  // ============================================================================
  // COLLECTION 4: MODERN & SIGNATURE (6 PRODUCTS) - DRAFT (AWAITING STUDIO ASSETS)
  // ============================================================================
  {
    id: "drun-24",
    sku: "DRN-MOD-001",
    name: "The Modern Charsadda Slate",
    slug: "modern-charsadda-slate",
    tagline: "Matte velour nubuck in charcoal slate with ultra-light flex sole",
    category: "Modern & Signature",
    categorySlug: "modern",
    brand: "Drun.",
    price: 14800,
    originalPrice: 16500,
    inStock: true,
    stockCount: 16,
    status: "draft",
    photoStatus: "awaiting_studio_assets",
    image: "/products/modern-charsadda-slate.png",
    additionalImages: [
      "/products/modern-charsadda-slate.png",
      "/products/modern-charsadda-slate-side.png",
      "/products/modern-charsadda-slate-top.png"
    ],
    imageAlt: "The Modern Charsadda Slate in Matte Nubuck",
    imageRights: "Drun. Atelier Benchmark Render &bull; Awaiting Owner Studio Shoot",
    leatherType: "Matte Velour Nubuck Calfskin with Water-Repellent Coating",
    soleType: "Featherweight Molded EVA Outsole with Geometric Flex Grooves",
    footwearStyle: "Contemporary Minimalist Charsadda",
    color: "Slate Charcoal",
    colorHex: "#353839",
    sizes: [39, 40, 41, 42, 43, 44, 45],
    rating: 4.8,
    reviewCount: 15,
    featured: false,
    isNew: true,
    isSignature: false,
    weight: "680g per pair",
    description: "Re-engineering the timeless Charsadda aesthetic for contemporary urban movement. Ultra-supple matte slate nubuck paired with an ultra-light EVA midsole that delivers sneaker-grade cushioning.",
    craftDetails: [
      "Velvety European nubuck with Scotchgard protective treatment",
      "Featherweight EVA compound sole weighing 40% less than tyre bases",
      "Minimalist hidden buckle closure mechanism",
      "Breathable moisture-wicking perforated footbed"
    ],
    careInstructions: [
      "Brush regularly with dedicated nubuck brush",
      "Avoid wax polishes that matte out the nap"
    ],
    deliveryInfo: "Complimentary tracked courier delivery across Pakistan (2–4 business days).",
    returnPolicy: "14-day complimentary size exchange in original packaging."
  },
  {
    id: "drun-25",
    sku: "DRN-MOD-002",
    name: "The Dual-Tone Cognac & Charcoal",
    slug: "dual-tone-cognac-charcoal",
    tagline: "Interlocking cognac instep wings set against dark slate bridle leather",
    category: "Modern & Signature",
    categorySlug: "modern",
    brand: "Drun.",
    price: 15900,
    originalPrice: 18000,
    inStock: true,
    stockCount: 12,
    status: "draft",
    photoStatus: "awaiting_studio_assets",
    image: "/products/dual-tone-cognac-charcoal.png",
    additionalImages: [
      "/products/dual-tone-cognac-charcoal.png",
      "/products/dual-tone-cognac-charcoal-side.png",
      "/products/dual-tone-cognac-charcoal-top.png"
    ],
    imageAlt: "The Dual-Tone Cognac & Charcoal Peshawari Chappal",
    imageRights: "Drun. Atelier Benchmark Render &bull; Awaiting Owner Studio Shoot",
    leatherType: "Combination Full-Grain Cognac Pull-Up and Dark Slate Bridle Leather",
    soleType: "Dual-Density Rubber and Leather Welted Sole",
    footwearStyle: "Dual-Tone Contemporary Statement",
    color: "Cognac & Slate",
    colorHex: "#8B4513",
    sizes: [40, 41, 42, 43, 44, 45],
    rating: 4.9,
    reviewCount: 20,
    featured: true,
    isNew: true,
    isSignature: true,
    weight: "820g per pair",
    description: "A bold dual-tone statement. Warm cognac instep wings interlock over a dark charcoal toe box, framed by contrast cream welt stitching and a brushed antique brass roller buckle.",
    craftDetails: [
      "Two contrasting leather tannages cut and matched by master cobbler",
      "Precision twin-needle contrast border stitch",
      "Dual-density sole with arch-supporting shank",
      "Brushed solid brass buckle with micro pin"
    ],
    careInstructions: [
      "Use neutral conditioner across both leather zones",
      "Store with shoe trees to maintain wing geometry"
    ],
    deliveryInfo: "Complimentary tracked courier delivery across Pakistan (2–4 business days).",
    returnPolicy: "14-day complimentary size exchange in original packaging."
  },
  {
    id: "drun-26",
    sku: "DRN-MOD-003",
    name: "The Minimalist Monolith Tan",
    slug: "minimalist-monolith-tan",
    tagline: "Single-piece unlined Italian calfskin upper with flush edge sole",
    category: "Modern & Signature",
    categorySlug: "modern",
    brand: "Drun.",
    price: 14200,
    originalPrice: 15800,
    inStock: true,
    stockCount: 18,
    status: "draft",
    photoStatus: "awaiting_studio_assets",
    image: "/products/minimalist-monolith-tan.png",
    additionalImages: [
      "/products/minimalist-monolith-tan.png",
      "/products/minimalist-monolith-tan-side.png",
      "/products/minimalist-monolith-tan-top.png"
    ],
    imageAlt: "The Minimalist Monolith Tan in Unlined Italian Calfskin",
    imageRights: "Drun. Atelier Benchmark Render &bull; Awaiting Owner Studio Shoot",
    leatherType: "Unlined Vegetable-Tanned Italian Calfskin",
    soleType: "Sleek 8mm Flush Leather and Rubber Compound Sole",
    footwearStyle: "Ultra-Clean Monolith Cut",
    color: "Biscuit Tan",
    colorHex: "#C49B71",
    sizes: [39, 40, 41, 42, 43, 44],
    rating: 4.8,
    reviewCount: 13,
    featured: false,
    isNew: false,
    isSignature: false,
    weight: "710g per pair",
    description: "Radical minimalism. Designed with a clean, unadorned single-piece upper strap and hidden elastic instep gusset. The unlined interior breathes effortlessly in high humidity.",
    craftDetails: [
      "One-piece whole-cut instep upper reducing seams to absolute minimum",
      "Concealed elastic stretch gusset under side strap for easy slip-on",
      "Flush-edge sole profile without projecting welt",
      "Moulded anatomical leather footbed"
    ],
    careInstructions: [
      "Wipe clean with dry microfibre cloth",
      "Apply light neutral leather cream"
    ],
    deliveryInfo: "Complimentary tracked courier delivery across Pakistan (2–4 business days).",
    returnPolicy: "14-day complimentary size exchange in original packaging."
  },
  {
    id: "drun-27",
    sku: "DRN-MOD-004",
    name: "The Urban Slipstream Black",
    slug: "urban-slipstream-black",
    tagline: "Buttery soft nappa leather with contour rebound footbed",
    category: "Modern & Signature",
    categorySlug: "modern",
    brand: "Drun.",
    price: 14900,
    originalPrice: 16800,
    inStock: true,
    stockCount: 19,
    status: "draft",
    photoStatus: "awaiting_studio_assets",
    image: "/products/urban-slipstream-black.png",
    additionalImages: [
      "/products/urban-slipstream-black.png",
      "/products/urban-slipstream-black-side.png",
      "/products/urban-slipstream-black-top.png"
    ],
    imageAlt: "The Urban Slipstream Black in Glove Nappa Leather",
    imageRights: "Drun. Atelier Benchmark Render &bull; Awaiting Owner Studio Shoot",
    leatherType: "Semi-Matte Micro-Grain Nappa Leather",
    soleType: "Contoured Ergonomic Arch Footbed with High-Rebound Rubber",
    footwearStyle: "Urban Ergonomic Chappal",
    color: "Pitch Obsidian",
    colorHex: "#121212",
    sizes: [40, 41, 42, 43, 44, 45, 46],
    rating: 4.9,
    reviewCount: 24,
    featured: false,
    isNew: true,
    isSignature: false,
    weight: "740g per pair",
    description: "Engineered for international travellers and active gentlemen. Soft-tempered nappa leather requires zero break-in period, paired with a memory foam insole that cushions every stride.",
    craftDetails: [
      "Ultra-supple milled nappa leather offering glove-like embrace",
      "Deep contour orthotic arch support with shock rebound foam",
      "Non-marking rubber tread outsole",
      "Refined low-profile black oxide buckle"
    ],
    careInstructions: [
      "Dust off after travel with a damp sponge",
      "Condition lightly with delicate leather cream"
    ],
    deliveryInfo: "Complimentary tracked courier delivery across Pakistan (2–4 business days).",
    returnPolicy: "14-day complimentary size exchange in original packaging."
  },
  {
    id: "drun-28",
    sku: "DRN-MOD-005",
    name: "The Heritage Olive Nubuck",
    slug: "heritage-olive-nubuck",
    tagline: "Earthy olive velour nubuck paired with natural crepe rubber sole",
    category: "Modern & Signature",
    categorySlug: "modern",
    brand: "Drun.",
    price: 15400,
    originalPrice: 17200,
    inStock: true,
    stockCount: 13,
    status: "draft",
    photoStatus: "awaiting_studio_assets",
    image: "/products/heritage-olive-nubuck.png",
    additionalImages: [
      "/products/heritage-olive-nubuck.png",
      "/products/heritage-olive-nubuck-side.png",
      "/products/heritage-olive-nubuck-top.png"
    ],
    imageAlt: "The Heritage Olive Nubuck with Gunmetal Buckle",
    imageRights: "Drun. Atelier Benchmark Render &bull; Awaiting Owner Studio Shoot",
    leatherType: "Brushed European Velour Nubuck with Scotchgard Guard",
    soleType: "Natural Crepe-Compound Rubber Sole with Textured Tread",
    footwearStyle: "Contemporary Textured Olive Cut",
    color: "Muted Olive Field",
    colorHex: "#555D50",
    sizes: [39, 40, 41, 42, 43, 44],
    rating: 4.8,
    reviewCount: 16,
    featured: true,
    isNew: true,
    isSignature: false,
    weight: "790g per pair",
    description: "Earthy olive velour nubuck offers an understated luxury alternative to traditional browns. Complemented by brushed gunmetal buckle hardware and an anatomically shaped heel cup.",
    craftDetails: [
      "Heavy-nap olive velour nubuck with stain repellent treatment",
      "Raw-edge natural veg-tan welt trim",
      "Quiet, shock-absorbing crepe rubber sole",
      "Gunmetal grey roller buckle with engraved serial mark"
    ],
    careInstructions: [
      "Brush nap with crepe block",
      "Spray with water-resistant nubuck protector"
    ],
    deliveryInfo: "Complimentary tracked courier delivery across Pakistan (2–4 business days).",
    returnPolicy: "14-day complimentary size exchange in original packaging."
  },
  {
    id: "drun-29",
    sku: "DRN-MOD-006",
    name: "The Signature Gala Velvet & Calf",
    slug: "signature-gala-velvet-calf",
    tagline: "Ceremonial midnight navy Italian velvet with black patent calf welting",
    category: "Modern & Signature",
    categorySlug: "modern",
    brand: "Drun.",
    price: 18200,
    originalPrice: 21500,
    inStock: true,
    stockCount: 8,
    status: "draft",
    photoStatus: "awaiting_studio_assets",
    image: "/products/signature-gala-velvet-calf.png",
    additionalImages: [
      "/products/signature-gala-velvet-calf.png",
      "/products/signature-gala-velvet-calf-side.png",
      "/products/signature-gala-velvet-calf-top.png"
    ],
    imageAlt: "The Signature Gala Velvet & Calf for Red-Carpet Occasions",
    imageRights: "Drun. Atelier Benchmark Render &bull; Awaiting Owner Studio Shoot",
    leatherType: "Deep Midnight Navy Italian Velvet with Black Patent Calf Trim",
    soleType: "Hand-Painted Black Leather Dress Sole with Rubber Traction Island",
    footwearStyle: "Black-Tie Gala Ceremonial Chappal",
    color: "Midnight Navy & Black",
    colorHex: "#1B263B",
    sizes: [40, 41, 42, 43, 44, 45],
    rating: 5.0,
    reviewCount: 38,
    featured: true,
    isNew: true,
    isSignature: true,
    weight: "830g per pair",
    description: "Drun's most exclusive black-tie ceremonial creation. Plush midnight navy velvet instep bounded by polished black calfskin welting, crafted specifically for wedding galas and formal red carpet occasions.",
    craftDetails: [
      "Imported high-pile crush-resistant Italian velvet",
      "Black patent calfskin welt edge with mirror shine",
      "Hand-painted piano-black leather sole with non-skid rubber island",
      "Quilted silk-satin inner footbed with arch cushion"
    ],
    careInstructions: [
      "Clean velvet surface with soft dry velvet brush only",
      "Store in individual velvet dust bags away from humidity"
    ],
    deliveryInfo: "Complimentary tracked courier delivery across Pakistan (2–4 business days).",
    returnPolicy: "14-day complimentary size exchange in original packaging."
  }
];

export const CATEGORIES = [
  {
    id: "classic",
    name: "Classic Peshawari",
    slug: "classic",
    description: "Traditional heritage silhouettes with hand-cut welted soles and time-honoured leather finishes.",
    count: 7
  },
  {
    id: "kaptaan",
    name: "Kaptaan Style",
    slug: "kaptaan",
    description: "Imposing architectural square-toe silhouette with hand-ground soles, deep instep wings, and antique insignia.",
    count: 7
  },
  {
    id: "norozi",
    name: "Norozi Style",
    slug: "norozi",
    description: "The crown jewel of Pashtun shoemaking featuring sweeping instep straps, thick cord double-welt stitching, and tyre soles.",
    count: 7
  },
  {
    id: "modern",
    name: "Modern & Signature",
    slug: "modern",
    description: "Contemporary Peshawari-inspired footwear with refined minimalist profiles, velvety nubuck textures, and dual-tone finishes.",
    count: 8
  },
  // Legacy aliases for backward compatibility
  {
    id: "heritage",
    name: "Heritage Collection",
    slug: "heritage",
    description: "Traditional character, refined for the present with heavy welt stitches and indestructible tyre soles.",
    count: 7
  },
  {
    id: "contemporary",
    name: "Contemporary Collection",
    slug: "contemporary",
    description: "Understated designs, suede textures, and muted tones crafted for modern metropolitan living.",
    count: 8
  }
];

export const CRAFTSMANSHIP_POINTS = [
  {
    index: "01",
    title: "The Leather",
    subtitle: "Full-Grain Bovine & Suede",
    desc: "Only the top 5% of hand-selected bovine hides are chosen for Drun footwear. Tanned using slow vegetable tannins that preserve the leather's natural breathability, tensile strength, and organic grain.",
    image: "/products/royal-norozi-cognac.png"
  },
  {
    index: "02",
    title: "The Stitch",
    subtitle: "Waxed Heavy Linen",
    desc: "Every stitch is placed by hand using braided linen thread coated in natural beeswax. Over 1,200 individual stitches secure the upper to the sole, preventing water seepage and sole separation.",
    image: "/products/kaptaan-stealth-black.png"
  },
  {
    index: "03",
    title: "The Silhouette",
    subtitle: "Anatomical Lasts",
    desc: "Engineered around custom wooden lasts that balance the iconic wide-stance posture of authentic Peshawari chappals with modern ergonomics, providing natural toe splay and heel stability.",
    image: "/products/charsadda-modern-black.png"
  },
  {
    index: "04",
    title: "The Finish",
    subtitle: "Artisan Burnishing",
    desc: "Raw edges are bevelled and burnished by hand using natural carnauba wax and bone tools. Each pair undergoes three stages of inspection before receiving the Drun seal of craftsmanship.",
    image: "/products/safari-suede-tan.png"
  }
];

export const FAQS = [
  {
    q: "How do I choose the correct size?",
    a: "Drun footwear follows standard European sizing (EU 39–46). Since traditional Peshawari chappals feature an adjustable instep buckle and an open heel, we recommend selecting your true dress shoe size. If you have particularly wide feet or high insteps, you can consult our interactive Size Guide or contact our concierge via WhatsApp."
  },
  {
    q: "Are Drun shoes made from genuine leather?",
    a: "Yes, without exception. Every pair of Drun shoes is handcrafted exclusively from 100% genuine full-grain bovine leather, calfskin, or Italian suede. We never use faux leather, bonded leather, or synthetic plastic substitutes."
  },
  {
    q: "How long does delivery take across Pakistan and internationally?",
    a: "Domestic orders within Pakistan are delivered within 2–4 business days via tracked express couriers (TCS / Leopard / Call Courier). Major cities like Lahore, Karachi, Islamabad, and Peshawar frequently arrive within 48 hours. International shipments take 5–8 business days via DHL Express."
  },
  {
    q: "Can I exchange or return my shoes if the size doesn't fit?",
    a: "Absolutely. We offer a hassle-free 14-day exchange and return policy. As long as the shoes are unworn on outdoor surfaces and in their original dust bags and luxury box, we will arrange a complimentary size exchange or full refund."
  },
  {
    q: "What payment methods are available?",
    a: "For orders across Pakistan, we support Cash on Delivery (COD), Direct Bank Transfer, and secure online credit/debit card payments. All transactions are SSL encrypted and processed with zero hidden fees."
  },
  {
    q: "How should I care for my Peshawari footwear?",
    a: "Dust your chappals with a soft horsehair brush after wear. For smooth leathers, apply a small amount of beeswax or neutral leather cream every few months. For suede models, use a dry crepe brush. Avoid soaking in water; if exposed to rain, allow them to air-dry naturally away from artificial heat."
  }
];
