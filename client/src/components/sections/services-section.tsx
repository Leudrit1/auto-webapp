import { Car, Handshake, FileText, Shield, RefreshCw, Wrench } from "lucide-react";

const services = [
  {
    icon: Car,
    title: "Fahrzeugverkauf",
    description: "Hochwertige Gebrauchtwagen und Neuwagen von vertrauenswürdigen Herstellern.",
  },
  {
    icon: Handshake,
    title: "Fahrzeugankauf",
    description: "Faire Bewertung und schnelle Abwicklung beim Verkauf Ihres Fahrzeugs.",
  },
  {
    icon: FileText,
    title: "Finanzierung",
    description: "Individuelle Finanzierungslösungen für Ihr Wunschfahrzeug.",
  },
  {
    icon: Shield,
    title: "Garantie & Service",
    description: "Umfassende Garantieleistungen und professioneller After-Sales-Service.",
  },
  {
    icon: RefreshCw,
    title: "Inzahlungnahme",
    description: "Optimaler Wert für Ihr altes Fahrzeug bei der Inzahlungnahme.",
  },
  {
    icon: Wrench,
    title: "Wartung & Reparatur",
    description: "Professionelle Wartung und Reparaturen in unserer modernen Werkstatt.",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-muted">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Unsere Dienstleistungen</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Wir bieten Ihnen umfassende Services rund um Ihr Traumfahrzeug
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-xl border border-border hover:border-primary/50 transition-all group cursor-pointer"
              data-testid={`service-card-${index}`}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon className="text-2xl text-primary" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
