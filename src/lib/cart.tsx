import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number; // BRL monthly
  description: string;
};

export type CartItem = Product & { quantity: number };

type CartCtx = {
  items: CartItem[];
  add: (p: Product) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  total: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "flytech_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {}
  }, [items]);

  const add = (p: Product) =>
    setItems((cur) => {
      const f = cur.find((i) => i.id === p.id);
      if (f) return cur.map((i) => (i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i));
      return [...cur, { ...p, quantity: 1 }];
    });
  const remove = (id: string) => setItems((cur) => cur.filter((i) => i.id !== id));
  const setQty = (id: string, qty: number) =>
    setItems((cur) => cur.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, qty) } : i)));
  const clear = () => setItems([]);

  const count = items.reduce((a, i) => a + i.quantity, 0);
  const total = items.reduce((a, i) => a + i.quantity * i.price, 0);

  return (
    <Ctx.Provider value={{ items, add, remove, setQty, clear, count, total, isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
}

export const formatBRL = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
