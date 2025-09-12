import { Button } from "@/components/ui/button";
import { Award } from "lucide-react";

export default function AboutSection() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="about" className="py-20 bg-muted">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-6">Über RI automobile gmbh</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Seit über 15 Jahren steht RI automobile gmbh für Qualität, Vertrauen und exzellenten Service
              im Automobilbereich. Als familiengeführtes Unternehmen in der Schweiz haben wir uns auf den
              Verkauf von Premium-Fahrzeugen spezialisiert.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Unser erfahrenes Team berät Sie kompetent und ehrlich bei der Auswahl Ihres neuen Fahrzeugs.
              Wir legen grossen Wert auf Transparenz und langfristige Kundenbeziehungen.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2" data-testid="stat-cars-sold">500+</div>
                <div className="text-sm text-muted-foreground">Verkaufte Fahrzeuge</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2" data-testid="stat-years-experience">15+</div>
                <div className="text-sm text-muted-foreground">Jahre Erfahrung</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2" data-testid="stat-satisfaction">98%</div>
                <div className="text-sm text-muted-foreground">Kundenzufriedenheit</div>
              </div>
            </div>

            <Button
              onClick={scrollToContact}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              data-testid="button-contact"
            >
              Kontakt aufnehmen
            </Button>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1562141961-d9b183cc4e85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="RI automobile Showroom"
              className="rounded-xl shadow-2xl w-full"
            />
            <div className="absolute -bottom-6 -right-6 bg-card p-6 rounded-xl border border-border shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <Award className="text-primary-foreground" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Zertifiziert</div>
                  <div className="text-sm text-muted-foreground">ISO 9001:2015</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
