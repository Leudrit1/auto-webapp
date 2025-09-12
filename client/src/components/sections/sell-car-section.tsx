import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Clock, Shield, FileText } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { InsertSellCarRequest } from "@shared/schema";

export default function SellCarSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<InsertSellCarRequest>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    mileage: 0,
    desiredPrice: undefined,
    description: "",
  });

  const sellCarMutation = useMutation({
    mutationFn: async (data: InsertSellCarRequest) => {
      const res = await apiRequest("POST", "/api/sell-car", data);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Erfolg!",
        description: "Ihre Bewertungsanfrage wurde erfolgreich gesendet. Wir melden uns bald bei Ihnen.",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        brand: "",
        model: "",
        year: new Date().getFullYear(),
        mileage: 0,
        desiredPrice: undefined,
        description: "",
      });
    },
    onError: () => {
      toast({
        title: "Fehler",
        description: "Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sellCarMutation.mutate(formData);
  };

  const features = [
    {
      icon: CheckCircle,
      title: "Faire Bewertung",
      description: "Professionelle Fahrzeugbewertung zum aktuellen Marktpreis",
    },
    {
      icon: Clock,
      title: "Schnelle Abwicklung",
      description: "Von der Bewertung bis zur Bezahlung in wenigen Tagen",
    },
    {
      icon: Shield,
      title: "Sicher & Seriös",
      description: "Zuverlässige Abwicklung mit langjähriger Erfahrung",
    },
    {
      icon: FileText,
      title: "Komplette Abmeldung",
      description: "Wir übernehmen alle Formalitäten für Sie",
    },
  ];

  return (
    <section id="sell" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Auto verkaufen</h2>
            <p className="text-xl text-muted-foreground">
              Verkaufen Sie Ihr Fahrzeug schnell und unkompliziert an uns
            </p>
          </div>

          <div className="text-center">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-accent/10 to-primary/10 p-12 rounded-2xl border border-accent/20">
                <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="text-accent" size={40} />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-6">
                  Ihr Auto verdient den besten Preis
                </h3>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Lassen Sie uns Ihr Fahrzeug professionell bewerten. Mit über 15 Jahren Erfahrung 
                  im Automobilhandel garantieren wir Ihnen eine faire, transparente Bewertung zu 
                  aktuellen Marktpreisen. Schnell, unkompliziert und völlig kostenfrei.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="text-center">
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <feature.icon className="text-accent" size={24} />
                      </div>
                      <h4 className="font-semibold text-foreground mb-2">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => window.location.href = '/sell-car'}
                  className="bg-accent text-accent-foreground px-12 py-4 text-lg hover:bg-accent/90 transition-all transform hover:scale-105"
                  data-testid="button-sell-car-page"
                >
                  Jetzt Fahrzeug bewerten lassen
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
