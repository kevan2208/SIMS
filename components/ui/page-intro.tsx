import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  body: string;
  action?: ReactNode;
  className?: string;
};

export function PageIntro({
  eyebrow,
  title,
  body,
  action,
  className
}: PageIntroProps) {
  return (
    <section className={cn("pb-6 pt-8 sm:pb-10 sm:pt-12", className)}>
      <div className="page-intro-surface overflow-hidden rounded-[2.25rem] border border-brand-stone/80 px-6 py-8 shadow-soft sm:px-8 sm:py-10 lg:px-10">
        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <div className="hairline" />
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-brand-red">
              {eyebrow}
            </p>
          </div>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[42rem] space-y-4">
              <h1 className="text-balance font-display text-[clamp(2.7rem,6vw,5rem)] leading-[0.94] tracking-[-0.04em] text-brand-ink">
                {title}
              </h1>
              <p className="max-w-[34rem] text-pretty text-base leading-8 text-brand-mist">{body}</p>
            </div>

            {action ? <div className="shrink-0">{action}</div> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
