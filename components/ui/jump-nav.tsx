"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type JumpNavProps = { items: Array<{ id: string; label: string }> };

/** Section links for the price page; the one you're reading is highlighted and kept in view. */
export function JumpNav({ items }: JumpNavProps) {
  const [active, setActive] = useState(items[0]?.id);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // A section counts as "current" once its heading passes just under the sticky bars.
      { rootMargin: "-130px 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    const link = listRef.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    link?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [active]);

  return (
    <div className="no-scrollbar flex gap-1 overflow-x-auto py-2" ref={listRef}>
      {items.map((item) => (
        <a
          aria-current={item.id === active ? "location" : undefined}
          className={cn(
            "shrink-0 rounded-full px-3 py-1.5 text-[0.88rem] font-medium transition-colors",
            item.id === active ? "bg-ink text-white" : "text-plum hover:bg-white hover:text-ink"
          )}
          data-id={item.id}
          href={`#${item.id}`}
          key={item.id}
        >
          {item.label}
        </a>
      ))}
    </div>
  );
}
