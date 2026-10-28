import { Frangipani } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { TrackedLink } from "@/components/ui/tracked-link";
import { whatsappLink } from "@/content/site";
import { strings, type Lang } from "@/content/strings";
import type { Promo } from "@/lib/content";

/** This month's offer, from the Promo tab of the sheet. Hidden when there's none, or after its end date. */
export function PromoCard({ lang, promo }: { lang: Lang; promo: Promo }) {
  const t = strings[lang];
  return (
    <section aria-labelledby="promo-title" className="bg-[#f5ccd7] pb-10 pt-2">
      <Container>
        <div className="mx-auto grid max-w-[46rem] items-stretch gap-0 overflow-hidden rounded-md bg-white sm:grid-cols-[1fr_auto]">
          <div className="p-5 sm:p-6">
            <p className="flex items-center gap-2 text-[0.85rem] font-semibold text-sims-red">
              <Frangipani size={18} />
              {t.promo.label}
              {promo.endsLabel ? <span className="font-medium text-mauve">{promo.endsLabel}</span> : null}
            </p>
            <h2 className="mt-2 font-display text-[1.6rem] leading-tight text-ink sm:text-[1.9rem]" id="promo-title">
              {promo.title}
            </h2>
            {promo.details ? <p className="mt-2 max-w-[32rem] text-[0.98rem] leading-relaxed text-mauve">{promo.details}</p> : null}
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
              {promo.price ? <p className="font-display text-[1.4rem] text-ink">{promo.price}</p> : null}
              <TrackedLink
                className="inline-flex min-h-11 items-center rounded-md bg-ink px-4 text-[0.92rem] font-semibold text-white hover:bg-[#3a2c30]"
                event="promo"
                href={whatsappLink(t.message.promo(promo.title))}
                label={promo.title}
                rel="noreferrer"
                target="_blank"
              >
                {t.promo.book}
              </TrackedLink>
            </div>
          </div>
          {promo.poster ? (
            <a
              aria-label={t.promo.viewPoster}
              className="block border-t border-seam sm:w-[13rem] sm:border-l sm:border-t-0"
              href={promo.poster}
              rel="noreferrer"
              target="_blank"
            >
              {/* Posters are hosted wherever Kemino keeps them (Drive, Instagram), so a plain img keeps it simple. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="h-48 w-full object-cover sm:h-full" loading="lazy" src={promo.poster} />
            </a>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
