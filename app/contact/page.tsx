import { ContactSection } from "@/components/sections/contact-section";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import { pageIntros, siteConfig } from "@/content/site";

export default function ContactPage() {
  return (
    <main>
      <Container>
        <PageIntro
          action={
            <Button href={siteConfig.bookingWhatsappHref} rel="noreferrer" target="_blank">
              {siteConfig.bookingWhatsappLabel}
            </Button>
          }
          body={pageIntros.contact.body}
          eyebrow={pageIntros.contact.eyebrow}
          title={pageIntros.contact.title}
        />
      </Container>
      <ContactSection />
    </main>
  );
}
