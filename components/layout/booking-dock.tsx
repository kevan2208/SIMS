"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { ActionIcon } from "@/components/ui/action-icon";
import { useOpenStatus } from "@/components/ui/open-status";
import { TrackedLink } from "@/components/ui/tracked-link";
import { openingHours, whatsappLink } from "@/content/site";
import { bookingTotal, useBooking } from "@/lib/booking";
import { useLang } from "@/lib/i18n";
import { trackTap } from "@/lib/track";
import { cn } from "@/lib/utils";

/**
 * The bottom of the screen has one job at a time:
 * - services picked: the booking card listing them, with "Book on WhatsApp";
 * - nothing picked, on a phone, once the hero booking card has scrolled away: a slim "Book on WhatsApp" bar.
 */
export function BookingDock() {
  const { items, clear, href } = useBooking();
  const pathname = usePathname();
  const [heroCardVisible, setHeroCardVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLang();
  const open = useOpenStatus();
  const status = open === null ? null : open.open ? t.status.barOpen(openingHours.closes) : t.status.barClosed;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const hero = document.getElementById("hero-booking");
    let observer: IntersectionObserver | null = null;
    if (hero) {
      observer = new IntersectionObserver(([entry]) => setHeroCardVisible(entry.isIntersecting));
      observer.observe(hero);
    } else {
      setHeroCardVisible(false);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, [pathname]);

  // A small hop on the card each time something is added to an already-open list.
  const [hop, setHop] = useState(0);
  const prevCount = useRef(items.length);
  useEffect(() => {
    if (items.length > prevCount.current && prevCount.current > 0) setHop((h) => h + 1);
    prevCount.current = items.length;
  }, [items.length]);

  const picked = items.length > 0;
  const total = bookingTotal(items);
  const showBar = !picked && scrolled && !heroCardVisible;

  return (
    <>
      {/* Keeps the footer from sitting under the dock on phones. */}
      <div aria-hidden="true" className={cn(picked || showBar ? "h-24" : "h-0", "sm:h-0", picked && "sm:h-28")} />

      <div
        aria-live="polite"
        className={cn(
          "fixed inset-x-3 bottom-3 z-50 mx-auto max-w-[30rem] transition-all duration-300 sm:bottom-5",
          picked ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        )}
      >
        {picked ? (
          <div className={cn("dock-lift", hop > 0 && "dock-hop")} key={hop}>
            <div
              className="dock-card ticket grid grid-cols-[1fr_7rem] rounded-md text-ink"
              style={{ ["--stub" as string]: "7rem" }}
            >
              <div className="min-w-0 py-3 pl-4 pr-3">
                <p className="flex items-center justify-between gap-3 text-[0.78rem] text-mauve">
                  <span>
                    {t.dock.count(items.length)}, {total !== null ? t.dock.total(total) : t.dock.confirm}
                  </span>
                  <button className="font-semibold text-plum underline underline-offset-2 hover:text-ink" onClick={clear} type="button">
                    {t.dock.clear}
                  </button>
                </p>
                <p className="mt-0.5 truncate font-display text-[1.1rem] leading-snug">{items.map((i) => i.name).join(", ")}</p>
              </div>
              <a
                className="dock-stub flex flex-col items-center justify-center gap-1 px-2 text-center text-[0.85rem] font-semibold leading-tight text-white"
                href={href}
                onClick={() => trackTap("book-list", items.map((i) => i.id).join("|"))}
                rel="noreferrer"
                target="_blank"
              >
                <ActionIcon className="h-5 w-5" name="whatsapp" />
                {t.dock.book}
              </a>
            </div>
          </div>
        ) : null}
      </div>

      <TrackedLink
        aria-hidden={!showBar}
        className={cn(
          "fixed inset-x-3 bottom-3 z-40 flex items-center justify-between rounded-md bg-ink px-4 py-3.5 text-[0.95rem] font-semibold text-white shadow-[0_10px_30px_rgba(26,20,22,0.25)] transition-all duration-300 sm:hidden",
          showBar ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        )}
        event="whatsapp"
        href={whatsappLink(t.message.general)}
        label="sticky-bar"
        rel="noreferrer"
        tabIndex={showBar ? 0 : -1}
        target="_blank"
      >
        <span className="flex items-center gap-2">
          <ActionIcon className="h-5 w-5" name="whatsapp" />
          {t.dock.book}
        </span>
        {status ? <span className="text-[0.85rem] font-medium text-rose">{status}</span> : null}
      </TrackedLink>
    </>
  );
}
