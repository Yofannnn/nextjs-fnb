import { AboutSection } from "@/features/home-page/components/AboutSection";
import { CTASection } from "@/features/home-page/components/CTASection";
import { DiscoverySection } from "@/features/home-page/components/DiscoverySection";
import { FooterSection } from "@/features/home-page/components/FooterSection";
import { HeroSection } from "@/features/home-page/components/HeroSection";
import { ServicesSection } from "@/features/home-page/components/ServicesSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <DiscoverySection />
      <CTASection />
      <FooterSection />
    </>
  );
}
