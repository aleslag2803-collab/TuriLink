"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Clock, Users, MapPin } from "lucide-react"
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

// 🔹 Tipo para solicitudes de tours personalizados
type CustomTourRequest = {
  id: string
  tourTitle: string
  touristName: string
  email: string
  phone?: string
  date: string
  time: string
  people: number
  area: string
  meetingPoint: string
  notes?: string
  estimatedPricePerPerson: number
  estimatedTotal: number
  status: "pending" | "accepted" | "rejected"
}

// tours iniciales (mock)
const DEFAULT_TOURS: Tour[] = [
  {
    id: "1",
    title: "Tour por el Centro de Cancún",
    type: "Grupal",
    price: 350,
    duration: "3 horas",
    maxGuests: 15,
    bookings: 8,
    status: "active",
    rating: 4.9,
    reviews: 45,
    meetingPoint: "Crucero, frente a la plaza",
    description: "Recorrido guiado por el corazón del centro de Cancún",
    includes: "Guía certificado, agua embotellada, entradas a museos seleccionados",
    packageType: "Clásico",
    paidBookings: 6,
    pendingBookings: 1,
    acceptedUnpaidBookings: 1,
    relatedPlaces: ["Parque de las palapas", "Palacio Municipal", "Centro"],
    images: ["/miradorzh.jpg", "/hardrock.jpeg", "/coco-bongo-cancun.jpg"],
  },
  {
    id: "2",
    title: "Gastronomía de Cancún",
    type: "Individual",
    price: 750,
    duration: "4 horas",
    maxGuests: 6,
    bookings: 5,
    status: "active",
    rating: 5.0,
    reviews: 32,
    meetingPoint: "Mercado 28",
    description: "Tour gastronómico por los mejores mercados y fondas tradicionales de Cancún.",
    includes: "Degustaciones, guía gastronómico, bebida tradicional",
    packageType: "Premium",
    paidBookings: 4,
    pendingBookings: 1,
    acceptedUnpaidBookings: 0,
    relatedPlaces: ["Mercado 28", "Zona centro"],
    images: ["/miradorzh.jpg", "/hardrock.jpeg", "/coco-bongo-cancun.jpg"],
  },
  {
    id: "3",
    title: "Arte y Murales de Cancún",
    type: "Grupal",
    price: 400,
    duration: "3.5 horas",
    maxGuests: 12,
    bookings: 12,
    status: "active",
    rating: 4.8,
    reviews: 67,
    meetingPoint: "Zona centro",
    description: "Descubre los murales más emblemáticos de la ciudad con contexto histórico y artístico.",
    includes: "Entradas, guía especializado en arte urbano",
    packageType: "Clásico",
    paidBookings: 9,
    pendingBookings: 2,
    acceptedUnpaidBookings: 1,
    relatedPlaces: ["Centro", "Zona hotelera (murales)"],
    images: ["/miradorzh.jpg", "/hardrock.jpeg", "/coco-bongo-cancun.jpg"],
  },
  {
    id: "4",
    title: "Tour por los parques principales",
    type: "Privado",
    price: 1200,
    duration: "5 horas",
    maxGuests: 8,
    bookings: 3,
    status: "active",
    rating: 4.9,
    reviews: 28,
    meetingPoint: "Pick up en hotel",
    description: "Recorrido por los parques y áreas verdes más importantes de Cancún.",
    includes: "Transporte, guía, hidratación ligera",
    packageType: "VIP",
    paidBookings: 2,
    pendingBookings: 1,
    acceptedUnpaidBookings: 0,
    relatedPlaces: ["Parques urbanos", "Malecón Tajamar"],
    images: ["/miradorzh.jpg", "/hardrock.jpeg", "/coco-bongo-cancun.jpg"],
  },
]

