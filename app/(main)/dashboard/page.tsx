import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { mockGuides } from "@/lib/mock-data"
import { Star, TrendingUp, Users, MapPin, Sparkles, ArrowRight } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="p-6 lg:p-10 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">¡Bienvenido a TuriLink!</h1>
        <p className="text-lg text-muted-foreground">Descubre experiencias auténticas con guías locales certificados</p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-card-foreground">150+</p>
              <p className="text-sm text-muted-foreground">Guías Certificados</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-card-foreground">4.8/5</p>
              <p className="text-sm text-muted-foreground">Calificación Promedio</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-card-foreground">10K+</p>
              <p className="text-sm text-muted-foreground">Tours Realizados</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Featured Guides */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-1">Guías Destacados</h2>
            <p className="text-muted-foreground">Los mejores guías de nuestra comunidad</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/guides">
              Ver Todos
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockGuides.slice(0, 3).map((guide) => (
            <Card key={guide.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 bg-muted">
                <img src={guide.photo || "/placeholder.svg"} alt={guide.name} className="w-full h-full object-cover" />
                <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">⭐ {guide.rating}</Badge>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-card-foreground mb-1">{guide.name}</h3>
                <p className="text-primary font-medium text-sm mb-3">{guide.specialty}</p>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">{guide.description}</p>
                <Button asChild className="w-full">
                  <Link href={`/guides/${guide.id}`}>Ver Perfil</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <Sparkles className="w-10 h-10 text-primary mb-4" />
          <h3 className="text-xl font-bold text-card-foreground mb-2">Recomendaciones Personalizadas</h3>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Obtén sugerencias de guías y experiencias basadas en tus intereses
          </p>
          <Button asChild>
            <Link href="/recommendations">Explorar Ahora</Link>
          </Button>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
          <MapPin className="w-10 h-10 text-secondary mb-4" />
          <h3 className="text-xl font-bold text-card-foreground mb-2">Descubre Lugares Únicos</h3>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Explora rincones auténticos recomendados por locales
          </p>
          <Button asChild variant="secondary">
            <Link href="/locals">Ver Lugares</Link>
          </Button>
        </Card>
      </div>
    </div>
  )
}
