import type { Metadata } from "next";
import { PriceListSection } from "@/components/sections/price-list-section";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { CTASection } from "@/components/ui/cta-section";
import { PageIntro } from "@/components/ui/page-intro";
import { finalCtas, pageIntros, siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: `Services & Pricing | ${siteConfig.name}`,
  description:
    "Browse our complete service menu and pricing for hair treatments, facials, and gel nails in Mauritius. Professional salon services with clear pricing.",
  keywords: [
    "salon services",
    "hair treatment",
    "facial treatment",
    "nail services",
    "salon pricing",
    "hair care",
    "beauty services"
  ].join(", "),
  openGraph: {
    title: `Services & Pricing | ${siteConfig.name}`,
    description: "Browse our complete service menu and pricing",
    url: "https://simshairandbeauty.com/services"
  }
};

export default function ServicesPage() {
  return (
    <main>
      <Container>
        <PageIntro
          action={
            <Button className="w-full justify-center sm:w-auto" href={siteConfig.priceListPdfHref} rel="noreferrer" target="_blank" variant="secondary">
              Open PDF
            </Button>
          }
          body={pageIntros.services.body}
          eyebrow={pageIntros.services.eyebrow}
          title={pageIntros.services.title}
        />
      </Container>
      <PriceListSection />
      <CTASection content={finalCtas.services} />
    </main>
  );
}
