import { MapEmbed } from "@/components/home/map-embed";
import { Container } from "@/components/ui/container";
import { OpenStatus } from "@/components/ui/open-status";
import { TextLink } from "@/components/ui/text-link";
import { siteConfig } from "@/content/site";
import { strings, type Lang } from "@/content/strings";

export function Visit({ lang }: { lang: Lang }) {
  const t = strings[lang];
  const { street, locality } = siteConfig.address;
  return (
    <section aria-labelledby="visit-title" className="pink-fade py-14 sm:py-20" id="visit">
      <Container className="grid gap-10 md:grid-cols-2 md:gap-14">
        <div>
          <h2 className="font-display text-[1.9rem] leading-tight text-ink sm:text-[2.4rem]" id="visit-title">
            {t.visit.title}
          </h2>
          <dl className="mt-7 space-y-5 text-[0.98rem]">
            <div>
              <dt className="font-semibold text-ink">{t.visit.where}</dt>
              <dd className="mt-1 text-mauve">{t.visit.whereText(street, locality)}</dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">{t.visit.when}</dt>
              <dd className="mt-1 text-mauve">{t.hoursSummary}</dd>
              <dd>
                <OpenStatus className="mt-1" />
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">{t.visit.contact}</dt>
              <dd className="mt-1 text-mauve">{t.visit.contactText(siteConfig.bookingWhatsappDisplay, siteConfig.fixedLineDisplay)}</dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">{t.visit.payment}</dt>
              <dd className="mt-1 text-mauve">{t.visit.paymentMethods.join(", ")}</dd>
            </div>
          </dl>
          <div className="mt-5 flex flex-col items-start">
            <TextLink external href={siteConfig.directionsHref}>
              {t.visit.reviews}
            </TextLink>
          </div>
        </div>

        <figure className="flex flex-col">
          {/* The address sits behind the map, so it still reads if the map is slow or blocked. */}
          <div className="relative flex-1 overflow-hidden rounded-md bg-petal">
            <p className="absolute inset-0 flex items-center justify-center p-6 text-center text-[0.95rem] text-plum">
              {street}, {locality}
            </p>
            <MapEmbed src={`${siteConfig.mapEmbedSrc}&hl=${lang}`} title={t.visit.mapTitle} />
          </div>
          <figcaption className="mt-2 text-[0.88rem] text-mauve">
            {t.visit.inside(street)}{" "}
            <a className="font-semibold text-sims-red underline underline-offset-4" href={siteConfig.directionsHref} rel="noreferrer" target="_blank">
              {t.visit.openMaps}
            </a>
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
