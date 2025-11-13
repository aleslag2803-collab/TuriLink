import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Users } from "lucide-react"
import Link from "next/link"

const popularDestinations = [
  {
    id: 1,
    name: "Machu Picchu",
    country: "Perú",
    rating: 4.9,
    guides: 45,
    tours: 120,
    image: "/machu-picchu-sunrise-tourists.jpg",
    description: "Explora la ciudad perdida de los Incas",
  },
  {
    id: 2,
    name: "Parque Güell",
    country: "España",
    rating: 4.8,
    guides: 38,
    tours: 95,
    image: "/park-guell-barcelona-gaudi-architecture.jpg",
    description: "Arte y arquitectura de Gaudí",
  },
  {
    id: 3,
    name: "Teotihuacán",
    country: "México",
    rating: 4.7,
    guides: 32,
    tours: 78,
    image: "/teotihuacan-pyramids-mexico-aerial-view.jpg",
    description: "Pirámides ancestrales mexicanas",
  },
  {
    id: 4,
    name: "Torres del Paine",
    country: "Chile",
    rating: 5.0,
    guides: 28,
    tours: 65,
    image: "/torres-del-paine-chile-mountains-lake.jpg",
    description: "Naturaleza salvaje patagónica",
  },
  {
    id: 5,
    name: "Cartagena Colonial",
    country: "Colombia",
    rating: 4.9,
    guides: 41,
    tours: 88,
    image: "/cartagena-colombia-colorful-colonial-streets.jpg",
    description: "Historia y color caribeño",
  },
  {
    id: 6,
    name: "Iguazú",
    country: "Argentina/Brasil",
    rating: 4.8,
    guides: 35,
    tours: 72,
    image: "/iguazu-falls-rainbow-nature.jpg",
    description: "Cataratas espectaculares",
  },
]

export function PopularDestinationsSection() {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Destinos Más Populares</h2>
          <p className="text-xl text-muted-foreground">Los lugares mejor rankeados por nuestra comunidad</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularDestinations.map((destination) => (
            <Link key={destination.id} href={`/destinos/${destination.id}`}>
              <Card className="group overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-xl cursor-pointer h-full">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    {destination.rating}
                  </Badge>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-2xl font-bold mb-1">{destination.name}</h3>
                    <div className="flex items-center gap-1 text-sm opacity-90">
                      <MapPin className="w-3 h-3" />
                      {destination.country}
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <p className="text-muted-foreground">{destination.description}</p>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="font-medium">{destination.guides}</span>
                      <span className="text-muted-foreground">guías</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-accent" />
                      <span className="font-medium">{destination.tours}</span>
                      <span className="text-muted-foreground">tours</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
