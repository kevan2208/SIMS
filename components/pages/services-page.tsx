import type { Metadata } from "next";

import { Frangipani } from "@/components/brand/logo";
import { BookingTicket } from "@/components/ui/booking-ticket";
import { Container } from "@/components/ui/container";
import { JumpNav } from "@/components/ui/jump-nav";
import { MenuRow } from "@/components/ui/menu-row";
import { TextLink } from "@/components/ui/text-link";
import { siteConfig } from "@/content/site";
import { localePath, strings, type Lang } from "@/content/strings";
import { getContent } from "@/lib/content";

export function servicesMetadata(lang: Lang): Metadata {
  const t = strings[lang];
  return {
    title: t.menu.metaTitle,
    description: t.menu.metaDescription,
    alternates: {
      canonical: localePath(lang, "/services"),
      languages: { en: "/services", fr: "/fr/services", "x-default": "/services" }
    },
    openGraph: { url: localePath(lang, "/services"), title: `${t.menu.metaTitle} | ${siteConfig.name}` }
  };
}

export async function ServicesPage({ lang }: { lang: Lang }) {
  const t = strings[lang];
  const { categories } = await getContent(lang);

  return (
    <main className="pink-wash -mt-16 pt-16">
      <Container className="pb-10 pt-10 text-center sm:pt-14">
        <h1 className="font-display text-[2.6rem] leading-none text-ink sm:text-[3.4rem]">{t.menu.title}</h1>
        <div aria-hidden="true" className="mx-auto mt-4 flex max-w-[20rem] items-center gap-3 text-sims-red">
          <span className="h-px flex-1 bg-[#d99aab]" />
          <Frangipani size={30} />
          <span className="h-px flex-1 bg-[#d99aab]" />
        </div>
        <p className="mx-auto mt-4 max-w-[30rem] text-[1rem] leading-relaxed text-plum">{t.menu.intro}</p>
        <TextLink className="mt-2" download href={localePath(lang, siteConfig.priceListPdfPath)}>
          {t.menu.download}
        </TextLink>
        <p className="mx-auto mt-6 max-w-[30rem] text-[0.92rem] text-mauve">{t.menu.tapHint}</p>
      </Container>

      <nav aria-label={t.menu.sections} className="sticky top-16 z-30 border-y border-[#efc3cf] bg-[#fdeef2]/90 backdrop-blur">
        <Container>
          <JumpNav items={categories.map((c) => ({ id: c.id, label: c.name }))} />
        </Container>
      </nav>

      <Container className="grid max-w-[60rem] gap-x-16 gap-y-12 pb-16 pt-12 md:grid-cols-2">
        {categories.map((c) => (
          <section aria-labelledby={`${c.id}-title`} className="scroll-mt-32" id={c.id} key={c.id}>
            <h2 className="text-center font-display text-[1.5rem] text-ink" id={`${c.id}-title`}>
              {c.name}
            </h2>
            {c.note ? <p className="mt-1 text-center text-[0.9rem] text-mauve">{c.note}</p> : null}
            <ul className="mt-3">
              {c.items.map((item) => (
                <MenuRow key={item.id} service={item} />
              ))}
            </ul>
          </section>
        ))}
      </Container>

      <Container className="flex flex-col items-center pb-16 text-center">
        <p className="font-display text-[1.6rem] text-ink">{t.menu.ready}</p>
        <BookingTicket className="mt-5 w-full max-w-[27rem] text-left" lang={lang} />
      </Container>
    </main>
  );
}
