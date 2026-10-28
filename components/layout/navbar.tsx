"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const isHome = usePathname() === "/";
  // On the homepage the big logo is the hero, so the small one only appears once you scroll past it.
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 260);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showLogo = !isHome || scrolled;
  const solid = !isHome || scrolled;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-colors duration-300",
        solid ? "border-b border-seam bg-white/90 backdrop-blur" : "border-b border-transparent bg-transparent"
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          aria-label={`${siteConfig.name}, home`}
          className={cn("transition-opacity duration-300", showLogo ? "opacity-100" : "pointer-events-none opacity-0")}
          href="/"
          tabIndex={showLogo ? 0 : -1}
        >
          <Logo className="w-[4.5rem]" compact />
        </Link>

        <nav aria-label="Main" className="flex items-center gap-1 text-[0.95rem] font-medium sm:gap-2">
          <Link className="px-2.5 py-2 text-ink hover:text-sims-red" href="/services">
            Prices
          </Link>
          <Link className="px-2.5 py-2 text-ink hover:text-sims-red" href="/#visit">
            Visit
          </Link>
          <a
            className={cn(
              "ml-1 rounded-md bg-ink px-3.5 py-2 font-semibold text-white transition-opacity duration-300 hover:bg-[#3a2c30]",
              showLogo ? "opacity-100" : "pointer-events-none opacity-0"
            )}
            href={siteConfig.bookingWhatsappHref}
            rel="noreferrer"
            tabIndex={showLogo ? 0 : -1}
            target="_blank"
          >
            Book
          </a>
        </nav>
      </Container>
    </header>
  );
}
