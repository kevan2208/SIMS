import { Container } from "@/components/ui/container";
import { strings, type Lang } from "@/content/strings";

export function Faq({ lang }: { lang: Lang }) {
  const t = strings[lang];
  return (
    <section aria-labelledby="faq-title" className="pink-fade-down py-14 sm:py-20">
      <Container className="grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:gap-14">
        <h2 className="font-display text-[1.9rem] leading-tight text-ink sm:text-[2.4rem] md:sticky md:top-24 md:self-start" id="faq-title">
          {t.faqTitle}
        </h2>
        <div className="border-t border-seam">
          {t.faqs.map((item) => (
            <details className="faq border-b border-seam" key={item.question}>
              <summary className="flex items-center justify-between gap-6 py-4 text-[1.02rem] font-semibold text-ink">
                {item.question}
                <span aria-hidden="true" className="faq__mark text-[1.6rem] font-light leading-none text-sims-red">
                  +
                </span>
              </summary>
              <p className="max-w-[40rem] pb-5 pr-8 text-[0.98rem] leading-relaxed text-mauve">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
