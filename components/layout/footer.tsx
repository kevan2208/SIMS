import { siteConfig } from "@/content/site";

import { ActionIcon } from "@/components/ui/action-icon";
import { Container } from "@/components/ui/container";
import { controlPillClass } from "@/components/ui/control-styles";
import { SocialLink } from "@/components/ui/social-link";
import { cn } from "@/lib/utils";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-stone/80 pb-6 pt-5 sm:pb-7">
      <Container>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-[auto_auto] lg:items-start lg:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-red">Book</p>
            <div className="space-y-2 text-sm leading-6 text-brand-mist">
              <a
                className={cn("group inline-flex items-center gap-2 px-4 py-2 text-brand-ink", controlPillClass)}
                href={siteConfig.bookingWhatsappHref}
                rel="noreferrer"
                target="_blank"
              >
                <span aria-hidden="true" className="inline-flex items-center justify-center text-brand-red">
                  <ActionIcon name="whatsapp" />
                </span>
                <span>WhatsApp salon: {siteConfig.bookingWhatsappDisplay}</span>
              </a>
              <a
                className="inline-flex w-fit items-center gap-2 text-brand-ink transition-colors duration-300 hover:text-brand-red"
                href={siteConfig.fixedLineHref}
              >
                <span aria-hidden="true" className="inline-flex items-center justify-center text-brand-red">
                  <ActionIcon name="phone" />
                </span>
                <span>Call fixed line: {siteConfig.fixedLineDisplay}</span>
              </a>
              <p>Flacq Retail Park, Mauritius</p>
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
