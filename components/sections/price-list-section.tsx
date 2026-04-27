"use client";

import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { priceListCategories, priceListHighlights } from "@/content/price-list";
import { siteConfig } from "@/content/site";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { controlFocusClass, controlPillClass, utilityActiveClass } from "@/components/ui/control-styles";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type FilterKey = "all" | "hair" | "skin-body" | "nails" | "occasion";

const filterConfig: Array<{ key: FilterKey; label: string; categoryIds?: string[]; match: (id: string) => boolean }> = [
  { key: "all", label: "All categories", match: () => true },
  {
    key: "hair",
    label: "Hair",
    categoryIds: ["hair-care", "hair-colour", "hair-treatments"],
    match: (id) => ["hair-care", "hair-colour", "hair-treatments"].includes(id)
  },
  {
    key: "skin-body",
    label: "Skin & body",
    categoryIds: ["facial-body-care", "threading", "waxing", "body-massage"],
    match: (id) => ["facial-body-care", "threading", "waxing", "body-massage"].includes(id)
  },
  {
    key: "nails",
    label: "Nails",
    categoryIds: ["hand-foot-care"],
    match: (id) => ["hand-foot-care"].includes(id)
  },
  {
    key: "occasion",
    label: "Occasion",
    categoryIds: ["styling-makeup", "wedding-home-service"],
    match: (id) => ["styling-makeup", "wedding-home-service"].includes(id)
  }
];

function sameIds(left: string[], right: string[]) {
  return left.length === right.length && left.every((item, index) => item === right[index]);
}

type SelectedService = {
  categoryEyebrow: string;
  categoryTitle: string;
  categoryNote?: string;
  name: string;
  price: string;
};

const popularShortcuts = [
  { label: "Absolute Repair", categoryId: "hair-treatments" },
  { label: "Hair Colour", categoryId: "hair-colour" },
  { label: "Gold Facial", categoryId: "facial-body-care" },
  { label: "Gel Nails", categoryId: "hand-foot-care" }
];

const previewItemCount = 4;

