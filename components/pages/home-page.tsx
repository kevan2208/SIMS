import type { Metadata } from "next";

import { Faq } from "@/components/home/faq";
import { Gallery } from "@/components/home/gallery";
import { Guide } from "@/components/home/guide";
import { Hero } from "@/components/home/hero";
import { Prices } from "@/components/home/prices";
import { PromoCard } from "@/components/home/promo-card";
import { Visit } from "@/components/home/visit";
import { localePath, type Lang } from "@/content/strings";
import { getContent } from "@/lib/content";

export function homeMetadata(lang: Lang): Metadata {
  return {
    alternates: { canonical: localePath(lang, "/"), languages: { en: "/", fr: "/fr", "x-default": "/" } },
    openGraph: { url: localePath(lang, "/") }
  };
}

export async function HomePage({ lang }: { lang: Lang }) {
  const content = await getContent(lang);
  return (
    <main>
      <Hero lang={lang} />
      {content.promo ? <PromoCard lang={lang} promo={content.promo} /> : null}
      <Guide guide={content.guide} lang={lang} />
      <Prices lang={lang} tabs={content.homeTabs} />
      <Gallery lang={lang} />
      <Faq lang={lang} />
      <Visit lang={lang} />
    </main>
  );
}
