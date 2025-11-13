import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Map, Compass, Star, Users, Sparkles, TrendingUp, Shield, Leaf, Globe } from "lucide-react"
import { TopGuidesSection } from "@/components/top-guides-section"
import { PopularDestinationsSection } from "@/components/popular-destinations-section"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 pt-20 pb-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge className="bg-accent text-accent-foreground w-fit">
                <Sparkles className="w-3 h-3 mr-1" />
                Conecta con guías locales auténticos
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-bold text-balance leading-tight">
                Descubre el Mundo con
                <span className="text-primary"> Guías Locales</span>
              </h1>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                Experiencias únicas, tours personalizados y recomendaciones exclusivas de quienes mejor conocen cada
                destino.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="text-lg px-8">
                  <Compass className="w-5 h-5 mr-2" />
                  Explorar Tours
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent" asChild>
                  <Link href="/guia/registro">
                    <Users className="w-5 h-5 mr-2" />
                    Soy Guía
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div>
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Guías Verificados</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">1200+</div>
                  <div className="text-sm text-muted-foreground">Tours Únicos</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">50k+</div>
                  <div className="text-sm text-muted-foreground">Turistas Felices</div>
                </div>
              </div>
            </div>

            <div className="relative h-[500px] lg:h-[600px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-3xl" />
              <img
                src="/tourist-exploring-local-market-with-guide.jpg"
                alt="Turista explorando con guía local"
                className="absolute inset-0 w-full h-full object-cover rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">¿Por qué elegir TuriLink?</h2>
            <p className="text-xl text-muted-foreground">La mejor forma de conectar con experiencias auténticas</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Map className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Experiencias Auténticas</CardTitle>
                <CardDescription className="text-base">
                  Descubre lugares ocultos y vive como un local con guías que conocen cada rincón de su ciudad.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>Guías Verificados</CardTitle>
                <CardDescription className="text-base">
                  Todos nuestros guías están verificados y cuentan con calificaciones reales de viajeros anteriores.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle>IA Inteligente</CardTitle>
                <CardDescription className="text-base">
                  Obtén rutas personalizadas con IA que conecta los mejores lugares y guías según tus preferencias.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Top Guides */}
      <TopGuidesSection />

      {/* Popular Destinations */}
      <PopularDestinationsSection />

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl font-bold text-primary-foreground text-balance">
            ¿Eres guía local? Únete a TuriLink
          </h2>
          <p className="text-xl text-primary-foreground/90 text-pretty">
            Comparte tu pasión, conecta con viajeros de todo el mundo y crea tu negocio de turismo.
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
            <Link href="/guia/registro">
              <TrendingUp className="w-5 h-5 mr-2" />
              Comenzar como Guía
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
