"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Clock, Users, MapPin, Pencil } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
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

const STORAGE_KEY = "turiLink_tours"

export type Tour = {
  id: string
  title: string
  type: string
  price: number
  duration: string
  maxGuests: number
  bookings: number
  status: "active" | "inactive"
  rating: number
  reviews: number
  meetingPoint?: string
  description?: string
  includes?: string
  // extras para el módulo de gestión
  packageType?: string
  paidBookings?: number
  pendingBookings?: number
  acceptedUnpaidBookings?: number
  relatedPlaces?: string[]
  images?: string[]
}

// tours iniciales (mock)
const DEFAULT_TOURS: Tour[] = [
  {
    id: "1",
    title: "Tour Histórico Centro CDMX",
    type: "Grupal",
    price: 350,
    duration: "3 horas",
    maxGuests: 15,
    bookings: 8,
    status: "active",
    rating: 4.9,
    reviews: 45,
    meetingPoint: "Zócalo, frente a la Catedral",
    description:
      "Recorrido guiado por el corazón histórico de la Ciudad de México con paradas en los principales monumentos.",
    includes: "Guía certificado, agua embotellada, entradas a museos seleccionados",
    packageType: "Clásico",
    paidBookings: 6,
    pendingBookings: 1,
    acceptedUnpaidBookings: 1,
    relatedPlaces: ["Catedral Metropolitana", "Palacio Nacional", "Templo Mayor"],
    images: ["/miradorzh.jpg", "/hardrock.jpeg", "/coco-bongo-cancun.jpg"],
  },
  {
    id: "2",
    title: "Gastronomía de Coyoacán",
    type: "Individual",
    price: 750,
    duration: "4 horas",
    maxGuests: 6,
    bookings: 5,
    status: "active",
    rating: 5.0,
    reviews: 32,
    meetingPoint: "Jardín Centenario, junto a la fuente de los coyotes",
    description: "Tour gastronómico por los mejores mercados y fondas tradicionales de Coyoacán.",
    includes: "Degustaciones, guía gastronómico, bebida tradicional",
    packageType: "Premium",
    paidBookings: 4,
    pendingBookings: 1,
    acceptedUnpaidBookings: 0,
    relatedPlaces: ["Mercado de Coyoacán", "Centro de Coyoacán"],
    images: ["/miradorzh.jpg", "/hardrock.jpeg", "/coco-bongo-cancun.jpg"],
  },
  {
    id: "3",
    title: "Arte y Murales de CDMX",
    type: "Grupal",
    price: 400,
    duration: "3.5 horas",
    maxGuests: 12,
    bookings: 12,
    status: "active",
    rating: 4.8,
    reviews: 67,
    meetingPoint: "Museo Mural Diego Rivera",
    description: "Descubre los murales más emblemáticos de la ciudad con contexto histórico y artístico.",
    includes: "Entradas, guía especializado en arte",
    packageType: "Clásico",
    paidBookings: 9,
    pendingBookings: 2,
    acceptedUnpaidBookings: 1,
    relatedPlaces: ["Palacio de Bellas Artes", "Centro Histórico"],
    images: ["/miradorzh.jpg", "/hardrock.jpeg", "/coco-bongo-cancun.jpg"],
  },
  {
    id: "4",
    title: "Xochimilco y Trajineras",
    type: "Privado",
    price: 1200,
    duration: "5 horas",
    maxGuests: 8,
    bookings: 3,
    status: "active",
    rating: 4.9,
    reviews: 28,
    meetingPoint: "Embarcadero Nuevo Nativitas",
    description: "Experiencia privada en trajinera con música, comida y visita a invernaderos.",
    includes: "Renta de trajinera, guía, degustación de comida típica",
    packageType: "VIP",
    paidBookings: 2,
    pendingBookings: 1,
    acceptedUnpaidBookings: 0,
    relatedPlaces: ["Xochimilco", "Viveros locales"],
    images: ["/miradorzh.jpg", "/hardrock.jpeg", "/coco-bongo-cancun.jpg"],
  },
]

const INITIAL_FORM = {
  nombre: "",
  tipo: "",
  duracion: "",
  precio: "",
  maxPersonas: "",
  ubicacion: "",
  descripcion: "",
  incluye: "",
}

