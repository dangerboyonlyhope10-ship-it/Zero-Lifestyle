import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { products as defaultProducts, Product } from "@/data/products";

export interface OrderItemSnapshot {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  lineTotal: number;
}

export type OrderStatus = "new" | "processing" | "completed" | "cancelled";
export type PaymentLabel = "Cash on Delivery" | "JazzCash" | "EasyPaisa" | "Bank Transfer";

export interface Order {
  id: string;
  createdAt: number;
  status: OrderStatus;
  customer: {
    fullName: string;
    phone: string;
    city: string;
    address: string;
    notes?: string;
  };
  items: OrderItemSnapshot[];
  subtotal: number;
  onlineDiscount: number;
  total: number;
  paymentMethod: PaymentLabel;
}

export interface HeroSettings {
  badge: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaLink: string;
  image: string;
}

export interface SaleSettings {
  enabled: boolean;
  title: string;
  subtitle: string;
  endsAt: number; // timestamp
}

interface SiteState {
  products: Product[];
  orders: Order[];
  hero: HeroSettings;
  sale: SaleSettings;
  promoMessages: string[];
}

interface SiteContextType extends SiteState {
  // Orders
  addOrder: (order: Omit<Order, "createdAt" | "status">) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  deleteOrder: (id: string) => void;
  // Products
  updateProduct: (id: string, patch: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addProduct: (product: Product) => void;
  // Settings
  updateHero: (patch: Partial<HeroSettings>) => void;
  updateSale: (patch: Partial<SaleSettings>) => void;
  updatePromoMessages: (msgs: string[]) => void;
  // Admin reset
  resetAll: () => void;
}

const STORAGE_KEY = "desicart_site_state_v1";

const defaultHero: HeroSettings = {
  badge: "New Launch",
  title: "Opal Pro\nEarbuds",
  subtitle: "Silence the noise. Amplify the music. 40 hours of pure audio.",
  ctaLabel: "Shop Now",
  ctaLink: "/product/opal-pro-earbuds",
  image: "/images/hero-earbuds.png",
};

const defaultSale: SaleSettings = {
  enabled: true,
  title: "Flash Sale Ends In",
  subtitle: "Hurry! Up to 50% OFF on bestsellers",
  endsAt: Date.now() + 1000 * 60 * 60 * 24 * 2, // 2 days
};

const defaultPromoMessages: string[] = [
  "Congratulations 🎉! FREE DELIVERY applied.",
  "🔥 Flash Sale Live — Up to 50% OFF",
  "💳 Pay Online & Save 5% Extra",
];

const buildDefaultState = (): SiteState => ({
  products: defaultProducts,
  orders: [],
  hero: defaultHero,
  sale: defaultSale,
  promoMessages: defaultPromoMessages,
});

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SiteState>(buildDefaultState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Partial<SiteState>;
        setState({
          products: parsed.products?.length ? parsed.products : defaultProducts,
          orders: parsed.orders ?? [],
          hero: { ...defaultHero, ...(parsed.hero ?? {}) },
          sale: { ...defaultSale, ...(parsed.sale ?? {}) },
          promoMessages: parsed.promoMessages?.length ? parsed.promoMessages : defaultPromoMessages,
        });
      } catch (e) {
        console.error("Failed to parse site state", e);
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error("Failed to persist site state", e);
    }
  }, [state, hydrated]);

  const addOrder: SiteContextType["addOrder"] = (order) => {
    setState((prev) => ({
      ...prev,
      orders: [
        { ...order, createdAt: Date.now(), status: "new" },
        ...prev.orders,
      ],
    }));
  };

  const updateOrderStatus: SiteContextType["updateOrderStatus"] = (id, status) => {
    setState((prev) => ({
      ...prev,
      orders: prev.orders.map((o) => (o.id === id ? { ...o, status } : o)),
    }));
  };

  const deleteOrder: SiteContextType["deleteOrder"] = (id) => {
    setState((prev) => ({
      ...prev,
      orders: prev.orders.filter((o) => o.id !== id),
    }));
  };

  const updateProduct: SiteContextType["updateProduct"] = (id, patch) => {
    setState((prev) => ({
      ...prev,
      products: prev.products.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    }));
  };

  const deleteProduct: SiteContextType["deleteProduct"] = (id) => {
    setState((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.id !== id),
    }));
  };

  const addProduct: SiteContextType["addProduct"] = (product) => {
    setState((prev) => ({
      ...prev,
      products: [product, ...prev.products],
    }));
  };

  const updateHero: SiteContextType["updateHero"] = (patch) => {
    setState((prev) => ({ ...prev, hero: { ...prev.hero, ...patch } }));
  };

  const updateSale: SiteContextType["updateSale"] = (patch) => {
    setState((prev) => ({ ...prev, sale: { ...prev.sale, ...patch } }));
  };

  const updatePromoMessages: SiteContextType["updatePromoMessages"] = (msgs) => {
    setState((prev) => ({ ...prev, promoMessages: msgs }));
  };

  const resetAll: SiteContextType["resetAll"] = () => {
    setState(buildDefaultState());
  };

  return (
    <SiteContext.Provider
      value={{
        ...state,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        updateProduct,
        deleteProduct,
        addProduct,
        updateHero,
        updateSale,
        updatePromoMessages,
        resetAll,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within SiteProvider");
  return ctx;
}
