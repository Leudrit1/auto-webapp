
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
            <div className="bg-card p-8 rounded-xl shadow-lg">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Unser Standort</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <MapPin className="text-primary" size={20} />
                      <div>
                        <p className="font-medium text-foreground">Industrie Neuhof 17a</p>
                        <p className="text-muted-foreground">3422 Kirchberg, Schweiz</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="text-primary" size={20} />
                      <p className="text-muted-foreground">076 281 10 68</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="text-primary" size={20} />
                      <div>
                        <p className="text-muted-foreground">Mo-Fr: 9:00-12:00, 13:00-18:00</p>
                        <p className="text-muted-foreground">Sa: 9:00-12:00</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <p className="text-sm text-muted-foreground mb-4">
                      Wir befinden uns im Industriegebiet Neuhof in Kirchberg. 
                      Kostenlose Parkplätze sind direkt vor unserem Geschäft verfügbar.
                    </p>
                    <a
                      href="https://www.google.com/maps/dir//Industrie+Neuhof+17a,+3422+Kirchberg,+Switzerland"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 font-medium"
                    >
                      <span>Route planen</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="aspect-video rounded-lg overflow-hidden shadow-md">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2693.8756439284434!2d7.535833276923734!3d47.49667337117685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478e1a8f4c8b9b9b%3A0x4c8b9b9b4c8b9b9b!2sIndustrie%20Neuhof%2017a%2C%203422%20Kirchberg%2C%20Switzerland!5e0!3m2!1sen!2sch!4v1699999999999!5m2!1sen!2sch"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="RI Automobile Standort"
                  />
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
