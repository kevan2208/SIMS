"use client";

import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";

import { priceListCategories, priceListHighlights } from "@/content/price-list";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { controlFocusClass, controlPillClass, utilityActiveClass } from "@/components/ui/control-styles";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type FilterKey = "all" | "hair" | "skin-body" | "nails" | "occasion";

const filterConfig: Array<{ key: FilterKey; label: string; match: (id: string) => boolean }> = [
  { key: "all", label: "All", match: () => true },
  {
    key: "hair",
    label: "Hair",
    match: (id) => ["hair-care", "hair-colour", "hair-treatments"].includes(id)
  },
  {
    key: "skin-body",
    label: "Skin & body",
    match: (id) => ["facial-body-care", "threading", "waxing", "body-massage"].includes(id)
  },
  {
    key: "nails",
    label: "Nails",
    match: (id) => ["hand-foot-care"].includes(id)
  },
  {
    key: "occasion",
    label: "Occasion",
    match: (id) => ["styling-makeup", "wedding-home-service"].includes(id)
  }
];

function sameIds(left: string[], right: string[]) {
  return left.length === right.length && left.every((item, index) => item === right[index]);
}

export function PriceListSection() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [query, setQuery] = useState("");
  const [expandedCategoryIds, setExpandedCategoryIds] = useState<string[]>([]);
  const [highlightedCategoryId, setHighlightedCategoryId] = useState<string | null>(null);
  const highlightTimeoutRef = useRef<number | null>(null);

  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = deferredQuery.trim().toLowerCase();

  const clearLinkFocus = useCallback((element: HTMLAnchorElement) => {
    window.requestAnimationFrame(() => {
      element.blur();
    });
  }, []);

  const focusCategory = useCallback((categoryId: string) => {
    const target = document.getElementById(categoryId);

    if (!target) {
      return;
    }

    setExpandedCategoryIds((current) => (current.includes(categoryId) ? current : [...current, categoryId]));

    const navOffset = 112;
    const targetTop = window.scrollY + target.getBoundingClientRect().top - navOffset;

    window.scrollTo({
      top: targetTop,
      behavior: "smooth"
    });

    window.history.replaceState(null, "", `#${categoryId}`);
    setHighlightedCategoryId(categoryId);

    if (highlightTimeoutRef.current !== null) {
      window.clearTimeout(highlightTimeoutRef.current);
    }

    highlightTimeoutRef.current = window.setTimeout(() => {
      setHighlightedCategoryId((current) => (current === categoryId ? null : current));
      highlightTimeoutRef.current = null;
    }, 1450);
  }, []);

  useEffect(() => {
    return () => {
      if (highlightTimeoutRef.current !== null) {
        window.clearTimeout(highlightTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const categoryId = window.location.hash.replace(/^#/, "");

    if (!categoryId) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      focusCategory(categoryId);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [focusCategory]);

  const visibleCategories = useMemo(() => {
    const selectedFilter = filterConfig.find((filter) => filter.key === activeFilter) ?? filterConfig[0];

    return priceListCategories
      .filter((category) => selectedFilter.match(category.id))
      .map((category) => {
        const visibleItems = normalizedQuery
          ? category.items.filter((item) => {
              const serviceName = item.name.toLowerCase();
              return serviceName.includes(normalizedQuery);
            })
          : category.items;

        return {
          ...category,
          visibleItems
        };
      })
      .filter((category) => category.visibleItems.length > 0);
  }, [activeFilter, normalizedQuery]);

  const defaultExpandedCategoryIds = useMemo(
    () => visibleCategories.slice(0, 2).map((category) => category.id),
    [visibleCategories]
  );

  useEffect(() => {
    const nextExpandedIds =
      normalizedQuery || activeFilter !== "all"
        ? visibleCategories.map((category) => category.id)
        : defaultExpandedCategoryIds;

    setExpandedCategoryIds((current) => (sameIds(current, nextExpandedIds) ? current : nextExpandedIds));
  }, [activeFilter, defaultExpandedCategoryIds, normalizedQuery, visibleCategories]);

  const toggleCategory = useCallback((categoryId: string) => {
    setExpandedCategoryIds((current) =>
      current.includes(categoryId) ? current.filter((id) => id !== categoryId) : [...current, categoryId]
    );
  }, []);

  return (
    <section className="anchor-section py-12 sm:py-[4.75rem]" id="price-list">
      <Container>
        <Reveal className="section-frame p-4 sm:p-6" delayMs={60}>
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-4">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-brand-red">Most booked</p>
            <a
              className={cn(
                "inline-flex items-center px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.15em] text-brand-mist sm:text-[0.68rem]",
                controlPillClass
              )}
              href="#hair-treatments"
              onClick={(event) => {
                event.preventDefault();
                focusCategory("hair-treatments");
                clearLinkFocus(event.currentTarget);
              }}
            >
              Jump to hair treatments
            </a>
          </div>
          <div className="-mx-1 mt-4 grid grid-flow-col auto-cols-[88%] gap-3 overflow-x-auto px-1 pb-2 sm:auto-cols-[60%] md:mx-0 md:grid-flow-row md:auto-cols-auto md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-4">
            {priceListHighlights.map((item) => (
              <a
                className={cn(
                  "group h-full rounded-[1.35rem] border border-brand-stone/76 bg-[#f8eef1] p-4 shadow-[0_12px_26px_rgba(87,59,55,0.05)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-brand-red/18 hover:shadow-soft sm:rounded-2xl",
                  controlFocusClass
                )}
                href={item.href}
                key={item.title}
                onClick={(event) => {
                  const categoryId = item.href.replace(/^#/, "");

                  if (!categoryId) {
                    return;
                  }

                  event.preventDefault();
                  focusCategory(categoryId);
                  clearLinkFocus(event.currentTarget);
                }}
              >
                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-brand-red">Featured</p>
                <h3 className="mt-2 text-[1rem] font-semibold leading-6 text-brand-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-brand-mist">{item.note}</p>
                <p className="mt-3 inline-flex rounded-full border border-brand-stone/85 bg-brand-cream px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-brand-noir">
                  {item.price}
                </p>
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal className="section-frame px-4 py-5 sm:px-7 sm:py-7">
          <div className="max-w-3xl space-y-3">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-brand-red">
              Browse by category
            </p>
            <h2 className="font-display text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1.02] tracking-[-0.03em] text-brand-ink">
              Price List
            </h2>
            <p className="text-sm leading-7 text-brand-mist">
              Search by treatment name, then jump directly to the category you need.
            </p>
          </div>

          <div className="mt-5 grid gap-3 lg:mt-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <label className="relative block">
              <span className="sr-only">Search treatments</span>
              <input
                className="w-full rounded-[1.35rem] border border-brand-stone/78 bg-[#f8eef1] px-4 py-3 text-sm text-brand-ink shadow-[0_10px_22px_rgba(87,59,55,0.04)] outline-none transition-all duration-300 ease-out placeholder:text-brand-mist/85 focus:border-brand-red/30 focus:bg-brand-cream focus:shadow-soft sm:rounded-2xl"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search treatment"
                type="text"
                value={query}
              />
            </label>
          </div>

          <div className="-mx-1 mt-4 flex gap-2 overflow-x-auto px-1 pb-2 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0">
            {filterConfig.map((filter) => {
              const isActive = activeFilter === filter.key;
              return (
                <button
                  className={cn(
                    "inline-flex shrink-0 items-center justify-center px-3.5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.15em] transition-all duration-300 ease-out sm:px-4 sm:text-[0.73rem] sm:tracking-[0.16em]",
                    controlFocusClass,
                    isActive ? utilityActiveClass : `${controlPillClass} text-brand-mist`
                  )}
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  type="button"
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          {normalizedQuery ? (
            <div className="mt-4 rounded-xl border border-brand-stone/70 bg-[#f6ebee] px-4 py-3 text-sm text-brand-mist">
              Results for <span className="font-semibold text-brand-ink">&quot;{query}&quot;</span>
              <button
                className={cn("ml-3 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-brand-mist", controlPillClass)}
                onClick={() => setQuery("")}
                type="button"
              >
                Clear
              </button>
            </div>
          ) : null}
        </Reveal>

        <div className="-mx-1 mt-6 flex gap-2.5 overflow-x-auto px-1 pb-2 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0">
          {visibleCategories.map((category) => (
            <a
              className={cn(
                "group inline-flex shrink-0 cursor-pointer items-center gap-2 px-3.5 py-2 text-[0.69rem] font-semibold uppercase tracking-[0.15em] text-brand-mist sm:px-4 sm:text-[0.72rem] sm:tracking-[0.16em]",
                controlPillClass
              )}
              href={`#${category.id}`}
              key={category.id}
              onClick={(event) => {
                event.preventDefault();
                focusCategory(category.id);
                clearLinkFocus(event.currentTarget);
              }}
            >
              <span>{category.eyebrow}</span>
              <span className="rounded-full bg-brand-cream px-2 py-0.5 text-[0.62rem] tracking-[0.14em] text-brand-mist">
                {category.visibleItems.length}
              </span>
            </a>
          ))}
        </div>

        {visibleCategories.length === 0 ? (
          <Reveal className="mt-8 section-frame px-5 py-8 text-center sm:px-7">
            <p className="font-display text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.1] tracking-[-0.02em] text-brand-ink">
              No matching services found
            </p>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-brand-mist">
              Try a different keyword or clear filters to view the complete menu.
            </p>
            <div className="mt-5 flex justify-center">
              <Button
                href="#price-list"
                onClick={(event) => {
                  event.preventDefault();
                  setActiveFilter("all");
                  setQuery("");
                }}
                variant="secondary"
              >
                Reset list
              </Button>
            </div>
          </Reveal>
        ) : (
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {visibleCategories.map((category, index) => (
              <Reveal delayMs={(index % 4) * 60} key={category.id}>
                <article
                  className={`price-list-category-target section-frame anchor-section h-full p-5 sm:p-7 ${
                    highlightedCategoryId === category.id ? "price-list-category-flash" : ""
                  }`}
                  id={category.id}
                >
                  <div className="flex items-start justify-between gap-3 border-b border-brand-stone/75 pb-4 sm:gap-4 sm:pb-5">
                    <div className="space-y-2">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-brand-red">
                        {category.eyebrow}
                      </p>
                      <h2 className="max-w-[18ch] text-balance font-display text-[1.6rem] leading-[1.04] tracking-[-0.03em] text-brand-ink sm:text-[1.9rem]">
                        {category.title}
                      </h2>
                      {category.note ? (
                        <p className="max-w-[34rem] text-sm leading-7 text-brand-mist">{category.note}</p>
                      ) : null}
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-2">
                      <div className="rounded-full border border-brand-stone/72 bg-[#f7edf0] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-brand-mist sm:text-[0.7rem] sm:tracking-[0.16em]">
                        {category.visibleItems.length} items
                      </div>
                      <button
                        className={cn(
                          "inline-flex items-center justify-center px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] lg:hidden",
                          expandedCategoryIds.includes(category.id) ? utilityActiveClass : `${controlPillClass} text-brand-mist`
                        )}
                        onClick={() => toggleCategory(category.id)}
                        type="button"
                      >
                        {expandedCategoryIds.includes(category.id) ? "Hide prices" : "Open prices"}
                      </button>
                    </div>
                  </div>

                  <div
                    className={cn(
                      "mt-5 space-y-2.5 lg:block",
                      expandedCategoryIds.includes(category.id) ? "block" : "hidden"
                    )}
                  >
                    {category.visibleItems.map((item) => (
                      <div
                        className="group flex flex-col gap-1.5 rounded-[0.95rem] border border-transparent px-2.5 py-2 transition-all duration-200 hover:border-brand-stone/70 hover:bg-[#f5eaee] sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:rounded-xl"
                        key={`${category.id}-${item.name}`}
                      >
                        <p className="pr-0 text-sm leading-6 text-brand-ink sm:pr-4 sm:leading-7">{item.name}</p>
                        <p className="inline-flex shrink-0 rounded-full border border-brand-stone/72 bg-[#f7edf0] px-2.5 py-1 text-left text-xs font-semibold uppercase tracking-[0.12em] text-brand-noir sm:text-right">
                          {item.price}
                        </p>
                      </div>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
