import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, ArrowLeft } from "lucide-react";

export default function AuthPage() {
  const { user, loginMutation } = useAuth();
  const [, setLocation] = useLocation();
  
  const [loginData, setLoginData] = useState({ username: "", password: "" });

  // Handle navigation after login
  useEffect(() => {
    if (user && user.isAdmin) {
      setLocation("/admin");
    } else if (user) {
      setLocation("/");
    }
  }, [user, setLocation]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(loginData);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Forms */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => setLocation("/")}
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft size={20} />
              <span>Zurück zur Startseite</span>
            </Button>
          </div>
          
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
            <a href="/"><img src="/images/lastlogo.png" alt="AutoBala Logo" className="w-15 h-10" /></a>
            </div>
            <h1 className="text-2xl font-bold text-foreground">Admin-Zugang</h1>
            <p className="text-muted-foreground">Melden Sie sich an, um das Admin-Panel zu verwenden</p>
            
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Anmelden</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="login-username">Benutzername</Label>
                  <Input
                    id="login-username"
                    type="text"
                    value={loginData.username}
                    onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                    required
                    data-testid="input-login-username"
                    placeholder="Ihr Admin-Benutzername"
                  />
                </div>
                <div>
                  <Label htmlFor="login-password">Passwort</Label>
                  <Input
                    id="login-password"
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                    data-testid="input-login-password"
                    placeholder="Ihr Passwort"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loginMutation.isPending}
                  data-testid="button-login"
                >
                  {loginMutation.isPending ? "Wird angemeldet..." : "Anmelden"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right side - Hero */}
      <div className="hidden lg:flex flex-1 bg-card items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Admin-Panel
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Verwalten Sie Fahrzeuge, bearbeiten Sie Anfragen und überwachen Sie alle Aktivitäten auf Ihrer Automotive-Website.
          </p>
          <div className="mt-8 space-y-3">
            <div className="flex items-center justify-center space-x-3 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Fahrzeug-Inventar verwalten</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Kundenanfragen bearbeiten</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Verkaufsanfragen verwalten</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
