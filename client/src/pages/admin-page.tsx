import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Car, Plus, Edit, Trash2, MessageSquare, DollarSign, LogOut } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Car as CarType, ContactMessage, SellCarRequest, InsertCar } from "@shared/schema";

export default function AdminPage() {
  const { user, logoutMutation } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [editingCar, setEditingCar] = useState<CarType | null>(null);
  const [isCarDialogOpen, setIsCarDialogOpen] = useState(false);

  const [carForm, setCarForm] = useState<InsertCar>({
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    price: 0,
    mileage: 0,
    transmission: "",
    fuel: "",
    imageUrl: "",
    description: "",
  });

  const { data: cars, isLoading: carsLoading } = useQuery<CarType[]>({
    queryKey: ["/api/cars"],
  });

  const { data: contactMessages, isLoading: messagesLoading } = useQuery<ContactMessage[]>({
    queryKey: ["/api/contact"],
  });

  const { data: sellCarRequests, isLoading: sellRequestsLoading } = useQuery<SellCarRequest[]>({
    queryKey: ["/api/sell-car"],
  });

  const createCarMutation = useMutation({
    mutationFn: async (carData: InsertCar) => {
      const res = await apiRequest("POST", "/api/cars", carData);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cars"] });
      setIsCarDialogOpen(false);
      resetCarForm();
      toast({ title: "Erfolg", description: "Fahrzeug wurde hinzugefügt" });
    },
    onError: () => {
      toast({ title: "Fehler", description: "Fahrzeug konnte nicht hinzugefügt werden", variant: "destructive" });
    },
  });

  const updateCarMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: InsertCar }) => {
      const res = await apiRequest("PUT", `/api/cars/${id}`, data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cars"] });
      setIsCarDialogOpen(false);
      setEditingCar(null);
      resetCarForm();
      toast({ title: "Erfolg", description: "Fahrzeug wurde aktualisiert" });
    },
    onError: () => {
      toast({ title: "Fehler", description: "Fahrzeug konnte nicht aktualisiert werden", variant: "destructive" });
    },
  });

  const deleteCarMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/cars/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cars"] });
      toast({ title: "Erfolg", description: "Fahrzeug wurde gelöscht" });
    },
    onError: () => {
      toast({ title: "Fehler", description: "Fahrzeug konnte nicht gelöscht werden", variant: "destructive" });
    },
  });

  const resetCarForm = () => {
    setCarForm({
      brand: "",
      model: "",
      year: new Date().getFullYear(),
      price: 0,
      mileage: 0,
      transmission: "",
      fuel: "",
      imageUrl: "",
      description: "",
    });
  };

  const handleCarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCar) {
      updateCarMutation.mutate({ id: editingCar.id, data: carForm });
    } else {
      createCarMutation.mutate(carForm);
    }
  };

  const handleEditCar = (car: CarType) => {
    setEditingCar(car);
    setCarForm({
      brand: car.brand,
      model: car.model,
      year: car.year,
      price: car.price,
      mileage: car.mileage,
      transmission: car.transmission,
      fuel: car.fuel,
      imageUrl: car.imageUrl,
      description: car.description || "",
    });
    setIsCarDialogOpen(true);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
    setLocation("/");
  };

  if (!user?.isAdmin) {
    setLocation("/auth");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Car className="text-primary-foreground text-xl" />
              </div>
              <span className="text-2xl font-bold text-foreground">RI automobile</span>
              <span className="text-sm text-muted-foreground">gmbh - Admin</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Willkommen, {user.username}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                data-testid="button-logout"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Abmelden
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="cars" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="cars" data-testid="tab-cars">Fahrzeuge</TabsTrigger>
            <TabsTrigger value="contact" data-testid="tab-contact">Kontakt-Nachrichten</TabsTrigger>
            <TabsTrigger value="sell" data-testid="tab-sell">Verkaufs-Anfragen</TabsTrigger>
          </TabsList>

          <TabsContent value="cars" className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-foreground">Fahrzeuge verwalten</h1>
              <Dialog open={isCarDialogOpen} onOpenChange={setIsCarDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => { setEditingCar(null); resetCarForm(); }} data-testid="button-add-car">
                    <Plus className="w-4 h-4 mr-2" />
                    Fahrzeug hinzufügen
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{editingCar ? "Fahrzeug bearbeiten" : "Neues Fahrzeug hinzufügen"}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleCarSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="brand">Marke</Label>
                        <Input
                          id="brand"
                          value={carForm.brand}
                          onChange={(e) => setCarForm({ ...carForm, brand: e.target.value })}
                          required
                          data-testid="input-car-brand"
                        />
                      </div>
                      <div>
                        <Label htmlFor="model">Modell</Label>
                        <Input
                          id="model"
                          value={carForm.model}
                          onChange={(e) => setCarForm({ ...carForm, model: e.target.value })}
                          required
                          data-testid="input-car-model"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="year">Baujahr</Label>
                        <Input
                          id="year"
                          type="number"
                          value={carForm.year}
                          onChange={(e) => setCarForm({ ...carForm, year: parseInt(e.target.value) })}
                          required
                          data-testid="input-car-year"
                        />
                      </div>
                      <div>
                        <Label htmlFor="price">Preis (CHF)</Label>
                        <Input
                          id="price"
                          type="number"
                          value={carForm.price}
                          onChange={(e) => setCarForm({ ...carForm, price: parseInt(e.target.value) })}
                          required
                          data-testid="input-car-price"
                        />
                      </div>
                      <div>
                        <Label htmlFor="mileage">Kilometerstand</Label>
                        <Input
                          id="mileage"
                          type="number"
                          value={carForm.mileage}
                          onChange={(e) => setCarForm({ ...carForm, mileage: parseInt(e.target.value) })}
                          required
                          data-testid="input-car-mileage"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="transmission">Getriebe</Label>
                        <Select value={carForm.transmission} onValueChange={(value) => setCarForm({ ...carForm, transmission: value })}>
                          <SelectTrigger data-testid="select-car-transmission">
                            <SelectValue placeholder="Getriebe wählen" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Automatik">Automatik</SelectItem>
                            <SelectItem value="Manuell">Manuell</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="fuel">Kraftstoff</Label>
                        <Select value={carForm.fuel} onValueChange={(value) => setCarForm({ ...carForm, fuel: value })}>
                          <SelectTrigger data-testid="select-car-fuel">
                            <SelectValue placeholder="Kraftstoff wählen" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Benzin">Benzin</SelectItem>
                            <SelectItem value="Diesel">Diesel</SelectItem>
                            <SelectItem value="Hybrid">Hybrid</SelectItem>
                            <SelectItem value="Elektro">Elektro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="imageUrl">Bild-URL</Label>
                      <Input
                        id="imageUrl"
                        value={carForm.imageUrl}
                        onChange={(e) => setCarForm({ ...carForm, imageUrl: e.target.value })}
                        required
                        data-testid="input-car-image"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Beschreibung</Label>
                      <Textarea
                        id="description"
                        value={carForm.description || ""}
                        onChange={(e) => setCarForm({ ...carForm, description: e.target.value })}
                        rows={3}
                        data-testid="textarea-car-description"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={createCarMutation.isPending || updateCarMutation.isPending}
                      data-testid="button-save-car"
                    >
                      {createCarMutation.isPending || updateCarMutation.isPending
                        ? "Wird gespeichert..."
                        : editingCar
                        ? "Aktualisieren"
                        : "Hinzufügen"}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {carsLoading ? (
              <div className="text-center py-8">Laden...</div>
            ) : (
              <div className="grid gap-6">
                {cars?.map((car) => (
                  <Card key={car.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex space-x-4">
                          <img
                            src={car.imageUrl}
                            alt={`${car.brand} ${car.model}`}
                            className="w-24 h-16 object-cover rounded"
                          />
                          <div>
                            <h3 className="text-lg font-semibold text-foreground">
                              {car.brand} {car.model}
                            </h3>
                            <p className="text-muted-foreground">{car.year} • {car.mileage.toLocaleString()} km</p>
                            <p className="text-lg font-bold text-primary">{car.price.toLocaleString()} CHF</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditCar(car)}
                            data-testid={`button-edit-car-${car.id}`}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteCarMutation.mutate(car.id)}
                            disabled={deleteCarMutation.isPending}
                            data-testid={`button-delete-car-${car.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <h1 className="text-3xl font-bold text-foreground">Kontakt-Nachrichten</h1>
            {messagesLoading ? (
              <div className="text-center py-8">Laden...</div>
            ) : (
              <div className="space-y-4">
                {contactMessages?.map((message) => (
                  <Card key={message.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          {message.firstName} {message.lastName}
                        </CardTitle>
                        <Badge variant="secondary">
                          {new Date(message.createdAt).toLocaleDateString("de-CH")}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p><strong>E-Mail:</strong> {message.email}</p>
                        {message.phone && <p><strong>Telefon:</strong> {message.phone}</p>}
                        <p><strong>Betreff:</strong> {message.subject}</p>
                        <p><strong>Nachricht:</strong></p>
                        <p className="bg-muted p-3 rounded text-sm">{message.message}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="sell" className="space-y-6">
            <h1 className="text-3xl font-bold text-foreground">Verkaufs-Anfragen</h1>
            {sellRequestsLoading ? (
              <div className="text-center py-8">Laden...</div>
            ) : (
              <div className="space-y-4">
                {sellCarRequests?.map((request) => (
                  <Card key={request.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          {request.firstName} {request.lastName}
                        </CardTitle>
                        <Badge variant="secondary">
                          {new Date(request.createdAt).toLocaleDateString("de-CH")}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">Kontaktdaten</h4>
                          <p><strong>E-Mail:</strong> {request.email}</p>
                          {request.phone && <p><strong>Telefon:</strong> {request.phone}</p>}
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Fahrzeugdaten</h4>
                          <p><strong>Fahrzeug:</strong> {request.brand} {request.model}</p>
                          <p><strong>Baujahr:</strong> {request.year}</p>
                          <p><strong>Kilometerstand:</strong> {request.mileage.toLocaleString()} km</p>
                          {request.desiredPrice && (
                            <p><strong>Gewünschter Preis:</strong> {request.desiredPrice.toLocaleString()} CHF</p>
                          )}
                        </div>
                      </div>
                      {request.description && (
                        <div className="mt-4">
                          <h4 className="font-semibold mb-2">Zusätzliche Informationen</h4>
                          <p className="bg-muted p-3 rounded text-sm">{request.description}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
