import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const heroSlides = [
  "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080",
  "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080",
  "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080",
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
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
        <div className="max-w-2xl animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Premium
            <span className="text-primary"> Fahrzeuge</span>
            <br />
            in der Schweiz
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
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
