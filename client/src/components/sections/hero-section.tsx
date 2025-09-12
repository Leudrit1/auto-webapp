import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const heroSlides = [
  "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&h=1380&q=80",
  "https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&h=1381&q=80",
  "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&h=1376&q=80",
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      <div
        className="hero-slider absolute inset-0 transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url('${heroSlides[currentSlide]}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
        <div className="max-w-2xl animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Premium
            <span className="text-primary"> Fahrzeuge</span>
            <br />
            in der Schweiz
          </h1>
          <p className="text-xl text-white mb-8 leading-relaxed">
            Entdecken Sie unsere exklusive Auswahl an hochwertigen Automobilen.
            Qualität, Vertrauen und Service seit über 15 Jahren.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => scrollToSection("cars")}
              className="bg-primary text-primary-foreground px-8 py-4 rounded-lg hover:bg-primary/90 transition-all transform hover:scale-105 font-semibold"
              data-testid="button-discover-cars"
            >
              Unsere Fahrzeuge entdecken
            </Button>
            <Button
              variant="outline"
              onClick={() => scrollToSection("services")}
              className="border border-border text-foreground px-8 py-4 rounded-lg hover:bg-card transition-all font-semibold"
              data-testid="button-learn-more"
            >
              Mehr erfahren
            </Button>
          </div>
        </div>
      </div>

      {/* Slider controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-primary" : "bg-border hover:bg-primary/50"
            }`}
            data-testid={`slider-dot-${index}`}
          />
        ))}
      </div>
    </section>
  );
}
