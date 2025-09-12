
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CarsSection from "@/components/sections/cars-section";

export default function CarsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="bg-muted py-16">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-foreground mb-4">Unsere Fahrzeuge</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Entdecken Sie unsere sorgfältig ausgewählten Premium-Fahrzeuge. 
                Jedes Auto wird von unseren Experten geprüft und wartet darauf, Ihr neuer Begleiter zu werden.
              </p>
            </div>
          </div>
        </div>
        <CarsSection />
      </main>
      <Footer />
    </div>
  );
}
