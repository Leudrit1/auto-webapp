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

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">Warum bei uns verkaufen?</h3>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4" data-testid={`feature-${index}`}>
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <feature.icon className="text-primary" size={16} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card p-8 rounded-xl border border-border">
              <h3 className="text-xl font-semibold text-foreground mb-6">Fahrzeug bewerten lassen</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Vorname</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                      data-testid="input-first-name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Nachname</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                      data-testid="input-last-name"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">E-Mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    data-testid="input-email"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone || ""}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    data-testid="input-phone"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="brand">Marke</Label>
                    <Input
                      id="brand"
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      required
                      data-testid="input-brand"
                    />
                  </div>
                  <div>
                    <Label htmlFor="model">Modell</Label>
                    <Input
                      id="model"
                      value={formData.model}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                      required
                      data-testid="input-model"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="year">Baujahr</Label>
                    <Input
                      id="year"
                      type="number"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                      required
                      data-testid="input-year"
                    />
                  </div>
                  <div>
                    <Label htmlFor="mileage">Kilometerstand</Label>
                    <Input
                      id="mileage"
                      type="number"
                      value={formData.mileage}
                      onChange={(e) => setFormData({ ...formData, mileage: parseInt(e.target.value) })}
                      required
                      data-testid="input-mileage"
                    />
                  </div>
                  <div>
                    <Label htmlFor="desiredPrice">Gewünschter Preis</Label>
                    <Input
                      id="desiredPrice"
                      type="number"
                      value={formData.desiredPrice || ""}
                      onChange={(e) => setFormData({ ...formData, desiredPrice: e.target.value ? parseInt(e.target.value) : undefined })}
                      data-testid="input-desired-price"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Zusätzliche Informationen</Label>
                  <Textarea
                    id="description"
                    rows={4}
                    value={formData.description || ""}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Beschreiben Sie den Zustand Ihres Fahrzeugs..."
                    data-testid="textarea-description"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={sellCarMutation.isPending}
                  data-testid="button-submit-sell-car"
                >
                  {sellCarMutation.isPending ? "Wird gesendet..." : "Bewertung anfragen"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
