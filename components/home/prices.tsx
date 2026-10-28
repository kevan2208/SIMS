import { PriceCard } from "@/components/home/price-card";
import { Container } from "@/components/ui/container";
import { TextLink } from "@/components/ui/text-link";
import { homePriceTabs, priceListCategories } from "@/content/price-list";
import { siteConfig } from "@/content/site";

const serviceCount = priceListCategories.reduce((n, c) => n + c.items.length, 0);

export function Prices() {
  return (
    <section aria-labelledby="prices-title" className="pink-fade py-14 sm:py-20">
      <Container className="grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:gap-14">
        <div className="md:sticky md:top-24 md:self-start">
          <h2 className="font-display text-[1.9rem] leading-tight text-ink sm:text-[2.4rem]" id="prices-title">
            Prices
          </h2>
          <p className="mt-3 max-w-[26rem] text-[1rem] leading-relaxed text-mauve">
            Some of our most booked services. Tap any to add it to your booking.
          </p>
          <div className="mt-4 hidden flex-col items-start md:flex">
            <TextLink href="/services">See all {serviceCount} services</TextLink>
            <TextLink download href={siteConfig.priceListPdfHref}>
              Download the price list (PDF, {siteConfig.priceListPdfSize})
            </TextLink>
          </div>
        </div>

        <div>
          <PriceCard tabs={homePriceTabs} />
          <div className="mt-3 flex flex-col items-start md:hidden">
            <TextLink href="/services">See all {serviceCount} services</TextLink>
            <TextLink download href={siteConfig.priceListPdfHref}>
              Download the price list (PDF, {siteConfig.priceListPdfSize})
            </TextLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
