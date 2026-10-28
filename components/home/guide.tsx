import Link from "next/link";

import { Frangipani } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { treatmentGuide } from "@/content/price-list";

export function Guide() {
  return (
    <section aria-labelledby="guide-title" className="bg-white py-14 sm:py-20">
      <Container className="grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:gap-14">
        <div className="md:sticky md:top-24 md:self-start">
          <h2 className="font-display text-[1.9rem] leading-tight text-ink sm:text-[2.4rem]" id="guide-title">
            Not sure what to book?
          </h2>
          <p className="mt-3 max-w-[26rem] text-[1rem] leading-relaxed text-mauve">
            Start with how your hair or skin feels. We&apos;ll confirm the right treatment when you message us.
          </p>
        </div>

        <ul className="border-t border-seam">
          {treatmentGuide.map((g) => (
            <li className="border-b border-seam" key={g.concern}>
              <Link className="group grid grid-cols-[1.75rem_1fr_auto] items-start gap-3 py-4" href={g.href}>
                <Frangipani className="mt-0.5 text-sims-red" size={24} />
                <span>
                  <span className="block text-[1.02rem] font-semibold text-ink">{g.concern}</span>
                  <span className="mt-0.5 block text-[0.95rem] text-mauve">
                    <span className="font-semibold text-sims-red group-hover:underline group-hover:underline-offset-4">
                      {g.treatment}
                    </span>
                    , {g.price}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
