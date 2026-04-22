import { featuredServices, serviceCategories, siteConfig } from "@/content/site";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceItem } from "@/components/ui/service-item";

type ServicesSectionProps = {
  mode?: "home" | "page";
};

export function ServicesSection({ mode = "home" }: ServicesSectionProps) {
  const isPage = mode === "page";
  const services = isPage ? featuredServices : featuredServices.slice(0, 3);
  const [featuredService, ...otherServices] = services;

  return (
    <section className="anchor-section py-12 sm:py-[4.75rem]" id="services">
      <Container>
        <Reveal>
          <SectionHeading
            action={
              siteConfig.priceListHref ? (
                <Button href={siteConfig.priceListHref} variant="secondary">
                  View full price list
                </Button>
              ) : null
            }
            description={
              isPage
                ? "A clear salon menu built around the treatments clients ask for most."
                : "A short selection from the salon menu."
            }
            eyebrow={isPage ? "Service menu" : "Featured services"}
            title={
              isPage
                ? "Services arranged for easy browsing."
                : "A few treatments clients ask for most."
            }
          />
        </Reveal>

        <div className="mt-10 grid gap-5 xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] xl:items-start">
          <Reveal className="h-full" delayMs={0}>
            <ServiceItem index={0} service={featuredService} variant="featured" />
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {otherServices.map((service, index) => (
              <Reveal className="h-full" delayMs={(index + 1) * 70} key={service.title}>
                <ServiceItem index={index + 1} service={service} />
              </Reveal>
            ))}
          </div>
        </div>

        {isPage ? (
          <Reveal className="mt-8 grid gap-4 md:grid-cols-3" delayMs={100}>
            {serviceCategories.map((category) => (
              <article
                className="soft-panel h-full p-5 sm:p-6"
                key={category.title}
              >
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-brand-red">
                  {category.eyebrow}
                </p>
                <h3 className="mt-3 font-display text-[1.45rem] leading-[1.08] tracking-[-0.02em] text-brand-ink">
                  {category.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-brand-mist">{category.body}</p>
              </article>
            ))}
          </Reveal>
        ) : null}

        <Reveal className="mt-7 rounded-[1.6rem] border border-brand-stone/80 bg-brand-shell/76 px-5 py-5 shadow-soft sm:px-6" delayMs={120}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-2">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-brand-red">
                Need help choosing?
              </p>
              <p className="text-lg font-medium leading-8 text-brand-ink sm:text-[1.28rem]">
                {isPage
                  ? "Message the salon on WhatsApp if you want help choosing."
                  : "Want the full menu or help deciding what to book?"}
              </p>
              <p className="text-sm leading-7 text-brand-mist">
                {isPage
                  ? "The salon can help with treatment choice, pricing, and a suitable appointment time."
                  : "Open the services page for the full menu, or send a WhatsApp message if you want help choosing."}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              {isPage ? (
                <>
                  <Button href={siteConfig.bookingWhatsappHref} rel="noreferrer" target="_blank">
                    Book on WhatsApp
                  </Button>
                  <Button href="/contact" variant="secondary">
                    Contact page
                  </Button>
                </>
              ) : (
                <>
                  <Button href="/services" variant="secondary">
                    See all services
                  </Button>
                  <Button href={siteConfig.bookingWhatsappHref} rel="noreferrer" target="_blank">
                    Book on WhatsApp
                  </Button>
                </>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
