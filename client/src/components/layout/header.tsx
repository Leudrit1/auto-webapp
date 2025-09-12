import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Car, Menu, X } from "lucide-react";

export default function Header() {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Car className="text-primary-foreground text-xl" />
            </div>
            <span className="text-2xl font-bold text-foreground">RI automobile</span>
            <span className="text-sm text-muted-foreground">gmbh</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/"
              className="nav-link text-white hover:text-primary transition-colors"
              data-testid="nav-home"
            >
              Home
            </a>
            <a
              href="/cars"
              className="nav-link text-white hover:text-primary transition-colors"
              data-testid="nav-cars"
            >
              Unsere Autos
            </a>
            <a
              href="/about"
              className="nav-link text-white hover:text-primary transition-colors"
              data-testid="nav-about"
            >
              Über uns
            </a>
            <a
              href="/contact"
              className="nav-link text-white hover:text-primary transition-colors"
              data-testid="nav-contact"
            >
              Kontakt
            </a>
            <a
              href="/sell-car"
              className="nav-link text-accent hover:text-accent/80 transition-colors"
              data-testid="nav-sell"
            >
              Auto verkaufen
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <Button asChild data-testid="button-admin-logged-in">
                <a href="/admin">Admin Panel</a>
              </Button>
            ) : (
              <Button asChild data-testid="button-admin">
                <a href="/auth">Admin</a>
              </Button>
            )}
          </div>

          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X className="text-xl" /> : <Menu className="text-xl" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-4 border-t border-border pt-4">
            <a
              href="/"
              className="block w-full text-left text-white hover:text-primary transition-colors"
              data-testid="nav-mobile-home"
            >
              Home
            </a>
            <a
              href="/cars"
              className="block w-full text-left text-white hover:text-primary transition-colors"
              data-testid="nav-mobile-cars"
            >
              Unsere Autos
            </a>
            <a
              href="/about"
              className="block w-full text-left text-white hover:text-primary transition-colors"
              data-testid="nav-mobile-about"
            >
              Über uns
            </a>
            <a
              href="/contact"
              className="block w-full text-left text-white hover:text-primary transition-colors"
              data-testid="nav-mobile-contact"
            >
              Kontakt
            </a>
            <a
              href="/sell-car"
              className="block w-full text-left text-accent hover:text-accent/80 transition-colors"
              data-testid="nav-mobile-sell"
            >
              Auto verkaufen
            </a>
            {user ? (
              <Button asChild className="w-full" data-testid="button-mobile-admin-logged-in">
                <a href="/admin">Admin Panel</a>
              </Button>
            ) : (
              <Button asChild className="w-full" data-testid="button-mobile-admin">
                <a href="/auth">Admin</a>
              </Button>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}