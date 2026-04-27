"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { navItems, siteConfig } from "@/content/site";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { navPillContainerClass } from "@/components/ui/control-styles";
import { LogoLockup } from "@/components/ui/logo-lockup";
import { NavLink } from "@/components/ui/nav-link";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const isLandingHome = pathname === "/";
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
          threshold: 0,
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

  const brandSlot = (
      <Link
        aria-label="Sim's Hair and Beauty home"
        className={cn(
          "logo-home-link transition-all duration-500 ease-out",
          isLandingHome
            ? showLandingBrand
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-[1px] opacity-0"
          : "translate-y-0 opacity-100"
      )}
      href="/"
    >
      <LogoLockup
        className={cn(
          "transition-all duration-500 ease-out",
          isLandingHome
            ? showLandingBrand
              ? "w-[10.5rem] sm:w-[12.5rem]"
              : "w-[8.9rem] sm:w-[12.5rem]"
            : "w-[10.5rem] sm:w-[12.5rem]"
        )}
        priority
        variant="navbar"
      />
    </Link>
  );

  return (
    <header
      className="landing-header-solid sticky top-0 z-[60] isolate border-b transition-all duration-300 ease-out"
    >
      <Container className="relative z-10">
        <div className="flex min-h-20 items-center justify-between gap-3 py-3">
          {brandSlot}

          <nav
            className={cn(
              "flex items-center",
              navPillContainerClass
            )}
          >
            {navItems.map((item) => (
              <NavLink
                active={pathname === item.href}
                className="min-w-[5.4rem] justify-center px-3 py-2 text-center text-[0.82rem] sm:min-w-[6.5rem] sm:px-4 sm:py-2.5 sm:text-sm"
                href={item.href}
                key={item.href}
                label={item.label}
                tone="landing"
              />
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
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
        </div>
      </Container>

      <div className="mobile-action-bar pointer-events-none fixed inset-x-0 bottom-0 z-[70] px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 sm:hidden">
        <div className="mx-auto flex max-w-xl items-center gap-2 rounded-[1.15rem] border border-brand-stone/78 bg-[linear-gradient(180deg,rgba(248,239,241,0.98),rgba(244,233,236,0.96))] p-2 shadow-[0_20px_36px_rgba(87,59,55,0.12)]">
          <Button
            className="pointer-events-auto w-full justify-center px-4"
            href={siteConfig.bookingWhatsappHref}
            rel="noreferrer"
            target="_blank"
            variant="primary"
          >
            WhatsApp
          </Button>
          <Button
            className="pointer-events-auto w-full justify-center px-4"
            href={siteConfig.fixedLineHref}
            variant="secondary"
          >
            Call
          </Button>
        </div>
      </div>
    </header>
  );
}
