import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CarCard from "@/components/ui/car-card";
import type { Car } from "@shared/schema";

export default function CarsSection() {
  const [filters, setFilters] = useState({
    brand: "all",
    maxPrice: "all",
    minYear: "all",
    maxKm: "all",
  });

  const { data: cars, isLoading } = useQuery<Car[]>({
    queryKey: ["/api/cars", filters.brand, filters.maxPrice, filters.minYear, filters.maxKm],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.brand && filters.brand !== "all") params.append("brand", filters.brand);
      if (filters.maxPrice && filters.maxPrice !== "all") params.append("maxPrice", filters.maxPrice);
      if (filters.minYear && filters.minYear !== "all") params.append("minYear", filters.minYear);
      if (filters.maxKm && filters.maxKm !== "all") params.append("maxKm", filters.maxKm);
      
      const response = await fetch(`/api/cars?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch cars");
      return response.json();
    },
  });

  const resetFilters = () => {
    setFilters({
      brand: "all",
      maxPrice: "all",
      minYear: "all",
      maxKm: "all",
    });
  };

  return (
    <section id="cars" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Unsere Fahrzeuge</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Entdecken Sie unsere sorgfältig ausgewählten Premium-Fahrzeuge
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card p-6 rounded-xl border border-border mb-12">
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Marke</label>
              <Select
                value={filters.brand}
                onValueChange={(value) => setFilters({ ...filters, brand: value })}
              >
                <SelectTrigger data-testid="filter-brand">
                  <SelectValue placeholder="Alle Marken" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Marken</SelectItem>
                  <SelectItem value="BMW">BMW</SelectItem>
                  <SelectItem value="Mercedes-Benz">Mercedes-Benz</SelectItem>
                  <SelectItem value="Audi">Audi</SelectItem>
                  <SelectItem value="Porsche">Porsche</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Preis bis</label>
              <Select
                value={filters.maxPrice}
                onValueChange={(value) => setFilters({ ...filters, maxPrice: value })}
              >
                <SelectTrigger data-testid="filter-price">
                  <SelectValue placeholder="Alle Preise" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Preise</SelectItem>
                  <SelectItem value="50000">50'000 CHF</SelectItem>
                  <SelectItem value="100000">100'000 CHF</SelectItem>
                  <SelectItem value="200000">200'000 CHF</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Baujahr ab</label>
              <Select
                value={filters.minYear}
                onValueChange={(value) => setFilters({ ...filters, minYear: value })}
              >
                <SelectTrigger data-testid="filter-year">
                  <SelectValue placeholder="Alle Jahre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Jahre</SelectItem>
                  <SelectItem value="2020">2020</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Kilometerstand</label>
              <Select
                value={filters.maxKm}
                onValueChange={(value) => setFilters({ ...filters, maxKm: value })}
              >
                <SelectTrigger data-testid="filter-mileage">
                  <SelectValue placeholder="Alle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle</SelectItem>
                  <SelectItem value="50000">bis 50'000 km</SelectItem>
                  <SelectItem value="100000">bis 100'000 km</SelectItem>
                  <SelectItem value="150000">bis 150'000 km</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-4">
            <Button
              variant="outline"
              onClick={resetFilters}
              data-testid="button-reset-filters"
            >
              Filter zurücksetzen
            </Button>
          </div>
        </div>

        {/* Cars Grid */}
        {isLoading ? (
          <div className="text-center py-8">
            <div className="text-muted-foreground">Laden...</div>
          </div>
        ) : cars && cars.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-muted-foreground">Keine Fahrzeuge gefunden</div>
          </div>
        )}
      </div>
    </section>
  );
}
