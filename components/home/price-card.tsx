"use client";

import { useId, useRef, useState } from "react";

import { MenuRow } from "@/components/ui/menu-row";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Tab = { label: string; href: string; items: Array<{ id: string; name: string; bookingName: string; price: string; category: string }> };

/** A small tabbed price card. Keyboard: arrow keys move between tabs. */
export function PriceCard({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const id = useId();
  const { t } = useLang();

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (active + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length;
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <div className="price-card rounded-md bg-white">
      <div
        aria-label={t.prices.categories}
        className="no-scrollbar flex h-[3.75rem] items-center gap-1.5 overflow-x-auto border-b-[1.5px] border-dashed border-dash px-4"
        onKeyDown={onKey}
        role="tablist"
      >
        {tabs.map((tab, i) => (
          <button
            aria-controls={`${id}-panel`}
            aria-selected={i === active}
            className={cn(
              "min-h-10 shrink-0 rounded-full px-3.5 py-1.5 text-[0.86rem] font-semibold transition-colors",
              i === active ? "bg-ink text-white" : "bg-petal text-plum hover:bg-rose"
            )}
            id={`${id}-tab-${i}`}
            key={tab.label}
            onClick={() => setActive(i)}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            tabIndex={i === active ? 0 : -1}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div aria-labelledby={`${id}-tab-${active}`} className="px-4 pb-3 pt-2 sm:px-6" id={`${id}-panel`} role="tabpanel">
        <ul>
          {tabs[active].items.map((item) => (
            <MenuRow key={item.id} service={item} />
          ))}
        </ul>
      </div>
    </div>
  );
}
