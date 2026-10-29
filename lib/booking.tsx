"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { whatsappLink } from "@/content/site";
import { useLang } from "@/lib/i18n";
import type { Strings } from "@/content/strings";
import { formatPrice, sumPrices } from "@/lib/price";

/** name: as it appears in the WhatsApp message. label/category: shown in the open booking list. */
export type BookingItem = { id: string; name: string; price: string; label?: string; category?: string };

/** Estimated total for the picked services, e.g. "Rs 1,050 – 2,250", or null if a price can't be read. */
export function bookingTotal(items: BookingItem[]): string | null {
  if (items.length === 0) return null;
  const sum = sumPrices(items.map((i) => i.price));
  return sum ? formatPrice(sum) : null;
}

export function bookingMessage(items: BookingItem[], t: Strings) {
  const lines = items.map((i) => (i.price ? `• ${i.name} (${i.price})` : `• ${i.name}`));
  const total = items.length > 1 ? bookingTotal(items) : null;
  return [t.message.hello, ...lines, ...(total ? [t.message.total(total)] : []), t.message.availability].join("\n");
}

type BookingContextValue = {
  items: BookingItem[];
  has: (id: string) => boolean;
  toggle: (item: BookingItem) => void;
  remove: (id: string) => void;
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
  const remove = useCallback((id: string) => setItems((current) => current.filter((i) => i.id !== id)), []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({ items, has, toggle, remove, clear, href: whatsappLink(bookingMessage(items, t)) }),
    [items, has, toggle, remove, clear, t]
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside BookingProvider");
  return ctx;
}
