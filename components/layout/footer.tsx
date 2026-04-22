import { navItems, siteConfig } from "@/content/site";

import { ActionIcon } from "@/components/ui/action-icon";
import { Container } from "@/components/ui/container";
import { LogoLockup } from "@/components/ui/logo-lockup";
import { NavLink } from "@/components/ui/nav-link";
import { SocialLink } from "@/components/ui/social-link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-stone/80 pb-10 pt-8">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-5">
            <LogoLockup variant="footer" />
            <div className="max-w-md space-y-2 text-sm leading-7 text-brand-mist">
              <p>{siteConfig.description}</p>
              <p>{siteConfig.location}</p>
              <p>Bookings and service questions are handled on the salon WhatsApp line.</p>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[auto_auto_auto] lg:items-start">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-red">Navigate</p>
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <NavLink href={item.href} key={item.href} label={item.label} />
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-red">Contact</p>
              <div className="space-y-2 text-sm leading-7 text-brand-mist">
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
                <p>{siteConfig.addressLines[0]}</p>
                <p>Appointments are usually best arranged a few days ahead.</p>
              </div>
            </div>

            {siteConfig.socials.length > 0 ? (
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-red">Social</p>
                <div className="flex flex-col gap-2">
                  {siteConfig.socials.map((social) => (
                    <SocialLink href={social.href} key={social.label} label={social.label} />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-brand-stone/80 pt-5 text-sm text-brand-mist sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {currentYear} {siteConfig.name}. All rights reserved.</p>
          <p>Book on WhatsApp: {siteConfig.bookingWhatsappDisplay}</p>
        </div>
      </Container>
    </footer>
  );
}
