"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Clock, Users, MapPin, Pencil } from "lucide-react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ToursPage() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Mis Tours</h1>
          <p className="text-muted-foreground">Gestiona y crea tus tours turísticos</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Crear Nuevo Tour
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Tour</DialogTitle>
              <DialogDescription>Completa la información para crear un tour atractivo</DialogDescription>
            </DialogHeader>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre del Tour</Label>
                <Input id="nombre" placeholder="Ej: Tour Histórico por el Centro" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo de Tour</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grupal">Grupal</SelectItem>
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="privado">Privado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duracion">Duración</Label>
                  <Input id="duracion" placeholder="Ej: 3 horas" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="precio">Precio por Persona</Label>
                  <Input id="precio" type="number" placeholder="350" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max-personas">Máx. Personas</Label>
                  <Input id="max-personas" type="number" placeholder="10" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ubicacion">Punto de Encuentro</Label>
                <Input id="ubicacion" placeholder="Ej: Zócalo, frente a la Catedral" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción</Label>
                <Textarea
                  id="descripcion"
                  rows={4}
                  placeholder="Describe qué incluye el tour, qué verán, qué experiencia tendrán..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="incluye">¿Qué Incluye?</Label>
                <Textarea id="incluye" rows={3} placeholder="Ej: Guía certificado, agua embotellada, entradas..." />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Crear Tour</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            id: 1,
            title: "Tour Histórico Centro CDMX",
            type: "Grupal",
            price: 350,
            duration: "3 horas",
            maxGuests: 15,
            bookings: 8,
            status: "active",
            rating: 4.9,
            reviews: 45,
          },
          {
            id: 2,
            title: "Gastronomía de Coyoacán",
            type: "Individual",
            price: 750,
            duration: "4 horas",
            maxGuests: 6,
            bookings: 5,
            status: "active",
            rating: 5.0,
            reviews: 32,
          },
          {
            id: 3,
            title: "Arte y Murales de CDMX",
            type: "Grupal",
            price: 400,
            duration: "3.5 horas",
            maxGuests: 12,
            bookings: 12,
            status: "active",
            rating: 4.8,
            reviews: 67,
          },
          {
            id: 4,
            title: "Xochimilco y Trajineras",
            type: "Privado",
            price: 1200,
            duration: "5 horas",
            maxGuests: 8,
            bookings: 3,
            status: "active",
            rating: 4.9,
            reviews: 28,
          },
        ].map((tour) => (
          <Card key={tour.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{tour.title}</CardTitle>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{tour.type}</Badge>
                    <Badge className="bg-green-eco text-primary-foreground">Activo</Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {tour.duration}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  Máx. {tour.maxGuests} personas
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {tour.bookings} reservas activas
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <div className="text-2xl font-bold">${tour.price}</div>
                  <div className="text-xs text-muted-foreground">MXN por persona</div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">{tour.rating}</span>
                    <span className="text-accent">★</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{tour.reviews} reseñas</div>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Pencil className="w-4 h-4 mr-2" />
                  Editar
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Ver Detalles
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
