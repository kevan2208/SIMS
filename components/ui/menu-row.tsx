"use client";

import { useBooking } from "@/lib/booking";
import { cn } from "@/lib/utils";

/** A price row that can be added to the booking list. The whole row is the tap target. */
export function MenuRow({ name, price }: { name: string; price: string }) {
  const { has, toggle } = useBooking();
  const picked = has(name);

  return (
    <li>
      <button
        aria-label={`${picked ? "Remove" : "Add"} ${name}, ${price}, ${picked ? "from" : "to"} your booking`}
        aria-pressed={picked}
        className={cn(
          "menu-row -mx-2 w-[calc(100%+1rem)] rounded-md px-2 text-left transition-colors",
          picked ? "bg-white" : "hover:bg-white/60"
        )}
        onClick={() => toggle({ name, price })}
        type="button"
      >
        <span
          aria-hidden="true"
          className={cn(
            "inline-flex h-5 w-5 shrink-0 translate-y-[3px] items-center justify-center self-start rounded-full border-[1.5px] text-[0.8rem] font-semibold transition-colors",
            picked ? "border-sims-red bg-sims-red text-white" : "border-[#e2a9b8] text-sims-red"
          )}
        >
          {picked ? (
            <svg fill="none" height="11" viewBox="0 0 12 12" width="11">
              <path d="M2.5 6.2 5 8.6 9.5 3.6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
            </svg>
          ) : (
            "+"
          )}
        </span>
        <span className="text-[0.97rem] leading-snug text-ink">{name}</span>
        <span aria-hidden="true" className="menu-row__leader" />
        <span className="menu-row__price text-[0.97rem] font-semibold text-ink">{price}</span>
      </button>
    </li>
  );
}
