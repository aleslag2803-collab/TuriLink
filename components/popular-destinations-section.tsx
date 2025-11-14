import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Users } from 'lucide-react'
import Link from "next/link"

const popularDestinations = [
  {
    id: 1,
    name: "Tulum",
    country: "Quintana Roo, México",
    rating: 4.9,
    guides: 52,
    tours: 145,
    image: "/tulum-mayan-ruins-beach-caribbean.jpg",
    description: "Ruinas mayas frente al mar Caribe",
  },
  {
    id: 2,
    name: "Playa del Carmen",
    country: "Quintana Roo, México",
    rating: 4.8,
    guides: 48,
    tours: 132,
    image: "/playa-del-carmen-quinta-avenida-beach.jpg",
    description: "Playas paradisíacas y vida cosmopolita",
  },
  {
    id: 3,
    name: "Isla Mujeres",
    country: "Quintana Roo, México",
    rating: 4.9,
    guides: 35,
    tours: 98,
    image: "/isla-mujeres-turquoise-water-caribbean.jpg",
    description: "Paraíso isleño con aguas turquesa",
  },
  {
    id: 4,
    name: "Bacalar",
    country: "Quintana Roo, México",
    rating: 5.0,
    guides: 28,
    tours: 76,
    image: "/bacalar-lagoon-seven-colors-mexico.jpg",
    description: "Laguna de los siete colores",
  },
  {
    id: 5,
    name: "Cozumel",
    country: "Quintana Roo, México",
    rating: 4.8,
    guides: 41,
    tours: 115,
    image: "/cozumel-island-coral-reef-diving.jpg",
    description: "Paraíso del buceo y arrecifes",
  },
  {
    id: 6,
    name: "Holbox",
    country: "Quintana Roo, México",
    rating: 4.9,
    guides: 32,
    tours: 82,
    image: "/holbox-island-beach-bioluminescence.jpg",
    description: "Isla virgen y bioluminiscencia",
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
