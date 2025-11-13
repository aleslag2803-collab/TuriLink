import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Star, Leaf, Globe, Shield } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight text-balance">
              Descubre experiencias auténticas con guías locales
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-balance">
              Conectamos viajeros con guías certificados y lugares sostenibles para crear recuerdos inolvidables
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/dashboard">Explorar Guías</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                <Link href="/dashboard/guides/register">Ser Guía</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </header>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-foreground">¿Por qué elegir TuriLink?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-card-foreground">Guías Certificados</h3>
              <p className="text-muted-foreground leading-relaxed">
                Todos nuestros guías están verificados con documentación oficial para garantizar tu seguridad y
                confianza
              </p>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Leaf className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-card-foreground">Turismo Sostenible</h3>
              <p className="text-muted-foreground leading-relaxed">
                Promovemos experiencias que respetan el medio ambiente y apoyan a las comunidades locales
              </p>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Star className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-card-foreground">Experiencias Auténticas</h3>
              <p className="text-muted-foreground leading-relaxed">
                Descubre lugares únicos y vive momentos genuinos con expertos locales apasionados
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">500+</div>
              <div className="text-lg opacity-90">Guías Certificados</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">10K+</div>
              <div className="text-lg opacity-90">Turistas Satisfechos</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">300+</div>
              <div className="text-lg opacity-90">Destinos Únicos</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">4.9</div>
              <div className="text-lg opacity-90">Calificación Promedio</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-secondary/20 to-accent/20">
        <div className="container mx-auto px-4 text-center">
          <Globe className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4 text-foreground text-balance">Comienza tu aventura hoy</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
            Únete a miles de viajeros que ya descubrieron experiencias inolvidables
          </p>
          <Button asChild size="lg" className="text-lg px-10">
            <Link href="/dashboard">Explorar Ahora</Link>
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
                Conectando turistas con experiencias auténticas desde 2024
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-card-foreground">Explora</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/dashboard/guides" className="text-muted-foreground hover:text-primary transition-colors">
                    Guías
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/locals" className="text-muted-foreground hover:text-primary transition-colors">
                    Lugares
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/recommendations"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Recomendaciones
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-card-foreground">Conviértete en Guía</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/dashboard/guides/register"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
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
                    Centro de Ayuda
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Términos
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2025 TuriLink. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}
