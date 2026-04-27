import { landingHero, landingVisit, siteConfig } from "@/content/site";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { LogoLockup } from "@/components/ui/logo-lockup";

export function LandingPageTrialSection() {
  return (
    <div className="landing-trial-page overflow-hidden">
      <div className="landing-top-surface pointer-events-none absolute inset-x-0 top-0 -z-10 h-[56rem]" />
      <div className="hero-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-[28rem] opacity-[0.14]" />
      <div className="landing-aura pointer-events-none absolute inset-x-0 top-[-6rem] -z-10 h-[42rem]" />
      <section className="relative overflow-hidden pb-8 pt-1 sm:min-h-[calc(100svh-5rem)] sm:pb-20 sm:pt-4">
        <Container className="relative flex flex-col items-center justify-start pb-8 pt-3 text-center sm:min-h-[calc(100svh-5rem)] sm:justify-center sm:pb-20 sm:pt-8">
          <div className="landing-orbit landing-orbit-one orbit-ring" />
          <div className="landing-orbit landing-orbit-two orbit-ring" />

          <div className="landing-logo-drop relative z-10 flex flex-col items-center">
            <div className="landing-logo-halo" />
            <div className="landing-logo-stage" data-hero-logo-anchor>
              <LogoLockup
                className="landing-logo-mark w-[15.5rem] sm:w-[30rem] md:w-[46rem] lg:w-[58rem] xl:w-[68rem]"
                priority
                variant="hero"
              />
            </div>
          </div>

          <div className="landing-copy-rise relative z-10 mt-3 max-w-3xl space-y-3 sm:mt-8 sm:space-y-6">
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              <div className="hairline" />
              <p className="text-[0.69rem] font-semibold uppercase tracking-[0.28em] text-brand-red sm:text-[0.74rem] sm:tracking-[0.34em]">
                {landingHero.eyebrow}
              </p>
              <div className="hairline" />
            </div>
            <h1 className="mx-auto max-w-[11.5ch] text-balance font-display text-[clamp(2.05rem,9.8vw,5.2rem)] leading-[0.92] tracking-[-0.045em] text-brand-ink">
              {landingHero.title}
            </h1>
            <p className="mx-auto max-w-[30rem] text-pretty text-[0.95rem] leading-7 text-brand-mist sm:max-w-[34rem] sm:text-lg sm:leading-8">
              {landingHero.body}
            </p>
            <div className="flex w-full max-w-sm flex-col items-center justify-center gap-2.5 sm:max-w-none sm:flex-row sm:gap-3">
              <Button className="w-full sm:w-auto" href={siteConfig.bookingWhatsappHref} rel="noreferrer" size="lg" target="_blank">
                Book on WhatsApp
              </Button>
              <Button className="w-full sm:w-auto" href="/services" size="lg" variant="secondary">
                View services & pricing
              </Button>
            </div>
            <p className="mx-auto max-w-[32rem] text-pretty text-[0.72rem] font-medium uppercase tracking-[0.14em] text-brand-mist/92 sm:text-[0.8rem] sm:tracking-[0.18em]">
              {landingHero.trustNote}
            </p>
          </div>

          <div className="landing-scroll-cue relative z-10 mt-8 hidden sm:mt-10 sm:block">
            <span>Scroll for visit details</span>
          </div>
        </Container>
      </section>

      <section className="anchor-section pb-8" id="visit">
        <Container>
          <div className="section-frame section-wash px-4 py-5 sm:px-7 sm:py-7">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,0.74fr)_minmax(0,1.26fr)] lg:items-start">
              <div className="landing-content-rise space-y-4 sm:space-y-5">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-brand-red">
                  {landingVisit.eyebrow}
                </p>
                <h2 className="max-w-[11ch] font-display text-[clamp(1.85rem,3.55vw,3rem)] leading-[0.98] tracking-[-0.04em] text-brand-ink">
                  {landingVisit.title}
                </h2>
                <p className="max-w-[34rem] text-sm leading-7 text-brand-mist sm:text-[0.96rem] sm:leading-8">
                  {landingVisit.body}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {landingVisit.facts.map((fact, index) => (
                  <article
                    className="landing-info-card utility-panel flex h-full flex-col p-4 sm:p-6"
                    key={fact.eyebrow}
                    style={{ animationDelay: `${index * 120 + 180}ms` }}
                  >
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-brand-red">
                      {fact.eyebrow}
                    </p>
                    <h3 className="mt-3 font-display text-[1.24rem] leading-[1.06] tracking-[-0.03em] text-brand-ink sm:text-[1.4rem]">
                      {fact.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-brand-mist">{fact.body}</p>
                    {fact.action ? (
                      <div className="mt-auto pt-5">
                        <Button
                          className="w-full justify-center sm:w-auto"
                          href={fact.action.href}
                          rel={fact.action.external ? "noreferrer" : undefined}
                          target={fact.action.external ? "_blank" : undefined}
                          variant="secondary"
                        >
                          {fact.action.label}
                        </Button>
                      </div>
                    ) : null}
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
