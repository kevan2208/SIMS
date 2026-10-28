import Image from "next/image";
import Link from "next/link";

import logo from "@/public/logo-sims.png";
import { siteConfig } from "@/content/site";
import { ActionIcon } from "@/components/ui/action-icon";
import { Container } from "@/components/ui/container";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/85">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link aria-label={`${siteConfig.name}, home`} className="shrink-0" href="/">
          <Image alt="" className="h-11 w-auto" priority sizes="60px" src={logo} />
        </Link>

        <nav aria-label="Main" className="flex items-center gap-1 sm:gap-3">
          <Link className="rounded-md px-2 py-2 text-[0.95rem] font-medium text-ink hover:text-sims-red" href="/services">
            Prices
          </Link>
          <Link
            className="hidden rounded-md px-2 py-2 text-[0.95rem] font-medium text-ink hover:text-sims-red sm:inline-block"
            href="/#visit"
          >
            Visit
          </Link>
          <a
            className="ml-1 inline-flex h-10 items-center gap-2 rounded-[10px] bg-sims-red px-4 text-[0.92rem] font-semibold text-white transition-colors hover:bg-sims-deep"
            href={siteConfig.bookingWhatsappHref}
            rel="noreferrer"
            target="_blank"
          >
            <ActionIcon name="whatsapp" />
            Book
          </a>
        </nav>
      </Container>
    </header>
  );
}
