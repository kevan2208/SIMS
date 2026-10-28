import { Logo } from "@/components/brand/logo";
import { BookingTicket } from "@/components/ui/booking-ticket";
import { Container } from "@/components/ui/container";
import { OpenStatus } from "@/components/ui/open-status";
import { strings, type Lang } from "@/content/strings";

export function Hero({ lang }: { lang: Lang }) {
  const t = strings[lang];
  return (
    <section
      aria-labelledby="hero-title"
      className="pink-wash -mt-16 flex min-h-[88svh] items-center pb-12 pt-28 sm:pb-16 sm:pt-32 lg:min-h-[92svh]"
    >
      <Container className="flex flex-col items-center text-center">
        <h1 className="sr-only" id="hero-title">
          {t.heroTitle}
        </h1>
        <Logo className="w-full max-w-[24rem] sm:max-w-[32rem] lg:max-w-[38rem]" intro />
        <div className="intro-rise flex w-full flex-col items-center">
          <p className="mt-5 text-[1.02rem] text-plum sm:text-lg">{t.heroLede}</p>
          <OpenStatus className="mt-1.5 justify-center" />
          <BookingTicket className="mt-7 w-full max-w-[27rem] text-left" id="hero-booking" lang={lang} />
        </div>
      </Container>
    </section>
  );
}
