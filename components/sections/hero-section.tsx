import { heroContent, siteConfig } from "@/content/site";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-12 pt-8 sm:pb-20 sm:pt-10" id="top">
      <div className="hero-glow pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40rem]" />
      <div className="hero-grid pointer-events-none absolute inset-0 -z-10 opacity-35" />
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(23rem,0.96fr)] lg:items-center">
          <div className="space-y-7 lg:pr-6">
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="hairline" />
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-brand-red">
                  {heroContent.eyebrow}
                </p>
              </div>
              <h1 className="max-w-[10.6ch] text-balance font-display text-[clamp(3.15rem,8vw,6.25rem)] leading-[0.92] tracking-[-0.045em] text-brand-ink">
                {heroContent.title}
              </h1>
              <p className="max-w-[35rem] text-pretty text-base leading-8 text-brand-mist">
                {heroContent.body}
              </p>
            </div>

            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.26em] text-brand-mist">
              {heroContent.tags.join(" • ")}
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href={siteConfig.bookingWhatsappHref} rel="noreferrer" size="lg" target="_blank">
                {siteConfig.bookingWhatsappLabel}
              </Button>
              <Button href="/services" size="lg" variant="ghost">
                View services
              </Button>
            </div>

            <div className="grid gap-4 border-t border-brand-stone/75 pt-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
              <div className="space-y-2">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-brand-red">
                  {heroContent.availabilityLabel}
                </p>
                <p className="max-w-[33rem] text-sm leading-7 text-brand-mist">
                  {heroContent.bookingNote}
                </p>
              </div>
              <div className="space-y-1 text-sm leading-7 text-brand-ink sm:text-right">
                <p>{siteConfig.bookingWhatsappDisplay}</p>
                <p>{heroContent.hoursLabel}</p>
              </div>
            </div>
          </div>

          <div className="section-frame section-wash isolate overflow-hidden px-5 py-6 sm:px-8 sm:py-8 lg:px-9">
            <div className="orbit-ring -right-16 top-8 h-44 w-44" />
            <div className="orbit-ring -left-20 bottom-14 h-52 w-52 border-brand-mist/20" />
            <div className="pointer-events-none absolute -right-10 top-8 h-32 w-32 rounded-full bg-brand-red/8 blur-3xl" />
            <div className="pointer-events-none absolute -left-8 bottom-8 h-28 w-28 rounded-full bg-brand-mist/8 blur-3xl" />

            <div className="relative flex flex-col gap-5">
              <div className="relative overflow-hidden rounded-[2.15rem] border border-brand-stone/85 bg-brand-shell/88 px-6 py-7 sm:px-8 sm:py-8">
                <div className="pointer-events-none absolute right-5 top-5 h-16 w-16 rounded-full border border-brand-red/12" />
                <div className="pointer-events-none absolute left-6 top-8 h-px w-20 bg-gradient-to-r from-brand-red/35 to-transparent" />
                <div className="pointer-events-none absolute bottom-8 right-8 h-px w-24 bg-gradient-to-l from-brand-red/30 to-transparent" />

                <div className="relative space-y-5">
                  <div className="space-y-2">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-brand-red">
                      Visit the salon
                    </p>
                    <h2 className="max-w-[15ch] font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.02] tracking-[-0.03em] text-brand-ink">
                      Flacq Retail Park, Mauritius, 40606
                    </h2>
                    <p className="max-w-[30rem] text-sm leading-7 text-brand-mist">
                      Check directions first, then send a WhatsApp message to arrange your
                      appointment.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Button href={siteConfig.directionsHref} rel="noreferrer" target="_blank">
                      Get directions
                    </Button>
                    <Button
                      href={siteConfig.bookingWhatsappHref}
                      rel="noreferrer"
                      target="_blank"
                      variant="secondary"
                    >
                      Book on WhatsApp
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 rounded-[1.6rem] border border-brand-stone/75 bg-brand-shell/74 px-5 py-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-brand-red">
                    WhatsApp booking
                  </p>
                  <p className="text-sm leading-7 text-brand-mist">
                    Appointments are arranged directly through the salon WhatsApp line.
                  </p>
                  <p className="text-sm leading-7 text-brand-ink">{siteConfig.bookingWhatsappDisplay}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-brand-red">
                    Opening hours
                  </p>
                  <div className="space-y-1 text-sm leading-7 text-brand-mist">
                    {siteConfig.hours.map((item) => (
                      <p key={item.label}>
                        {item.label}: <span className="text-brand-ink">{item.value}</span>
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
