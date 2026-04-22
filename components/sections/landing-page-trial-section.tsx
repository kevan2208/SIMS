import { landingHero, landingVisit, siteConfig } from "@/content/site";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { LogoLockup } from "@/components/ui/logo-lockup";

export function LandingPageTrialSection() {
  return (
    <div className="landing-trial-page -mt-[5.5rem] overflow-hidden pt-[5.5rem]">
      <div className="landing-top-surface pointer-events-none absolute inset-x-0 top-0 -z-10 h-[56rem]" />
      <div className="hero-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-[28rem] opacity-[0.28]" />
      <div className="landing-aura pointer-events-none absolute inset-x-0 top-[-6rem] -z-10 h-[42rem]" />
      <section className="relative min-h-[92vh] overflow-hidden pb-12 pt-2 sm:pb-20 sm:pt-4">
        <Container className="relative flex min-h-[92vh] flex-col items-center justify-center pb-20 pt-6 text-center sm:pt-8">
          <div className="landing-orbit landing-orbit-one orbit-ring" />
          <div className="landing-orbit landing-orbit-two orbit-ring" />

          <div className="landing-logo-drop relative z-10 flex flex-col items-center">
            <div className="landing-logo-halo" />
            <div className="landing-logo-stage">
              <LogoLockup
                className="landing-logo-mark w-[24rem] sm:w-[36rem] md:w-[48rem] lg:w-[62rem] xl:w-[70rem]"
                priority
                variant="hero"
              />
            </div>
          </div>

          <div className="landing-copy-rise relative z-10 mt-8 max-w-3xl space-y-6">
            <div className="flex items-center justify-center gap-4">
              <div className="hairline" />
              <p className="text-[0.74rem] font-semibold uppercase tracking-[0.34em] text-brand-red">
                {landingHero.eyebrow}
              </p>
              <div className="hairline" />
            </div>
            <h1 className="mx-auto max-w-[11.5ch] text-balance font-display text-[clamp(2.4rem,6.3vw,5.2rem)] leading-[0.92] tracking-[-0.045em] text-brand-ink">
              {landingHero.title}
            </h1>
            <p className="mx-auto max-w-[34rem] text-pretty text-base leading-8 text-brand-mist sm:text-lg">
              {landingHero.body}
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href={siteConfig.bookingWhatsappHref} rel="noreferrer" size="lg" target="_blank">
                Book on WhatsApp
              </Button>
              <Button href="/services" size="lg" variant="secondary">
                View services & pricing
              </Button>
            </div>
          </div>

          <div className="landing-scroll-cue relative z-10 mt-10">
            <span>Scroll for visit details</span>
          </div>
        </Container>
      </section>

      <section className="anchor-section pb-8" id="visit">
        <Container>
          <div className="section-frame section-wash px-5 py-6 sm:px-7 sm:py-7">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
              <div className="landing-content-rise space-y-5">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-brand-red">
                  {landingVisit.eyebrow}
                </p>
                <h2 className="max-w-[13ch] font-display text-[clamp(2rem,4vw,3.4rem)] leading-[0.98] tracking-[-0.04em] text-brand-ink">
                  {landingVisit.title}
                </h2>
                <p className="max-w-xl text-sm leading-7 text-brand-mist sm:text-[0.98rem] sm:leading-8">
                  {landingVisit.body}
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button href={siteConfig.directionsHref} rel="noreferrer" target="_blank">
                    Get directions
                  </Button>
                  <Button href={siteConfig.bookingWhatsappHref} rel="noreferrer" target="_blank" variant="secondary">
                    Book on WhatsApp
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {landingVisit.facts.map((fact, index) => (
                  <article
                    className="landing-info-card soft-panel h-full p-5 sm:p-6"
                    key={fact.eyebrow}
                    style={{ animationDelay: `${index * 120 + 180}ms` }}
                  >
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-brand-red">
                      {fact.eyebrow}
                    </p>
                    <h3 className="mt-3 font-display text-[1.55rem] leading-[1.04] tracking-[-0.03em] text-brand-ink">
                      {fact.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-brand-mist">{fact.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
