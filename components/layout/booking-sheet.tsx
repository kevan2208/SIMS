"use client";

import { useEffect, useRef } from "react";

import { ActionIcon } from "@/components/ui/action-icon";
import { useBooking } from "@/lib/booking";
import { useLang } from "@/lib/i18n";
import { trackTap } from "@/lib/track";

/**
 * The booking list opened up: every picked service with its price and a remove button,
 * the estimated total, and the WhatsApp button. Styled as the same appointment ticket,
 * torn along a dashed line between the list and the total.
 */
export function BookingSheet({ onClose, total }: { onClose: () => void; total: string | null }) {
  const { items, remove, clear, href } = useBooking();
  const { t } = useLang();
  const closeRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  // Escape closes, the page behind doesn't scroll, focus starts on the close button and stays inside.
  useEffect(() => {
    closeRef.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !sheetRef.current) return;
      const focusable = sheetRef.current.querySelectorAll<HTMLElement>("button, a[href]");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <>
      <div aria-hidden="true" className="sheet-veil fixed inset-0 z-[60] bg-[rgba(110,70,81,0.3)]" onClick={onClose} />
      <div
        aria-labelledby="booking-sheet-title"
        aria-modal="true"
        className="sheet-in fixed inset-x-3 bottom-3 z-[61] mx-auto flex max-h-[85dvh] max-w-[30rem] flex-col sm:bottom-5"
        ref={sheetRef}
        role="dialog"
      >
        <div className="dock-lift flex min-h-0 flex-col">
          <div className="sheet-top flex min-h-0 flex-col rounded-t-2xl px-[1.1rem] pb-3 pt-2.5">
            <div aria-hidden="true" className="mx-auto mb-3 h-1 w-10 rounded-full bg-[#e3a7b6]" />
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-[1.55rem] leading-tight text-ink" id="booking-sheet-title">
                  {t.dock.title}
                </h2>
                <p className="mt-0.5 text-[0.82rem] text-mauve">{t.dock.count(items.length)}</p>
              </div>
              <button
                aria-label={t.dock.close}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#ecc3cf] text-plum hover:bg-white"
                onClick={onClose}
                ref={closeRef}
                type="button"
              >
                <svg aria-hidden="true" fill="none" height="14" viewBox="0 0 14 14" width="14">
                  <path d="M3 5.5 7 9.5l4-4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
                </svg>
              </button>
            </div>

            <ul className="mt-2 min-h-0 overflow-y-auto overscroll-contain">
              {items.map((i) => (
                <li className="grid grid-cols-[minmax(0,1fr)_auto_2.5rem] items-center gap-2.5 border-t border-[#f3d9e0] py-3" key={i.id}>
                  <span className="text-[0.97rem] leading-snug text-ink">
                    {i.label ?? i.name}
                    {i.category ? <span className="block text-[0.76rem] text-mauve">{i.category}</span> : null}
                  </span>
                  <span className="whitespace-nowrap text-[0.94rem] font-semibold text-ink">{i.price}</span>
                  <button
                    aria-label={t.dock.remove(i.label ?? i.name)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-[#ecc3cf] text-[#a65a6c] hover:bg-white"
                    onClick={() => remove(i.id)}
                    type="button"
                  >
                    <svg aria-hidden="true" fill="none" height="11" viewBox="0 0 12 12" width="11">
                      <path d="M3 3l6 6M9 3 3 9" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="sheet-bottom relative shrink-0 rounded-b-2xl px-[1.1rem] pb-4 pt-4">
            <div aria-hidden="true" className="absolute inset-x-4 top-0 border-t-[1.5px] border-dashed border-[#e3a7b6]" />
            {total ? (
              <p className="flex items-baseline justify-between gap-3">
                <span className="text-[0.85rem] text-mauve">{t.dock.estimated}</span>
                <span className="font-display text-[1.4rem] text-ink">{total}</span>
              </p>
            ) : null}
            <p className="mb-3.5 mt-1 text-[0.76rem] leading-relaxed text-mauve">{t.dock.note}</p>
            <a
              className="dock-stub flex h-[3.25rem] items-center justify-center gap-2 rounded-xl text-[0.97rem] font-semibold text-white"
              href={href}
              onClick={() => trackTap("book-list", items.map((i) => i.id).join("|"))}
              rel="noreferrer"
              target="_blank"
            >
              <ActionIcon className="h-5 w-5" name="whatsapp" />
              {t.dock.bookAll}
            </a>
            <p className="mt-2 text-center">
              <button className="min-h-10 px-3 text-[0.85rem] font-semibold text-plum underline underline-offset-[3px] hover:text-ink" onClick={clear} type="button">
                {t.dock.clearAll}
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
