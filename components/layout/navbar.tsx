"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { navItems, siteConfig } from "@/content/site";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { LogoLockup } from "@/components/ui/logo-lockup";
import { NavLink } from "@/components/ui/nav-link";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-transparent transition-all duration-300",
        isScrolled ? "border-brand-stone/80 bg-brand-cream/92 backdrop-blur-md" : "bg-brand-cream/72 backdrop-blur-sm"
      )}
    >
      <Container>
        <div className="flex min-h-20 items-center justify-between gap-4 py-3">
          <Link aria-label="Sim's Hair and Beauty home" href="/" onClick={closeMenu}>
            <LogoLockup priority variant="navbar" />
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <NavLink
                active={pathname === item.href}
                href={item.href}
                key={item.href}
                label={item.label}
              />
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Button href={siteConfig.bookingWhatsappHref} rel="noreferrer" target="_blank">
              {siteConfig.bookingWhatsappLabel}
            </Button>
          </div>

          <button
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-brand-stone bg-brand-shell/82 px-4 text-sm font-medium text-brand-ink shadow-[0_8px_18px_rgba(87,59,55,0.04)] md:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            type="button"
          >
            {isMenuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </Container>

      <div
        className={cn(
          "border-t border-brand-stone/70 bg-brand-cream/95 backdrop-blur-md md:hidden",
          isMenuOpen ? "block" : "hidden"
        )}
        id="mobile-navigation"
      >
        <Container className="py-5">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <NavLink
                active={pathname === item.href}
                className="text-base"
                href={item.href}
                key={item.href}
                label={item.label}
                onClick={closeMenu}
              />
            ))}
            <div className="mt-4 flex flex-col gap-3">
              <Button href={siteConfig.bookingWhatsappHref} rel="noreferrer" target="_blank">
                {siteConfig.bookingWhatsappLabel}
              </Button>
            </div>
          </nav>
        </Container>
      </div>
    </header>
  );
}
