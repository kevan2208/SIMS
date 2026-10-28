import Link from "next/link";

import { openingHours, siteConfig } from "@/content/site";
import { Container } from "@/components/ui/container";

export function Footer() {
  return (
    <footer className="border-t border-line bg-blush/50">
      <Container className="grid gap-8 py-10 text-[0.95rem] leading-relaxed text-muted sm:grid-cols-3">
        <div>
          <p className="font-display text-xl text-ink">{siteConfig.name}</p>
          <p className="mt-2">
            {siteConfig.address.street}, {siteConfig.address.locality}
            <br />
            {siteConfig.address.country} {siteConfig.address.postalCode}
          </p>
        </div>

        <div>
          <p className="font-semibold text-ink">Contact</p>
          <p className="mt-2">
            WhatsApp{" "}
            <a className="text-ink underline-offset-4 hover:underline" href={siteConfig.bookingWhatsappHref} rel="noreferrer" target="_blank">
              {siteConfig.bookingWhatsappDisplay}
            </a>
            <br />
            Salon{" "}
            <a className="text-ink underline-offset-4 hover:underline" href={siteConfig.fixedLineHref}>
              {siteConfig.fixedLineDisplay}
            </a>
          </p>
          <p className="mt-2">{openingHours.summary}</p>
        </div>

        <div>
          <p className="font-semibold text-ink">Follow</p>
          <ul className="mt-2 space-y-1">
            {siteConfig.socials.map((s) => (
              <li key={s.label}>
                <a className="text-ink underline-offset-4 hover:underline" href={s.href} rel="noreferrer" target="_blank">
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              <Link className="text-ink underline-offset-4 hover:underline" href="/services">
                Full price list
              </Link>
            </li>
          </ul>
        </div>
      </Container>
      <Container className="border-t border-line py-5 text-sm text-muted">
        © {new Date().getFullYear()} {siteConfig.name}
      </Container>
    </footer>
  );
}
