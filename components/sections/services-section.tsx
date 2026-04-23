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
  const featuredServiceAction =
    featuredService.title === "Absolute Repair Molecular Treatment"
      ? {
          label: "Ask about this treatment",
          href: siteConfig.bookingWhatsappHref,
          external: true
        }
      : undefined;

  return (
    <section className="anchor-section py-12 sm:py-[4.75rem]" id="services">
      <Container>
        {isPage ? (
          <>
            <Reveal>
              <SectionHeading
                description="Start with the main area you want, then move into the full menu below."
                eyebrow="Service categories"
                title="Start with the area you want to book."
              />
            </Reveal>

            <Reveal className="mt-8 section-frame px-5 py-5 sm:px-6 sm:py-6" delayMs={80}>
              <div className="grid gap-5 md:grid-cols-3 md:gap-0">
                {serviceCategories.map((category) => (
                  <article
                    className="space-y-3 md:px-5 md:py-1 md:first:pl-0 md:last:pr-0 md:not-first:border-l md:not-first:border-brand-stone/58 md:not-first:pl-6"
                    key={category.title}
                  >
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-brand-red">
                      {category.eyebrow}
                    </p>
                    <h3 className="font-display text-[1.35rem] leading-[1.08] tracking-[-0.02em] text-brand-ink">
                      {category.title}
                    </h3>
                    <p className="text-sm leading-7 text-brand-mist">{category.body}</p>
                  </article>
                ))}
              </div>
            </Reveal>

            <Reveal className="mt-10" delayMs={120}>
              <SectionHeading
                description="If this is your first booking, these are a good place to start."
                eyebrow="Most booked"
                title="A short list clients ask for often."
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
              description="Start with a short salon edit, then open the full menu when you need the complete list."
              eyebrow="Featured services"
              title="Start with a few treatments clients ask for most."
            />
          </Reveal>
        )}

        <div
          className={`mt-10 grid gap-5 ${isPage ? "xl:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]" : "xl:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)]"} xl:items-start`}
        >
          <Reveal className="h-full" delayMs={0}>
            <ServiceItem action={featuredServiceAction} index={0} service={featuredService} variant="featured" />
          </Reveal>

          <div className={`grid gap-4 ${isPage ? "sm:grid-cols-2" : ""}`}>
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
