import Image from "next/image";

import { promo, siteConfig } from "@/content/site";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function PromoSection() {
  return (
    <section className="anchor-section py-12 sm:py-[4.75rem]" id="promo">
      <Container>
        <Reveal className="promo-surface signature-surface overflow-hidden rounded-[2.4rem] border border-brand-stone/75 px-6 py-8 text-brand-ink shadow-soft sm:px-8 sm:py-10 lg:px-10">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] xl:items-center">
            <div className="space-y-5">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-brand-red/90">
                {promo.eyebrow}
              </p>
              <h2 className="max-w-3xl font-display text-[clamp(2rem,4.3vw,3.65rem)] leading-[1.02] tracking-[-0.028em]">
                {promo.title}
              </h2>
              <p className="max-w-2xl text-[0.98rem] leading-8 text-brand-mist">{promo.body}</p>
              <p className="max-w-xl text-sm leading-7 text-brand-mist/90">{promo.supportingNote}</p>
              <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap">
                <Button href={siteConfig.bookingWhatsappHref} rel="noreferrer" target="_blank">
                  Ask about this treatment
                </Button>
                <Button href="/services" variant="secondary">
                  View services and pricing
                </Button>
              </div>
            </div>

            <div className="grid gap-4 signature-right-stack">
              <article className="signature-product-card soft-panel signature-spotlight-card relative overflow-hidden p-5 sm:p-6">
                <div className="signature-product-glow pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full" />
                <div className="signature-sheen pointer-events-none absolute inset-0" />
                <div className="relative z-10 grid gap-4 sm:grid-cols-[9rem_minmax(0,1fr)] sm:items-center">
                  <div className="signature-bottle-frame relative mx-auto w-full max-w-[9.8rem] sm:mx-0">
                    <div className="signature-bottle-ring pointer-events-none absolute inset-0" />
                    <Image
                      alt="L'Oreal Professionnel Absolut Repair Molecular treatment bottle"
                      className="signature-bottle-image h-auto w-full object-contain mix-blend-multiply"
                      height={960}
                      src={promo.productImage}
                      width={960}
                    />
                  </div>
                  <div>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-brand-red/90">
                      {promo.productTitle}
                    </p>
                    <p className="mt-2 font-display text-[1.36rem] leading-[1.1] tracking-[-0.015em] text-brand-ink">
                      {promo.productLabel}
                    </p>
                    <p className="mt-2 text-[0.82rem] leading-6 text-brand-mist">
                      Deep repair pre treatment for damaged hair, designed for visible softness and movement.
                    </p>
                    <div className="mt-4 inline-flex rounded-full border border-brand-red/28 bg-brand-shell/80 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-brand-red">
                      Signature care protocol
                    </div>
                  </div>
                </div>
              </article>

              <article className="soft-panel signature-points-card signature-panel-stack p-5 sm:p-6">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-brand-red">
                  Best for
                </p>
                <div className="mt-4 space-y-3 text-sm leading-7 text-brand-mist">
                  {promo.points.map((point) => (
                    <p
                      className="signature-point-row border-b border-brand-stone/70 pb-3 last:border-b-0 last:pb-0"
                      key={point}
                    >
                      <span className="signature-point-dot" />
                      {point}
                    </p>
                  ))}
                </div>
              </article>

              <article className="soft-panel signature-range-card signature-range-showcase p-4">
                <div className="signature-range-stage relative overflow-hidden rounded-[1.1rem] p-3">
                  <div className="signature-range-glow pointer-events-none absolute inset-0" />
                  <Image
                    alt="Absolut Repair Molecular product range"
                    className="signature-range-image relative z-10 h-auto w-full rounded-[0.8rem] object-contain mix-blend-multiply"
                    height={960}
                    src={promo.productRangeImage}
                    width={960}
                  />
                </div>
              </article>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
