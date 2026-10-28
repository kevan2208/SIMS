import Image from "next/image";

import { signatureTreatment as t, whatsappLink } from "@/content/site";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";

const askHref = whatsappLink(
  "Hello Sim's Hair and Beauty, I'd like to know more about the Absolut Repair Molecular treatment."
);

export function Signature() {
  return (
    <section aria-labelledby="signature-title" className="border-y border-line bg-sheet py-14 sm:py-20">
      <Container className="grid items-center gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-14">
        <Image
          alt={t.imageAlt}
          className="mx-auto aspect-square w-full max-w-[16rem] md:max-w-[22rem] rounded-[18px] object-cover"
          height={600}
          sizes="(min-width: 768px) 22rem, 90vw"
          src={t.image}
          width={600}
        />

        <div>
          <p className="text-[0.95rem] font-semibold text-sims-red">Our signature treatment</p>
          <h2 className="mt-2 font-display text-[2rem] leading-tight text-ink sm:text-[2.6rem]" id="signature-title">
            {t.title}
          </h2>
          <p className="mt-4 max-w-[38rem] text-[1.02rem] leading-relaxed text-muted">{t.body}</p>

          <p className="mt-6 font-semibold text-ink">Good for</p>
          <ul className="mt-2 space-y-1.5 text-[1rem] text-muted">
            {t.suitedTo.map((line) => (
              <li className="flex gap-3" key={line}>
                <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-sims-red" />
                {line}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <p className="font-display text-2xl text-ink">{t.price}</p>
            <LinkButton external href={askHref} icon="whatsapp" variant="secondary">
              Ask about this treatment
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
