export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  badge: "New" | "Bestseller" | "Sale" | null;
  images: string[];
  shortDescription: string;
  features: string[];
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    slug: "opal-pro-earbuds",
    name: "Opal Pro Earbuds",
    category: "Earbuds",
    price: 4999,
    originalPrice: 9999,
    discountPercent: 50,
    rating: 4.8,
    reviewCount: 342,
    badge: "Bestseller",
    images: [
      "/images/hero-earbuds.png",
      "/images/earbuds-1.png",
      "/images/hero-earbuds.png",
      "/images/earbuds-1.png",
    ],
    shortDescription: "Premium active noise cancellation with 40-hour battery life and immersive sound quality.",
    features: [
      "Active Noise Cancellation (ANC)",
      "40 Hours Playtime",
      "Bluetooth 5.3",
      "IPX5 Water Resistant",
      "Touch Controls"
    ],
    inStock: true
  },
  {
    id: "2",
    slug: "lyf-smart-watch",
    name: "Lyf Smart Watch",
    category: "Smart Watches",
    price: 6999,
    originalPrice: 11999,
    discountPercent: 41,
    rating: 4.9,
    reviewCount: 512,
    badge: "New",
    images: [
      "/images/smartwatch-1.png",
      "/images/smartwatch-2.png",
      "/images/smartwatch-1.png",
      "/images/smartwatch-2.png",
    ],
    shortDescription: "Sleek metallic design with 1.9-inch AMOLED display and advanced health tracking.",
    features: [
      "1.9\" AMOLED Display",
      "Bluetooth Calling",
      "Heart Rate & SpO2 Monitor",
      "Multiple Sports Modes",
      "7 Days Battery Life"
    ],
    inStock: true
  },
  {
    id: "3",
    slug: "zbuds-anc",
    name: "ZBuds ANC",
    category: "Earbuds",
    price: 3499,
    originalPrice: 6999,
    discountPercent: 50,
    rating: 4.7,
    reviewCount: 890,
    badge: "Sale",
    images: [
      "/images/earbuds-1.png",
      "/images/hero-earbuds.png",
      "/images/earbuds-1.png",
      "/images/hero-earbuds.png",
    ],
    shortDescription: "Compact and powerful earbuds with deep bass and environmental noise cancellation.",
    features: [
      "Environmental Noise Cancellation",
      "10mm Dynamic Drivers",
      "30 Hours Playtime",
      "Fast Charging",
      "Voice Assistant Support"
    ],
    inStock: true
  },
  {
    id: "4",
    slug: "bolt-wireless-headphones",
    name: "Bolt Wireless Headphones",
    category: "Headphones",
    price: 8999,
    originalPrice: 14999,
    discountPercent: 40,
    rating: 4.6,
    reviewCount: 210,
    badge: null,
    images: [
      "/images/headphones-1.png",
      "/images/headphones-1.png",
      "/images/headphones-1.png",
      "/images/headphones-1.png",
    ],
    shortDescription: "Over-ear premium headphones offering studio-quality audio and all-day comfort.",
    features: [
      "High-Res Audio",
      "Memory Foam Cushions",
      "50 Hours Battery Life",
      "Built-in EQ Modes",
      "Foldable Design"
    ],
    inStock: true
  },
  {
    id: "5",
    slug: "pulse-bluetooth-speaker",
    name: "Pulse Bluetooth Speaker",
    category: "Speakers",
    price: 4499,
    originalPrice: 7999,
    discountPercent: 43,
    rating: 4.5,
    reviewCount: 156,
    badge: "Sale",
    images: [
      "/images/speaker-1.png",
      "/images/speaker-1.png",
      "/images/speaker-1.png",
      "/images/speaker-1.png",
    ],
    shortDescription: "Portable rugged speaker with 360-degree sound and dynamic RGB lighting.",
    features: [
      "360° Surround Sound",
      "RGB Light Show",
      "IP67 Waterproof",
      "12 Hours Playtime",
      "TWS Pairing"
    ],
    inStock: true
  },
  {
    id: "6",
    slug: "flux-earbuds",
    name: "Flux Earbuds",
    category: "Earbuds",
    price: 2999,
    originalPrice: 5999,
    discountPercent: 50,
    rating: 4.4,
    reviewCount: 423,
    badge: null,
    images: [
      "/images/earbuds-1.png",
      "/images/hero-earbuds.png",
      "/images/earbuds-1.png",
      "/images/hero-earbuds.png",
    ],
    shortDescription: "Everyday essentials with clear sound and a lightweight, ergonomic fit.",
    features: [
      "Ergonomic Fit",
      "Clear Voice Calls",
      "24 Hours Playtime",
      "Auto Pairing",
      "Lightweight Design"
    ],
    inStock: true
  },
  {
    id: "7",
    slug: "stellar-smartwatch",
    name: "Stellar Smartwatch",
    category: "Smart Watches",
    price: 5499,
    originalPrice: 9999,
    discountPercent: 45,
    rating: 4.8,
    reviewCount: 310,
    badge: "Bestseller",
    images: [
      "/images/smartwatch-2.png",
      "/images/smartwatch-1.png",
      "/images/smartwatch-2.png",
      "/images/smartwatch-1.png",
    ],
    shortDescription: "Sporty design perfect for fitness enthusiasts with comprehensive activity tracking.",
    features: [
      "1.8\" HD Display",
      "100+ Sports Modes",
      "IP68 Water Resistant",
      "Sleep Tracking",
      "Custom Watch Faces"
    ],
    inStock: true
  },
  {
    id: "8",
    slug: "echo-mini-speaker",
    name: "Echo Mini Speaker",
    category: "Speakers",
    price: 2499,
    originalPrice: 4999,
    discountPercent: 50,
    rating: 4.6,
    reviewCount: 189,
    badge: null,
    images: [
      "/images/speaker-1.png",
      "/images/speaker-1.png",
      "/images/speaker-1.png",
      "/images/speaker-1.png",
    ],
    shortDescription: "Ultra-portable mini speaker that delivers surprisingly powerful bass.",
    features: [
      "Pocket-Sized",
      "Deep Bass",
      "10 Hours Playtime",
      "Built-in Mic",
      "Type-C Charging"
    ],
    inStock: true
  },
  {
    id: "9",
    slug: "nova-headphones",
    name: "Nova Headphones",
    category: "Headphones",
    price: 7499,
    originalPrice: 12999,
    discountPercent: 42,
    rating: 4.7,
    reviewCount: 267,
    badge: "New",
    images: [
      "/images/headphones-1.png",
      "/images/headphones-1.png",
      "/images/headphones-1.png",
      "/images/headphones-1.png",
    ],
    shortDescription: "Sleek and stylish headphones with punchy bass and crystal-clear vocals.",
    features: [
      "Dynamic Bass",
      "Multipoint Connection",
      "40 Hours Battery Life",
      "Comfort Fit",
      "Quick Charge"
    ],
    inStock: true
  },
  {
    id: "10",
    slug: "aero-earbuds-lite",
    name: "Aero Earbuds Lite",
    category: "Earbuds",
    price: 2499,
    originalPrice: 4999,
    discountPercent: 50,
    rating: 4.3,
    reviewCount: 112,
    badge: null,
    images: [
      "/images/earbuds-1.png",
      "/images/hero-earbuds.png",
      "/images/earbuds-1.png",
      "/images/hero-earbuds.png",
    ],
    shortDescription: "Minimalist true wireless earbuds designed for daily commutes.",
    features: [
      "Minimalist Design",
      "Low Latency Mode",
      "20 Hours Playtime",
      "Touch Controls",
      "Splash Proof"
    ],
    inStock: true
  },
  {
    id: "11",
    slug: "titan-smartwatch",
    name: "Titan Smartwatch",
    category: "Smart Watches",
    price: 8999,
    originalPrice: 15999,
    discountPercent: 43,
    rating: 4.9,
    reviewCount: 450,
    badge: "Bestseller",
    images: [
      "/images/smartwatch-1.png",
      "/images/smartwatch-2.png",
      "/images/smartwatch-1.png",
      "/images/smartwatch-2.png",
    ],
    shortDescription: "Premium titanium finish with a vibrant always-on display and precision sensors.",
    features: [
      "Titanium Alloy Body",
      "Always-On AMOLED",
      "Advanced Heart Tracking",
      "Bluetooth Calling",
      "GPS Tracking"
    ],
    inStock: true
  },
  {
    id: "12",
    slug: "bass-pro-speaker",
    name: "Bass Pro Speaker",
    category: "Speakers",
    price: 6499,
    originalPrice: 10999,
    discountPercent: 40,
    rating: 4.5,
    reviewCount: 220,
    badge: null,
    images: [
      "/images/speaker-1.png",
      "/images/speaker-1.png",
      "/images/speaker-1.png",
      "/images/speaker-1.png",
    ],
    shortDescription: "Powerful party speaker with heavy bass radiators and a rugged build.",
    features: [
      "Heavy Bass Radiators",
      "Party Mode",
      "15 Hours Playtime",
      "Powerbank Feature",
      "Shockproof Build"
    ],
    inStock: true
  }
];
