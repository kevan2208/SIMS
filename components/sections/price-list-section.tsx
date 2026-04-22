import { priceListCategories } from "@/content/price-list";
import { siteConfig } from "@/content/site";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function PriceListSection() {
  return (
    <section className="anchor-section py-12 sm:py-[4.75rem]" id="price-list">
      <Container>
        <Reveal className="section-frame px-5 py-6 sm:px-7 sm:py-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-3">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-brand-red">
                Browse by category
              </p>
              <h2 className="font-display text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1.02] tracking-[-0.03em] text-brand-ink">
                Full price list
              </h2>
              <p className="text-sm leading-7 text-brand-mist">
                Some prices are marked from because they vary with hair length, product choice, or
                time needed.
              </p>
              <p className="text-sm leading-7 text-brand-mist">
                You can also open or download the original PDF below. Use the website WhatsApp
                number if the PDF shows older contact details.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href={siteConfig.priceListPdfHref} rel="noreferrer" target="_blank" variant="secondary">
                Open PDF
              </Button>
              <Button download href={siteConfig.priceListPdfHref} variant="ghost">
                Download PDF
              </Button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {priceListCategories.map((category) => (
              <a
                className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-brand-stone/85 bg-brand-shell/88 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-brand-mist shadow-[0_10px_22px_rgba(87,59,55,0.04)] ring-1 ring-white/45 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-brand-red/45 hover:bg-brand-petal hover:text-brand-red hover:shadow-soft hover:ring-brand-red/12"
                href={`#${category.id}`}
                key={category.id}
              >
                <span>{category.eyebrow}</span>
                <span
                  aria-hidden="true"
                  className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-brand-red/12 bg-brand-red/10 text-[0.78rem] transition-transform duration-300 ease-out group-hover:translate-x-0.5"
                >
                  →
                </span>
              </a>
            ))}
          </div>
        </Reveal>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {priceListCategories.map((category, index) => (
            <Reveal className="section-frame h-full p-6 sm:p-7" delayMs={(index % 4) * 60} key={category.id}>
              <article className="anchor-section h-full" id={category.id}>
                <div className="flex items-start justify-between gap-4 border-b border-brand-stone/75 pb-5">
                  <div className="space-y-2">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-brand-red">
                      {category.eyebrow}
                    </p>
                    <h2 className="max-w-[18ch] text-balance font-display text-[1.9rem] leading-[1.04] tracking-[-0.03em] text-brand-ink">
                      {category.title}
                    </h2>
                    {category.note ? (
                      <p className="max-w-[34rem] text-sm leading-7 text-brand-mist">{category.note}</p>
                    ) : null}
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {category.items.map((item) => (
                    <div
                      className="flex flex-col gap-1.5 border-b border-brand-stone/65 pb-3 last:border-b-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between sm:gap-5"
                      key={`${category.id}-${item.name}`}
                    >
                      <p className="pr-0 text-sm leading-6 text-brand-ink sm:pr-4 sm:leading-7">{item.name}</p>
                      <p className="shrink-0 text-left text-sm font-medium leading-6 text-brand-mist sm:text-right sm:leading-7">
                        {item.price}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
