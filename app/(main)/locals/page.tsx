"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"

import { Star, Leaf, Search, MapPin, Utensils, Trees, Landmark, Mountain } from "lucide-react"
import { useLocals } from "@/app/providers"

const typeIcons = {
  restaurant: Utensils,
  natural: Trees,
  cultural: Landmark,
  adventure: Mountain,
}

export default function LocalsPage() {
  const { locals } = useLocals()

  return (
    <div className="p-6 lg:p-10 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Lugares por Descubrir</h1>
        <p className="text-lg text-muted-foreground">Explora rincones auténticos y experiencias locales únicas</p>
      </div>

      {/* Search & Filters */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input placeholder="Buscar lugares, restaurantes, sitios naturales..." className="pl-10" />
            </div>
          </div>
          <Button variant="outline">
            <Leaf className="w-4 h-4 mr-2" />
            Solo eco-friendly
          </Button>
          <Button variant="outline">Ver en Mapa</Button>
        </div>
      </Card>

      {/* Locals Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {locals.map((local) => {
          const IconComponent = typeIcons[local.type]
          return (
            <Card key={local.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-56 bg-muted">
                <img
                  src={local.images[0] || "/placeholder.svg"}
                  alt={local.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                  <Badge variant="secondary" className="bg-card/90 backdrop-blur">
                    <IconComponent className="w-3 h-3 mr-1" />
                    {local.type === "restaurant" && "Restaurante"}
                    {local.type === "natural" && "Natural"}
                    {local.type === "cultural" && "Cultural"}
                    {local.type === "adventure" && "Aventura"}
                  </Badge>
                  {local.ecoFriendly && (
                    <Badge className="bg-primary text-primary-foreground">
                      <Leaf className="w-3 h-3 mr-1" />
                      Eco
                    </Badge>
                  )}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-card-foreground mb-2">{local.name}</h3>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">{local.description}</p>

                <div className="flex items-center gap-3 mb-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="font-semibold">{local.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span className="truncate">{local.location.address}</span>
                  </div>
                </div>

                <Button asChild className="w-full">
                  <Link href={`/locals/${local.id}`}>Ver Detalles</Link>
                </Button>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Map Section */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-card-foreground mb-4">Mapa de Lugares</h2>
        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">Mapa interactivo (simulado con Google Maps API)</p>
          </div>
        </div>
      </Card>

      {/* CTA */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8 border-primary/20">
        <div className="text-center max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-foreground mb-3">¿Conoces un lugar especial?</h3>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Comparte tus lugares favoritos con la comunidad de TuriLink
          </p>
          <Button asChild size="lg">
            <Link href="/locals/new">Agregar Lugar</Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}
