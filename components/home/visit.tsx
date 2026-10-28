import { Container } from "@/components/ui/container";
import { OpenStatus } from "@/components/ui/open-status";
import { TextLink } from "@/components/ui/text-link";
import { openingHours, siteConfig } from "@/content/site";

export function Visit() {
  return (
    <section aria-labelledby="visit-title" className="pink-fade py-14 sm:py-20" id="visit">
      <Container className="grid gap-10 md:grid-cols-2 md:gap-14">
        <div>
          <h2 className="font-display text-[1.9rem] leading-tight text-ink sm:text-[2.4rem]" id="visit-title">
            Find us
          </h2>

          <dl className="mt-7 space-y-5 text-[0.98rem]">
            <div>
              <dt className="font-semibold text-ink">Where</dt>
              <dd className="mt-1 text-mauve">
                {siteConfig.address.street}, {siteConfig.address.locality}. Parking on site.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">When</dt>
              <dd className="mt-1 text-mauve">{openingHours.summary}</dd>
              <dd>
                <OpenStatus className="mt-1" />
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">Contact</dt>
              <dd className="mt-1 text-mauve">
                WhatsApp {siteConfig.bookingWhatsappDisplay}, salon {siteConfig.fixedLineDisplay}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">Payment</dt>
              <dd className="mt-1 text-mauve">{siteConfig.paymentMethods.join(", ")}</dd>
            </div>
          </dl>

          <div className="mt-5 flex flex-col items-start">
            <TextLink external href={siteConfig.directionsHref}>
              Read our Google reviews
            </TextLink>
          </div>
        </div>

        <figure className="flex flex-col">
          {/* The address sits behind the map, so it still reads if the map is slow or blocked. */}
          <div className="relative flex-1 overflow-hidden rounded-md bg-petal">
            <p className="absolute inset-0 flex items-center justify-center p-6 text-center text-[0.95rem] text-plum">
              {siteConfig.address.street}, {siteConfig.address.locality}
            </p>
            <iframe
              className="relative h-[20rem] w-full border-0 md:h-full md:min-h-[24rem]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={siteConfig.mapEmbedSrc}
              title="Map showing Sim's Hair and Beauty at Flacq Retail Park"
            />
          </div>
          <figcaption className="mt-2 text-[0.88rem] text-mauve">
            Inside {siteConfig.address.street}.{" "}
            <a className="font-semibold text-sims-red underline underline-offset-4" href={siteConfig.directionsHref} rel="noreferrer" target="_blank">
              Open in Google Maps
            </a>
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
