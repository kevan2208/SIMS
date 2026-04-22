import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  className
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 border-b border-brand-stone/70 pb-8 sm:flex-row sm:items-end sm:justify-between sm:gap-8",
        className
      )}
    >
      <div className="max-w-[42rem] space-y-3">
        <div className="flex items-center gap-4">
          <div className="hairline" />
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-brand-red">{eyebrow}</p>
        </div>
        <h2 className="text-balance font-display text-[clamp(2rem,4vw,3.15rem)] leading-[1.02] tracking-[-0.03em] text-brand-ink">
          {title}
        </h2>
        {description ? <p className="max-w-[36rem] text-pretty text-sm leading-7 text-brand-mist">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
