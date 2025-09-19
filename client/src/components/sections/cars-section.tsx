import { useState, useEffect } from "react";
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
  const [widgetError, setWidgetError] = useState(true); // Start with error state

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

  // Load AutoScout24 HCI script with error handling
  useEffect(() => {
    // Check if we're in a development environment or if there are known issues
    const isDevelopment = window.location.hostname === 'localhost' || 
                         window.location.hostname === '127.0.0.1' ||
                         window.location.hostname.includes('ngrok') ||
                         window.location.hostname.includes('localhost');
    
    // Check if we're in a test environment
    const isTestEnvironment = window.location.hostname.includes('ngrok') ||
                             window.location.hostname.includes('vercel') ||
                             window.location.hostname.includes('netlify') ||
                             window.location.hostname.includes('github');
    
    if (isDevelopment && !isTestEnvironment) {
      console.log('Development environment detected - AutoScout24 widget may not work properly');
      console.log('To test HCI widget:');
      console.log('1. Use ngrok: ngrok http 3000');
      console.log('2. Deploy to Vercel/Netlify for testing');
      console.log('3. Use production domain');
      setWidgetError(true);
      return;
    }
    
    if (isTestEnvironment) {
      console.log('Test environment detected - attempting to load HCI widget');
    }

    const script = document.createElement('script');
    script.src = 'https://www.autoscout24.ch/assets/hci/v2/hci.current.js';
    script.async = true;
    
    script.onerror = () => {
      console.warn('AutoScout24 HCI script failed to load');
      setWidgetError(true);
    };
    
    script.onload = () => {
      console.log('AutoScout24 HCI script loaded successfully');
      console.log('Current domain:', window.location.hostname);
      console.log('Config ID:', '12980');
      
      // Multiple checks for widget initialization
      let checkCount = 0;
      const maxChecks = 10;
      
      const checkWidget = () => {
        checkCount++;
        const widgetContainer = document.querySelector('.hci-container');
        console.log(`Check ${checkCount}/${maxChecks}: Widget container found:`, !!widgetContainer);
        console.log(`Check ${checkCount}/${maxChecks}: Widget children count:`, widgetContainer?.children.length || 0);
        
        // Check for various widget indicators
        const hasContent = widgetContainer && widgetContainer.children.length > 0;
        const hasIframe = widgetContainer && widgetContainer.querySelector('iframe');
        const hasAutoScoutElements = widgetContainer && widgetContainer.querySelector('[class*="autoscout"], [class*="hci"], [id*="autoscout"]');
        
        console.log(`Check ${checkCount}: hasContent:`, hasContent, 'hasIframe:', hasIframe, 'hasAutoScoutElements:', hasAutoScoutElements);
        
        if (hasContent || hasIframe || hasAutoScoutElements) {
          console.log('✅ AutoScout24 widget loaded successfully!');
          setWidgetError(false);
          return;
        }
        
        if (checkCount < maxChecks) {
          console.log(`Widget not ready yet, checking again in 1 second...`);
          setTimeout(checkWidget, 1000);
        } else {
          console.log('❌ AutoScout24 widget failed to initialize after', maxChecks, 'checks');
          console.log('Possible issues:');
          console.log('1. Config ID 12980 might be incorrect');
          console.log('2. Domain not whitelisted by AutoScout24');
          console.log('3. AutoScout24 server issues');
          console.log('4. CORS or security restrictions');
          setWidgetError(true);
        }
      };
      
      // Start checking after a short delay
      setTimeout(checkWidget, 2000);
    };
    
    document.head.appendChild(script);

    // Set a shorter timeout to detect if widget doesn't load
    const timeout = setTimeout(() => {
      const widgetContainer = document.querySelector('.hci-container');
      if (widgetContainer && widgetContainer.children.length === 0) {
        console.warn('AutoScout24 widget did not initialize within timeout');
        setWidgetError(true);
      }
    }, 5000); // 5 second timeout

    return () => {
      clearTimeout(timeout);
      const existingScript = document.querySelector('script[src="https://www.autoscout24.ch/assets/hci/v2/hci.current.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

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
          <div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {cars.slice(0, 6).map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
            {cars.length > 6 && (
              <div className="text-center">
                <Button
                  onClick={() => window.location.href = '/cars'}
                  className="bg-primary text-primary-foreground px-8 py-3 hover:bg-primary/90 transition-all"
                  data-testid="button-view-all-cars"
                >
                  Alle Fahrzeuge ansehen ({cars.length} Fahrzeuge)
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-muted-foreground">Keine Fahrzeuge gefunden</div>
          </div>
        )}
        
        {/* AutoScout24 HCI Widget */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Unsere Fahrzeuge auf AutoScout24</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Entdecken Sie unsere aktuellen Angebote direkt von AutoScout24
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-xl border border-border">
            {widgetError ? (
              <div className="text-center py-8">
                <div className="text-muted-foreground mb-4">
                  AutoScout24 Widget ist derzeit nicht verfügbar
                </div>
                <div className="text-sm text-muted-foreground mb-4">
                  Sie können unsere Fahrzeuge über den Admin-Bereich verwalten oder direkt auf AutoScout24 besuchen
                </div>
                
                {/* Development/Testing Info */}
                {(window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && (
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
                    <div className="text-sm text-yellow-800 dark:text-yellow-200">
                      <strong>Development Mode:</strong> HCI Widget funktioniert nur mit echten Domains.
                      <br />
                      <strong>Zum Testen:</strong> Verwenden Sie ngrok oder deployen Sie auf Vercel/Netlify.
                    </div>
                  </div>
                )}
                
                {/* Production Debug Info */}
                {!(window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && (
                  <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                    <div className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Production Mode:</strong> Domain: {window.location.hostname}
                      <br />
                      <strong>Config ID:</strong> 12980
                      <br />
                      <strong>Status:</strong> Script geladen, Widget initialisiert sich...
                      <br />
                      <strong>Debug:</strong> Öffnen Sie die Browser-Konsole für detaillierte Logs.
                      <br />
                      <strong>Mögliche Lösungen:</strong>
                      <ul className="list-disc list-inside mt-2 text-xs">
                        <li>Config ID 12980 überprüfen</li>
                        <li>Domain bei AutoScout24 whitelisten lassen</li>
                        <li>AutoScout24 Support kontaktieren</li>
                      </ul>
                    </div>
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    asChild
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <a 
                      href="https://www.autoscout24.ch" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Zu AutoScout24 gehen
                    </a>
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      console.log('Retrying HCI widget load...');
                      setWidgetError(false);
                      // Force reload the script
                      const existingScript = document.querySelector('script[src="https://www.autoscout24.ch/assets/hci/v2/hci.current.js"]');
                      if (existingScript) {
                        existingScript.remove();
                      }
                      // Trigger a re-render to try loading the widget again
                      setTimeout(() => {
                        const script = document.createElement('script');
                        script.src = 'https://www.autoscout24.ch/assets/hci/v2/hci.current.js';
                        script.async = true;
                        script.onload = () => {
                          console.log('Retry: AutoScout24 HCI script loaded');
                          setTimeout(() => {
                            const widgetContainer = document.querySelector('.hci-container');
                            if (widgetContainer && widgetContainer.children.length > 0) {
                              console.log('✅ Retry successful!');
                              setWidgetError(false);
                            } else {
                              console.log('❌ Retry failed');
                              setWidgetError(true);
                            }
                          }, 3000);
                        };
                        script.onerror = () => {
                          console.log('❌ Retry failed to load script');
                          setWidgetError(true);
                        };
                        document.head.appendChild(script);
                      }, 100);
                    }}
                  >
                    Erneut versuchen
                  </Button>
                  
                  <Button 
                    variant="secondary"
                    onClick={() => {
                      console.log('Testing different Config ID...');
                      const container = document.querySelector('.hci-container');
                      if (container) {
                        container.setAttribute('data-config-id', '1866516');
                        console.log('Changed Config ID to 1866516 (seller ID)');
                        setTimeout(() => {
                          console.log('Widget children after Config ID change:', container.children.length);
                        }, 2000);
                      }
                    }}
                  >
                    Test Config ID
                  </Button>
                </div>
              </div>
            ) : (
              <div 
                className="hci-container" 
                data-config-id="12980" 
                data-language="de" 
                data-entry-point="search"
              ></div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
