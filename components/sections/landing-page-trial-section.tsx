import { featuredServices, siteConfig } from "@/content/site";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { LogoLockup } from "@/components/ui/logo-lockup";

const quickFacts = [
  {
    eyebrow: "WhatsApp booking",
    title: siteConfig.bookingWhatsappDisplay,
    body: "Appointments, service advice, and availability are handled on WhatsApp."
  },
  {
    eyebrow: "Opening hours",
    title: "Monday to Saturday",
    body: "08:30 to 17:00. Sunday is closed."
  },
  {
    eyebrow: "Location",
    title: "Flacq Retail Park",
    body: "Easy to find, with directions ready to open in Google Maps."
  }
];

export function LandingPageTrialSection() {
  return (
    <main className="landing-trial-page overflow-hidden">
      <section className="relative min-h-[92vh] overflow-hidden pb-12 pt-8 sm:pb-20 sm:pt-10">
        <div className="hero-glow pointer-events-none absolute inset-x-0 top-0 -z-10 h-[42rem]" />
        <div className="hero-grid pointer-events-none absolute inset-0 -z-10 opacity-35" />
        <div className="landing-aura pointer-events-none absolute inset-x-0 top-[-6rem] -z-10 h-[34rem]" />
        <Container className="relative flex min-h-[92vh] flex-col items-center justify-center pb-20 text-center">
          <div className="landing-orbit landing-orbit-one orbit-ring" />
          <div className="landing-orbit landing-orbit-two orbit-ring" />

          <div className="landing-logo-drop relative z-10 flex flex-col items-center">
            <div className="landing-logo-halo" />
            <LogoLockup
              className="w-[19rem] sm:w-[28rem] lg:w-[42rem]"
              priority
              variant="hero"
            />
          </div>

          <div className="landing-copy-rise relative z-10 mt-8 max-w-3xl space-y-6">
            <div className="flex items-center justify-center gap-4">
              <div className="hairline" />
              <p className="text-[0.74rem] font-semibold uppercase tracking-[0.34em] text-brand-red">
                Sim&apos;s Hair and Beauty • Mauritius
              </p>
              <div className="hairline" />
            </div>
            <h1 className="mx-auto max-w-[12ch] text-balance font-display text-[clamp(2.85rem,8vw,6.8rem)] leading-[0.9] tracking-[-0.05em] text-brand-ink">
              A softer salon landing made to lead with the brand.
            </h1>
            <p className="mx-auto max-w-2xl text-pretty text-base leading-8 text-brand-mist sm:text-lg">
              The logo leads first, then the booking route, services, and directions follow in a
              calmer sequence.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href={siteConfig.bookingWhatsappHref} rel="noreferrer" size="lg" target="_blank">
                Book on WhatsApp
              </Button>
              <Button href={siteConfig.directionsHref} rel="noreferrer" size="lg" target="_blank" variant="secondary">
                Get directions
              </Button>
            </div>
          </div>

          <div className="landing-scroll-cue relative z-10 mt-10">
            <span>Scroll to details</span>
          </div>
        </Container>
      </section>

      <section className="pb-8">
        <Container>
          <div className="section-frame px-5 py-6 sm:px-7 sm:py-7">
            <div className="grid gap-4 lg:grid-cols-3">
              {quickFacts.map((fact, index) => (
                <article
                  className="landing-info-card soft-panel h-full"
                  key={fact.eyebrow}
                  style={{ animationDelay: `${index * 120 + 180}ms` }}
                >
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-brand-red">
                    {fact.eyebrow}
                  </p>
                  <h2 className="mt-3 font-display text-[1.7rem] leading-[1.04] tracking-[-0.03em] text-brand-ink">
                    {fact.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-brand-mist">{fact.body}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-8 pt-6 sm:pt-10">
        <Container>
          <div className="landing-feature-shell section-frame section-wash">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)] lg:items-end">
              <div className="landing-content-rise space-y-5">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-brand-red">
                  Salon focus
                </p>
                <h2 className="max-w-[12ch] font-display text-[clamp(2.1rem,4vw,3.9rem)] leading-[0.96] tracking-[-0.04em] text-brand-ink">
                  Hair, facials, and nails with one clear booking route.
                </h2>
                <p className="max-w-2xl text-base leading-8 text-brand-mist">
                  Browse the services, open the full price list, send a WhatsApp message to book,
                  or open directions if you are heading to the salon.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button href="/services" size="lg" variant="secondary">
                    View services & pricing
                  </Button>
                  <Button href="/contact" size="lg" variant="ghost">
                    Contact & map
                  </Button>
                </div>
              </div>

              <div className="grid gap-3">
                {featuredServices.slice(0, 3).map((service, index) => (
                  <article
                    className="landing-service-card soft-panel"
                    key={service.title}
                    style={{ animationDelay: `${index * 120 + 420}ms` }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <h3 className="font-display text-[1.35rem] leading-[1.05] tracking-[-0.03em] text-brand-ink">
                          {service.title}
                        </h3>
                        <p className="text-sm leading-7 text-brand-mist">{service.description}</p>
                      </div>
                      <p className="shrink-0 rounded-full border border-brand-red/18 bg-brand-petal/78 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-brand-red">
                        {service.price}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
