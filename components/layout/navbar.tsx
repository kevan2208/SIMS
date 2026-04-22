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
  const [showLandingBrand, setShowLandingBrand] = useState(true);
  const pathname = usePathname();
  const isLandingHome = pathname === "/";
  const navPillClass =
    "gap-1 rounded-full border border-brand-stone/48 bg-[linear-gradient(180deg,rgba(248,239,241,0.74),rgba(241,226,230,0.58))] px-2 py-1 shadow-[0_12px_28px_rgba(87,59,55,0.05)] backdrop-blur-md";
  const navButtonClass =
    "border-brand-stone/72 bg-[linear-gradient(135deg,rgba(248,239,241,0.98),rgba(236,214,220,0.92))] text-brand-noir shadow-[0_14px_30px_rgba(87,59,55,0.07)] ring-1 ring-white/55 hover:border-brand-red/28 hover:bg-[linear-gradient(135deg,rgba(246,235,238,0.98),rgba(233,206,214,0.94))] hover:text-brand-noir hover:shadow-[0_18px_36px_rgba(87,59,55,0.09)]";

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      setIsScrolled(currentScroll > 12);
      setShowLandingBrand(!isLandingHome || currentScroll > Math.max(window.innerHeight * 0.52, 420));
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLandingHome]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const closeMenu = () => setIsMenuOpen(false);
  const brandSlot = isLandingHome ? (
    <div aria-hidden="true" className="relative w-[10.5rem] sm:w-[12.5rem]">
      <Link
        aria-label="Sim's Hair and Beauty home"
        className={cn(
          "absolute left-0 top-1/2 -translate-y-1/2 transition-all duration-500 ease-out",
          showLandingBrand
            ? "translate-y-[-50%] opacity-100"
            : "pointer-events-none translate-y-[calc(-50%-0.35rem)] opacity-0"
        )}
        href="/"
        onClick={closeMenu}
      >
        <LogoLockup priority variant="navbar" />
      </Link>
    </div>
  ) : (
    <Link
      aria-label="Sim's Hair and Beauty home"
      className="translate-y-0 opacity-100 transition-all duration-500 ease-out"
      href="/"
      onClick={closeMenu}
    >
      <LogoLockup priority variant="navbar" />
    </Link>
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-transparent transition-all duration-500 ease-out",
        isLandingHome && !isScrolled
          ? "landing-header-surface"
          : !isScrolled
            ? "bg-transparent"
          : isScrolled
            ? "border-brand-stone/55 bg-[linear-gradient(180deg,rgba(248,239,241,0.94),rgba(242,229,233,0.88))] shadow-[0_12px_32px_rgba(87,59,55,0.06)] backdrop-blur-xl"
            : "border-brand-stone/38 bg-[linear-gradient(180deg,rgba(248,239,241,0.88),rgba(245,234,237,0.76))] backdrop-blur-lg"
      )}
    >
      <Container>
        <div className="flex min-h-20 items-center justify-between gap-4 py-3">
          {brandSlot}

          <nav
            className={cn(
              "hidden items-center md:flex",
              navPillClass
            )}
          >
            {navItems.map((item) => (
              <NavLink
                active={pathname === item.href}
                className="min-w-[6.5rem] justify-center text-center"
                href={item.href}
                key={item.href}
                label={item.label}
                tone="landing"
              />
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Button
              className={navButtonClass}
              href={siteConfig.bookingWhatsappHref}
              rel="noreferrer"
              target="_blank"
              variant="secondary"
            >
              {siteConfig.bookingWhatsappLabel}
            </Button>
          </div>

          <button
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            className={cn(
              "inline-flex min-h-11 items-center justify-center rounded-full border px-4 text-sm font-medium text-brand-ink shadow-[0_8px_18px_rgba(87,59,55,0.04)] md:hidden",
              "border-brand-stone/68 bg-[linear-gradient(180deg,rgba(248,239,241,0.9),rgba(241,226,230,0.72))] backdrop-blur-md"
            )}
            onClick={() => setIsMenuOpen((open) => !open)}
            type="button"
          >
            {isMenuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </Container>

      <div
        className={cn(
          "border-t backdrop-blur-md md:hidden",
          "border-brand-stone/55 bg-[linear-gradient(180deg,rgba(248,239,241,0.96),rgba(242,229,233,0.94))]",
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
                tone="landing"
              />
            ))}
            <div className="mt-4 flex flex-col gap-3">
              <Button
                className={navButtonClass}
                href={siteConfig.bookingWhatsappHref}
                rel="noreferrer"
                target="_blank"
                variant="secondary"
              >
                {siteConfig.bookingWhatsappLabel}
              </Button>
            </div>
          </nav>
        </Container>
      </div>
    </header>
  );
}
