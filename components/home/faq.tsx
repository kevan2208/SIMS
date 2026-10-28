import { faqs } from "@/content/site";
import { Container } from "@/components/ui/container";

export function Faq() {
  return (
    <section aria-labelledby="faq-title" className="border-t border-line py-14 sm:py-20">
      <Container className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-14">
        <h2 className="font-display text-[2rem] leading-tight text-ink sm:text-[2.6rem]" id="faq-title">
          Good to know
        </h2>

        <div className="border-t border-line">
          {faqs.map((item) => (
            <details className="faq border-b border-line" key={item.question}>
              <summary className="flex items-center justify-between gap-6 py-5 text-[1.05rem] font-semibold text-ink">
                {item.question}
                <span aria-hidden="true" className="faq__mark text-2xl font-normal leading-none text-sims-red">
                  +
                </span>
              </summary>
              <p className="max-w-[40rem] pb-5 pr-8 text-[1rem] leading-relaxed text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
