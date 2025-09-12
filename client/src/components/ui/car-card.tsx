import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { Car } from "@shared/schema";

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <>
      <div className="car-card bg-card rounded-xl border border-border overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10">
        <img
          src={car.imageUrl}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-48 object-cover"
          data-testid={`car-image-${car.id}`}
        />
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-semibold text-foreground" data-testid={`car-title-${car.id}`}>
              {car.brand} {car.model}
            </h3>
            <Badge variant="secondary" data-testid={`car-year-${car.id}`}>
              {car.year}
            </Badge>
          </div>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Kilometerstand:</span>
              <span className="text-foreground" data-testid={`car-mileage-${car.id}`}>
                {car.mileage.toLocaleString()} km
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Getriebe:</span>
              <span className="text-foreground" data-testid={`car-transmission-${car.id}`}>
                {car.transmission}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Kraftstoff:</span>
              <span className="text-foreground" data-testid={`car-fuel-${car.id}`}>
                {car.fuel}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary" data-testid={`car-price-${car.id}`}>
              {car.price.toLocaleString()} CHF
            </span>
            <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
              <DialogTrigger asChild>
                <Button data-testid={`button-car-details-${car.id}`}>
                  Details
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{car.brand} {car.model}</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <img
                    src={car.imageUrl}
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Fahrzeugdaten</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Marke:</span>
                          <span className="text-foreground">{car.brand}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Modell:</span>
                          <span className="text-foreground">{car.model}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Baujahr:</span>
                          <span className="text-foreground">{car.year}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Kilometerstand:</span>
                          <span className="text-foreground">{car.mileage.toLocaleString()} km</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Ausstattung</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Getriebe:</span>
                          <span className="text-foreground">{car.transmission}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Kraftstoff:</span>
                          <span className="text-foreground">{car.fuel}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Preis:</span>
                          <span className="text-primary font-bold">{car.price.toLocaleString()} CHF</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {car.description && (
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Beschreibung</h4>
                      <p className="text-muted-foreground">{car.description}</p>
                    </div>
                  )}
                  <div className="flex space-x-4">
                    <Button className="flex-1" onClick={() => {
                      const element = document.getElementById("contact");
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                        setIsDetailsOpen(false);
                      }
                    }}>
                      Interesse melden
                    </Button>
                    <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
                      Schließen
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
}