export default function ToursPage() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [tours, setTours] = useState<Tour[]>(() => {
    if (typeof window === "undefined") return DEFAULT_TOURS
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as Tour[]
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed
        }
      }
    } catch {
      // nada, usamos default
    }
    return DEFAULT_TOURS
  })

  const [form, setForm] = useState(INITIAL_FORM)

  useEffect(() => {
    if (typeof window === "undefined") return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tours))
  }, [tours])

  const resetForm = () => {
    setForm(INITIAL_FORM)
    setEditingId(null)
  }

  const handleChange =
    (field: keyof typeof INITIAL_FORM) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }))
    }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) resetForm()
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (!form.nombre.trim()) return

    if (editingId) {
      // actualizar tour existente
      setTours((prev) =>
        prev.map((tour) =>
          tour.id === editingId
            ? {
                ...tour,
                title: form.nombre.trim(),
                type: form.tipo || tour.type,
                price: Number(form.precio) || tour.price,
                duration: form.duracion || tour.duration,
                maxGuests: Number(form.maxPersonas) || tour.maxGuests,
                meetingPoint: form.ubicacion,
                description: form.descripcion,
                includes: form.incluye,
              }
            : tour,
        ),
      )
    } else {
      // crear tour nuevo
      const newTour: Tour = {
        id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
        title: form.nombre.trim(),
        type: form.tipo || "Grupal",
        price: Number(form.precio) || 0,
        duration: form.duracion || "Sin especificar",
        maxGuests: Number(form.maxPersonas) || 1,
        bookings: 0,
        status: "active",
        rating: 5.0,
        reviews: 0,
        meetingPoint: form.ubicacion,
        description: form.descripcion,
        includes: form.incluye,
        packageType: "Básico",
        paidBookings: 0,
        pendingBookings: 0,
        acceptedUnpaidBookings: 0,
        relatedPlaces: [],
        images: ["/miradorzh.jpg", "/hardrock.jpeg", "/coco-bongo-cancun.jpg"], // si quieres que los nuevos ya traigan estas por defecto
      }
      setTours((prev) => [newTour, ...prev])
    }

    setIsOpen(false)
    resetForm()
  }

  const handleEdit = (tour: Tour) => {
    setEditingId(tour.id)
    setForm({
      nombre: tour.title,
      tipo: tour.type,
      duracion: tour.duration,
      precio: tour.price.toString(),
      maxPersonas: tour.maxGuests.toString(),
      ubicacion: tour.meetingPoint ?? "",
      descripcion: tour.description ?? "",
      incluye: tour.includes ?? "",
    })
    setIsOpen(true)
  }

  const isEditing = Boolean(editingId)

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Mis Tours</h1>
          <p className="text-muted-foreground">Gestiona y crea tus tours turísticos</p>
        </div>

        {/* Dialog Crear / Editar */}
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
          <DialogTrigger
            asChild
            onClick={() => {
              resetForm()
            }}
          >
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Crear Nuevo Tour
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Editar Tour" : "Crear Nuevo Tour"}</DialogTitle>
              <DialogDescription>
                {isEditing
                  ? "Actualiza la información básica de tu tour."
                  : "Completa la información para crear un tour atractivo."}
              </DialogDescription>
            </DialogHeader>

            <form className="space-y-4 mt-2" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre del Tour</Label>
                <Input
                  id="nombre"
                  placeholder="Ej: Tour Histórico por el Centro"
                  value={form.nombre}
                  onChange={handleChange("nombre")}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo de Tour</Label>
                  <Select
                    value={form.tipo}
                    onValueChange={(value) => setForm((prev) => ({ ...prev, tipo: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Grupal">Grupal</SelectItem>
                      <SelectItem value="Individual">Individual</SelectItem>
                      <SelectItem value="Privado">Privado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duracion">Duración</Label>
                  <Input
                    id="duracion"
                    placeholder="Ej: 3 horas"
                    value={form.duracion}
                    onChange={handleChange("duracion")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="precio">Precio por Persona</Label>
                  <Input
                    id="precio"
                    type="number"
                    placeholder="350"
                    value={form.precio}
                    onChange={handleChange("precio")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max-personas">Máx. Personas</Label>
                  <Input
                    id="max-personas"
                    type="number"
                    placeholder="10"
                    value={form.maxPersonas}
                    onChange={handleChange("maxPersonas")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ubicacion">Punto de Encuentro</Label>
                <Input
                  id="ubicacion"
                  placeholder="Ej: Zócalo, frente a la Catedral"
                  value={form.ubicacion}
                  onChange={handleChange("ubicacion")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción</Label>
                <Textarea
                  id="descripcion"
                  rows={4}
                  placeholder="Describe qué incluye el tour, qué verán, qué experiencia tendrán..."
                  value={form.descripcion}
                  onChange={handleChange("descripcion")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="incluye">¿Qué Incluye?</Label>
                <Textarea
                  id="incluye"
                  rows={3}
                  placeholder="Ej: Guía certificado, agua embotellada, entradas..."
                  value={form.incluye}
                  onChange={handleChange("incluye")}
                />
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsOpen(false)
                    resetForm()
                  }}
                >
                  Cancelar
                </Button>
                <Button type="submit">{isEditing ? "Guardar cambios" : "Crear Tour"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de tours */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour) => (
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

              <div className="flex pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent"
                  onClick={() => router.push(`/guia/tours/${tour.id}`)}
                >
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
