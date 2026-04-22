import { promo, siteConfig } from "@/content/site";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function PromoSection() {
  return (
    <section className="anchor-section py-12 sm:py-[4.75rem]" id="promo">
      <Container>
        <Reveal className="promo-surface overflow-hidden rounded-[2.2rem] border border-brand-stone/75 px-6 py-8 text-brand-ink shadow-soft sm:px-8 sm:py-10 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:items-center">
            <div className="space-y-4">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-brand-red">
                {promo.eyebrow}
              </p>
              <h2 className="max-w-3xl font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.02] tracking-[-0.02em]">
                {promo.title}
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-brand-mist">{promo.body}</p>
              <div className="pt-1">
                <Button href={siteConfig.bookingWhatsappHref} rel="noreferrer" target="_blank">
                  Ask about this treatment
                </Button>
              </div>
            </div>

            <div className="soft-panel p-5 sm:p-6">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-brand-red">
                Best for
              </p>
              <div className="mt-4 space-y-3 text-sm leading-7 text-brand-mist">
                {promo.points.map((point) => (
                  <p className="border-b border-brand-stone/70 pb-3 last:border-b-0 last:pb-0" key={point}>
                    {point}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
