import { Car } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-background border-t border-border py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Car className="text-primary-foreground text-xl" />
              </div>
              <span className="text-2xl font-bold text-foreground">RI automobile</span>
              <span className="text-sm text-muted-foreground">gmbh</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Ihr vertrauensvoller Partner für Premium-Fahrzeuge in der Schweiz.
              Qualität, Service und Kundenorientierung stehen bei uns im Mittelpunkt.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors"
                data-testid="link-facebook"
              >
                <i className="fab fa-facebook text-foreground hover:text-primary"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors"
                data-testid="link-instagram"
              >
                <i className="fab fa-instagram text-foreground hover:text-primary"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors"
                data-testid="link-linkedin"
              >
                <i className="fab fa-linkedin text-foreground hover:text-primary"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors"
                data-testid="link-twitter"
              >
                <i className="fab fa-twitter text-foreground hover:text-primary"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="footer-nav-home"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="footer-nav-services"
                >
                  Dienstleistungen
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("cars")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="footer-nav-cars"
                >
                  Unsere Autos
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="footer-nav-about"
                >
                  Über uns
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="footer-nav-contact"
                >
                  Kontakt
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("sell")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="footer-nav-sell"
                >
                  Auto verkaufen
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Kontakt</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Industrie Neuhof 17a</li>
              <li>3422 Kirchberg, Schweiz</li>
              <li className="pt-2">
                <a
                  href="tel:0762811068"
                  className="hover:text-primary transition-colors"
                  data-testid="link-phone"
                >
                  076 281 10 68
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@riautomobile.ch"
                  className="hover:text-primary transition-colors"
                  data-testid="link-email"
                >
                  info@riautomobile.ch
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2024 RI automobile gmbh. Alle Rechte vorbehalten.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Datenschutz
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Impressum
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              AGB
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
