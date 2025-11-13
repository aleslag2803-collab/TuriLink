"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Plus, ThumbsUp, Utensils, Coffee, ShoppingBag, Home } from "lucide-react"

export default function RecomendacionesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Mis Recomendaciones</h1>
          <p className="text-muted-foreground">Comparte tus lugares favoritos con los turistas</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Agregar Lugar
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            name: "Café de Tacuba",
            category: "Restaurante",
            icon: Utensils,
            address: "Tacuba 28, Centro Histórico",
            likes: 45,
            description: "Comida tradicional mexicana en un ambiente histórico",
          },
          {
            name: "Museo Frida Kahlo",
            category: "Museo",
            icon: Home,
            address: "Londres 247, Del Carmen",
            likes: 89,
            description: "La Casa Azul, hogar de Frida Kahlo",
          },
          {
            name: "Mercado de San Juan",
            category: "Mercado",
            icon: ShoppingBag,
            address: "Ernesto Pugibet 21, Centro",
            likes: 67,
            description: "Ingredientes exóticos y comida gourmet",
          },
          {
            name: "Café Avellaneda",
            category: "Cafetería",
            icon: Coffee,
            address: "Álvaro Obregón 88, Roma Norte",
            likes: 34,
            description: "Café de especialidad y ambiente acogedor",
          },
        ].map((place, idx) => {
          const Icon = place.icon
          return (
            <Card key={idx} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <Badge variant="secondary">{place.category}</Badge>
                </div>
                <CardTitle className="text-lg">{place.name}</CardTitle>
                <CardDescription>{place.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{place.address}</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="w-4 h-4 text-primary" />
                    <span className="font-semibold">{place.likes}</span>
                    <span className="text-sm text-muted-foreground">likes</span>
                  </div>
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}

        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center h-full py-12">
            <MapPin className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-2">Agrega un Lugar</h3>
            <p className="text-sm text-muted-foreground text-center mb-4">
              Recomienda restaurantes, museos, cafés o tiendas locales
            </p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Agregar Recomendación
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