// 🔹 Solicitudes de tours personalizados de ejemplo
const DEFAULT_CUSTOM_REQUESTS: CustomTourRequest[] = [
  {
    id: "req-1",
    tourTitle: "Tour personalizado Zona Hotelera (Mirador, Hard Rock y Coco Bongo)",
    touristName: "Ana Rodríguez",
    email: "ana@example.com",
    phone: "+52 55 1234 5678",
    date: "2025-02-18",
    time: "20:00",
    people: 4,
    area: "Zona Hotelera",
    meetingPoint: "Lobby del hotel en km 10",
    notes: "Le gustaría hacer más tiempo en el mirador para fotos y llegar a Coco Bongo antes del show principal.",
    estimatedPricePerPerson: 850,
    estimatedTotal: 3400,
    status: "pending",
  },
  {
    id: "req-2",
    tourTitle: "Atardecer en Playa Delfines con cena ligera",
    touristName: "Carlos Gómez",
    email: "carlos@example.com",
    phone: "+52 81 9876 5432",
    date: "2025-02-20",
    time: "17:30",
    people: 2,
    area: "Playa Delfines / Zona Hotelera",
    meetingPoint: "Parada de autobús frente a Playa Delfines",
    notes: "Solicita opción vegetariana en la cena.",
    estimatedPricePerPerson: 650,
    estimatedTotal: 1300,
    status: "accepted",
  },
  // 🔹 Nueva solicitud pendiente
  {
    id: "req-3",
    tourTitle: "Experiencia nocturna en Cancún centro y Zona Hotelera",
    touristName: "María López",
    email: "maria@example.com",
    phone: "+52 33 7654 3210",
    date: "2025-02-22",
    time: "19:00",
    people: 3,
    area: "Centro y Zona Hotelera",
    meetingPoint: "Parque de las Palapas",
    notes: "Quiere incluir una parada para cenar tacos locales antes de ir a la zona hotelera.",
    estimatedPricePerPerson: 700,
    estimatedTotal: 2100,
    status: "pending",
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

  const [customRequests, setCustomRequests] = useState<CustomTourRequest[]>(DEFAULT_CUSTOM_REQUESTS)

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
        images: ["/miradorzh.jpg", "/hardrock.jpeg", "/coco-bongo-cancun.jpg"],
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

  const handleAcceptRequest = (id: string) => {
    setCustomRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "accepted" } : req)),
    )
  }

  const handleRejectRequest = (id: string) => {
    setCustomRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "rejected" } : req)),
    )
  }

  const pendingRequests = customRequests.filter((r) => r.status === "pending")
  const acceptedRequests = customRequests.filter((r) => r.status === "accepted")

  const isEditing = Boolean(editingId)

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Tours</h1>
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
                  placeholder="Ej: Tour Zona Hotelera"
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
                  placeholder="Ej: Lobby del hotel"
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
                  placeholder="Ej: Guía certificado, transportes, entradas..."
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

     <div>
          <h1 className="text-xl font-bold mb-2">Tours Personalizados</h1>
          <p className="text-muted-foreground">Tours creados</p>
        </div>
      {/* 🔹 Card: Solicitudes de tours personalizados */}
      <Card>
        <CardHeader>
          <CardTitle>Solicitudes de tours personalizados</CardTitle>
        </CardHeader>
        <CardContent>
          {pendingRequests.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No tienes solicitudes de tours personalizados pendientes en este momento.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Turista</th>
                    <th className="text-left py-3 px-4 font-semibold">Tour</th>
                    <th className="text-left py-3 px-4 font-semibold">Fecha / Hora</th>
                    <th className="text-right py-3 px-4 font-semibold">Personas</th>
                    <th className="text-left py-3 px-4 font-semibold">Zona</th>
                    <th className="text-right py-3 px-4 font-semibold">Total Estimado</th>
                    <th className="text-center py-3 px-4 font-semibold">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingRequests.map((req) => (
                    <tr
                      key={req.id}
                      className="border-b last:border-0 hover:bg-muted/40 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="font-medium">{req.touristName}</div>
                        <div className="text-xs text-muted-foreground">{req.email}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium line-clamp-2">{req.tourTitle}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div>{req.date}</div>
                        <div className="text-xs text-muted-foreground">{req.time} hrs</div>
                      </td>
                      <td className="py-3 px-4 text-right">{req.people}</td>
                      <td className="py-3 px-4">{req.area}</td>
                      <td className="py-3 px-4 text-right font-semibold">
                        ${req.estimatedTotal.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-col gap-2 items-center justify-center md:flex-row md:justify-end">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                Ver detalle
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                              <DialogHeader>
                                <DialogTitle>Detalle de la solicitud</DialogTitle>
                                <DialogDescription>
                                  Tour personalizado solicitado por {req.touristName}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-2 text-sm mt-2">
                                <p>
                                  <span className="font-semibold">Tour:</span> {req.tourTitle}
                                </p>
                                <p>
                                  <span className="font-semibold">Fecha y hora:</span> {req.date} -{" "}
                                  {req.time} hrs
                                </p>
                                <p>
                                  <span className="font-semibold">Personas:</span> {req.people}
                                </p>
                                <p>
                                  <span className="font-semibold">Zona:</span> {req.area}
                                </p>
                                <p>
                                  <span className="font-semibold">Punto de encuentro:</span>{" "}
                                  {req.meetingPoint}
                                </p>
                                {req.phone && (
                                  <p>
                                    <span className="font-semibold">Teléfono:</span> {req.phone}
                                  </p>
                                )}
                                {req.notes && (
                                  <p>
                                    <span className="font-semibold">Notas del turista:</span>{" "}
                                    {req.notes}
                                  </p>
                                )}
                                <p className="pt-2">
                                  <span className="font-semibold">
                                    Precio estimado por persona:
                                  </span>{" "}
                                  ${req.estimatedPricePerPerson.toLocaleString()} MXN
                                </p>
                                <p>
                                  <span className="font-semibold">Total estimado:</span>{" "}
                                  ${req.estimatedTotal.toLocaleString()} MXN
                                </p>
                              </div>
                              <DialogFooter className="mt-4 flex justify-end gap-2">
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => handleRejectRequest(req.id)}
                                >
                                  No aceptar
                                </Button>
                                <Button
                                  type="button"
                                  onClick={() => handleAcceptRequest(req.id)}
                                >
                                  Aceptar tour
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          <Button
                            size="sm"
                            className="bg-green-eco text-primary-foreground"
                            onClick={() => handleAcceptRequest(req.id)}
                          >
                            Aceptar
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 🔹 Lista de tours personalizados aceptados */}
      <Card>
        <CardHeader>
          <CardTitle>Tours personalizados aceptados</CardTitle>
        </CardHeader>
        <CardContent>
          {acceptedRequests.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Aún no has aceptado ningún tour personalizado.
            </p>
          ) : (
            <div className="space-y-3">
              {acceptedRequests.map((req) => (
                <div
                  key={req.id}
                  className="flex flex-col md:flex-row md:items-center md:justify-between p-3 border rounded-lg"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{req.tourTitle}</span>
                      <Badge variant="secondary">Aceptado</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {req.date} · {req.time} hrs · {req.people} personas · {req.area}
                    </p>
                    <p className="text-sm">
                      Total:{" "}
                      <span className="font-semibold">
                        ${req.estimatedTotal.toLocaleString()} MXN
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Turista: {req.touristName} · {req.email}
                    </p>
                  </div>
                  <div className="mt-2 md:mt-0 flex justify-start md:justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        router.push(
                          `/guia/tours?focus=custom&requestId=${encodeURIComponent(req.id)}`,
                        )
                      }
                    >
                      Ver en agenda
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Lista de tours normales */}
              <div>
          <h1 className="text-xl font-bold mb-2">Mis tours</h1>
          <p className="text-muted-foreground">Tours creados</p>
        </div>
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
