"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { navItems, siteConfig } from "@/content/site";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { controlPillClass, navPillContainerClass } from "@/components/ui/control-styles";
import { LogoLockup } from "@/components/ui/logo-lockup";
import { NavLink } from "@/components/ui/nav-link";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const isLandingHome = pathname === "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLandingBrand, setShowLandingBrand] = useState(() => !isLandingHome);

  useEffect(() => {
    if (!isLandingHome) {
      setShowLandingBrand(true);
      return;
    }

    let observer: IntersectionObserver | null = null;
    let retryId: number | null = null;
    let detachFallback: (() => void) | null = null;

    const setFromFallback = () => {
      setShowLandingBrand(window.scrollY > Math.max(window.innerHeight * 0.6, 520));
    };

    const bindObserver = () => {
      const heroLogoAnchor = document.querySelector<HTMLElement>("[data-hero-logo-anchor]");

      if (!heroLogoAnchor) {
        retryId = window.setTimeout(bindObserver, 120);
        return;
      }

      if (typeof window.IntersectionObserver === "undefined") {
        setFromFallback();
        window.addEventListener("scroll", setFromFallback, { passive: true });
        detachFallback = () => window.removeEventListener("scroll", setFromFallback);
        return;
      }

      observer = new window.IntersectionObserver(
        ([entry]) => {
          setShowLandingBrand(!entry.isIntersecting);
        },
        {
          root: null,
          threshold: 0.18,
          rootMargin: "-78px 0px 0px 0px"
        }
      );
      observer.observe(heroLogoAnchor);
    };

    setShowLandingBrand(false);
    bindObserver();

    return () => {
      if (retryId !== null) {
        window.clearTimeout(retryId);
      }
      if (observer) {
        observer.disconnect();
      }
      if (detachFallback) {
        detachFallback();
      }
    };
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
      className="landing-header-solid sticky top-0 z-[60] isolate border-b transition-all duration-300 ease-out"
    >
      <Container className="relative z-10">
        <div className="flex min-h-20 items-center justify-between gap-4 py-3">
          {brandSlot}

          <nav
            className={cn(
              "hidden items-center md:flex",
              navPillContainerClass
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
              className="px-6"
              href={siteConfig.bookingWhatsappHref}
              rel="noreferrer"
              target="_blank"
              variant="primary"
            >
              {siteConfig.bookingWhatsappLabel}
            </Button>
          </div>

          <button
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            className={cn(
              "inline-flex min-h-11 items-center justify-center px-4 text-sm font-medium text-brand-ink md:hidden",
              controlPillClass
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
          "relative z-10 border-t md:hidden",
          "border-brand-stone/70 bg-[linear-gradient(180deg,rgba(248,239,241,0.98),rgba(244,233,236,0.96))]",
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
                className="px-6"
                href={siteConfig.bookingWhatsappHref}
                rel="noreferrer"
                target="_blank"
                variant="primary"
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
