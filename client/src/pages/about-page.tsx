
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Award, Users, Shield, Heart, Star, CheckCircle } from "lucide-react";

export default function AboutPage() {
  const scrollToContact = () => {
    window.location.href = '/contact';
  };

  const values = [
    {
      icon: Shield,
      title: "Vertrauen",
      description: "Transparente Geschäfte und ehrliche Beratung seit über 15 Jahren"
    },
    {
      icon: Star,
      title: "Qualität",
      description: "Nur die besten Fahrzeuge schaffen es in unser Sortiment"
    },
    {
      icon: Heart,
      title: "Leidenschaft",
      description: "Automobile sind unsere Leidenschaft - das spüren Sie in jedem Detail"
    },
    {
      icon: Users,
      title: "Service",
      description: "Persönliche Betreuung vor, während und nach dem Kauf"
    }
  ];

  const milestones = [
    { year: "2008", event: "Gründung von RI automobile gmbh" },
    { year: "2012", event: "Umzug in moderne Geschäftsräume" },
    { year: "2018", event: "500+ zufriedene Kunden erreicht" },
    { year: "2023", event: "Expansion des Serviceangebots" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold text-foreground mb-6">Über RI automobile gmbh</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Seit über 15 Jahren Ihr vertrauensvoller Partner für Premium-Automobile in der Schweiz
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Unsere Geschichte</h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Was als kleines Familienunternehmen begann, ist heute zu einem der vertrauenswürdigsten 
                  Namen im Schweizer Automobilhandel geworden. Seit 2008 stehen wir für Qualität, 
                  Transparenz und außergewöhnlichen Kundenservice.
                </p>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Unser Erfolgsgeheimnis ist einfach: Wir behandeln jeden Kunden so, wie wir selbst 
                  behandelt werden möchten. Mit Respekt, Ehrlichkeit und der Leidenschaft für 
                  außergewöhnliche Automobile.
                </p>
                <Button
                  onClick={scrollToContact}
                  className="bg-primary text-primary-foreground px-8 py-3"
                >
                  Kontakt aufnehmen
                </Button>
              </div>
              <div className="bg-muted p-8 rounded-xl">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">500+</div>
                    <div className="text-sm text-muted-foreground">Verkaufte Fahrzeuge</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">15+</div>
                    <div className="text-sm text-muted-foreground">Jahre Erfahrung</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">98%</div>
                    <div className="text-sm text-muted-foreground">Kundenzufriedenheit</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                    <div className="text-sm text-muted-foreground">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">Unsere Werte</h2>
              <p className="text-xl text-muted-foreground">
                Diese Prinzipien leiten uns jeden Tag
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-card p-6 rounded-xl text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="text-primary" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">Unser Weg</h2>
              <p className="text-xl text-muted-foreground">
                Wichtige Meilensteine unserer Firmengeschichte
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start mb-8 last:mb-0">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-6 flex-shrink-0">
                    {milestone.year.slice(-2)}
                  </div>
                  <div className="pt-3">
                    <div className="text-lg font-semibold text-foreground mb-1">{milestone.year}</div>
                    <div className="text-muted-foreground">{milestone.event}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">Warum RI automobile?</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <CheckCircle className="text-primary mx-auto mb-4" size={48} />
                <h3 className="text-xl font-semibold text-foreground mb-3">Geprüfte Qualität</h3>
                <p className="text-muted-foreground">
                  Jedes Fahrzeug durchläuft unsere strenge Qualitätskontrolle
                </p>
              </div>
              <div className="text-center">
                <Award className="text-primary mx-auto mb-4" size={48} />
                <h3 className="text-xl font-semibold text-foreground mb-3">Ausgezeichneter Service</h3>
                <p className="text-muted-foreground">
                  Mehrfach ausgezeichnet für unseren Kundenservice
                </p>
              </div>
              <div className="text-center">
                <Shield className="text-primary mx-auto mb-4" size={48} />
                <h3 className="text-xl font-semibold text-foreground mb-3">Faire Preise</h3>
                <p className="text-muted-foreground">
                  Transparente Preisgestaltung ohne versteckte Kosten
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
