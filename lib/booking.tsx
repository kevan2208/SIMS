"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { whatsappLink } from "@/content/site";

export type BookingItem = { name: string; price: string };

/** "Rs 700" is fixed; "From Rs 300" and "Rs 600 to 800" depend on hair length or styling time. */
export function fixedPrice(price: string): number | null {
  const match = /^Rs\s?(\d+)$/.exec(price.trim());
  return match ? Number(match[1]) : null;
}

export function bookingMessage(items: BookingItem[]) {
  const lines = items.map((i) => {
    const fixed = fixedPrice(i.price);
    return fixed === null ? `• ${i.name}` : `• ${i.name} (Rs ${fixed})`;
  });
  const needsQuote = items.some((i) => fixedPrice(i.price) === null);

  return [
    "Hello Sim's Hair and Beauty, I'd like to book:",
    ...lines,
    needsQuote ? "Could you confirm the price for my hair length, and share your availability?" : "Could you share your availability?"
  ].join("\n");
}

/** Total in rupees, or null when any picked service has a variable price. */
export function bookingTotal(items: BookingItem[]): number | null {
  let total = 0;
  for (const i of items) {
    const fixed = fixedPrice(i.price);
    if (fixed === null) return null;
    total += fixed;
  }
  return total;
}

type BookingContextValue = {
  items: BookingItem[];
  has: (name: string) => boolean;
  toggle: (item: BookingItem) => void;
  clear: () => void;
  href: string;
};

const BookingContext = createContext<BookingContextValue | null>(null);
const STORAGE_KEY = "sims-booking";

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<BookingItem[]>([]);

  // Remember the list while someone moves between the homepage and the price page.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const has = useCallback((name: string) => items.some((i) => i.name === name), [items]);
  const toggle = useCallback(
    (item: BookingItem) =>
      setItems((current) =>
        current.some((i) => i.name === item.name) ? current.filter((i) => i.name !== item.name) : [...current, item]
      ),
    []
  );
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({ items, has, toggle, clear, href: whatsappLink(bookingMessage(items)) }),
    [items, has, toggle, clear]
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside BookingProvider");
  return ctx;
}
