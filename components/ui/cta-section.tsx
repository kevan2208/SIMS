import type { CtaContent } from "@/content/site";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type CTASectionProps = {
  content: CtaContent;
  id?: string;
  variant?: "default" | "compact";
};

export function CTASection({
  content,
  id = "booking",
  variant = "default"
}: CTASectionProps) {
  const isCompact = variant === "compact";
  const primaryProps = content.primaryCta.external
    ? { rel: "noreferrer", target: "_blank" as const }
    : content.primaryCta.download
      ? { download: true }
      : {};
  const secondaryProps = content.secondaryCta.external
    ? { rel: "noreferrer", target: "_blank" as const }
    : content.secondaryCta.download
      ? { download: true }
      : {};

  return (
    <section className="anchor-section pb-8 pt-12 sm:pt-[4.75rem]" id={id}>
      <Container>
        <Reveal
          className={cn(
            "booking-surface cta-surface relative overflow-hidden border border-brand-stone/75 text-brand-ink shadow-soft",
            isCompact
              ? "rounded-[2.2rem] px-6 py-8 sm:px-8 sm:py-10 lg:px-10"
              : "rounded-[2.5rem] px-6 py-10 sm:px-8 sm:py-14 lg:px-12"
          )}
        >
          <div className="cta-soft-glow pointer-events-none absolute -left-10 top-[-6rem] h-56 w-56 rounded-full" />
          <div className="cta-soft-glow pointer-events-none absolute -bottom-20 right-[-4rem] h-64 w-64 rounded-full" />
          <div className={cn("flex flex-col gap-8 lg:flex-row lg:justify-between", isCompact ? "lg:items-center" : "lg:items-end")}>
            <div className={cn("relative z-10 space-y-4", isCompact ? "max-w-xl" : "max-w-2xl space-y-5")}>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-brand-red">
                {content.eyebrow}
              </p>
              <h2
                className={cn(
                  "font-display leading-[1.02] tracking-[-0.02em]",
                  isCompact ? "text-[clamp(1.85rem,3.8vw,2.75rem)]" : "text-[clamp(2rem,4vw,3.2rem)]"
                )}
              >
                {content.title}
              </h2>
              <p className={cn("text-sm leading-7 text-brand-mist", isCompact ? "max-w-lg" : "max-w-xl")}>
                {content.body}
              </p>
            </div>
            <div
              className={cn(
                "cta-actions-wrap relative z-10 flex flex-col gap-3 rounded-[1.35rem] bg-transparent p-0 shadow-none sm:flex-row",
                isCompact ? "lg:justify-end" : "lg:max-w-sm lg:justify-end"
              )}
            >
              <Button className="w-full justify-center sm:w-auto" href={content.primaryCta.href} {...primaryProps}>
                {content.primaryCta.label}
              </Button>
              <Button className="w-full justify-center sm:w-auto" href={content.secondaryCta.href} variant="secondary" {...secondaryProps}>
                {content.secondaryCta.label}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
