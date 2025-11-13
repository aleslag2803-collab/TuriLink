import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles, MapPin, Calendar, Users, Clock, Zap, TrendingUp, CheckCircle } from "lucide-react"

export default function IAPlannerPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-accent/20 via-background to-primary/10 py-20 px-4">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <Badge className="bg-accent text-accent-foreground w-fit mx-auto text-sm px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              Powered by IA
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-bold text-balance">
              Planifica tu Viaje Perfecto con
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                {" "}
                Inteligencia Artificial
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              Obtén rutas personalizadas que conectan los mejores lugares, experiencias y guías locales según tus
              preferencias y tiempo disponible.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="border-2">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Rutas Optimizadas</CardTitle>
                  <CardDescription className="text-base">
                    La IA calcula las mejores rutas entre destinos cercanos para maximizar tu tiempo
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-accent" />
                  </div>
                  <CardTitle>Recomendaciones Personalizadas</CardTitle>
                  <CardDescription className="text-base">
                    Sugerencias basadas en tus intereses, presupuesto y estilo de viaje
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-secondary" />
                  </div>
                  <CardTitle>Guías Perfectos</CardTitle>
                  <CardDescription className="text-base">
                    Conecta automáticamente con el guía ideal para tu itinerario
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Planning Form */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Crea tu Itinerario Inteligente</h2>
              <p className="text-lg text-muted-foreground">
                Completa estos datos y deja que la IA diseñe tu viaje perfecto
              </p>
            </div>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Detalles de tu Viaje</CardTitle>
                <CardDescription>Cuéntanos sobre tu viaje y te ayudaremos a planificarlo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="destination">¿A dónde viajas?</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="destination" placeholder="Ciudad de México, México" className="pl-10" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dates">Fechas del viaje</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="dates" type="text" placeholder="15-20 Febrero 2025" className="pl-10" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="travelers">Número de viajeros</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="travelers" type="number" placeholder="2" className="pl-10" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Horas disponibles por día</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="duration" type="number" placeholder="8" className="pl-10" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Intereses principales (selecciona varios)</Label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Historia",
                      "Gastronomía",
                      "Arte",
                      "Aventura",
                      "Naturaleza",
                      "Fotografía",
                      "Cultura",
                      "Vida Nocturna",
                      "Compras",
                      "Arquitectura",
                    ].map((interest) => (
                      <Badge
                        key={interest}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors text-sm py-2"
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Presupuesto aproximado por persona</Label>
                  <Input id="budget" type="text" placeholder="$500 - $1000 USD" />
                </div>

                <div className="pt-4">
                  <Button size="lg" className="w-full text-lg" disabled>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generar Itinerario con IA
                    <Badge variant="secondary" className="ml-2">
                      Próximamente
                    </Badge>
                  </Button>
                  <p className="text-sm text-muted-foreground text-center mt-4">
                    Esta es una funcionalidad premium. Suscríbete para acceder.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">¿Qué incluye el IA Planner?</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Itinerarios día a día",
                  description: "Planificación completa con horarios optimizados",
                },
                {
                  title: "Rutas geoespaciales",
                  description: "Mapas interactivos con las mejores rutas",
                },
                {
                  title: "Recomendaciones de guías",
                  description: "Los mejores guías para cada parte de tu viaje",
                },
                {
                  title: "Estimación de costos",
                  description: "Presupuesto detallado de tours y experiencias",
                },
                {
                  title: "Lugares cercanos",
                  description: "Descubre puntos de interés en cada parada",
                },
                {
                  title: "Ajustes en tiempo real",
                  description: "Modifica tu plan sobre la marcha",
                },
              ].map((benefit, idx) => (
                <div key={idx} className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing CTA */}
        <section className="py-20 px-4 bg-gradient-to-r from-primary to-accent">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-4xl font-bold text-primary-foreground">Accede al IA Planner</h2>
            <p className="text-xl text-primary-foreground/90">
              Suscripción mensual por solo $9.99 USD o $99 USD al año
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Prueba Gratis 7 Días
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              >
                Ver Planes
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
