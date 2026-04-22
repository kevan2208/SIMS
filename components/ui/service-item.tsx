import type { Service } from "@/content/site";

import { cn } from "@/lib/utils";

type ServiceItemProps = {
  service: Service;
  index: number;
  className?: string;
  variant?: "featured" | "compact";
};

export function ServiceItem({
  service,
  index,
  className,
  variant = "compact"
}: ServiceItemProps) {
  const itemNumber = String(index + 1).padStart(2, "0");
  const isFeatured = variant === "featured";

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-[1.75rem] border border-brand-stone/80 shadow-soft transition-all duration-300 cubic-bezier(0.22, 1, 0.36, 1) hover:-translate-y-1 hover:border-brand-red/25 hover:shadow-lift",
        isFeatured
          ? "section-wash justify-between bg-brand-shell/90 p-6 sm:p-7"
          : "gap-4 bg-brand-shell/86 p-5 sm:p-6",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-brand-red/28 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {isFeatured ? (
        <>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-brand-red">
                Featured treatment
              </p>
              <span className="font-display text-[2.2rem] leading-none text-brand-red/70 transition-colors duration-300 group-hover:text-brand-red">
                {itemNumber}
              </span>
            </div>
            <p className="rounded-full border border-brand-red/12 bg-brand-shell/82 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-brand-red">
              {service.price}
            </p>
          </div>

          <div className="space-y-4">
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
            <span className="font-display text-2xl text-brand-red/70 transition-colors duration-300 group-hover:text-brand-red">
              {itemNumber}
            </span>
            <p className="rounded-full bg-brand-petal/65 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-brand-red">
              {service.price}
            </p>
          </div>
          <div className="space-y-3">
            <div className="hairline" />
            <h3 className="max-w-[16ch] text-balance font-display text-[1.45rem] leading-[1.06] tracking-[-0.02em] text-brand-ink transition-colors duration-300 group-hover:text-[#261f20]">
              {service.title}
            </h3>
            <p className="text-sm leading-7 text-brand-mist">{service.description}</p>
          </div>
        </>
      )}
    </article>
  );
}
