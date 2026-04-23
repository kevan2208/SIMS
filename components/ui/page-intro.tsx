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
    <section className={cn("pb-5 pt-7 sm:pb-6 sm:pt-10", className)}>
      <div className="page-intro-surface overflow-hidden rounded-[1.7rem] border border-brand-stone/72 px-5 py-5 shadow-[0_10px_24px_rgba(87,59,55,0.045)] sm:rounded-[1.9rem] sm:px-8 sm:py-8 lg:px-10">
        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <div className="hairline" />
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-brand-red">
              {eyebrow}
            </p>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[38rem] space-y-3">
              <h1 className="text-balance font-display text-[clamp(2.2rem,4.8vw,3.9rem)] leading-[0.96] tracking-[-0.04em] text-brand-ink">
                {title}
              </h1>
              <p className="max-w-[31rem] text-pretty text-[0.98rem] leading-7 text-brand-mist">{body}</p>
            </div>

            {action ? <div className="w-full shrink-0 sm:w-auto">{action}</div> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
