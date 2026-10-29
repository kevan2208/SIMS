"use client";

import Link from "next/link";

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

/** Treatment guide rows. Each one can go straight into the booking list; the flower turns when it's added. */
export function GuideList({ rows }: { rows: Row[] }) {
  return (
    <ul className="border-t border-seam">
      {rows.map((r) => (
        <GuideRow key={r.service.id + r.concern} row={r} />
      ))}
    </ul>
  );
}

function GuideRow({ row }: { row: Row }) {
  const { has, toggle } = useBooking();
  const { t } = useLang();
  const picked = has(row.service.id);

  return (
    <li className="border-b border-seam">
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
            "fill-btn inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-full border-[1.5px] px-3.5 text-[0.88rem] font-semibold",
            picked ? "border-sims-red text-white" : "border-[#e2a9b8] text-sims-red hover:bg-[#fff1f4]"
          )}
          onClick={() => {
            if (!picked) trackTap("add", row.service.id);
            toggle({
              id: row.service.id,
              name: row.service.bookingName,
              price: row.service.price
            });
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
