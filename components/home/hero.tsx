import { Logo } from "@/components/brand/logo";
import { BookingTicket } from "@/components/ui/booking-ticket";
import { Container } from "@/components/ui/container";
import { OpenStatus } from "@/components/ui/open-status";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="pink-wash -mt-16 flex min-h-[88svh] items-center pb-12 pt-24 sm:pb-16 sm:pt-28 lg:min-h-[92svh]"
    >
      <Container className="flex flex-col items-center text-center">
        <h1 className="sr-only" id="hero-title">
          Sim&apos;s Hair and Beauty, Flacq
        </h1>
        <Logo className="w-full max-w-[24rem] sm:max-w-[32rem] lg:max-w-[38rem]" intro />
        <div className="intro-rise flex w-full flex-col items-center">
          <p className="mt-5 text-[1.02rem] text-plum sm:text-lg">Hair, facials and nails at Flacq Retail Park</p>
          <OpenStatus className="mt-1.5 justify-center" />
          <BookingTicket className="mt-7 w-full max-w-[27rem] text-left" />
        </div>
      </Container>
    </section>
  );
}
