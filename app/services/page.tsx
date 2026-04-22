import { PriceListSection } from "@/components/sections/price-list-section";
import { ServicesSection } from "@/components/sections/services-section";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { CTASection } from "@/components/ui/cta-section";
import { PageIntro } from "@/components/ui/page-intro";
import { pageIntros, siteConfig } from "@/content/site";

export default function ServicesPage() {
  return (
    <main>
      <Container>
        <PageIntro
          action={
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href={siteConfig.bookingWhatsappHref} rel="noreferrer" target="_blank">
                {siteConfig.bookingWhatsappLabel}
              </Button>
              <Button href={siteConfig.priceListPdfHref} rel="noreferrer" target="_blank" variant="secondary">
                Open PDF
              </Button>
            </div>
          }
          body={pageIntros.services.body}
          eyebrow={pageIntros.services.eyebrow}
          title={pageIntros.services.title}
        />
      </Container>
      <ServicesSection mode="page" />
      <PriceListSection />
      <CTASection />
    </main>
  );
}