export function PriceListSection() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [query, setQuery] = useState("");
  const [selectedJumpCategoryId, setSelectedJumpCategoryId] = useState("");
  const [expandedCategoryIds, setExpandedCategoryIds] = useState<string[]>([]);
  const [expandedPriceCategoryIds, setExpandedPriceCategoryIds] = useState<string[]>([]);
  const [highlightedCategoryId, setHighlightedCategoryId] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<SelectedService | null>(null);
  const closeServiceSheet = useCallback(() => setSelectedService(null), []);
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

  useEffect(() => {
    if (!selectedService) {
      return;
    }

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeServiceSheet();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEscape);
    };
  }, [closeServiceSheet, selectedService]);

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

  const mainCategoryOptions = useMemo(() => filterConfig.filter((filter) => filter.key !== "all"), []);

  const selectedFilterConfig = useMemo(
    () => filterConfig.find((filter) => filter.key === activeFilter) ?? filterConfig[0],
    [activeFilter]
  );

  const relatedCategoryOptions = useMemo(() => {
    const baseCategories = selectedFilterConfig.categoryIds
      ? priceListCategories.filter((category) => selectedFilterConfig.categoryIds?.includes(category.id))
      : priceListCategories;

    const visibleCategoryCounts = new Map(
      visibleCategories.map((category) => [category.id, category.visibleItems.length] as const)
    );

    return baseCategories
      .map((category) => ({
        ...category,
        visibleCount: visibleCategoryCounts.get(category.id) ?? 0
      }))
      .filter((category) => (normalizedQuery ? category.visibleCount > 0 : true));
  }, [normalizedQuery, selectedFilterConfig, visibleCategories]);

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

  useEffect(() => {
    setSelectedJumpCategoryId((current) => {
      if (!current) {
        return "";
      }

      const isStillVisible = relatedCategoryOptions.some((category) => category.id === current);
      return isStillVisible ? current : "";
    });
  }, [relatedCategoryOptions]);

  const toggleCategory = useCallback((categoryId: string) => {
    setExpandedCategoryIds((current) =>
      current.includes(categoryId) ? current.filter((id) => id !== categoryId) : [...current, categoryId]
    );
  }, []);

  const togglePriceRows = useCallback((categoryId: string) => {
    setExpandedPriceCategoryIds((current) =>
      current.includes(categoryId) ? current.filter((id) => id !== categoryId) : [...current, categoryId]
    );
  }, []);

  const selectMainCategory = useCallback((filterKey: FilterKey) => {
    setActiveFilter((current) => (current === filterKey ? "all" : filterKey));
    setSelectedJumpCategoryId("");
  }, []);

  const jumpToCategory = useCallback(
    (categoryId: string) => {
      setSelectedJumpCategoryId(categoryId);
      focusCategory(categoryId);
    },
    [focusCategory]
  );

  const whatsappBaseHref = useMemo(() => {
    try {
      const parsed = new URL(siteConfig.bookingWhatsappHref);
      const number = parsed.pathname.split("/").filter(Boolean)[0] ?? "23057718511";
      return `https://wa.me/${number}`;
    } catch {
      return "https://wa.me/23057718511";
    }
  }, []);

  const selectedServiceWhatsappHref = useMemo(() => {
    if (!selectedService) {
      return siteConfig.bookingWhatsappHref;
    }

    const message = `Hello Sim's Hair and Beauty, I would like to book ${selectedService.name} (${selectedService.price}). Could you please share availability?`;
    return `${whatsappBaseHref}?text=${encodeURIComponent(message)}`;
  }, [selectedService, whatsappBaseHref]);

  const serviceSheet =
    selectedService && typeof document !== "undefined"
      ? createPortal(
          <div className="fixed inset-0 z-[90]" role="dialog" aria-modal="true" aria-label="Service details">
            <button
              aria-label="Close service details"
              className="absolute inset-0 bg-brand-noir/28"
              onClick={closeServiceSheet}
              type="button"
            />
            <div className="absolute inset-x-0 bottom-0 z-10 mx-auto w-full max-w-2xl rounded-t-[1.75rem] border border-brand-stone/80 bg-[linear-gradient(180deg,rgba(250,243,245,1),rgba(245,234,237,0.99))] p-5 shadow-[0_-16px_34px_rgba(87,59,55,0.18)] sm:bottom-4 sm:rounded-[1.75rem] sm:p-6">
              <div className="mx-auto mb-4 h-1.5 w-16 rounded-full bg-brand-stone/65 sm:hidden" />
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-brand-red">
                    {selectedService.categoryEyebrow}
                  </p>
                  <h3 className="text-pretty text-[1.32rem] font-semibold leading-7 text-brand-ink sm:text-[1.48rem]">
                    {selectedService.name}
                  </h3>
                </div>
                <button
                  className={cn(
                    "shrink-0 px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-brand-mist",
                    controlPillClass
                  )}
                  onClick={closeServiceSheet}
                  type="button"
                >
                  Close
                </button>
              </div>
              <p className="mt-3 inline-flex rounded-full border border-brand-stone/74 bg-[#f8eff1] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-noir">
                {selectedService.price}
              </p>
              <p className="mt-4 text-sm leading-7 text-brand-mist">
                {selectedService.categoryNote ??
                  `${selectedService.categoryTitle} at Sim's Hair and Beauty. Message on WhatsApp to confirm availability and the right option for your hair or skin needs.`}
              </p>
              <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                <Button href={selectedServiceWhatsappHref} onClick={closeServiceSheet} rel="noreferrer" target="_blank" variant="primary">
                  Book this on WhatsApp
                </Button>
                <Button href={siteConfig.fixedLineHref} onClick={closeServiceSheet} variant="secondary">
                  Call fixed line
                </Button>
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

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
              Price list
            </p>
            <h2 className="font-display text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1.02] tracking-[-0.03em] text-brand-ink">
              Find a service
            </h2>
            <p className="text-sm leading-7 text-brand-mist">
              Search by treatment name or choose a salon area below.
            </p>
          </div>

          <div className="mt-5 grid gap-3 lg:mt-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <label className="relative block">
              <span className="sr-only">Search treatments</span>
              <input
                className="w-full rounded-[1.35rem] border border-brand-stone/78 bg-[#f8eef1] px-4 py-3 text-sm text-brand-ink shadow-[0_10px_22px_rgba(87,59,55,0.04)] outline-none transition-all duration-300 ease-out placeholder:text-brand-mist/85 focus:border-brand-red/30 focus:bg-brand-cream focus:shadow-soft sm:rounded-2xl"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search treatment..."
                type="text"
                value={query}
              />
            </label>
          </div>

          <div className="mt-5 space-y-4">
            <div>
              <div className="flex items-center justify-between gap-3">
                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-brand-red">
                  Choose category
                </p>
                {activeFilter !== "all" ? (
                  <button
                    className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-brand-mist transition-colors hover:text-brand-red"
                    onClick={() => selectMainCategory("all")}
                    type="button"
                  >
                    Show all
                  </button>
                ) : null}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
                {mainCategoryOptions.map((filter) => {
                  const isActive = activeFilter === filter.key;
                  const count = filter.categoryIds?.reduce((total, id) => {
                    const category = priceListCategories.find((item) => item.id === id);
                    return total + (category?.items.length ?? 0);
                  }, 0);

                  return (
                    <button
                      className={cn(
                        "group min-h-[5.4rem] rounded-[1.15rem] border px-3 py-3 text-left shadow-[0_10px_22px_rgba(87,59,55,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/24 hover:bg-[#f6e9ed] hover:shadow-soft active:translate-y-[1px]",
                        controlFocusClass,
                        isActive
                          ? "border-brand-red/30 bg-[linear-gradient(180deg,rgba(247,233,237,0.98),rgba(239,214,221,0.96))] text-brand-noir"
                          : "border-brand-stone/76 bg-[#f8eef1] text-brand-ink"
                      )}
                      key={filter.key}
                      onClick={() => selectMainCategory(filter.key)}
                      type="button"
                    >
                      <span className="block text-base font-semibold leading-6">{filter.label}</span>
                      <span className="mt-1 block text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-brand-mist">
                        {count} services
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-brand-red">
                Popular shortcuts
              </p>
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible">
                {popularShortcuts.map((shortcut) => (
                  <button
                    className={cn(
                      "inline-flex min-h-11 shrink-0 items-center justify-center px-4 text-[0.75rem] font-semibold tracking-[0.02em] text-brand-mist",
                      controlPillClass
                    )}
                    key={shortcut.label}
                    onClick={() => jumpToCategory(shortcut.categoryId)}
                    type="button"
                  >
                    {shortcut.label}
                  </button>
                ))}
              </div>
            </div>

            {selectedFilterConfig.key !== "all" ? (
              <div className="rounded-[1.15rem] border border-brand-stone/72 bg-[#f8eef1] p-3">
                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-brand-red">
                  {selectedFilterConfig.label} service type
                </p>
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible">
                  {relatedCategoryOptions.map((category) => {
                    const isActive = selectedJumpCategoryId === category.id;

                    return (
                      <button
                        className={cn(
                          "inline-flex min-h-11 shrink-0 items-center justify-center gap-2 px-4 text-[0.75rem] font-semibold tracking-[0.02em]",
                          isActive ? utilityActiveClass : `${controlPillClass} text-brand-mist`
                        )}
                        key={category.id}
                        onClick={() => jumpToCategory(category.id)}
                        type="button"
                      >
                        <span>{category.eyebrow}</span>
                        <span className="rounded-full bg-brand-cream px-2 py-0.5 text-[0.62rem] uppercase tracking-[0.12em] text-brand-mist">
                          {category.visibleCount}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}
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
          <div className="mt-8 space-y-4 sm:space-y-5">
            {visibleCategories.map((category, index) => {
              const isCategoryOpen = expandedCategoryIds.includes(category.id);
              const isShowingAllPrices = expandedPriceCategoryIds.includes(category.id);
              const shouldLimitRows = !normalizedQuery && category.visibleItems.length > previewItemCount;
              const displayedItems = shouldLimitRows && !isShowingAllPrices
                ? category.visibleItems.slice(0, previewItemCount)
                : category.visibleItems;
              const hiddenItemCount = category.visibleItems.length - displayedItems.length;

              return (
                <Reveal delayMs={(index % 5) * 45} key={category.id}>
                  <article
                    className={`price-list-category-target section-frame anchor-section p-4 sm:p-5 ${
                      highlightedCategoryId === category.id ? "price-list-category-flash" : ""
                    }`}
                    id={category.id}
                  >
                    <button
                      className={cn(
                        "w-full rounded-2xl border border-brand-stone/70 bg-[linear-gradient(180deg,rgba(248,239,241,0.96),rgba(243,231,235,0.93))] px-4 py-3 text-left shadow-[0_10px_22px_rgba(87,59,55,0.04)] transition-all duration-300 hover:border-brand-red/24 hover:shadow-soft"
                      )}
                      onClick={() => toggleCategory(category.id)}
                      type="button"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="space-y-1">
                          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-brand-red">
                            {category.eyebrow}
                          </p>
                          <h2 className="text-pretty text-[1.08rem] font-semibold leading-6 text-brand-ink sm:text-[1.18rem]">
                            {category.title}
                          </h2>
                        </div>
                        <div className="flex shrink-0 flex-col items-end gap-1.5">
                          <span className="rounded-full border border-brand-stone/70 bg-[#f8eff1] px-2.5 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-brand-mist sm:text-[0.66rem]">
                            {category.visibleItems.length} items
                          </span>
                          <span
                            className={cn(
                              "inline-flex items-center justify-center px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em]",
                              isCategoryOpen ? utilityActiveClass : `${controlPillClass} text-brand-mist`
                            )}
                          >
                            {isCategoryOpen ? "Hide" : "Open"}
                          </span>
                        </div>
                      </div>
                      {category.note ? (
                        <p className="mt-2 max-w-[48rem] text-sm leading-6 text-brand-mist">{category.note}</p>
                      ) : null}
                    </button>

                    <div
                      className={cn(
                        "grid transition-all duration-300 ease-out",
                        isCategoryOpen ? "mt-3 grid-rows-[1fr]" : "grid-rows-[0fr]"
                      )}
                    >
                      <div className="overflow-hidden">
                        <div className="space-y-2.5 border-t border-brand-stone/70 pt-3">
                          {displayedItems.map((item) => (
                            <button
                              className="group flex w-full flex-col items-start gap-2 rounded-[0.95rem] border border-transparent bg-[#f8eef1] px-3 py-2.5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-red/22 hover:bg-[#f6e9ed] hover:shadow-[0_8px_16px_rgba(87,59,55,0.08)] sm:flex-row sm:items-center sm:justify-between sm:rounded-xl"
                              key={`${category.id}-${item.name}`}
                              onClick={() =>
                                setSelectedService({
                                  categoryEyebrow: category.eyebrow,
                                  categoryTitle: category.title,
                                  categoryNote: category.note,
                                  name: item.name,
                                  price: item.price
                                })
                              }
                              type="button"
                            >
                              <p className="pr-0 text-sm leading-6 text-brand-ink sm:pr-4 sm:leading-7">{item.name}</p>
                              <p className="inline-flex shrink-0 self-start rounded-full border border-brand-stone/72 bg-[#f7edf0] px-2.5 py-1 text-left text-xs font-semibold uppercase tracking-[0.12em] text-brand-noir sm:self-auto sm:text-right">
                                {item.price}
                              </p>
                            </button>
                          ))}
                          {shouldLimitRows ? (
                            <button
                              className={cn(
                                "mt-1 inline-flex min-h-11 w-full items-center justify-center px-4 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-brand-mist sm:w-auto",
                                controlPillClass
                              )}
                              onClick={() => togglePriceRows(category.id)}
                              type="button"
                            >
                              {isShowingAllPrices ? "Show less" : `View all prices (${hiddenItemCount} more)`}
                            </button>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        )}

        {serviceSheet}
      </Container>
    </section>
  );
}
