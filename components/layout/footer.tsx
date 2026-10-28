"use client";

import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { siteConfig, whatsappLink } from "@/content/site";
import { localePath } from "@/content/strings";
import { useLang } from "@/lib/i18n";

export function Footer() {
  const { lang, t } = useLang();
  return (
    <footer className="pink-wash--from-blush">
      <Container className="grid gap-8 pb-8 pt-12 text-[0.95rem] leading-relaxed text-plum sm:grid-cols-[1.1fr_1fr_1fr]">
        <div>
          <Logo className="w-[9rem]" />
          <p className="mt-4">
            {siteConfig.address.street}, {siteConfig.address.locality}
            <br />
            {siteConfig.address.country} {siteConfig.address.postalCode}
          </p>
        </div>

        <div>
          <p className="font-semibold text-ink">{t.footer.contact}</p>
          <p className="mt-2">
            WhatsApp{" "}
            <a className="text-ink underline-offset-4 hover:underline" href={whatsappLink(t.message.general)} rel="noreferrer" target="_blank">
              {siteConfig.bookingWhatsappDisplay}
            </a>
            <br />
            {t.footer.salon}{" "}
            <a className="text-ink underline-offset-4 hover:underline" href={siteConfig.fixedLineHref}>
              {siteConfig.fixedLineDisplay}
            </a>
          </p>
          <p className="mt-2">{t.hoursSummary}</p>
        </div>

        <div>
          <p className="font-semibold text-ink">{t.footer.more}</p>
          <ul className="mt-2 space-y-1">
            {siteConfig.socials.map((s) => (
              <li key={s.label}>
                <a className="text-ink underline-offset-4 hover:underline" href={s.href} rel="noreferrer" target="_blank">
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              <Link className="text-ink underline-offset-4 hover:underline" href={localePath(lang, "/services")}>
                {t.footer.fullList}
              </Link>
            </li>
          </ul>
        </div>
      </Container>
      <Container className="border-t border-[#e9b9c6] py-5 text-sm text-plum">
        © {new Date().getFullYear()} {siteConfig.name}
      </Container>
    </footer>
  );
}
