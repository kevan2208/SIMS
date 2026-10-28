import Image from "next/image";

import logo from "@/public/logo-sims.png";
import { heroPhoto, siteConfig } from "@/content/site";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";
import { OpenStatus } from "@/components/ui/open-status";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="pb-14 pt-10 sm:pb-20 sm:pt-16">
      <Container className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <h1
            className="font-display text-[2.6rem] leading-[1.06] text-ink sm:text-[3.6rem] lg:text-[4.1rem]"
            id="hero-title"
          >
            Hair, skin and nails at Flacq Retail Park
          </h1>
          <p className="mt-5 max-w-[34rem] text-[1.05rem] leading-relaxed text-muted sm:text-lg">
            Cuts, colour, repair treatments, facials, waxing, and nails, in one calm salon. Most visits are booked on
            WhatsApp.
          </p>

          <OpenStatus className="mt-6" />

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <LinkButton external href={siteConfig.bookingWhatsappHref} icon="whatsapp">
              Book on WhatsApp
            </LinkButton>
            <LinkButton href="/services" variant="secondary">
              See prices
            </LinkButton>
          </div>
        </div>

        <div className="relative">
          {heroPhoto ? (
            <Image
              alt={heroPhoto.alt}
              className="aspect-[4/5] w-full rounded-[18px] object-cover"
              height={1000}
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              src={heroPhoto.src}
              width={800}
            />
          ) : (
            <div className="flex aspect-[4/3] items-center justify-center rounded-[18px] bg-sheet px-8 ring-1 ring-line">
              <Image alt="Sim's Hair and Beauty" className="w-full max-w-[26rem]" priority sizes="(min-width: 1024px) 26rem, 80vw" src={logo} />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
