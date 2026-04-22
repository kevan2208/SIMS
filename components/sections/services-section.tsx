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
  const services = isPage ? featuredServices.slice(0, 4) : featuredServices.slice(0, 3);
  const [featuredService, ...otherServices] = services;

  return (
    <section className="anchor-section py-12 sm:py-[4.75rem]" id="services">
      <Container>
        {isPage ? (
          <>
            <Reveal>
              <SectionHeading
                description="Start with the main areas below, then skim a few of the treatments clients ask for most before opening the full price list."
                eyebrow="Service categories"
                title="Start with the area you want to book."
              />
            </Reveal>

            <Reveal className="mt-8 grid gap-4 md:grid-cols-3" delayMs={80}>
              {serviceCategories.map((category) => (
                <article className="soft-panel h-full p-5 sm:p-6" key={category.title}>
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

            <Reveal className="mt-12" delayMs={120}>
              <SectionHeading
                description="If you are booking for the first time, these are a good place to start."
                eyebrow="Most booked"
                title="A quick skim of treatments clients ask for most."
              />
            </Reveal>
          </>
        ) : (
          <Reveal>
            <SectionHeading
              action={
                siteConfig.priceListHref ? (
                  <Button href={siteConfig.priceListHref} variant="secondary">
                    View services & pricing
                  </Button>
                ) : null
              }
              description="Start with a short selection from the salon menu, then open the full services and pricing page."
              eyebrow="Featured services"
              title="A few treatments clients ask for most."
            />
          </Reveal>
        )}

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
      </Container>
    </section>
  );
}
