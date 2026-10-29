"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Frangipani } from "@/components/brand/logo";
import { useBooking } from "@/lib/booking";
import { useLang } from "@/lib/i18n";
import { trackTap } from "@/lib/track";
import { cn } from "@/lib/utils";

type Row = {
  concern: string;
  treatment: string;
  price: string;
  href: string;
  service: { id: string; name: string; bookingName: string; price: string };
};

/**
 * Treatment guide rows. Each one can go straight into the booking list,
 * the rows drift in one after another the first time the list scrolls into view,
 * and the flower turns when a treatment is added.
 */
export function GuideList({ rows }: { rows: Row[] }) {
  const ref = useRef<HTMLUListElement>(null);
  // "static" until JS runs, so the list is always visible without it.
  const [reveal, setReveal] = useState<"static" | "pending" | "in">("static");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    // Already on screen (e.g. after a refresh lower down): no need to animate.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.85) return;
    setReveal("pending");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReveal("in");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <ul className="guide-list border-t border-seam" data-reveal={reveal} ref={ref}>
      {rows.map((r, i) => (
        <GuideRow index={i} key={r.service.id + r.concern} row={r} />
      ))}
    </ul>
  );
}

function GuideRow({ row, index }: { row: Row; index: number }) {
  const { has, toggle } = useBooking();
  const { t } = useLang();
  const picked = has(row.service.id);

  return (
    <li className="guide-row border-b border-seam" style={{ "--i": index } as React.CSSProperties}>
      <div className="grid grid-cols-[1.75rem_minmax(0,1fr)_auto] items-center gap-3 py-4">
        <Frangipani className={cn("guide-flower self-start text-sims-red", picked && "is-picked")} size={24} />
        <div className="min-w-0">
          <p className="text-[1.02rem] font-semibold text-ink">{row.concern}</p>
          <p className="mt-0.5 text-[0.95rem] text-mauve">
            <Link className="font-semibold text-sims-red underline-offset-4 hover:underline" href={row.href}>
              {row.treatment}
            </Link>
            , {row.price}
          </p>
        </div>
        <button
          aria-label={picked ? t.row.remove(row.treatment, row.price) : t.row.add(row.treatment, row.price)}
          aria-pressed={picked}
          className={cn(
            "inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-full border-[1.5px] px-3.5 text-[0.88rem] font-semibold transition-colors",
            picked ? "border-sims-red bg-sims-red text-white" : "border-[#e2a9b8] text-sims-red hover:bg-[#fff1f4]"
          )}
          onClick={() => {
            if (!picked) trackTap("add", row.service.id);
            toggle({ id: row.service.id, name: row.service.bookingName, price: row.service.price });
          }}
          type="button"
        >
          {picked ? (
            <svg aria-hidden="true" fill="none" height="12" viewBox="0 0 12 12" width="12">
              <path d="M2.5 6.2 5 8.6 9.5 3.6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
            </svg>
          ) : (
            <span aria-hidden="true">+</span>
          )}
          {picked ? t.guide.added : t.guide.add}
        </button>
      </div>
    </li>
  );
}
