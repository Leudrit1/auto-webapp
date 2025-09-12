import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { InsertContactMessage } from "@shared/schema";

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<InsertContactMessage>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      const res = await apiRequest("POST", "/api/contact", data);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Erfolg!",
        description: "Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns bald bei Ihnen.",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    },
    onError: () => {
      toast({
        title: "Fehler",
        description: "Ihre Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Adresse",
      content: ["Industrie Neuhof 17a", "3422 Kirchberg", "Schweiz"],
    },
    {
      icon: Phone,
      title: "Telefon",
      content: ["076 281 10 68"],
    },
    {
      icon: Mail,
      title: "E-Mail",
      content: ["info@riautomobile.ch"],
    },
    {
      icon: Clock,
      title: "Öffnungszeiten",
      content: ["Montag bis Freitag: 9:00 - 12:00", "13:00 - 18:00", "Samstag: 9:00 - 12:00"],
    },
  ];

  return (
    <section id="contact" className="py-20 bg-muted">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Kontakt</h2>
            <p className="text-xl text-muted-foreground">
              Nehmen Sie Kontakt mit uns auf - wir freuen uns auf Ihre Anfrage
            </p>
          </div>

          <div className="text-center">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-12 rounded-2xl border border-primary/20">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="text-primary" size={40} />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-6">
                  Wir sind für Sie da
                </h3>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Haben Sie Fragen zu unseren Fahrzeugen, benötigen Sie eine Beratung oder möchten 
                  Sie einen Besichtigungstermin vereinbaren? Unser erfahrenes Team steht Ihnen 
                  gerne zur Verfügung und beantwortet alle Ihre Fragen rund um Ihren Traumwagen.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <Phone className="text-primary mx-auto mb-3" size={32} />
                    <h4 className="font-semibold text-foreground mb-2">Schnell erreichbar</h4>
                    <p className="text-sm text-muted-foreground">Telefonisch täglich erreichbar</p>
                  </div>
                  <div className="text-center">
                    <Mail className="text-primary mx-auto mb-3" size={32} />
                    <h4 className="font-semibold text-foreground mb-2">Persönlicher Service</h4>
                    <p className="text-sm text-muted-foreground">Individuelle Beratung garantiert</p>
                  </div>
                  <div className="text-center">
                    <MapPin className="text-primary mx-auto mb-3" size={32} />
                    <h4 className="font-semibold text-foreground mb-2">Vor Ort</h4>
                    <p className="text-sm text-muted-foreground">Besuchen Sie uns in Kirchberg</p>
                  </div>
                </div>
                <Button
                  onClick={() => window.location.href = '/contact'}
                  className="bg-primary text-primary-foreground px-12 py-4 text-lg hover:bg-primary/90 transition-all transform hover:scale-105"
                  data-testid="button-contact-page"
                >
                  Jetzt Kontakt aufnehmen
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
