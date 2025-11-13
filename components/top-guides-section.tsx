import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, MessageCircle } from "lucide-react"
import Link from "next/link"

const topGuides = [
  {
    id: 1,
    name: "Carlos Mendoza",
    location: "Ciudad de México, México",
    rating: 4.9,
    reviews: 234,
    tours: 12,
    specialties: ["Historia", "Gastronomía", "Arte"],
    image: "/professional-mexican-tour-guide-smiling.jpg",
    verified: true,
  },
  {
    id: 2,
    name: "Sofia Ramirez",
    location: "Barcelona, España",
    rating: 5.0,
    reviews: 189,
    tours: 8,
    specialties: ["Arquitectura", "Cultura", "Fotografía"],
    image: "/professional-spanish-female-tour-guide.jpg",
    verified: true,
  },
  {
    id: 3,
    name: "Miguel Torres",
    location: "Cusco, Perú",
    rating: 4.8,
    reviews: 312,
    tours: 15,
    specialties: ["Aventura", "Historia Inca", "Naturaleza"],
    image: "/professional-peruvian-tour-guide-mountains.jpg",
    verified: true,
  },
  {
    id: 4,
    name: "Ana Martínez",
    location: "Buenos Aires, Argentina",
    rating: 4.9,
    reviews: 167,
    tours: 10,
    specialties: ["Tango", "Gastronomía", "Vida Nocturna"],
    image: "/professional-argentinian-female-tour-guide.jpg",
    verified: true,
  },
]

export function TopGuidesSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-4">Guías Mejor Calificados</h2>
            <p className="text-xl text-muted-foreground">Expertos locales verificados y altamente recomendados</p>
          </div>
          <Button variant="outline" asChild className="hidden md:flex bg-transparent">
            <Link href="/guias">Ver Todos</Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topGuides.map((guide) => (
            <Card
              key={guide.id}
              className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-2 hover:border-primary"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={guide.image || "/placeholder.svg"}
                  alt={guide.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {guide.verified && (
                  <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">Verificado</Badge>
                )}
              </div>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="font-bold text-lg mb-1">{guide.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    {guide.location}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="font-semibold">{guide.rating}</span>
                    <span className="text-muted-foreground">({guide.reviews})</span>
                  </div>
                  <div className="text-muted-foreground">{guide.tours} tours</div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {guide.specialties.slice(0, 2).map((specialty) => (
                    <Badge key={specialty} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                  {guide.specialties.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{guide.specialties.length - 2}
                    </Badge>
                  )}
                </div>

                <Button className="w-full" asChild>
                  <Link href={`/guias/${guide.id}`}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Ver Perfil
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" asChild>
            <Link href="/guias">Ver Todos los Guías</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
