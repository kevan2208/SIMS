"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

import { Frangipani, Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { TrackedLink } from "@/components/ui/tracked-link";
import { siteConfig, whatsappLink } from "@/content/site";
import { localePath, switchLangPath } from "@/content/strings";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * Homepage, at the top: a centred row of links above the big logo, like a menu header.
 * Once you scroll (and on every other page): a white bar with the small logo, links, and Book.
 */
export function Navbar() {
  const { lang, t } = useLang();
  const pathname = usePathname() || "/";
  const isHome = pathname === localePath(lang, "/");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 260);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const bar = !isHome || scrolled;
  const otherLang = lang === "en" ? "fr" : "en";
  const links = [
    { href: localePath(lang, "/services"), label: t.nav.prices },
    { href: `${localePath(lang, "/")}#visit`, label: t.nav.visit }
  ];
  const langLink = (
    <Link
      aria-label={t.otherLangName}
      className="px-2.5 py-2 font-semibold text-ink hover:text-sims-red"
      href={switchLangPath(pathname, otherLang)}
      hrefLang={otherLang}
      lang={otherLang}
    >
      {t.otherLangLabel}
    </Link>
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-colors duration-300",
        bar ? "border-b border-seam bg-white/90 backdrop-blur" : "border-b border-transparent bg-transparent"
      )}
    >
      <Container className="relative flex h-16 items-center">
        {/* Centred row over the homepage hero */}
        <nav
          aria-hidden={bar}
          aria-label={t.nav.main}
          className={cn(
            "absolute inset-x-0 flex items-center justify-center gap-1 text-[0.98rem] font-medium transition-opacity duration-300",
            bar ? "pointer-events-none opacity-0" : "opacity-100"
          )}
        >
          {links.map((l) => (
            <Fragment key={l.href}>
              <Link className="px-2.5 py-2 text-ink hover:text-sims-red" href={l.href} tabIndex={bar ? -1 : 0}>
                {l.label}
              </Link>
              <Frangipani className="text-sims-red/70" size={14} />
            </Fragment>
          ))}
          <span className={bar ? "pointer-events-none" : ""}>{langLink}</span>
        </nav>

        {/* White bar: logo left, links and Book right */}
        <div
          aria-hidden={!bar}
          className={cn(
            "flex w-full items-center justify-between gap-3 transition-opacity duration-300",
            bar ? "opacity-100" : "pointer-events-none opacity-0"
          )}
        >
          <Link aria-label={`${siteConfig.name}, ${t.nav.home}`} href={localePath(lang, "/")} tabIndex={bar ? 0 : -1}>
            <Logo className="w-[4.5rem]" compact />
          </Link>
          <nav aria-label={t.nav.main} className="flex items-center text-[0.95rem] font-medium">
            {links.map((l) => (
              <Link className="px-2 py-2 text-ink hover:text-sims-red sm:px-2.5" href={l.href} key={l.href} tabIndex={bar ? 0 : -1}>
                {l.label}
              </Link>
            ))}
            {bar ? langLink : null}
            <TrackedLink
              className="ml-1 rounded-md bg-ink px-3.5 py-2 font-semibold text-white hover:bg-[#3a2c30]"
              event="whatsapp"
              href={whatsappLink(t.message.general)}
              label="navbar"
              rel="noreferrer"
              tabIndex={bar ? 0 : -1}
              target="_blank"
            >
              {t.nav.book}
            </TrackedLink>
          </nav>
        </div>
      </Container>
    </header>
  );
}
