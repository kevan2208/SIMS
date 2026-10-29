import { PriceCard } from "@/components/home/price-card";
import { Container } from "@/components/ui/container";
import { TextLink } from "@/components/ui/text-link";
import { siteConfig } from "@/content/site";
import { localePath, strings, type Lang } from "@/content/strings";
import type { HomeTab } from "@/lib/content";

export function Prices({ lang, tabs }: { lang: Lang; tabs: HomeTab[] }) {
  const t = strings[lang];
  const links = (
    <>
      <TextLink href={localePath(lang, "/services")}>{t.prices.seeAll}</TextLink>
      <TextLink download href={localePath(lang, siteConfig.priceListPdfPath)}>
        {t.prices.download}
      </TextLink>
    </>
  );

  return (
    <section aria-labelledby="prices-title" className="pink-fade py-14 sm:py-20">
      <Container className="grid grid-cols-[minmax(0,1fr)] gap-8 md:grid-cols-[0.85fr_1.15fr] md:gap-14">
        <div className="md:sticky md:top-24 md:self-start">
          <h2 className="font-display text-[1.9rem] leading-tight text-ink sm:text-[2.4rem]" id="prices-title">
            {t.prices.title}
          </h2>
          <p className="mt-3 max-w-[26rem] text-[1rem] leading-relaxed text-mauve">{t.prices.body}</p>
          <div className="mt-4 hidden flex-col items-start md:flex">{links}</div>
        </div>
        <div>
          {tabs.length ? <PriceCard tabs={tabs} /> : null}
          <div className="mt-3 flex flex-col items-start md:hidden">{links}</div>
        </div>
      </Container>
    </section>
  );
}
