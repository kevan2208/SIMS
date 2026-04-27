import type { Service } from "@/content/site";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ServiceItemProps = {
  service: Service;
  index: number;
  className?: string;
  variant?: "featured" | "compact";
  mobileViewHref?: string;
  action?: {
    label: string;
    href: string;
    external?: boolean;
  };
};

export function ServiceItem({
  service,
  index,
  className,
  variant = "compact",
  mobileViewHref,
  action
}: ServiceItemProps) {
  const itemNumber = String(index + 1).padStart(2, "0");
  const isFeatured = variant === "featured";

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col border border-brand-stone/76 transition-all duration-300 cubic-bezier(0.22, 1, 0.36, 1) hover:-translate-y-1 hover:border-brand-red/18",
        isFeatured
          ? "section-wash justify-between rounded-[1.8rem] bg-[#f7edf0] p-6 shadow-[0_16px_34px_rgba(87,59,55,0.06)] hover:shadow-[0_20px_40px_rgba(87,59,55,0.08)] sm:p-7"
          : "gap-4 rounded-[1.45rem] bg-[linear-gradient(180deg,rgba(249,243,244,0.98),rgba(245,236,239,0.96))] p-5 shadow-[0_10px_22px_rgba(87,59,55,0.04)] hover:shadow-[0_14px_28px_rgba(87,59,55,0.06)] sm:p-6",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-brand-red/16 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {isFeatured ? (
        <>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-3">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-brand-red">
                Featured treatment
              </p>
              <div className="flex items-center gap-3">
                <span className="font-display text-[2rem] leading-none text-brand-red/60 transition-colors duration-300 group-hover:text-brand-red">
                  {itemNumber}
                </span>
                <p className="rounded-full border border-brand-stone/72 bg-brand-cream px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-brand-noir">
                  {service.price}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 sm:items-end">
              {action ? (
                <Button
                  className="w-full sm:w-auto"
                  href={action.href}
                  rel={action.external ? "noreferrer" : undefined}
                  size="md"
                  target={action.external ? "_blank" : undefined}
                  variant="secondary"
                >
                  {action.label}
                </Button>
              ) : null}
            </div>
          </div>

          <div className="space-y-4 border-t border-brand-stone/55 pt-5">
            <div className="hairline" />
            <h3 className="max-w-[14ch] text-balance font-display text-[clamp(1.8rem,3.9vw,2.7rem)] leading-[1] tracking-[-0.03em] text-brand-ink transition-colors duration-300 group-hover:text-[#261f20]">
              {service.title}
            </h3>
            <p className="max-w-[34rem] text-[0.96rem] leading-8 text-brand-mist">{service.description}</p>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-start justify-between gap-4">
            <span className="font-display text-[1.65rem] text-brand-red/64 transition-colors duration-300 group-hover:text-brand-red">
              {itemNumber}
            </span>
            <p className="rounded-full border border-brand-stone/68 bg-brand-cream/92 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-brand-noir">
              {service.price}
            </p>
          </div>
          <div className="space-y-2.5">
            <div className="hairline" />
            <h3 className="max-w-[16ch] text-balance font-display text-[1.28rem] leading-[1.08] tracking-[-0.02em] text-brand-ink transition-colors duration-300 group-hover:text-[#261f20]">
              {service.title}
            </h3>
            <p className="mobile-two-line-clamp text-sm leading-7 text-brand-mist">{service.description}</p>
            {mobileViewHref ? (
              <a
                className="inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-brand-red sm:hidden"
                href={mobileViewHref}
              >
                View services
              </a>
            ) : null}
          </div>
        </>
      )}
    </article>
  );
}
