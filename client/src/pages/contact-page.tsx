
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ContactSection from "@/components/sections/contact-section";
import { MapPin, Phone, Mail, Clock, Car } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 py-16">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Car className="text-primary" size={40} />
              </div>
              <h1 className="text-5xl font-bold text-foreground mb-4">Kontakt</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Haben Sie Fragen zu unseren Fahrzeugen oder Services? 
                Wir sind gerne für Sie da und freuen uns auf Ihre Nachricht.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Contact Info */}
        <section className="py-12 border-b">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <MapPin className="text-primary mx-auto mb-3" size={32} />
                <h3 className="font-semibold text-foreground mb-2">Adresse</h3>
                <p className="text-muted-foreground text-sm">
                  Industrie Neuhof 17a<br />
                  3422 Kirchberg
                </p>
              </div>
              <div>
                <Phone className="text-primary mx-auto mb-3" size={32} />
                <h3 className="font-semibold text-foreground mb-2">Telefon</h3>
                <p className="text-muted-foreground text-sm">076 281 10 68</p>
              </div>
              <div>
                <Mail className="text-primary mx-auto mb-3" size={32} />
                <h3 className="font-semibold text-foreground mb-2">E-Mail</h3>
                <p className="text-muted-foreground text-sm">info@riautomobile.ch</p>
              </div>
              <div>
                <Clock className="text-primary mx-auto mb-3" size={32} />
                <h3 className="font-semibold text-foreground mb-2">Öffnungszeiten</h3>
                <p className="text-muted-foreground text-sm">
                  Mo-Fr: 9:00-12:00<br />
                  13:00-18:00<br />
                  Sa: 9:00-12:00
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">Senden Sie uns eine Nachricht</h2>
                <p className="text-lg text-muted-foreground">
                  Füllen Sie das Formular aus und wir melden uns schnellstmöglich bei Ihnen
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
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
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
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                        placeholder="Ihr Nachname"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      E-Mail *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                      placeholder="ihre.email@beispiel.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                      placeholder="+41 XX XXX XX XX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Betreff *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                      placeholder="Worum geht es?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Nachricht *
                    </label>
                    <textarea
                      rows={6}
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background resize-none"
                      placeholder="Ihre Nachricht..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold"
                  >
                    Nachricht senden
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Besuchen Sie uns</h2>
              <p className="text-lg text-muted-foreground">
                Schauen Sie gerne bei uns vorbei und lassen Sie sich von unseren Fahrzeugen begeistern
              </p>
            </div>
            <div className="bg-card p-8 rounded-xl">
              <div className="aspect-video bg-muted-foreground/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="text-primary mx-auto mb-4" size={48} />
                  <p className="text-muted-foreground">
                    Industrie Neuhof 17a, 3422 Kirchberg
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
