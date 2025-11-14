"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, Star, MapPin, CreditCard } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"

type Reservation = {
  id: number
  tour: any
  nombre: string
  email: string
  telefono: string
  fecha: string
  hora: string
  personas: string
  comentarios: string
  fecha_reserva: string
  estado: "pendiente" | "confirmada"
  total: number
}

export default function ReservasPage() {
  const [pendingReservations, setPendingReservations] = useState<Reservation[]>([])
  const [confirmedReservations, setConfirmedReservations] = useState<Reservation[]>([])
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null)

  useEffect(() => {
    loadReservations()
  }, [])

  function loadReservations() {
    try {
      const pending = JSON.parse(localStorage.getItem("turilink_pending_reservations") || "[]")
      const confirmed = JSON.parse(localStorage.getItem("turilink_confirmed_reservations") || "[]")
      setPendingReservations(pending)
      setConfirmedReservations(confirmed)
    } catch (e) {
      console.error("Error loading reservations from localStorage", e)
      setPendingReservations([])
      setConfirmedReservations([])
    }
  }

  function cancelPendingReservation(id: number) {
    const updated = pendingReservations.filter((r) => r.id !== id)
    setPendingReservations(updated)
    localStorage.setItem("turilink_pending_reservations", JSON.stringify(updated))
    if (selectedBooking?.id === id) {
      setSelectedBooking(null)
    }
  }

  function cancelConfirmedReservation(id: number) {
    const updated = confirmedReservations.filter((r) => r.id !== id)
    setConfirmedReservations(updated)
    localStorage.setItem("turilink_confirmed_reservations", JSON.stringify(updated))
    if (selectedBooking?.id === id) {
      setSelectedBooking(null)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Mis Reservas</h1>
        <p className="text-muted-foreground">Gestiona tus tours y experiencias reservadas</p>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Reservas Pendientes</h2>
        {pendingReservations.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              No tienes reservas pendientes de pago
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {pendingReservations.map((reservation) => (
              <Card key={reservation.id}>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative w-full md:w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={reservation.tour?.image || "/placeholder.svg"}
                        alt={reservation.tour?.title || "Tour"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-bold">{reservation.tour?.title || "Tour"}</h3>
                          <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                            Pendiente de Pago
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{reservation.nombre}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          {reservation.fecha}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          {reservation.hora}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          {reservation.personas} {reservation.personas === "1" ? "persona" : "personas"}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          {reservation.tour?.guide || "Guía por asignar"}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between items-end gap-3 md:min-w-[180px]">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">${reservation.total.toLocaleString()} MXN</div>
                        <div className="text-xs text-muted-foreground">Total</div>
                      </div>
                      <div className="flex flex-col gap-2 w-full">
                        <Button size="sm" className="w-full gap-2" asChild>
                          <Link href={`/turista/pago?reserva=${reservation.id}`}>
                            <CreditCard className="w-4 h-4" />
                            Confirmar y Pagar
                          </Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="w-full"
                          onClick={() => cancelPendingReservation(reservation.id)}
                        >
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Próximas Reservas Confirmadas</h2>
        {confirmedReservations.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              No tienes reservas confirmadas
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {confirmedReservations.map((reservation) => (
              <Card key={reservation.id}>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative w-full md:w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={reservation.tour?.image || "/placeholder.svg"}
                        alt={reservation.tour?.title || "Tour"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-bold">{reservation.tour?.title || "Tour"}</h3>
                          <Badge className="bg-green-eco text-primary-foreground">Confirmado</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{reservation.nombre}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          {reservation.fecha}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          {reservation.hora}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          {reservation.personas} {reservation.personas === "1" ? "persona" : "personas"}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          {reservation.tour?.guide || "Guía por asignar"}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between items-end gap-3 md:min-w-[180px]">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">${reservation.total.toLocaleString()} MXN</div>
                        <div className="text-xs text-muted-foreground">Total</div>
                      </div>
                      <div className="flex flex-col gap-2 w-full">
                        <Button size="sm" variant="outline" className="w-full" onClick={() => setSelectedBooking(reservation)}>
                          Ver Detalles
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="w-full"
                          onClick={() => cancelConfirmedReservation(reservation.id)}
                        >
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Historial de Tours Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Historial de Tours</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {[
                {
                  tour: "Xochimilco y Coyoacán",
                  date: "10 Enero 2025",
                  guide: "Laura Ramírez",
                  rating: 5,
                  price: "$600 MXN",
                },
                {
                  tour: "Museo Frida Kahlo + Casa Azul",
                  date: "5 Enero 2025",
                  guide: "Roberto Sánchez",
                  rating: 5,
                  price: "$450 MXN",
                },
                {
                  tour: "Mercados y Gastronomía",
                  date: "28 Diciembre 2024",
                  guide: "Ana García",
                  rating: 4,
                  price: "$550 MXN",
                },
              ].map((past, idx) => (
                <div key={idx} className="flex justify-between items-center py-3 border-b last:border-0">
                  <div>
                    <div className="font-semibold">{past.tour}</div>
                    <div className="text-sm text-muted-foreground">
                      {past.date} • {past.guide}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="flex">
                        {[...Array(past.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                        ))}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{past.price}</div>
                    </div>
                    <Button size="sm" variant="outline">
                      Reservar otra vez
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal de detalles de reserva */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedBooking(null)} />
          <div className="relative z-10 w-full max-w-2xl mx-4 bg-background rounded-lg shadow-lg overflow-auto max-h-[90vh]">
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold mb-1">{selectedBooking.tour?.title || "Tour"}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{selectedBooking.tour?.category || ""}</p>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-accent fill-accent" />
                      <span className="font-semibold">{selectedBooking.tour?.rating ?? "-"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      {selectedBooking.tour?.duration || "Duración por definir"}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xl font-bold text-primary">${selectedBooking.total.toLocaleString()} MXN</div>
                  <div className="text-xs text-muted-foreground">Total</div>
                </div>
              </div>

              <div className="mt-6 space-y-3 text-sm">
                <p>
                  <strong>Nombre:</strong> {selectedBooking.nombre}
                </p>
                <p>
                  <strong>Email:</strong> {selectedBooking.email}
                </p>
                <p>
                  <strong>Teléfono:</strong> {selectedBooking.telefono}
                </p>
                <p>
                  <strong>Fecha:</strong> {selectedBooking.fecha}
                </p>
                <p>
                  <strong>Hora:</strong> {selectedBooking.hora}
                </p>
                <p>
                  <strong>Personas:</strong> {selectedBooking.personas}
                </p>
                {selectedBooking.comentarios && (
                  <p>
                    <strong>Comentarios:</strong> {selectedBooking.comentarios}
                  </p>
                )}
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setSelectedBooking(null)}>
                  Cerrar
                </Button>
                <Button
                  className="bg-destructive text-white"
                  onClick={() => {
                    cancelConfirmedReservation(selectedBooking.id)
                    setSelectedBooking(null)
                  }}
                >
                  Cancelar reserva
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
