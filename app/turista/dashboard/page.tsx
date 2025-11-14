"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Star, Heart, Clock, Users, Search, Sparkles } from 'lucide-react'
import Link from "next/link"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useRouter } from 'next/navigation'

export default function TouristDashboard() {
  // extraer los tours a una constante para reutilizar y tipar
  const featuredTours = [
    { 
      title: "Sabores y Mercado 28 en Downtown Cancún",
      image: "/El-Huerto-Del-Eden.jpg",
      guide: "Mariana López",
      price: "$420",
      rating: 4.8,
      reviews: 203,
      duration: "3 horas",
      category: "Cultura y Gastronomía",
    },
    { 
      title: "Noche en Parque de las Palapas y Avenida Tulum",
      image: "/El-Oasis-Mariscos-Cancun.jpg",
      guide: "Jorge Hernández",
      price: "$380",
      rating: 4.9,
      reviews: 187,
      duration: "3.5 horas",
      category: "Vida local",
    },
    { 
      title: "Museo Maya de Cancún y Zona Arqueológica San Miguelito",
      image: "/Freds-Restaurant.jpg",
      guide: "Ana Martínez",
      price: "$520",
      rating: 5.0,
      reviews: 142,
      duration: "4 horas",
      category: "Historia",
    },
    { 
      title: "Atardecer en Malecón Tajamar y Mirador de la Laguna",
      image: "/La-Coyota-Cancun.jpg",
      guide: "Ricardo González",
      price: "$390",
      rating: 4.7,
      reviews: 121,
      duration: "2.5 horas",
      category: "Paisajes",
    },
    { 
      title: "Playas y Faro de Punta Cancún",
      image: "/playas-faro-punta-cancun.jpg",
      guide: "Laura Pérez",
      price: "$450",
      rating: 4.9,
      reviews: 264,
      duration: "3 horas",
      category: "Aventura y Playa",
    },
  ]

  // búsqueda
  const [searchTerm, setSearchTerm] = useState<string>("")

  // Filtrado simple (case-insensitive) por título, guía o categoría
  const filteredTours = featuredTours.filter((tour) => {
    if (!searchTerm.trim()) return true
    const q = searchTerm.toLowerCase()
    return (
      tour.title.toLowerCase().includes(q) ||
      tour.guide.toLowerCase().includes(q) ||
      tour.category.toLowerCase().includes(q)
    )
  })

  // Estado para reservas y para resaltar la última reserva
  const [bookings, setBookings] = useState<typeof featuredTours[number][]>([])
  const [lastBookedTitle, setLastBookedTitle] = useState<string | null>(null)

  // Cargar reservas desde localStorage al montar
  useEffect(() => {
    try {
      const raw = localStorage.getItem("turilink_bookings")
      if (raw) {
        const parsed = JSON.parse(raw) as typeof featuredTours[number][]
        setBookings(parsed)
        if (parsed.length > 0) setLastBookedTitle(parsed[0].title)
      }
    } catch (e) {
      console.error("Error leyendo reservas desde localStorage", e)
    }
  }, [])

  const [selectedTour, setSelectedTour] = useState<typeof featuredTours[0] | null>(null)
  const router = useRouter()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Explora México</h1>
          <p className="text-muted-foreground">Descubre experiencias auténticas con guías locales</p>
        </div>
        <Button asChild className="gap-2">
          <Link href="/turista/ia-planner">
            <Sparkles className="w-4 h-4" />
            Planificar con IA
          </Link>
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Próximas Reservas</CardTitle>
            <Calendar className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground mt-1">Tours confirmados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tours Realizados</CardTitle>
            <MapPin className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">Experiencias completadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Favoritos</CardTitle>
            <Heart className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground mt-1">Tours guardados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Puntos Viajero</CardTitle>
            <Star className="w-4 h-4 text-accent fill-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">850</div>
            <p className="text-xs text-muted-foreground mt-1">Nivel: Gold</p>
          </CardContent>
        </Card>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar tours, experiencias, destinos..."
                className="pl-10"
                aria-label="Buscar tours"
              />
            </div>
            <Button>Buscar</Button>
            <Button variant="outline">Filtros</Button>
          </div>
        </CardContent>
      </Card>

      {/* Featured Tours */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Tours Destacados</h2>
          <Button variant="outline" asChild>
            <Link href="/turista/reservas">Ver Todos</Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {filteredTours.length === 0 ? (
            <div className="col-span-full p-6 bg-muted rounded-md text-center">
              No se encontraron tours para "<span className="font-semibold">{searchTerm}</span>"
            </div>
          ) : (
            filteredTours.map((tour, idx) => (
               <Card key={idx} className="overflow-hidden hover:shadow-lg transition-shadow">
                 <div className="relative h-48 bg-muted overflow-hidden">
                   {/* imagen del tour */}
                   <Image src={tour.image || "/placeholder.svg"} alt={tour.title} fill className="object-cover" />
                   {/* overlay para badge */}
                   <div className="absolute inset-0 bg-black/10"></div>
                   <Badge className="absolute top-3 right-3 bg-background/90 backdrop-blur z-10">{tour.category}</Badge>
                 </div>
                 <CardHeader>
                   <CardTitle className="text-lg">{tour.title}</CardTitle>
                   <CardDescription>
                     <div className="flex items-center gap-2 mt-2">
                       <div className="flex items-center gap-1">
                         <Star className="w-4 h-4 text-accent fill-accent" />
                         <span className="font-semibold">{tour.rating}</span>
                         <span className="text-xs">({tour.reviews})</span>
                       </div>
                       <span className="text-xs">•</span>
                       <span className="text-xs">{tour.guide}</span>
                     </div>
                   </CardDescription>
                 </CardHeader>
                 <CardContent className="space-y-4">
                   <div className="flex items-center justify-between">
                     <div>
                       <div className="text-2xl font-bold text-primary">{tour.price}</div>
                       <div className="text-xs text-muted-foreground">MXN por persona</div>
                     </div>
                     <div className="flex items-center gap-1 text-sm text-muted-foreground">
                       <Clock className="w-4 h-4" />
                       {tour.duration}
                     </div>
                   </div>

                   <div className="flex gap-2">
                     <Button
                       className="flex-1"
                       onClick={() => {
                         const tourData = encodeURIComponent(JSON.stringify(tour))
                         router.push(`/turista/reservar?tour=${tourData}`)
                       }}
                     >
                       Reservar Ahora
                     </Button>

                     <Button variant="outline" onClick={() => setSelectedTour(tour)} className="flex-1">
                       Más info
                     </Button>
                   </div>
                 </CardContent>
               </Card>
             ))
           )}
         </div>
       </div>

      {/* Next Booking (muestra la reserva más reciente y lista de reservas con contraste en la última) */}
      <Card>
        <CardHeader>
          <CardTitle>Tu Próximo Tour</CardTitle>
          <CardDescription>Preparate para tu próxima aventura</CardDescription>
        </CardHeader>
        <CardContent>
          {bookings.length === 0 ? (
            // contenido estático original cuando no hay reservas
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="space-y-3 flex-1">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold">Tour Histórico Centro CDMX</h3>
                    <Badge className="bg-green-eco text-primary-foreground">Confirmado</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Guía: Carlos Mendoza</p>
                </div>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    25 Enero 2025
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    10:00 AM
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />2 personas
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between items-end gap-3">
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">$700</div>
                  <div className="text-xs text-muted-foreground">MXN Total</div>
                </div>
                <Button asChild>
                  <Link href="/turista/reservas">Ver Detalles</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Reserva más reciente destacada */}
<div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
  <div className="flex items-start justify-between gap-4">
    <div>
      <h3 className="text-xl font-bold">{bookings[0].title}</h3>
      <p className="text-sm text-muted-foreground">Guía: {bookings[0].guide}</p>
      <div className="flex flex-wrap gap-4 text-sm mt-2">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          Fecha por definir
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          {bookings[0].duration}
        </div>
      </div>
    </div>
    <div className="text-right">
      <div className="text-2xl font-bold text-primary">{bookings[0].price}</div>
      <div className="text-xs text-muted-foreground">MXN por persona</div>
    </div>
  </div>
</div>

{/* Lista de reservas recientes con contraste en la última reservada */}
<div>
  <h4 className="text-sm font-medium mb-2">Reservas Recientes</h4>
  <div className="space-y-2">
    {bookings.map((b, i) => (
      <div
        key={i}
        className={`p-3 rounded-md flex items-center justify-between ${
          b.title === lastBookedTitle ? "bg-primary/20 ring-2 ring-primary/30" : "bg-muted"
        }`}
      >
        <div>
          <div className="font-semibold">{b.title}</div>
          <div className="text-xs text-muted-foreground">{b.guide} • {b.duration}</div>
        </div>
        <div className="text-sm font-medium">{b.price}</div>
      </div>
    ))}
  </div>
</div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal simple para mostrar detalles del tour */}
      {selectedTour && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedTour(null)} />
          <div className="relative z-10 w-full max-w-2xl mx-4 bg-background rounded-lg shadow-lg overflow-auto">
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold mb-1">{selectedTour.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{selectedTour.category}</p>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-accent fill-accent" />
                      <span className="font-semibold">{selectedTour.rating}</span>
                      <span className="text-xs">({selectedTour.reviews} reseñas)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      {selectedTour.duration}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xl font-bold text-primary">{selectedTour.price}</div>
                  <div className="text-xs text-muted-foreground">MXN por persona</div>
                  <div className="mt-4">
                    <Button onClick={() => setSelectedTour(null)}>Cerrar</Button>
                  </div>
                </div>
              </div>

              {/* Información adicional relevante (puedes extender) */}
              <div className="mt-6 space-y-3 text-sm">
                <p><strong>Guía:</strong> {selectedTour.guide}</p>
                <p><strong>Incluye:</strong> Visita guiada, degustación, transporte local (según tour)</p>
                <p><strong>Recomendaciones:</strong> Llevar calzado cómodo, agua y protector solar.</p>
                <p><strong>Política de cancelación:</strong> Reembolso completo si cancelas con 48 horas de anticipación.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
