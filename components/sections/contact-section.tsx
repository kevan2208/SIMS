import { contactDetails, contactGuidance, siteConfig } from "@/content/site";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { InfoRow } from "@/components/ui/info-row";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function ContactSection() {
  return (
    <section className="anchor-section py-12 sm:py-[4.75rem]" id="contact">
      <Container>
        <Reveal>
          <SectionHeading
            description="WhatsApp is the main way to book, ask about pricing, or get service advice."
            eyebrow="Contact"
            title="Booking details, hours, and directions in one place."
          />
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)]">
          <Reveal className="section-frame p-6 sm:p-8">
            <div className="space-y-1">
              {contactDetails.map((detail) => (
                <InfoRow
                  href={detail.href}
                  key={detail.label}
                  label={detail.label}
                  note={detail.note}
                  value={detail.value}
                />
              ))}
            </div>
          </Reveal>

          <Reveal className="section-frame section-wash flex h-full flex-col justify-between p-6 sm:p-8" delayMs={120}>
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-brand-red">
                  Booking guidance
                </p>
                <div className="space-y-3">
                  {contactGuidance.map((item, index) => (
                    <div className="flex items-start gap-4 border-b border-brand-stone/70 pb-3 last:border-b-0 last:pb-0" key={item}>
                      <span className="mt-0.5 font-display text-xl text-brand-red/75">
                        0{index + 1}
                      </span>
                      <p className="text-sm leading-7 text-brand-mist">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-brand-red">
                  Business hours
                </p>
                <div className="space-y-4">
                  {siteConfig.hours.map((item) => (
                    <div
                      className="flex items-center justify-between gap-4 border-b border-brand-stone/70 pb-3 text-sm leading-7"
                      key={item.label}
                    >
                      <span className="text-brand-mist">{item.label}</span>
                      <span className="text-brand-ink">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-sm leading-7 text-brand-mist">
                Appointments are usually easier to arrange a few days ahead. WhatsApp is the best
                first step for booking help, directions, and availability.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-8 section-frame overflow-hidden" delayMs={180}>
          <div className="grid gap-0 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="section-wash p-6 sm:p-8">
              <div className="space-y-4">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-brand-red">
                  Find the salon
                </p>
                <h3 className="font-display text-[1.9rem] leading-[1.04] tracking-[-0.03em] text-brand-ink">
                  Flacq Retail Park, Mauritius, 40606
                </h3>
                <p className="text-sm leading-7 text-brand-mist">
                  If you need help finding the salon, send a WhatsApp message first and directions
                  can be shared with your booking details.
                </p>
                <Button href={siteConfig.directionsHref} rel="noreferrer" target="_blank" variant="secondary">
                  Open in Google Maps
                </Button>
              </div>
            </div>

            <div className="min-h-[22rem] border-t border-brand-stone/80 lg:border-l lg:border-t-0">
              <iframe
                className="h-full min-h-[22rem] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={siteConfig.mapEmbedHref}
                title="Map showing Sim's Hair and Beauty location"
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
