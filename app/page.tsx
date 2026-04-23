import { LandingPageTrialSection } from "@/components/sections/landing-page-trial-section";
import { ServicesSection } from "@/components/sections/services-section";
import { CTASection } from "@/components/ui/cta-section";
import { finalCtas } from "@/content/site";

export default function Home() {
  return (
    <main>
      <LandingPageTrialSection />
      <ServicesSection mode="home" />
      <CTASection content={finalCtas.landing} variant="compact" />
    </main>
  );
}
