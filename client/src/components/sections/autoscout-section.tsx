import { useEffect } from "react";

export default function AutoScoutSection() {
  useEffect(() => {
    // Load AutoScout24 HCI script
    const script = document.createElement('script');
    script.src = 'https://www.autoscout24.ch/assets/hci/v2/hci.current.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup script on component unmount
      const existingScript = document.querySelector('script[src="https://www.autoscout24.ch/assets/hci/v2/hci.current.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Unsere Fahrzeuge auf AutoScout24</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Entdecken Sie unsere aktuellen Angebote direkt von AutoScout24
          </p>
        </div>

        {/* AutoScout24 HCI Widget */}
        <div className="bg-card p-6 rounded-xl border border-border">
          <div 
            className="hci-container" 
            data-config-id="12980" 
            data-language="de" 
            data-entry-point="search"
          ></div>
        </div>
      </div>
    </section>
  );
}
