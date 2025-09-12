import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/sections/hero-section";
import ServicesSection from "@/components/sections/services-section";
import CarsSection from "@/components/sections/cars-section";
import AboutSection from "@/components/sections/about-section";
import SellCarSection from "@/components/sections/sell-car-section";
import ContactSection from "@/components/sections/contact-section";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <CarsSection />
        <AboutSection />
        <SellCarSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
