"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { whatsappLink } from "@/content/site";
import { useLang } from "@/lib/i18n";
import type { Strings } from "@/content/strings";

export type BookingItem = { id: string; name: string; price: string };

/** "Rs 700" is fixed; "From Rs 300" or "Rs 600 to 800" depend on hair length or styling time. */
export function fixedPrice(price: string): number | null {
  const match = /^Rs\s?(\d+)$/.exec(price.trim());
  return match ? Number(match[1]) : null;
}

export function bookingMessage(items: BookingItem[], t: Strings) {
  const lines = items.map((i) => {
    const fixed = fixedPrice(i.price);
    return fixed === null ? `• ${i.name}` : `• ${i.name} (Rs ${fixed})`;
  });
  const needsQuote = items.some((i) => fixedPrice(i.price) === null);
  return [t.message.hello, ...lines, needsQuote ? t.message.confirmAndAvailability : t.message.availability].join("\n");
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
  has: (id: string) => boolean;
  toggle: (item: BookingItem) => void;
  clear: () => void;
  href: string;
};

const BookingContext = createContext<BookingContextValue | null>(null);
const STORAGE_KEY = "sims-booking";

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const { t } = useLang();
  const [items, setItems] = useState<BookingItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Remember the list while someone moves between pages.
  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "[]");
      if (Array.isArray(saved)) setItems(saved.filter((i) => i && typeof i.id === "string"));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, loaded]);

  const has = useCallback((id: string) => items.some((i) => i.id === id), [items]);
  const toggle = useCallback(
    (item: BookingItem) =>
      setItems((current) => (current.some((i) => i.id === item.id) ? current.filter((i) => i.id !== item.id) : [...current, item])),
    []
  );
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({ items, has, toggle, clear, href: whatsappLink(bookingMessage(items, t)) }),
    [items, has, toggle, clear, t]
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside BookingProvider");
  return ctx;
}
