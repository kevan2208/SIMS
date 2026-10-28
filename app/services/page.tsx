import type { Metadata } from "next";

import { priceListCategories } from "@/content/price-list";
import { siteConfig } from "@/content/site";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";
import { MenuRow } from "@/components/ui/menu-row";

export const metadata: Metadata = {
  title: "Prices and services",
  description:
    "Full price list for Sim's Hair and Beauty in Flacq, Mauritius: haircuts, colour, keratin and repair treatments, facials, waxing, threading, nails, massage, and wedding hair and makeup.",
  alternates: { canonical: "/services" },
  openGraph: { url: "/services", title: "Prices and services | Sim's Hair and Beauty" }
};

export default function ServicesPage() {
  return (
    <main className="pb-6">
      <Container className="pb-8 pt-10 sm:pt-16">
        <h1 className="font-display text-[2.6rem] leading-[1.06] text-ink sm:text-[3.6rem]">Prices</h1>
        <p className="mt-4 max-w-[36rem] text-[1.05rem] leading-relaxed text-muted">
          Everything we offer, in Mauritian rupees. Hair prices depend on length and styling time, so we&apos;ll confirm
          yours when you book.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <LinkButton external href={siteConfig.bookingWhatsappHref} icon="whatsapp">
            Book on WhatsApp
          </LinkButton>
          <LinkButton download href={siteConfig.priceListPdfHref} icon="file" variant="secondary">
            Download PDF ({siteConfig.priceListPdfSize})
          </LinkButton>
        </div>
      </Container>

      <nav aria-label="Price list sections" className="sticky top-16 z-30 border-y border-line bg-paper/95 backdrop-blur">
        <Container className="no-scrollbar flex gap-1 overflow-x-auto py-2">
          {priceListCategories.map((c) => (
            <a
              className="shrink-0 rounded-md px-3 py-2 text-[0.92rem] font-medium text-muted hover:bg-blush hover:text-ink"
              href={`#${c.id}`}
              key={c.id}
            >
              {c.eyebrow}
            </a>
          ))}
        </Container>
      </nav>

      <Container className="grid gap-x-16 gap-y-14 pt-12 md:grid-cols-2">
        {priceListCategories.map((c) => (
          <section aria-labelledby={`${c.id}-title`} id={c.id} key={c.id}>
            <h2 className="border-b-2 border-ink pb-2 font-display text-2xl text-ink" id={`${c.id}-title`}>
              {c.eyebrow}
            </h2>
            {c.note ? <p className="mt-3 text-[0.95rem] text-muted">{c.note}</p> : null}
            <ul className="mt-2">
              {c.items.map((item) => (
                <MenuRow key={item.name} name={item.name} price={item.price} />
              ))}
            </ul>
          </section>
        ))}
      </Container>
    </main>
  );
}
