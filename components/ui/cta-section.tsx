import { bookingContent, siteConfig } from "@/content/site";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function CTASection() {
  return (
    <section className="anchor-section pb-8 pt-12 sm:pt-[4.75rem]" id="booking">
      <Container>
        <Reveal className="booking-surface overflow-hidden rounded-[2.5rem] border border-brand-stone/75 px-6 py-10 text-brand-ink shadow-soft sm:px-8 sm:py-14 lg:px-12">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-5">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-brand-red">
                {bookingContent.eyebrow}
              </p>
              <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.02] tracking-[-0.02em]">
                {bookingContent.title}
              </h2>
              <p className="max-w-xl text-sm leading-7 text-brand-mist">{bookingContent.body}</p>
              <p className="text-sm leading-7 text-brand-mist">
                Booking is handled on WhatsApp at{" "}
                <span className="text-brand-ink">{siteConfig.bookingWhatsappDisplay}</span>.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:max-w-sm lg:justify-end">
              <Button href={bookingContent.primaryCta.href} rel="noreferrer" target="_blank">
                {bookingContent.primaryCta.label}
              </Button>
              <Button href={bookingContent.secondaryCta.href} variant="secondary">
                {bookingContent.secondaryCta.label}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
