import { GuideList } from "@/components/home/guide-list";
import { Container } from "@/components/ui/container";
import { localePath, strings, type Lang } from "@/content/strings";
import type { GuideItem } from "@/lib/content";

export function Guide({ guide, lang }: { guide: GuideItem[]; lang: Lang }) {
  const t = strings[lang];
  if (guide.length === 0) return null;
  return (
    <section aria-labelledby="guide-title" className="bg-white py-14 sm:py-20">
      <Container className="grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:gap-14">
        <div className="md:sticky md:top-24 md:self-start">
          <h2 className="font-display text-[1.9rem] leading-tight text-ink sm:text-[2.4rem]" id="guide-title">
            {t.guide.title}
          </h2>
          <p className="mt-3 max-w-[26rem] text-[1rem] leading-relaxed text-mauve">{t.guide.body}</p>
        </div>

        <GuideList
          rows={guide.map((g) => ({
            concern: g.concern,
            treatment: g.treatment,
            price: g.price,
            href: `${localePath(lang, "/services")}${g.href}`,
            service: { id: g.service.id, name: g.service.name, bookingName: g.service.bookingName, price: g.service.price, category: g.service.category }
          }))}
        />
      </Container>
    </section>
  );
}
