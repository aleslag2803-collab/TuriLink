import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, MessageCircle, Filter, Search } from 'lucide-react'
import Link from "next/link"
import { Input } from "@/components/ui/input"

const allGuides = [
  {
    id: 1,
    name: "María Elena Ceh",
    location: "Tulum, Quintana Roo",
    rating: 4.9,
    reviews: 234,
    tours: 12,
    specialties: ["Historia Maya", "Cenotes", "Ecología"],
    image: "/mexican-female-tour-guide-mayan-ruins.jpg",
    verified: true,
    priceRange: "$$",
  },
  {
    id: 2,
    name: "José Luis Cauich",
    location: "Playa del Carmen, Quintana Roo",
    rating: 5.0,
    reviews: 189,
    tours: 8,
    specialties: ["Snorkel", "Cultura Maya", "Gastronomía"],
    image: "/mexican-male-tour-guide-caribbean-beach.jpg",
    verified: true,
    priceRange: "$$",
  },
  {
    id: 3,
    name: "Gabriela Poot",
    location: "Bacalar, Quintana Roo",
    rating: 4.8,
    reviews: 312,
    tours: 15,
    specialties: ["Laguna", "Naturaleza", "Kayak"],
    image: "/mexican-female-guide-lagoon-bacalar.jpg",
    verified: true,
    priceRange: "$$$",
  },
  {
    id: 4,
    name: "Roberto May",
    location: "Felipe Carrillo Puerto, Quintana Roo",
    rating: 4.9,
    reviews: 167,
    tours: 10,
    specialties: ["Comunidades Mayas", "Artesanías", "Selva"],
    image: "/mexican-indigenous-male-guide-jungle.jpg",
    verified: true,
    priceRange: "$",
  },
  {
    id: 5,
    name: "Ana Sofía Uc",
    location: "Cozumel, Quintana Roo",
    rating: 4.9,
    reviews: 201,
    tours: 18,
    specialties: ["Buceo", "Arrecifes", "Vida Marina"],
    image: "/mexican-female-tour-guide-mayan-ruins.jpg",
    verified: true,
    priceRange: "$$$",
  },
  {
    id: 6,
    name: "Pedro Canul",
    location: "Holbox, Quintana Roo",
    rating: 5.0,
    reviews: 156,
    tours: 9,
    specialties: ["Tiburón Ballena", "Kayak", "Bioluminiscencia"],
    image: "/mexican-male-tour-guide-caribbean-beach.jpg",
    verified: true,
    priceRange: "$$",
  },
  {
    id: 7,
    name: "Carmen Dzul",
    location: "Puerto Morelos, Quintana Roo",
    rating: 4.7,
    reviews: 143,
    tours: 11,
    specialties: ["Snorkel", "Cenotes", "Fotografía"],
    image: "/mexican-female-guide-lagoon-bacalar.jpg",
    verified: true,
    priceRange: "$$",
  },
  {
    id: 8,
    name: "Miguel Cupul",
    location: "Cobá, Quintana Roo",
    rating: 4.8,
    reviews: 178,
    tours: 14,
    specialties: ["Arqueología", "Historia Maya", "Senderismo"],
    image: "/mexican-indigenous-male-guide-jungle.jpg",
    verified: true,
    priceRange: "$",
  },
]

export default function GuiasPage() {
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-background py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Todos los Guías</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Encuentra al guía perfecto para tu aventura en Quintana Roo
          </p>
          
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 max-w-3xl">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Buscar por nombre, ubicación o especialidad..." 
                className="pl-10 h-12"
              />
            </div>
            <Button variant="outline" className="h-12 px-6">
              <Filter className="w-5 h-5 mr-2" />
              Filtros
            </Button>
          </div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 text-muted-foreground">
            Mostrando {allGuides.length} guías verificados
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {allGuides.map((guide) => (
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
                    <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                      Verificado
                    </Badge>
                  )}
                  <Badge className="absolute top-3 left-3 bg-background/90 text-foreground">
                    {guide.priceRange}
                  </Badge>
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
        </div>
      </section>
    </div>
  )
}
