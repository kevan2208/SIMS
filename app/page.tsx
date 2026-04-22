import { HeroSection } from "@/components/sections/hero-section";
import { HomePagesSection } from "@/components/sections/home-pages-section";
import { PromoSection } from "@/components/sections/promo-section";
import { ServicesSection } from "@/components/sections/services-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <PromoSection />
      <HomePagesSection />
    </main>
  );
}
