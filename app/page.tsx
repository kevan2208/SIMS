import { LandingPageTrialSection } from "@/components/sections/landing-page-trial-section";
import { PromoSection } from "@/components/sections/promo-section";
import { ServicesSection } from "@/components/sections/services-section";
import { CTASection } from "@/components/ui/cta-section";
import { finalCtas } from "@/content/site";

export default function Home() {
  return (
    <main>
      <LandingPageTrialSection />
      <ServicesSection mode="home" />
      <PromoSection />
      <CTASection content={finalCtas.landing} variant="compact" />
    </main>
  );
}
