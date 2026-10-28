import Link from "next/link";

import { homeMenuPreview, priceListCategories } from "@/content/price-list";
import { siteConfig } from "@/content/site";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";
import { MenuRow } from "@/components/ui/menu-row";

const serviceCount = priceListCategories.reduce((n, c) => n + c.items.length, 0);

export function MenuPreview() {
  return (
    <section aria-labelledby="menu-title" className="py-14 sm:py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-[2rem] leading-tight text-ink sm:text-[2.6rem]" id="menu-title">
              Prices
            </h2>
            <p className="mt-2 max-w-[34rem] text-[1.02rem] text-muted">
              A few of our most booked services. Hair prices depend on length and styling time.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-12">
          {homeMenuPreview.map((group) => (
            <div key={group.title}>
              <h3 className="border-b-2 border-ink pb-2 font-display text-xl text-ink">
                <Link className="hover:text-sims-red" href={group.href}>
                  {group.title}
                </Link>
              </h3>
              <ul className="mt-2">
                {group.items.map((item) => (
                  <MenuRow key={item.name} name={item.name} price={item.price} />
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <LinkButton href="/services" variant="secondary">
            See all {serviceCount} services
          </LinkButton>
          <LinkButton download href={siteConfig.priceListPdfHref} icon="file" variant="quiet">
            Download the price list (PDF, {siteConfig.priceListPdfSize})
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
