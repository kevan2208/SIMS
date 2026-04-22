import { homePageLinks, siteConfig } from "@/content/site";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function HomePagesSection() {
  return (
    <section className="anchor-section py-12 sm:py-[4.75rem]" id="explore">
      <Container>
        <Reveal className="section-frame px-5 py-6 sm:px-7 sm:py-7">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
            <Reveal className="section-wash rounded-[1.8rem] border border-brand-stone/85 px-5 py-6 shadow-soft sm:px-7 sm:py-7">
              <div className="space-y-4">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-brand-red">
                  Get directions
                </p>
                <h2 className="max-w-[14ch] font-display text-[clamp(2rem,3.7vw,3.2rem)] leading-[1.02] tracking-[-0.03em] text-brand-ink">
                  Find the salon quickly before you book.
                </h2>
                <p className="max-w-[34rem] text-sm leading-7 text-brand-mist">
                  Sim&apos;s Hair and Beauty is located at {siteConfig.addressLines[0]}. Use Google
                  Maps for directions, then message the salon on WhatsApp to arrange your visit.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button href={siteConfig.directionsHref} rel="noreferrer" target="_blank">
                    Get directions
                  </Button>
                  <Button href="/contact" variant="secondary">
                    Contact details
                  </Button>
                </div>
              </div>
            </Reveal>

            <div className="grid gap-4">
              {homePageLinks.map((item, index) => (
                <Reveal className="soft-panel h-full p-5 sm:p-6" delayMs={index * 70 + 40} key={item.href}>
                  <div className="flex h-full flex-col gap-4">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-brand-red">
                      {item.eyebrow}
                    </p>
                    <div className="space-y-2">
                      <h3 className="max-w-[18ch] text-balance font-display text-[1.52rem] leading-[1.06] tracking-[-0.02em] text-brand-ink">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-7 text-brand-mist">{item.body}</p>
                    </div>
                    <div className="pt-1">
                      <Button href={item.href} variant="ghost">
                        {item.label}
                      </Button>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
