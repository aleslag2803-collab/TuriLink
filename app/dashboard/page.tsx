import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Star, MapPin, Users, TrendingUp, Leaf, Globe, ArrowRight, Sparkles } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="p-6 lg:p-10 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Bienvenido a TuriLink</h1>
        <p className="text-lg text-muted-foreground">Descubre experiencias auténticas con guías locales certificados</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Guías Activos</p>
              <p className="text-3xl font-bold text-card-foreground mt-1">523</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-3 text-sm text-primary">
            <TrendingUp className="w-4 h-4" />
            <span className="font-medium">+12% este mes</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Lugares</p>
              <p className="text-3xl font-bold text-card-foreground mt-1">347</p>
            </div>
            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
              <MapPin className="w-6 h-6 text-secondary" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-3 text-sm text-secondary">
            <Leaf className="w-4 h-4" />
            <span className="font-medium">120 sostenibles</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Calificación</p>
              <p className="text-3xl font-bold text-card-foreground mt-1">4.9</p>
            </div>
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-accent" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 fill-accent text-accent" />
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Idiomas</p>
              <p className="text-3xl font-bold text-card-foreground mt-1">24</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Globe className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-3 text-sm text-muted-foreground">
            <span>Español, Inglés, +22</span>
          </div>
        </Card>
      </div>

      {/* Featured Guides Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Guías Destacados</h2>
            <p className="text-muted-foreground mt-1">Los mejores guías certificados</p>
          </div>
          <Button asChild variant="ghost">
            <Link href="/dashboard/guides" className="flex items-center gap-2">
              Ver todos <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "Carlos Méndez",
              specialty: "Cultura & Historia",
              rating: 4.9,
              reviews: 127,
              tours: 234,
              languages: ["Español", "Inglés", "Francés"],
              eco: true,
              image: "/guia-turistico-profesional.jpg",
            },
            {
              name: "María González",
              specialty: "Aventura & Naturaleza",
              rating: 5.0,
              reviews: 98,
              tours: 156,
              languages: ["Español", "Inglés"],
              eco: true,
              image: "/guia-turistica-aventura.jpg",
            },
            {
              name: "José Ramírez",
              specialty: "Gastronomía Local",
              rating: 4.8,
              reviews: 145,
              tours: 189,
              languages: ["Español", "Inglés", "Italiano"],
              eco: true,
              image: "/chef-guia-gastronomico.jpg",
            },
          ].map((guide, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 bg-muted">
                <img src={guide.image || "/placeholder.svg"} alt={guide.name} className="w-full h-full object-cover" />
                {guide.eco && (
                  <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                    <Leaf className="w-3 h-3 mr-1" />
                    Eco-friendly
                  </Badge>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-card-foreground mb-1">{guide.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{guide.specialty}</p>

                <div className="flex items-center gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="font-semibold">{guide.rating}</span>
                    <span className="text-muted-foreground">({guide.reviews})</span>
                  </div>
                  <div className="text-muted-foreground">{guide.tours} tours</div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {guide.languages.map((lang, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {lang}
                    </Badge>
                  ))}
                </div>

                <Button asChild className="w-full">
                  <Link href={`/dashboard/guides/${index + 1}`}>Ver Perfil</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recommendations CTA */}
      <Card className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-8 border-primary/20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-1">Recomendaciones Personalizadas</h3>
              <p className="text-muted-foreground">
                Descubre guías y experiencias perfectas para ti según tus preferencias
              </p>
            </div>
          </div>
          <Button asChild size="lg">
            <Link href="/dashboard/recommendations">Ver Recomendaciones</Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}
