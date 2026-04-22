import { siteConfig } from "@/content/site";

import { ActionIcon } from "@/components/ui/action-icon";
import { Container } from "@/components/ui/container";
import { SocialLink } from "@/components/ui/social-link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-stone/80 pb-6 pt-5 sm:pb-7">
      <Container>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-[auto_auto] lg:items-start lg:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-red">Book</p>
            <div className="space-y-1.5 text-sm leading-6 text-brand-mist">
              <a
                className="group inline-flex items-center gap-2 rounded-full border border-brand-stone/85 bg-brand-shell/88 px-4 py-2 text-brand-ink shadow-[0_10px_22px_rgba(87,59,55,0.04)] ring-1 ring-white/45 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-brand-red/48 hover:bg-brand-rose hover:text-brand-noir hover:shadow-soft hover:ring-brand-red/12"
                href={siteConfig.bookingWhatsappHref}
                rel="noreferrer"
                target="_blank"
              >
                <span aria-hidden="true" className="inline-flex items-center justify-center text-brand-red">
                  <ActionIcon name="whatsapp" />
                </span>
                <span>WhatsApp salon: {siteConfig.bookingWhatsappDisplay}</span>
                <span
                  aria-hidden="true"
                  className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-brand-red/12 bg-brand-red/8 text-[0.78rem] transition-transform duration-300 ease-out group-hover:translate-x-0.5"
                >
                  ↗
                </span>
              </a>
              <a
                className="group inline-flex items-center gap-2 rounded-full border border-brand-stone/85 bg-brand-shell/88 px-4 py-2 text-brand-ink shadow-[0_10px_22px_rgba(87,59,55,0.04)] ring-1 ring-white/45 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-brand-red/48 hover:bg-brand-rose hover:text-brand-noir hover:shadow-soft hover:ring-brand-red/12"
                href={siteConfig.directionsHref}
                rel="noreferrer"
                target="_blank"
              >
                <span aria-hidden="true" className="inline-flex items-center justify-center text-brand-red">
                  <ActionIcon name="map" />
                </span>
                <span>Open directions</span>
                <span
                  aria-hidden="true"
                  className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-brand-red/12 bg-brand-red/8 text-[0.78rem] transition-transform duration-300 ease-out group-hover:translate-x-0.5"
                >
                  ↗
                </span>
              </a>
            </div>
          </div>

          {siteConfig.socials.length > 0 ? (
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-red">Social</p>
              <div className="flex flex-col gap-1.5">
                {siteConfig.socials.map((social) => (
                  <SocialLink href={social.href} key={social.label} label={social.label} />
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="mt-5 flex flex-col gap-2 border-t border-brand-stone/80 pt-3 text-sm text-brand-mist sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {currentYear} {siteConfig.name}. All rights reserved.</p>
          <p>Flacq Retail Park, Mauritius</p>
        </div>
      </Container>
    </footer>
  );
}
