
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import SellCarSection from "@/components/sections/sell-car-section";
import { Car, TrendingUp, Award, Zap } from "lucide-react";

export default function SellCarPage() {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Beste Marktpreise",
      description: "Wir zahlen faire Preise basierend auf aktuellen Marktwerten"
    },
    {
      icon: Zap,
      title: "Schnelle Abwicklung",
      description: "Von der Bewertung bis zur Auszahlung in nur wenigen Tagen"
    },
    {
      icon: Award,
      title: "Kostenlose Bewertung",
      description: "Professionelle Fahrzeugbewertung völlig kostenfrei"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="bg-gradient-to-r from-accent/10 to-primary/10 py-16">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Car className="text-accent" size={40} />
              </div>
              <h1 className="text-5xl font-bold text-foreground mb-4">Auto verkaufen</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Verkaufen Sie Ihr Fahrzeug schnell, sicher und zum besten Preis. 
                Wir machen Ihnen den Verkauf so einfach wie möglich.
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Warum bei uns verkaufen?</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center p-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="text-accent" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">So einfach geht's</h2>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Formular ausfüllen", desc: "Geben Sie die wichtigsten Daten zu Ihrem Fahrzeug an" },
                { step: "2", title: "Bewertung erhalten", desc: "Wir melden uns binnen 24h mit einem Angebot" },
                { step: "3", title: "Termin vereinbaren", desc: "Wir schauen uns Ihr Auto persönlich an" },
                { step: "4", title: "Geld erhalten", desc: "Bei Einigung sofortige Bezahlung und Abmeldung" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <SellCarSection />
      </main>
      <Footer />
    </div>
  );
}
