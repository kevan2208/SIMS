import { openingHours, siteConfig } from "@/content/site";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";
import { OpenStatus } from "@/components/ui/open-status";

export function Visit() {
  return (
    <section aria-labelledby="visit-title" className="border-t border-line bg-sheet py-14 sm:py-20" id="visit">
      <Container className="grid gap-10 md:grid-cols-2 md:gap-14">
        <div>
          <h2 className="font-display text-[2rem] leading-tight text-ink sm:text-[2.6rem]" id="visit-title">
            Visit the salon
          </h2>

          <dl className="mt-8 space-y-5 text-[1rem]">
            <div>
              <dt className="font-semibold text-ink">Where</dt>
              <dd className="mt-1 text-muted">
                {siteConfig.address.street}, {siteConfig.address.locality}, {siteConfig.address.country}. Parking on
                site.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">When</dt>
              <dd className="mt-1 text-muted">{openingHours.summary}</dd>
              <dd>
                <OpenStatus className="mt-1" />
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">Book</dt>
              <dd className="mt-1 text-muted">
                WhatsApp {siteConfig.bookingWhatsappDisplay}, or call the salon on {siteConfig.fixedLineDisplay}.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">Payment</dt>
              <dd className="mt-1 text-muted">{siteConfig.paymentMethods.join(", ")}</dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <LinkButton external href={siteConfig.directionsHref} icon="map">
              Get directions
            </LinkButton>
            <LinkButton href={siteConfig.fixedLineHref} icon="phone" variant="secondary">
              Call the salon
            </LinkButton>
          </div>
          <p className="mt-5 text-[0.98rem] text-muted">
            Been in already?{" "}
            <a className="text-sims-red underline underline-offset-4" href={siteConfig.directionsHref} rel="noreferrer" target="_blank">
              Read and leave reviews on Google
            </a>
            .
          </p>
        </div>

        <iframe
          className="h-[22rem] w-full rounded-[18px] border-0 ring-1 ring-line md:h-full md:min-h-[26rem]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={siteConfig.mapEmbedSrc}
          title="Map showing Sim's Hair and Beauty at Flacq Retail Park"
        />
      </Container>
    </section>
  );
}
