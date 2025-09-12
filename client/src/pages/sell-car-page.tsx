
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

        {/* Sell Car Form Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">Fahrzeug-Details</h2>
                <p className="text-lg text-muted-foreground">
                  Je mehr Details Sie angeben, desto präziser können wir Ihr Fahrzeug bewerten
                </p>
              </div>
              <div className="bg-card p-8 rounded-xl border">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Vorname *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-background"
                        placeholder="Ihr Vorname"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Nachname *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-background"
                        placeholder="Ihr Nachname"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        E-Mail *
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-background"
                        placeholder="ihre.email@beispiel.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Telefon *
                      </label>
                      <input
                        type="tel"
                        required
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-background"
                        placeholder="+41 XX XXX XX XX"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Marke *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-background"
                        placeholder="BMW, Mercedes, etc."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Modell *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-background"
                        placeholder="A4, C-Klasse, etc."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Baujahr *
                      </label>
                      <input
                        type="number"
                        required
                        min="1990"
                        max={new Date().getFullYear()}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-background"
                        placeholder="2020"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Kilometerstand *
                      </label>
                      <input
                        type="number"
                        required
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-background"
                        placeholder="50000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Kraftstoff *
                      </label>
                      <select
                        required
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-background"
                      >
                        <option value="">Bitte wählen</option>
                        <option value="Benzin">Benzin</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Elektro">Elektro</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Getriebe *
                      </label>
                      <select
                        required
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-background"
                      >
                        <option value="">Bitte wählen</option>
                        <option value="Automatik">Automatik</option>
                        <option value="Manuell">Manuell</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Preisvorstellung (CHF)
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-background"
                      placeholder="25000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Zusätzliche Informationen
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-background resize-none"
                      placeholder="Besonderheiten, Schäden, Zusatzausstattung, etc."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-accent text-accent-foreground py-3 rounded-lg hover:bg-accent/90 transition-colors font-semibold"
                  >
                    Kostenlose Bewertung anfordern
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
