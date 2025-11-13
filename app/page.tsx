import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Map, Compass, Star, Users, Sparkles, TrendingUp } from "lucide-react"
import { TopGuidesSection } from "@/components/top-guides-section"
import { PopularDestinationsSection } from "@/components/popular-destinations-section"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto px-4 py-16 md:py-28">
          <div className="max-w-5xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1 text-xs font-medium text-muted-foreground mb-4">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Plataforma para guías y turistas en Cancún y Riviera Maya
            </span>

            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight text-balance">
              Conecta con guías locales y vive Cancún como un experto
            </h1>

            <p className="text-lg md:text-2xl text-muted-foreground mb-10 text-balance max-w-3xl mx-auto">
              TuriLink te ayuda a encontrar guías certificados, experiencias auténticas y turismo responsable
              en Cancún, Riviera Maya y alrededores.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/register/tourist">Soy Turista</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg px-8 bg-background/60 backdrop-blur border-border"
              >
                <Link href="/register/guide">Soy Guía Turístico</Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              <span>Guías verificados</span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground" />
              <span>Enfoque en turismo sostenible</span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground" />
              <span>Experiencias personalizadas</span>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="pointer-events-none absolute top-24 right-10 w-64 h-64 bg-primary/15 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 left-0 w-80 h-80 bg-secondary/20 rounded-full blur-3xl" />
      </header>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            ¿Por qué usar TuriLink?
          </h2>
          <p className="text-center text-muted-foreground mb-14 max-w-2xl mx-auto">
            Simplificamos la conexión entre turistas y guías en Cancún con un enfoque en seguridad, calidad
            y sostenibilidad.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 hover:shadow-lg transition-shadow border-border/60">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-card-foreground">Guías certificados</h3>
              <p className="text-muted-foreground leading-relaxed">
                Validamos documentos oficiales y experiencia para que viajes con tranquilidad, tanto en zonas
                arqueológicas como en tours de aventura.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-shadow border-border/60">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Leaf className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-card-foreground">Turismo responsable</h3>
              <p className="text-muted-foreground leading-relaxed">
                Impulsamos actividades que cuidan los cenotes, arrecifes y comunidades locales para que el
                Caribe siga siendo un paraíso.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-shadow border-border/60">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Star className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-card-foreground">Experiencias únicas</h3>
              <p className="text-muted-foreground leading-relaxed">
                Desde amaneceres en la laguna hasta visitas privadas a zonas arqueológicas, diseña tu plan
                junto a expertos locales.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories Section (para tus filtros de guías) */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Categorías de guías en Cancún
              </h2>
              <p className="text-muted-foreground mt-2 max-w-xl">
                Encuentra al guía ideal según el tipo de experiencia, zona y el idioma que necesitas.
              </p>
            </div>
            <Button asChild variant="outline" size="sm" className="self-start md:self-auto">
              <Link href="/guides">Ver todos los guías</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <Card className="p-5 border-dashed border-border">
              <h3 className="font-semibold mb-2 text-card-foreground">Por tipo de experiencia</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Arqueología, aventura, acuático, gastronómico y más.
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-primary/10 text-primary px-3 py-1">Arqueológico</span>
                <span className="rounded-full bg-primary/10 text-primary px-3 py-1">Cenotes</span>
                <span className="rounded-full bg-primary/10 text-primary px-3 py-1">Snorkel / Buceo</span>
              </div>
            </Card>

            <Card className="p-5 border-dashed border-border">
              <h3 className="font-semibold mb-2 text-card-foreground">Por zona</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Optimiza tiempos y costos eligiendo guías cercanos.
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-secondary/10 text-secondary-foreground px-3 py-1">Cancún</span>
                <span className="rounded-full bg-secondary/10 text-secondary-foreground px-3 py-1">
                  Riviera Maya
                </span>
                <span className="rounded-full bg-secondary/10 text-secondary-foreground px-3 py-1">
                  Isla Mujeres
                </span>
              </div>
            </Card>

            <Card className="p-5 border-dashed border-border">
              <h3 className="font-semibold mb-2 text-card-foreground">Por idioma</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Conecta con guías que hablen el idioma de tus turistas.
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-accent/10 text-accent-foreground px-3 py-1">Español</span>
                <span className="rounded-full bg-accent/10 text-accent-foreground px-3 py-1">Inglés</span>
                <span className="rounded-full bg-accent/10 text-accent-foreground px-3 py-1">Portugués</span>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-sm md:text-lg opacity-90">Guías registrados</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">10K+</div>
              <div className="text-sm md:text-lg opacity-90">Turistas atendidos</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">300+</div>
              <div className="text-sm md:text-lg opacity-90">Experiencias activas</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2 flex items-center justify-center gap-1">
                4.9
                <Star className="w-6 h-6 fill-current" />
              </div>
              <div className="text-sm md:text-lg opacity-90">Calificación promedio</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-secondary/20 to-accent/20">
        <div className="container mx-auto px-4 text-center">
          <Globe className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground text-balance">
            Listo para explorar Cancún de verdad
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
            Regístrate, crea tu perfil o encuentra al guía perfecto y comienza a planear tu próxima experiencia
            en el Caribe mexicano.
          </p>
          <Button asChild size="lg" className="text-lg px-10">
            <Link href="/dashboard">Ir al panel</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-card-foreground">TuriLink</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Conectando guías y turistas en Cancún, Riviera Maya y el Caribe mexicano desde 2024.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-card-foreground">Explora</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/guides" className="text-muted-foreground hover:text-primary transition-colors">
                    Guías
                  </Link>
                </li>
                <li>
                  <Link href="/locals" className="text-muted-foreground hover:text-primary transition-colors">
                    Lugares
                  </Link>
                </li>
                <li>
                  <Link
                    href="/recommendations"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Recomendaciones
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-card-foreground">Conviértete en guía</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/register/guide" className="text-muted-foreground hover:text-primary transition-colors">
                    Registrarse
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Requisitos
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Beneficios
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-card-foreground">Soporte</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Centro de ayuda
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Términos y privacidad
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} TuriLink. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}
