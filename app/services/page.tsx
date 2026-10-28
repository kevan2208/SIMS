import type { Metadata } from "next";

import { Frangipani } from "@/components/brand/logo";
import { BookingTicket } from "@/components/ui/booking-ticket";
import { Container } from "@/components/ui/container";
import { JumpNav } from "@/components/ui/jump-nav";
import { MenuRow } from "@/components/ui/menu-row";
import { TextLink } from "@/components/ui/text-link";
import { priceListCategories } from "@/content/price-list";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Prices and services",
  description:
    "Full price list for Sim's Hair and Beauty in Flacq, Mauritius: haircuts, colour, keratin and repair treatments, facials, waxing, threading, nails, massage, and wedding hair and makeup.",
  alternates: { canonical: "/services" },
  openGraph: { url: "/services", title: "Prices and services | Sim's Hair and Beauty" }
};

export default function ServicesPage() {
  return (
    <main className="pink-wash -mt-16 pt-16">
      <Container className="pb-10 pt-10 text-center sm:pt-14">
        <h1 className="font-display text-[2.6rem] leading-none text-ink sm:text-[3.4rem]">Menu</h1>
        <div aria-hidden="true" className="mx-auto mt-4 flex max-w-[20rem] items-center gap-3 text-sims-red">
          <span className="h-px flex-1 bg-[#d99aab]" />
          <Frangipani size={30} />
          <span className="h-px flex-1 bg-[#d99aab]" />
        </div>
        <p className="mx-auto mt-4 max-w-[30rem] text-[1rem] leading-relaxed text-plum">
          All prices in rupees. Hair prices depend on length and styling time, so we&apos;ll confirm yours when you book.
        </p>
        <TextLink className="mt-2" download href={siteConfig.priceListPdfHref}>
          Download the PDF ({siteConfig.priceListPdfSize})
        </TextLink>
        <p className="mx-auto mt-6 max-w-[30rem] text-[0.92rem] text-mauve">
          Tap the services you&apos;d like, then send them to us on WhatsApp in one message.
        </p>
      </Container>

      <nav aria-label="Menu sections" className="sticky top-16 z-30 border-y border-[#efc3cf] bg-[#fdeef2]/90 backdrop-blur">
        <Container>
          <JumpNav items={priceListCategories.map((c) => ({ id: c.id, label: c.eyebrow }))} />
        </Container>
      </nav>

      <Container className="grid max-w-[60rem] gap-x-16 gap-y-12 pb-16 pt-12 md:grid-cols-2">
        {priceListCategories.map((c) => (
          <section aria-labelledby={`${c.id}-title`} className="scroll-mt-32" id={c.id} key={c.id}>
            <h2 className="text-center font-display text-[1.5rem] text-ink" id={`${c.id}-title`}>
              {c.eyebrow}
            </h2>
            {c.note ? <p className="mt-1 text-center text-[0.9rem] text-mauve">{c.note}</p> : null}
            <ul className="mt-3">
              {c.items.map((item) => (
                <MenuRow key={item.name} name={item.name} price={item.price} />
              ))}
            </ul>
          </section>
        ))}
      </Container>

      <Container className="flex flex-col items-center pb-16 text-center">
        <p className="font-display text-[1.6rem] text-ink">Ready to book?</p>
        <BookingTicket className="mt-5 w-full max-w-[27rem] text-left" />
      </Container>
    </main>
  );
}
