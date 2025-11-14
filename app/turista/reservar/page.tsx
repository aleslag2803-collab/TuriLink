"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, Users, MapPin, CheckCircle2, Trash2 } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"

export default function ReservarPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const tourParam = searchParams.get("tour")
  
  const [selectedTour, setSelectedTour] = useState<any>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('turilink_current_booking_tour')
      return saved ? JSON.parse(saved) : null
    }
    return null
  })
  
  const [pendingReservations, setPendingReservations] = useState<any[]>([])
  
  const [formData, setFormData] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('turilink_current_booking_form')
      return saved ? JSON.parse(saved) : {
        nombre: "",
        email: "",
        telefono: "",
        fecha: "",
        hora: "",
        personas: "1",
        comentarios: "",
      }
    }
    return {
      nombre: "",
      email: "",
      telefono: "",
      fecha: "",
      hora: "",
      personas: "1",
      comentarios: "",
    }
  })
  
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    if (selectedTour) {
      localStorage.setItem('turilink_current_booking_form', JSON.stringify(formData))
    }
  }, [formData, selectedTour])

  useEffect(() => {
    if (selectedTour) {
      localStorage.setItem('turilink_current_booking_tour', JSON.stringify(selectedTour))
    }
  }, [selectedTour])

  useEffect(() => {
    const loadReservations = () => {
      try {
        const stored = localStorage.getItem("turilink_pending_reservations")
        if (stored) {
          setPendingReservations(JSON.parse(stored))
        }
      } catch (e) {
        console.error("Error loading reservations", e)
      }
    }
    loadReservations()
  }, [])

  useEffect(() => {
    if (tourParam) {
      try {
        const tour = JSON.parse(decodeURIComponent(tourParam))
        setSelectedTour(tour)
      } catch (e) {
        console.error("Error parsing tour data", e)
      }
    }
  }, [tourParam])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const reservations = JSON.parse(localStorage.getItem("turilink_pending_reservations") || "[]")
      const newReservation = {
        id: Date.now(),
        tour: selectedTour,
        ...formData,
        fecha_reserva: new Date().toISOString(),
        estado: "pendiente",
        total: parseInt(selectedTour.price.replace(/[^0-9]/g, "")) * parseInt(formData.personas),
      }
      reservations.push(newReservation)
      localStorage.setItem("turilink_pending_reservations", JSON.stringify(reservations))
      setPendingReservations(reservations)
      
      localStorage.removeItem('turilink_current_booking_tour')
      localStorage.removeItem('turilink_current_booking_form')
      
      setIsSubmitted(true)
      router.push('/turista/reservar')
    } catch (e) {
      console.error("Error saving reservation", e)
    }
  }

  const handleCancelReservation = (reservationId: number) => {
    try {
      const filtered = pendingReservations.filter(r => r.id !== reservationId)
      localStorage.setItem("turilink_pending_reservations", JSON.stringify(filtered))
      setPendingReservations(filtered)
    } catch (e) {
      console.error("Error canceling reservation", e)
    }
  }

  const handleCancelBooking = () => {
    localStorage.removeItem('turilink_current_booking_tour')
    localStorage.removeItem('turilink_current_booking_form')
    router.push('/turista/reservar')
  }

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-amber-600" />
              </div>
            </div>
            <CardTitle className="text-2xl">¡Reserva Creada!</CardTitle>
            <CardDescription>
              Tu reserva está pendiente de pago. Completa el pago para confirmarla.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted rounded-lg text-left">
              <h3 className="font-semibold mb-2">{selectedTour?.title}</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formData.fecha}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {formData.hora}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {formData.personas} {formData.personas === "1" ? "persona" : "personas"}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button asChild className="flex-1">
                <Link href="/turista/reservas">Ver Mis Reservas</Link>
              </Button>
              <Button variant="outline" asChild className="flex-1">
                <Link href="/turista/dashboard">Explorar Más Tours</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!selectedTour) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Mis Reservas Pendientes</h1>
          <p className="text-muted-foreground">Gestiona tus reservas que están esperando confirmación de pago</p>
        </div>

        {pendingReservations.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No tienes reservas pendientes</CardTitle>
              <CardDescription>
                Explora nuestros tours y crea tu primera reserva
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/turista/dashboard">Explorar Tours</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {pendingReservations.map((reservation) => (
              <Card key={reservation.id}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="relative w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                      <Image 
                        src={reservation.tour?.image || "/placeholder.svg"} 
                        alt={reservation.tour?.title} 
                        fill 
                        className="object-cover" 
                      />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{reservation.tour?.title}</h3>
                        <Badge variant="secondary">{reservation.tour?.category}</Badge>
                      </div>
                      <div className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {reservation.fecha}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {reservation.hora}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          {reservation.personas} {reservation.personas === "1" ? "persona" : "personas"}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {reservation.nombre}
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div>
                          <p className="text-sm text-muted-foreground">Total</p>
                          <p className="text-xl font-bold text-primary">${reservation.total?.toLocaleString()} MXN</p>
                        </div>
                        <div className="flex gap-2">
                         <Button 
  onClick={() => router.push(`/turista/pago?reserva=${reservation.id}`)}
>
  Confirmar y Pagar
</Button>

                          <Button 
                            variant="destructive" 
                            size="icon"
                            onClick={() => handleCancelReservation(reservation.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Reservar Tour</h1>
        <p className="text-muted-foreground">Completa el formulario para crear tu reserva</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Tour Summary */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Resumen del Tour</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative h-40 rounded-lg overflow-hidden">
              <Image src={selectedTour.image || "/placeholder.svg"} alt={selectedTour.title} fill className="object-cover" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">{selectedTour.title}</h3>
              <Badge variant="secondary" className="mb-3">
                {selectedTour.category}
              </Badge>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{selectedTour.guide}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{selectedTour.duration}</span>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Precio por persona</span>
                <span className="text-2xl font-bold text-primary">{selectedTour.price}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Booking Form */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Información de Reserva</CardTitle>
            <CardDescription>Completa tus datos para procesar la reserva</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre Completo *</Label>
                  <Input
                    id="nombre"
                    required
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    placeholder="Juan Pérez"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="juan@ejemplo.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono *</Label>
                <Input
                  id="telefono"
                  type="tel"
                  required
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  placeholder="+52 123 456 7890"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fecha">Fecha del Tour *</Label>
                  <Input
                    id="fecha"
                    type="date"
                    required
                    value={formData.fecha}
                    onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hora">Hora *</Label>
                  <Input
                    id="hora"
                    type="time"
                    required
                    value={formData.hora}
                    onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="personas">Personas *</Label>
                  <Input
                    id="personas"
                    type="number"
                    min="1"
                    max="10"
                    required
                    value={formData.personas}
                    onChange={(e) => setFormData({ ...formData, personas: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comentarios">Comentarios o Solicitudes Especiales</Label>
                <Textarea
                  id="comentarios"
                  value={formData.comentarios}
                  onChange={(e) => setFormData({ ...formData, comentarios: e.target.value })}
                  placeholder="Alergias alimentarias, necesidades especiales, etc."
                  rows={4}
                />
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold">Total a Pagar</span>
                  <span className="text-2xl font-bold text-primary">
                    ${(parseInt(selectedTour.price.replace(/[^0-9]/g, "")) * parseInt(formData.personas)).toLocaleString()} MXN
                  </span>
                </div>
                <div className="flex gap-3">
                  <Button type="submit" className="flex-1">
                    Crear Reserva
                  </Button>
                  <Button type="button" variant="outline" onClick={handleCancelBooking}>
                    Cancelar
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
