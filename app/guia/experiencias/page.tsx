"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Plus, Clock, Users, Heart } from "lucide-react"

export default function ExperienciasPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Experiencias</h1>
          <p className="text-muted-foreground">Crea experiencias únicas más allá de los tours tradicionales</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Nueva Experiencia
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Clase de Cocina Mexicana",
            description: "Aprende a preparar auténticos platillos mexicanos",
            price: 890,
            duration: "3 horas",
            capacity: 8,
            bookings: 12,
          },
          {
            title: "Taller de Artesanías",
            description: "Crea tu propia artesanía con técnicas tradicionales",
            price: 650,
            duration: "2.5 horas",
            capacity: 6,
            bookings: 8,
          },
        ].map((exp, idx) => (
          <Card key={idx} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <Sparkles className="w-8 h-8 text-accent" />
                <Badge variant="secondary">Experiencia</Badge>
              </div>
              <CardTitle className="text-lg">{exp.title}</CardTitle>
              <CardDescription>{exp.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {exp.duration}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  Hasta {exp.capacity} personas
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Heart className="w-4 h-4" />
                  {exp.bookings} reservas
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <div className="text-2xl font-bold">${exp.price}</div>
                  <div className="text-xs text-muted-foreground">MXN por persona</div>
                </div>
                <Button variant="outline" size="sm">
                  Editar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center h-full py-12">
            <Sparkles className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-2">Crea una Experiencia</h3>
            <p className="text-sm text-muted-foreground text-center mb-4">
              Ofrece algo único que vaya más allá de un tour tradicional
            </p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Crear Experiencia
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
